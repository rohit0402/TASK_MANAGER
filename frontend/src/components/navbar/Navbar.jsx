import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { MdLibraryBooks } from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import { authActions } from "../../store";
import { toast } from "react-toastify";
function Navbar() {
  const isLoggedin =useSelector((state)=> state.isLoggedin);
  const dispatch=useDispatch();
  const handleLogout=()=>{
    sessionStorage.removeItem("id");
    toast.success("you re succesfully logged out");
    dispatch(authActions.logout());
    history("/");
  };
  return (
    <div className="bg-primary">
      <nav className="navbar navbar-expand-lg  ">
        <div className="container bg-primary">
          <Link className="navbar-brand " to="/">
            <MdLibraryBooks className="fs-2 mb-2" />
            <b className="text-dark fs-2 ">TODO</b>
            <b className="text-info ">Daily</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link
                  className="nav-link active text-white btn-nav"
                  aria-current="page"
                  to="/todo"
                >
                  TODO
                </Link>
              </li>
              {!isLoggedin && (
  <>
    <li className="nav-item mx-2">
      <Link
        className="nav-link active text-white btn-nav"
        aria-current="page"
        to="/signup"
      >
        Sign Up
      </Link>
    </li>
    <li className="nav-item mx-2">
      <Link
        className="nav-link active text-white btn-nav"
        aria-current="page"
        to="/signin"
      >
        Sign In
      </Link>
    </li>
  </>
)}

{isLoggedin && (
  <li className="nav-item mx-2">
    <Link
      className="nav-link active text-white btn-nav"
      aria-current="page"
      to="/"
      onClick={handleLogout}
    >
      Log Out
    </Link>
  </li>
)}

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
