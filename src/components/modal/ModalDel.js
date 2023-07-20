import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fecthDeleteArticle } from "../../redux/reducers/rootReducer";
import { useDispatch } from "react-redux";

const ModalDel = ({ show, setShow, detailArticleDel }) => {
  const { id, titre } = detailArticleDel;
  const dispatch = useDispatch();

  const handleSubmit = ()=>{
    setShow(false);
    dispatch(fecthDeleteArticle(id));
  }

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          voulez vous supprimer :<strong> {titre} </strong>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="btn-danger"
            onClick={handleSubmit}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDel;
