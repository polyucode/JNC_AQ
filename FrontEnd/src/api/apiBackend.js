import axios from 'axios';

export const instance = axios.create({

    baseURL: 'https://localhost:44343/api',
    // ServidorViejo
    //baseURL: 'http://172.26.0.169:44343/api',
    // ServidorNuevo
    //baseURL: 'http://192.168.1.169:44343/api',
    // ServidorRemoto
    //baseURL: 'https://jnegrec.ddns.net:44343/api',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

/*** TOKEN ***/
export const postToken = async ( token ) => {

    const resp = instance.post('/token', token);
    return resp;

}

/*** PARÁMETROS ***/
export const getParametros = async () => {
    
    const resp = await instance.get('/parametros');
    return resp.data.data;
    
}

/*** FIRMA ***/
export const subirFirma = async ( id, firma ) => {

    const formData = new FormData();
    formData.append('file', firma);

    const resp = await instance.post(`/FileUpload/uploadFiles/firma/${id}`, formData);
    return resp;

}