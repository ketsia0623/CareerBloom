import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, Button, Container, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import flowerImage from "./flowers.png"
import usImage from "./us.png"
import linkedinImage from "./linkedin-logo.png"


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
  


    <div
  style={{
    backgroundImage: `url(${flowerImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "50px",
    borderRadius: "10px",
    minHeight: "100vh",
    color: "#000000", // if text needs to be light
    position: "relative",
    zIndex: 1,
  }}
>

<img 
  src={usImage} 
  alt="Us" 
  style={{ 
    width: "30%", 
    height: "auto",         // keep aspect ratio
    objectFit: "cover", 
    borderRadius: "10px", 
    display: "block",       // required for margin auto to work
    margin: "20px auto"     // centers horizontally, adds top/bottom spacing
  }} 
/>


  <div style={{ 
    display: "flex", 
    justifyContent: "center", 
    flexWrap: "wrap", 
    marginTop: "30px", 
    gap: "20px" 
  }}>
    {/* Card 1 */}
    <div style={{ 
  backgroundColor: "#ffe6f2", 
  borderRadius: "10px", 
  padding: "20px", 
  width: "300px", 
  margin: "10px", 
  position: "relative", 
  minHeight: "200px" 
}}>
  <h5>Hamna Malik</h5>
  <p>Worked on the simple quiz page and handled most of the API/AI handling.</p>
  <p>hmalik@udel.edu</p>

  <a 
    href="https://www.linkedin.com/in/hamna-malik-a04b43298/" 
    target="_blank" 
    rel="noopener noreferrer"
    style={{ 
      position: "absolute", 
      bottom: "10px", 
      right: "10px" 
    }}
  >
    <img 
      src={linkedinImage}
      alt="LinkedIn" 
      style={{ width: "30px", height: "30px" }}
    />
  </a>
    </div>

    {/* Card 2 */}

   <div style={{ 
  backgroundColor: "#ffe6f2", 
  borderRadius: "10px", 
  padding: "20px", 
  width: "300px", 
  margin: "10px", 
  position: "relative", 
  minHeight: "200px" 
}}>
  <h5>Ketsia Lumiere Donfack Ouwe</h5>
  <p>Worked on the layout and structure of the detailed career quiz</p>
  <p>ketsiad@udel.edu</p>

  <a 
    href="https://www.linkedin.com/in/ketsia-lumiere-donfack-ouwe/" 
    target="_blank" 
    rel="noopener noreferrer"
    style={{ 
      position: "absolute", 
      bottom: "10px", 
      right: "10px" 
    }}
  >
    <img 
      src={linkedinImage}
      alt="LinkedIn" 
      style={{ width: "30px", height: "30px" }}
    />
  </a>
    </div>

   {/* Card 3 */}
<div style={{ 
  backgroundColor: "#ffe6f2", 
  borderRadius: "10px", 
  padding: "20px", 
  width: "300px", 
  margin: "10px", 
  position: "relative", 
  minHeight: "200px" 
}}>
  <h5>Meera Nambiar</h5>
  <p>Worked on creating and designing the homepage.</p>
  <p>mnambiar@udel.edu</p>

  <a 
    href="https://www.linkedin.com/in/meera-nambiar/" 
    target="_blank" 
    rel="noopener noreferrer"
    style={{ 
      position: "absolute", 
      bottom: "10px", 
      right: "10px" 
    }}
  >
    <img 
      src={linkedinImage}
      alt="LinkedIn" 
      style={{ width: "30px", height: "30px" }}
    />
  </a>
</div>

</div>

</div>

    </Container>
  );
};

export default AboutUs;