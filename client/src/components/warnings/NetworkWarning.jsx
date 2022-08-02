import { Popover } from "react-bootstrap";

const NetworkWarning = (
  <Popover id="network-warning-overlay" bg="light">
    <Popover.Header className="p-4">
      <h3>Change network!</h3>
    </Popover.Header>
    <Popover.Body>
      <h4>
        This game is not deployed to the network you're currently conneected.
      </h4>
      <h4>Please, change your network to PRIVATE in Metamask settings.</h4>
    </Popover.Body>
  </Popover>
);

export default NetworkWarning;
