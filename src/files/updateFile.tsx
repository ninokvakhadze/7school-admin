import styled from "styled-components";
import cancel from "../assets/xmark-solid.svg";
import { useState, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, Input, Upload } from "antd";
import { useNavigate } from "react-router-dom";

function UpdateFile({
  setUpdateToggle,
  data,
}: {
  setUpdateToggle: React.Dispatch<React.SetStateAction<boolean>>;
  data: fileType | {};
}) {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "rc-upload-" + Date.now(), // unique identifier, you can use the current timestamp
      name: data?.name || "", // file name
      lastModified: Date.now(), // last modified date, you can use the current timestamp
      lastModifiedDate: new Date(), // last modified date object, you can use the current date
      webkitRelativePath: "", // relative path, leave it empty if not available
      type: data?.file.contentType, // file type
      size: data?.file.data.length, // file size, you can use the length of the data string
      //@ts-ignore
      originFileObj: new Blob([data?.file.data], {
        type: data?.file.contentType,
      }), // file origin file object
    },
  ]);
  const [name, setName] = useState(data.name || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const [fileUpdate, setFileUpdate] = useState(false);
  const props: UploadProps = {
    multiple: false,
    fileList,
    beforeUpload: () => {
      return false;
    },
    onChange(info) {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      setFileList(fileList);
      setFileUpdate(true);
    },
  };

  const submit = () => {
    const formData = new FormData();
    formData.append("name", name);
    if (fileList[0] && fileList[0].originFileObj && fileUpdate) {
      formData.append("file", fileList[0].originFileObj);
    }
    fetch(`http://localhost:8000/api/files/${data._id}`, {
      method: "PATCH",
      body: formData,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Background>
        <CreateCard>
          <Cancel onClick={() => setUpdateToggle(false)} src={cancel} />
          <div>
            <Input
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div style={{ width: "100px", height: "80px" }}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            </div>

            <Submit onClick={submit}>Submit</Submit>
          </div>
        </CreateCard>
      </Background>
    </>
  );
}

export default UpdateFile;

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
