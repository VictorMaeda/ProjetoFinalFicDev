import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalPlantoesEnfermeiro = ({ show, close }) => {
  return (
    <div className='BodyModalPlantoesEnfermeiro'>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body className='ModalPlantoesEnfermeiroBody'>
          
        </Modal.Body>
        <Modal.Footer>
          <h6>Ola</h6>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalPlantoesEnfermeiro;
