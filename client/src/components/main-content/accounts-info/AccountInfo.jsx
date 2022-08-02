import { useContext } from "react";
import { Card, Badge } from "react-bootstrap";

import MetamaskContext from "../../../context/metamask-ctx";

const AccountInfo = () => {
  const { isConnected, account, network } = useContext(MetamaskContext);

  return (
    <Card bg="dark" text="light" className="mt-5 mb-4 mx-5 p-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h1>Account information</h1>

        <h2>
          <div>
            <Badge bg="primary" text="light" className="ms-4 p-3">
              Address |{" "}
              {account.address && isConnected
                ? account.address
                : "Disconnected"}
            </Badge>
            <Badge bg="info" text="dark" className="ms-4 p-3">
              Network |{" "}
              {network && isConnected ? network.network : "Disconnected"}
            </Badge>
            <Badge bg="warning" text="dark" className="ms-4 p-3">
              Balance | {(account.balance / 1e18).toFixed(2)} ETH
            </Badge>
          </div>
        </h2>
      </Card.Header>
    </Card>
  );
};

export default AccountInfo;
