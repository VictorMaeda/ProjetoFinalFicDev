import React from 'react';
import ColorSchemesExample from '../Components/ColorSchemesExample';
import './Sobre.css';

const Sobre = () => {
  return (
    <div className='SobreBody'>
      <ColorSchemesExample />
      <h3>Gestão de Enfermeiro/Técnicos</h3>
      <h4>Victor Maeda Chinen</h4>
      <h4>Fic Dev</h4>
      <h4>Contatos</h4>
      <div className='contatos'>
        <a href="https://github.com/VictorMaeda" className="GitHub"  >
          <img src="/GitHub.png" alt="GitHub"/>
        </a>
        
      </div>
      <div className='logosDiv'>
        <img src="/Logos.png" className='Logos' alt="Logos" />
      </div>
    </div>
  );
}

export default Sobre;
