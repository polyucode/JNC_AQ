import axios from 'axios';

const urlBase = 'http://172.26.0.169:44343/api';

const token = {
    headers:{ Authorization: 'Bearer ' + localStorage.getItem('token') }
}

//*** TABLAS "ESTÁTICAS" ***//
export const getPerfiles = async () => {

    const resp = await axios.get(urlBase+'/perfil', token);
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}

export const getComarcas = async () => {
    
    const resp = await axios.get(urlBase+'/comarca', token);
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));
    
}

export const getProvincias = async () => {

    const resp = await axios.get(urlBase+'/provincia', token);
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));
    
}

export const getPoblaciones = async () => {

    const resp = await axios.get(urlBase+'/poblacion', token);
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));
    
}

export const getAnalisis = async () => {

    const resp = await axios.get(urlBase+'/analisis', token);
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}

export const getOperarios = async () => {

    const resp = await axios.get(urlBase+'/usuario', token);
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}

export const getContactos = async () => {

    const resp = await axios.get(urlBase+'/clientescontactos', token);
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}

export const getProductos = async () => {

    const resp = await axios.get(urlBase+'/productos', token);
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}

export const getListaElementos = async () => {

    const resp = await axios.get(urlBase+'/elementos', token);
    return resp.data.data;

}

export const getListaAnalisis = async () => {

    const resp = await axios.get(urlBase+'/analisis', token);
    return resp.data.data;

}

//*** CLIENTES  ***/

export const getClientes = async () => {

    const resp = await axios.get(urlBase+'/cliente', token);
    return resp.data.data;

}

export const addCliente = async ( clienteSeleccionado ) => {
    // Como no existe, seteamos el ID en Null (La BD se encargará de asignarlo)
    clienteSeleccionado.id = 0;
    try {

        await axios.post(urlBase+'/cliente', clienteSeleccionado, token);
        return true;

    } catch( error ) {
        const { status, title } = error.response.data;
        console.error(`Ha habido un error:\n${ status } - ${ title }`);
        return false;
    }

}

export const deleteCliente = async ( idCliente ) => {

    try {

        const resp = await axios.delete(urlBase+'/cliente/' + idCliente, token);
        return true;

    } catch( error ) {

        const { status, title } = error.response.data;
        console.error(`Ha habido un error:\n${ status } - ${ title }`);
        return false;
    }
        

}

//*** OFERTAS ***/

export const getOfertas = async () => {

    const resp = await axios.get(urlBase+'/ofertasclientes', token);
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));

}

/*** TAREAS ***/

export const getTareas = async () => {

    const resp = await axios.get(urlBase+'/tareas', token);
    return resp.data.data;

}

/*** PLANTAS ***/

export const getConfPlantaCliente = async () => {

    const resp = await axios.get(urlBase+'/confplantascliente', token);

}

export const getConfPlantaClientePorClienteOferta = async ( codigoCliente, codigoOferta) => {

    const resp = await axios.get(`${ urlBase }/confplantascliente/planta/?CodigoCliente=${ codigoCliente }&Oferta=${ codigoOferta }`, token);
    return resp.data.data;

}

export const postConfPlantaCliente = async ( confPlantaCliente ) => {

    const resp = await axios.post(urlBase+'/confplantascliente/', confPlantaCliente, token);
    return resp.data.data;

}

export const putConfPlantaCliente = async ( confPlantaCliente ) => {

    const resp = await axios.put(urlBase+'/confplantascliente', confPlantaCliente);

}

/*** NIVELES ***/

export const postConfNivelesPlantasCliente = async ( nivel ) => {

    const resp = await axios.post(urlBase+'/confNivelesPlantasCliente', nivel, token);
    return resp.data.data;

}

export const putConfNivelesPlantasCliente = async ( nivel ) => {

    const resp = await axios.put(urlBase+'/confNivelesPlantasCliente', nivel, token);
    return resp.data.data;

}

export const getConfNivelesPlantasCliente = async () => {

    const resp = await axios.get(urlBase+'/confnivelesplantascliente', token);
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));

}

