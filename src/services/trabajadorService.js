import AllApis from "../apis/AllApis";

const BASE_URL='';

export const findAll = async(page) => {
    try{
        const response= await AllApis.get(`${BASE_URL}trabajadores?pageNo=${page}&pageSize=10`);
        return response;
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const save= async(trabajador)=>{
    
    try{
        const initialTrabajadorForm = {
            ...trabajador,
            genero: { id: trabajador.genero },
            estadoCivil: { id: trabajador.estadoCivil },
            nacionalidad: { id: trabajador.nacionalidad },
            cargo: { id: trabajador.cargo },
            idUser: trabajador.idUser === 0 ? null : trabajador.idUser
        };
        return await AllApis.post(`${BASE_URL}trabajador`, initialTrabajadorForm);
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const generatePdf = async()=>{
    try {
        const response = await AllApis.get(`${BASE_URL}trabajadores/generar-reporte`, {
            responseType: 'blob' // Esto indica que esperamos datos binarios en la respuesta
        });
        return response.data; // Devolvemos directamente los datos binarios
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const update=async(trabajador)=>{
    try{
        const initialTrabajadorForm = {
            ...trabajador,
            genero: { id: trabajador.genero },
            estadoCivil: { id: trabajador.estadoCivil },
            nacionalidad: { id: trabajador.nacionalidad },
            cargo: { id: trabajador.cargo },
            idUser: trabajador.idUser === 0 ? null : trabajador.idUser
        };
        return await AllApis.put(`${BASE_URL}trabajador/${trabajador.id}`, initialTrabajadorForm);
    }catch(error){
        console.error(error);
        throw error;
    }
}

export const remove = async(id)=>{
    try{
        await AllApis.delete(`${BASE_URL}trabajador/${id}`);
    }catch(error){
        console.error(error);
        throw error;
    }
}