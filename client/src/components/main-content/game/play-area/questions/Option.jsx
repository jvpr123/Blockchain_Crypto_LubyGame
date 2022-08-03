import { Button } from "react-bootstrap";

const Option = ({ id, children }) => {
  return (
    <Button
      type="button"
      id={id}
      variant="light"
      text="dark"
      className="w-75 mx-auto my-3 p-4 border border-4 roudend-4"
    >
      <h4>{children}</h4>
    </Button>
  );
};

export default Option;
