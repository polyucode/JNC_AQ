import { instance } from '.';

export const getParametrosAnalisisPlanta = async () => {

    const resp = await instance.get('/parametrosanalisisplanta');
    return resp.data.data;

}

export const getParametrosAnalisisById = async ( id ) => {

    const resp = await instance.get(`/parametrosanalisisplanta/${id}`);
    return resp.data.data;
}

export const putParametrosAnalisisPlanta = async ( analisis ) => {
    
    const resp = await instance.put('/parametrosanalisisplanta', analisis);
    return resp.data.data;
    
}

export const putParametrosAnalisisPlantaPorId = async ( analisis ) => {
    
    const resp = await instance.put(`/parametrosanalisisplanta?id=${ analisis.id }`, analisis);
    return resp;
    
}

export const postParametrosAnalisisPlanta = async ( analisis ) => {

    const resp = await instance.post('/parametrosanalisisplanta', analisis);
    return resp.data.data;

}

export const deleteParametrosAnalisisPlanta = async ( idAnalisis ) => {

    const resp = await instance.delete(`/parametrosanalisisplanta/${ idAnalisis }`);
    return resp;

}