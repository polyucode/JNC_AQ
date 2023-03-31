import { instance } from '.';

export const getConsumos = async () => {

    const resp = await instance.get('/consumos');
    return resp.data.data;
    
}

export const putConsumos = async ( consumo ) => {

    const resp = await instance.put(`/consumos?id=${ consumo.id }`, consumo);
    return resp;

}

export const postConsumos = async ( consumo ) => {

    const resp = await instance.post('/consumos', consumo);
    return resp;

}

export const deleteConsumos = async ( idConsumo ) => {

    const resp = await instance.delete(`/consumos/${ idConsumo }`);
    return resp;
    
}