import React, { useState } from "react";
import { Container, Card, Button, Navbar, Nav, Form, InputGroup } from "react-bootstrap";

const SimpleQuizPage = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
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

      {/* Simple Quiz Content */}
      <Card className="mt-4">
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
            <Form.Check type="radio" label="🏢 Office-based" name="q1" />
            <Form.Check type="radio" label="🌿 Outdoors" name="q1" />
            <Form.Check type="radio" label="🏡 Remote / Work from home" name="q1" />
            <Form.Check type="radio" label="🚀 Fast-paced / Hands-on" name="q1" />
          </Form>
        </Card>

          {/* Question 2 */}
          <Card className="mb-4 p-3">
          <h5>2. Which activity sounds most enjoyable to you?</h5>
          <img 
            src="https://as1.ftcdn.net/jpg/03/37/04/48/1000_F_337044860_7cBFl72dC1kKCbFhHOKulDH0BlLns8gq.jpg " 
            alt="Work Environment" 
            style={{ width: "200%", maxWidth: "450px", height: "auto", display: "block", margin: "10px auto", borderRadius: "8px" }}
          />
          <Form>
            <Form.Check type="radio" label="💻 Solving problems with technology" name="q1" />
            <Form.Check type="radio" label="🎨 Creating art, music, or designs" name="q1" />
            <Form.Check type="radio" label="🏥 Helping people in need" name="q1" />
            <Form.Check type="radio" label="📊 Managing projects or businesses" name="q1" />
          </Form>
        </Card>

   
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SimpleQuizPage;