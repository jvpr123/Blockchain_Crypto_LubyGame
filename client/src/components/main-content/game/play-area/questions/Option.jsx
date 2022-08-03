import { Button } from "react-bootstrap";

const Option = ({ onClick, children }) => {
  return (
    <Button
      type="button"
      variant="light"
      text="dark"
      className="w-75 mx-auto my-3 p-4 border border-4 roudend-4"
      onClick={onClick}
    >
      <h4>{children}</h4>
    </Button>
  );
};

export default Option;
