import { useContext } from "react";
import { Card } from "react-bootstrap";

import GameContext from "../../../../context/game-ctx";

import InviteToStart from "../rules/InviteToStart";
import Option from "./questions/Option";

const PlayArea = () => {
  const { game } = useContext(GameContext);

  return (
    <Card bg="dark" border="light" className="w-50 rounded-4 p-4">
      {!game.isStarted && <InviteToStart />}
      {game.isStarted && <Option />}
    </Card>
  );
};

export default PlayArea;
