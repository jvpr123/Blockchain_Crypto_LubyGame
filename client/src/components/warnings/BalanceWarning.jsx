import { Popover } from "react-bootstrap";

const BalanceWarning = (
  <Popover id="balance-warning-overlay" bg="light">
    <Popover.Header className="p-4">
      <h3>Low balance!</h3>
    </Popover.Header>
    <Popover.Body>
      <h4>You need at least 4 LBC to start the game.</h4>
      <h4>
        Click in <strong>Buy Coins to Play</strong> button to get Luby Coins
        enough to start playing.
      </h4>
    </Popover.Body>
  </Popover>
);

export default BalanceWarning;
