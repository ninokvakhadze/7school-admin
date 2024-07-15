import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import plusImg from "../assets/plus-solid.svg";
import CreatePost from "./createPost";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

export interface Post {
  _id: string;
  name: string;
  title: string;
  content: string;
  imageCover: { contentType: String; data: String };
  text: string;
  videos: string;
  posts: any;
  images: { name: string }[];
}


function Singlepost() {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();


  const { isLoading, data, isError, error, isFetching, refetch } = useQuery("posts",()=>{
    return axios.get("http://127.0.0.1:8000/api/posts")
  }, {
    // cacheTime : 5000,
    // staleTime: 30000,
    // refetchOnMount: true,
    // refetchOnWindowFocus : true
    enabled: false,
    // initialData: 
  });


  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } 
    else{
      // refetch()
    }
  }, []);

  const displayImage = (imageData: { contentType: String; data: String }) => {
    return `data:${imageData ? imageData.contentType : ""};base64,${
      imageData ? imageData.data : ""
    }`;
  };
  const line = {
    textDecoration: "none",
  };

  if(isError) {
    return <h2>{error.message}</h2>
  }

  if (isLoading) {
    return (
      <div style={{display: "flex",  justifyContent: "center", marginTop: "300px"}}>
        <Loading>იტვირთება...</Loading>
      </div>
    );
  }


  return (
    <>
      <Container>
        <Post>
          <Add onClick={() => setToggle(true)}>
            <Plus src={plusImg} />
          </Add>
        </Post>
        {data?.data.data.posts.map((data: Post) => (
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
      <CreatePost toggle={toggle} setToggle={setToggle} refetch={refetch}/>
    </>
  );
}

export default Singlepost;

const Add = styled.div`
  background-color: #8b0909;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;
const Plus = styled.img`
  width: 80%;
  height: 80%;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: 768px) {
    gap: 10%;
    justify-content: flex-start;
  }
  @media only screen and (min-width: 1020px) {
    gap: 5%;
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

const Loading = styled.h2`
 font-family: bpg_ghalo;
  color: #8b0909;
  font-size: 28px;
`