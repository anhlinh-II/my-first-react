import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import './DetailQuiz.scss'
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";

const DetailQuiz = (props) => {
     const params = useParams();
     const quizId = params.id;
     const location = useLocation();
     // console.log('check location >> ', location)

     const [dataQuiz, setDataQuiz] = useState([]);
     const [index, setIndex] = useState(0);

     const [isShowModalResult, setIsShowModalResult] = useState(false);
     const [dataModalResult, setDataModalResult] = useState({})

     useEffect(() => {
          fetchQuestion();
     }, [])


     const fetchQuestion = async () => {
          let res = await getDataQuiz(quizId);
          // console.log(res)
          if (res && res.EC === 0) {
               let raw = res.DT;
               let data = _.chain(raw)
                    // group the elements of array base on 'id' property
                    .groupBy('id')
                    // key is group's name, value is array of objects
                    .map((value, key) => {
                         let answers = []
                         let questionDescription, image = null;

                         value.forEach((item, index) => {
                              if (index === 0) {
                                   questionDescription = item.description;
                                   image = item.image;
                              }
                              item.answers.isSelected = false;
                              answers.push(item.answers)
                         })
                         answers = _.orderBy(answers, ["id"], ["asc"]);
                         return { questionId: key, answers, questionDescription, image }
                    })
                    .value();
               setDataQuiz(data)
          }
     }

     const handlePrev = () => {
          if (index > 0)
               setIndex(index - 1)
     }

     const handleNext = () => {
          if (index + 1 < dataQuiz.length && dataQuiz)
               setIndex(index + 1);
     }

     const handleCheckbox = (answerId, questionId) => {
          let dataQuizClone = _.cloneDeep(dataQuiz);
          let question = dataQuizClone.find(item => +item.questionId === +questionId)
          if (question && question.answers) {
               let b = question.answers.map(item => {
                    if (+item.id === answerId) {
                         item.isSelected = !item.isSelected;
                    }
                    return item;
               })
               question.answers = b;
          }
          let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
          if (index > -1) {
               dataQuizClone[index] = question;
               setDataQuiz(dataQuizClone);
          }
     }

     const handleFinish = async () => {
          let payload = {
               quizId: +quizId,
               answers: []
          }
          let answers = []
          if (dataQuiz && dataQuiz.length > 0) {
               dataQuiz.map(question => {
                    let questionId = question.questionId
                    let userAnswerId = []

                    question.answers.forEach(a => {
                         if (a.isSelected === true) {
                              userAnswerId.push(a.id)
                         }
                    })

                    answers.push({
                         questionId: +questionId,
                         userAnswerId
                    })
               })
               payload.answers = answers;
               // submit api
               let res = await postSubmitQuiz(payload)
               console.log('check res >> ', res)
               if (res && res.EC === 0) {
                    setDataModalResult({
                         countCorrect: res.DT.countCorrect,
                         countTotal: res.DT.countTotal,
                         quizData: res.DT.quizData
                    })
                    setIsShowModalResult(true);
               }
          }
          // console.log('check payload >> ', payload)
     }

     return (
          <div className="detail-quiz-container">
               <div className="left-content">
                    <div className="title">
                         Quiz {quizId}: {location?.state?.quizTitle}
                    </div>
                    <hr />
                    <div className="q-body">
                         <img />
                    </div>
                    <div className="q-content">
                         <Question
                              handleCheckbox={handleCheckbox}
                              data={dataQuiz && dataQuiz.length > 0
                                   ? dataQuiz[index]
                                   : []
                              }
                              index={index}
                         />
                    </div>
                    <div className="footer">
                         <button
                              className="btn btn-primary"
                              onClick={() => handlePrev()}
                         >Prev</button>
                         <button
                              className="btn btn-secondary"
                              onClick={() => handleNext()}
                         >Next</button>
                         <button
                              className="btn btn-warning"
                              onClick={() => handleFinish()}
                         >Finish</button>
                    </div>
               </div>
               <div className="right-content">
                    <RightContent
                         handleFinishQuiz={handleFinish}
                         dataQuiz={dataQuiz}
                         setIndex={setIndex}
                    />
               </div>
               <ModalResult
                    show={isShowModalResult}
                    setShow={setIsShowModalResult}
                    dataModalResult={dataModalResult}
               />
          </div>
     )
}

export default DetailQuiz;