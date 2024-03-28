import styled from "styled-components";
import cancel from "../assets/xmark-solid.svg";

function CreateFile({
  toggle,
  setToggle,
}: {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return toggle ? (
    <>
      <Background>
        <CreateCard>
          <Cancel onClick={() => setToggle(false)} src={cancel} />
          <NameInput placeholder="სათაური" />
          <FileInput type="file" />
        </CreateCard>
      </Background>
    </>
  ) : null;
}

export default CreateFile;

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CreateCard = styled.div`
  position: relative;
  height: 80%;
  width: 90%;
  background-color: #fff;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  @media only screen and (min-width: 760px) {
    height: 60%;
    width: 40%;
  }
`;

const Cancel = styled.img`
  position: absolute;
  width: 8%;
  top: 3%;
  left: 88%;
`;

const NameInput = styled.input`
  font-family: bpg_ghalo;
  width: 90%;
  height: 50px;
  padding: 0 2.5%;
  outline: none;
  background-color: #fff;
  border: solid 2px #8b0909;
  margin-top: 20%;
`;
const FileInput = styled.input`
  position: absolute;
  top: 60%;
  left: 5%;
`;
