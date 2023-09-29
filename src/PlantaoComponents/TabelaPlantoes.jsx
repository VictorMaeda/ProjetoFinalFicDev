import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './TabelaPlantoes.css';
import { getPlantoes } from '../services/PlantaoService';
import { Button } from 'react-bootstrap';

const TabelaPlantoes = ({ buscarEscalados, findPlantoes, listaPlantoes }) => {
  const [plantaoSelecionado, setPlantaoSelecionado] = useState(null);

  useEffect(() => {
    findPlantoes();
  }, []);

  async function selecionarPlantao(plantao) {
    setPlantaoSelecionado(plantao);
    sessionStorage.setItem("plantaoExibido", plantao.idPlantao.toString());
    buscarEscalados(plantao);
  }

  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Horário</th>
            <th>Dia</th>
            <th>Escalados</th>
          </tr>
        </thead>
        <tbody>
          
          {listaPlantoes.map((plantao) => (
            
            <tr
              key={plantao.idPlantao}
              className={`plantaoModel ${sessionStorage.getItem("plantaoExibido") === plantao.idPlantao.toString() ? 'plantaoSelecionado' : ''}`}
            >
              <td>{plantao.horario}</td>
              <td>{plantao.dia}</td>
              <td>
                <Button onClick={() => selecionarPlantao(plantao)} variant="info">Listar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default TabelaPlantoes;
