import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.css";
import { Outlet, useNavigate } from 'react-router-dom'; // Importe useNavigate do react-router-dom
import './NavBar.css';
import { SignOut } from '@phosphor-icons/react';

const customNavbarStyle = {
  backgroundColor: '#68FFA6'
};

const customLinkStyle = {
  color: 'black',
  fontSize: '22px',
  marginLeft: '40px'
};

function sair(navigate) {
  sessionStorage.setItem("token", null);
  navigate("/");
}

function ColorSchemesExample() {
  const navigate = useNavigate(); // Obtenha o objeto navigate

  return (
    <div className='navBarGeral'>
      <Navbar expand="lg" style={customNavbarStyle} variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              src="/SpringMed.png" // Use barra invertida (/) em vez de barra invertida (\) para especificar o caminho da imagem.
              className="logo"
              alt="Logo"
              style={{ maxWidth: '200px', height: 'auto' }} // Use "style" para definir os estilos de largura e altura.
            />

          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className='text-dark fs-5' href="/Plantoes">Plantões</Nav.Link>
              <Nav.Link className='text-dark fs-5' href="/Enfermeiros">Enfermeiros</Nav.Link>
              <Nav.Link className='text-dark fs-5' href="/DashBoard">DashBoard</Nav.Link>
            </Nav>
            <Nav.Link className='text-dark fs-7' href="/sobre">sobre</Nav.Link>
            <button onClick={() => sair(navigate)} className='botaoSair'>
              <SignOut size={28} />
            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </div>
  );
}

export default ColorSchemesExample;
