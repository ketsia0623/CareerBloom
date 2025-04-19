import React, { useEffect, useState } from "react";
import { Card, Spinner, Container, ListGroup } from "react-bootstrap";

interface SimpleQuizResultsProps {
  navigateTo: (page: string) => void;
}

const SimpleQuizResults: React.FC<SimpleQuizResultsProps> = ({ navigateTo }) => {
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({});
  const [jobSuggestions, setJobSuggestions] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAnswers = localStorage.getItem("quizAnswers");
    const apiKey = JSON.parse(localStorage.getItem("MYKEY") || "null");
    
    
    console.log("Stored Answers:", storedAnswers); // Debugging
    console.log("API Key:", apiKey); // Debugging

    if (storedAnswers && apiKey) {
      const parsedAnswers = JSON.parse(storedAnswers);
      setQuizAnswers(parsedAnswers);

      const prompt = `A person answered the following about themselves: ${Object.values(parsedAnswers).join(", ")}. Based on this, suggest 3 careers that would be a great fit and give a short reason for each.`;

      // Make the API call
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
          console.log("API Response:", data); // Debugging
          const text = data.choices?.[0]?.message?.content || "No response.";
          setJobSuggestions(text);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching from OpenAI:", err); // Debugging
          setJobSuggestions("There was a problem generating your results.");
          setLoading(false);
        });
    } else {
      console.error("No quiz answers or API key found.");
      setLoading(false);
      setJobSuggestions("Missing quiz answers or API key.");
    }
  }, []);

  return (
    <Container className="py-4">
      <h1>Quiz Results</h1>
      <p>See your personalized job recommendations below.</p>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
          <p className="mt-2">Generating your results...</p>
        </div>
      ) : (
        <>
          <Card className="p-4 shadow-sm mt-4">
            <h4>Recommended Jobs:</h4>
            <p>{jobSuggestions}</p>
          </Card>

          <Card className="p-4 shadow-sm mt-4">
            <h5>Your Answers:</h5>
            <ListGroup variant="flush" className="mt-3">
              {Object.entries(quizAnswers).map(([question, answer], index) => (
                <ListGroup.Item key={index}>
                  <strong>{question}:</strong> {answer}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </>
      )}
    </Container>
  );
};

export default SimpleQuizResults;