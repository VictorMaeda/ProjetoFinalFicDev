import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { cadastrarPlantao } from '../services/PlantaoService';

const ModalCadastroPlantao = ({ show, close, findPlantoes }) => {

    const [data, setData] = useState('');
    const [hora, setHora] = useState('');

    function handleInputChange(event){
        let val = event.target.value
        setHora(val)
    }

    function handleInputData(event){
        let val = event.target.value
        setData(val)
    }
    async function salvarService(objeto) {
        console.log("salvarService()")
        try {
          await cadastrarPlantao(objeto);
          await findPlantoes();
        } catch (error) {
          console.error(error); 
        }
      }
      
    async function save(){
        if(data === "" || hora === ""){
            console.log("Os campos devem ser preenchidos")
            return;
        }
        const objeto = {
            "dia"  :   data,
            "horario"   :   hora
        }
        console.log(objeto)
        try{
            await salvarService(objeto);
           close();
        }catch(error){
        }
    }

    return (
        <>
                <Modal show={show} onHide={close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-3'>
                                    <div className="mb-3 text-start">
                                        <label className="form-label">Data</label>
                                        <input onChange={handleInputData} type='date' className='form-control' id='dataInputPlantao'/>
                                    </div>
                                </div>
                                <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-3'>
                                    <div className="mb-3 text-start">
                                        <label className="form-label">Horário</label>
                                        <select onChange={handleInputChange} className='form-control' id='horarioInputPlantao'>
                                            <option value="" selected disabled>Selecione</option>
                                            <option value="08:00:00">8:00:00</option>
                                            <option value="16:00:00">16:00:00</option>
                                            <option value="00:00:00">00:00:00</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-3 text-end'>
                            <button onClick={save} className='btn btn-success'>Salvar</button>
                        </div>
                    </Modal.Footer>
                </Modal>



        </>
    )
}

export default ModalCadastroPlantao;