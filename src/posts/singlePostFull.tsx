import styled from "styled-components";
import arrow from "../assets/arrow-red.svg";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Post } from "./singlePost";
import Delete from "../assets/delete.svg";
import Update from "../assets/update.svg";
import UpdatePost from "./updatePost";
import { useNavigate } from "react-router-dom";

function Singlepostfull() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post>();
  const [toggle, setToggle] = useState(false);
  const [image, setImage] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();
      setPosts(result.data.post);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
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
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
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

  const nextImage = () => {
    if (image < posts?.images.length - 1) {
      setImage(image + 1);
    } else {
      setImage(0);
    }
  };

  const prevImage = () => {
    if (image > 0) {
      setImage(image - 1);
    } else {
      setImage(posts?.images.length - 1);
    }
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
          <Arrow1 src={arrow} onClick={prevImage} />
          <Image src={displayImage(posts?.images[image])} />
          <Arrow2 src={arrow} onClick={nextImage} />
        </PostDiv>
      </FullPost>
      {toggle && <UpdatePost setToggle={setToggle} post={posts} />}
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
