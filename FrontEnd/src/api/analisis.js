import { instance } from '.';

export const getAnalisis = async () => {

    const resp = await instance.get('/analisis');
    return resp.data.data;

}

export const postAnalisis = async ( analisis ) => {

    const resp = await instance.post('/analisis', analisis);
    return resp.data.data;
}

export const putAnalisis = async ( analisis ) => {

    const resp = await instance.put(`/analisis?id=${ analisis.id }`, analisis);
    return resp;

}

export const getAnalisisId = async ( id ) => {

    const resp = await instance.get(`/analisis/${ id }`);
    return resp.data.data;
    
}