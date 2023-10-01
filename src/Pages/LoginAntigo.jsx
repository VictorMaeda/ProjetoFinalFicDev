import { useState } from "react";
import * as Components from "./LoginEstilo";
import "./login.css";
import Alert from 'react-bootstrap/Alert';
import { loginService, registerService,  } from "../services/UserService";
import { useNavigate } from "react-router";

function Login() {
  const [signIn, toggle] = useState(true);
  const [errors, setErrors] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  function isValidInput(value, pattern) {
    return new RegExp(pattern).test(value);
  }

  function showValidationErrorAlert(message) {
    setAlertMessage(message);
    setShowAlert(true);
  }
  async function login(event) {
    // Captura de valores
    event.preventDefault();
    const emailInput = document.querySelector("#EmailLogin").value;
    const senhaInput = document.querySelector("#SenhaLogin").value;
    try {
      await loginService(emailInput, senhaInput);
      console.log("Usuário logado com sucesso");
      zerarLogin();
      navigate("/Plantoes");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        showValidationErrorAlert("Email e/ou senha inválido");
        return;
      }
    }
  }
  
  async function cadastrarTeste(event) {
    setShowAlert(false);
    event.preventDefault();
    const nomeInput = document.querySelector("#NomeCadastro").value;
    const emailInput = document.querySelector("#EmailCadastro").value;
    const senhaInput = document.querySelector("#SenhaCadastro").value;
    const senhaConfirmaInput = document.querySelector("#SenhaConfirmarCadastro").value;
    const newErrors = [];
    //Validação, para cada input é feito uma validação:
    if (!isValidInput(nomeInput, "^[a-zA-Z0-9_.-]+$")) {
      newErrors.push('Digite um nome de usuário válido.');
    }
    if (!isValidInput(emailInput, /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      newErrors.push('Digite um endereço de e-mail válido.');
    }
    if (!isValidInput(senhaInput, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
      newErrors.push('A senha deve conter pelo menos 8 caracteres, incluindo letras e números.');
    }
    if (senhaInput !== senhaConfirmaInput) {
      newErrors.push('As senhas não coincidem.');
    }
    //Aqui, se houver algum erro, ou seja, se o array de newErros for maior que 0, ele irá renderizar o alert
    if (newErrors.length > 0) {
      setErrors(newErrors);
      showValidationErrorAlert('');
      return;
    }
    setErrors([]);

    const usuario = {
      "login": nomeInput,
      "email": emailInput,
      "senha": senhaInput
    }
    cadastrar(usuario);
  }
  async function cadastrar(usuario) {
    try {
      await registerService(usuario);
      console.log("Usuario cadastrado com sucesso")
      zerarCadastro();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data; // Obtém a mensagem de erro do back-end
        showValidationErrorAlert(errorMessage); // Exibe a mensagem de erro
      } else {
        console.log(error.response.data);
      }
    }
  }

  function irCadastrar() {
    setShowAlert(false);
    setErrors([]);
    zerarCadastro();
    toggle(false);
  }
  function irLogin() {
    setShowAlert(false);
    setErrors([]);
    zerarLogin();
    toggle(true);
  }
  function zerarLogin() {
    document.querySelector("#EmailLogin").value = null;
    document.querySelector("#SenhaLogin").value = null;
  }
  function zerarCadastro() {
    document.querySelector("#NomeCadastro").value = null;
    document.querySelector("#EmailCadastro").value = null;
    document.querySelector("#SenhaCadastro").value = null;
    document.querySelector("#SenhaConfirmarCadastro").value = null;
  }
  return (
    <>
      <div>
        <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible className="w-100 custom-alert" >
          {alertMessage && <p>{alertMessage}</p>}
          {errors.map((error, index) => (
            <p key={index}><h6 className="errosLogin">{error}</h6></p>
          ))}
        </Alert>
        <Components.Container className="LoginBody">
          <Components.SignUpContainer signingIn={signIn}>
            <Components.Form>
              <Components.Title>Crie sua conta</Components.Title>
              <Components.Input type="text" placeholder="Nome" id="NomeCadastro" required />
              <Components.Input type="email" placeholder="Email" id="EmailCadastro" required />
              <Components.Input type="password" placeholder="Senha" id="SenhaCadastro" required />
              <Components.Input type="password" placeholder="Confirmar Senha" id="SenhaConfirmarCadastro" required />
              <Components.Button onClick={cadastrarTeste}>Cadastrar</Components.Button>
            </Components.Form>
          </Components.SignUpContainer>
          <Components.SignInContainer signingIn={signIn}>
            <Components.Form>
              <Components.Title>Entrar</Components.Title>
              <Components.Input type="email" placeholder="EmailLogin" id="EmailLogin" required/>
              <Components.Input type="password" placeholder="SenhaLogin" id="SenhaLogin" required/>
              <Components.Button onClick={login}>Entrar</Components.Button>
            </Components.Form>
          </Components.SignInContainer>
          <Components.OverlayContainer signingIn={signIn}>
            <Components.Overlay signingIn={signIn}>
              <Components.LeftOverlayPanel signingIn={signIn}>
                <Components.Title className="text-dark">Já tem conta?</Components.Title>
                <Components.Paragraph className="text-dark">
                  Entre com sua Conta, Faça Login
                </Components.Paragraph>
                <Components.GhostButton onClick={() => irLogin()}>
                  Entrar</Components.GhostButton>
              </Components.LeftOverlayPanel>
              <Components.RightOverlayPanel signingIn={signIn}>
                <Components.Title className="text-dark">Bem vindo!!!</Components.Title>
                <Components.Paragraph className="text-dark">
                  Comece sua jornada conosco
                </Components.Paragraph>
                <Components.GhostButton
                    onClick={() => irCadastrar()}
                    className="text-dark btn-lg"
                  >
                  Cadastrar
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
      </div>
    </>
  );
}

export default Login