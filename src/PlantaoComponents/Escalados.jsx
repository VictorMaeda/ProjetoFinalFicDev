import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ModalPlantao from './ModalPlantao';
import './Escalados.css';
import { getPlantaoEscalados, deleteEnfermeiroEscalado } from '../services/PlantaoService';
import { TrashSimple } from '@phosphor-icons/react';

const Escalados = ({ plantao }) => {
  const [show, setShow] = useState(false);
  const [listaEscalados, setListaEscalados] = useState([]);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const atualizarLista = async () => {
    try {
      if (plantao) {
        const response = await getPlantaoEscalados(plantao.idPlantao);
        setListaEscalados(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const deletarEnfermeiro = async (idEnfermeiro) => {
    try {
      await deleteEnfermeiroEscalado(plantao.idPlantao, idEnfermeiro);
      // Atualize a lista após a exclusão do enfermeiro
      atualizarLista();
    } catch (error) {
      console.log(error);
    }
  };

  // Use useEffect para atualizar a lista de escalados quando idPlantao mudar ou quando o componente for montado
  useEffect(() => {
    atualizarLista();
  }, [plantao]);

  return (
    <div className='rectangle pt-3 pb-3 pe-2 ps-2'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
            <h4 className='mb-3'>Escalados {plantao !== null ? `${plantao.dia} - ${plantao.horario}` : ''}</h4>

            <div className='table-responsive box-table'>
              <table className='tabelaEscalados'>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Coren</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {listaEscalados.map((enfermeiro) => (
                    <tr key={enfermeiro.enfermeiro.idEnfermeiro}>
                      <td>{enfermeiro.enfermeiro.nome}</td>
                      <td>{enfermeiro.enfermeiro.coren}</td>
                      <td>
                        <button
                          onClick={() => deletarEnfermeiro(enfermeiro.enfermeiro.idEnfermeiro)}
                          className='excluirEscalado'
                          style={{ justifyContent: 'center' }}
                        >
                          <TrashSimple size={22} color='red' />
                        </button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {plantao !== null ? (
            <div className='text-end mt-5'>
              <Button variant="primary" onClick={handleShow}>
                Adicionar
              </Button>
            </div>): ''}


          </div>
        </div>
      </div>

      <ModalPlantao show={show} handleShow={handleShow} handleClose={handleClose}
        plantao={plantao} atualizarLista={atualizarLista} />
    </div>
  );
};

export default Escalados;
