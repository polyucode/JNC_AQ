import { instance } from '.';

export const getUsuarios = async () => {

    const resp = await instance.get('/usuario');
    return resp.data.data;

}

export const putUsuarios = async ( usuario ) => {

    const resp = await instance.get(`/usuario?id=${ usuario.id }`, usuario);
    return resp;

}