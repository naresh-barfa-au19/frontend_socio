import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"

const Profile = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("")
    const [userPostData, setUserPostData] = useState({});
    const [likes, setLikes] = useState([])
    const token = localStorage.getItem('token')


    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get("https://backendsocio.herokuapp.com/profile", {
                headers: {
                    'token': token
                }
            });
            if (res.data.success) {
                setUserPostData(res.data.data)
            } else {
                if (res.data.data === "notToken") {
                    navigate("/login")
                }
                setErrorMessage(res.data.data)
            }
        };
        fetchUsers();
    }, [likes]);

    const handleDelete = async (cloudinaryId) => {
        try {
            const res = await axios.delete(`https://backendsocio.herokuapp.com/delete/${cloudinaryId}`, {
                headers: {
                    'token': token
                }
            });
            if (res.data.success) {
                setErrorMessage(res.data.data)
            } else {
                setErrorMessage(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    };
    const likeHandler = async (postId) => {
        console.log("like", postId)
        const res = await axios.get(`https://backendsocio.herokuapp.com/like/${postId}`, {
            headers: {
                'token': token
            }
        });
        if (res.data.success) {
            setLikes(res.data.data);
        } else {
            setErrorMessage(res.data.data)
        }
    }
    const deleteProfileHandler = async () => {
        setErrorMessage("Profile photo deleting ...")
        try {
            const res = await axios.delete(`https://backendsocio.herokuapp.com/profile-delete`, {
                headers: {
                    'token': token
                }
            });
            if (res.data.success) {
                setErrorMessage(res.data.data)
            } else {
                setErrorMessage(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {
                errorMessage &&
                <div className="alert alert-warning alert-dismissible fade show d-flex justify-content-center" role="alert">
                    <strong>{errorMessage}</strong>
                </div>
            }
            {
                userPostData &&
                <div className="d-flex flex-column align-items-center mt-5">
                    <div className="card mb-3" style={{ width: "50%" }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                {userPostData.profilePic ?
                                    <img
                                        src={userPostData.profilePic}
                                        className="img-fluid rounded-start"
                                        alt="..."
                                    />
                                    :
                                    <img
                                        src={`${process.env.PUBLIC_URL}/profileDummy.jpeg`}
                                        className="img-fluid rounded-start"
                                        alt="..."
                                    />
                                }
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Profile</h5>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            {/* <p>Name</p> */}
                                            <p>{userPostData.name} </p>
                                            <p>{userPostData.email} </p>
                                        </li>

                                        <li className="list-group-item">
                                            <div className="d-flex justify-content-evenly">
                                                <span>
                                                    <button
                                                        className="btn btn-outline-primary btn-sm"
                                                        type="submit"
                                                        onClick={deleteProfileHandler}
                                                    >
                                                        Remove photo
                                                    </button>
                                                </span>
                                                <span><Link to="/profile-edit" style={{ textDecoration: "none" }} >
                                                    <button
                                                        className="btn btn-outline-primary btn-sm"
                                                        type="submit"
                                                    // onClick={handleEdit}
                                                    >
                                                        Edit
                                                    </button>
                                                </Link> </span>
                                                <span><Link to="/upload" style={{ textDecoration: "none" }} ><button
                                                    className="btn btn-outline-primary btn-sm"
                                                    type="submit"
                                                // onClick={handleEdit}
                                                >
                                                    Post
                                                </button></Link> </span>
                                                {/* <span><button type="button" className="btn btn-link m-0 p-0" style={{ textDecoration: "none" }} onClick={logoutHandler} >LOGOUT</button></span> */}
                                            </div>
                                        </li>
                                    </ul>

                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            }
            <div className="row">
                {userPostData && userPostData.posts && userPostData.posts?.map((obj) => (
                    <div className="m-4 col-3 card me-3  p-0" key={obj.cloudinaryId}>
                        <img
                            src={obj.url}
                            className="img-fluid rounded-start"
                            alt="..."
                        />
                        <div className="p-2">
                            <div style={{ fontSize: "10px", color: "gray" }} >Created by : {obj.createdBy}</div>
                            <div >
                                <span onClick={(e) => likeHandler(obj._id)}>{obj.likes && obj.likes.indexOf(userPostData._id) > -1 ? <span>&#10084;&#65039;</span> : <span>&#128420;</span>} </span>
                                <span>&nbsp;&nbsp;{obj.likes ? obj.likes.length : 0} </span>
                                <br /> </div>
                            <div>{obj.caption} </div>
                            {
                                obj.hashtags?.map((tag) => (
                                    <span>{tag} </span>
                                ))
                            }
                            <div style={{ fontSize: "10px", color: "gray" }} >{obj.createdAt}</div>
                            <div className="d-flex justify-content-between">
                                {/* <button
                                    className="btn btn-outline-primary btn-sm"
                                    type="submit"
                                // onClick={handleEdit}
                                >
                                    Edit
                                </button> */}
                                <button
                                    className="btn btn-outline-dark btn-sm"
                                    type="submit"
                                    onClick={() => handleDelete(obj.cloudinaryId)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Profile;
