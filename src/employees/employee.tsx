import { useEffect, useState } from "react";
import { Post } from "../posts/singlePost";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Teacher from "../assets/teacher.jpg";
import DeleteImg from "../assets/delete.svg";
import UpdateImg from "../assets/update.svg";
import UpdateEmployee from "./updateEmployee";

function Employee() {
  const { id } = useParams();
  console.log(id);

  const [employee, setEmployee] = useState<Post>();
  const [toggle, setToggle] = useState(false);

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

  const handleDelete = () => {
    fetch(`http://127.0.0.1:8000/api/employees/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("deleted");
        } else {
          throw new Error("Failed to delete resource");
        }
      })
      .catch((error) => {
        console.error("Error deleting resource:", error);
      });
  };

  const displayImage = (
    imageData: { contentType: String; data: String } | undefined
  ) => {
    return `data:${imageData ? imageData.contentType : ""};base64,${
      imageData ? imageData.data : ""
    }`;
  };

  return (
    <>
      <UpdateEmployee toggle={toggle} setToggle={setToggle} />
      <HeadDiv>
        <Name>{employee?.name}</Name>
        <ButtonDiv>
          <Delete_Update onClick={handleDelete} src={DeleteImg} />
          <Delete_Update src={UpdateImg} onClick={()=>setToggle(true)}/>
        </ButtonDiv>
      </HeadDiv>

      <TeacherDiv>
        <TeacherImg src={displayImage(employee?.imageCover)} />
        <Text>{employee?.text}</Text>
      </TeacherDiv>
    </>
  );
}

export default Employee;

const HeadDiv = styled.div`
  display: flex;
  justify-content: space-between;
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
