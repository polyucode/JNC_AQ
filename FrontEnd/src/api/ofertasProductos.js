import { instance } from '.';

export const getOfertasProductos = async () => {
    const resp = await instance.get('/ofertasproductos');
    return resp.data.data;
}

export const getOfertasProductosById = async ( id ) => {

    const resp = await instance.get(`/ofertasproductos/${id}`);
    return resp.data.data;
}

export const postOfertasProductos = async ( oferta ) => {

    const resp = await instance.post('/ofertasproductos', oferta);
    return resp;

}

export const putOfertasProductos = async ( oferta ) => {
    const resp = await instance.put(`/ofertasproductos?id=${ oferta.id }`, oferta);
    return resp;
}

export const getOfertasProductosByOfertaId = async (offerId) =>{
    
    const resp = await instance.get(`/ofertasproductos/GetByOfferId?offerId=${offerId}`);
    return resp.data.data;
}

export const insertProductosOferta = async (productos, idOfertaSeleccionada) =>{
    const resp = await instance.post(`/ofertasproductos/InsertOfferProducts?idOfertaSeleccionada=${idOfertaSeleccionada}`,productos);
    return resp.data.data;

}

export const updateProductosOferta = async (productos, idOfertaSeleccionada) =>{
    const resp = await instance.post(`/ofertasproductos/UpdateOfferProducts?idOfertaSeleccionada=${idOfertaSeleccionada}`,productos);
    return resp.data.data;

}