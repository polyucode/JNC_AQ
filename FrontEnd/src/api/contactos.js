import { instance } from '.';

export const getContactos = async () => {

    const resp = await instance.get('/clientescontactos');
    return resp.data.data;

}

export const putContactos = async ( contacto ) => {

    const resp = await instance.put(`/clientescontactos?id=${ contacto.id }`, contacto);
    return resp;

}

export const postContactos = async ( contacto ) => {

    const resp = await instance.post('/clientescontactos', contacto);
    return resp;

}

export const deleteContactos = async ( idContacto ) => {

    const resp = await instance.delete(`/clientescontactos/${ idContacto }`);
    return resp;

}