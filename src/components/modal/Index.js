import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import styles from "../../assets/css/welcome.module.css";
import { SelectApiValue } from "../../redux/reducers/rootReducer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ModalB = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const routesConfig = ["/blog",];

  const selectApiUser = useSelector((state)=> state.articles.selectApi);

  const isApiRouteFound = routesConfig.includes(`/${selectApiUser}`);
 
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    dispatch(SelectApiValue(selectedValue));
    localStorage.setItem('selectApi', selectedValue); // Enregistrez la valeur dans le stockage local
  };

  const handleSend = ()=>{
    if(!selectApiUser){
      alert('vide');
      return;
    }

    if(isApiRouteFound){
      navigate(`/${selectApiUser}`);
    }
    else{
    
    }

  }

  return (
    <>
      <Button
        variant="primary"
        className={`btn btn-primary ${styles.button}`}
        onClick={handleShow}
      >
        GET STARTED
      </Button>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>API REST</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>selectionner une API</h5>
          <Form.Select  aria-label="Default select example" onChange={handleSelectChange}>
            <option value="">selectionner un menu</option>
            <option value="blog">Blog</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSend}>
            Ouvrir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalB;
