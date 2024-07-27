import { useEffect, useState } from "react";
import { Post } from "../posts/singlePost";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import plusImg from "../assets/plus-solid.svg";
import CreateEmployee from "./createEmployee";
import { useQuery } from "react-query";
import axios from "axios";

function Employees() {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const { isLoading, data, refetch } = useQuery("employees", () => {
    return axios.get(`http://127.0.0.1:8000/api/employees?page=${queryParams.get("page")|| "1"}`);
  });
  console.log(data);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    if (!queryParams.get("page")) {
      navigate("/employees?page=1");
    }
  }, [location.pathname]);

  const displayImage = (imageData: { contentType: String; data: String }) => {
    return `data:${imageData ? imageData.contentType : ""};base64,${
      imageData ? imageData.data : ""
    }`;
  };
  const line = {
    textDecoration: "none",
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Loading>იტვირთება...</Loading>
      </div>
    );
  }

  return (
    <>
      <CreateEmployee toggle={toggle} setToggle={setToggle} refetch={refetch} />
      <Container>
        <Teacher>
          <Add onClick={() => setToggle(true)}>
            <Plus src={plusImg} />
          </Add>
        </Teacher>
        {data?.data.data.results.results.map((data: Post) => (
          <Teacher key={data._id}>
            <Link style={line} to={`/employees/${data._id}`}>
              <CoverImage src={displayImage(data.imageCover)} />
              <InfoDiv>
                <Text>{data.name}</Text>
              </InfoDiv>
            </Link>
          </Teacher>
        ))}
      </Container>
    </>
  );
}

export default Employees;

const Add = styled.div`
  background-color: #8b0909;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;
const Plus = styled.img`
  width: 80%;
  height: 80%;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: 768px) {
    gap: 10%;
    justify-content: flex-start;
  }
  @media only screen and (min-width: 1020px) {
    gap: 5%;
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 350px;
`;

const Teacher = styled.div`
  width: 100%;
  margin-top: 50px;
  @media only screen and (min-width: 768px) {
    width: 45%;
  }
  @media only screen and (min-width: 1020px) {
    width: 30%;
  }
`;
const InfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Text = styled.p`
  font-family: bpg_ghalo;
  color: #8b0909;
  font-size: 20px;
  margin-top: 15px;
`;

const Loading = styled.h2`
  font-family: bpg_ghalo;
  color: #8b0909;
  font-size: 28px;
`;
