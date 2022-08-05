import { useContext } from "react";
import { Card } from "react-bootstrap";

import GameContext from "../../../../context/game-ctx";

import InviteToStart from "./actions/InviteToStart";
import Question from "./questions/Question";
import ClaimBalance from "./actions/ClaimBalance";

const PlayArea = () => {
  const { game } = useContext(GameContext);

  const render = () => {
    if (!game.isStarted) {
      return +game.gameBet === 0 ? <InviteToStart /> : <ClaimBalance />;
    }

    if (game.isStarted) {
      return game.currentQuestion === game.questions.length ? (
        <ClaimBalance />
      ) : (
        <Question />
      );
    }
  };

  return (
    <Card bg="dark" border="light" className="w-50 rounded-4 p-4">
      {render()}
    </Card>
  );
};

export default PlayArea;
