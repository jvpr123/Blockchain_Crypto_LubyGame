import { useContext } from "react";
import { Badge, Card } from "react-bootstrap";

import GameContext from "../../../../../context/game-ctx";
import Option from "./Option";

const Question = () => {
  const { game, handleVerifyAnswer } = useContext(GameContext);
  const { questions, currentQuestion } = game;

  return (
    <Card className="w-100 border-0" bg="dark">
      <Card.Header className="mx-auto my-4">
        <h3>{questions[currentQuestion].question}</h3>
      </Card.Header>

      <Card.Body className="w-100 mb-4 d-flex flex-column align-items-center">
        {questions[currentQuestion].answers.map((answer, index) => (
          <Option onClick={handleVerifyAnswer} key={`option-${index}`}>
            {answer.content}
          </Option>
        ))}
      </Card.Body>
    </Card>
  );
};

export default Question;
