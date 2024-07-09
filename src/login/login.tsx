import axios from "axios";
import styled from "styled-components";
import profile from "../assets/profile.svg";
import {  useState } from "react"; 
import { useNavigate } from "react-router-dom";


function Login() {

const [values, setValues] = useState({
  email: '', 
  password: ''
})

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
   setValues(prev=> ({...prev, [event.target.name] : event.target.value}))
  }

  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent) => {
    console.log(values)
    event.preventDefault()
    axios.post('http://127.0.0.1:8000/api/user/login', values)
    .then(res => {
      if(res.data.status == "success"){
        localStorage.setItem("token", res.data.token)
        navigate("/")
      }
      else{
        alert("no record")
      }
      console.log(res)

    })
    .catch(err => console.log(err))

  }

  return (
    <>
      <LoginCard>
        <ProfileDiv>
          <ProfileImg src={profile} />
        </ProfileDiv>
        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            type="text"
            onChange={handleInput}
          />
          <Input
            name="password"
            type="password"
            onChange={handleInput}
          />
          <LoginButton>შესვლა</LoginButton>
        </form>
      </LoginCard>
    </>
  );
}

export default Login;

const LoginCard = styled.div`
  margin: 25% 4.5%;
  /* height: 500px; */
  border-radius: 4%;
  border: solid #8b0909 3px;
  padding: 6%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;

  @media only screen and (min-width: 768px) {
    margin: 10% 26%;
    /* height: 400px; */
    border-radius: 6%;
    padding: 3%;
    @media only screen and (min-width: 1100px) {
      margin: 6% 35%;
      /* height: 500px; */
    }
    @media only screen and (min-width: 1400px) {
      /* height: 700px; */
    }
  }
`;
const ProfileDiv = styled.div`
  background-color: #8b0909;
  width: 110px;
  border-radius: 50%;
  padding: 10px;
  margin-top: -80px;
  margin-bottom: 20px;
  @media only screen and (min-width: 1400px) {
    margin-top: -100px;
  }
`;
const ProfileImg = styled.img`
  height: 80px;
  width: 60px;
  margin-left: 15px;
`;
const Input = styled.input`
  margin-top: 20px;
  height: 60px;
  width: 100%;
  font-size: 100%;
  outline: none;
  border: none;
  padding: 0 5%;
  /* border-bottom: solid 2px #8b0909; */
  background-color: #d9d9d9;
  border-radius: 60px;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 60px;
  background-color: #8b0909;
  margin-top: 60px;
  border: none;
  color: #fff;
  font-size: 150%;
  font-family: bpg_ghalo;
  border-radius: 60px;
`;
