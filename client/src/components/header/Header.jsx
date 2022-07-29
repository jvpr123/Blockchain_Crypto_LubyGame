import { Navbar, Container, Button } from "react-bootstrap";

const Header = ({ isConnected, connectMetamask }) => {
  return (
    // <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-4">
    //   <div className="container-fluid">
    //     <h1 className="navbar-brand h1">Luby Game</h1>
    //     <button onClick={connectMetamask} className="btn btn-light">
    //       🦊 {isConnected ? "Connected" : "Connect to Metamask"}
    //     </button>
    //   </div>
    // </nav>

    <Navbar className="p-4" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <h1>Luby Game</h1>
          <Navbar.Text>Play-To-Earn in Crypto</Navbar.Text>
        </Navbar.Brand>
        <Button
          disabled={isConnected}
          onClick={connectMetamask}
          variant="light"
          size="lg"
        >
          🦊 {isConnected ? "Connected" : "Connect to Metamask"}
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
