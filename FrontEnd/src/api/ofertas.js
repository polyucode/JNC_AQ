import { instance } from '.';

export const getOfertas = async () => {

    const resp = await instance.get('/ofertasclientes');
    return resp.data.data;

}

export const putOfertas = async ( oferta ) => {

    const resp = await instance.put(`/ofertasclientes?id=${ oferta.id }`, oferta);
    return resp;

}

export const postOfertas = async ( oferta ) => {

    const resp = await instance.post('/ofertasclientes', oferta);
    return resp;

}

export const deleteOfertas = async ( idOferta ) => {

    const resp = await instance.delete(`/ofertasclientes/${ idOferta }`);
    return resp;

}