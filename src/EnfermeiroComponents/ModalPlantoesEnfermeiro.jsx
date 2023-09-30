import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { EnfermeiroPlantoes } from '../services/EnfermeiroService';
import './ModalPlantoesEnfermeiro.css'
const ModalPlantoesEnfermeiro = ({ show, close, idEnfermeiro, enfermeiroPlantoes, desmarcarPlantao }) => {

  const [lista, setLista] = useState(null);




  return (
    <div>
      <Modal show={show} onHide={close} className='ModalPlantoesEnfermeiroComponent'>
        <Modal.Header closeButton>
          <Modal.Title>Plantões Agendados</Modal.Title>
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
              {enfermeiroPlantoes ? (
                enfermeiroPlantoes.map((relacionamento) => (
                  <tr key={relacionamento.plantao.idPlantao}>
                    <td>{relacionamento.plantao.dia}</td>
                    <td>{relacionamento.plantao.horario}</td>
                    <td>
                      <button className='btn btn-danger' onClick={() => desmarcarPlantao(idEnfermeiro, relacionamento.plantao.idPlantao)}>Desmarcar</button>
                    </td>
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
        <Modal.Footer className='ModalFooter'>
          <div className='Adicioneumplantao'>
            <h5>Adicione um Plantao</h5>
          </div>
          <div className='EnfermeiroPlantaoFormTotal'>
            <div className='EnfermeiroPlantaoFormQuest'>
              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-3'>
                    <div className="mb-3 text-start">
                      <label className="form-label">Data</label>
                      <input type='date' className='form-control' id='dataInputPlantao' />
                    </div>
                  </div>
                  <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-3'>
                    <div className="mb-3 text-start">
                      <label className="form-label">Horário</label>
                      <select className='form-control' id='horarioInputPlantao'>
                        <option value="" selected disabled>Selecione</option>
                        <option value="08:00:00">8:00:00</option>
                        <option value="16:00:00">16:00:00</option>
                        <option value="00:00:00">00:00:00</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className='btn btn-success'>Agendar</button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalPlantoesEnfermeiro;