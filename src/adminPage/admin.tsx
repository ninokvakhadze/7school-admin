import styled from "styled-components";
import { Link } from "react-router-dom";

function Admin() {
  
  
  const line = {
    textDecoration: "none",
    width: "100%"
  };
  return (
    <ButtonDiv>
      <Link style={line} to="/posts">
        <Button>პოსტები</Button>
      </Link>
      <Link style={line} to="/employees">
        <Button>თანამშრომლები</Button>
      </Link>
      <Link style={line} to="/files">
      <Button>ფაილები</Button>
      </Link>
    </ButtonDiv>
  );
}

export default Admin;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4%;
  padding: 3% 20%;
  @media only screen and (min-width: 1100px) {
    flex-direction: row;
    padding: 15% 3%;
  }
`;
const Button = styled.button`
  width: 100%;
  height: 60px;
  background-color: #8b0909;
  margin-top: 60px;
  border: none;
  color: #fff;
  font-size: 150%;
  font-family: bpg_ghalo;
  border-radius: 60px;
`;
