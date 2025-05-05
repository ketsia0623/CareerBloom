import React, { useEffect, useState } from "react";
import {
  Card,
  Spinner,
  Container,
  ListGroup,
  Row,
  Col,
  Button,
  Navbar,
  Nav
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import sakura from "./flowa.png";
import petals from "./falldown.gif";
import "./NewHomePage.css";


interface DetailedQuizResultsProps {
    navigateTo: (page: string) => void;
  }


const DetailedQuizResults: React.FC<DetailedQuizResultsProps> = ({ navigateTo }) => {
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [jobSuggestions, setJobSuggestions] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAnswers = localStorage.getItem("detailedQuizAnswers");
    const apiKey = localStorage.getItem("MYKEY");
    
    if (storedAnswers && apiKey) {
      const parsedAnswers: string[] = JSON.parse(storedAnswers);
      setQuizAnswers(parsedAnswers);
    
      const prompt = `A user completed a career quiz with the following answers:\n${parsedAnswers
        .map((a, i) => `Question ${i + 1}: ${a}`)
        .join("; ")}\n\nBased on these answers:
    1. Suggest ONE ideal career path that best fits them and explain in 2–3 bullet points why.
    2. List THREE alternative career paths, each with a short explanation.`;
        
      //Based on these answers:1. Suggest ONE ideal career path that best fits them and explain in 2–3 bullet points why.2. List THREE alternative career paths, each with a short explanation.`;

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
          console.error("OpenAI error:", err);
          setJobSuggestions("There was a problem generating your results.");
          setLoading(false);
        });
    } else {
      setJobSuggestions("Missing quiz answers or API key.");
      setLoading(false);
    }
  }, []);

  return (
    <Container className="py-5 bg-white">
      <Row className="justify-content-center mb-4 text-center">
        <Col md={8}>
          <h1 className="fw-bold mb-3">Your Personalized Career Match</h1>
          <p className="text-muted fs-5">Based on your detailed quiz responses, here's our suggestion:</p>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Analyzing your answers…</p>
        </div>
      ) : (
        <>
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <Card className="p-4 shadow-sm border-0 mb-4 bg-light">
                <h4 className="fw-semibold text-primary mb-3">🌟 Top Career Match
                </h4>
                <p className="fs-6" style={{ whiteSpace: "pre-wrap" }}>{jobSuggestions}</p>
              </Card>

              <Card className="p-4 shadow-sm border-0 mb-4 bg-white">
                <h5 className="fw-semibold text-success mb-3">📋 Your Quiz Answers
                </h5>
                <ListGroup variant="flush">
                  {quizAnswers.map((answer, index) => (
                    <ListGroup.Item key={index} className="py-3 bg-light">
                      <strong className="text-dark">Question {index + 1}:</strong> {answer}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>

              <div className="text-center mt-4">
                <Button variant="outline-dark" onClick={() => navigateTo("home")}>
                  ⬅️ Return to Home
                </Button>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default DetailedQuizResults;