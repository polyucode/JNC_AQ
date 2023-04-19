import { instance } from '.';

export const getComarcas = async () => {
    
    const resp = await instance.get('/comarca');
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));
    
}

export const getProvincias = async () => {

    const resp = await instance.get('/provincia');
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));
    
}

export const getPoblaciones = async () => {

    const resp = await instance.get('/poblacion');
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));
    
}