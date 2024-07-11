import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner10 } from "react-icons/im";

const Login = (props) => {

     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const [isLoading, setIsLoading] = useState(false)

     const handleLogin = async () => {
          // validate then call api

          setIsLoading(true)
          // submit apis
          let data = await postLogin(email, password);
          if(data && data.EC === 0) {
               dispatch(doLogin(data))
               toast.success(data.EM);
               setIsLoading(false)
               navigate('/')
          }

          if(data && data.EC !== 0) {
               toast.error(data.EM);
               setIsLoading(false)
          }

          
     }

     const handleClickBtnSignup = () => {
          navigate('/register')
     }

     return (
          <div className="login-container">
               <div className='header'>
                    <span>Don't have an account yet?</span>
                    <button onClick={() => handleClickBtnSignup()}>Sign up</button>
               </div>
               <div className='title col-4 mx-auto'>
                    ThuyVanNe
               </div>
               <div className='welcome col-4 mx-auto'>
                    Hello! Who's that
               </div>
               <div className='content-form col-4 mx-auto'>
                    <div className='form-group'>
                         <label>Email</label>
                         <input
                              type={"email"}
                              className='form-control'
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                         />
                    </div>
                    <div className='form-group'>
                         <label>Password</label>
                         <input
                              type={"password"}
                              className='form-control'
                              value={password}
                              onChange={(event) => setPassword(event.target.value)}
                         />
                    </div>
                    <span className='forgot-password'>Forgot password?</span>
                    <div>
                         <button 
                              className='btn-submit'
                              onClick={() => handleLogin()}
                              disabled={isLoading}
                         >
                              { isLoading === true && <ImSpinner10 className='loader-icon' />}
                              <span> Login To ThuyVanNe</span>
                         </button>
                    </div>
                    <div className='text-center'>
                         <span className='back' onClick={() => navigate('/')}> &#60;&#60;Go to Homepage</span>
                    </div>
               </div>
          </div>
     )
}

export default Login;