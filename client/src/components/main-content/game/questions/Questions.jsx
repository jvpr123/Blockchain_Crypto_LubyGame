import { useContext, useState, useEffect } from "react";
import { Card } from "react-bootstrap";

import GameContext from "../../../../context/game-ctx";

import InviteToStart from "../rules/InviteToStart";
import Option from "./Option";

const Questions = () => {
  const { game } = useContext(GameContext);

  return (
    <Card bg="dark" border="light" className="w-50 rounded-4 p-4">
      {!game.isStarted && <InviteToStart />}
      {game.isStarted && <Option />}
    </Card>
  );
};

export default Questions;