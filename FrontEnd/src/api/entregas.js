import { instance } from '.';

export const getEntregas = async () => {

    const resp = instance.get('/entregas');
    return (await resp).data.data;

}

export const putEntregas = async ( entrega ) => {

    const resp = instance.put(`/entregas?id=${ entrega.id }`, entrega);
    return resp;

}
export const postEntregas = async ( entrega ) => {

    const resp = instance.post('/entregas', entrega);
    return resp;

}

export const deleteEntregas = async ( idEntrega ) => {

    const resp = instance.delete(`/entregas/${ idEntrega }`);
    return resp;

}