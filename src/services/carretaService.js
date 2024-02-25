import AllApis from "../apis/AllApis";

const BASE_URL='';
export const findAll = async(page) => {
    try{
        const response= await AllApis.get(`${BASE_URL}carretas?pageNo=${page}&pageSize=10`);
        return response;
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const save= async(carreta)=>{
    
    try{
        return await AllApis.post(`${BASE_URL}carreta`, carreta);
    }catch(error){
        console.error(error);
        throw error;
    }
}

export const update=async(carreta)=>{
    try{
        return await AllApis.put(`${BASE_URL}carreta/${carreta.id}`, carreta);
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const remove = async(id)=>{
    try{
        await AllApis.delete(`${BASE_URL}carreta/${id}`);
    }catch(error){
        console.error(error);
        throw error;
    }
}