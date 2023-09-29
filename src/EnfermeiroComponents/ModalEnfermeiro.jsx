import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalEnfermeiro.css';
import { atualizarEnfermeiro, cadastrarEnfermeiro } from '../services/EnfermeiroService';

const ModalEnfermeiro = ({
  show,
  handleClose,
  verbo,
  nomeEnfermeiro,
  corenEnfermeiro,
  nivelEnfermeiro,
  idEnfermeiro,
  fetchEnfermeiros
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  function isValidInput(value, pattern) {
    return new RegExp(pattern).test(value);
  }

  function showValidationErrorAlert(message) {
    setAlertMessage(message);
    setShowAlert(true);
  }

  async function salvar() {
    const nomeInput = document.querySelector("#nomeInput");
    const corenInput = document.querySelector("#corenInput");
    const nivelInput = document.querySelector("#nivelInput");

    const nomeValue = nomeInput.value;
    const corenValue = corenInput.value;
    const nivelValue = nivelInput.value;

    const newErrors = [];

    if (!isValidInput(nomeValue, "[A-Za-zÀ-ÖØ-öø-ÿ\\s'-]+")) {
      newErrors.push('Digite um nome válido.');
      nomeInput.focus();
    }

    // Expressão regular para validar o COREN (XX99999/99)
    const corenPattern = /^[A-Z]{2}\d{5}\/\d{2}$/;
    if (!corenPattern.test(corenValue)) {
      newErrors.push('Digite um COREN válido (formato: XX00000/00).');
      corenInput.focus();
      showValidationErrorAlert('Digite um COREN válido (formato: XX00000/00).');
    }
    
    
    if (nivelValue === "") {
      newErrors.push('O campo Nível não pode ser vazio.');
      nivelInput.focus();
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      showValidationErrorAlert('');
      return;
    }

    setErrors([]);

    const objeto = {
      "nome": nomeValue,
      "coren": corenValue,
      "enfermeiroTecnico": nivelValue
    }

    if (idEnfermeiro) {
      try {
        console.log(`${corenValue}`)
        const response = await atualizarEnfermeiro(idEnfermeiro, objeto);
        fetchEnfermeiros();
        handleClose();
      } catch (error) {
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data; // Obtém a mensagem de erro do back-end
          showValidationErrorAlert(errorMessage);
        } else {
          console.log(error.response.data);
        }
      }
      
      
    } else {
      try {
        const response = await cadastrarEnfermeiro(objeto);
        handleClose();
        fetchEnfermeiros();
      } catch (error) {
        if (error.response && error.response.status === 400) {
          showValidationErrorAlert(error.response.data);
        } else {
          // Outro tratamento de erro
          console.log(error.response.data);
        }
      }
    }
  }


  return (
    <Modal show={show} onHide={() => { handleClose(); setShowAlert(false); }} animation={false} backdrop="static" dialogClassName="EnfermeiroCustomModal">
      <Modal.Header closeButton>
        <Modal.Title>{verbo} de Enfermeiro</Modal.Title>
      </Modal.Header>
      <Modal.Body className='custom-modal-body'>
        <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible className="w-100 custom-alert">
          <Alert.Heading>Erro de Validação</Alert.Heading>
          {alertMessage && <p>{alertMessage}</p>}
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </Alert>
        <label htmlFor="">Nome</label>
        <input
          id="nomeInput"
          type="text"
          placeholder="Nome"
          defaultValue={nomeEnfermeiro}
          required
        />
        <label htmlFor="">Coren</label>
        <input
          id="corenInput"
          type="text"
          placeholder="Coren (formato: XX00000/00)"
          defaultValue={corenEnfermeiro}
          required
        />
        <label htmlFor="">Nível</label>
        <select name="nivel" id="nivelInput">
          {idEnfermeiro ? (
            <option value={nivelEnfermeiro}>{nivelEnfermeiro}</option>
          ) : null}
          <option value="" disabled={!idEnfermeiro} selected={!idEnfermeiro}>
            Nível
          </option>
          <option value="Enfermeiro">Enfermeiro</option>
          <option value="Técnico">Técnico</option>
        </select>

      </Modal.Body>
      <Modal.Footer>
        <Button className="custom-button" onClick={salvar}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEnfermeiro;
