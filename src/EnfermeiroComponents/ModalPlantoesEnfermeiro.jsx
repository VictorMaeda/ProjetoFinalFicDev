import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import './ModalPlantoesEnfermeiro.css'
import $ from 'jquery';
import { adicionarEnfermeiroPlantao } from '../services/EnfermeiroService';
const ModalPlantoesEnfermeiro = ({ show, close, idEnfermeiro, enfermeiroPlantoes, desmarcarPlantao, fetchPlantoes, nome }) => {

  const [lista, setLista] = useState(enfermeiroPlantoes);


  useEffect(() => {
    setLista(enfermeiroPlantoes);
  }, [enfermeiroPlantoes])

  async function adicionarPlantao() {
    const data = $('#dataInputPlantao').val();
    const hora = $('#horarioInputPlantao').val();

    if (data === "" || hora === "") {
      console.log("Os campos devem ser preenchidos");
      return;
    }

    const objeto = {
      "dia": data,
      "horario": hora
    };
    try {
      await adicionarEnfermeiroPlantao(idEnfermeiro, objeto);
      fetchPlantoes(idEnfermeiro);
      $('#dataInputPlantao').val("");
      $('#horarioInputPlantao').val("");
      
    } catch (error) {
      if(error.response && error.response.status === 400){
        const errorMessage = error.response.data;
        console.log(errorMessage);
      }
    }
  }

  async function removerPlantao(idEnfermeiroRecebido, idPlantaoRecebido) {
    try {
      await desmarcarPlantao(idEnfermeiroRecebido, idPlantaoRecebido);
      fetchPlantoes(idEnfermeiroRecebido);
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <div>
      <Modal show={show} onHide={close} className='ModalPlantoesEnfermeiroComponent'>
        <Modal.Header closeButton>
          <Modal.Title><h5>Plantões Agendados de {nome}</h5></Modal.Title>
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
                    <td>{relacionamento.plantao.idPlantao}</td>
                    <td>{relacionamento.plantao.dia}</td>
                    <td>{relacionamento.plantao.horario}</td>
                    <td>
                      <button className='btn btn-danger' onClick={() => removerPlantao(idEnfermeiro, relacionamento.plantao.idPlantao)}>Desmarcar</button>
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
            <button className='btn btn-success' onClick={() => adicionarPlantao()}>Agendar</button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalPlantoesEnfermeiro;