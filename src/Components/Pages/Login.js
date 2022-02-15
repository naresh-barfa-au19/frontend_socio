import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css"

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [passwordErr, setPasswordErr] = useState("")
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (name) => (e) => {
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const formValidation = async (formData) => {
    let isFormError = false
    if (formData.email && formData.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setEmailErr("")
    } else {
      setEmailErr("Email is not proper")
      isFormError = true
    }
    if (formData.password.length <= 5) {
      setPasswordErr("Password should be greater then 5 character.")
      isFormError = true
    } else {
      setPasswordErr("")
    }
    return isFormError
  }

  const handleSubmit = async () => {
    if (! await formValidation(data)) {
      try {
        const res = await axios.post("https://backendsocio.herokuapp.com/login", data);
        if (res.status === 200 && res.data.success) {
          setData({ email: "", password: "" });
          localStorage.setItem('token', res.data.data);
          setErrorMessage("")
          navigate("/");
        }
        if (!res.data.success) {
          setErrorMessage(res.data.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (

    <div className="section-bg-color">
      {
        errorMessage &&
        <div className="alert alert-warning alert-dismissible fade show d-flex justify-content-center" role="alert">
          <strong>{errorMessage}</strong>
        </div>
      }
      <div className="mt-5 " style={{ maxWidth: 500, margin: "auto" }}>
        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Email"
            required
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange("email")}
          />
          {
            emailErr && <span style={{ color: "red" }} > * {emailErr} </span>
          }
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Password"
            required
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange("password")}
          />
          {
            passwordErr && <span style={{ color: "red" }} >* {passwordErr} </span>
          }
        </div>
        <div className="text-center">
        <Link className="nav-link link-color" to="/forget-password">
            Forget Password
          </Link>
          <button
            className="btn btn-outline-primary m-3"
            type="submit"
            onClick={(e) => { navigate("/") }}
          >
            Cancel
          </button>
          <button
            className="btn btn-outline-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
