import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileEdit = () => {
    const navigate = useNavigate();
    const [nameErr, setNameErr] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [data, setData] = useState({
        name: "",
        myProfile: "",
    });

    const formValidator = async (formData) => {
        let isFormError = false
        console.log(formData.name.length)
        if (formData.name.toLowerCase().match(/(?=.*[0-9])|(?=.*[!@#\$%\^&\*])/)) {
            setNameErr("Only character allowed.")
            isFormError = true
        } else if (formData.name.length < 5) {
            setNameErr("Name should be greater then 4 character.")
            isFormError = true
        } else {
            setNameErr("")
        }
        return isFormError
    }
    const handleChange = (name) => (e) => {
        const value = name === "myProfile" ? e.target.files[0] : e.target.value;
        setData({ ...data, [name]: value });
    };
    const handleSubmit = async () => {
        try {
            if (!await formValidator(data)) {
                setErrorMessage("Profile pic uploading. Wait ....")
                const token = localStorage.getItem("token")
                let formData = new FormData();
                formData.append("name", data.name);
                formData.append("myProfile", data.myProfile);
                const res = await axios.post(`https://backendsocio.herokuapp.com/profile-edit`, formData, {
                    headers: {
                        token: token
                    }
                });
                if (res.data.success) {
                    setData({ name: "", myProfile: "" });
                    setErrorMessage("Profile edited successfully. ")
                    navigate("/profile");
                } else {
                    setErrorMessage(res.data.data)
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
            <div className="mt-5" style={{ maxWidth: 500, margin: "auto" }}>
                <div className="mb-3">
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
                        required
                        type="file"
                        name="myProfile"
                        onChange={handleChange("myProfile")}
                    />
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
                        Upload-Profile
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProfileEdit;
