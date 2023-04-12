import { instance } from '.';

export const getUsuarios = async () => {

    const resp = await instance.get('/usuario');
    return resp.data.data;

}

export const postUsuarios = async ( usuario ) => {

    const resp = await instance.post('/usuario', usuario);
    return resp.data.data;

}

export const putUsuarios = async ( usuario ) => {

    const resp = await instance.put(`/usuario?id=${ usuario.id }`, usuario);
    return resp;

}

export const deleteUsuarios = async ( idUsuario ) => {

    const resp = await instance.delete(`/usuario/${ idUsuario }`);
    return resp;

}