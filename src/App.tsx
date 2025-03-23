import React, { useState } from "react";
import { Navbar, Nav, Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState({ message: "" });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setFeedback({ message: e.target.value });
  const handleSubmitFeedback = () => alert("Feedback submitted! Thank you.");

  return (
    <Container style={{ backgroundColor: "#f0f8ff", padding: "20px", borderRadius: "10px" }}>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="justify-content-center p-3 rounded">
        <Navbar.Brand href="#home" style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#ffcc00" }}>Find Your Career!</Navbar.Brand>
        <Nav className="mx-auto">
          <Nav.Link href="#home" style={{ color: "#ffcc00" }}>Home</Nav.Link>
          <Nav.Link href="#simple-quiz" style={{ color: "#ffcc00" }}>Simple Quiz</Nav.Link>
          <Nav.Link href="#detailed-quiz" style={{ color: "#ffcc00" }}>Detailed Quiz</Nav.Link>
        </Nav>
      </Navbar>
      
      {/* Search Bar */}
      <Form className="mt-3">
        <Form.Control type="text" placeholder="Search" value={search} onChange={handleSearchChange} />
      </Form>

      {/* About Section - Largest Box */}
      <Row className="mt-4">
        <Col md={8}>
          <Card style={{ height: "300px", backgroundColor: "white", color: "#333" }}>
            <Card.Body>
              <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold" }}>About</Card.Title>
              <Card.Text>
                About goes here...........
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
              <Card.Text>Simple Quiz about goes here.....</Card.Text>
              <Button variant="light">Go</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} id="detailed-quiz">
          <Card style={{ height: "200px", backgroundColor: "#2196f3", color: "white" }}>
            <Card.Body>
              <Card.Title>Detailed Quiz</Card.Title>
              <Card.Text>Detalied Quiz about goes here.....</Card.Text>
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