import { useContext, useState, useEffect } from "react";
import { Card, Button, ProgressBar } from "react-bootstrap";

import GameContext from "../../../../../context/game-ctx";

const ClaimBalance = () => {
  const { game, handleClaimBalance } = useContext(GameContext);
  const [userRating, setUserRating] = useState([50, 50]);

  useEffect(() => {
    const rightAnswersRating = (
      (game.rightAnswers * 100) /
      game.totalQuestions
    ).toFixed();
    const wrongAnswersRating = (
      (game.wrongAnswers * 100) /
      game.totalQuestions
    ).toFixed();

    setUserRating([rightAnswersRating, wrongAnswersRating]);
  }, [game.rightAnswers, game.wrongAnswers, game.totalQuestions]);

  return (
    <>
      <Card.Header className="mx-auto">
        <Card.Title className="text-center">
          <h1 className="mb-3">Yeah! You got till the end bro!</h1>
          <h3>See your game states below:</h3>
        </Card.Title>
      </Card.Header>

      <Card.Body className="w-100 mt-4 d-flex flex-column align-items-center text-center">
        <ProgressBar className="w-75 my-4 fs-4" style={{ height: "30px" }}>
          <ProgressBar
            key={1}
            variant="success"
            now={userRating[0]}
            label={`+ ${game.rightAnswers} LBC`}
          />
          <ProgressBar
            key={2}
            variant="danger"
            now={userRating[1]}
            label={`- ${game.wrongAnswers} LBC`}
            className="p3"
          />
        </ProgressBar>

        <Card.Subtitle className="my-4">
          <h3>
            {game.rightAnswers === game.totalQuestions &&
              "As a reward for responding all questions correctly, you'll win +1 LBC!"}
          </h3>
          <h3>
            {game.gameBet > 0
              ? "Click in the button bellow to retrieve your balance and send to your wallet!"
              : "You have no balance avaiable in game to withdraw. Click in the button bellow to end this game."}
          </h3>
          <h3 className="mt-5">
            You need to withdraw your balance to start a new game!
          </h3>
        </Card.Subtitle>

        <Button
          type="button"
          variant="warning"
          text="dark"
          className="w-75 mx-auto my-3 p-4 roudend-4"
          onClick={handleClaimBalance}
        >
          <h2>{game.gameBet > 0 ? "Claim my prize" : "End game"}</h2>
        </Button>
      </Card.Body>
    </>
  );
};

export default ClaimBalance;
