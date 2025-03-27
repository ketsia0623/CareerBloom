import React from "react";
import { Container, Card, Button } from "react-bootstrap";

const SimpleQuizPage = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
  return (
    <Container className="mt-4">
      <Card>
        <h2>Simple Career Quiz</h2>
        <Card.Body>
          <Card.Title>Wow simple quiz</Card.Title>
          <p>
            Questions go here :P
          </p>
          <Button variant="primary" onClick={() => navigateTo("home")}>Back to Home</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SimpleQuizPage;