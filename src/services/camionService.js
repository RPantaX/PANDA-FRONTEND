import AllApis from "../apis/AllApis";

const BASE_URL='';
export const findAll = async(page) => {
    try{
        const response= await AllApis.get(`${BASE_URL}camiones?pageNo=${page}&pageSize=10`);
        return response;
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const save= async(camion)=>{
    
    try{
        console.log(camion)
        const ChangeCamion = {
            marca: camion.marca,
            modelo: camion.modelo,
            anoFabricacion: camion.anoFabricacion,
            placa: camion.placa,
            carreta:{
                id:camion.carreta.id,
                }
            };
            //console.log(camion);
            console.log(ChangeCamion);
        return await AllApis.post(`${BASE_URL}camion`, ChangeCamion);
    }catch(error){
        console.error(error);
        throw error;
        
    }
}

export const update=async(camion)=>{
    try{
        const ChangeCamion = {
            marca: camion.marca,
            modelo: camion.modelo,
            anoFabricacion: camion.anoFabricacion,
            placa: camion.placa,
            carreta:{
                id:camion.carreta.id
                }
            };  
        return await AllApis.put(`${BASE_URL}camion/${camion.id}`, ChangeCamion);
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const remove = async(id)=>{
    try{
        await AllApis.delete(`${BASE_URL}camion/${id}`);
    }catch(error){
        console.error(error);
        throw error;
    }
}