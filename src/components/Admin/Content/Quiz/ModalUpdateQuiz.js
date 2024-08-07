import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import { putUpdateQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const ModalUpdateQuiz = (props) => {
     const { show, setShow, dataUpdateQuiz, resetDataUpdateQuiz } = props;

     const [name, setName] = useState('')
     const [description, setDescription] = useState('')
     const [difficulty, setDifficulty] = useState('')
     const [imageQuiz, setImageQuiz] = useState('')
     const [previewImageQuiz, setPreviewImageQuiz] = useState('')

     useEffect(() => {
          if (!_.isEmpty(dataUpdateQuiz)) {
               // update state
               setName(dataUpdateQuiz.name)
               setDescription(dataUpdateQuiz.description)
               setDifficulty(dataUpdateQuiz.difficulty)
               setImageQuiz('')
               if (dataUpdateQuiz.image) {
                    setPreviewImageQuiz(`data:image/jpeg;base64,${dataUpdateQuiz.image}`)
               }
          }
     }, [dataUpdateQuiz]);

     const handleClose = () => {
          setShow(false);
          setDescription('')
          setName('')
          setDifficulty('')
          setImageQuiz('')
          resetDataUpdateQuiz();
     };

     const handleUploadImage = (event) => {
          if (event.target && event.target.files && event.target.files[0]) {
               setPreviewImageQuiz(URL.createObjectURL(event.target.files[0]))
               setImageQuiz(event.target.files[0])
          } else {
               // setPreviewImage("")
          }
     }

     const handleSubmitUpdateQuiz = async () => {
          if (!name) {
               toast.error('Invalid name')
               return;
          }

          if (!description) {
               toast.error('Invalid description')
               return;
          }

          console.log('check data before submit', imageQuiz)
          let data = await putUpdateQuiz(dataUpdateQuiz.id, description, name, difficulty, imageQuiz)
          console.log(data)

          if (data && data.EC === 0) {
               toast.success(data.EM);
               handleClose();
          }

          if (data && data.EC !== 0) {
               toast.error(data.EM);
          }
          handleClose();
     }

     return (
          <Modal
               show={show}
               onHide={handleClose}
               size="xl"
               backdrop="static"
               className='modal-add-user'
          >
               <Modal.Header closeButton>
                    <Modal.Title>Update a quiz</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                    <form>
                         <div className="form-row">
                              <div className="form-group col-md-6">
                                   <label>Name</label>
                                   <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                   />
                              </div>
                         </div>
                         <div className="form-row">
                              <div className="form-group col-md-6">
                                   <label>Description</label>
                                   <input
                                        type="text"
                                        className="form-control"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                   />
                              </div>
                              <div className="form-group col-md-4">
                                   <label className='form-label'>Difficulty</label>
                                   <select
                                        className="form-select"
                                        onChange={(event) => setDifficulty(event.target.value)}
                                        value={difficulty}
                                   >
                                        <option value="EASY">EASY</option>
                                        <option value="MEDIUM">MEDIUM</option>
                                        <option value="HARD">HARD</option>
                                   </select>
                              </div>
                              <div className='col-md-12'>
                                   <label className='form-label label-upload' htmlFor='labelUpload'>
                                        <FcPlus /> Upload File Image</label>
                                   <input
                                        type='file'
                                        id='labelUpload'
                                        hidden
                                        onChange={(event) => handleUploadImage(event)}
                                   />
                              </div>

                              <div className='col-md-12 img-preview'>
                                   {
                                        previewImageQuiz
                                             ? <img src={previewImageQuiz} />
                                             : <span>Preview Image</span>
                                   }
                              </div>
                         </div>
                    </form>
               </Modal.Body>
               <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                         Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                         Save
                    </Button>
               </Modal.Footer>
          </Modal>
     )
}

export default ModalUpdateQuiz;