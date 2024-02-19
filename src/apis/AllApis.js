import axios from "axios";

const AllApis = axios.create({
    baseURL: 'http://localhost:8080/api/v1/'
});

AllApis.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    }
    return config;
});

export default AllApis;