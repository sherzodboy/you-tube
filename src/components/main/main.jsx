import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Main = () => {
  return (
    <Link to={"/channel"}>
      <Button>Channel</Button>
    </Link>
  );
};

export default Main;
