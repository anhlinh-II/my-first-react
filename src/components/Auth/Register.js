import { useState } from "react";
import { FaEye } from "react-icons/fa";
import './Register.scss'
import { postSignUp } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Language from "../Header/Language";

const Register = () => {

     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [name, setName] = useState("")
     const [togglePassword, setTogglePassword] = useState(false)

     const navigate = useNavigate()

     const validateEmail = (email) => {
          return String(email)
               .toLowerCase()
               .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
               );
     };

     const handleClickBtnSignup = async () => {
          // validate
          const isValidEmail = validateEmail(email)
          if (!isValidEmail) {
               toast.error("invalid email")
               return;
          }

          if (!password) {
               toast.error("invalid password")
          }

          let data = await postSignUp(email, password, name);
          if(data && data.EC === 0) {
               toast.success(data.EM);
               navigate('/login');
          }

          if(data && data.EC !== 0) {
               toast.error(data.EM);
          }
     }

     const handleClickBtnLogin = () => {
          navigate('/login')
     }

     const handleClickBtnToggle = () => {
          setTogglePassword(!togglePassword) 
     }

     return (
          <>
               <div className="register-container">
                    <div className="title col-4 mx-auto">
                         <span>Create an account</span>
                    </div>
                    <div className="email col-4 mx-auto">
                         <label>Email</label>
                         <input
                              type="email"
                              placeholder="thuyvan@gmail.com"
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                         />
                    </div>
                    <div className="password col-4 mx-auto">
                         <label>Password</label>
                         <input
                              placeholder="enter your password"
                              type={togglePassword ? "text" : "password"}
                              onChange={(event) => setPassword(event.target.value)}
                              value={password}
                         />
                         <span className="showHideBtn" onClick={() => handleClickBtnToggle()}><FaEye /></span>
                    </div>
                    <div className="username col-4 mx-auto">
                         <label>User Name</label>
                         <input
                              placeholder="enter your name"
                              type={"text"}
                              onChange={(event) => setName(event.target.value)}
                              value={name}
                         />
                    </div>
                    <button className="login-btn" onClick={() => handleClickBtnSignup()}>SIGN UP</button>
                    <button className="login-btn" onClick={() => handleClickBtnLogin()}>ALREADY HAD AN ACCOUNT</button>
                    <Language
                         className="language"
                    />
               </div>
          </>
     );
}

export default Register;