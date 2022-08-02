import { useContext } from "react";
import { Card, Button, OverlayTrigger } from "react-bootstrap";

import MetamaskContext from "../../../../context/metamask-ctx";

import NetworkWarning from "../../../warnings/NetworkWarning";

const InviteToStart = () => {
  const { network } = useContext(MetamaskContext);

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
          <Button
            type="button"
            variant="primary"
            text="dark"
            className="w-75 mx-auto my-3 p-4 roudend-4"
            onClick={() => console.log("Start game triggered!")}
            disabled={!network.isValid}
          >
            <h2>Start Game</h2>
          </Button>
        </OverlayTrigger>
      </Card.Body>
    </>
  );
};

export default InviteToStart;
