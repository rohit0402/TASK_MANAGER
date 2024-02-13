import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const history=useNavigate();
  const [inputs, setinputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setinputs({ ...inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${window.location.origin}/api/v1/register`, inputs);
  
      if (response.status === 200) {
        alert("User registered successfully.");
        setinputs({
          email: "",
          username: "",
          password: "",
        });
        history("/signin");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("User already registered. Please go to the login page.");
        history("/signin");
      } else {
        console.error("Error during registration:", error);
        alert("An error occurred during registration. Please try again.");
      }
    }
  };
  return (
    <Form className="signup container my-3 ">
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

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalUsername">
        <Form.Label column sm={2}>
          username
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="username"
            name="username"
            value={inputs.username}
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
            Sign up
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}
