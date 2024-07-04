import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import _ from 'lodash'

const ModalViewUser = (props) => {
     const { show, setShow, dataView } = props;

     const handleClose = () => {
          setShow(false);
     };

     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [username, setUsername] = useState("");
     const [role, setRole] = useState("USER")
     const [image, setImage] = useState("");
     const [previewImage, setPreviewImage] = useState("");

     useEffect(() => {
          if(!_.isEmpty(dataView)) {
               // view state
               setEmail(dataView.email)
               setUsername(dataView.username)
               setRole(dataView.role)
               setImage("")
               if(dataView.image) {
                    setPreviewImage(`data:image/jpeg;base64,${dataView.image}`)
               }
          }
     },[dataView]);

     const validateEmail = (email) => {
          return String(email)
               .toLowerCase()
               .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
               );
     };

     return (
          <>

               <Modal
                    show={show}
                    onHide={handleClose}
                    size="xl"
                    backdrop="static"
                    className='modal-add-user'
               >
                    <Modal.Header closeButton>
                         <Modal.Title>View Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <form>
                              <div className="form-row">
                                   <div className="form-group col-md-6">
                                        <label>Email</label>
                                        <input
                                             type="email"
                                             className="form-control"
                                             placeholder="Email"
                                             value={email}
                                             disabled
                                             onChange={(event) => setEmail(event.target.value)}
                                        />
                                   </div>
                                   <div className="form-group col-md-6">
                                        <label>Password</label>
                                        <input
                                             type="password"
                                             className="form-control"
                                             placeholder="Password"
                                             value={password}
                                             disabled
                                             onChange={(event) => setPassword(event.target.value)}
                                        />
                                   </div>
                              </div>
                              <div className="form-row">
                                   <div className="form-group col-md-6">
                                        <label>Username</label>
                                        <input
                                             type="text"
                                             className="form-control"
                                             value={username}
                                             disabled
                                             onChange={(event) => setUsername(event.target.value)}
                                        />
                                   </div>
                                   <div className="form-group col-md-4">
                                        <label className='form-label'>Role</label>
                                        <select
                                             className="form-select"
                                             onChange={(event) => setRole(event.target.value)}
                                             disabled
                                             value={role}
                                        >
                                             <option value="USER">USER</option>
                                             <option value="ADMIN">ADMIN</option>
                                        </select>
                                   </div>

                                   <div className='col-md-12 img-preview'>
                                        {
                                             previewImage
                                                  ? <img src={previewImage} />
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
                         {/* <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                              Save
                         </Button> */}
                    </Modal.Footer>
               </Modal>
          </>
     );
}

export default ModalViewUser;