/* ------------------- Composants Bootstrap ------------------- */

import Modal from "react-bootstrap/Modal";

/* ------------------- Styles ------------------- */

import "./Styles/Modale.css"

type Props = {
  screenshotClient: string
  imageModale: string
  onHide: () => void;
  show: boolean
}


function Modale(props: Props) {
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