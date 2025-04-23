import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, Button, Container, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import usImage from "./hiii.png"


const AboutUs = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
  const [search, setSearch] = useState("");

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);




  const themeButtonVariant = theme === "default" ? "outline-light" : "outline-dark";
  const themeButtonText = theme === "default" ? "🌸 Change Theme" : "💼 Change Theme";

  return (
    <Container style={{ backgroundColor: theme === "default" ? "#f0f8ff" : "#ffe6f2", padding: "20px", borderRadius: "10px" }}>
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
            <Navbar.Brand style={{ fontSize: "1.8rem", fontWeight: "bold", color: theme === "default" ? "#ffcc00" : "#ff66b2", display: "block", cursor: "pointer" }}>
              Find Your Career!
            </Navbar.Brand>
            <Nav className="justify-content-center" style={{ position: "relative", bottom: "10px" }}>
              <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("home"); }} style={{ color: theme === "default" ? "#ffcc00" : "#ff66b2" }}>
                Home
              </Nav.Link>
              <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("simple-quiz"); }} style={{ color: theme === "default" ? "#ffcc00" : "#ff66b2" }}>
                Simple Quiz
              </Nav.Link>
              <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("detailed-quiz"); }} style={{ color: theme === "default" ? "#ffcc00" : "#ff66b2" }}>
                Detailed Quiz
              </Nav.Link>
              <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("about-us"); }} style={{ color: theme === "default" ? "#ffcc00" : "#ff66b2" }}>
                About Us
              </Nav.Link>
            </Nav>
          </div>
          <Button variant={themeButtonVariant} onClick={toggleTheme} className="me-2" style={{ zIndex: 10 }}>
            {themeButtonText}
          </Button>
        </div>
      </Navbar>

      {/* About Us Section */}

      <img 
            src={usImage} 
            alt="Us" 
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} 
       />







    </Container>
  );
};

export default AboutUs;