import React from "react";
import { Container, Card, Button } from "react-bootstrap";

const DetailedQuizPage = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
  return (
    <Container className="mt-4">
      <Card>
        <h2>Detailed Career Assessment</h2>
        <Card.Body>
          <Card.Title>wow a detailed quiz!!</Card.Title>
          <p>
            Questions coming soon!
          </p>
          <Button variant="primary" onClick={() => navigateTo("home")}>Back to Home</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DetailedQuizPage;