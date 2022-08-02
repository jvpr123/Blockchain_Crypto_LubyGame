import { Card } from "react-bootstrap";

import { GameContextProvider } from "../../../context/game-ctx";

import GameStates from "./states/GameStates";
import Rules from "./rules/Rules";
import Questions from "./questions/Questions";

const Game = () => {
  return (
    <GameContextProvider>
      <Card bg="dark" text="light" className="mt-4 mb-5 mx-5 p-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h1>Tech Quiz</h1>
          <GameStates />
        </Card.Header>

        <Card.Body className="d-flex justify-content-between align-items-start my-5">
          <Rules />
          <Questions />
        </Card.Body>
      </Card>
    </GameContextProvider>
  );
};

export default Game;
