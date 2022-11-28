import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";

const Channel = () => {
  const params = useParams();
  console.log(params);

  return (
    <Link to={"/"}>
      <Button>Main</Button>
    </Link>
  );
};

export default Channel;
