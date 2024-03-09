import { useEffect, useState } from "react";
import { Post } from "../posts/singlePost";
import { Link } from "react-router-dom";
import styled from "styled-components";
import teacher from "../assets/teacher.jpg";

function Employees() {
  const [employees, setEmployees] = useState<Post[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/employees");
      const result = await response.json();
      console.log(result);
      setEmployees(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displayImage = (imageData: { contentType: String; data: String }) => {
    return `data:${imageData ? imageData.contentType : ""};base64,${
      imageData ? imageData.data : ""
    }`;
  };
  const line = {
    textDecoration: "none",
  };
  return (
    <Teachers>
      {employees.map((data: Post) => (
        <TeacherDiv key={data._id}>
          <TeacherImg src={teacher} />
          <Link style={line} to={`/employees/${data._id}`}>
          <TeacherName>{data.name}</TeacherName>
          </Link>
        </TeacherDiv>
      ))}
    </Teachers>
  );
}

export default Employees;


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
  color: grey;
  font-size: 19px;
  line-height: 20px;
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 30px;
`;
