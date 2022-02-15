import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css"

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("")
  const [data, setData] = useState({
    email: "",
    otp: "",
    confirmPass: "",
    password: "",
  });
  const [isOtp, setOtp] = useState(false)
  const [otpMatched, setOtpMatched] = useState(false)
  const [passwordErr,setPasswordErr] = useState("")
  const [confirmPassErr,setConfirmPassErr] = useState("")

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };


  const handleSubmit = async () => {
    try {
      const res = await axios.post("https://backendsocio.herokuapp.com/forget-password", data);
      if (res.status === 200 && res.data.success) {
        setErrorMessage(res.data.data)
        setOtp(true)
      }
      if (!res.data.success) {
        setErrorMessage(res.data.data)
        setOtp(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpVerification = async () => {
    try {
      const res = await axios.post("https://backendsocio.herokuapp.com/forget-password/otp", data);
      if (res.status === 200 && res.data.success) {
        setErrorMessage(res.data.data)
        setOtpMatched(true)
        setOtp(false)
      }
      if (!res.data.success) {
        setErrorMessage(res.data.data)
        setOtpMatched(true)
        setOtp(true)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleChangePassword = async () => {
    try {
      if (! await formValidator(data)) {
        const res = await axios.post("https://backendsocio.herokuapp.com/forget-password/changePassword", data);
        if (res.status === 200 && res.data.success) {
          setErrorMessage(res.data.data)
          setOtpMatched(false)
          setOtp(false)
          navigate("/login")
        }
        if (!res.data.success) {
          setErrorMessage(res.data.data)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const formValidator = async (formData) => {
    let isFormError = false

    if (formData.password.length <= 5) {
      setPasswordErr("Password should be greater then 5 character.")
      isFormError = true
    } else if (formData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,})/)) {
      setPasswordErr("")
    }
    else {
      setPasswordErr("Password should have at least lowercase and uppercase and special character")
      isFormError = true
    }
    if (formData.confirmPass !== formData.password) {
      setConfirmPassErr("Password not matched")
    } else {
      setConfirmPassErr("")
    }
    return isFormError
  }

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
        </div>
        {
          isOtp && <div className="mb-3">
            <input
              className="form-control"
              placeholder="Enter OTP"
              required
              type="text"
              name="otp"
              value={data.otp}
              onChange={handleChange("otp")}
            />
          </div>
        }

        {
          otpMatched && <div className="mb-3">
            <input
              className="form-control"
              placeholder="New Password"
              required
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange("password")}
            />
            {
              passwordErr && <span style={{color:"red"}}>* {passwordErr} </span>
            }
          </div>
        }
        {
          otpMatched && <div className="mb-3">
            <input
              className="form-control"
              placeholder="Confirm Password"
              required
              type="password"
              name="confirmPass"
              value={data.confirmPass}
              onChange={handleChange("confirmPass")}
            />
            {
              confirmPassErr && <span style={{color:"red"}}>* {confirmPassErr} </span>
            }
          </div>
        }
        <div className="text-center">

          <button
            className="btn btn-outline-primary m-3"
            type="submit"
            onClick={(e) => { navigate("/") }}
          >
            Cancel
          </button>
          {
            !isOtp && !otpMatched && <button
              className="btn btn-outline-primary"
              type="submit"
              onClick={handleSubmit}
            >
              Sent OTP
            </button>
          }
          {
            isOtp && <button
              className="btn btn-outline-primary"
              type="submit"
              onClick={handleOtpVerification}
            >
              Verify OTP
            </button>
          }
          {
            otpMatched && <button
              className="btn btn-outline-primary"
              type="submit"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
