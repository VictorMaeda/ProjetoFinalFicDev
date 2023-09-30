import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { EnfermeiroPlantoes } from '../services/EnfermeiroService';

const ModalPlantoesEnfermeiro = ({ show, close, idEnfermeiro }) => {

  const [lista, setLista] = useState(null);

  

  useEffect(() => {
    fetchPlantoes();
  }, []);

  return (
    <div className='BodyModalPlantoesEnfermeiro'>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Plantões</Modal.Title>
        </Modal.Header>
        <Modal.Body className='ModalPlantoesEnfermeiroBody'>
          <table className='tabelaEnfermeiroPlantoes'>
            <thead>
              <tr>
                <th>Dia</th>
                <th>Hora</th>
              </tr>
            </thead>
            <tbody>
              {lista ? (
                lista.map((relacionamento) => (
                  <tr key={relacionamento.plantao.idPlantao}>
                    <td>{relacionamento.plantao.dia}</td>
                    <td>{relacionamento.plantao.horario}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">Carregando...</td>
                </tr>
              )}
            </tbody>
          </table>
        </Modal.Body>


        <Modal.Footer>
          <h6>Ola</h6>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalPlantoesEnfermeiro;