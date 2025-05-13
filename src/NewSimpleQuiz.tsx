import React, { useState, useEffect } from "react";
import { Container, Card, Button, Form, ProgressBar, Modal } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NewHomePage.css";

// image imports
import sakura from "./flowa.png";
import petals from "./falldown.gif";
import simpleQ1 from "./images/simple-q1.jpg";
import simpleQ2 from "./images/simple-q2.jpg";
import simpleQ3 from "./images/simple-q3.jpg";
import simpleQ4 from "./images/simple-q4.jpg";
import simpleQ5 from "./images/simple-q5.jpg";
import simpleQ6 from "./images/simple-q6.png";
import simpleQ7 from "./images/simple-q7.png";
import simpleQ8 from "./images/simple-q8.jpg";
import simpleQ9 from "./images/simple-q9.jpg";
import simpleQ10 from "./images/simple-q10.jpg";
import confetti from "canvas-confetti";

const NewSimpleQuizPage = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
  const [answers, setAnswers] = useState<number>(0);
  const [questionAnswered, setQuestionAnswered] = useState<boolean[]>(new Array(10).fill(false));
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(new Array(10).fill(null));
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    const launchConfetti = () => {
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;
  
      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
  
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        confetti({
          particleCount: 100,  // Number of confetti particles
          spread: 180,          // Widen the spread
          origin: { y: 0.5 },   // Origin from the center of the top
          angle: 90,            // Horizontal burst
          scalar: 1.2,          // Increase the size of the confetti
          shapes: ['circle'],   // Confetti shape as circle
          colors: [
            "#ff66b2",  // Light pink
            "#ff3399",  // Hot pink
            "#ff1a8c",  // Deep pink
            "#ff80bf",  // Soft pink
            "#ff4d94",  // Medium pink
          ],
        });
      }, 250);
    };
  
    if (progress === 100 && !showModal) {
      localStorage.setItem("simpleQuizAnswers", JSON.stringify(userAnswers));
      setShowModal(true);
      launchConfetti(); // 🎉 Pop the confetti
    }
  }, [progress, showModal, userAnswers]);

  // Handler for modal close button
  const handleCloseModal = () => {
    setShowModal(false);
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

   {/* Fixed Progress Bar at the top of the screen */}
<div
  style={{
    position: "fixed",  // Ensure it stays fixed at the top
    top: 0,             // Keep it at the very top of the screen
    left: 0,
    right: 0,
    zIndex: 1040,       // Ensure it's above other content
    padding: "10px 0",
    backgroundColor: "#FFF4F2", // To make sure it's not see-through
    boxShadow: "0 4px 2px -2px gray", 
  }}
>
  <ProgressBar
    now={progress}
    label={`${Math.round(progress)}%`}
    style={{
      backgroundColor: "#FFF4F2",
      height: "15px",
    }}
    variant="danger"
    animated
  >
    <div
      className="progress-bar"
      role="progressbar"
      style={{
        width: `${progress}%`,
        backgroundColor: "#e91e63", 
      }}
    >
      {`${Math.round(progress)}%`}
    </div>
  </ProgressBar>
</div>

      {/* Main Content - Added padding to account for fixed progress bar */}
      <div style={{ marginTop: "30px" }}></div>
      <div className="main-content quiz-content-with-fixed-progress">
        <Modal show={showModal} onHide={handleCloseModal} className="result-modal">
          <Modal.Header closeButton>
            <Modal.Title>🎉 You Finished the Quiz!</Modal.Title>
          </Modal.Header>
          <Modal.Body> 
            <p>Congrats! You have completed the quiz. Click the button below to see your results.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={() => navigateTo("simple-quiz-results")} className="custom-button">
              See Results
            </Button>
          </Modal.Footer>
        </Modal>

        <Card className="quiz-card">
          <Card.Body>
            <Card.Title className="card-title">Simple Career Quiz</Card.Title>

            {/* Question 1 */}
            <Card className="question-card">
              <h5>1. What type of work environment do you prefer?</h5>
              
              <img 
                src={simpleQ1} 
                alt="Work Environment" 
                className="question-image"
              />

              <Form>
                <Form.Check type="radio" label="🏢 Office-based" name="q1" onChange={() => handleAnswer(0, "Office-based")} />
                <Form.Check type="radio" label="🌿 Outdoors" name="q1" onChange={() => handleAnswer(0, "Outdoors")} />
                <Form.Check type="radio" label="🏡 Remote / Work from home" name="q1" onChange={() => handleAnswer(0, "Remote / Work from home")} />
                <Form.Check type="radio" label="🚀 Fast-paced / Hands-on" name="q1" onChange={() => handleAnswer(0, "Fast-paced / Hands-on")} />
              </Form>
            </Card>

            {/* Question 2 */}
            <Card className="question-card">
              <h5>2. Which activity sounds most enjoyable to you?</h5>
              <img 
                src={simpleQ2} 
                alt="Activity" 
                className="question-image"
              />
              <Form>
                <Form.Check type="radio" label="💻 Solving problems with technology" name="q2" onChange={() => handleAnswer(1, "Solving problems with technology")} /> 
                <Form.Check type="radio" label="🎨 Creating art, music, or designs" name="q2" onChange={() => handleAnswer(1, "Creating art, music, or designs")} />
                <Form.Check type="radio" label="🏥 Helping people in need" name="q2" onChange={() => handleAnswer(1, "Helping people in need")} />
                <Form.Check type="radio" label="📊 Managing projects or businesses" name="q2" onChange={() => handleAnswer(1, "Managing projects or businesses")} />
              </Form>
            </Card>

            {/* Question 3 */}
            <Card className="question-card">
              <h5>3. How do you like to solve problems?</h5>
              <img 
                src={simpleQ3}
                alt="Solving Problems" 
                className="question-image"
              />
              <Form>
                <Form.Check type="radio" label="🔬 Researching and experimenting" name="q3" onChange={() => handleAnswer(2, "Researching and experimenting")} />
                <Form.Check type="radio" label="💬 Talking with people and finding solutions" name="q3" onChange={() => handleAnswer(2, "Talking with people and finding solutions")} />
                <Form.Check type="radio" label="🛠️ Building or fixing things" name="q3" onChange={() => handleAnswer(2, "Building or fixing things")} />
                <Form.Check type="radio" label="💡 Thinking creatively and coming up with new ideas" name="q3" onChange={() => handleAnswer(2, "Thinking creatively and coming up with new ideas")} />
              </Form>
            </Card>

            {/* Question 4 */}
            <Card className="question-card">
              <h5>4. Which school subject do you enjoy the most?</h5>
              <img 
                src={simpleQ4}
                alt="School Subject" 
                className="question-image"
              />
              <Form>
                <Form.Check type="radio" label="🧮 Math & Science" name="q4" onChange={()=> handleAnswer(3, "Math & Science")} />
                <Form.Check type="radio" label="🎭 Art & Music" name="q4" onChange={() => handleAnswer(3, "Art & Music")} />
                <Form.Check type="radio" label="📚 English & Social Studies" name="q4" onChange={() => handleAnswer(3, "English & Social Studies")} />
                <Form.Check type="radio" label="⚙️ Engineering & Technology" name="q4" onChange={() => handleAnswer(3, "Engineering & Technology")} />
              </Form>
            </Card>

            {/* Question 5 */}
            <Card className="question-card">
              <h5>5. Do you prefer working alone or with others?</h5>
              <img 
                src={simpleQ5}
                alt="Teamwork" 
                className="question-image"
              />
              <Form>
                <Form.Check type="radio" label="🤝 I love teamwork and collaboration" name="q5" onChange={() => handleAnswer(4, "I love teamwork and collaboration")} />
                <Form.Check type="radio" label="👤 I prefer working independently" name="q5" onChange={() => handleAnswer(4, "I prefer working independently")} />
                <Form.Check type="radio" label="🏆 A mix of both works best for me" name="q5" onChange={() => handleAnswer(4, "A mix of both works best for me")} />
              </Form>
            </Card>

            {/* Question 6 */}
            <Card className="question-card">
              <h5>6. What is most important to you in a career?</h5>
              <img 
                src={simpleQ6} 
                alt="Career Importance" 
                className="question-image"
              />
              <Form>
                <Form.Check type="radio" label="💰 High salary and stability" name="q6" onChange={()=> handleAnswer(5, "High salary and stability")} />
                <Form.Check type="radio" label="👨‍👩‍👧‍👦 Work-life balance and flexibility" name="q6" onChange={() => handleAnswer(5, "Work-life balance and flexibility")} />
                <Form.Check type="radio" label="📚 Opportunities for growth and learning" name="q6" onChange={() => handleAnswer(5, "Opportunities for growth and learning")} />
                <Form.Check type="radio" label="🌍 Making a positive impact" name="q6" onChange={() => handleAnswer(5, "Making a positive impact")} />
              </Form>
            </Card>

            {/* Question 7 */}
            <Card className="question-card">
              <h5>7. What best describes your ideal work schedule?</h5>
              <img 
                src={simpleQ7} 
                alt="Work Schedule" 
                className="question-image"
              />
              <Form>
                <Form.Check type="radio" label="⏰ Fixed hours (9 to 5)" name="q7" onChange={() => handleAnswer(6, "Fixed hours (9 to 5)")} />
                <Form.Check type="radio" label="🕐 Flexible hours" name="q7" onChange={() => handleAnswer(6, "Flexible hours")} />
                <Form.Check type="radio" label="💼 No set schedule" name="q7" onChange={() => handleAnswer(6, "No set schedule")} />
              </Form>
            </Card>

            {/* Question 8 */}
            <Card className="question-card">
              <h5>8. What motivates you the most in your work?</h5>
              <img 
                src={simpleQ8} 
                alt="Motivation" 
                className="question-image"
              />
              <Form>
                <Form.Check type="radio" label="🏆 Achieving goals and recognition" name="q8" onChange={() => handleAnswer(7, "Achieving goals and recognition")} />
                <Form.Check type="radio" label="🤝 Making a difference in people's lives" name="q8" onChange={() => handleAnswer(7, "Making a difference in people's lives")} />
                <Form.Check type="radio" label="💡 Learning and growing constantly" name="q8" onChange={() => handleAnswer(7, "Learning and growing constantly")} />
                <Form.Check type="radio" label="💰 Financial success and security" name="q8" onChange={() => handleAnswer(7, "Financial success and security")} />
              </Form>
            </Card>

            {/* Question 9 */}
            <Card className="question-card">
              <h5>9. How do you usually make decisions?</h5>
              <img 
                src={simpleQ9}
                alt="Decision Making" 
                className="question-image"
              />
              <Form>
                <Form.Check type="radio" label="🧠 I analyze the facts and data" name="q9" onChange={()=> handleAnswer(8, "I analyze the facts and data")} />
                <Form.Check type="radio" label="❤️ I go with my gut or intuition" name="q9" onChange={() => handleAnswer(8, "I go with my gut or intuition")} />
                <Form.Check type="radio" label="👂 I ask others for input and advice" name="q9" onChange={() => handleAnswer(8, "I ask others for input and advice")} />
                <Form.Check type="radio" label="⚖️ I weigh pros and cons carefully" name="q9" onChange={() => handleAnswer(8, "I weigh pros and cons carefully")} />
              </Form>
            </Card>

            {/* Question 10 */}
            <Card className="question-card">
              <h5>10. What kind of impact do you expect your career to have?</h5>
              <img 
                src={simpleQ10}
                alt="Impact" 
                className="question-image"
              />
              <Form>
                <Form.Check type="radio" label="🌍 Solve global or environmental issues" name="q10" onChange={() => handleAnswer(9, "Solve global or environmental issues")} />
                <Form.Check type="radio" label="👨‍🏫 Educate, inform, or inspire others" name="q10" onChange={() => handleAnswer(9, "Educate, inform, or inspire others")} />
                <Form.Check type="radio" label="📈 Innovate and advance industries" name="q10" onChange={() => handleAnswer(9, "Innovate and advance industries")} />
                <Form.Check type="radio" label="🛡️ Improve people's lives directly" name="q10" onChange={() => handleAnswer(9, "Improve people's lives directly")} />
              </Form>
            </Card>
          </Card.Body>
        </Card>
      </div>

      {/* Footer Section */}
      <footer className="footer text-center">
        <div>© 2025 Career Matcher - Find Your Perfect Career Path</div>
      </footer>
    </Container>
  );
};

export default NewSimpleQuizPage;