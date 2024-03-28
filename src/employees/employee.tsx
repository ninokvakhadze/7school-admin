import { useEffect, useState } from "react";
import { Post } from "../posts/singlePost";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Teacher from "../assets/teacher.jpg";
import DeleteImg from "../assets/delete.svg";
import UpdateImg from "../assets/update.svg";
import arrow from "../assets/arrow.svg";
import { Link } from "react-router-dom";

function Employee() {
  const { id } = useParams();
  console.log(id);

  const [employee, setEmployee] = useState<Post>();

  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/employees/${id}`);
      const result = await response.json();
      console.log(result);
      setEmployee(result.data.employee);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(employee);
  useEffect(() => {
    fetchData();
  }, []);

  //   const displayImage = (imageData: { contentType: String; data: String } | undefined) => {
  //     return `data:${imageData ? imageData.contentType : ""};base64,${
  //       imageData ? imageData.data : ""
  //     }`;

  return (
    <>
      <HeadDiv>
        <Link to="/employees">
          <Arrow src={arrow} />
        </Link>
        <ButtonDiv>
          <Delete_Update src={DeleteImg} />
          <Delete_Update src={UpdateImg} />
        </ButtonDiv>
      </HeadDiv>

      <Name>{employee?.name}</Name>

      <TeacherDiv>
        <TeacherImg src={Teacher} />
        <Text>{employee?.text}</Text>
      </TeacherDiv>
    </>
  );
}

export default Employee;

const Arrow = styled.img`
  width: 8%;
  rotate: 180deg;
  /* margin-bottom: 30px; */
  /* margin-top: 2.5%;
  margin-left: 4.5%; */
  @media only screen and (min-width: 1020px) {
    width: 15%;
  }
  width: 20px;
  @media only screen and (min-width: 1020px) {
    width: 30px;
  }
`;

const HeadDiv = styled.div`
  display: flex;
  padding: 4.5% 4.5% 0 4.5%;
  justify-content: space-between;
  @media only screen and (min-width: 1020px){
    padding: 2.5% 4.5% 0 4.5%;
  }
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

const Name = styled.h2`
  font-family: bpg_ghalo;
  color: #8b0909;
  font-size: 250%;
    padding: 2.5% 4.5% 0 4.5%;
`;

const TeacherDiv = styled.div`
  display: flex;
  padding: 4.5%;
  flex-direction: column;

  @media only screen and (min-width: 760px) {
    flex-direction: row;
    gap: 2%;
  }
`;

const TeacherImg = styled.img`
  width: 100%;
  @media only screen and (min-width: 760px) {
    width: 50%;
  }
  @media only screen and (min-width: 1020px) {
    width: 30%;
  }
`;

const Text = styled.p`
  font-family: bpg_ghalo;
  color: #f2f2f2;
  font-size: 100%;
  color: black;
`;
