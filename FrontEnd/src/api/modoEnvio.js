import { instance } from '.';

export const getModoEnvio = async () => {

    const resp = await instance.get('/modoenvio');
    return resp.data.data;

}

export const putModoEnvio = async ( modoenvio ) => {

    const resp = await instance.put(`/modoenvio?id=${ modoenvio.id }`, modoenvio);
    return resp;

}

export const postModoEnvio = async ( modoenvio ) => {

    const resp = await instance.post('/modoenvio', modoenvio);
    return resp;

}

export const deleteModoEnvio = async ( idModoEnvio ) => {

    const resp = await instance.delete(`/modoenvio/${ idModoEnvio }`);
    return resp;

}