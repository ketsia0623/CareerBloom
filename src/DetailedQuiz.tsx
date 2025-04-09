import React, { useState } from "react";
import { Container, Card, Button, Navbar, Nav, Form, InputGroup, ProgressBar, Modal } from "react-bootstrap";

const SimpleQuizPage = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
  const [search, setSearch] = useState("");
  const [answers, setAnswers] = useState<number>(0); // Track the number of answered questions
  const [questionAnswered, setQuestionAnswered] = useState<boolean[]>(new Array(7).fill(false)); // Track if each question has been answered
  const [showModal, setShowModal] = useState(false); // State for showing the modal notification

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const handleAnswer = (questionIndex: number) => {
    if (!questionAnswered[questionIndex]) {
      setAnswers(answers + 1); // Increment the answered question count
      const updatedAnswered = [...questionAnswered];
      updatedAnswered[questionIndex] = true; // Mark the current question as answered
      setQuestionAnswered(updatedAnswered);
    }
  };

  const progress = (answers / 7) * 100; // Calculate progress based on answered questions

  // Trigger modal when progress reaches 100%
  if (progress === 100 && !showModal) {
    setShowModal(true);
  }

  return (
    <Container>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="p-3 rounded" style={{ zIndex: 1050 }}>
        <div className="d-flex justify-content-between align-items-center w-100">
          {/* Search bar */}
          <Form className="d-flex">
            <InputGroup>
              <Form.Control 
                type="text" 
                placeholder="Search" 
                value={search} 
                onChange={handleSearchChange}
                style={{ maxWidth: "200px", height: "45px" }}
              />
              <Button variant="outline-light" style={{ height: "45px" }}>
                Search
              </Button>
            </InputGroup>
          </Form>
          
          {/* Navigation */}
          <div className="text-center" style={{ position: "absolute", left: "100px", right:"50px"}}>
            <Navbar.Brand 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigateTo("home"); }}
              style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#ffcc00", display: "block", cursor: "pointer" }}
            >
              Find Your Career!
            </Navbar.Brand>
            <Nav className="justify-content-center" style={{position: "relative", bottom: "10px"}}>
              <Nav.Link 
                href="#" 
                onClick={(e) => { e.preventDefault(); navigateTo("home"); }}
                style={{ color: "#ffcc00" }}
              >
                Home
              </Nav.Link>
              <Nav.Link 
                href="#" 
                onClick={(e) => { e.preventDefault(); navigateTo("simple-quiz"); }}
                style={{ color: "#ffcc00" }}
              >
                Simple Quiz
              </Nav.Link>
              <Nav.Link 
                href="#" 
                onClick={(e) => { e.preventDefault(); navigateTo("detailed-quiz"); }}
                style={{ color: "#ffcc00" }}
              >
                Detailed Quiz
              </Nav.Link>
            </Nav>
          </div>

          {/* Login/Signup buttons */}
          {/*
          <div>
            <Button variant="outline-light" className="me-2">Login</Button>
            <Button variant="warning">Sign Up</Button>
          </div>
          */}
        </div>
      </Navbar>

      {/* Sticky Progress Bar */}
      <div 
        style={{
          position: "sticky",
          top: "56px",  
          zIndex: 1040,  // Ensures the progress bar stays below the navbar
          backgroundColor: "#fff",
          padding: "10px 0",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
        }}>
        <ProgressBar now={progress} label={`${Math.round(progress)}%`} />
      </div>

      {/* Modal Notification */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>🎉 You Finished the Quiz!</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <p>Congrats! You have completed the quiz. Click the button below to see your results.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => navigateTo("simple-quiz-results")}>
            See Results
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Simple Quiz Content */}
      <Card className="mt-4" style={{ marginTop: "150px" }}> {/* Adjusted top margin to avoid overlap with fixed elements */}
        <Card.Body>
          <Card.Title>Simple Career Quiz</Card.Title>

          {/* Question 1 */}
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

export default SimpleQuizPage;