import { useEffect, useState } from 'react';
import Select from 'react-select';
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { AiFillPlusSquare, AiFillMinusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri"
import { v4 as uuidv4 } from 'uuid';
import { getAllQuizForAdmin, postCreateNewAnswerForQuestion, postCreateQuestionForQuiz } from "../../../../services/apiService";
import Lightbox from "react-awesome-lightbox";
import _ from 'lodash';
import './QuizQA.scss';
import { toast } from 'react-toastify';

const QuizQA = (props) => {

     const initQuestions = [
          {
               id: uuidv4(),
               description: '',
               imageFile: '',
               imageName: '',
               answers: [
                    {
                         id: uuidv4(),
                         description: '',
                         isCorrect: false
                    }
               ]
          }
     ]
     const [selectedQuiz, setSelectedQuiz] = useState({});  

     const [questions, setQuestions] = useState(initQuestions)

     const [isPreviewImage, setIsPreviewImage] = useState(false);
     const [dataImagePreview, setDataImagePreview] = useState({
          title: '',
          url: ''
     });

     const [listQuiz, setListQuiz] = useState([]);

     const [errorQuestion, setErrorQuestion] = useState(null)
     const [errorAnswer, setErrorAnswer] = useState(null)

     useEffect(() => {
          fetchQuiz();
     }, [errorQuestion]);

     const fetchQuiz = async () => {
          let res = await getAllQuizForAdmin()
          if (res && res.EC === 0) {
               let newQuiz = res.DT.map(item => {
                    return {
                         value: item.id,
                         label: `${item.id} - ${item.description}`
                    }
               })
               setListQuiz(newQuiz)
          }
     }

     const handleAddRemoveQuestion = (type, id) => {
          if (type === 'ADD') {
               const newQuestion = {
                    id: uuidv4(),
                    description: '',
                    imageFile: '',
                    imageName: '',
                    answers: [
                         {
                              id: uuidv4(),
                              description: '',
                              isCorrect: false
                         }
                    ]
               }
               setQuestions([...questions, newQuestion]);
          }
          if (type === 'REMOVE') {
               let questionsClone = _.cloneDeep(questions);

               questionsClone = questionsClone.filter(item => item.id !== id)
               setQuestions(questionsClone);
          }
     }

     const handleAddRemoveAnswer = (type, questionId, answerId) => {
          let questionsClone = _.cloneDeep(questions);
          if (type === 'ADD') {
               const newAnswer = {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
               }
               let index = questionsClone.findIndex(item => item.id === questionId)
               // questionsClone[index].answers.push(newAnswer)
               questionsClone[index].answers = [...questionsClone[index].answers, newAnswer]
               setQuestions(questionsClone)
          }
          if (type === 'REMOVE') {
               let index = questionsClone.findIndex(item => item.id === questionId)
               const newArrayAnswer = questionsClone[index].answers.filter(item => item.id !== answerId);
               questionsClone[index].answers = [...newArrayAnswer]
               setQuestions(questionsClone);
          }
     }

     const handleOnchange = (type, questionId, value, answerId) => {
          if (type === 'QUESTION') {
               let questionsClone = _.cloneDeep(questions);
               let index = questionsClone.findIndex(item => item.id === questionId)
               if (index > -1) {
                    questionsClone[index].description = value;
                    setQuestions(questionsClone);
               }
          }
          if (type === 'ANSWER') {
               let questionsClone = _.cloneDeep(questions);
               let index = questionsClone.findIndex(item => item.id === questionId);
               if (index > -1) {
                    let a = questionsClone[index].answers.filter(item => item.id === answerId)
                    a[0].description = value;
                    console.log('check a >> ', a)
                    questionsClone[index].answers.forEach((answer, answerIndex) => {
                         if (answer.id === a[0].id) {
                              questionsClone[index].answers[answerIndex] = a[0];
                         }
                    })
                    setQuestions(questionsClone)
               }
          }
     }

     const handleOnchangeFileQuestion = (questionId, event) => {
          let questionsClone = _.cloneDeep(questions);
          let index = questionsClone.findIndex(item => item.id === questionId)
          if (index > -1 && event.target.files && event.target.files[0]) {
               questionsClone[index].imageFile = event.target.files[0];
               questionsClone[index].imageName = event.target.files[0].name;
               setQuestions(questionsClone);
          }
     }

     const handleAnswerQuestion = (type, answerId, questionId, value) => {
          let questionsClone = _.cloneDeep(questions);
          let index = questionsClone.findIndex(item => item.id === questionId)
          if (index > -1) {
               questionsClone[index].answers =
                    questionsClone[index].answers.map(answer => {
                         if (answer.id === answerId) {
                              if (type === 'CHECKBOX') {
                                   answer.isCorrect = value
                              }
                              if (type === 'INPUT') {
                                   answer.description = value
                              }
                         }
                         return answer;
                    })
               setQuestions(questionsClone);
          }
     }

     const handleSubmitQuestionForQuiz = async () => {
          // todo
          if (_.isEmpty(selectedQuiz)) {
               toast.error("please choose a quiz!")
          }
          // validate question

          let isValidQ = true;
          let indexQ1 = 0;
          for (let i = 0; i < questions.length; i++) {
               if (!questions[i].description) {
                    isValidQ = false;
                    indexQ1 = i;
                    setErrorQuestion(indexQ1);
                    break;
               }
          }
          
          if (!isValidQ) {
               toast.error(`Not empty description for question ${indexQ1 + 1}`)
               return;
          }
          // validate answers
          let isValidAnswer = true;
          let indexA = 0, indexQ = 0;
          for (let i = 0; i < questions.length; i++) {
               for (let j = 0; j < questions[i].answers.length; j++) {
                    if (!questions[i].answers[j].description) {
                         isValidAnswer = false;
                         indexA = j;
                         setErrorAnswer(indexA);
                         break;
                    }
               }
               if (!isValidAnswer) {
                    indexQ = i;
                    setErrorQuestion(indexQ);
                    break;
               }
          }

          if (!isValidAnswer) {
               toast.error(`Not empty answer ${indexA + 1} + at question ${indexQ + 1}`)
               return;
          }

          // submit questions

          for (const question of questions) {
               const q = await postCreateQuestionForQuiz(
                    +selectedQuiz.value,
                    question.description,
                    question.imageFile
               );
               // submit answers
               for (const answer of question.answers) {
                    await postCreateNewAnswerForQuestion(
                         answer.description, answer.isCorrect, q.DT.id
                    )
               }
          }

          toast.success('Create questions and answers success');

     }

     const handlePreviewImage = (questionId) => {
          let questionsClone = _.cloneDeep(questions);
          let index = questionsClone.findIndex(item => item.id === questionId)
          if (index > -1) {
               setDataImagePreview({
                    url: URL.createObjectURL(questionsClone[index].imageFile),
                    title: questionsClone[index].imageName
               })
               setIsPreviewImage(true)
          }
     }

     return (
          <div className="questions-container">
               <div className="add-new-questions">
                    <div className='col-6 form-group'>
                         <label className='mb-2'>Select Quiz</label>
                         <Select
                              defaultValue={selectedQuiz}
                              onChange={setSelectedQuiz}
                              options={listQuiz}
                         />
                    </div>
                    <div className='mt-3 mb-2'>
                         Add questions:
                    </div>

                    {
                         questions && questions.length > 0

                         && questions.map((question, index) => {
                              return (
                                   <div key={question.id} className='q-main mb-4'>
                                        <div className='questions-content'>
                                             <div className='form-floating description'>
                                                  <input
                                                       type="type"
                                                       placeholder="..."
                                                       value={question.description}
                                                       onChange={(event) => handleOnchange('QUESTION', question.id, event.target.value)}
                                                       className={+index === +errorQuestion && errorQuestion !== null ? "form-control is-invalid" : "form-control"}
                                                  />
                                                  <label>Questions {index + 1}'s Description</label>
                                             </div>
                                             <div className='group-upload'>
                                                  <label htmlFor={`${question.id}`}>
                                                       <RiImageAddFill className='label-up' />
                                                  </label>
                                                  <input
                                                       id={`${question.id}`}
                                                       type={'file'}
                                                       hidden
                                                       onChange={(event) => handleOnchangeFileQuestion(question.id, event)}
                                                  />
                                                  <span>
                                                       {question.imageName
                                                            ? <span
                                                                 style={{ cursor: 'pointer' }}
                                                                 onClick={() => handlePreviewImage(question.id)}
                                                            >
                                                                 {question.imageName}
                                                            </span>
                                                            : '0 file is uploaded'
                                                       }

                                                  </span>
                                             </div>
                                             <div className='btn-add'>

                                                  <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                                       <BsFillPatchPlusFill className='icon-add' />
                                                  </span>
                                                  {
                                                       questions.length > 1
                                                       && <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                            <BsFillPatchMinusFill className='icon-remove' />
                                                       </span>
                                                  }
                                             </div>
                                        </div>
                                        {
                                             question.answers && question.answers.length > 0
                                             && question.answers.map((answer, index) => {
                                                  return (
                                                       <div key={answer.id} className='answers-content'>
                                                            <input
                                                                 className={+index === +errorAnswer && errorAnswer !== null ? "form-check-input iscorrect is-invalid" : "form-check-input iscorrect"}
                                                                 type='checkbox'
                                                                 checked={answer.isCorrect}
                                                                 onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                                            />
                                                            <div className='form-floating answer-name'>
                                                                 <input
                                                                      value={answer.description}
                                                                      type="type"
                                                                      className={index === errorAnswer ? "form-control is-invalid" : "form-control"}

                                                                      placeholder="..."
                                                                      onChange={(e) => handleOnchange('ANSWER', question.id, e.target.value, answer.id)}
                                                                 // onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}
                                                                 />
                                                                 <label>Answer {index + 1}</label>
                                                            </div>
                                                            <div className='btn-group'>
                                                                 <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                                                      <AiFillPlusSquare className='icon-add' />
                                                                 </span>
                                                                 {
                                                                      question.answers.length > 1 &&
                                                                      <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                                           <AiFillMinusCircle className='icon-remove' />
                                                                      </span>
                                                                 }
                                                            </div>
                                                       </div>
                                                  )
                                             })
                                        }
                                   </div>
                              )
                         })
                    }
                    {
                         questions && questions.length > 0 &&
                         <div>
                              <button
                                   onClick={() => handleSubmitQuestionForQuiz()}
                                   className='btn btn-warning'>Save Questions</button>
                         </div>
                    }
                    {
                         isPreviewImage === true &&
                         <Lightbox
                              image={dataImagePreview.url}
                              title={dataImagePreview.title}
                              onClose={() => setIsPreviewImage(false)}
                         />
                    }
               </div>
          </div>
     )
}

export default QuizQA;