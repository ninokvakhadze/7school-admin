import styled from "styled-components";
import cancel from "../assets/xmark-solid.svg";
import { useState } from "react";

function CreatePost({
  toggle,
  setToggle,
}: {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const[selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  console.log(selectedFile);
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if a file is selected
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile); 
    
      // Send the image data to the API using fetch
      const response = await fetch("http://127.0.0.1:8000/api/posts", {
        method: "POST",
        body:  formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      console.log("Image uploaded successfully");
      // Handle response from API as needed
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error
    }
  };

  return toggle ? (
    <Background>
      <CreateCard>
        <Cancel onClick={() => setToggle(false)} src={cancel} />
        <NameInput placeholder="სათაური" />
        <InputDiv>
          <Text></Text>
          <FileInput type="file" />
        </InputDiv>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} accept="image/*" />
          <button type="submit">Upload</button>
        </form>
      </CreateCard>
    </Background>
  ) : null;
}

export default CreatePost;

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CreateCard = styled.div`
  position: relative;
  height: 90%;
  width: 90%;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Cancel = styled.img`
  position: absolute;
  width: 8%;
  top: 3%;
  left: 88%;
  @media only screen and (min-width: 768px) {
    width: 5%;
    left: 91%;
  }
  @media only screen and (min-width: 1020px) {
    width: 3%;
    left: 93%;
  }
`;

const NameInput = styled.input`
  font-family: bpg_ghalo;
  width: 90%;
  height: 50px;
  padding: 0 2.5%;
  outline: none;
  background-color: #f2f2f2;
  border: solid 2px #8b0909;
  margin-top: 20%;
  @media only screen and (min-width: 768px) {
    margin-top: 10%;
  }
`;

const InputDiv = styled.div`
  width: 90%;
`;
const Text = styled.textarea`
  font-family: bpg_ghalo;
  resize: none;
  padding: 1% 2.5%;
  margin-top: 10%;
  width: 100%;
  height: 300%;
  outline: none;
  background-color: #f2f2f2;
  border: solid 2px #8b0909;
  /* border: none; */
  outline: #8b0909;
  @media only screen and (min-width: 768px) {
    margin-top: 5%;
  }
  @media only screen and (min-width: 1020px) {
    height: 300%;
    margin-top: 1%;
  }
`;
const FileInput = styled.input`
  /* position: absolute;
  top: 90%;
  left: 5%; */
`;
