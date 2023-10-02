import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './Enfermeiros.css';
import { getEnfermeiros, deletarEnfermeiro, pesquisarEnfermeiros, EnfermeiroPlantoes, removerEnfermeiroPlantao } from '../services/EnfermeiroService';
import Button from 'react-bootstrap/Button';
import ModalEnfermeiro from '../EnfermeiroComponents/ModalEnfermeiro';
import ColorSchemesExample from '../Components/ColorSchemesExample';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ModalPlantoesEnfermeiro from '../EnfermeiroComponents/ModalPlantoesEnfermeiro';
import { Pen, TrashSimple } from '@phosphor-icons/react';
import Swal from 'sweetalert2';

function Enfermeiros() {
  const [listaEnfermeiros, setListaEnfermeiros] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [nomeEnfermeiro, setNomeEnfermeiro] = useState(null);
  const [corenEnfermeiro, setCorenEnfermeiro] = useState(null);
  const [nivelEnfermeiro, setNivelEnfermeiro] = useState(null);
  const [idEnfermeiro, setIdEnfermeiro] = useState(null);
  const [verbo, setverbo] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [inputChanges, setInputChanges] = useState(0); // Contador de mudanças no input
  const [modalShow, setModalShow] = useState(false);
  const [enfermeiroListaPlantoes, setEnfermeiroListaPlantoes] = useState(null);

  useEffect(() => {
    fetchEnfermeiros();
  }, []);

  const handleShowPost = () => {
    setNomeEnfermeiro(null);
    setCorenEnfermeiro(null);
    setNivelEnfermeiro(null);
    setverbo("Cadastro");
    setShow(true);
  }

  const handleShowPut = (enfermeiro) => {
    setNomeEnfermeiro(enfermeiro.nome);
    setCorenEnfermeiro(enfermeiro.coren);
    setNivelEnfermeiro(enfermeiro.enfermeiroTecnico);
    setIdEnfermeiro(enfermeiro.idEnfermeiro);
    setverbo("Edição");
    setShow(true);
  }
  function fetchPlantoes(id) {
    EnfermeiroPlantoes(id)
      .then((response) => {
        const dados = response.data;
        setEnfermeiroListaPlantoes(dados);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  function modalPlantoes(id, nome){
    fetchPlantoes(id); 
    setIdEnfermeiro(id);
    setNomeEnfermeiro(nome);
    setModalShow(true);
  }

  async function fetchEnfermeiros() {
    try {
      const result = await getEnfermeiros();
      setListaEnfermeiros(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function removerEnfermeiro(id) {
    const result = await Swal.fire({
      title: 'Você tem certeza que quer excluir?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua!',
      cancelButtonText: 'Não, cancele!'
    });
    if (result.isConfirmed) {
      try {
        const result = await deletarEnfermeiro(id);
        setListaEnfermeiros(result.data);
      } catch (error) {
        console.log(error);
      }
    }
  }


  const limparPesquisa = () => {
    setPesquisa("");
    fetchEnfermeiros();
  }

  const handleChange = (e) => {
    setPesquisa(e.target.value);
    setInputChanges(inputChanges + 1);
  }

  useEffect(() => {
    async function fetchPesquisa() {
      if (inputChanges % 2 === 0 && inputChanges > 1) {
        console.log(pesquisa);
        try {
          if (pesquisa.length > 1) {
            const result = await pesquisarEnfermeiros(pesquisa);
            setListaEnfermeiros(result.data);
          } else {
            fetchEnfermeiros();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchPesquisa();
  }, [inputChanges, pesquisa]);

  async function desmarcarPlantao(idEnfermeiroRecebido, idPlantaoRecebido){
    try{
      await removerEnfermeiroPlantao(idEnfermeiroRecebido, idPlantaoRecebido);
    }catch(error){
      console.log(error);
    }
  }
  return (
    <>
      <ColorSchemesExample />
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-3'>
            <h2>Enfermeiros</h2>
          </div>
          <div className='col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-6 mb-3'>
            <div className='d-flex align-items-center'>
              <input
                type="text"
                className='barraPesquisa w-100 me-2'
                placeholder="Pesquisar..."
                value={pesquisa}
                onChange={handleChange}
              />
              {pesquisa && (
                <button
                  className="limparPesquisaBtn"
                  onClick={limparPesquisa}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </div>
          </div>
          <div className='col-sm-4 col-md-4 col-lg-6 col-xl-6 col-xxl-6 mb-3 text-end'>
            <Button variant="primary" onClick={handleShowPost}>
              Adicionar
            </Button>
          </div>
          <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-3'>
            <Table striped bordered hover responsive className='EnfermeirosTable w-100'>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Nível</th>
                  <th>COREN</th>
                  <th>Plantões</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listaEnfermeiros && listaEnfermeiros.map((enfermeiro) => (
                  <tr key={enfermeiro.idEnfermeiro}>
                    <td>{enfermeiro.nome}</td>
                    <td>{enfermeiro.enfermeiroTecnico}</td>
                    <td>{enfermeiro.coren}</td>
                    <td><button className='btn btn btn-primary' onClick={() => modalPlantoes(enfermeiro.idEnfermeiro, enfermeiro.nome)}>Listar</button> </td>
                    <td>
                      <button onClick={() => handleShowPut(enfermeiro)} className='border-0 bg-transparent'>
                        <Pen size={22} />
                      </button>
                      <button onClick={() => removerEnfermeiro(enfermeiro.idEnfermeiro)} className='border-0 bg-transparent'>
                        <TrashSimple size={22} color='red' /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <ModalEnfermeiro
        show={show}
        handleClose={handleClose}
        verbo={verbo}
        nomeEnfermeiro={nomeEnfermeiro}
        corenEnfermeiro={corenEnfermeiro}
        nivelEnfermeiro={nivelEnfermeiro}
        idEnfermeiro={idEnfermeiro}
        fetchEnfermeiros={fetchEnfermeiros}
      />
      <ModalPlantoesEnfermeiro
        show={modalShow}
        close={() => setModalShow(false)}
        idEnfermeiro={idEnfermeiro}
        enfermeiroPlantoes={enfermeiroListaPlantoes}
        desmarcarPlantao={desmarcarPlantao}
        fetchPlantoes={fetchPlantoes}
        nome={nomeEnfermeiro}          
      />
    </>
  );
}
export default Enfermeiros;