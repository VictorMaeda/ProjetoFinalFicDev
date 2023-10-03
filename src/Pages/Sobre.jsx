import React from 'react';
import ColorSchemesExample from '../Components/ColorSchemesExample';
import './Sobre.css';

const Sobre = () => {
  return (
    <div className='SobreBody'>
      <ColorSchemesExample />
      <h3>Victor Maeda Chinen</h3>
      <h4>Gestão de Enfermeiro/Técnicos</h4>
      <h4>Curso Fic_dev programador de sistemas</h4>
        <a href="https://github.com/VictorMaeda" className="GitHub"  >
          <img src="/GitHub.png" className='imagemGit'/>
        </a>
      <div className='logosDiv'>
        <img src="/Logos.png" className='Logos' alt="Logos" />
      </div>
    </div>
  );
}

export default Sobre;
