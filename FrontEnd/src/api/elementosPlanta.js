import { instance } from '.';

export const getElementosPlanta = async () => {

    const resp = await instance.get('/elementosplanta');
    return resp.data.data;

}