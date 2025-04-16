import React, { useState, useEffect } from "react";
import { Container, Card, Button, Navbar, Nav, Form, InputGroup, ProgressBar, Modal } from "react-bootstrap";

const DetailedQuizPage = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
  const [search, setSearch] = useState("");
  const [answers, setAnswers] = useState<number>(0);
  const [questionAnswered, setQuestionAnswered] = useState<boolean[]>(new Array(7).fill(false));
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem("site-theme");
    return savedTheme ? savedTheme : "default";
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("site-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "default" ? "pinky" : "default");
  };

  const themeButtonVariant = theme === "default" ? "outline-light" : "outline-dark";
  const themeButtonText = theme === "default" ? "🌸 Change Theme" : "💼 Change Theme";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const handleAnswer = (questionIndex: number) => {
    if (!questionAnswered[questionIndex]) {
      setAnswers(answers + 1);
      const updatedAnswered = [...questionAnswered];
      updatedAnswered[questionIndex] = true;
      setQuestionAnswered(updatedAnswered);
    }
  };

  const progress = (answers / 7) * 100;

  if (progress === 100 && !showModal) {
    setShowModal(true);
  }

  return (
    <Container>
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

      <div style={{
          position: "fixed",
          top: "0",
          width: "100%",
          zIndex: 1040,
          backgroundColor: "#fff",
          padding: "10px 0",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
        }}>
        <ProgressBar now={progress} label={`${Math.round(progress)}%`} />
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>🎉 You Finished the Quiz!</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <p>Congrats! You have completed the quiz. Click the button below to see your results.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => navigateTo("detailed-quiz-results")}>
            See Results
          </Button>
        </Modal.Footer>
      </Modal>

      <Card className="mt-4" style={{ marginTop: "150px" }}>
        <Card.Body>
          <Card.Title>Detailed Career Quiz</Card.Title>

          <Card className="mb-4 p-3">
            <h5>1. What type of work environment do you prefer?</h5>
            <img 
              src="https://cdn3.careeraddict.com/uploads/article/59060/illustration-men-interview-busy-environment.jpg" 
              alt="Work Environment" 
              style={{ width: "200%", maxWidth: "450px", height: "auto", display: "block", margin: "10px auto", borderRadius: "8px" }}
            />
            <Form>
              <Form.Check type="radio" label="🏢 Office-based" name="q1" onChange={() => handleAnswer(0)} />
              <Form.Check type="radio" label="🌿 Outdoors" name="q1" onChange={() => handleAnswer(0)} />
              <Form.Check type="radio" label="🏡 Remote / Work from home" name="q1" onChange={() => handleAnswer(0)} />
              <Form.Check type="radio" label="🚀 Fast-paced / Hands-on" name="q1" onChange={() => handleAnswer(0)} />
            </Form>
          </Card>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DetailedQuizPage;