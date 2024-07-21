import {
     BrowserRouter,
     Routes,
     Route
} from "react-router-dom";
import App from './App';
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import Homepage from './components/Home/Homepage';
import ManageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/Dashboard';
import Login from './components/Auth/Login';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./components/Admin/Content/Question/Questions";

const NotFound = () => {
     return (
          <div className="container mt-3 alert alert-danger">
               Not found data with current URL
               <div >

               </div>
          </div>
     )
}

const Layout = (props) => {
     return (
          <>
               <Routes>
                    <Route path='/' element={<App />} >
                         <Route index element={<Homepage />} />
                         <Route path='users' element={<ListQuiz />} />
                    </Route>
                    <Route path="/quiz/:id" element={<DetailQuiz />} />
                    <Route path='admins' element={<Admin />} >
                         <Route index element={<DashBoard />} />
                         <Route path='manage-users' element={<ManageUser />} />
                         <Route path='manage-quizzes' element={<ManageQuiz />} />
                         <Route path='manage-questions' element={<Questions />} />
                    </Route>
                    <Route path='/login' element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />} />
               </Routes>
               <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
               />
          </>
     )
}

export default Layout;