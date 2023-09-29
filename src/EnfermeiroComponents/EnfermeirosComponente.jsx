import React from 'react';

const EnfermeirosComponente = ({ Lista, removerEnfermeiro }) => {
  return (
    <div className='listagem'>
      <table className='EnfermeirosTable'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Enfermeiro Técnico</th>
            <th>COREN</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Lista && Lista.map((enfermeiro) => (
            <tr key={enfermeiro.idEnfermeiro}>
              <td>{enfermeiro.nome}</td>
              <td>{enfermeiro.enfermeiroTecnico}</td>
              <td>{enfermeiro.coren}</td>
              <td><button>Editar</button></td>
              <td><button onClick={() => removerEnfermeiro(enfermeiro.idEnfermeiro)}>x</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default EnfermeirosComponente;