export const getConfNivelesPlantasClientePorPlanta = async ( idPlanta ) => {

    const resp = await axios.get(`${ urlBase }/confNivelesPlantasCliente/nivel?Id_Planta=${ idPlanta }`, token);
    return resp.data.data;

}

/*** ELEMENTOS ***/

export const getElementos = async () => {

    const resp = await axios.get(urlBase+'/elementosplanta', token)
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));

}

export const getElementoPorId = async ( id ) => {

    const resp = await axios.get(`${ urlBase }/elementosplanta/${ id }`);
    return resp.data.data;
    
}

export const postElementos = async ( elemento ) => {

    const resp = await axios.post(urlBase+'/elementosplanta', elemento, token);
    return resp.data.data;

}

export const putElementos = async ( elemento ) => {

    const resp = await axios.put(urlBase+'/elementosplanta', elemento, token);
    return resp.data.data;

}

/*** PARÁMETROS ***/

export const getParametros = async () => {
    
    const resp = await axios.get(urlBase+'/parametros', token);
    return resp.data.data;
    
}

export const getValorParametros = async () => {
    
    const resp = await axios.get(urlBase+'/valorparametros', token);
    return resp.data.data; // Object.entries(response.data.data).map(([key, value]) => (key, value))
    
}

export const getFilasParametros = async ( codigoCliente, codigoOferta, idElemento) => {
    
    const resp = await axios.get(`${ urlBase }/valorparametros/parametros/?CodigoCliente=${ codigoCliente }&Oferta=${ codigoOferta }&Id_Elemento=${ idElemento }`, token);
    return resp.data.data;
    
}

export const getParametrosPlanta = async ( codigoCliente, codigoOferta, idElemento) => {
    
    const resp = await axios.get(`${ urlBase }/parametroselementoplantacliente/parametros/?CodigoCliente=${ codigoCliente }&Oferta=${ codigoOferta }&Id_Elemento=${ idElemento }`, token);
    return resp.data.data;
    
}

export const getParametrosElemento = async ( cliente, oferta, elemento ) => {

    const url = `${ urlBase }/parametroselementoplantacliente/parametros/?CodigoCliente=${ cliente }&Oferta=${ oferta }&Id_Elemento=${ elemento }`;
    const resp = await axios.get(url, token);
    return resp.data.data;

}

export const getConfParametrosElementoPlantaCliente = async () => {

    const resp = await axios.get(urlBase+'/parametroselementoplantacliente', token);
    return resp.data.data;

}

export const getParametrosAnalisisPlanta = async () => {

    const resp = await axios.get(urlBase+'/parametrosanalisisplanta', token);
    return resp.data.data;

}

export const putParametrosElementoPlantaCliente = async ( parametro ) => {

    const resp = await axios.put(urlBase+'/parametroselementoplantacliente', parametro, token);
    return resp.data.data;

}

export const postParametrosElementoPlantaCliente = async ( parametro ) => {

    const resp = await axios.post(urlBase+'/parametroselementoplantacliente', parametro, token);
    return resp.data.data;

}

export const postValorParametros = async ( parametro ) => {

    const resp = await axios.post(urlBase+'/valorparametros', parametro, token);
    return resp.data.data;

}

/*** ANÁLISIS  ***/

export const getAnalisisNivelesPlantasCliente = async () => {

    const resp = await axios.get(urlBase+'/AnalisisNivelesPlantasCliente', token);
    return resp.data.data;

}

export const getAnalisisNivelesPlantasClientePorIdNivel = async ( idNivel ) => {

    const resp = await axios.get(`${ urlBase }/AnalisisNivelesPlantasCliente/analisis?Id_NivelesPlanta=${ idNivel }`, token);
    return resp.data.data;

}

export const postAnalisisNivelesPlantasCliente = async ( analisis ) => {

    const resp = await axios.post(urlBase+'/AnalisisNivelesPlantasCliente', analisis, token);
    return resp.data.data;

}

export const putAnalisisNivelesPlantasCliente = async ( analisis ) => {

    const resp = await axios.put(urlBase+'/AnalisisNivelesPlantasCliente', analisis, token);
    return resp.data.data;

}