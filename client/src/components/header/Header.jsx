import { useContext, useEffect, useState } from "react";

import MetamaskContext from "../../context/metamask-ctx";
import GameContext from "../../context/game-ctx";

import { Navbar, Container, Button, Dropdown } from "react-bootstrap";

const Header = () => {
  const metamaskCtx = useContext(MetamaskContext);
  const gameCtx = useContext(GameContext);

  const [isOwnerConnected, setIsOwnerConnected] = useState(false);
  const [contractBalance, setContractBalance] = useState(0);

  const handleOwnerConnection = async () => {
    const status = await metamaskCtx.handleVerifyOwner();
    setIsOwnerConnected(status);
  };

  const handleContractBalance = async () => {
    if (isOwnerConnected) {
      const balance = await metamaskCtx.handleGetContractBalance();
      setContractBalance(balance);
    }
  };

  const handleUpdateBalances = async () => {
    await metamaskCtx.handleWithdrawContractBalance();
    await gameCtx.handleUpdateGameBalance();
  };

  useEffect(() => {
    if (window.ethereum) {
      metamaskCtx.handleAccountsConnection();
      metamaskCtx.handleGetNetwork();
      metamaskCtx.handleGetNetwork();
    }

    if (metamaskCtx.contract.methods) {
      handleOwnerConnection();
      handleContractBalance();
    }
  }, [metamaskCtx.account, metamaskCtx.network]);

  return (
    <Navbar className="p-4" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <h1>Luby Game</h1>
          <Navbar.Text>Play-To-Earn in Crypto</Navbar.Text>
        </Navbar.Brand>

        <div className="d-flex">
          <Dropdown className={`${isOwnerConnected ? "visible" : "invisible"}`}>
            <Dropdown.Toggle
              size="lg"
              variant="light"
              id="dropdown-basic"
              className="fs-4"
            >
              💰 Contract Balance | {(contractBalance / 1e18).toFixed(2)} LBC
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Header className="fs-5 px-4 py-2">
                <strong>ADMIN options</strong>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item
                as="button"
                disabled={+contractBalance === 0 && true}
                onClick={handleUpdateBalances}
                className="fs-4 px-4 py-2"
              >
                📤 Withdraw
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Button
            active={metamaskCtx.isConnected}
            onClick={() => metamaskCtx.handleRequestAccountConnection()}
            variant={metamaskCtx.isConnected ? "success" : "light"}
            size="lg"
            className="ms-4 fs-4"
          >
            🦊{" "}
            {metamaskCtx.isConnected
              ? "You're Connected"
              : "Connect to Metamask"}
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
