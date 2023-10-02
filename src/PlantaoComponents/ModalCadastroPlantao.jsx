import React, { useEffect, useState } from 'react'
import { Alert, Modal } from 'react-bootstrap';

const ModalCadastroPlantao = ({ show, close, salvarServicePlantao }) => {

    const [data, setData] = useState('');
    const [hora, setHora] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        setData("");
        setHora("");
    }, [])
    function handleInputChange(event) {
        let val = event.target.value
        setHora(val)
    }

    function handleInputData(event) {
        let val = event.target.value
        setData(val)
    }
        
    


    async function save() {
        if (data === "" || hora === "") {
            setShowAlert(true);
            return;
        }
        const objeto = {
            "dia": data,
            "horario": hora
        }
        console.log(objeto)
        try {
            await salvarServicePlantao(objeto);
        } catch (error) {
        }
        close();
    }

    return (
        <>
            <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible className="w-100 custom-alert" >
                <p>Os campos não podem estar vazios</p>
            </Alert>
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
                                    <input onChange={handleInputData} type='date' className='form-control' id='dataInputPlantao' />
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