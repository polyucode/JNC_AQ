import { instance } from '.';

export const getOfertasContactos = async () => {

    const resp = await instance.get('/ofertascontactos');
    return resp.data.data;

}

export const getOfertaContactosById = async ( id ) => {

    const resp = await instance.get(`/ofertascontactos/${id}`);
    return resp.data.data;
}

export const getOfertasContactosByOfertaId = async (offerId) =>{
    
    const resp = await instance.get(`/ofertascontactos/GetByOfferId?offerId=${offerId}`);
    return resp.data.data;
}

export const putOfertasContactos = async ( oferta ) => {

    const resp = await instance.put(`/ofertascontactos?id=${ oferta.id }`, oferta);
    return resp;

}

export const postOfertasContactos = async ( oferta ) => {

    const resp = await instance.post('/ofertascontactos', oferta);
    return resp;

}

export const deleteOfertasContactos = async ( idOferta ) => {

    const resp = await instance.delete(`/ofertascontactos/${ idOferta }`);
    return resp;

}

export const updateContactosOferta = async (contactos, idOfertaSeleccionada) =>{
    const resp = await instance.post(`/ofertascontactos/UpdateOfferContacts?idOfertaSeleccionada=${idOfertaSeleccionada}`,contactos);
    return resp.data.data;

}

export const insertContactosOferta = async (contactos, idOfertaSeleccionada) =>{
    const resp = await instance.post(`/ofertascontactos/InsertOfferContacts?idOfertaSeleccionada=${idOfertaSeleccionada}`,contactos);
    return resp.data.data;

}
