import React, { useState, useEffect } from "react";
import { Button, Navbar, Nav, Form, InputGroup, Card } from "react-bootstrap";

const SimpleQuizResults: React.FC<{ navigateTo: (page: string) => void }> = ({ navigateTo }) => {
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

    const themeButtonVariant = theme === "default" ? "outline-light" : "outline-dark";
    const themeButtonText = theme === "default" ? "🌸 Change Theme" : "💼 Change Theme";
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  
    return (
      <div>
        <Navbar bg={theme === "default" ? "dark" : "light"} variant={theme === "default" ? "dark" : "light"} expand="lg" className="p-3 rounded">
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
                href="#" 
                onClick={(e) => { e.preventDefault(); navigateTo("home"); }}
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

            <div>
              <Button 
                variant={themeButtonVariant}
                onClick={toggleTheme}
                className="me-2"
              >
                {themeButtonText}
              </Button>
            </div>
          </div>
        </Navbar>

        <div className="container mt-5">
          <Card style={{ backgroundColor: theme === "default" ? "white" : "#ffcce6", color: theme === "default" ? "#333" : "#800040" }}>
            <Card.Body>
              <h1>Congratulations!</h1>
              <p>You have completed the quiz.</p>
              <h2>Your Results</h2>
              <Card.Text>
                Based on your answers, we recommend careers in:
                <ul>
                  <li>Software Development</li>
                  <li>Graphic Design</li>
                  <li>Project Management</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
};

export default SimpleQuizResults;