import { Navbar, Container, Button } from "react-bootstrap";

const Header = ({ isConnected, connectMetamask }) => {
  return (
    <Navbar className="p-4" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <h1>Luby Game</h1>
          <Navbar.Text>Play-To-Earn in Crypto</Navbar.Text>
        </Navbar.Brand>
        <Button
          active={isConnected}
          onClick={connectMetamask}
          variant={isConnected ? "success" : "light"}
          size="lg"
        >
          🦊 {isConnected ? "You're Connected" : "Connect to Metamask"}
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
