import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container  d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center">
          Organise your
          <br /> work and life - beautifully.
        </h1>
        <h6>
          Be Focused ,Be patient, Be consistent and achieve more with this best{" "}
          <i>
            <b>"Task Manager App"</b>
          </i>{" "}
          <b>TODO_Daily</b>
        </h6>
        <button className="home-btn p-2 bg-black">
          <Link aria-current="page" to="/todo">
            Make Todo List
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
