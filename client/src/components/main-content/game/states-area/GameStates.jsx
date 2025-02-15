import { useContext } from "react";
import { OverlayTrigger, Badge } from "react-bootstrap";

import MetamaskContext from "../../../../context/metamask-ctx";
import GameContext from "../../../../context/game-ctx";

import BalanceWarning from "../../../warnings/BalanceWarning";
import { useEffect } from "react";

const GameStates = () => {
  const { network } = useContext(MetamaskContext);
  const { game, handleUpdateGameBalance } = useContext(GameContext);

  useEffect(() => {
    const update = async () => {
      await handleUpdateGameBalance();
    };

    update();
  }, [handleUpdateGameBalance, game.gameBalance, game.gameBet]);

  return (
    <>
      <h2>
        <Badge bg="success" text="light" className="ms-4 p-3">
          Right Answers | {`${game.rightAnswers} / ${game.totalQuestions}`}
        </Badge>
        <Badge bg="danger" text="light" className="ms-4 p-3">
          Wrong Answers | {`${game.wrongAnswers} / ${game.totalQuestions}`}
        </Badge>

        <OverlayTrigger
          placement="left-start"
          show={
            network.isValid &&
            game.gameBalance < 4e18 &&
            !game.isStarted &&
            game.gameBet < 4e18
          }
          overlay={BalanceWarning}
        >
          <Badge bg="warning" text="dark" className="ms-4 p-3">
            Game Balance |{" "}
            {game.gameBalance > 0
              ? (game.gameBalance / 1e18).toFixed(2)
              : game.gameBalance}{" "}
            LBC
          </Badge>
        </OverlayTrigger>

        <Badge bg="warning" text="dark" className="ms-4 p-3">
          Bet Value |{" "}
          {game.gameBet > 0 ? (game.gameBet / 1e18).toFixed(2) : game.gameBet}{" "}
          LBC
        </Badge>
      </h2>
    </>
  );
};

export default GameStates;
