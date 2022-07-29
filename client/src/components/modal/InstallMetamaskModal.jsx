import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

const InstallMetamaskModal = ({ toggle }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleRedirect = () => {
    handleShow(false);
    window.open("https://metamask.io/", "Metamask", "height=500,width=500");
  };

  useEffect(() => {
    setShow(toggle);
  }, [toggle]);

  return (
    <Modal show={show} centered={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Metamask extension required!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          To play this game you need Metamask to manage your wallets and
          establish a connection to the Ethereum network.
        </p>
        <p>
          Please, install the extension and then click "Connect to Metamask" to
          try again.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleRedirect}>
          Install Metamask
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InstallMetamaskModal;
