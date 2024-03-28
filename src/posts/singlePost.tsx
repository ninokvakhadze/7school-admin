import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import plusImg from "../assets/plus-solid.svg";
import arrow from "../assets/arrow.svg";
import CreatePost from "./createPost";
export interface Post {
  _id: string;
  name: string;
  imageCover: { contentType: String; data: String };
  text: string;
  videos: string;
  posts: any;
  images: string;
}

function Singlepost() {
  const [toggle, setToggle] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/posts");
      const result = await response.json();
      console.log(result.data.posts);
      setPosts(result.data.posts);
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
      <AddContainer>
        <Link to="/">
          <Arrow src={arrow} />
        </Link>
          <Add  onClick={()=> setToggle(true)}>
            <Plus src={plusImg} />
          </Add>
      </AddContainer>
      <Container>
        {posts.map((data: Post) => (
          <Post key={data._id}>
            <CoverImage src={displayImage(data.imageCover)} />

            <InfoDiv>
              <Link style={line} to={`/posts/${data._id}`}>
                <Text>{data.name}</Text>
              </Link>
            </InfoDiv>
          </Post>
        ))}
      </Container>
      <CreatePost toggle={toggle} setToggle={setToggle}/>
    </>
  );
}

export default Singlepost;

const Arrow = styled.img`
  width: 8%;
  rotate: 180deg;
  margin-top: 2.5%;
  @media only screen and (min-width: 1020px) {
    width: 15%;
  }
`;

const AddContainer = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;

`;
const Add = styled.div`
  background-color: #8b0909;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Plus = styled.img`
  width: 80%;
  height: 80%;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media only screen and (min-width: 768px) {
    gap: 10%;
    align-items: left;
    justify-content: flex-start;
  }
  @media only screen and (min-width: 1020px) {
    gap: 5%;
    align-items: left;
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 350px;
`;

const Post = styled.div`
  width: 100%;
  margin-top: 50px;
  @media only screen and (min-width: 768px) {
    width: 45%;
  }
  @media only screen and (min-width: 1020px) {
    width: 30%;
  }
`;
const InfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Text = styled.p`
  font-family: bpg_ghalo;
  color: #8b0909;
  font-size: 20px;
  margin-top: 15px;
`;
