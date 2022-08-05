import { useContext } from "react";
import { Card, Button, OverlayTrigger } from "react-bootstrap";

import MetamaskContext from "../../../../context/metamask-ctx";
import GameContext from "../../../../context/game-ctx";

import NetworkWarning from "../../../warnings/NetworkWarning";

const InviteToStart = () => {
  const { network } = useContext(MetamaskContext);
  const { game, handleBuyCoins, handleStartGame } = useContext(GameContext);

  return (
    <>
      <Card.Header className="mx-auto">
        <Card.Title className="text-center">
          <h2 className="mb-3">Are you ready to start?</h2>
          <h3>Show me your skills 😎</h3>
        </Card.Title>
      </Card.Header>

      <Card.Body className="w-100 mt-4 d-flex flex-column align-items-center">
        <OverlayTrigger
          placement="bottom"
          show={!network.isValid ? true : false}
          overlay={NetworkWarning}
        >
          <div className="w-75">
            <Button
              type="button"
              variant="warning"
              text="dark"
              className="w-100 mx-auto my-3 p-4 roudend-4"
              onClick={handleBuyCoins}
              disabled={!network.isValid}
            >
              <h2>Buy Coins to Play</h2>
            </Button>
            <Button
              type="button"
              variant="primary"
              text="dark"
              className="w-100 mx-auto my-3 p-4 roudend-4"
              onClick={handleStartGame}
              disabled={
                !network.isValid || (game.gameBalance < 4 && game.gameBet < 4)
              }
            >
              <h2>Start Game</h2>
            </Button>
          </div>
        </OverlayTrigger>
      </Card.Body>
    </>
  );
};

export default InviteToStart;
