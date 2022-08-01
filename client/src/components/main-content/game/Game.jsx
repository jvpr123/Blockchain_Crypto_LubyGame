import { Card } from "react-bootstrap";

import GameStates from "./states/GameStates";
import Rules from "./rules/Rules";
import Questions from "./questions/Questions";

const Game = () => {
  return (
    <Card bg="dark" text="light" className="mt-4 mb-5 mx-5 p-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h1>Tech Quiz</h1>
        <GameStates />
      </Card.Header>

      <Card.Body className="d-flex justify-content-between align-items-center mt-4">
        <Rules />
        <Questions />
      </Card.Body>
    </Card>
  );
};

export default Game;
