import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css"

const SignupPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPass: "",
    });
    const [nameErr, setNameErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
    const [confirmPassErr, setConfirmPassErr] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const handleChange = (name) => (e) => {
        const value = e.target.value;
        setData({ ...data, [name]: value });
    };
    const formValidator = async (formData) => {
        let isFormError = false
        if (formData.name.length <= 4) {
            setNameErr("Name should be greater then 4 character.")
            isFormError = true
        } else if (formData.name.toLowerCase().match(/(?=.*[0-9])|(?=.*[!@#\$%\^&\*])/)) {
            setNameErr("Only character allowed.")
            isFormError = true
        } else {
            setNameErr("")
        }
        if (formData.email && formData.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setEmailErr("")
        } else {
            setEmailErr("Email is not proper")
            isFormError = true
        }
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
    const handleSubmit = async () => {
        try {
            if (!await formValidator(data)) {
                const res = await axios.post("https://backendsocio.herokuapp.com/signup", data);
                console.log(res)
                if (res.data.success) {
                    setData({ name: "", email: "", password: "" });
                    setErrorMessage("")
                    navigate("/login");
                }
                if (!res.data.success) {
                    setErrorMessage(res.data.data)
                }
                if (res.status === 400) {
                    setErrorMessage("Something went wrong... ")
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <>
            {
                errorMessage &&
                <div className="alert alert-warning alert-dismissible fade show d-flex justify-content-center" role="alert">
                    <strong>{errorMessage}</strong>
                </div>
            }
            <div className="mt-5  " style={{ maxWidth: 500, margin: "auto" }}>
                <div className="mb-3" >
                    <input
                        className="form-control"
                        placeholder="Enter Name"
                        required
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange("name")}
                    />
                    {
                        nameErr && <span style={{ color: "red" }} > * {nameErr} </span>
                    }
                </div>
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
                <div className="mb-3">
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
                        confirmPassErr && <span style={{ color: "red" }} >* {confirmPassErr} </span>
                    }
                </div>
                <div className="text-center">
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
                        Sign-up
                    </button>
                </div>
            </div>
        </>
    );
};





export default SignupPage;
