import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const DetailPage = (props) => {
  const [comment, setComment] = useState("");
  const [postDetail,setPostDetail] = useState(props.postDetail)
  const navigate = useNavigate();
  const token = localStorage.getItem("token")

  const handleSubmit = async (postId) => {
    try {
      const res = await axios.post(`https://backendsocio.herokuapp.com/comment/${postId}`, {comment:comment},{
        headers: {
            token: token
        }
    });
      if (res.status === 200 && res.data.success) {
        console.log(res.data.data)
        // setPostDetail(res.data.data)
        setComment("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>

      { 
        <Modal
        show={props.show}
        onHide={props.handleClose}
        scrollable={true}
        size="xl"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <div className=" d-flex flex-row" key={postDetail._id}>
            <img src={postDetail.userInfo[0] && postDetail.userInfo[0].profilePic}
              className="rounded-circle m-3"
              style={{ height: "60px", width: "60px" }} alt="..." />
            <span className="d-flex flex-column ms-3 mt-3"><p>{postDetail.userInfo[0].name} </p>
              <p><small className="text-muted"> {postDetail.userInfo[0].email}</small> </p></span>
          </div>
        </Modal.Header>
        <Modal.Body  >
          <div className='row'>
            <div className='col-7'>
              <img src={postDetail.url}
                style={{ width: "50vw" }}
                alt="..." />
            </div>
            <div className='col-5 position-relative scroll'>
              <ul className="list-group list-group-flush ">
                {
                  postDetail && postDetail.comments &&
                  postDetail.comments.map((obj) => (
                    <li className="list-group-item"> <small className="text-muted"> {`${obj.userName} -> ` }</small>  {obj.data} </li>
                  ))
                }
              </ul>
              <div className="position-absolute bottom-0 start-0"
                style={{ width: "100%" }}
              >
                <input
                  className="form-control float-start"
                  placeholder="comment"
                  required
                  type="text"
                  name="comment"
                  style={{ width: "82%" }}
                  value={comment}
                  onChange={(e) => { setComment(e.target.value) }}
                />
                <span className='float-start '
                ><button
                  className="btn btn-outline-primary"
                  type="submit"
                  onClick={(e) => { handleSubmit(postDetail._id) }}
                >
                    Send
                  </button></span>

              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      }
    </>
  );
}


export default DetailPage;