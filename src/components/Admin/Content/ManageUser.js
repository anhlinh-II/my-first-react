import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from 'react';
import { getAllUsers, getUsersWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalViewUser from "./ModalViewUser";
import TableUserPaginate from "./TableUserPaginate";
// import { fromPairs } from "lodash";

const ManageUser = (props) => {
     const LIMIT_USER = 6;
     const [pageCount, setPageCount] = useState(0)

     const [showModalCreateUser, setShowModalCreateUser] = useState(false)
     
     const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
     const [dataUpdate, setDataUpdate] = useState({})

     const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
     const [dataDelete, setDataDelete] = useState({})

     const [dataView, setDataView] = useState({})
     const [showModalViewUser, setShowModalViewUser] = useState(false)

     const [listUsers, setListUsers] = useState([])

     useEffect(() => {
          fetchListUsersWithPaginate(1);
     }, []);

     const fetchListUsers = async () => {
          let res = await getAllUsers();
          if (res.EC === 0) {
               setListUsers(res.DT)
          }
     }

     const fetchListUsersWithPaginate = async (page) => {
          let res = await getUsersWithPaginate(page, LIMIT_USER);
          if (res.EC === 0) {
               setListUsers(res.DT.users)
               setPageCount(res.DT.totalPages);
          }
     }

     const handleClickBtnUpdate = (user) => {
          setShowModalUpdateUser(true)
          setDataUpdate(user)
     }

     const resetUpdateData = () => {
          setDataUpdate({})
     }

     // delete function
     const handleClickBtnDelete = (user) => {
          setShowModalDeleteUser(true);
          setDataDelete(user)
     }

     // view function
     const handleClickBtnView = (user) => {
          console.log('click view')
          setDataView(user);
          setShowModalViewUser(true);
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
                         {/* <TableUser
                              listUsers={listUsers} 
                              handleClickBtnUpdate={handleClickBtnUpdate}
                              handleClickBtnDelete={handleClickBtnDelete}
                         /> */}
                         <TableUserPaginate
                              listUsers={listUsers}
                              handleClickBtnView={handleClickBtnView}
                              handleClickBtnUpdate={handleClickBtnUpdate}
                              handleClickBtnDelete={handleClickBtnDelete}
                              fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                              pageCount={pageCount}
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
                         fetchListUsers={fetchListUsers}
                    />
                    <ModalViewUser 
                         show={showModalViewUser}
                         setShow={setShowModalViewUser}
                         dataView={dataView}
                    />
               </div>
          </div>
     )
}

export default ManageUser;