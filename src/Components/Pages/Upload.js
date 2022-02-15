import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadPost = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("")
    const [data, setData] = useState({
        caption: "",
        myPost: "",
    });
    const handleChange = (name) => (e) => {
        const value = name === "myPost" ? e.target.files[0] : e.target.value;
        setData({ ...data, [name]: value });
    };
    const handleSubmit = async () => {
        try {
            setErrorMessage("Post is uploading. Wait ....")
            const token = localStorage.getItem("token")
            let formData = new FormData();
            formData.append("caption", data.caption);
            formData.append("myPost", data.myPost);
            console.log(formData)
            const res = await axios.post(`https://backendsocio.herokuapp.com/upload`, formData, {
                headers: {
                    token: token
                }
            });
            if (res.data.success) {
                setData({ caption: "", myPost: "" });
                setErrorMessage("Post uploaded successfully. ")
                navigate("/profile");
            } else {
                setErrorMessage(res.data.data)
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
                        type="file"
                        name="myPost"
                        onChange={handleChange("myPost")}
                    />
                </div>
                <div className="mb-3">
                    <input
                        className="form-control"
                        placeholder="Enter Caption"
                        type="text"
                        name="caption"
                        value={data.caption}
                        onChange={handleChange("caption")}
                    />
                </div>
                {/* <div className="mb-3">
                    <input
                        className="form-control"
                        placeholder="hashtags"
                        type="text"
                        name="hashtags"
                        value={data.hashtags}
                        onChange={handleChange("hashtags")}
                    />
                </div> */}

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
                        Upload
                    </button>
                </div>
            </div>
        </>
    );
};

export default UploadPost;
