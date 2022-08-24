import parse from "html-react-parser";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from "utilities/constants";
import "./confirmModal.scss";

function ConfirmModal({ title, content, show, onAction }: any) {
  return (
    <Modal
      backdrop={"static"}
      show={show}
      onHide={() => onAction(MODAL_ACTION_CLOSE)}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontStyle: "italic" }}>{parse(content)}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => onAction(MODAL_ACTION_CLOSE)}
        >
          Close
        </Button>
        <Button variant="danger" onClick={() => onAction(MODAL_ACTION_CONFIRM)}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
