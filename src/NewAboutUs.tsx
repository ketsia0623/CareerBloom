import React from "react";
import { Navbar, Nav, Container, Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NewHomePage.css";
import sakura from "./flowa.png";
import petals from "./falldown.gif";
import usImage from "./us.png";
import linkedinImage from "./linkedin-logo.png";

const NewAboutUs = ({ navigateTo }: { navigateTo: (page: string) => void }) => {

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
            <Navbar.Brand className="navbar-brand" style={{ fontSize: '3rem' }}>
              Career Bloom
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
      <div className="main-content">
        <div className="text-center mb-4">
          <Card.Title className="card-title">About Our Team</Card.Title>
          <p className="card-text">
            Hii! It's nice to meet you!
          </p>
        </div>

        {/* Team Image */}
        <div className="text-center mb-4">
          <img 
            src={usImage} 
            alt="Team" 
            className="team-image" 
            style={{ 
              width: "30%", 
              borderRadius: "10px", 
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
            }} 
          />
        </div>

        {/* Team Members Cards */}
        <Row className="justify-content-center team-section">
          {/* Card 1 */}
          <Col md={4} className="mb-4">
            <Card className="team-member-card">
              <Card.Body>
                <Card.Title className="card-title">Hamna Malik</Card.Title>
                <Card.Text className="card-text">
                  Worked on the simple quiz page and handled most of the API/AI handling.
                </Card.Text>
                <Card.Text className="card-text">
                  hmalik@udel.edu
                </Card.Text>
                <div className="linkedin-link">
                  <a 
                    href="https://www.linkedin.com/in/hamna-malik-a04b43298/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <img 
                      src={linkedinImage}
                      alt="LinkedIn" 
                      className="linkedin-icon"
                    />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 2 */}
          <Col md={4} className="mb-4">
            <Card className="team-member-card">
              <Card.Body>
                <Card.Title className="card-title">Ketsia Lumiere Donfack Ouwe</Card.Title>
                <Card.Text className="card-text">
                  Worked on the layout and structure of the detailed career quiz
                </Card.Text>
                <Card.Text className="card-text">
                  ketsiad@udel.edu
                </Card.Text>
                <div className="linkedin-link">
                  <a 
                    href="https://www.linkedin.com/in/ketsia-lumiere-donfack-ouwe/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <img 
                      src={linkedinImage}
                      alt="LinkedIn" 
                      className="linkedin-icon"
                    />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 3 */}
          <Col md={4} className="mb-4">
            <Card className="team-member-card">
              <Card.Body>
                <Card.Title className="card-title">Meera Nambiar</Card.Title>
                <Card.Text className="card-text">
                  Worked on creating and designing the homepage.
                </Card.Text>
                <Card.Text className="card-text">
                  mnambiar@udel.edu
                </Card.Text>
                <div className="linkedin-link">
                  <a 
                    href="https://www.linkedin.com/in/meera-nambiar/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <img 
                      src={linkedinImage}
                      alt="LinkedIn" 
                      className="linkedin-icon"
                    />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Footer Section */}
      <footer className="footer text-center">
        <p>© 2025 Career Matcher - Find Your Perfect Career Path</p>
      </footer>
    </Container>
  );
};

export default NewAboutUs;