import axios from 'axios';

const urlBase = 'http://172.26.0.169:44343/api';

export const axiosOptions = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Headers, Access-Control-Allow-Origin',
        'Content-Type': 'application/json'
    }
}

//*** TABLAS "ESTÁTICAS" ***//
export const getPerfiles = async () => {

    const resp = await axios.get(urlBase+'/perfil', axiosOptions);
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}

export const getComarcas = async () => {
    
    const resp = await axios.get(urlBase+'/comarca', axiosOptions);
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));
    
}

export const getProvincias = async () => {

    const resp = await axios.get(urlBase+'/provincia', axiosOptions);
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));
    
}

export const getPoblaciones = async () => {

    const resp = await axios.get(urlBase+'/poblacion', axiosOptions);
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));
    
}

export const getAnalisis = async () => {

    const resp = await axios.get(urlBase+'/analisis', axiosOptions);
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}

export const getOperarios = async () => {

    const resp = await axios.get(urlBase+'/usuario', axiosOptions);
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}

export const getContactos = async () => {

    const resp = await axios.get(urlBase+'/clientescontactos', axiosOptions);
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}

export const getProductos = async () => {

    const resp = await axios.get(urlBase+'/productos', axiosOptions);
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}

export const getListaElementos = async () => {

    const resp = await axios.get(urlBase+'/elementos', axiosOptions);
    return resp.data.data;

}

export const getListaAnalisis = async () => {

    const resp = await axios.get(urlBase+'/analisis', axiosOptions);
    return resp.data.data;

}

//*** CLIENTES  ***/

export const getClientes = async () => {

    const resp = await axios.get(urlBase+'/cliente', axiosOptions);
    return resp.data.data;

}

export const addCliente = async ( clienteSeleccionado ) => {
    // Como no existe, seteamos el ID en Null (La BD se encargará de asignarlo)
    clienteSeleccionado.id = 0;
    try {

        await axios.post(urlBase+'/cliente', clienteSeleccionado, axiosOptions);
        return true;

    } catch( error ) {
        const { status, title } = error.response.data;
        console.error(`Ha habido un error:\n${ status } - ${ title }`);
        return false;
    }

}

export const deleteCliente = async ( idCliente ) => {

    try {

        const resp = await axios.delete(urlBase+'/cliente/' + idCliente, axiosOptions);
        return true;

    } catch( error ) {

        const { status, title } = error.response.data;
        console.error(`Ha habido un error:\n${ status } - ${ title }`);
        return false;
    }
        

}

//*** OFERTAS ***/

export const getOfertas = async () => {

    const resp = await axios.get(urlBase+'/ofertasclientes', axiosOptions);
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));

}

/*** TAREAS ***/

export const getTareas = async () => {

    const resp = await axios.get(urlBase+'/tareas', axiosOptions);
    return resp.data.data;

}

/*** PLANTAS ***/

export const getConfPlantaCliente = async () => {

    const resp = await axios.get(urlBase+'/confplantascliente', axiosOptions);

}

export const getConfPlantaClientePorClienteOferta = async ( codigoCliente, codigoOferta) => {

    const resp = await axios.get(`${ urlBase }/confplantascliente/planta/?CodigoCliente=${ codigoCliente }&Oferta=${ codigoOferta }`, axiosOptions);
    return resp.data.data;

}

export const postConfPlantaCliente = async ( confPlantaCliente ) => {

    const resp = await axios.post(urlBase+'/confplantascliente/', confPlantaCliente, axiosOptions);
    return resp.data.data;

}

export const putConfPlantaCliente = async ( confPlantaCliente ) => {

    const resp = await axios.put(urlBase+'/confplantascliente', confPlantaCliente);

}

/*** NIVELES ***/

export const postConfNivelesPlantasCliente = async ( nivel ) => {

    const resp = await axios.post(urlBase+'/confNivelesPlantasCliente', nivel, axiosOptions);
    return resp.data.data;

}

export const putConfNivelesPlantasCliente = async ( nivel ) => {

    const resp = await axios.put(urlBase+'/confNivelesPlantasCliente', nivel, axiosOptions);
    return resp.data.data;

}

export const getConfNivelesPlantasCliente = async () => {

    const resp = await axios.get(urlBase+'/confnivelesplantascliente', axiosOptions);
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));

}

