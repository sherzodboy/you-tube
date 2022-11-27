import { Stack, Button, Container } from "@mui/material";

const App = () => {
  return (
    <Container>
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    </Container>
  );
};

export default App;
