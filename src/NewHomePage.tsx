import React, { useState } from "react";
import { Navbar, Nav, Button, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import sakura from "./flowa.png";
import petals from "./falldown.gif";

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

  const styles = {
    container: {
      backgroundColor: "#ffecf1", 
      padding: "20px",
      borderRadius: "10px",
      minHeight: "100vh",
      position: "relative", 
      overflow: "hidden" 
    },
    navbar: {
      backgroundColor: "white",
      borderRadius: "20px",
      padding: "15px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "25px",
      position: "relative", 
      zIndex: 1 
    },
    navbarBrand: {
      fontSize: "1.8rem",
      fontWeight: "bold", 
      color: "#ff66b2", 
      cursor: "pointer"
    },
    navLink: {
      color: "#ff66b2",
      fontWeight: "500",
      margin: "0 10px"
    },
    mainContent: {
      backgroundColor: "white",
      borderRadius: "20px",
      padding: "25px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "25px",
      position: "relative",
      zIndex: 1 
    },
    cardTitle: {
      color: "#ff66b2",
      fontWeight: "bold",
    },
    cardText: {
      color: "#603549"
    },
    button: {
      backgroundColor: "#ff80bf",
      borderColor: "#ff80bf",
      color: "white",
      borderRadius: "15px",
      fontWeight: "500",
      padding: "8px 20px"
    },
    footer: {
      backgroundColor: "white",
      borderRadius: "20px",
      padding: "15px",
      marginTop: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      position: "relative", 
      zIndex: 1 
    },
    headerContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margins: 0
    },
    fallingPetals: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 0,
      opacity: 0.7
    }
  };

  return (
    <Container fluid style={{
      backgroundColor: "#ffecf1", 
      padding: "20px",
      borderRadius: "10px",
      minHeight: "100vh",
      position: "relative", 
      overflow: "hidden" 
    }}>
      {/* Falling Petals GIF Background */}
      <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 0,
      opacity: 0.7
    }}>
        <img 
          src={petals} 
          alt="Falling petals" 
          style={{
            width: "100%", 
            height: "100%",
            objectFit: "cover" 
          }} 
        />
      </div>

      {/* Navigation Bar */}
      <div style={{
      backgroundColor: "white",
      borderRadius: "20px",
      padding: "15px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "25px",
      position: "relative",
      zIndex: 1 
    }}>
        <div className="text-center">
          {/* Header with images on both sides */}
          <div style={styles.headerContainer}>
            {/* Left sakura */}
            <img 
              src={sakura} 
              alt="sakura left" 
              style={{
                width: "100px",
                height: "auto",
              }}
            />
            
            {/* Title */}
            <Navbar.Brand style={styles.navbarBrand}>
              Find Your Career!
            </Navbar.Brand>
            
            {/* Right sakura */}
            <img 
              src={sakura} 
              alt="sakura right" 
              style={{
                width: "100px",
                height: "auto",
              }}
            />
          </div>
          
          <Nav className="justify-content-center">
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("home"); }} style={styles.navLink}>
              Home
            </Nav.Link>
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("simple-quiz"); }} style={styles.navLink}>
              Simple
            </Nav.Link>
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("detailed-quiz"); }} style={styles.navLink}>
              Detailed
            </Nav.Link>
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("about-us"); }} style={styles.navLink}>
              About Us
            </Nav.Link>
          </Nav>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
      backgroundColor: "white",
      borderRadius: "20px",
      padding: "25px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "25px",
      position: "relative", 
      zIndex: 1 
    }} className="text-center">
        {/* About Section */}
        <Row className="mb-4">
            <Card.Title style={styles.cardTitle}>Welcome to Career Matcher!</Card.Title>
            <div style={styles.cardText}>
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
            <Card body style={{ borderRadius: "15px", borderColor: "#ffb3d9", backgroundColor: "#fff0f7" }}>
              <Card.Title style={styles.cardTitle}>Simple Quiz</Card.Title>
              <Card.Text style={styles.cardText}>
                Our Simple Quiz is a quick and easy way to explore career options that suit you. It's a great starting point for anyone looking for direction without spending too much time. Give it a try and discover potential career paths in minutes!
              </Card.Text>
              <Button style={styles.button} onClick={() => navigateTo("simple-quiz")}>
                Take Simple Quiz
              </Button>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card body style={{ borderRadius: "15px", borderColor: "#ff99cc", backgroundColor: "#ffe6f2" }}>
              <Card.Title style={styles.cardTitle}>Detailed Quiz</Card.Title>
              <Card.Text style={styles.cardText}>
                The Detailed Quiz provides an in-depth analysis of your skills, 
                interests, and personality to help you find the best career path. 
                If you're serious about finding your perfect career match, 
                this comprehensive assessment is made just for you!
              </Card.Text>
              <Button style={styles.button} onClick={() => navigateTo("detailed-quiz")}>
                Take Detailed Quiz
              </Button>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Footer Section */}
      <footer style={{
      backgroundColor: "white",
      borderRadius: "20px",
      padding: "15px",
      marginTop: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      position: "relative", 
      zIndex: 1 
    }} className="text-center">
        <div style={{ width: "220px", margin: "0 auto" }}>
          <div style={{ fontSize: "small", color: "#ff66b2", fontWeight: "500", marginBottom: "5px" }}>
            API Key:
          </div>
          <input
            type="password"
            className="form-control"
            placeholder="Insert API Key Here"
            value={apiKey}
            onChange={handleKeyChange}
            style={{ borderColor: "#ffcce6", marginBottom: "10px" }}
          />
          <Button 
            onClick={handleKeySubmit} 
            style={styles.button}
            className="mb-2"
          >
            Submit
          </Button>
          {keySubmitted && (
            <div style={{ color: "#4caf50", fontSize: "0.9rem", marginTop: "5px" }}>
              Submitted successfully!
            </div>
          )}
        </div>
      </footer>
    </Container>
  );
};

export default NewHomePage;