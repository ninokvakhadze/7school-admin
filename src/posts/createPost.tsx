import styled from "styled-components";
import cancel from "../assets/xmark-solid.svg";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Upload, UploadProps } from "antd";

function CreatePost({
  toggle,
  setToggle,
}: {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    imageCover: null,
    images: null,
  });

  const props: UploadProps = {
    name: "file",
    multiple: false,

    headers: {
      authorization: "authorization-text",
    },
    beforeUpload: () => false,
    onChange(info) {
      if (info.file.status !== "done") {
        setPostData({ ...postData, imageCover: info.file.originFileObj });
      }
    },
  };
  
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const fileInput = e.target as HTMLInputElement;
    const { name, value } = e.target;
    if (name === "imageCover" || name === "images") {
      setPostData({
        ...postData,
        [name]: fileInput.files?.[0], // For single file inputs
      });
    } else {
      setPostData({
        ...postData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", postData.title);
    formData.append("text", postData.content);
    if (postData.imageCover) {
      formData.append("imageCover", postData.imageCover);
    }
    if (postData.images) {
      formData.append("images", postData.images); // For single file input
    }

    try {
      const response = await fetch("http://localhost:8000/api/posts", {
        body: formData,
        method: "POST",
        // Do not set content-type manually
      });
      const data = await response.json();
      console.log(data);
      // Handle success
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  return toggle ? (
    <form onSubmit={handleSubmit}>
      <Background>
        <CreateCard>
          <Cancel onClick={() => setToggle(false)} src={cancel} />
          <NameInput
            type="text"
            name="title"
            value={postData.title}
            onChange={handleChange}
            placeholder="სათაური"
          />
          <Text
            name="content"
            value={postData.content}
            onChange={handleChange}
            placeholder="Content"
          />
          <InputDiv>
            <FilesDiv>
            <Upload {...props}>
            <button>ატვირთვა</button>
              </Upload>
              <FileInput
                type="file"
                name="imageCover"
                onChange={handleChange}
              />
              <FileInput
                type="file"
                name="images"
                onChange={handleChange}
                multiple
              />
            </FilesDiv>
            <Submit type="submit">გამოქვეყნება</Submit>
          </InputDiv>
        </CreateCard>
      </Background>
    </form>
  ) : null;
}

export default CreatePost;

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
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
  padding: 0 4%;
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
  width: 100%;
  height: 90px;
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
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
`;
const Text = styled.textarea`
  font-family: bpg_ghalo;
  resize: none;
  padding: 1% 2.5%;
  margin-top: 5%;
  width: 100%;
  height: 100%;
  outline: none;
  background-color: #f2f2f2;
  border: solid 2px #8b0909;
  outline: #8b0909;
  @media only screen and (min-width: 768px) {
    margin-top: 5%;
  }
  @media only screen and (min-width: 1020px) {
    height: 50%;
    margin-top: 1%;
  }
`;

const FilesDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FileInput = styled.input`
  &::before {
    border-color: black;
    content: "Select some files";
    display: inline-block;
    background: linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid #999;
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    /* white-space: nowrap; */
    -webkit-user-select: none;
    user-select: text;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 700;
    font-size: 10pt;
  }
  &:active::before {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  }
  &::-webkit-file-upload-button {
    visibility: hidden;
  }
`;

const Submit = styled.button`
  font-family: bpg_ghalo;
  color: #f2f2f2;
  background-color: #8b0909;
  border: solid 2px #8b0909;
  font-size: 10px;
  padding: 10px;
  border-radius: 20px;
  width: 60%;
  margin: auto;
  margin-bottom: 10px;
`;
