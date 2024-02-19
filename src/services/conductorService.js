import AllApis from "../apis/AllApis";

const BASE_URL='';
export const findAll = async(page) => {
    try{
        const response= await AllApis.get(`${BASE_URL}conductores?pageNo=0&pageSize=10`);
        return response;
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const save= async(conductor)=>{
    
    try{
        const initialConductorForm = {
            id: conductor.id,
            trabajador: {
                id:conductor.trabajador.id
            },
            tipoLicencia:{
                id:conductor.tipoLicencia.id
            },
            camion: {
                id:conductor.camion.id
            },
            certConducirCamion: conductor.certConducirCamion,
            certPsicofisico: conductor.certPsicofisico,
            certMecanicaBasica: conductor.certMecanicaBasica,
            certPrimerosAuxilios: conductor.certPrimerosAuxilios,
            certSeguridadVial: conductor.certSeguridadVial,
    };
    console.log(initialConductorForm);
        return await AllApis.post(`${BASE_URL}conductor`, initialConductorForm);
    }catch(error){
        console.error(error);
        throw error;
    }
}

export const update=async(conductor)=>{
    try{
        const initialConductorForm = {
            id: conductor.id,
            trabajador: {
                id:conductor.trabajador.id
            },
            tipoLicencia:{
                id:conductor.tipoLicencia.id
            },
            camion: {
                id:conductor.camion.id
            },
            certConducirCamion: conductor.certConducirCamion,
            certPsicofisico: conductor.certPsicofisico,
            certMecanicaBasica: conductor.certMecanicaBasica,
            certPrimerosAuxilios: conductor.certPrimerosAuxilios,
            certSeguridadVial: conductor.certSeguridadVial,
    };
    console.log(initialConductorForm);
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