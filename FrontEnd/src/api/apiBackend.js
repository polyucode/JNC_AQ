import axios from 'axios';

const urlBase = 'https://localhost:44343/api';

const token = {
    headers:{ Authorization: 'Bearer ' + localStorage.getItem('token') }
}

//*** TABLAS "ESTÁTICAS" ***//
export const getPerfiles = async () => {

    const resp = await axios.get(`/perfil`, token);
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}

export const getComarcas = async () => {
    
    const resp = await axios.get('/comarca', token);
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));
    
}

export const getProvincias = async () => {

    const resp = await axios.get('/provincia', token);
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));
    
}

export const getPoblaciones = async () => {

    const resp = await axios.get('/poblacion', token);
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));
    
}

export const getAnalisis = async () => {

    const resp = await axios.get(`/analisis`, token);
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}

export const getOperarios = async () => {

    const resp = await axios.get(`/usuario`, token);
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}

export const getContactos = async () => {

    const resp = await axios.get(`/clientescontactos`, token);
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}

export const getProductos = async () => {

    const resp = await axios.get(`/productos`, token);
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}

export const getListaElementos = async () => {

    const resp = await axios.get('/elementos', token);
    return resp.data.data;

}

export const getListaAnalisis = async () => {

    const resp = await axios.get('/analisis', token);
    return resp.data.data;

}

//*** CLIENTES  ***/

export const getClientes = async () => {

    const resp = await axios.get('/cliente', token);
    return resp.data.data;

}

export const addCliente = async ( clienteSeleccionado ) => {
    // Como no existe, seteamos el ID en Null (La BD se encargará de asignarlo)
    clienteSeleccionado.id = 0;
    try {

        await axios.post('/cliente', clienteSeleccionado, token);
        return true;

    } catch( error ) {
        const { status, title } = error.response.data;
        console.error(`Ha habido un error:\n${ status } - ${ title }`);
        return false;
    }

}

export const deleteCliente = async ( idCliente ) => {

    try {

        const resp = await axios.delete('/cliente/' + idCliente, token);
        return true;

    } catch( error ) {

        const { status, title } = error.response.data;
        console.error(`Ha habido un error:\n${ status } - ${ title }`);
        return false;
    }
        

}

//*** OFERTAS ***/

export const getOfertas = async () => {

    const resp = await axios.get('/ofertasclientes', token);
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));

}

/*** TAREAS ***/

export const getTareas = async () => {

    const resp = await axios.get('/tareas', token);
    return resp.data.data;

}

/*** PLANTAS ***/

export const getConfPlantaCliente = async () => {

    const resp = await axios.get('/confplantascliente', token);

}

export const getConfPlantaClientePorClienteOferta = async ( codigoCliente, codigoOferta) => {

    const resp = await axios.get(`/confplantascliente/planta/?CodigoCliente=${ codigoCliente }&Oferta=${ codigoOferta }`, token);
    return resp.data.data;

}

export const postConfPlantaCliente = async ( confPlantaCliente ) => {

    const resp = await axios.post('/confplantascliente/', confPlantaCliente, token);
    return resp.data.data;

}

export const putConfPlantaCliente = async ( confPlantaCliente ) => {

    const resp = await axios.put('https://localhost:44343/api/confplantascliente', confPlantaCliente);

}

/*** NIVELES ***/

export const postConfNivelesPlantasCliente = async ( nivel ) => {

    const resp = await axios.post('/confNivelesPlantasCliente', nivel, token);
    return resp.data.data;

}

export const putConfNivelesPlantasCliente = async ( nivel ) => {

    const resp = await axios.put('/confNivelesPlantasCliente', nivel, token);
    return resp.data.data;

}

export const getConfNivelesPlantasCliente = async () => {

    const resp = await axios.get('/confnivelesplantascliente', token);
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));

}

export const getConfNivelesPlantasClientePorPlanta = async ( idPlanta ) => {

    const resp = await axios.get(`/confNivelesPlantasCliente/nivel?Id_Planta=${ idPlanta }`, token);
    return resp.data.data;

}

export const getConfAnalisisNivelesPlantasCliente = async () => {

    const resp = await axios.get('/analisisnivelesplantascliente', token);
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));

}

/*** ELEMENTOS ***/

export const getElementos = async () => {

    const resp = await axios.get('/elementosplanta', token)
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));

}

export const getElementoPorId = async ( id ) => {

    const resp = await axios.get(`/elementosplanta/${ id }`);
    return resp.data.data;
    
}

export const postElementos = async ( elemento ) => {

    const resp = await axios.post('/elementosplanta', elemento, token);
    return resp.data.data;

}

export const putElementos = async ( elemento ) => {

    const resp = await axios.put('/elementosplanta', elemento, token);
    return resp.data.data;

}

/*** PARÁMETROS ***/

export const getParametros = async () => {
    
    const resp = await axios.get('/parametros', token);
    return resp.data.data;
    
}

export const getValorParametros = async () => {
    
    const resp = await axios.get('/valorparametros', token);
    return resp.data.data; // Object.entries(response.data.data).map(([key, value]) => (key, value))
    
}

