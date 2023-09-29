import React, { useEffect, useState } from 'react';
import ColorSchemesExample from '../Components/ColorSchemesExample';
import './Plantoes.css';
import { adicionaEnfermeiroEscalado, deleteEnfermeiroEscalado, getPlantaoEscalados, getPlantoes } from '../services/PlantaoService';
import Escalados from '../PlantaoComponents/Escalados';
import TabelaPlantoes from '../PlantaoComponents/TabelaPlantoes';
import ModalPlantao from '../PlantaoComponents/ModalPlantao';
import { sessionValidate } from '../services/UserService';
import ModalCadastroPlantao from '../PlantaoComponents/ModalCadastroPlantao';

const Plantoes = () => {
  //sessionValidate();
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

  return (
    <div>
      <ColorSchemesExample />


      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 mb-3'>
            {/* Passe a função buscarEscalados como uma propriedade */}
            <div className='TituloPlantao'>
              <h3>Plantões</h3>
               <button onClick={() => setshowModalPlantoes(true)} className='btn btn-primary'>
               Adicionar Plantão</button>
            </div>
            <TabelaPlantoes buscarEscalados={buscarEscalados} setDataHoraPlantao={setDataHoraPlantao} findPlantoes={findPlantoes} listaPlantoes={listaPlantoes}/>
          </div>
          <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 mb-3'>
            <Escalados lista={listaEscalados} deletarEscalado={deletarEscalado}
              plantao={plantao} modal={ModalPlantao} />
          </div>
        </div>
      </div>
      <ModalCadastroPlantao show={showModalPlantoes} close={() => setshowModalPlantoes(false)} findPlantoes={findPlantoes}/>
    </div>
  );
}

export default Plantoes;