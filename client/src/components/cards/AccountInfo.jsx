import { useContext } from "react";
import { Card, Badge } from "react-bootstrap";

import MetamaskContext from "../../context/metamask-ctx";

const AccountInfo = () => {
  const { isConnected, account, network } = useContext(MetamaskContext);

  return (
    <Card bg="dark" text="light" className="m-4 p-4">
      <h2 className="d-flex justify-content-between align-items-center">
        Account information
        <div>
          <Badge bg="primary" text="light" className="ms-4 p-3">
            Address |{" "}
            {account.address && isConnected ? account.address : "Disconnected"}
          </Badge>
          <Badge bg="info" text="dark" className="ms-4 p-3">
            Network | {network && isConnected ? network : "Disconnected"}
          </Badge>
          <Badge bg="warning" text="dark" className="ms-4 p-3">
            Balance | {account.balance / 1e18}
          </Badge>
        </div>
      </h2>
    </Card>
  );
};

export default AccountInfo;
