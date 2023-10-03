import React, { useEffect } from 'react';
import ColorSchemesExample from '../Components/ColorSchemesExample';
import './DashBoard.css'
import Grafico from '../DashBoardComponents/Grafico';
import GraficoPizza from '../DashBoardComponents/GraficoPizza';
import { sessionValidate } from '../services/UserService';
import { useNavigate } from 'react-router';


const DashBoard = () => {
  

  return (
    <>
      <ColorSchemesExample />
      <div className='DashBoardBody'>
        <div className='DivFlex'>
            <GraficoPizza />
        </div>
            <Grafico />
      </div>
    </>
  );
}

export default DashBoard;
