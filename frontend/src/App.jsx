import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home/Home.jsx";
import About from "./components/about/about.jsx";
import Footer from "./components/footer/Footer.jsx";
import Signup from "./components/Signup/Signup.jsx";
import Signin from "./components/Signin/Signin.jsx";
import Todo from "./components/todo/todo.jsx";
import { useDispatch } from "react-redux";
import { authActions } from "./store/index.js";
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    const id=sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login());
    }
  })
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route  path="/signup" element={<Signup />} />
          <Route  path="/signin" element={<Signin />} />
          <Route  path="/todo" element={<Todo />} />
          <Route  path="/aboutme" element={<About />} />
        </Routes>
        <Footer />
      </Router>
      
    </div>
  );
}

export default App;

