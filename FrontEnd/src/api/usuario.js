import { instance } from '.';

export const getUsuarios = async () => {

    const resp = await instance.get('/usuario');
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}

export const putUsuarios = async ( usuario ) => {

    const resp = await instance.get(`/usuario?id=${ usuario.id }`, usuario);
    return resp;

}