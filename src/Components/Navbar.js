import { Link, useNavigate } from "react-router-dom"
import "../App.css"

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const logoutHandler = async () => {
        try {
            localStorage.clear();
            navigate("/login")
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-color my-0">
            <div className="container">
                <Link className="navbar-brand" to="/"><h2 className="ft-color fw-bold">SociO</h2> </Link>
                <div>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {
                            token &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/upload">
                                    <button type="button" className="btn btn-outline-primary">Post</button>

                                </Link>
                            </li>
                        }
                        {
                            token &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">
                                    <button type="button" className="btn btn-outline-primary">Profile</button>
                                </Link>
                            </li>
                        }
                        {
                            token ?
                                <li className="nav-item nav-link">
                                    <button type="button" className="btn btn-outline-primary" onClick={logoutHandler}>Logout</button>
                                </li>
                                : <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signup">
                                            <button type="button" className="btn btn-outline-primary">Sign-up</button>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            <button type="button" className="btn btn-outline-primary">Login </button>
                                        </Link>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </nav >
    )

}

export default Navbar