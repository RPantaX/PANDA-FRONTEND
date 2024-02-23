import AllApis from "../apis/AllApis";
const BASE_URL='';

export const findAll = async(page) => {
    try{
        const response= await AllApis.get(`${BASE_URL}guia-transportistas?pageNo=${page}&pageSize=10`);
        return response;
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const save= async(guia)=>{
    try{
        return await AllApis.post(`${BASE_URL}guia-transportista`, guia);
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const findById = async(id)=>{
    try{
        const response =await AllApis.get(`${BASE_URL}guia-transportista/${id}`);
        return response;
    }catch(error){
        console.error(error);
        throw error;
    }
}