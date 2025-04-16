import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Navbar,
  Nav,
  Form,
  InputGroup,
  ProgressBar,
  Modal,
} from "react-bootstrap";


const DetailedQuizPage = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
  const [search, setSearch] = useState("");
  const [answers, setAnswers] = useState<string[]>(new Array(7).fill(""));
  const [questionAnswered, setQuestionAnswered] = useState<boolean[]>(new Array(7).fill(false));
  const [showModal, setShowModal] = useState(false);
  // for the checkbox questions of the detailed quiz
  const [activities, setActivities] = useState<string[]>([]);

  // checkbox question(2)
  const toggleActivity = (activity: string, checked: boolean) => {
    if (checked) {
      setActivities([...activities, activity]);
    } else {
      setActivities(activities.filter((a) => a !== activity));
    }
  };


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleAnswer = (questionIndex: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = value;

    const updatedQuestionAnswered = [...questionAnswered];
    if (value.trim() !== "") {
      updatedQuestionAnswered[questionIndex] = true;
    }

    setAnswers(updatedAnswers);
    setQuestionAnswered(updatedQuestionAnswered);
  };

  const progress = (questionAnswered.filter(Boolean).length / 7) * 100;

  useEffect(() => {
    if (progress === 100 && !showModal) {
      setShowModal(true);
    }
  }, [progress, showModal]);

  return (
    <Container>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="p-3 rounded" style={{ zIndex: 1050 }}>
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
          <div className="text-center" style={{ position: "absolute", left: "100px", right: "50px" }}>
            <Navbar.Brand
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigateTo("home");
              }}
              style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#ffcc00", cursor: "pointer" }}
            >
              Find Your Career!
            </Navbar.Brand>
            <Nav className="justify-content-center" style={{ position: "relative", bottom: "10px" }}>
              <Nav.Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("home");
                }}
                style={{ color: "#ffcc00" }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("simple-quiz");
                }}
                style={{ color: "#ffcc00" }}
              >
                Simple Quiz
              </Nav.Link>
              <Nav.Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("detailed-quiz");
                }}
                style={{ color: "#ffcc00" }}
              >
                Detailed Quiz
              </Nav.Link>
            </Nav>
          </div>
        </div>
      </Navbar>

      {/* Fixed Progress Bar */}
      <div
        style={{
          position: "fixed",
          top: "56px",
          width: "100%",
          zIndex: 1040,
          backgroundColor: "#fff",
          padding: "10px 0",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <ProgressBar now={progress} label={`${Math.round(progress)}%`} />
      </div>

      {/* Modal Notification */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>🎉 You Finished the Quiz!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Congrats! You have completed the quiz. Click the button below to see your results.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => navigateTo("detailed-quiz-results")}>
            See Results
          </Button>
        </Modal.Footer>
      </Modal>
      

      {/* Quiz Content */}
      <Card className="mt-4" style={{ marginTop: "150px" }}>
        <Card.Body>
          <Card.Title>Detailed Career Quiz</Card.Title>

          {/* Question 1 */}
          <Card className="mb-4 p-3">
            <h5>1. Describe a project or task that made you feel proud. What were you doing?</h5>
            <img
              src="https://cdn3.careeraddict.com/uploads/article/59060/illustration-men-interview-busy-environment.jpg"
              alt="Work Environment"
              style={{
                width: "200%",
                maxWidth: "450px",
                height: "auto",
                display: "block",
                margin: "10px auto",
                borderRadius: "8px",
              }}
            />
            <Form>
              <Form.Group controlId="q1">
                <Form.Control
                  type="text"
                  placeholder="Type your answer here..."
                  value={answers[0]}
                  onChange={(e) => handleAnswer(0, e.target.value)}
                />
              </Form.Group>
            </Form>
          </Card>

          
          {/* Question 2 */}

           <Card className="mb-4 p-3">
            <h5>1. Describe a project or task that made you feel proud. What were you doing?</h5>
            <img
              src="https://cdn3.careeraddict.com/uploads/article/59060/illustration-men-interview-busy-environment.jpg"
              alt="Work Environment"
              style={{
                width: "200%",
                maxWidth: "450px",
                height: "auto",
                display: "block",
                margin: "10px auto",
                borderRadius: "8px",
              }}
            />
            <Form>
              <Form.Group controlId="q1">
                <Form.Control
                  type="text"
                  placeholder="Type your answer here..."
                  value={answers[0]}
                  onChange={(e) => handleAnswer(0, e.target.value)}
                />
              </Form.Group>
            </Form>
          </Card>

          {/* Question 2 */ }
            <Card className="mb-4 p-3">
            <h5>2. Which of these activities do you enjoy the most?</h5>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTStY2BK_JCmWJ4dZ47rktrAQwq8hnG1h564A&s"
              alt="Activities"
              style={{
                width: "200%",
                maxWidth: "450px",
                height: "auto",
                display: "block",
                margin: "10px auto",
                borderRadius: "8px",
              }}
            />
            <Form>
              <Form.Group controlId="q4">
                {["Solving puzzles", "Writing stories", "Teaching others", "Fixing/building things", "Organizing events"].map((activity) => (
                  <Form.Check
                    key={activity}
                    type="checkbox"
                    label={activity}
                    onChange={(e) => toggleActivity(activity, e.target.checked)}
                  />
                ))}
              </Form.Group>
            </Form>
          </Card>



        </Card.Body>
      </Card>
    </Container>
  );
};

export default DetailedQuizPage;
