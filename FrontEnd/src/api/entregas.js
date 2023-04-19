import { instance } from '.';

export const getEntregas = async () => {

    const resp = await instance.get('/entregas');
    return resp.data.data;

}

export const putEntregas = async ( entrega ) => {

    const resp = await instance.put(`/entregas?id=${ entrega.id }`, entrega);
    return resp;

}
export const postEntregas = async ( entrega ) => {

    const resp = await instance.post('/entregas', entrega);
    return resp;

}

export const deleteEntregas = async ( idEntrega ) => {

    const resp = await instance.delete(`/entregas/${ idEntrega }`);
    return resp;

}