import React, { useState } from "react";
import { Navbar, Nav, Form, Button, Container, Row, Col, Card, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import emailjs from "emailjs-com";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState({ message: "" });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setFeedback({ message: e.target.value });
  const handleSubmitFeedback = () => alert("Feedback submitted! Thank you.");

  return (
    <Container style={{ backgroundColor: "#f0f8ff", padding: "20px", borderRadius: "10px" }}>
      {/* Navigation Bar*/}
      <Navbar bg="dark" variant="dark" expand="lg" className="p-3 rounded">
        <div className="d-flex justify-content-between align-items-center w-100">
          {/*Search bar */}
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
          
          {/*Navigation*/}
          <div className="text-center" style={{ position: "absolute", left: "100px", right:"50px"}}>
            <Navbar.Brand href="#home" style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#ffcc00", display: "block" }}>
              Find Your Career!
            </Navbar.Brand>
            <Nav className="justify-content-center" style={{position: "relative", bottom: "10px"}}>
              <Nav.Link href="#home" style={{ color: "#ffcc00" }}>Home</Nav.Link>
              <Nav.Link href="#simple-quiz" style={{ color: "#ffcc00" }}>Simple Quiz</Nav.Link>
              <Nav.Link href="#detailed-quiz" style={{ color: "#ffcc00" }}>Detailed Quiz</Nav.Link>
            </Nav>
          </div>
          
          {/*Login/Signup buttons */}
          <div>
            <Button variant="outline-light" className="me-2">Login</Button>
            <Button variant="warning">Sign Up</Button>
          </div>
        </div>
      </Navbar>
      
      {/* About Section - Largest Box */}
      <Row className="mt-4">
        <Col md={8}>
          <Card style={{ height: "300px", backgroundColor: "white", color: "#333" }}>
            <Card.Body>
              <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold" }}>About</Card.Title>
              <Card.Text>
              Choosing the right career can feel overwhelming, but we’re here to help! Our career quiz is designed to guide you toward a profession that matches your skills, interests, and personality. Based on well-researched questions and career assessments, we analyze your responses to provide personalized career suggestions. Whether you're exploring options or looking for clarity, our quiz helps you discover paths that align with your strengths and passions. Start today and take the first step toward your future!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <img src="https://www.cfnc.org/media/lnrf5gv0/career-sign-post.jpg" alt="Career Path" style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "10px" }} />
        </Col>
      </Row>
      
      {/* Quizzes Section - Medium Sized Boxes */}
      <Row className="mt-4">
        <Col md={6} id="simple-quiz">
          <Card style={{ height: "200px", backgroundColor: "#4caf50", color: "white" }}>
            <Card.Body>
              <Card.Title>Simple Quiz</Card.Title>
              <Card.Text>Our Simple Quiz is a quick and easy way to explore career options that suit you. It’s a great starting point for anyone looking for direction without spending too much time. Give it a try and discover potential career paths in minutes!</Card.Text>
              <Button variant="light">Go</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} id="detailed-quiz">
          <Card style={{ height: "200px", backgroundColor: "#2196f3", color: "white" }}>
            <Card.Body>
              <Card.Title>Detailed Quiz</Card.Title>
              <Card.Text>The Detailed Quiz provides an in-depth analysis of your skills, interests, and personality to help you find the best career path. </Card.Text>
              <Button variant="light">Go</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Feedback Section - Smallest Box */}
      <Row className="mt-4">
        <Col>
          <Card style={{ height: "150px", backgroundColor: "white", color: "#333" }}>
            <Card.Body>
              <Card.Title>Feedback</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={2} name="message" value={feedback.message} onChange={handleFeedbackChange} />
                </Form.Group>
                <Button variant="dark" onClick={handleSubmitFeedback}>Submit</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;