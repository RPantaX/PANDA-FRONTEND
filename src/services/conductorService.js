import AllApis from "../apis/AllApis";

const BASE_URL='';
export const findAll = async(page) => {
    try{
        const response= await AllApis.get(`${BASE_URL}conductores?pageNo=${page}&pageSize=10`);
        return response;
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const save= async(conductor)=>{
    
    try{
        const initialConductorForm = {
            ...conductor,
            trabajador: { id: conductor.trabajador },
            tipoLicencia: { id: conductor.tipoLicencia },
            camion: { id: conductor.camion }
        };
        return await AllApis.post(`${BASE_URL}conductor`, initialConductorForm);
    }catch(error){
        console.error(error);
        throw error;
    }
}

export const update=async(conductor)=>{
    try{
        const initialConductorForm = {
            ...conductor,
            trabajador: { id: conductor.trabajador.id },
            tipoLicencia: { id: conductor.tipoLicencia },
            camion: { id: conductor.camion.id }
        };
        return await AllApis.put(`${BASE_URL}conductor/${conductor.id}`, initialConductorForm);
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const remove = async(id)=>{
    try{
        await AllApis.delete(`${BASE_URL}conductor/${id}`);
    }catch(error){
        console.error(error);
        throw error;
    }
}