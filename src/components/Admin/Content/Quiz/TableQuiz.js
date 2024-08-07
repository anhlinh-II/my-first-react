import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";

const TableQuiz = (props) => {

     const [listQuiz, setListQuiz] = useState([]);
     const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
     const [dataUpdateQuiz, setDataUpdateQuiz] = useState({});
     const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
     const [dataDeleteQuiz, setDataDeleteQuiz] = useState({})

     useEffect(() => {
          fetchQuiz();
     }, [dataUpdateQuiz]);

     const fetchQuiz = async () => {
          let res = await getAllQuizForAdmin()
          if (res && res.EC === 0) {
               setListQuiz(res.DT)
          }
     }

     const resetDataUpdateQuiz = () => {
          setDataUpdateQuiz({})
     }

     const handleClickEditBtn = (quiz) => {
          setIsShowUpdateModal(true);
          setDataUpdateQuiz(quiz);
     }

     const handleClickDeleteBtn = (quiz) => {
          setIsShowDeleteModal(true)
          setDataDeleteQuiz(quiz)
     }

     return (
          <>
               <div>List Quizzes: </div>
               <table className="table table-hover table-bordered mt-2">
                    <thead>
                         <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">Description</th>
                              <th scope="col">Type</th>
                              <th scope="col">Actions</th>
                         </tr>
                    </thead>
                    <tbody>
                         {listQuiz && listQuiz.map((item, index) => {
                              return (
                                   <tr key={`table-quiz-${index}`}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.difficulty}</td>
                                        <td style={{ display: "flex", gap: "15px" }}>
                                             <button
                                                  className="btn btn-warning"
                                                  onClick={() => handleClickEditBtn(item)}
                                             >
                                                  Edit
                                             </button>
                                             <button
                                                  className="btn btn-danger"
                                                  onClick={() => handleClickDeleteBtn(item)}
                                             >
                                                  Delete
                                             </button>
                                        </td>
                                   </tr>
                              )
                         })}

                    </tbody>
               </table>
               <ModalUpdateQuiz
                    setShow={setIsShowUpdateModal}
                    show={isShowUpdateModal}
                    dataUpdateQuiz={dataUpdateQuiz}
                    resetDataUpdateQuiz={resetDataUpdateQuiz}
               />
               <ModalDeleteQuiz 
                    setShow={setIsShowDeleteModal}
                    show={isShowDeleteModal}
                    dataDeleteQuiz={dataDeleteQuiz}
                    fetchQuiz={fetchQuiz}
               />
          </>
     )
}

export default TableQuiz;