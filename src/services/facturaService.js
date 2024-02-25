import AllApis from "../apis/AllApis";
const BASE_URL='';

export const findAll = async(page) => {
    try{
        const response= await AllApis.get(`${BASE_URL}facturas?pageNo=${page}&pageSize=10`);
        return response;
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const save= async(factura)=>{
    try{
        return await AllApis.post(`${BASE_URL}factura`, factura);
    }catch(error){
        console.error(error);
        throw error;
    }
}