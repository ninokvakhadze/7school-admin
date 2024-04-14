import { useEffect, useState } from "react";
import { Post } from "../posts/singlePost";
import { Link } from "react-router-dom";
import styled from "styled-components";
import plusImg from "../assets/plus-solid.svg";
import arrow from "../assets/arrow.svg";
import CreateEmployee from "./createEmployee";

function Employees() {
  const [employees, setEmployees] = useState<Post[]>([]);
  const [toggle, setToggle] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/employees");
      const result = await response.json();
      setEmployees(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(employees)

  const displayImage = (imageData: { contentType: String; data: String }) => {
    return `data:${imageData ? imageData.contentType : ""};base64,${
      imageData ? imageData.data : ""
    }`;
  };
  const line = {
    textDecoration: "none",
  };

  return (
    <>
      <AddContainer>
        <Link to="/">
          <Arrow src={arrow} />
        </Link>
        <Add onClick={() => setToggle(true)}>
          <Plus src={plusImg} />
        </Add>
      </AddContainer>

      {/* {employees.map((data: Post) => (
        <TeacherDiv key={data._id}>
          <TeacherImg src={displayImage(data.imageCover)} />
          <Link style={line} to={`/employees/${data._id}`}>
            <TeacherName>{data.name}</TeacherName>
          </Link>
        </TeacherDiv>
      ))} */}
      <CreateEmployee toggle={toggle} setToggle={setToggle} />
    </>
  );
}

export default Employees;

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

const Teachers = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media only screen and (min-width: 768px) {
    gap: 10%;
    align-items: left;
    justify-content: flex-start;
  }
  @media only screen and (min-width: 1020px) {
    gap: 5%;
    align-items: left;
  }
`;
const TeacherDiv = styled.div`
  width: 100%;
  margin-top: 50px;
  @media only screen and (min-width: 768px) {
    width: 45%;
  }
  @media only screen and (min-width: 1020px) {
    width: 30%;
  }
`;
const TeacherImg = styled.img`
  width: 100%;
`;
const TeacherName = styled.p`
  text-align: center;
  font-family: bpg_ghalo;
  color: #8b0909;
  font-size: 19px;
  line-height: 20px;
  font-weight: 600;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 30px;
`;
