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
      <Container fluid className="main-container">
        {/* Falling Petals GIF */}
        <div className="falling-petals">
          <img src={petals} alt="Falling petals" className="petals-image" />
        </div>
  
        {/* Navigation Bar */}
        <div className="navigation-bar">
          <div className="text-center">
            <div className="header-container">
              <img src={sakura} alt="sakura left" className="sakura-image" />
              <Navbar.Brand className="navbar-brand">
                Find Your Career!
              </Navbar.Brand>
              <img src={sakura} alt="sakura right" className="sakura-image" />
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
                  <h4 className="fw-semibold card-title mb-3">🌟 Top Career Match</h4>
                  <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>{jobSuggestions}</p>
                </Card>

                <Card className="p-4 shadow-sm detailed-quiz-card mb-4">
                  <h5 className="fw-semibold card-title mb-3">📋 Your Quiz Answers</h5>
                  <ListGroup variant="flush">
                    {quizAnswers.map((answer, index) => (
                      <ListGroup.Item
                        key={index}
                        className="py-3 bg-light"
                        style={{
                          borderRadius: "8px",
                          marginBottom: "8px",
                          borderColor: "#ffcce6",
                        }}
                      >
                        <strong className="card-title">Question {index + 1}:</strong>{" "}
                        <span className="card-text">{answer}</span>
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

        {/* Footer */}
        <footer className="footer text-center">
            <p className="card-text">© 2025 Career Matcher. All rights reserved.</p>
        </footer>
        </Container>
    );
    };

    export default DetailedQuizResults;
                