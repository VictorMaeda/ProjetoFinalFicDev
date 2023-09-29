import { api } from "./api";

export async function getPlantoes(){
    const lista = api.get("/plantao/listar");
    return lista;
}
export async function cadastrarPlantao(objeto){
    return api.post("/plantao/cadastrar", objeto);
}
export async function findPlantao(id){
    const objeto = api.get(`/plantao/buscar/${id}`);
    return objeto;
}
export async function getPlantaoEscalados(id){
    const lista = api.get(`/plantao/buscar/escalados/${id}`);
    return lista;
}
export async function getPlantaoNaoEscalados(id){
    const lista = api.get(`/plantao/buscar/naoEscalados/${id}`);
    return lista;
}
export async function deleteEnfermeiroEscalado(idPlantao, idEnfermeiro){
    return api.delete(`/plantao/removerEnfermeiro/${idPlantao}/${idEnfermeiro}`);
}
export async function adicionaEnfermeiroEscalado(idPlantao, idEnfermeiro){
    return api.post(`/plantao/adicionarEnfermeiro/${idPlantao}/${idEnfermeiro}`);
}