import AllApis from "../apis/AllApis";

const BASE_URL='';

export const findAll = async() => {
    try{
        const response= await AllApis.get(`${BASE_URL}users`);
        return response;
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const save= async(user)=>{
    try{
        return await AllApis.post(`${BASE_URL}auth/register`,user);
    }catch(error){
        throw error;
    }
}

export const update=async(user)=>{
    try{
        return await AllApis.put(`${BASE_URL}user/${user.id}`, user);
    }catch(error){
        throw error;
    }
}
export const remove = async(id)=>{
    try{
        await AllApis.delete(`${BASE_URL}user/${id}`);
    }catch(error){
        throw error;
    }
}