import styled from "styled-components";
import arrow from "../assets/arrow-red.svg";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import { Post } from "./singlePost";
import Delete from "../assets/delete.svg";
import Update from "../assets/update.svg";
import UpdatePost from "./updatePost";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";


function Singlepostfull() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);
  const [image, setImage] = useState(0);

  const { isLoading, data } = useQuery("post", () => {
    return axios.get(`http://127.0.0.1:8000/api/posts/${id}`)
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
    const { data } = await axios.delete(`http://127.0.0.1:8000/api/posts/${id}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    return data;
  };


  const nextImage = () => {
    if (image < data?.data.data.post.images.length - 1) {
      setImage(image + 1);
    } else {
      setImage(0);
    }
  };

  const prevImage = () => {
    if (image > 0) {
      setImage(image - 1);
    } else {
      setImage(data?.data.data.post.images.length - 1);
    }
  };

  if (isLoading) {
    return (
      <div style={{display: "flex", marginTop: "50%", justifyContent: "center"}}>
        <Loading>იტვირთება...</Loading>
      </div>
    );
  }


  return (
    <>
      <FullPost>
        <TitleDiv>
          <PostTitle>{data?.data.data.post.name}</PostTitle> 
          <ButtonDiv>
            <Delete_Update onClick={handleDelete} src={Delete} />
            <Delete_Update onClick={() => setToggle(true)} src={Update} />
          </ButtonDiv>
        </TitleDiv>
        <PostText>{data?.data.data.post.text} </PostText>
        <PostDiv>
          <Arrow1 src={arrow} onClick={prevImage} />
          <Image src={displayImage(data?.data.data.post.images[image])} />
          <Arrow2 src={arrow} onClick={nextImage} />
        </PostDiv>
      </FullPost>
      {toggle && <UpdatePost setToggle={setToggle} post={data?.data.data.post} />}
    </>
  );
}

export default Singlepostfull;

const FullPost = styled.div`
  padding: 0% 2%;
  margin: 4.5%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media only screen and (min-width: 768px) {
    margin: 3%;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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

const PostTitle = styled.h2`
  font-family: bpg_ghalo;
  font-size: 200%;
  color: #8b0909;
`;
const PostText = styled.h2`
  font-family: bpg_ghalo;
  font-size: 100%;
  font-weight: 500;
  color: black;
`;
const Image = styled.img`

    margin: 6%;
    width: 100%;
    height: 400px;

`;

const PostDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  margin: auto;
  @media only screen and (min-width: 1020px) {
    width: 80%;
  }
`;
const Arrow1 = styled.img`
  display: none;
  @media only screen and (min-width: 1020px) {
    display: inline;
    width: 30px;
    height: 40px;
    rotate: 180deg;
    margin-top: 250px;
  }
`;
const Arrow2 = styled.img`
  display: none;
  @media only screen and (min-width: 1020px) {
    display: inline;
    width: 30px;
    height: 40px;
    margin-top: 250px;
    right: 0;
  }
`;

const Loading = styled.h2`
 font-family: bpg_ghalo;
  color: #8b0909;
  font-size: 28px;
  `