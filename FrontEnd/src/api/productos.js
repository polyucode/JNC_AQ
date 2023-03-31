import { instance } from '.';

export const getProductos = async () => {

    const resp = await instance.get('/productos');
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}

