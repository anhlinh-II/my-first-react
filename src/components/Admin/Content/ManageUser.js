import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import {getAllUsers}  from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";

const ManageUser = (props) => {

     const [showModalCreateUser, setShowModalCreateUser] = useState(false)
     const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
     const [dataUpdate, setDataUpdate] = useState({})

     const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
     const [dataDelete, setDataDelete] = useState({})

     const [listUsers, setListUsers] = useState([])

     useEffect(async () => {
          fetchListUsers();
     }, []);

     const fetchListUsers = async () => {
          let res = await getAllUsers();
          if(res.EC === 0) {
               setListUsers(res.DT)
          }
     }

     const handleClickBtnUpdate = (user) => {
          setShowModalUpdateUser(true)
          setDataUpdate(user)
          console.log('user: ', user);
     }

     const resetUpdateData = () => {
          setDataUpdate({})
     }

     // delete function
     const handleClickBtnDelete = (user) => {
          setShowModalDeleteUser(true);
          setDataDelete(user)
     }

     return (
          <div className="manage-user-container">
               <div className="title">
                    Manage User
               </div>
               <div className="users-content">
                    <div className="btn-add-new">
                         <button 
                              className="btn btn-primary"
                              onClick={(event) => setShowModalCreateUser(true)}
                         > <FcPlus /> Add new users
                         </button>
                    </div>
                    <div className="table-users-container">
                         <TableUser 
                              listUsers={listUsers} 
                              handleClickBtnUpdate={handleClickBtnUpdate}
                              handleClickBtnDelete={handleClickBtnDelete}
                         />
                    </div>
                    <ModalCreateUser 
                         show={showModalCreateUser}
                         setShow={setShowModalCreateUser}
                         fetchListUsers={fetchListUsers}
                    />
                    <ModalUpdateUser
                         show={showModalUpdateUser}
                         setShow={setShowModalUpdateUser}
                         fetchListUsers={fetchListUsers}
                         dataUpdate={dataUpdate}
                         resetUpdateData={resetUpdateData}
                    />
                    <ModalDeleteUser
                         show={showModalDeleteUser}
                         setShow={setShowModalDeleteUser}
                         dataDelete={dataDelete}     
                    />
               </div>
          </div>
     )
}

export default ManageUser;