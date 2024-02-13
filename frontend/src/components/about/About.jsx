import React from "react";
import "./About.css";
function About() {
  return (
    <div className="about">
        <div className="container">
      <h1 style={{textDecoration:'underline'}}>About me</h1>
      <p>
        Hello ! ,I'm <b><i>Rohit Sonar</i></b> a <b><i>MERN Stack </i></b>
        developer . In this Project I have create Todo App using technologies mongoDB atlas for storing data , Express,NodeJS for backend/server side and 
        Vite React JS for frontend/client side. <br />
        I have added functionallity like signin ,sign up ,and also added functionality of isCompleted for a particular todo work.
        I'm sure you're definitely gonna like this project.
        For source code of this project you can check my githup repo or you can drop a message me in linkedin.
        <b><i>Thanking You </i></b>
      </p>
    </div>
    </div>
  );
}

export default About;
