import { useContext, useEffect } from "react";
import { Card, Badge } from "react-bootstrap";
import MetamaskContext from "../../context/metamask-ctx";

const AccountInfo = () => {
  const metamaskCtx = useContext(MetamaskContext);

  useEffect(() => {
    console.log(metamaskCtx.account);
  }, [metamaskCtx]);

  return (
    <Card bg="dark" text="light" className="my-4 ms-4 me-2 p-4">
      <div>
        <Card.Header>
          <h2 className="d-flex justify-content-between">
            Account information
            <Badge bg="secondary" className="ms-4 p-3">
              {metamaskCtx.account}
            </Badge>
          </h2>
        </Card.Header>

        <Card.Body>
          <div className="d-flex align-items-center mb-2">
            <Card.Subtitle bg="secondary">
              <h4>Balance:</h4>
            </Card.Subtitle>
            <h4>
              <Badge bg="secondary" className="ms-4 p-3">
                {1000}
              </Badge>
            </h4>
          </div>
        </Card.Body>
      </div>

      <div className="mt-5">
        <Card.Header>
          <h2 className="d-flex justify-content-between">
            Network information
            <Badge bg="secondary" className="ms-4 p-3">
              {metamaskCtx.network}
            </Badge>
          </h2>
        </Card.Header>

        <Card.Body>
          <div className="d-flex align-items-center mb-2">
            <Card.Subtitle bg="secondary">
              <h4>Gas price:</h4>
            </Card.Subtitle>
            <h4>
              <Badge bg="secondary" className="ms-4 p-3">
                {metamaskCtx.network}
              </Badge>
            </h4>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

export default AccountInfo;
