import { instance } from '.';


export const getValorParametros = async () => {

    const resp = await instance.get('/valorparametros');
    return resp.data.data; // Object.entries(response.data.data).map(([key, value]) => (key, value))

}

export const getFilasParametros = async (codigoCliente, codigoOferta, idElemento, idAnalisis, fecha) => {

    const resp = await instance.get(`/valorparametros/parametros/?CodigoCliente=${codigoCliente}&Oferta=${codigoOferta}&Id_Elemento=${idElemento}&Id_Analisis=${idAnalisis}&fecha=${fecha}`);
    return resp.data.data;

}

export const getFilasParametros2 = async (codigoCliente, codigoOferta, idElemento, idAnalisis) => {

    const resp = await instance.get(`/valorparametros/parametros/?CodigoCliente=${codigoCliente}&Oferta=${codigoOferta}&Id_Elemento=${idElemento}&Id_Analisis=${idAnalisis}`);
    return resp.data.data;

}

export const postValorParametros = async (parametro) => {

    const resp = await instance.post('/valorparametros', parametro);
    return resp.data.data;

}

export const putValorParametros = async (parametro) => {

    const resp = await instance.put('/valorparametros', parametro);
    return resp;

}