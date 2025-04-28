import React, { useState } from "react";
import { Navbar, Nav, Button, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import sakura from "./flowa.png";
import petals from "./falldown.gif";
import "./NewHomePage.css";

const saveKeyData = "MYKEY";
let keyData = "";

const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = prevKey;
}

const NewHomePage = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
  const [keySubmitted, setKeySubmitted] = useState(false);
  const [apiKey, setApiKey] = useState<string>(keyData);

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleKeySubmit = () => {
    if (!apiKey.trim()) return;

    localStorage.setItem(saveKeyData, apiKey);
    setKeySubmitted(true);

    console.log("API Key Stored:", apiKey);
    setTimeout(() => setKeySubmitted(false), 2000);
  };

  return (
    <Container fluid className="main-container">
      {/* Falling Petals GIF Background */}
      <div className="falling-petals">
        <img 
          src={petals} 
          alt="Falling petals" 
          className="petals-image" 
        />
      </div>

      {/* Navigation Bar */}
      <div className="navigation-bar">
        <div className="text-center">
          {/* Header with images on both sides */}
          <div className="header-container">
            {/* Left sakura */}
            <img 
              src={sakura} 
              alt="sakura left" 
              className="sakura-image"
            />
            
            {/* Title */}
            <Navbar.Brand className="navbar-brand">
              Find Your Career!
            </Navbar.Brand>
            
            {/* Right sakura */}
            <img 
              src={sakura} 
              alt="sakura right" 
              className="sakura-image"
            />
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
      <div className="main-content text-center">
        {/* About Section */}
        <Row className="mb-4">
            <Card.Title className="card-title">Welcome to Career Matcher!</Card.Title>
            <div className="card-text">
              <p>
                Choosing the right career can feel overwhelming, but we're here to help! Our career quiz is designed to guide you toward a profession that matches your skills, interests, and personality.
              </p>
              <p>
                Based on well-researched questions and career assessments, we analyze your responses to provide personalized career suggestions. Whether you're exploring options or looking for clarity, our quiz helps you discover paths that align with your strengths and passions.
              </p>
              <p>
                Start today and take the first step toward your future!
              </p>
            </div>
        </Row>

        {/* Quizzes Section */}
        <Row>
          <Col md={6} className="mb-4">
            <Card body className="simple-quiz-card">
              <Card.Title className="card-title">Simple Quiz</Card.Title>
              <Card.Text className="card-text">
                Our Simple Quiz is a quick and easy way to explore career options that suit you. It's a great starting point for anyone looking for direction without spending too much time. Give it a try and discover potential career paths in minutes!
              </Card.Text>
              <Button className="custom-button" onClick={() => navigateTo("simple-quiz")}>
                Take Simple Quiz
              </Button>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card body className="detailed-quiz-card">
              <Card.Title className="card-title">Detailed Quiz</Card.Title>
              <Card.Text className="card-text">
                The Detailed Quiz provides an in-depth analysis of your skills, 
                interests, and personality to help you find the best career path. 
                If you're serious about finding your perfect career match, 
                this comprehensive assessment is made just for you!
              </Card.Text>
              <Button className="custom-button" onClick={() => navigateTo("detailed-quiz")}>
                Take Detailed Quiz
              </Button>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Footer Section */}
      <footer className="footer text-center">
        <div className="api-key-container">
          <div className="api-key-label">
            API Key:
          </div>
          <input
            type="password"
            className="form-control api-key-input"
            placeholder="Insert API Key Here"
            value={apiKey}
            onChange={handleKeyChange}
          />
          <Button 
            onClick={handleKeySubmit} 
            className="custom-button mb-2"
          >
            Submit
          </Button>
          {keySubmitted && (
            <div className="success-message">
              Submitted successfully!
            </div>
          )}
        </div>
      </footer>
    </Container>
  );
};

export default NewHomePage;