import { useEffect, useState } from "react";
import styled from "styled-components";
import plusImg from "../assets/plus-solid.svg";
import DeleteImg from "../assets/delete.svg";
import UpdateImg from "../assets/update.svg";
import CreateFile from "./createFile";
import { Post } from "../posts/singlePost";

function AllFIles() {
  const [toggle, setToggle] = useState(false);
  const [files, setFiles] = useState<Post[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/files");
      const result = await response.json();
      console.log(result.data.files);
      setFiles(result.data.files);
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
    <>
      <Container>
        <FileDiv>
          <Add>
            <Plus onClick={() => setToggle(true)} src={plusImg} />
          </Add>
        </FileDiv>
        {files.map((data: Post) => (
          <FileDiv key={data._id}>
            <FileLink>{data.name}</FileLink>
            <ButtonDiv>
              <Delete_Update src={DeleteImg} />
              <Delete_Update src={UpdateImg} />
            </ButtonDiv>
          </FileDiv>
        ))}
      </Container>
      <CreateFile toggle={toggle} setToggle={setToggle} />
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

const Add = styled.div`
  background-color: #8b0909;
  width: 50px;
  height: 50px;
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
