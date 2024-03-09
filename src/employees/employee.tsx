import { useEffect, useState } from "react";
import { Post } from "../posts/singlePost";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Teacher from "../assets/teacher.jpg";

function Employee() {
  const { id } = useParams();
  console.log(id);

  const [employee, setEmployee] = useState<Post>();

  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/employees/${id}`);
      const result = await response.json();
      console.log(result);
      setEmployee(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

//   const displayImage = (imageData: { contentType: String; data: String } | undefined) => {
//     return `data:${imageData ? imageData.contentType : ""};base64,${
//       imageData ? imageData.data : ""
//     }`;

      return (
      <>
        <TeacherDiv>
          <TeacherImg src={Teacher} />
          <Text>{employee?.text}</Text>
        </TeacherDiv>
      </>
    );
  };

export default Employee;

const TeacherDiv = styled.div`
  padding: 4.5%;

`;

const TeacherImg = styled.img`
  width: 100%;
  @media only screen and (min-width: 760px){
    width: 50%;
  }
  @media only screen and (min-width: 1020px) {
    width: 30%;
  }
`;

const Text = styled.p``
