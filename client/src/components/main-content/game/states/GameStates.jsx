import { Badge } from "react-bootstrap";

const GameStates = () => {
  return (
    <>
      <h2>
        <Badge bg="success" text="light" className="ms-4 p-3">
          Right Answers | {"0 / 0"}
        </Badge>
        <Badge bg="danger" text="light" className="ms-4 p-3">
          Wrong Answers | {"0 / 0"}
        </Badge>
        <Badge bg="warning" text="dark" className="ms-4 p-3">
          Game Balance | {0}
        </Badge>
      </h2>
    </>
  );
};

export default GameStates;
