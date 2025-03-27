import React, { useState } from "react";
import { Container, Card, Button, Navbar, Nav, Form, InputGroup } from "react-bootstrap";

const DetailedQuizPage = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  return (
    <Container>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="p-3 rounded">
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
          <div>
            <Button variant="outline-light" className="me-2">Login</Button>
            <Button variant="warning">Sign Up</Button>
          </div>
        </div>
      </Navbar>

      {/* Detailed Quiz Content */}
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Detailed Career Assessment</Card.Title>
          <p>Questions coming soon!</p>
        
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DetailedQuizPage;