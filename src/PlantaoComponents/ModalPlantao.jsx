import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalPlantao.css';
import { getPlantaoNaoEscalados, adicionaEnfermeiroEscalado } from '../services/PlantaoService';

const ModalPlantao = ({ plantao, show, handleShow, handleClose, atualizarLista }) => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    if (show) {
      // O modal foi aberto, então executamos a função buscarNaoEscalados
      buscarNaoEscalados();
    }
  }, [show]);

  async function buscarNaoEscalados() {
    try {
      const response = await getPlantaoNaoEscalados(plantao.idPlantao);
      setLista(response.data);
    } catch (error) {
      console.log(error);
      
    }
  }

  async function adicionarEscalado(idEnfermeiro) {
    try {
      const response = await adicionaEnfermeiroEscalado(plantao.idPlantao, idEnfermeiro);
      setLista(response.data);
      atualizarLista(); // Chame a função para atualizar a lista de escalados
    } catch (error) {
      console.log(idEnfermeiro);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false} dialogClassName="PlantaoModal">
        <Modal.Header closeButton>
          <div className='headModal'>
            <Modal.Title>Clique para adicionar</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body className='modalBodyPlantao'>
          <table className='tabelaNaoEscalados'>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Coren</th>
                <th>Nível</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lista.map((enfermeiro) => (
                <tr key={enfermeiro.idEnfermeiro}>
                  <td>{enfermeiro.nome}</td>
                  <td>{enfermeiro.coren}</td>
                  <td>{enfermeiro.enfermeiroTecnico}</td>
                  <td>
                    <button onClick={() => adicionarEscalado(enfermeiro.idEnfermeiro)} className='btn btn-success'>+</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalPlantao;
