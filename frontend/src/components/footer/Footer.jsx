import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import "./footer.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer ">
      <div className="container-fluid p-3 d-flex bg-info text-align-center justify-content-center">
        <h4>todo</h4>
        <p className="my-1">&copy;:by Rohit</p>
      </div>
      <div className="container-fluid  d-flex bg-info text-align-center justify-content-center">
        <h6 className="my-1 ">
          <b>Connect with Me:</b>
        </h6>
        <div>
          <a href="https://www.linkedin.com/in/rohit-sonar-3b3291273/">
            <FaLinkedin className="linkedin mx-1" />
          </a>

          <a href="https://github.com/rohit0402">
            <FaGithub className="mx-1 git" />
          </a>
          <Link className="about mx-1" to="/aboutme">
            <span className="fw-bold">
              <i>About me</i>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
