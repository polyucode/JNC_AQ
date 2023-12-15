import { instance } from '.';


export const getListaElementos = async () => {

    const resp = await instance.get('/elementos');
    return resp.data.data;

}

export const getElementos = async () => {

    const resp = await instance.get('/elementos')
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));

}

export const getElementoPorId = async ( id ) => {

    const resp = await instance.get(`/elementos/${ id }`);
    return resp.data.data;
    
}

export const postElementos = async ( elemento ) => {

    const resp = await instance.post('/elementos', elemento);
    return resp.data.data;

}

export const putElementos = async ( elemento ) => {

    const resp = await instance.put('/elementos', elemento);
    return resp.data.data;

}