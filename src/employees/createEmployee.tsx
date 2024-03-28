import Styled from "styled-components";
import arrow from "../assets/arrow.svg";
import {Link} from "react-router-dom"

function CreateEmployee() {
  return (
    <Create>
        <Link to="/employees">
      <Arrow src={arrow} />
      </Link>
      <TitleInput placeholder="სახელი" />
      <PostDiv>
        <TextInput placeholder="ტექსტი" />
        <ButtonsDiv>
          <FileDiv>
            <CoverInput type="file" />
          </FileDiv>
          <PostButton>გამოქვეყნება</PostButton>
        </ButtonsDiv>
      </PostDiv>
    </Create>
  );
}

export default CreateEmployee;

const Arrow = Styled.img`
 width: 3%;
 rotate: 180deg;
 margin-bottom: 30px;
 margin-top: -2.5%;
`;

const Create = Styled.div`
  padding: 4.5% 0;
  display: flex;
  flex-direction: column;
`;

const TitleInput = Styled.input`
  font-family: bpg_ghalo;
width: 100%;
height: 50px;
padding: 0 2.5%;
outline: none;
background-color: #f2f2f2;
border: solid 2px #8b0909;
@media only screen and (min-width: 1020px){
    width: 45%;

}
`;
const PostDiv = Styled.div`
   border: solid 2px #8b0909; 
   border-radius: 4px;
   margin-top: 2.5%;
   padding: 2.5%;
`;

const TextInput = Styled.textarea`
  font-family: bpg_ghalo;
display: block;
height: 300px;
/* padding: 1% 2.5%; */
box-sizing: border-box;
resize: none;
width: 100%;
outline: none;
border: none;
background-color: #f2f2f2;

`;

const ButtonsDiv = Styled.div`
display: flex;
width: 100%;
justify-content: space-between;
`;

const Photo_video_Input = Styled.input`
width: 100%`;

const FileDiv = Styled.div`
    display: flex;
`;

const CoverInput = Styled.input``;
const PostButton = Styled.button`
 @media only screen and (min-width: 1020px){
    /* margin-top: 5%; */
    padding: 10px;
    border-radius: 20px;
    width: 20%;
   border:none;
   background-color:#8b0909;
   font-size: 150%;
   font-weight: 600;
   color: #f2f2f2;
 }
`;