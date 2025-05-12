import styled from "styled-components";
import Home from "./Components/Home/Home";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0 auto;
  padding: 20px;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  background-color: #f5f7fa;
`;

const Header = styled.h1`
  color: #1e1e1e;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
  width: 100%;
  max-width: 600px;
`;

function App() {
  return (
    <Container>
      <Header>Budget Tracker</Header>
      <Home />
    </Container>
  );
}

export default App;
