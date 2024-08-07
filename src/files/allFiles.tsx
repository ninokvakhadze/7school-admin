import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import plusImg from "../assets/plus-solid.svg";
import DeleteImg from "../assets/delete.svg";
import UpdateImg from "../assets/update.svg";
import CreateFile from "./createFile";
import UpdateFile from "./updateFile";
import axios from "axios";
import { useQuery } from "react-query";

export interface fileType {
  name: string;
  file: {
    data: string;
    contentType: string;
  };
  _id: string
}

function AllFiles() {
  const [toggle, setToggle] = useState(false);
  const [singleFile, setSingeFile] = useState<fileType | {}>({});
  const [updateToggle, setUpdateToggle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);


  const { isLoading, data, isError, error,  refetch } = useQuery("files", () => {
    return axios.get("http://127.0.0.1:8000/api/files");
  });



  const handleDelete = async (id: string) => {
    const { data } = await axios.delete(`http://127.0.0.1:8000/api/files/${id}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    return data;
  };

  if(isError) {
    return <h2>{error.message}</h2>
  }

  if (isLoading) {
    return (
      <div style={{display: "flex",  justifyContent: "center", height: "100vh", alignItems: "center"}}>
        <Loading>იტვირთება...</Loading>
      </div>
    );
  }

  return (
    <>
      <Container>
        <Add>
          <Plus onClick={() => setToggle(true)} src={plusImg} />
        </Add>
        {data?.data.data.files.map((file: fileType, index: number) => {
          const createDownloadUrl = () => {
            // Convert base64 to raw binary data held in a string
            const byteCharacters = atob(file.file.data);

            // Write the bytes of the string to an ArrayBuffer
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            // Create a Blob from the ArrayBuffer
            const blob = new Blob([byteArray], { type: file.file.contentType });

            // Create a URL from the Blob
            return URL.createObjectURL(blob);
          };

          return (
            <FileDiv key={index}>
              <a href={createDownloadUrl()} download={file.name}>
                {file.name}
              </a>
              <ButtonDiv>
                <Delete_Update
                  src={DeleteImg}
                  onClick={() => {
                    handleDelete(file._id);
                  }}
                />
                <Delete_Update
                  src={UpdateImg}
                  onClick={() => {
                    setSingeFile(file), setUpdateToggle(true);
                  }}
                />
              </ButtonDiv>
            </FileDiv>
          );
        })}
      </Container>
      <CreateFile toggle={toggle} setToggle={setToggle} refetch={refetch}/>
      {updateToggle && (
        <UpdateFile setUpdateToggle={setUpdateToggle} data={singleFile} refetch={refetch} />
      )}
    </>
  );
}
export default AllFiles;

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
  margin-top: 20px;
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

const Loading = styled.h2`
 font-family: bpg_ghalo;
  color: #8b0909;
  font-size: 28px;
`