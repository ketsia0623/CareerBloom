import React, { useState, useEffect } from "react";
import { Container, Card, Button, Navbar, Nav, Form, InputGroup, ProgressBar, Modal } from "react-bootstrap";
import simpleQ1 from "C:/Users/ketsi/OneDrive/Documents/CISC275/CISC275_Starter-1/src/images/simple-q1.jpg";

const SimpleQuizPage = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
  const [search, setSearch] = useState("");
  const [answers, setAnswers] = useState<number>(0);
  const [questionAnswered, setQuestionAnswered] = useState<boolean[]>(new Array(10).fill(false));
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(new Array(10).fill(null));
  const [showModal, setShowModal] = useState(false);
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

  const handleAnswer = (questionIndex: number, answer: string) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = answer;
    setUserAnswers(updatedAnswers);
  
    if (!questionAnswered[questionIndex]) {
      setAnswers(answers + 1);
      const updatedAnswered = [...questionAnswered];
      updatedAnswered[questionIndex] = true;
      setQuestionAnswered(updatedAnswered);
    }
  };



  const progress = (answers / 10) * 100;

  if (progress === 100 && !showModal) {
    setShowModal(true);
  }

  useEffect(() => {
    if (progress === 100 && !showModal) {
      localStorage.setItem("simpleQuizAnswers", JSON.stringify(userAnswers));
      setShowModal(true);
    }
  }, [progress, showModal, userAnswers]);

  return (
    <Container>
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
            <Navbar.Brand 
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
              <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("about-us"); }} style={{ color: theme === "default" ? "#ffcc00" : "#ff66b2" }}>
                About Us
              </Nav.Link>
            </Nav>
          </div>

          <Button 
            variant={themeButtonVariant}
            onClick={toggleTheme}
            className="me-2"
            style={{ zIndex: 10 }}
          >
            {themeButtonText}
          </Button>
        </div>
      </Navbar>

      <div style={{
          position: "sticky",
          top: "56px",  
          zIndex: 1040,
          backgroundColor: "#fff",
          padding: "10px 0",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
        }}>
        <ProgressBar now={progress} label={`${Math.round(progress)}%`} />
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>🎉 You Finished the Quiz!</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <p>Congrats! You have completed the quiz. Click the button below to see your results.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => navigateTo("simple-quiz-results")}>
            See Results
          </Button>
        </Modal.Footer>
      </Modal>

      <Card className="mt-4" style={{ marginTop: "150px" }}>
        <Card.Body>
          <Card.Title>Simple Career Quiz</Card.Title>

          {/* Question 1 */}
          <Card className="mb-4 p-3">
            <h5>1. What type of work environment do you prefer?</h5>
            
            <img 
            src={simpleQ1} 
            alt="Work Environment" 
            style={{ width: "200%", maxWidth: "450px", height: "auto", display: "block", margin: "10px auto", borderRadius: "8px" }}
            />

            <Form>
              <Form.Check type="radio" label="🏢 Office-based" name="q1"   onChange={() => handleAnswer(0, "Office-based")}  />
              <Form.Check type="radio" label="🌿 Outdoors" name="q1"   onChange={() => handleAnswer(0, "Outdoors")}  />
              <Form.Check type="radio" label="🏡 Remote / Work from home" name="q1"  onChange={() => handleAnswer(0, "Remote / Work from home")}  />
              <Form.Check type="radio" label="🚀 Fast-paced / Hands-on" name="q1"  onChange={() => handleAnswer(0, "Fast-paced / Hands-on")}  />
            </Form>
          </Card>

          {/* Question 2 */}
          <Card className="mb-4 p-3">
            <h5>2. Which activity sounds most enjoyable to you?</h5>
            <img 
              src="https://as1.ftcdn.net/jpg/03/37/04/48/1000_F_337044860_7cBFl72dC1kKCbFhHOKulDH0BlLns8gq.jpg" 
              alt="Activity" 
              style={{ width: "200%", maxWidth: "450px", height: "auto", display: "block", margin: "10px auto", borderRadius: "8px" }}
            />
            <Form>
              <Form.Check type="radio" label="💻 Solving problems with technology" name="q2" onChange={() => handleAnswer(1, "Solving problems with technology")}  /> 
              <Form.Check type="radio" label="🎨 Creating art, music, or designs" name="q2" onChange={() => handleAnswer(1, "Creating art, music, or designs")} />
              <Form.Check type="radio" label="🏥 Helping people in need" name="q2" onChange={() => handleAnswer(1, "Helping people in need")} />
              <Form.Check type="radio" label="📊 Managing projects or businesses" name="q2" onChange={() => handleAnswer(1, "Managing projects or businesses")} />
            </Form>
          </Card>

          {/* Question 3 */}
          <Card className="mb-4 p-3">
            <h5>3. How do you like to solve problems?</h5>
            <img 
              src="https://img-cdn.inc.com/image/upload/f_webp,c_fit,w_1920,q_auto/images/panoramic/getty_588960966_354337.jpg" 
              alt="Solving Problems" 
              style={{ width: "200%", maxWidth: "450px", height: "auto", display: "block", margin: "10px auto", borderRadius: "8px" }}
            />
            <Form>
              <Form.Check type="radio" label="🔬 Researching and experimenting" name="q3"onChange={() => handleAnswer(2, "Researching and experimenting")} />
              <Form.Check type="radio" label="💬 Talking with people and finding solutions" name="q3" onChange={() => handleAnswer(2, "Talking with people and finding solutions")} />
              <Form.Check type="radio" label="🛠️ Building or fixing things" name="q3" onChange={() => handleAnswer(2, "Building or fixing things")} />
              <Form.Check type="radio" label="💡 Thinking creatively and coming up with new ideas" name="q3" onChange={() => handleAnswer(2, "Thinking creatively and coming up with new ideas")} />
            </Form>
          </Card>

          {/* Question 4 */}
          <Card className="mb-4 p-3">
            <h5>4. Which school subject do you enjoy the most?</h5>
            <img 
              src="https://images.theconversation.com/files/49135/original/22qc7r28-1400667334.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&fit=clip" 
              alt="School Subject" 
              style={{ width: "200%", maxWidth: "450px", height: "auto", display: "block", margin: "10px auto", borderRadius: "8px" }}
            />
            <Form>
              <Form.Check type="radio" label="🧮 Math & Science" name="q4" onChange={()=> handleAnswer(3, "Math & Science")} />
              <Form.Check type="radio" label="🎭 Art & Music" name="q4" onChange={() => handleAnswer(3, "Art & Music")} />
              <Form.Check type="radio" label="📚 English & Social Studies" name="q4" onChange={() => handleAnswer(3, "English & Social Studies")} />
              <Form.Check type="radio" label="⚙️ Engineering & Technology" name="q4" onChange={() => handleAnswer(3, "Engineering & Technology")} />
            </Form>
          </Card>

          {/* Question 5 */}
          <Card className="mb-4 p-3">
            <h5>5. Do you prefer working alone or with others?</h5>
            <img 
              src="https://www.freshbooks.com/wp-content/uploads/2021/10/what-is-teamwork.jpg" 
              alt="Teamwork" 
              style={{ width: "200%", maxWidth: "450px", height: "auto", display: "block", margin: "10px auto", borderRadius: "8px" }}
            />
            <Form>
              <Form.Check type="radio" label="🤝 I love teamwork and collaboration" name="q5" onChange={() => handleAnswer(4, "I love teamwork and collaboration")} />
              <Form.Check type="radio" label="👤 I prefer working independently" name="q5" onChange={() => handleAnswer(4, "I prefer working independently")}  />
              <Form.Check type="radio" label="🏆 A mix of both works best for me" name="q5" onChange={() => handleAnswer(4, "A mix of both works best for me")}  />
            </Form>
          </Card>

          {/* Question 6 */}
          <Card className="mb-4 p-3">
            <h5>6. What is most important to you in a career?</h5>
            <img 
              src="https://jobacle.com/wp-content/uploads/2021/06/career-21.png" 
              alt="Career Importance" 
              style={{ width: "200%", maxWidth: "450px", height: "auto", display: "block", margin: "10px auto", borderRadius: "8px" }}
            />
            <Form>
              <Form.Check type="radio" label="💰 High salary and stability" name="q6" onChange={()=> handleAnswer(5, "High salary and stability")} />
              <Form.Check type="radio" label="👨‍👩‍👧‍👦 Work-life balance and flexibility" name="q6" onChange={() => handleAnswer(5, "Work-life balance and flexibility")}/>
              <Form.Check type="radio" label="📚 Opportunities for growth and learning" name="q6" onChange={() => handleAnswer(5, "Opportunities for growth and learning")} />
              <Form.Check type="radio" label="🌍 Making a positive impact" name="q6" onChange={() => handleAnswer(5, "Making a positive impact")} />
            </Form>
          </Card>

          {/* Question 7 */}
          <Card className="mb-4 p-3">
            <h5>7. What best describes your ideal work schedule?</h5>
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRseLevPl_mBPTYYKV_Dc0ZicSQiTmIDwj9hQ&s" 
              alt="Work Schedule" 
              style={{ width: "200%", maxWidth: "450px", height: "auto", display: "block", margin: "10px auto", borderRadius: "8px" }}
            />
            <Form>
              <Form.Check type="radio" label="⏰ Fixed hours (9 to 5)" name="q7" onChange={() => handleAnswer(6, "Fixed hours (9 to 5)")} />
              <Form.Check type="radio" label="🕐 Flexible hours" name="q7" onChange={() => handleAnswer(6, "Flexible hours")}  />
              <Form.Check type="radio" label="💼 No set schedule" name="q7" onChange={() => handleAnswer(6, "No set schedule")}  />
            </Form>
          </Card>

          {/* Question 8 */}
          <Card className="mb-4 p-3">
            <h5>8. What motivates you the most in your work?</h5>
            <img 
              src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80" 
              alt="Motivation" 
              style={{ width: "200%", maxWidth: "450px", height: "auto", display: "block", margin: "10px auto", borderRadius: "8px" }}
            />
            <Form>
              <Form.Check type="radio" label="🏆 Achieving goals and recognition" name="q8" onChange={() => handleAnswer(7, "Achieving goals and recognition")}  />
              <Form.Check type="radio" label="🤝 Making a difference in people's lives" name="q8" onChange={() => handleAnswer(7, "Making a difference in people's lives")} />
              <Form.Check type="radio" label="💡 Learning and growing constantly" name="q8" onChange={() => handleAnswer(7, " Learning and growing constantly")} />
              <Form.Check type="radio" label="💰 Financial success and security" name="q8" onChange={() => handleAnswer(7, " Financial success and security")} />
            </Form>
          </Card>

          {/* Question 9 */}
          <Card className="mb-4 p-3">
            <h5>9. How do you usually make decisions?</h5>
            <img 
              src="https://media.istockphoto.com/id/1355658095/vector/concept-of-various-paths.jpg?s=612x612&w=0&k=20&c=Ggy1PJDGR7tSzTvewl6VwgAH7cPQrrw089HSYyswMuE=" 
              alt="Decision Making" 
              style={{ width: "200%", maxWidth: "450px", height: "auto", display: "block", margin: "10px auto", borderRadius: "8px" }}
            />
            <Form>
              <Form.Check type="radio" label="🧠 I analyze the facts and data" name="q9" onChange={()=> handleAnswer(8, "I analyze the facts and data")} />
              <Form.Check type="radio" label="❤️ I go with my gut or intuition" name="q9" onChange={() => handleAnswer(8, "I go with my gut or intuition")} />
              <Form.Check type="radio" label="👂 I ask others for input and advice" name="q9" onChange={() => handleAnswer(8, " I ask others for input and advice")} />
              <Form.Check type="radio" label="⚖️ I weigh pros and cons carefully" name="q9" onChange={() => handleAnswer(8, "I weigh pros and cons carefully")} />
            </Form>
          </Card>

          {/* Question 10 */}
          <Card className="mb-4 p-3">
            <h5>10. What kind of impact do you expect your career to have?</h5>
            <img 
              src="https://media.istockphoto.com/id/979622962/photo/hand-putting-wooden-cube-block-on-blue-background-with-word-career-and-copy-space-for-your.jpg?s=612x612&w=0&k=20&c=WtIeJMPJ-6ozlnpyps0R2TLwMSTYFtWAT6yRBQymRSg=" 
              alt="Impact" 
              style={{ width: "200%", maxWidth: "450px", height: "auto", display: "block", margin: "10px auto", borderRadius: "8px" }}
            />
            <Form>
              <Form.Check type="radio" label="🌍 Solve global or environmental issues" name="q10" onChange={()  => handleAnswer(9, "Solve global or environmental issues")} />
              <Form.Check type="radio" label="👨‍🏫 Educate, inform, or inspire others" name="q10" onChange={()  => handleAnswer(9, " Educate, inform, or inspire others")} />
              <Form.Check type="radio" label="📈 Innovate and advance industries" name="q10" onChange={()  => handleAnswer(9, "Innovate and advance industries")} />
              <Form.Check type="radio" label="🛡️ Improve people's lives directly" name="q10" onChange={()  => handleAnswer(9, "Improve people's lives directly")} />
            </Form>
          </Card>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SimpleQuizPage;
