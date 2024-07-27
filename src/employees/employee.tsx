import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DeleteImg from "../assets/delete.svg";
import UpdateImg from "../assets/update.svg";
import UpdateEmployee from "./updateEmployee";
import axios from "axios";
import { useQuery } from "react-query";

function Employee() {
  const { id } = useParams();

  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const { isLoading, data, refetch } = useQuery("employee", () => {
    return axios.get(`http://127.0.0.1:8000/api/employees/${id}`);
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const displayImage = (
    imageData: { contentType: String; data: String } | undefined
  ) => {
    return `data:${imageData ? imageData.contentType : ""};base64,${
      imageData ? imageData.data : ""
    }`;
  };

  const handleDelete = async () => {
    const { data } = await axios.delete(
      `http://127.0.0.1:8000/api/employees/${id}`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return data;
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",  justifyContent: "center", height: "100vh", alignItems: "center"
        }}
      >
        <Loading>იტვირთება...</Loading>
      </div>
    );
  }

  return (
    <>
      <UpdateEmployee
        toggle={toggle}
        setToggle={setToggle}
        employee={data?.data.data.employee}
        refetch={refetch}
      />
      <HeadDiv>
        <Name>{data?.data.data.employee.name}</Name>
        <ButtonDiv>
          <Delete_Update onClick={handleDelete} src={DeleteImg} />
          <Delete_Update src={UpdateImg} onClick={() => setToggle(true)} />
        </ButtonDiv>
      </HeadDiv>

      <TeacherDiv>
        <TeacherImg src={displayImage(data?.data.data.employee.imageCover)} />
        <Text>{data?.data.data.employee.text}</Text>
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
  height: 250px;
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
const Loading = styled.h2`
  font-family: bpg_ghalo;
  color: #8b0909;
  font-size: 28px;
`;
