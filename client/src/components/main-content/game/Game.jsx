import { Card } from "react-bootstrap";

import { GameContextProvider } from "../../../context/game-ctx";

import GameStates from "./states-area/GameStates";
import Rules from "./rules-area/Rules";
import PlayArea from "./play-area/PlayArea";

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
          <PlayArea />
        </Card.Body>
      </Card>
    </GameContextProvider>
  );
};

export default Game;
