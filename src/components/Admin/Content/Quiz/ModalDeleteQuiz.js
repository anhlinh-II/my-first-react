import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import {deleteQuiz} from '../../../../services/apiService'

const ModalDeleteQuiz = (props) => {
     const { show, setShow, dataDeleteQuiz } = props;

     const handleClose = () => setShow(false);
     
     const handleSubmitDeleteQuiz = async () => {
          let data = await deleteQuiz(dataDeleteQuiz.id)
          if(data && data.EC === 0) {
               toast.success(data.EM);
               console.log('ok2')
               handleClose();
               await props.fetchQuiz();
               // await props.fetchListQuizs()
               // props.setCurrenPage(1)
               // await props.fetchListQuizsWithPaginate(1)
          }

          if(data && data.EC !== 0) {
               toast.error(data.EM);
          }
     }

     return (
          <>
               <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
               >
                    <Modal.Header closeButton>
                         <Modal.Title>Confirm Delete Quiz?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure to delete this Quiz named " 
                         <b>
                              {dataDeleteQuiz && ` ${dataDeleteQuiz.name}` ? dataDeleteQuiz.name : ""}
                         </b>"?
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={() => handleClose()}>
                              Cancel
                         </Button>
                         <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
                              Confirm
                         </Button>
                    </Modal.Footer>
               </Modal>
          </>
     );
}

export default ModalDeleteQuiz;