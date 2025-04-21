import React, { useEffect, useState } from "react";
import { Card, Spinner, Container, ListGroup, Row, Col, Button } from "react-bootstrap";

interface SimpleQuizResultsProps {
  navigateTo: (page: string) => void;
}

const SimpleQuizResults: React.FC<SimpleQuizResultsProps> = ({ navigateTo }) => {
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({});
  const [jobSuggestions, setJobSuggestions] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAnswers = localStorage.getItem("simpleQuizAnswers");
    const apiKey = localStorage.getItem("MYKEY");

    if (storedAnswers && apiKey) {
      const parsedAnswers = JSON.parse(storedAnswers);
      setQuizAnswers(parsedAnswers);

      const prompt = `I answered the following questions about myself: ${Object.entries(parsedAnswers)
        .map(([q, a]) => `${q}: ${a}`)
        .join("; ")}.

Based on this information:
1. Suggest ONE ideal career path that best matches their answers, and explain in a couple bullet why this is the best fit.
2. Then, provide THREE alternative career options that could also suit them well, each with a short explanation.`;

      fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const text = data.choices?.[0]?.message?.content || "No response.";
          setJobSuggestions(text);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching from OpenAI:", err);
          setJobSuggestions("There was a problem generating your results.");
          setLoading(false);
        });
    } else {
      setJobSuggestions("Missing quiz answers or API key.");
      setLoading(false);
    }
  }, []);

  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-4 text-center">
        <Col md={8}>
          <h1 className="fw-bold mb-3">Your Personalized Career Suggestions</h1>
          <p className="text-muted fs-5">Based on your quiz answers, here's what we think suits you best!</p>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Analyzing your answers and preparing your results...</p>
        </div>
      ) : (
        <>
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <Card className="p-4 shadow-sm border-0 mb-4 bg-light">
                <h4 className="fw-semibold text-primary mb-3">🎯 Top Career Recommendation</h4>
                <p className="fs-6" style={{ whiteSpace: "pre-wrap" }}>{jobSuggestions}</p>
              </Card>

              <Card className="p-4 shadow-sm border-0 mb-4 bg-white">
                <h5 className="fw-semibold text-success mb-3">📋 Your Quiz Answers</h5>
                <ListGroup variant="flush">
                  {Object.entries(quizAnswers).map(([question, answer], index) => (
                    <ListGroup.Item key={index} className="py-3 bg-light">
                      <strong className="text-dark">{question}:</strong> {answer}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>

              <div className="text-center mt-4">
                <Button variant="outline-dark" onClick={() => navigateTo("home")}>
                  ⬅️ Take Another Quiz
                </Button>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default SimpleQuizResults;