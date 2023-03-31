import { instance } from '.';

export const getOfertas = async () => {

    const resp = await instance.get('/ofertasclientes');
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));

}