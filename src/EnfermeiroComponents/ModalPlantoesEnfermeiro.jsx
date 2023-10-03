import React, { useEffect, useState } from 'react';
import { Alert, Modal } from 'react-bootstrap';
import './ModalPlantoesEnfermeiro.css'
import $ from 'jquery';
import { adicionarEnfermeiroPlantao } from '../services/EnfermeiroService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const ModalPlantoesEnfermeiro = ({ show, close, idEnfermeiro, enfermeiroPlantoes, desmarcarPlantao, fetchPlantoes, nome }) => {

  const [lista, setLista] = useState(enfermeiroPlantoes);
  const [alertMessage, setAlertMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const dataAtual = new Date();

  useEffect(() => {
    setLista(enfermeiroPlantoes);
  }, [enfermeiroPlantoes])

  function fecharModal() {
    setShowAlert(false);
    close();
  }
  function showValidationErrorAlert(message) {
    setAlertMessage(message);
    setShowAlert(true);
  }
  async function adicionarPlantao() {
    const data = $('#dataInputPlantao').val();
    const hora = $('#horarioInputPlantao').val();

    if (data === "" || hora === "") {
      showValidationErrorAlert("Os campos devem ser preenchidos");
      return;
    }
    const dataInserida = new Date(data);

    

    const objeto = {
      "dia": data,
      "horario": hora
    };

    try {
      await adicionarEnfermeiroPlantao(idEnfermeiro, objeto);
      fetchPlantoes(idEnfermeiro);
      $('#dataInputPlantao').val("");
      $('#horarioInputPlantao').val("");
      toast.success('Plantão Agendado', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data;
        showValidationErrorAlert(errorMessage);
        return;
      }
    }
  }

  async function removerPlantao(idEnfermeiroRecebido, idPlantaoRecebido) {
    const result = await Swal.fire({
      title: 'Você tem certeza que quer desmarcar?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, desmarque!',
      cancelButtonText: 'Não, mantenha!'
    });
    if (result.isConfirmed) {
      try {
        await desmarcarPlantao(idEnfermeiroRecebido, idPlantaoRecebido);
        fetchPlantoes(idEnfermeiroRecebido);

      } catch (error) {
        console.log(error);
      }
    }
  }


  return (

    <div>
      <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible className="w-100 custom-alert">
        <Alert.Heading>Erro de Validação</Alert.Heading>
        {alertMessage && <p>{alertMessage}</p>}
      </Alert>
      <Modal show={show} onHide={fecharModal} className='ModalPlantoesEnfermeiroComponent'>
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