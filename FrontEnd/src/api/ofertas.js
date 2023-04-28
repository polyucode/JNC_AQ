import { instance } from '.';

export const getOfertas = async () => {

    const resp = await instance.get('/ofertasclientes');
    return resp.data.data;

}

export const putOfertas = async ( cliente ) => {

    const resp = await instance.put(`/ofertasclientes?id=${ cliente.id }`, cliente);
    return resp;

}

export const postOfertas = async ( cliente ) => {

    const resp = await instance.post('/ofertasclientes', cliente);
    return resp;

}

export const deleteOfertas = async ( idOferta ) => {

    const resp = await instance.delete(`/ofertasclientes/${ idOferta }`);
    return resp;

}