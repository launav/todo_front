import axios from "axios";
import { getEnvs } from '../helpers';

const { VITE_API_URL } = getEnvs();
//neceistamos crear la url base

const todoApi = axios.create({

    baseURL: VITE_API_URL

});


//para que nos recoja el token del localstorage y lo guarde en el header, para que guarde la sesion
//middleware
todoApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    };
    //retornamos
    return config;
});



export default todoApi;
