import styled from "styled-components";
import cancel from "../assets/xmark-solid.svg";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, Input, Upload } from "antd";

function CreateFile({
  toggle,
  setToggle,
}: {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [name, setName] = useState("");

  const props: UploadProps = {
    name: "file",
    multiple: false,
    beforeUpload: () => {
      return false;
    },
    onChange(info) {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      setFileList(fileList);
    },
  };

  const submit = () => {
    const formData = new FormData();
    formData.append("name", name);
    if (fileList[0] && fileList[0].originFileObj)  {
      formData.append("file", fileList[0].originFileObj);
    }
    fetch("http://localhost:8000/api/files", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return toggle ? (
    <>
      <Background>
        <CreateCard>
          <Cancel onClick={() => setToggle(false)} src={cancel} />
          <div>
            <Input
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>

            <Submit onClick={submit}>Submit</Submit>
          </div>
        </CreateCard>
      </Background>
    </>
  ) : null;
}

export default CreateFile;

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
