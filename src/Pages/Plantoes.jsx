import React, { useEffect, useState } from 'react';
import ColorSchemesExample from '../Components/ColorSchemesExample';
import './Plantoes.css';
import { adicionaEnfermeiroEscalado, cadastrarPlantao, deleteEnfermeiroEscalado, getPlantaoEscalados, getPlantoes } from '../services/PlantaoService';
import Escalados from '../PlantaoComponents/Escalados';
import TabelaPlantoes from '../PlantaoComponents/TabelaPlantoes';
import ModalPlantao from '../PlantaoComponents/ModalPlantao';
import { sessionValidate } from '../services/UserService';
import ModalCadastroPlantao from '../PlantaoComponents/ModalCadastroPlantao';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Plantoes = () => {
  const [listaEscalados, setEscalados] = useState([]);
  const [idPlantao, setIdPlantao] = useState(null);
  const [dataHoraPlantao, setDataHoraPlantao] = useState("");
  const [plantao, setPlantao] = useState(null);
  const [showModalPlantoes, setshowModalPlantoes] = useState(false);
  const [listaPlantoes, setPlantoes] = useState([]);

  async function buscarEscalados(plantao) {
    try {
      setPlantao(plantao);
      sessionStorage.setItem('plantaoExibido', plantao.idPlantao);
      setIdPlantao(plantao.idPlantao);
      setDataHoraPlantao(`${plantao.dia} ${plantao.horario}`);
      const response = await getPlantaoEscalados(plantao.idPlantao);
      setEscalados(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function findPlantoes() {
    try {
      const result = await getPlantoes();
      setPlantoes(result.data);
    } catch (error) {
      console.log("token inválido");

    }
  }

  async function deletarEscalado(idEnfermeiro) {
    try {
      const response = await deleteEnfermeiroEscalado(idPlantao, idEnfermeiro); // Usa idPlantao do estado
      setEscalados(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function salvarServicePlantao(objeto) {
    try {
      await cadastrarPlantao(objeto);
      await findPlantoes();
      toast.success('Plantao cadastrado com sucesso!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast.warn('Plantao já existia!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <div>
      <ColorSchemesExample />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 mb-3'>
            {/* Passe a função buscarEscalados como uma propriedade */}
            <div className='TituloPlantao'>
              <h3>Plantões</h3>
              <button onClick={() => setshowModalPlantoes(true)} className='btn btn-primary'>
                Adicionar Plantão</button>
            </div>
            <TabelaPlantoes buscarEscalados={buscarEscalados} setDataHoraPlantao={setDataHoraPlantao} findPlantoes={findPlantoes} listaPlantoes={listaPlantoes} />
          </div>
          <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 mb-3'>
            <Escalados lista={listaEscalados} deletarEscalado={deletarEscalado}
              plantao={plantao} modal={ModalPlantao} />
          </div>
        </div>
      </div>

      <ModalCadastroPlantao show={showModalPlantoes} close={() => setshowModalPlantoes(false)}
        findPlantoes={findPlantoes} salvarServicePlantao={salvarServicePlantao} />
    </div>
  );
}

export default Plantoes;