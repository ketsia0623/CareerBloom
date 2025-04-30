import React, { useEffect, useState } from "react";
import { Card, Spinner, Container, ListGroup, Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import sakura from "./flowa.png";
import petals from "./falldown.gif";
import "./NewHomePage.css";

interface NewSimpleQuizResultsProps {
  navigateTo: (page: string) => void;
}

const NewSimpleQuizResults: React.FC<NewSimpleQuizResultsProps> = ({ navigateTo }) => {
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
    <Container fluid className="main-container">
      {/* Falling Petals GIF Background */}
      <div className="falling-petals">
        <img 
          src={petals} 
          alt="Falling petals" 
          className="petals-image" 
        />
      </div>

      {/* Navigation Bar */}
      <div className="navigation-bar">
        <div className="text-center">
          {/* Header with images on both sides */}
          <div className="header-container">
            {/* Left sakura */}
            <img 
              src={sakura} 
              alt="sakura left" 
              className="sakura-image"
            />
            
            {/* Title */}
            <Navbar.Brand className="navbar-brand">
              Find Your Career!
            </Navbar.Brand>
            
            {/* Right sakura */}
            <img 
              src={sakura} 
              alt="sakura right" 
              className="sakura-image"
            />
          </div>
          
          <Nav className="justify-content-center">
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("home"); }} className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("simple-quiz"); }} className="nav-link">
              Simple
            </Nav.Link>
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("detailed-quiz"); }} className="nav-link">
              Detailed
            </Nav.Link>
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("about-us"); }} className="nav-link">
              About Us
            </Nav.Link>
          </Nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Row className="justify-content-center mb-4 text-center">
          <Col>
            <Card.Title className="card-title">Your Personalized Career Suggestions</Card.Title>
            <p className="card-text">Based on your quiz answers, here's what we think suits you best!</p>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" style={{ color: "#ff66b2" }} />
            <p className="mt-3 card-text">Analyzing your answers and preparing your results...</p>
          </div>
        ) : (
          <>
            <Row className="justify-content-center">
              <Col md={10} lg={10}>
                <Card className="p-4 shadow-sm simple-quiz-card mb-4">
                  <h4 className="fw-semibold card-title mb-3">🎯 Top Career Recommendation</h4>
                  <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>{jobSuggestions}</p>
                </Card>

                <Card className="p-4 shadow-sm detailed-quiz-card mb-4">
                  <h5 className="fw-semibold card-title mb-3">📋 Your Quiz Answers</h5>
                  <ListGroup variant="flush">
                    {Object.entries(quizAnswers).map(([question, answer], index) => (
                      <ListGroup.Item key={index} className="py-3 bg-light" style={{ borderRadius: "8px", marginBottom: "8px", borderColor: "#ffcce6" }}>
                        <strong className="card-title">{question}:</strong> <span className="card-text">{answer}</span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>

                <div className="text-center mt-4">
                  <Button className="custom-button" onClick={() => navigateTo("home")}>
                    ⬅️ Take Another Quiz
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </div>

      {/* Footer Section */}
      <footer className="footer text-center">
        <p className="card-text">© 2025 Career Matcher. All rights reserved.</p>
      </footer>
    </Container>
  );
};

export default NewSimpleQuizResults;