import React, { useEffect, useState } from "react";
import { Card, Spinner, Container, Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import sakura from "./flowa.png";
import petals from "./falldown.gif";
import "./NewHomePage.css";

interface NewSimpleQuizResultsProps {
  navigateTo: (page: string) => void;
}

interface Suggestions {
  strengthsAtmosphere: string;
  best_career: string;
  reason: string;
  salaryRange: string;
  topCompanies: string;
  nextSteps: string;
}

const NewSimpleQuizResults: React.FC<NewSimpleQuizResultsProps> = ({ navigateTo }) => {
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("simpleQuizAnswers");
    const apiKey = localStorage.getItem("MYKEY");

    if (stored && apiKey) {
      const parsedAnswers = JSON.parse(stored) as Record<string, string>;

      const prompt = `I answered the following questions about myself: ${Object.entries(parsedAnswers)
        .map(([q, a]) => `${q}: ${a}`)
        .join("; ")}.

Using this information, choose ONLY one single best career for me and respond strictly in JSON with these keys:
{
  "strengthsAtmosphere": "...",
  "best_career": "...",
  "reason": "...",
  "salaryRange": "...",
  "topCompanies": "...",
  "nextSteps": "..."
}

Instructions:
- "strengthsAtmosphere": Write a detailed paragraph (2-3 sentences) outlining my core strengths and ideal work environment.
- "best_career": Provide a single clear career title.
- "reason": Write a detailed paragraph (2-3 sentences) explaining why this career aligns with my profile.
- "salaryRange": Provide a concise paragraph stating a realistic salary range for this career.
- "topCompanies": Write a paragraph listing five leading companies hiring for this role, each with a one-sentence descriptor.
- "nextSteps": Write a detailed paragraph outlining actionable next steps (degrees, certifications, skills).`;

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
             {/* Title */}
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
            {/* First row: 3 cards */}
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
            {/* Second row: 2 cards centered */}
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
          </>
        )}
      </div>

      <footer className="footer text-center">
        <p className="card-text">© 2025 Career Matcher. All rights reserved.</p>
      </footer>
    </Container>
  );
};

export default NewSimpleQuizResults;
