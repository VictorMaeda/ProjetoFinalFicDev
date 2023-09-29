import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Plantoes from './Pages/Plantoes';
import Login from './Pages/Login';
import Enfermeiros from './Pages/Enfermeiros';
import DashBoard from './Pages/DashBoard';
import Sobre from './Pages/Sobre';

function App() {

const [token, setToken] = useState(sessionStorage.getItem("token"))


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Plantoes' element={<Plantoes />}/>
         // <Route path='/Plantoes' element={token ? <Plantoes /> : <Navigate to={'/'} />} />
          <Route path='/Enfermeiros' element={<Enfermeiros />} />Sobre
          <Route path='/DashBoard' element={<DashBoard />} />
          <Route path='/sobre' element={<Sobre />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;