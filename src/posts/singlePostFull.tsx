import styled from "styled-components";
import arrow from "../assets/arrow-red.svg";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Post } from "./singlePost";
import Delete from "../assets/delete.svg";
import Update from "../assets/update.svg";
import {Link} from "react-router-dom";

function Singlepostfull() {
  const { id } = useParams();

  const [posts, setPosts] = useState<Post>();

  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/posts/${id}`);
      const result = await response.json();
      console.log(result.data.post);
      setPosts(result.data.post);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displayImage = (
    imageData: { contentType: String; data: String } | undefined
  ) => {
    return `data:${imageData ? imageData.contentType : ""};base64,${
      imageData ? imageData.data : ""
    }`;
  };

  console.log(posts);

  return (
    <>
    <HeadDiv>
        <Link to="/posts">
          <Arrow src={arrow} />
        </Link>
        <ButtonDiv>
          <Delete_Update src={Delete} />
          <Delete_Update src={Update} />
        </ButtonDiv>
      </HeadDiv>

      <FullPost>
        <TitleDiv>
          <PostTitle>{posts?.name}</PostTitle>
        </TitleDiv>
        <PostText> </PostText>
        <PostDiv>
          <Arrow1 src={arrow} />
          <Image src={displayImage(posts?.imageCover)} />
          <Arrow2 src={arrow} />
        </PostDiv>
      </FullPost>
    </>
  );
}

export default Singlepostfull;

const Arrow = styled.img`
  width: 8%;
  rotate: 180deg;
  /* margin-bottom: 30px; */
  /* margin-top: 2.5%;
  margin-left: 4.5%; */
  @media only screen and (min-width: 1020px) {
    width: 15%;
  }
  width: 20px;
  @media only screen and (min-width: 1020px) {
    width: 30px;
  }
`;

const HeadDiv = styled.div`
  display: flex;
  padding: 4.5% 4.5% 0 4.5%;
  justify-content: space-between;
  @media only screen and (min-width: 1020px){
    padding: 2.5% 4.5% 0 4.5%;
  }
`;

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
const Update_delete_div = styled.div`
  display: flex;
  gap: 10px;
  @media only screen and (min-width: 1020px) {
    gap: 20px;
  }
`;
const Delete_Update_Img = styled.img`
  width: 20px;
  @media only screen and (min-width: 1020px) {
    width: 30px;
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

const PostTitle = styled.h2`
  font-family: bpg_ghalo;
  font-size: 200%;
  color: #8b0909;
`;
const PostText = styled.h2`
  font-family: bpg_ghalo;
  font-size: 100%;
  font-weight: 500;
  color: gray;
`;
const Image = styled.img`
  margin: 6%;
  width: 100%;
`;

const PostDiv = styled.div`
  display: flex;
`;
const Arrow1 = styled.img`
  width: 4%;
  height: 4%;
  rotate: 180deg;
  margin-top: 35%;
`;
const Arrow2 = styled.img`
  width: 4%;
  height: 4%;
  margin-top: 35%;
`;
