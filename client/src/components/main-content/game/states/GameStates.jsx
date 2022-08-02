import { useContext } from "react";
import { Badge } from "react-bootstrap";

import GameContext from "../../../../context/game-ctx";

const GameStates = () => {
  const { game } = useContext(GameContext);

  return (
    <>
      <h2>
        <Badge bg="success" text="light" className="ms-4 p-3">
          Right Answers | {`${game.rightAnswers} / ${game.totalQuestions}`}
        </Badge>
        <Badge bg="danger" text="light" className="ms-4 p-3">
          Wrong Answers | {`${game.wrongAnswers} / ${game.totalQuestions}`}
        </Badge>
        <Badge bg="warning" text="dark" className="ms-4 p-3">
          Game Balance | {(game.gameBalance / 1e18).toFixed(2)} LBC
        </Badge>
      </h2>
    </>
  );
};

export default GameStates;
