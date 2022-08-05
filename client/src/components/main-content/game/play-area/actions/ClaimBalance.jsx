import { useContext } from "react";
import { Card, Button } from "react-bootstrap";

import GameContext from "../../../../../context/game-ctx";

const ClaimBalance = () => {
  const { handleClaimBalance } = useContext(GameContext);

  return (
    <>
      <Card.Header className="mx-auto">
        <Card.Title className="text-center">
          <h1 className="mb-3">Congratulations!</h1>
          <h3>It seems you've earned some coins!</h3>
        </Card.Title>
      </Card.Header>

      <Card.Body className="w-100 mt-4 d-flex flex-column align-items-center text-center">
        <Card.Subtitle className="my-4">
          <h3>
            Click in the button bellow to retrieve your balance and send to your
            wallet!
          </h3>
          <h3>You need to get your balance to start a new game!</h3>
        </Card.Subtitle>
        <Button
          type="button"
          variant="warning"
          text="dark"
          className="w-75 mx-auto my-3 p-4 roudend-4"
          onClick={handleClaimBalance}
        >
          <h2>Claim my prize</h2>
        </Button>
      </Card.Body>
    </>
  );
};

export default ClaimBalance;
