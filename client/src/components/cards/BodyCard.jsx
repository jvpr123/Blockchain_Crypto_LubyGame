import { Row, Col } from "react-bootstrap";

import AccountInfo from "./AccountInfo";
import Game from "./Game";

const BodyCard = () => {
  return (
    <Row>
      <Col>
        <AccountInfo />
      </Col>

      <Col>
        <Game />
      </Col>
    </Row>
  );
};

export default BodyCard;
