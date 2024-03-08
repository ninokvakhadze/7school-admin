import { createGlobalStyle } from "styled-components"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GeorgianFont from "./bpg_glaho.ttf";
// import Login from "./login/login"
import Admin from "./adminPage/admin";
import Singlepost from "./posts/singlePost";
import Singlepostfull from "./posts/singlePostFull";


function App() {



  return (
    <>
    <GlobalStyles/>
    <Router >
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/posts" element={<Singlepost />} />
          {/* <Route path="/contact" element={<Contacts />} /> */}
          {/* <Route path="/employees" element={<Employees />} /> */}
          <Route path="/posts/:id" element={<Singlepostfull />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App

const GlobalStyles = createGlobalStyle` *{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  }
body{
  background-color: #f2f2f2;
  padding: 0 4.5%;
}

  @font-face {
  src: url(${GeorgianFont});
  font-family: bpg_ghalo;
  }
  @keyframes falldown{
   0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
  @keyframes falldown2{
     0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(3vh);
  }
}`