export const getConfNivelesPlantasClientePorPlanta = async ( idPlanta ) => {

    const resp = await axios.get(`${ urlBase }/confNivelesPlantasCliente/nivel?Id_Planta=${ idPlanta }`, axiosOptions);
    return resp.data.data;

}

/*** ELEMENTOS ***/

export const getElementos = async () => {

    const resp = await axios.get(urlBase+'/elementosplanta', axiosOptions)
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));

}

export const getElementoPorId = async ( id ) => {

    const resp = await axios.get(`${ urlBase }/elementosplanta/${ id }`);
    return resp.data.data;
    
}

export const postElementos = async ( elemento ) => {

    const resp = await axios.post(urlBase+'/elementosplanta', elemento, axiosOptions);
    return resp.data.data;

}

export const putElementos = async ( elemento ) => {

    const resp = await axios.put(urlBase+'/elementosplanta', elemento, axiosOptions);
    return resp.data.data;

}

/*** PARÁMETROS ***/

export const getParametros = async () => {
    
    const resp = await axios.get(urlBase+'/parametros', axiosOptions);
    return resp.data.data;
    
}

export const getValorParametros = async () => {
    
    const resp = await axios.get(urlBase+'/valorparametros', axiosOptions);
    return resp.data.data; // Object.entries(response.data.data).map(([key, value]) => (key, value))
    
}

export const getFilasParametros = async ( codigoCliente, codigoOferta, idElemento) => {
    
    const resp = await axios.get(`${ urlBase }/valorparametros/parametros/?CodigoCliente=${ codigoCliente }&Oferta=${ codigoOferta }&Id_Elemento=${ idElemento }`, axiosOptions);
    return resp.data.data;
    
}

export const getParametrosPlanta = async ( codigoCliente, codigoOferta, idElemento) => {
    
    const resp = await axios.get(`${ urlBase }/parametroselementoplantacliente/parametros/?CodigoCliente=${ codigoCliente }&Oferta=${ codigoOferta }&Id_Elemento=${ idElemento }`, axiosOptions);
    return resp.data.data;
    
}

export const getParametrosElemento = async ( cliente, oferta, elemento ) => {

    const url = `${ urlBase }/parametroselementoplantacliente/parametros/?CodigoCliente=${ cliente }&Oferta=${ oferta }&Id_Elemento=${ elemento }`;
    const resp = await axios.get(url, axiosOptions);
    return resp.data.data;

}

export const getConfParametrosElementoPlantaCliente = async () => {

    const resp = await axios.get(urlBase+'/parametroselementoplantacliente', axiosOptions);
    return resp.data.data;

}

export const getParametrosAnalisisPlanta = async () => {

    const resp = await axios.get(urlBase+'/parametrosanalisisplanta', axiosOptions);
    return resp.data.data;

}

export const putParametrosElementoPlantaCliente = async ( parametro ) => {

    const resp = await axios.put(urlBase+'/parametroselementoplantacliente', parametro, axiosOptions);
    return resp.data.data;

}

export const postParametrosElementoPlantaCliente = async ( parametro ) => {

    const resp = await axios.post(urlBase+'/parametroselementoplantacliente', parametro, axiosOptions);
    return resp.data.data;

}

export const postValorParametros = async ( parametro ) => {

    const resp = await axios.post(urlBase+'/valorparametros', parametro, axiosOptions);
    return resp.data.data;

}

/*** ANÁLISIS  ***/

export const getAnalisisNivelesPlantasCliente = async () => {

    const resp = await axios.get(urlBase+'/AnalisisNivelesPlantasCliente', axiosOptions);
    return resp.data.data;

}

export const getAnalisisNivelesPlantasClientePorIdNivel = async ( idNivel ) => {

    const resp = await axios.get(`${ urlBase }/AnalisisNivelesPlantasCliente/analisis?Id_NivelesPlanta=${ idNivel }`, axiosOptions);
    return resp.data.data;

}

export const postAnalisisNivelesPlantasCliente = async ( analisis ) => {

    const resp = await axios.post(urlBase+'/AnalisisNivelesPlantasCliente', analisis, axiosOptions);
    return resp.data.data;

}

export const putAnalisisNivelesPlantasCliente = async ( analisis ) => {

    const resp = await axios.put(urlBase+'/AnalisisNivelesPlantasCliente', analisis, axiosOptions);
    return resp.data.data;

}