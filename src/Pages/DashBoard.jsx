import React, { useEffect } from 'react';
import ColorSchemesExample from '../Components/ColorSchemesExample';
import './DashBoard.css'
import { sessionValidate } from '../services/UserService';
import Grafico from '../DashBoardComponents/Grafico';
import GraficoPizza from '../DashBoardComponents/GraficoPizza';


const DashBoard = () => {



  return (
    <>
      <ColorSchemesExample />
      <div className='DashBoardBody'>
        <div className='DivFlex'>
            <GraficoPizza />
        </div>
      <button onClick={() => sessionValidate()}>SessionValidate()</button>
            <Grafico />
      </div>
    </>
  );
}

export default DashBoard;
