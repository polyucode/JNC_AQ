import { instance } from '.';


export const getParametrosElementoPlantaCliente = async () => {
    
    const resp = await instance.get('/parametroselementoplantacliente');
    return resp.data.data;
    
}

export const getParametrosElementoPlantaClienteConFiltros = async ( cliente, oferta, elemento, analisis ) => {

    const resp = await instance.get(`/parametroselementoplantacliente/parametros/?CodigoCliente=${ cliente }&Oferta=${ oferta }&Id_Elemento=${ elemento }&Id_Analisis=${ analisis }`);
    return resp.data.data;

}

export const getParametrosAnalisisFiltrados = async ( cliente, oferta, elemento, analisis, fecha ) => {

    const resp = await instance.get(`/parametrosanalisisplanta/analisis/?CodigoCliente=${ cliente }&Oferta=${ oferta }&Id_Elemento=${ elemento }&Id_Analisis=${ analisis }&Fecha=${ fecha }`)
    return resp.data.data;
    
}

export const putParametrosElementoPlantaCliente = async ( parametro ) => {

    const resp = await instance.put(`/parametroselementoplantacliente?id=${ parametro.id }`, parametro);
    return resp.data.data;

}

export const postParametrosElementoPlantaCliente = async ( parametro ) => {

    const resp = await instance.post('/parametroselementoplantacliente', parametro);
    return resp.data.data;

}