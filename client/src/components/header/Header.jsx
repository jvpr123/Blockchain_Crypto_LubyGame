import { useContext, useEffect } from "react";

import MetamaskContext from "../../context/metamask-ctx";
import { Navbar, Container, Button } from "react-bootstrap";

const Header = () => {
  const metamaskCtx = useContext(MetamaskContext);

  useEffect(() => {
    metamaskCtx.handleAccountsConnection();

    window.ethereum.on("accountsChanged", async () => {
      await metamaskCtx.handleAccountsConnection();
    });
  }, [metamaskCtx]);

  return (
    <Navbar className="p-4" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <h1>Luby Game</h1>
          <Navbar.Text>Play-To-Earn in Crypto</Navbar.Text>
        </Navbar.Brand>
        <Button
          active={metamaskCtx.isConnected}
          onClick={() => metamaskCtx.handleRequestAccountConnection()}
          variant={metamaskCtx.isConnected ? "success" : "light"}
          size="lg"
        >
          🦊{" "}
          {metamaskCtx.isConnected ? "You're Connected" : "Connect to Metamask"}
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
