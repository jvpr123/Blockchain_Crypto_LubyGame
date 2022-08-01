import { Card } from "react-bootstrap";

const Game = () => {
  return (
    <Card bg="dark" text="light" className="my-4 ms-2 me-4 p-4">
      <Card.Header>
        <h2>Game information</h2>
      </Card.Header>
      <Card.Body></Card.Body>
    </Card>
  );
};

export default Game;
