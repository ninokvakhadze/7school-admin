import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import plusImg from "../assets/plus-solid.svg";
import arrow from "../assets/arrow.svg";
import DeleteImg from "../assets/delete.svg";
import UpdateImg from "../assets/update.svg";
import CreateFile from "./createFile";

function AllFIles() {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <AddContainer>
        <Link to="/">
          <Arrow src={arrow} />
        </Link>
        <Add>
          <Plus onClick={()=> setToggle(true)}src={plusImg} />
        </Add>
      </AddContainer>
      <Container>
        <FileDiv>
          <FileLink>სათაური</FileLink>
          <ButtonDiv>
            <Delete_Update src={DeleteImg} />
            <Delete_Update src={UpdateImg} />
          </ButtonDiv>
        </FileDiv>
        <FileDiv>
          <FileLink>სათაური</FileLink>
          <ButtonDiv>
            <Delete_Update src={DeleteImg} />
            <Delete_Update src={UpdateImg} />
          </ButtonDiv>
        </FileDiv>
      </Container>
     <CreateFile toggle={toggle} setToggle={setToggle}/>
    </>
  );
}

export default AllFIles;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media only screen and (min-width: 768px) {
    gap: 10%;
    align-items: left;
    justify-content: flex-start;
  }
  @media only screen and (min-width: 1020px) {
    margin-top: unset;
    justify-content: space-between;
    align-items: left;
  }
`;

const Arrow = styled.img`
  width: 8%;
  rotate: 180deg;
  margin-top: 2.5%;
  @media only screen and (min-width: 1020px) {
    width: 15%;
  }
`;

const AddContainer = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Add = styled.div`
  background-color: #8b0909;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Plus = styled.img`
  width: 80%;
  height: 80%;
`;

const FileDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: solid 2px gray;
  padding: 10px;
  margin-top: 10%;
  @media only screen and (min-width: 768px) {
    margin-top: 5%;
  }
  @media only screen and (min-width: 1020px) {
    width: 45%;
    margin-top: 2%;
  }
`;

const FileLink = styled.a`
  font-size: 150%;
  color: #8b0909;
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const Delete_Update = styled.img`
  width: 20px;
  @media only screen and (min-width: 1020px) {
    width: 30px;
  }
`;
