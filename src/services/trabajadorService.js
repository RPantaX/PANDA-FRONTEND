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
            id: trabajador.id,
            nombres: trabajador.nombres,
            apellidos: trabajador.apellidos,
            numIdentidad: trabajador.numIdentidad,
            fechaNacimiento: trabajador.fechaNacimiento,
            genero: {
                id: trabajador.genero /*!= 0? trabajador.genero.id : trabajador.genero*/
            },
            estadoCivil: {
                id: trabajador.estadoCivil /*!= 0? trabajador.estadoCivil.id : trabajador.estadoCivil*/
            },
            nacionalidad: {
                id: trabajador.nacionalidad /*!= 0? trabajador.nacionalidad.id : trabajador.nacionalidad*/
            },
            direccionResidencia: trabajador.direccionResidencia,
            telefono: trabajador.telefono,
            email: trabajador.email,
            cargo: {
                id: trabajador.cargo /*!= 0? trabajador.cargo.id : trabajador.cargo*/
            },
            fechaIngreso: trabajador.fechaIngreso,
            numCuentaBancaria: trabajador.numCuentaBancaria,
            estado: trabajador.estado,
            idUser:trabajador.idUser == 0 ? null : trabajador.idUser
    };
        return await AllApis.post(`${BASE_URL}trabajador`, initialTrabajadorForm);
    }catch(error){
        console.error(error);
        throw error;
    }
}

export const update=async(trabajador)=>{
    try{
        const initialTrabajadorForm = {
            id: trabajador.id,
            nombres: trabajador.nombres,
            apellidos: trabajador.apellidos,
            numIdentidad: trabajador.numIdentidad,
            fechaNacimiento: trabajador.fechaNacimiento,
            genero: {
                id: trabajador.genero /*!= 0? trabajador.genero.id : trabajador.genero*/
            },
            estadoCivil: {
                id: trabajador.estadoCivil /*!= 0? trabajador.estadoCivil.id : trabajador.estadoCivil*/
            },
            nacionalidad: {
                id: trabajador.nacionalidad /*!= 0? trabajador.nacionalidad.id : trabajador.nacionalidad*/
            },
            direccionResidencia: trabajador.direccionResidencia,
            telefono: trabajador.telefono,
            email: trabajador.email,
            cargo: {
                id: trabajador.cargo /*!= 0? trabajador.cargo.id : trabajador.cargo*/
            },
            fechaIngreso: trabajador.fechaIngreso,
            numCuentaBancaria: trabajador.numCuentaBancaria,
            estado: trabajador.estado,
            idUser:trabajador.idUser == 0 ? null : trabajador.idUser
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