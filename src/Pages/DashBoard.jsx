import React, { useEffect } from 'react';
import ColorSchemesExample from '../Components/ColorSchemesExample';
import './DashBoard.css'
import { sessionValidate } from '../services/UserService';
import Grafico from '../DashBoardComponents/Grafico';
import { Pizza } from '@phosphor-icons/react/dist/ssr';
import GraficoPizza from '../DashBoardComponents/GraficoPizza';


const DashBoard = () => {
  //sessionValidate();



  return (
    <>
      <ColorSchemesExample />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 mb-3 align-items-center'>
            <Grafico />
          </div>
          <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 mb-3 align-items-center'>
            <GraficoPizza />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