export const getFilasParametros = async ( codigoCliente, codigoOferta, idElemento, idAnalisis, fecha ) => {
    
    const resp = await axios.get(`${ urlBase }/valorparametros/parametros/?CodigoCliente=${ codigoCliente }&Oferta=${ codigoOferta }&Id_Elemento=${ idElemento }&Id_Analisis=${ idAnalisis }&fecha=${ fecha }`, token);
    return resp.data.data;
    
}

export const getFilasParametros2 = async ( codigoCliente, codigoOferta, idElemento, idAnalisis ) => {
    
    const resp = await axios.get(`${ urlBase }/valorparametros/parametros/?CodigoCliente=${ codigoCliente }&Oferta=${ codigoOferta }&Id_Elemento=${ idElemento }&Id_Analisis=${ idAnalisis }`, token);
    return resp.data.data;
    
}

export const getParametrosPlanta = async ( codigoCliente, codigoOferta, idElemento, idAnalisis) => {
    
    const resp = await axios.get(`/parametroselementoplantacliente/parametros/?CodigoCliente=${ codigoCliente }&Oferta=${ codigoOferta }&Id_Elemento=${ idElemento }&Id_Analisis=${ idAnalisis }`, token);
    return resp.data.data;
    
}

export const getParametrosElemento = async ( cliente, oferta, elemento, analisis ) => {

    const url = `${ urlBase }/parametroselementoplantacliente/parametros/?CodigoCliente=${ cliente }&Oferta=${ oferta }&Id_Elemento=${ elemento }&Id_Analisis=${ analisis }`;
    const resp = await axios.get(url, token);
    return resp.data.data;

}

export const getConfParametrosElementoPlantaCliente = async () => {

    const resp = await axios.get('/parametroselementoplantacliente', token);
    return resp.data.data;

}

export const getParametrosAnalisisPlanta = async () => {

    const resp = await axios.get('/parametrosanalisisplanta', token);
    return resp.data.data;

}

export const putParametrosAnalisisPlanta = async ( analisis ) => {

    const resp = await axios.put('/parametrosanalisisplanta', analisis, token);
    return resp.data.data;

}

export const putParametrosElementoPlantaCliente = async ( parametro ) => {

    const resp = await axios.put('/parametroselementoplantacliente', parametro, token);
    return resp.data.data;

}

export const postParametrosElementoPlantaCliente = async ( parametro ) => {

    const resp = await axios.post('/parametroselementoplantacliente', parametro, token);
    return resp.data.data;

}

export const postValorParametros = async ( parametro ) => {

    const resp = await axios.post('/valorparametros', parametro, token);
    return resp.data.data;

}

export const putValorParametros = async ( parametro ) => {

    const resp = await axios.put('/valorparametros', parametro, token);
    return resp.data.data;

}

export const getParametrosAnalisisFiltrados = async ( cliente, oferta, elemento, analisis, fecha ) => {

    const resp = await axios.get(`/parametrosanalisisplanta/analisis/?CodigoCliente=${ cliente }&Oferta=${ oferta }&Id_Elemento=${ elemento }&Id_Analisis=${ analisis }&Fecha=${ fecha }`)
    return resp.data.data;
}

/*** ANÁLISIS  ***/

export const getAnalisisNivelesPlantasCliente = async () => {

    const resp = await axios.get('/AnalisisNivelesPlantasCliente', token);
    return resp.data.data;

}

export const getAnalisisNivelesPlantasClientePorIdNivel = async ( idNivel ) => {

    const resp = await axios.get(`/AnalisisNivelesPlantasCliente/analisis?Id_NivelesPlanta=${ idNivel }`, token);
    return resp.data.data;

}

export const postAnalisisNivelesPlantasCliente = async ( analisis ) => {

    const resp = await axios.post('/AnalisisNivelesPlantasCliente', analisis, token);
    return resp.data.data;

}

export const putAnalisisNivelesPlantasCliente = async ( analisis ) => {

    const resp = await axios.put('/AnalisisNivelesPlantasCliente', analisis, token);
    return resp.data.data;

}

/* PDF */

export const generarPdf = async ( valores ) => {
    
    const resp = await axios.post('/PDFGenerator', valores, token);
    return resp.data;
}

export const bajarPdf = ( id, nombre, oferta, elemento, analisis, fecha ) => {

    axios({
        url: `/fileupload/download/${ id }`, //your url
        method: 'GET',
        responseType: 'blob', // important
    }).then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);
    
        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', `${nombre}_${oferta}_${elemento}_${analisis}_${fecha}.pdf`); //or any other extension
        document.body.appendChild(link);
        link.click();
    
        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    });
    /*const resp = await axios.get(`/fileupload/download/${ id }`);
    return resp.data;*/
}

export const bajarPdfNoFQ = ( id ) => {

    axios({
        url: `/fileupload/download/${ id }`, //your url
        method: 'GET',
        responseType: 'blob', // important
    }).then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);
    
        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', `Fichero.pdf`); //or any other extension
        document.body.appendChild(link);
        link.click();
    
        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    });
    /*const resp = await axios.get(`/fileupload/download/${ id }`);
    return resp.data;*/
}

export const subirPdf = async ( id ) => {
    
    const resp = await axios.post(`/FileUpload/upload/pdf/${id}`, token)
    return resp
}