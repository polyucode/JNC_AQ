import { instance } from '.';

export const getPerfiles = async () => {

    const resp = await instance.get('/perfil');
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}