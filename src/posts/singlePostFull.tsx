import styled from "styled-components";
// import image from "../assets/example.png";
import arrow from "../assets/arrow-red.svg";
import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import { Post } from "./singlePost";

function Singlepostfull() {
  const {id} =  useParams();
  console.log(id)

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

  const displayImage = (imageData: { contentType: String; data: String } | undefined) => {
    return `data:${imageData ? imageData.contentType : ""};base64,${
      imageData ? imageData.data : ""
    }`;
  };

  console.log(posts)

  return (
    <>
      <FullPost>
        <PostTitle>{posts?.name}</PostTitle>
        <PostText>
          
        </PostText>
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

const FullPost = styled.div`
  padding: 4% 2%;
  margin: 4.5%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media only screen and (min-width: 768px) {
    /* margin: 20%; */
    margin: 3%;
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
