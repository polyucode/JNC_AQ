import { instance } from '.';


export const getListaElementos = async () => {

    const resp = await instance.get('/elementos');
    return resp.data.data;

}

export const getElementos = async () => {

    const resp = await instance.get('/elementosplanta')
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));

}

export const getElementoPorId = async ( id ) => {

    const resp = await instance.get(`/elementosplanta/${ id }`);
    return resp.data.data;
    
}

export const postElementos = async ( elemento ) => {

    const resp = await instance.post('/elementosplanta', elemento);
    return resp.data.data;

}

export const putElementos = async ( elemento ) => {

    const resp = await instance.put('/elementosplanta', elemento);
    return resp.data.data;

}