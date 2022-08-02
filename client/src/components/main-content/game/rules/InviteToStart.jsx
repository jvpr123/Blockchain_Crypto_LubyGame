import { useContext, useEffect } from "react";
import { Card, Button, OverlayTrigger } from "react-bootstrap";

import MetamaskContext from "../../../../context/metamask-ctx";
import GameContext from "../../../../context/game-ctx";

import NetworkWarning from "../../../warnings/NetworkWarning";

const InviteToStart = () => {
  const { web3, contract, account, network } = useContext(MetamaskContext);
  const { handleStartGame } = useContext(GameContext);

  const toBN = (value) => web3.utils.toBN(value);
  const toWei = (valueBN, unit) => web3.utils.toWei(valueBN, unit);

  const handleClickBuyCoins = async () => {};

  const handleClickStart = async () => {
    handleStartGame(0);
  };

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
              onClick={handleClickBuyCoins}
              disabled={!network.isValid}
            >
              <h2>Buy Coins to Play</h2>
            </Button>
            <Button
              type="button"
              variant="primary"
              text="dark"
              className="w-100 mx-auto my-3 p-4 roudend-4"
              onClick={handleClickStart}
              disabled={!network.isValid}
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
