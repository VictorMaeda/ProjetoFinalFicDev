import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';
import { findSemanaData } from '../services/DashBoardService';

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
  const [diaSelecionado, setDiaSelecionado] = useState(getFormattedDate());

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
  };

  const handleDecrementDay = () => {
    const dataSelecionada = new Date(diaSelecionado);
    dataSelecionada.setDate(dataSelecionada.getDate() - 1);
    setDiaSelecionado(dataSelecionada.toISOString().split('T')[0]);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        var response = await findSemanaData(diaSelecionado);
        response = response.data;
      } catch (error) {
        console.log(error);
        return;
      }

      const graficoData = [];
      graficoData.push(colunas);
      response.forEach(objeto => {
        graficoData.push([`${objeto.data}`, objeto.profissionais, objeto.tecnicos, objeto.enfermeiros]);
      });
      setDataSemana(graficoData);
    }
    fetchData();
  }, [diaSelecionado]);

  return (
    <>
      <button onClick={handleIncrementDay}>+</button>
      <button onClick={handleDecrementDay}>-</button>
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
