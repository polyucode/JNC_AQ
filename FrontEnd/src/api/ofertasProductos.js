import { instance } from '.';

export const getOfertasProductos = async () => {

    const resp = await instance.get('/ofertasproductos');
    return resp.data.data;

}

export const putOfertasProductos = async ( producto ) => {

    const resp = await instance.post(`/ofertasproductos?id=${ producto.id }`, producto);
    return resp;

}

export const postOfertasProductos = async ( producto ) => {

    const resp = await instance.post('/ofertasproductos', producto);
    return resp;

}

export const deleteOfertasProductos = async ( idProducto ) => {

    const resp = await instance.post(`/ofertasproductos/${ idProducto }`);
    return resp;

}