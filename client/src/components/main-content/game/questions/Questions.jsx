import { questions } from "../../../../questions/questions.json";
import { Card } from "react-bootstrap";
import Option from "./Option";

const Questions = () => {
  const data = questions["288756c0-6fe7-4b20-aab4-b05b27eab788"];

  return (
    <Card bg="dark" border="light" className="w-50 rounded p-4">
      <Card.Header>
        <Card.Title>
          <h3>{data.question}</h3>
        </Card.Title>
      </Card.Header>

      <Card.Body>
        {data.answers.map((answer, index) => (
          <Option key={index}>{answer.content}</Option>
        ))}
      </Card.Body>
    </Card>
  );
};

export default Questions;
