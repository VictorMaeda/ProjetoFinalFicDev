import { api } from "./api";



export async function findMesData(dia){
   return await api.get(`/plantao/DashBoard/BarsData/mes/${dia}`);
}
export async function findSemanaData(dia){
    return await api.get(`/plantao/DashBoard/BarsData/semana/2023-09-05`);
}
export async function findPizzaData(){
    return await api.get(`/enfermeiro/DashBoard/PizzaData`);
}