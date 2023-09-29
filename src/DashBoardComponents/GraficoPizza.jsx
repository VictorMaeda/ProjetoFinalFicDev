import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { findPizzaData } from '../services/DashBoardService';

const GraficoPizza = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchPizzaData() {
      try {
        var response = await findPizzaData();
        response = response.data;
        const dataArray = [['Profissionais', 'Quantidade']];
        dataArray.push(['Enfermeiros', response.enfermeiros]);
        dataArray.push(['Técnicos', response.tecnicos]);
        setData(dataArray);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPizzaData();
  }, []);

  const options = {
    title: 'Profissionais Cadastrados',
  };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={'100%'}
      height={'400px'}
    />
  );
};

export default GraficoPizza;
