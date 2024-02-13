import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./Signin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { authActions } from "../../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Signin() {
  const dispatch =useDispatch();
  const history=useNavigate();
  const [inputs, setinputs] = useState({
    email: "",
    password: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setinputs({ ...inputs, [name]: value });
  };

  const submit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(`${window.location.origin}/api/v1/signin`, inputs);

    if (res.data.message === "please sign up first") {
      alert(res.data.message);
      // sessionStorage.removeItem("email");
      history("/signup");
    }else if(res.data.message==="email or password incorrect"){
      alert(res.data.message);
      // sessionStorage.removeItem("email");
    } 
    else {
      toast.success("you re successfully logged in");
      sessionStorage.setItem("email",inputs.email);
      sessionStorage.setItem("id", res.data.others._id);
      dispatch(authActions.login());
      history("/todo");
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert("Email or password incorrect");
      // sessionStorage.removeItem("email");
    } else {
      console.error("An error occurred:", error);
      // sessionStorage.removeItem("email");
    }
  }
};
  return (
    <div>
    <Form className="signin container my-3  ">
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={inputs.email}
            onChange={change}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Password
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={inputs.password}
            onChange={change}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit" onClick={submit}>
            Sign in
          </Button>
        </Col>
      </Form.Group>
    </Form>
    </div>

  );
}

export default Signin;
