/* ------------------- Composants Bootstrap ------------------- */

import Modal from "react-bootstrap/Modal";

/* ------------------- Styles ------------------- */

import "./Styles/Modale.css"

/* ------------------- Types And Interfaces ------------------- */

import { ModaleProps } from '../toolbox/typeAndInterface'


function Modale(props: ModaleProps) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal"
    >
      <Modal.Header closeButton className="header">
        <Modal.Title id="contained-modal-title-vcenter">
          {` Client ${props.screenshotClient}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="body">
        <img src={props.imageModale} alt="modale" />
      </Modal.Body>
      <Modal.Footer className="footer">
        <button onClick={props.onHide} className="btn btn-primary">Close</button>
      </Modal.Footer>
    </Modal>
  );
}

export default Modale;