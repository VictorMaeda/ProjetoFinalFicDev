import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';
import { findDiaData, findSemanaData } from '../services/DashBoardService';
import { get } from 'jquery';

const colunas = [
  "Profissionais",
  "Profissionais",
  "Técnicos",
  "Enfermeiros",
];
const options = {
  title: "Profissionais por dia",
  vAxis: { title: "Profissionais" },
  hAxis: { title: "Dias" },
  seriesType: "bars",
};

const Grafico = () => {
  const [dataSemana, setDataSemana] = useState([]);
  const [dataColunas, setDataColunas] = useState([colunas]);
  const [diaSelecionado, setDiaSelecionado] = useState(getFormattedDate());

  useEffect(() => {
    fetchData();
  }, [])

  function getDia(dia) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await findDiaData(dia);
        resolve(response.data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
  
  

  async function fetchData() {
    console.log("fetchData()")
    try {
      var response = await findSemanaData(diaSelecionado);
      response = response.data;
    } catch (error) {
      console.log(error);
      return;
    }
    carregarDataSemana(response);
  }

  function gerarArrayFromObjeto(objeto){
    return [`${objeto.data}`, objeto.profissionais, objeto.tecnicos, objeto.enfermeiros];
  }
  function carregarDataSemana(response) {
    const graficoData = [];
    graficoData.push(colunas);
    response.forEach(objeto => {
      graficoData.push(gerarArrayFromObjeto(objeto));
    });
    setDataSemana(graficoData);

  }
  function getFormattedDate() {
    const dataAtual = new Date();
    const diaAtual = String(dataAtual.getDate()).padStart(2, '0');
    const mesAtual = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const anoAtual = dataAtual.getFullYear();
    return `${anoAtual}-${mesAtual}-${diaAtual}`;
  }

  const handleIncrementDay = () => {
    const dataSelecionada = new Date(diaSelecionado);
    dataSelecionada.setDate(dataSelecionada.getDate() + 1);
    setDiaSelecionado(dataSelecionada.toISOString().split('T')[0]);
    
    let ultimoDia = new Date(dataSelecionada);
    ultimoDia.setDate(dataSelecionada.getDate() + 3);
    let ultimoDiaCompleto = ultimoDia.toISOString().split('T')[0];
  
    getDia(ultimoDiaCompleto)
      .then(responseDay => {
        // Manipule a resposta aqui
        dataSemana.splice(1, 1);
        dataSemana.push(gerarArrayFromObjeto(responseDay));
  
        // Atualize o estado com os novos dados
        setDataSemana([...dataSemana]); // Usamos o spread operator para criar uma nova referência
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  
  const handleDecrementDay = () => {
    const dataSelecionada = new Date(diaSelecionado);
    dataSelecionada.setDate(dataSelecionada.getDate() - 1);
    setDiaSelecionado(dataSelecionada.toISOString().split('T')[0]);
  
    let primeiroDia = new Date(dataSelecionada);
    primeiroDia.setDate(dataSelecionada.getDate() - 3);
    let primeiroDiaCompleto = primeiroDia.toISOString().split('T')[0];
  
    getDia(primeiroDiaCompleto)
      .then(responseDay => {
        // Manipule a resposta aqui
        dataSemana.splice(7, 1);
        dataSemana.splice(1, 0, gerarArrayFromObjeto(responseDay));
  
        // Atualize o estado com os novos dados
        setDataSemana([...dataSemana]); // Usamos o spread operator para criar uma nova referência
      })
      .catch(error => {
        console.error(error);
      });
  };
  


  return (
    <>
      <button onClick={handleDecrementDay}>-</button>
      <button onClick={handleIncrementDay}>+</button>
      <Chart
        chartType="ComboChart"
        width="100%"
        data={dataSemana}
        options={options}
      />
    </>
  );
}

export default Grafico;
