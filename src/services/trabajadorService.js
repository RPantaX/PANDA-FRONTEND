import axios from "axios"
const BASE_URL='http://localhost:8080/api/v1/';
export const findAll = async() => {
    try{
        const response= await axios.get(`${BASE_URL}trabajadores`);
        return response;
    }catch(error){
        console.error(error);
    }
    return null;
}
export const save= async(trabajador)=>{
    
    try{
        const initialTrabajadorForm = {
            id: trabajador.id,
            nombres: trabajador.nombres,
            apellidos: trabajador.apellidos,
            numIdentidad: trabajador.numIdentidad,
            fechaNacimiento: trabajador.fechaNacimiento,
            genero: {
                id: trabajador.genero,
            },
            estadoCivil: {
                id: trabajador.estadoCivil,
            },
            nacionalidad: {
                id: trabajador.nacionalidad,
            },
            direccionResidencia: trabajador.direccionResidencia,
            telefono: trabajador.telefono,
            email: trabajador.email,
            cargo: {
                id: trabajador.cargo,
            },
            fechaIngreso: trabajador.fechaIngreso,
            numCuentaBancaria: trabajador.numCuentaBancaria,
            estado: trabajador.estado,
            idUser:trabajador.idUser
    }
        return await axios.post(`${BASE_URL}trabajador`, initialTrabajadorForm);
    }catch(error){
        console.error(error);
    }
    return undefined;
}

export const update=async(trabajador)=>{
    try{
        return await axios.put(`${BASE_URL}trabajador/${trabajador.id}`, trabajador);
    }catch(error){
        console.error(error);
    }
    return undefined;
}
export const remove = async(id)=>{
    try{
        await axios.delete(`${BASE_URL}trabajador/${id}`);
    }catch(error){
        console.error(error);
    }
}