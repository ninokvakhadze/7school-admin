import styled from "styled-components";
import cancel from "../assets/xmark-solid.svg";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Upload, UploadProps} from "antd";
import { useParams } from "react-router-dom";
import { Post } from "./singlePost";

function UpdatePost({
  setToggle,
  post,
}: {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  post: Post | undefined;

}) {

console.log(post)
const id = useParams()
  const [postData, setPostData] = useState<{
    title: string;
    content: string;
    imageCover: File | null;
    images: (File | undefined)[];
  }>({
    title: post?.name || "",
    content: post?.text || "",
    imageCover: null,
    images: post?.images || [],
  });

  useEffect(()=>{
   setPostData(post)
  }, [post])
// console.log(post)

  const props: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept: ".jpg,.png,.jpeg,.webp",
    beforeUpload: () => false,
    onChange(info) {
      console.log(info);
      if (info.file.status !== "uploading") {
        setPostData({
          ...postData,
          imageCover: info.fileList[0]?.originFileObj || null,
        });
      }
    },
  };

  const propsMultiple: UploadProps = {
    name: "file",
    accept: ".jpg,.png,.jpeg,.webp",
    multiple: true,
    beforeUpload: () => false,
    onChange(info) {
      console.log(info);
      if (info.file.status !== "uploading") {
        console.log(info);
        setPostData({
          ...postData,
          images: info.fileList.map((item) => item.originFileObj),
        });
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
      postData.images.forEach((image) => {
        image && formData.append("images", image);
      });

      // For single file input
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
        body: formData,
        method: "PATCH",
        // Do not set content-type manually
      });
      const data = await response.json();
      console.log(data);
      console.log("updated")
      // Handle success
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  if(!post){
    return <p>Loading..</p>
  }
console.log(postData)
  return (
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
                <UploadButton type="button">Cover-ის ატვირთვა</UploadButton>
              </Upload>

              <Upload {...propsMultiple}>
                <UploadButton type="button">რამდენიმე ფოტოს ატვირთვა</UploadButton>
              </Upload>
            </FilesDiv>
            <Submit type="submit">გამოქვეყნება</Submit>
          </InputDiv>
        </CreateCard>
      </Background>
    </form>
  );
}

export default UpdatePost;


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
  height: 520px;
  width: 320px;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px;
  @media only screen and (min-width: 700px) {
    height: 520px;
    width: 520px;
  }
`;

const Cancel = styled.img`
  position: absolute;
  width: 20px;
  right: 20px;
`;

const NameInput = styled.input`
  font-family: bpg_ghalo;
  width: 100%;
  height: 70px;
  padding: 0 2.5%;
  outline: none;
  background-color: #f2f2f2;
  border: solid 2px #8b0909;
  margin-top: 40px;
`;

const InputDiv = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
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
  height: 70%;
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
  gap: 15px;
  height: 5%;
  margin-top: 0;
  @media only screen and (min-width: 700px) {
    margin-top: -35px;
  }
`;
const UploadButton = styled.button`
  border-radius: 16px;
  border: solid 2px #8b0909;
  color: #8b0909;
`;

const Submit = styled.button`
  font-family: bpg_ghalo;
  color: #f2f2f2;
  background-color: #8b0909;
  border: solid 2px #8b0909;
  font-size: 10px;
  padding: 10px;
  border-radius: 20px;
  width: 150px;
  margin: 5%;
`;
