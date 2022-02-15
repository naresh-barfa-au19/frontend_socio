import { Routes, BrowserRouter, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Pages/Home"
import SignupPage from "./Components/Pages/Signup"
import LoginPage from "./Components/Pages/Login";
import UploadPost from "./Components/Pages/Upload";
import Profile from "./Components/Pages/Profile";
import ProfileEdit from "./Components/Pages/ProfileEdit";
import ForgetPassword from "./Components/Pages/ForgetPassword"

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/signup" element={<SignupPage/>} />
        <Route exact path="/login" element={<LoginPage/>} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route exact path="/upload" element={<UploadPost/>} />
        <Route exact path="/profile-edit" element={<ProfileEdit/>} />
        <Route exact path="/forget-password" element={<ForgetPassword/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
