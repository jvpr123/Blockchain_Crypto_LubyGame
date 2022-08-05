import { useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";

import GameContext from "../../../../../context/game-ctx";

const Question = () => {
  const { game, handleRegisterAnswer } = useContext(GameContext);
  const { questions, currentQuestion } = game;

  const [userOption, setUserOption] = useState(undefined);
  const [checked, setChecked] = useState(false);

  const handlePickOption = async (event) => {
    setUserOption(+event.currentTarget.value);
    setChecked(true);

    await handleRegisterAnswer(+event.currentTarget.value);

    setUserOption(undefined);
    setChecked(false);
  };

  return (
    <Card className="w-100 border-0" bg="dark">
      <Card.Header className="mx-auto my-4">
        <h3>{questions[currentQuestion].question}</h3>
      </Card.Header>

      <Card.Body className="w-100 mb-4 d-flex flex-column align-items-center">
        {questions[currentQuestion].answers.map((answer, index) => (
          <Button
            key={`option-${index}`}
            variant="light"
            value={index}
            onClick={handlePickOption}
            disabled={userOption ? true : false}
            className={`w-75 mx-auto my-3 p-4 ${
              checked && index === +userOption && "bg-warning border-warning"
            }`}
          >
            <h4>{answer.content}</h4>
          </Button>
        ))}
      </Card.Body>
    </Card>
  );
};

export default Question;
