import { instance } from '.';

export const getParametros = async () => {

    const resp = await instance.get('/parametros');
    return resp.data.data;
}

export const getParametrosById = async ( id ) => {
    const resp = await instance.get(`/parametros/${id}`);
    return resp.data.data;
}

export const postParametros = async ( parametro ) => {
    const resp = await instance.post('/parametros', parametro);
    return resp.data.data;
}

export const putParametros = async ( parametro ) => {
    const resp = await instance.put(`/parametros?id=${ parametro.id }`, parametro);
    return resp;
}

export const deleteParametros = async ( idParametro ) => {
    const resp = await instance.delete(`/parametros/${ idParametro }`);
    return resp;
}