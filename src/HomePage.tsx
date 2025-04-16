import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, Button, Container, Row, Col, Card, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
    // State declarations remain the same
    const [search, setSearch] = useState("");
    const [feedback, setFeedback] = useState({ message: "" });
    const [theme, setTheme] = useState<string>(() => {
      const savedTheme = localStorage.getItem("site-theme");
      return savedTheme ? savedTheme : "default";
    });

    const [apiKey, setApiKey] = useState<string>(() => {
      const saved = localStorage.getItem("openai-api-key");
      return saved ? JSON.parse(saved) : "";
    });

    // Apply theme when it changes
    useEffect(() => {
      document.body.className = theme;
      localStorage.setItem("site-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
      setTheme(theme === "default" ? "pinky" : "default");
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
    const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setFeedback({ message: e.target.value });
    const handleSubmitFeedback = () => alert("Feedback submitted! Thank you.");

    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setApiKey(e.target.value);
    };

    const handleKeySubmit = () => {
      localStorage.setItem("openai-api-key", JSON.stringify(apiKey));
      alert("API Key saved!");
      window.location.reload();
    };

    // Determine theme button colors based on current theme
    const themeButtonVariant = theme === "default" ? "outline-light" : "outline-dark";
    const themeButtonText = theme === "default" ? "🌸 Change Theme" : "💼 Change Theme";
  
    return (
      <Container style={{ 
        backgroundColor: theme === "default" ? "#f0f8ff" : "#ffe6f2", 
        padding: "20px", 
        borderRadius: "10px" 
      }}>
        {/* Navigation Bar */}
        <Navbar bg={theme === "default" ? "dark" : "light"} variant={theme === "default" ? "dark" : "light"} expand="lg" className="p-3 rounded" style={{ zIndex: 1050 }}>
                <div className="d-flex justify-content-between align-items-center w-100">
                  <Form className="d-flex">
                    <InputGroup>
                      <Form.Control 
                        type="text" 
                        placeholder="Search" 
                        value={search} 
                        onChange={handleSearchChange}
                        style={{ maxWidth: "200px", height: "45px" }}
                      />
                      <Button variant={theme === "default" ? "outline-light" : "outline-dark"} style={{ height: "45px" }}>
                        Search
                      </Button>
                    </InputGroup>
                  </Form>
                  
                  <div className="text-center" style={{ position: "absolute", left: "100px", right:"50px"}}>
                    <Navbar.Brand 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); navigateTo("home"); }}
                      style={{ fontSize: "1.8rem", fontWeight: "bold", color: theme === "default" ? "#ffcc00" : "#ff66b2", display: "block", cursor: "pointer" }}
                    >
                      Find Your Career!
                    </Navbar.Brand>
                    <Nav className="justify-content-center" style={{position: "relative", bottom: "10px"}}>
                      <Nav.Link 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); navigateTo("home"); }}
                        style={{ color: theme === "default" ? "#ffcc00" : "#ff66b2" }}
                      >
                        Home
                      </Nav.Link>
                      <Nav.Link 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); navigateTo("simple-quiz"); }}
                        style={{ color: theme === "default" ? "#ffcc00" : "#ff66b2" }}
                      >
                        Simple Quiz
                      </Nav.Link>
                      <Nav.Link 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); navigateTo("detailed-quiz"); }}
                        style={{ color: theme === "default" ? "#ffcc00" : "#ff66b2" }}
                      >
                        Detailed Quiz
                      </Nav.Link>
                    </Nav>
                  </div>
        
                  <Button 
                    variant={themeButtonVariant}
                    onClick={toggleTheme}
                    className="me-2"
                    style={{ zIndex: 10 }}
                  >
                    {themeButtonText}
                  </Button>
                </div>
              </Navbar>
        
        {/* Rest of the component remains the same */}
        {/* About Section */}
        <Row className="mt-4">
          <Col md={8}>
            <Card style={{ 
              height: "300px", 
              backgroundColor: theme === "default" ? "white" : "#ffcce6", 
              color: theme === "default" ? "#333" : "#800040" 
            }}>
              <Card.Body>
                <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold" }}>About</Card.Title>
                <Card.Text>
                Choosing the right career can feel overwhelming, but we're here to help! Our career quiz is designed to guide you toward a profession that matches your skills, interests, and personality. Based on well-researched questions and career assessments, we analyze your responses to provide personalized career suggestions. Whether you're exploring options or looking for clarity, our quiz helps you discover paths that align with your strengths and passions. Start today and take the first step toward your future!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <img 
              src={theme === "default" ? "https://www.cfnc.org/media/lnrf5gv0/career-sign-post.jpg" : "https://www.shutterstock.com/image-photo/begin-new-career-word-on-260nw-2329671447.jpg"} 
              alt="Career Path" 
              style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "10px" }} 
            />
          </Col>
        </Row>
        
        {/* Quizzes Section - Medium Sized Boxes */}
        <Row className="mt-4">
          <Col md={6} id="simple-quiz">
            <Card style={{ 
              height: "200px", 
              backgroundColor: theme === "default" ? "#4caf50" : "#ff99cc", 
              color: theme === "default" ? "white" : "#800040" 
            }}>
              <Card.Body>
                <Card.Title>Simple Quiz</Card.Title>
                <Card.Text>Our Simple Quiz is a quick and easy way to explore career options that suit you. It's a great starting point for anyone looking for direction without spending too much time. Give it a try and discover potential career paths in minutes!</Card.Text>
                <Button 
                  variant={theme === "default" ? "light" : "dark"}
                  onClick={() => navigateTo("simple-quiz")}
                >
                  Go
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} id="detailed-quiz">
            <Card style={{ 
              height: "200px", 
              backgroundColor: theme === "default" ? "#2196f3" : "#ff80bf", 
              color: theme === "default" ? "white" : "#800040" 
            }}>
              <Card.Body>
                <Card.Title>Detailed Quiz</Card.Title>
                <Card.Text>The Detailed Quiz provides an in-depth analysis of your skills, interests, and personality to help you find the best career path.</Card.Text>
                <Button 
                  variant={theme === "default" ? "light" : "dark"}
                  onClick={() => navigateTo("detailed-quiz")}
                >
                  Go
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
  
        {/* Feedback Section - Smallest Box */}
        <Row className="mt-4">
          <Col>
            <Card style={{ 
              height: "150px", 
              backgroundColor: theme === "default" ? "white" : "#ffcce6", 
              color: theme === "default" ? "#333" : "#800040" 
            }}>
              <Card.Body>
                <Card.Title>Feedback</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Message</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={2} 
                      name="message" 
                      value={feedback.message} 
                      onChange={handleFeedbackChange} 
                      style={{
                        backgroundColor: theme === "default" ? "white" : "#ffe6f2",
                        color: theme === "default" ? "#333" : "#800040"
                      }}
                    />
                  </Form.Group>
                  <Button 
                    variant={theme === "default" ? "dark" : "danger"} 
                    onClick={handleSubmitFeedback}
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <footer className={`bg-${theme === "default" ? "light" : "pink"} py-4 mt-5 text-center`}>
          <div className="container">
            <Form.Label className="mb-2">OpenAI API Key:</Form.Label>
            <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
              <Form.Control
                type="password"
                placeholder="Insert API Key Here"
                value={apiKey}
                onChange={handleKeyChange}
                style={{ 
                  maxWidth: "250px",
                  backgroundColor: theme === "default" ? "white" : "#ffe6f2",
                  color: theme === "default" ? "#333" : "#800040"
                }}
              />
              <Button 
                variant={theme === "default" ? "warning" : "danger"} 
                onClick={handleKeySubmit}
              >
                Save API Key
              </Button>
            </div>
          </div>
        </footer>
      </Container>
    );
};

export default HomePage;