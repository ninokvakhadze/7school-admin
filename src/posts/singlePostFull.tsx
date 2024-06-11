import styled from "styled-components";
import arrow from "../assets/arrow-red.svg";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Post } from "./singlePost";
import Delete from "../assets/delete.svg";
import Update from "../assets/update.svg";
import UpdatePost from "./updatePost";

function Singlepostfull() {
  const { id } = useParams();

  const [posts, setPosts] = useState<Post>();
  const [toggle, setToggle] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/posts/${id}`);
      const result = await response.json();
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

  const handleDelete = () => {
    fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("deleted");
        } else {
          throw new Error("Failed to delete resource");
        }
      })
      .catch((error) => {
        console.error("Error deleting resource:", error);
      });
  };

  return (
    <>
      <FullPost>
        <TitleDiv>
          <PostTitle>{posts?.name}</PostTitle>
          <ButtonDiv>
            <Delete_Update onClick={handleDelete} src={Delete} />
            <Delete_Update onClick={() => setToggle(true)} src={Update} />
          </ButtonDiv>
        </TitleDiv>
        <PostText>{posts?.text} </PostText>
        <PostDiv>
          <Arrow1 src={arrow} />
          <Image src={displayImage(posts?.imageCover)} />
          <Arrow2 src={arrow} />
        </PostDiv>
      </FullPost>
      {posts && (
        <UpdatePost toggle={toggle} setToggle={setToggle} post={posts} />
      )}
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
