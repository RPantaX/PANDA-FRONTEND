import axios from "axios";

const AllApis = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

AllApis.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    }
    return config;
});

export default AllApis;