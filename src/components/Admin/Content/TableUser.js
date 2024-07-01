import { useEffect, useState } from "react";
import {getAllUsers}  from "../../../services/apiService";

const TableUser = (props) => {

     const [listUsers, setListUsers] = useState([
          
     ])

     // useEffect run after return (componentDidMount)
     useEffect(async () => {
          fetchListUsers();
     }, []);

     const fetchListUsers = async () => {
          let res = await getAllUsers();
          if(res.EC === 0) {
               setListUsers(res.DT)
          }
     }

     return (
          <>
               <table className="table table-hover table-bordered">
                    <thead>
                         <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Username</th>
                              <th scope="col">Email</th>
                              <th scope="col">Role</th>
                         </tr>
                    </thead>
                    <tbody>
                         {listUsers && listUsers.length > 0 &&

                              listUsers.map((item, index) => {
                                   return (
                                        <tr key={'table-user-${index}'}>
                                             <td>{item.id}</td>
                                             <td>{item.username}</td>
                                             <td>{item.email}</td>
                                             <td>{item.role}</td>
                                             <td>
                                                  <button className="btn btn-secondary">View</button>
                                                  <button className="btn btn-warning mx-3">Update</button>
                                                  <button className="btn btn-danger">Delete</button>
                                             </td>
                                        </tr>
                                   )
                              })
                         }

                         {listUsers && listUsers.length === 0 
                              && <tr>
                                   <td colSpan={'4'}> Not Found User </td>
                              </tr>
                         }

                    </tbody>
               </table>
          </>
     )
}

export default TableUser