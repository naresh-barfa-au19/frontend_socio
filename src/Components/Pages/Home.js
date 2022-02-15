import { useEffect, useState } from "react";
import "../../App.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DetailPage from "../Model/DetailPage"

const Home = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const [likes,setLikes] = useState([])
  const [userData,setUserData] = useState({})
  const [show, setShow] = useState(false);
  const [postDetail, setPostDetail] = useState({});
  const token = localStorage.getItem('token')


  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("https://backendsocio.herokuapp.com/home", {
        headers: {
          'token': token
        }
      });
      if (res.data.success) {
        setPostData(res.data.data);
        setUserData(res.data.user)
        if(res.data.data && res.data.data.likes && res.data.data.likes.length>0){
          setLikes(res.data.data.likes)
        }
      } else {
        if (res.data.data === "notToken") {
          navigate("/login")
        }
        setErrorMessage(res.data.data)
      }
    };
    fetchUsers();
  }, [likes,show]);

  const likeHandler = async (postId) => {
    const res = await axios.get(`https://backendsocio.herokuapp.com/like/${postId}`,{
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

  const detailModalHandler = async (obj) => {
    setShow(true)
    setPostDetail(obj)
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    { show && 
      <DetailPage 
      show={show} 
      handleClose={handleClose} 
      handleShow={handleShow}
      postDetail = {postDetail}
       />
    }
      {token &&
        postData && postData.map((obj) => (

          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column mt-4 mb-4 col-5 ">
              <div className="card" >
                <div className=" d-flex flex-row" key={obj._id}>
                  <img src={obj.userInfo[0].profilePic}
                    className="rounded-circle m-3"
                    style={{ height: "60px", width: "60px" }} alt="..." />
                  <span className="d-flex flex-column ms-3 mt-3"><p>{obj.userInfo[0].name} </p>
                    <p><small className="text-muted"> {obj.userInfo[0].email}</small> </p></span>
                </div>
                <img src={obj.url} className="card-img-top" alt="..." onClick={(e)=>{detailModalHandler(obj)}} />
                <div className="card-body">
                  <span onClick={(e)=>likeHandler(obj._id)}>{obj.likes && obj.likes.indexOf(userData.userId) > -1 ? <span className="like-btn">&#10084;&#65039;</span> :<span className="like-btn">&#128420;</span>  } </span>
                  <span>&nbsp;&nbsp;{obj.likes? obj.likes.length : 0} </span>
                  <br/>
                  {/* <FontAwesomeIcon icon="fa-thin fa-heart" />
                  <FontAwesomeIcon icon="fa-solid fa-heart" /> */}
                  <span className="card-title"><small className="text-muted">{obj.userInfo[0].name} </small> </span>
                  <span className="card-text">{obj.caption} </span>
                  <p className="card-text"><small className="text-muted">{obj.createdAt} </small></p>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </>
  );
};

export default Home;
