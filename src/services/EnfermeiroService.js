import { api } from "./api"

export async function getEnfermeiros(){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/enfermeiro/listar');
    return result;
}

export async function cadastrarEnfermeiro(objeto){
   return await api.post(`/enfermeiro/cadastrar`, objeto);
}
export async function atualizarEnfermeiro(id, objeto){
    return await api.put(`/enfermeiro/atualizar/${id}`, objeto);
}
export async function deletarEnfermeiro(id){
   const result =  await api.delete(`/enfermeiro/deletar/${id}`);
   return result;
}
export async function buscarEnfermeiro(id){
    const objeto = await api.get(`/enfermeiro/buscar/${id}`);
    return objeto;
}
export async function pesquisarEnfermeiros(nome){
    const lista = await api.get(`/enfermeiro/buscar/${nome}`);
    return lista;
}
export async function EnfermeiroPlantoes(id){
    const lista = await api.get(`/enfermeiro/buscar/plantoes/${id}`);
    return lista;
}
export async function removerEnfermeiroPlantao(id){
await api.delete(`removerPlantao/${idPlantao}/${idEnfermeiro}`);
}
export async function adicionaEnfermeiroPlantao(id){
    await api.post(`adicionarPlantao/${idPlantao}/${idEnfermeiro}`);
}