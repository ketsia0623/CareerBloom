import React, { useEffect, useState } from "react";
import { Card, Spinner, Container, Row, Col, Button, Navbar, Nav, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import sakura from "./flowa.png";
import petals from "./falldown.gif";
import "./NewHomePage.css";

interface NewDetailedQuizResultsProps {
  navigateTo: (page: string) => void;
}

interface Suggestions {
  strengthsAtmosphere: string;
  best_career: string;
  reason: string;
  salaryRange: string;
  topCompanies: string;
  nextSteps: string;
  dayInLife: string;
}

const NewDetailedQuizResults: React.FC<NewDetailedQuizResultsProps> = ({ navigateTo }) => {
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const storedAnswers = localStorage.getItem("detailedQuizAnswers");
  const parsedAnswers: string[] = storedAnswers ? JSON.parse(storedAnswers) : [];

  useEffect(() => {
    const stored = localStorage.getItem("detailedQuizAnswers");
    const apiKey = localStorage.getItem("MYKEY");

    if (stored && apiKey) {
      const parsedAnswers = JSON.parse(stored) as string[];

      const prompt = `I answered the following questions about myself: ${parsedAnswers.map((a, i) => `Question ${i + 1}: ${a}`).join("; ")}.

Using this information, choose ONLY one single best career for me and respond strictly in JSON with these keys:
{
  "strengthsAtmosphere": "...",
  "best_career": "...",
  "reason": "...",
  "salaryRange": "...",
  "topCompanies": "...",
  "nextSteps": "..."
  "dayInLife": "..."
}

Instructions:
- "strengthsAtmosphere": Write a **well-developed** paragraph describing the user’s strengths, values, and ideal work environment.
- "best_career": Provide a **precise job title** that reflects the user’s input.
- "reason": Offer a **thorough explanation** (3-5 sentences) explaining why this career aligns with the user's strengths and preferences.
- "salaryRange": Provide a realistic and geographically neutral **salary range** for someone entering or progressing in this career.
- "topCompanies": List 5 **specific companies** hiring for this role, including a short one-line description for each.
- "nextSteps": Give an **actionable roadmap** for entering the career — include relevant degrees, certifications, skills, and suggested tools.
- "dayInLife": Create a **descriptive summary** of what a typical day looks like in this career (tasks, work rhythm, environment).

Keep each section professional and insightful. Make the response helpful for someone making real-world career decisions.`;

      fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ model: "gpt-3.5-turbo", messages: [{ role: "user", content: prompt }], temperature: 0.7 }),
      })
        .then((res) => res.json())
        .then((data) => {
          try {
            const parsed: Suggestions = JSON.parse(data.choices?.[0]?.message?.content || "{}");
            setSuggestions(parsed);
          } catch (e) {
            console.error("Failed to parse suggestions JSON", e);
          }
          setLoading(false);
        })
        .catch((err) => { console.error("Error fetching from OpenAI:", err); setLoading(false); });
    } else {
      setLoading(false);
    }
  }, []);

  const pinkShades = ['#ffe6f2', '#ffccd9', '#ffb3c2', '#ff99ac', '#ff80a6'];
  const sectionData = suggestions
    ? [
        { title: 'Strengths & Atmosphere', content: suggestions.strengthsAtmosphere },
        { title: 'Why It Fits You', content: suggestions.reason },
        { title: 'Salary Range', content: suggestions.salaryRange },
        { title: 'Top Companies', content: suggestions.topCompanies },
        { title: 'Next Steps', content: suggestions.nextSteps },
        { title: 'A Day in the Life', content: suggestions.dayInLife }
      ]
    : [];

  return (
    <Container fluid className="main-container">
      <div className="falling-petals">
        <img src={petals} alt="Falling petals" className="petals-image" />
      </div>
      <div className="navigation-bar">
        <div className="text-center">
          <div className="header-container">
            <img src={sakura} alt="sakura left" className="sakura-image" />
            <Navbar.Brand className="navbar-brand" style={{ fontSize: '3rem' }}>
              Career Bloom
            </Navbar.Brand>
            <img src={sakura} alt="sakura right" className="sakura-image" />
          </div>
          <Nav className="justify-content-center">
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("home"); }}>Home</Nav.Link>
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("simple-quiz"); }}>Simple</Nav.Link>
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("detailed-quiz"); }}>Detailed</Nav.Link>
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("about-us"); }}>About Us</Nav.Link>
          </Nav>
        </div>
      </div>

      <div className="main-content">
        <Row className="justify-content-center mb-4 text-center">
          <Col>
            {suggestions && !loading ? (
              <h2 className="card-title">Hi future {suggestions.best_career}!</h2>
            ) : (
              <h2 className="card-title">Your Personalized Career Suggestions</h2>
            )}
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
            <Row className="g-4">
              {sectionData.slice(0, 3).map((section, idx) => (
                <Col key={idx} md={4} className="d-flex">
                  <Card className="h-100 w-100 p-3 shadow-sm" style={{ backgroundColor: pinkShades[idx] }}>
                    <h5 className="fw-semibold mb-2">{section.title}</h5>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{section.content}</p>
                  </Card>
                </Col>
              ))}
            </Row>
            <Row className="g-4 justify-content-center mt-0">
              {sectionData.slice(3).map((section, idx) => (
                <Col key={idx} md={4} className="d-flex">
                  <Card className="h-100 w-100 p-3 shadow-sm" style={{ backgroundColor: pinkShades[idx + 3] }}>
                    <h5 className="fw-semibold mb-2">{section.title}</h5>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{section.content}</p>
                  </Card>
                </Col>
              ))}
            </Row>
            

            <div className="text-center mt-4">
              <Button className="custom-button" onClick={() => navigateTo("home")}>⬅️ Take Another Quiz</Button>
            </div>

            <div className="text-center mt-3">
              <Button variant="outline-secondary" onClick={() => setShowAnswers(!showAnswers)}>
                {showAnswers ? "🙈 Hide Quiz Answers" : "📄 View Quiz Answers"}
              </Button>
            </div>

            {showAnswers && (
              <Card className="p-4 shadow-sm mt-4">
                <h5 className="fw-semibold card-title mb-3">📋 Your Detailed Quiz Answers</h5>
                <ListGroup variant="flush">
                  {parsedAnswers.map((answer, index) => (
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
            )}
          </>
        )}
      </div>

      <footer className="footer text-center">
        <p className="card-text">© 2025 Career Matcher. All rights reserved.</p>
      </footer>
    </Container>
  );
};

export default NewDetailedQuizResults;
