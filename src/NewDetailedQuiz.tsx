import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Navbar,
  Nav,
  Form,
  ProgressBar,
  Modal,
} from "react-bootstrap";
import "./NewHomePage.css";

// image import statements
import detailedQ1 from "./images/detailed-q1.jpg";
import detailedQ2 from "./images/detailed-q2.jpg";
import detailedQ3 from "./images/detailed-q3.jpg";
import detailedQ4 from "./images/detailed-q4.jpg";
import detailedQ5 from "./images/detailed-q5.jpg";
import detailedQ6 from "./images/detailed-q6.jpg";
import detailedQ7 from "./images/detailed-q7.jpg";
import detailedQ8 from "./images/detailed-q8.jpg";
import detailedQ9 from "./images/detailed-q9.jpg";
import detailedQ10 from "./images/detailed-q10.jpg";
import sakura from "./flowa.png"; // just the flower
import petals from "./falldown.gif"; // the falling petals
import confetti from "canvas-confetti";

const NewDetailedQuizPage = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
  const [answers, setAnswers] = useState<string[]>(new Array(10).fill(""));
  const [questionAnswered, setQuestionAnswered] = useState<boolean[]>(new Array(10).fill(false));
  const [showModal, setShowModal] = useState(false);
  const [activities, setActivities] = useState<string[]>([]);

  const handleAnswer = (questionIndex: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = value;

    const updatedQuestionAnswered = [...questionAnswered];
    updatedQuestionAnswered[questionIndex] = true;

    setAnswers(updatedAnswers);
    setQuestionAnswered(updatedQuestionAnswered);
  };

  const toggleActivity = (activity: string, checked: boolean) => {
    if (checked) {
      const updated = [...activities, activity];
      setActivities(updated);
      if (activities.length === 0) {
        const updatedQA = [...questionAnswered];
        updatedQA[2] = true;
        setQuestionAnswered(updatedQA);
      }
    } else {
      const updated = activities.filter((a) => a !== activity);
      setActivities(updated);
      if (updated.length === 0) {
        const updatedQA = [...questionAnswered];
        updatedQA[2] = false;
        setQuestionAnswered(updatedQA);
      }
    }
  };

  const progress = (questionAnswered.filter(Boolean).length / 10) * 100;

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
       localStorage.setItem("simpleQuizAnswers", JSON.stringify(setAnswers));
       setShowModal(true);
       launchConfetti(); // 🎉 Pop the confetti
     }
   }, [progress, showModal, setAnswers]);
 

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container fluid className="main-container">
      <div className="falling-petals">
        <img src={petals} alt="Falling petals" className="petals-image" />
      </div>

      <div className="navigation-bar">
        <div className="text-center">
          <div className="header-container">
            <img src={sakura} alt="sakura left" className="sakura-image" />
            <Navbar.Brand className="navbar-brand" style={{ fontSize: '3rem' }}>
                Career Bloom
            </Navbar.Brand>
            <img src={sakura} alt="sakura right" className="sakura-image" />
          </div>
          <Nav className="justify-content-center">
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("home"); }} className="nav-link">Home</Nav.Link>
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("simple-quiz"); }} className="nav-link">Simple</Nav.Link>
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("detailed-quiz"); }} className="nav-link">Detailed</Nav.Link>
            <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("about-us"); }} className="nav-link">About Us</Nav.Link>
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

      {/* Modal Notification with Close Button Functionality */}
      <div style={{ marginTop: "30px" }}></div>
      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        className="result-modal"
      >

        <Modal.Header>
          <Modal.Title>🎉 You Finished the Quiz!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Congrats! You have completed the quiz. Click the button below to see your results.</p>
        </Modal.Body>
        <Modal.Footer>
         
          <Button
            className="custom-button"
            onClick={() => {
              localStorage.setItem("detailedQuizAnswers", JSON.stringify(answers));
              navigateTo("detailed-quiz-results");
            }}
          >
            See Results
          </Button>
        </Modal.Footer>
      </Modal>

      
      {/* Quiz Content - Added top padding to accommodate fixed progress bar */}
      <div className="main-content quiz-content-with-fixed-progress">
        <Card.Title className="card-title text-center">Detailed Career Quiz</Card.Title>
        <p className="card-text text-center mb-4">
          Take this comprehensive assessment to discover career paths that align with your skills, interests, and values.
        </p>

        {/* Question 1 */}
        <Card className="question-card">
          <h5>1. Describe a project or task that made you feel proud. What were you doing?</h5>
          <img
            src={detailedQ1}
            alt="Work Environment"
            className="question-image"
          />
          <Form>
            <Form.Group controlId="q1">
              <Form.Control
                type="text"
                placeholder="Type your answer here..."
                value={answers[0]}
                onChange={(e) => handleAnswer(0, e.target.value)}
                className="form-control"
              />
            </Form.Group>
          </Form>
        </Card>

        {/* Question 2 */}
        <Card className="question-card">
          <h5>2. What would your ideal workday look like from start to finish?</h5>
          <img
            src={detailedQ2}
            alt="Ideal Day"
            className="question-image"
          />
          <Form>
            <Form.Group controlId="q2">
              <Form.Control
                type="text"
                placeholder="Type your answer here..."
                value={answers[1]}
                onChange={(e) => handleAnswer(1, e.target.value)}
                className="form-control"
              />
            </Form.Group>
          </Form>
        </Card>

        {/* Question 3 */}
        <Card className="question-card">
          <h5>3. Which of these activities do you enjoy the most?</h5>
          <img
            src={detailedQ3}
            alt="Activities"
            className="question-image"
          />
          <Form>
            <Form.Group controlId="q3">
              {["Solving puzzles", "Writing stories", "Teaching others", "Fixing/building things", "Organizing events"].map((activity) => (
                <Form.Check
                  key={activity}
                  type="checkbox"
                  label={activity}
                  onChange={(e) => toggleActivity(activity, e.target.checked)}
                  className="form-check"
                  checked={activities.includes(activity)}
                />
              ))}
            </Form.Group>
          </Form>
        </Card>

        {/* Question 4 (Dropdown) */}
        <Card className="question-card">
          <h5>4. Select a field you're most interested in exploring:</h5>
          <img
            src={detailedQ4}
            alt="Career Fields"
            className="question-image"
          />
          <Form>
            <Form.Group controlId="q4">
              <Form.Select
                value={answers[3]}
                onChange={(e) => handleAnswer(3, e.target.value)}
                className="form-select"
              >
                <option value="">-- Choose one --</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Creative Arts">Creative Arts</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Card>

        {/* Question 5 */}
        <Card className="question-card">
          <h5>5. How much do you value job stability when choosing a career?</h5>
          <img
            src={detailedQ5}
            alt="Job Stability"
            className="question-image"
          />
          <Form>
            <Form.Group controlId="q5" className="stability-rating">
              <div className="d-flex justify-content-between px-2">
                <span>Not Important</span>
                <span>Very Important</span>
              </div>
              <div className="d-flex justify-content-between px-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Form.Check
                    inline
                    key={num}
                    type="radio"
                    label={num}
                    name="stability-scale"
                    id={`stability-${num}`}
                    onChange={() => handleAnswer(4, num.toString())}
                    className="rating-radio"
                  />
                ))}
              </div>
            </Form.Group>
          </Form>
        </Card>

        {/* Question 6 */}
        <Card className="question-card">
          <h5>6. How confident are you in your communication skills?</h5>
          <img
            src={detailedQ6}
            alt="Communication"
            className="question-image"
          />
          <Form>
            <Form.Group controlId="q6">
              <Form.Label className="confidence-label">
                Confidence Level: <span className="confidence-value">{answers[5] || 5}</span>
              </Form.Label>
              <Form.Range
                min={0}
                max={10}
                value={answers[5] || 5}
                onChange={(e) => handleAnswer(5, e.target.value)}
                className="custom-range"
              />
            </Form.Group>
          </Form>
        </Card>

        {/* Question 7 */}
        <Card className="question-card">
          <h5>7. What is one change you'd love to make in the world through your work?</h5>
          <img
            src={detailedQ7}
            alt="World Impact"
            className="question-image"
          />
          <Form>
            <Form.Group controlId="q7">
              <Form.Control
                type="text"
                placeholder="Type your answer here..."
                value={answers[6]}
                onChange={(e) => handleAnswer(6, e.target.value)}
                className="form-control"
              />
            </Form.Group>
          </Form>
        </Card>

        {/* Question 8 */}
        <Card className="question-card">
          <h5>8. What motivates you the most at work?</h5>
          <img
            src={detailedQ8}
            alt="Motivation"
            className="question-image"
          />
          <Form>
            <Form.Group controlId="q8">
              <Form.Select
                value={answers[7]}
                onChange={(e) => handleAnswer(7, e.target.value)}
                className="form-control"
              >
                <option value="">-- Choose one --</option>
                <option value="Achieving goals">Achieving goals</option>
                <option value="Helping others">Helping others</option>
                <option value="Learning and improving">Learning and improving</option>
                <option value="Working with a team">Working with a team</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Card>


        {/* Question 9 */}
        <Card className="question-card">
          <h5>9. Describe a time you solved a problem creatively.</h5>
          <img
            src={detailedQ9}
            alt="Creative Problem Solving"
            className="question-image"
          />
          <Form>
            <Form.Group controlId="q9">
              <Form.Control
                type="text"
                placeholder="Type your answer here..."
                value={answers[8]}
                onChange={(e) => handleAnswer(8, e.target.value)}
                className="form-control"
              />
            </Form.Group>
          </Form>
        </Card>


        {/* Question 10 */}
        <Card className="question-card">
          <h5>10. How confident are you in learning new technology?</h5>
          <img
            src={detailedQ10}
            alt="Tech Confidence"
            className="question-image"
          />
          <Form>
            <Form.Group controlId="q10">
              <Form.Label>Confidence Level: {answers[9]}</Form.Label>
              <Form.Range
                min={0}
                max={10}
                value={answers[9] || 5}
                onChange={(e) => handleAnswer(9, e.target.value)}
                className="form-range"
              />
            </Form.Group>
          </Form>
        </Card>



        {/* Submit Button */}
        <div className="text-center my-4">
          <Button 
            className="custom-button" 
            onClick={() => setShowModal(true)}
            disabled={progress < 100}
          >
            {progress < 100 ? 'Complete All Questions to Submit' : 'Submit Quiz'}
          </Button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer text-center">
        <p>© 2025 Career Matcher - Find the perfect career path for your skills and interests!</p>
      </footer>
    </Container>
  );
};

export default NewDetailedQuizPage;