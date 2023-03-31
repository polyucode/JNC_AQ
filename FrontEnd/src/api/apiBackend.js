import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://localhost:44343/api',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});


export const postToken = async ( token ) => {

    const resp = instance.post('/token', token);
    return resp.data.data;

}

//*** TABLAS "ESTÁTICAS" ***//
export const getOperarios = async () => {

    const resp = await instance.get('/usuario');
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}

export const getListaElementos = async () => {

    const resp = await instance.get('/elementos');
    return resp.data.data;

}

/*** TAREAS ***/

export const getTareas = async () => {

    const resp = await instance.get('/tareas');
    return resp.data.data;

}

/*** PLANTAS ***/

export const getConfPlantaCliente = async () => {

    const resp = await instance.get('/confplantascliente');

}

export const getConfPlantaClientePorClienteOferta = async ( codigoCliente, codigoOferta) => {

    const resp = await instance.get(`/confplantascliente/planta/?CodigoCliente=${ codigoCliente }&Oferta=${ codigoOferta }`);
    return resp.data.data;

}

export const postConfPlantaCliente = async ( confPlantaCliente ) => {

    const resp = await instance.post('/confplantascliente/', confPlantaCliente);
    return resp.data.data;

}

export const putConfPlantaCliente = async ( confPlantaCliente ) => {

    const resp = await instance.put('/confplantascliente', confPlantaCliente);

}

/*** ELEMENTOS ***/

export const getElementos = async () => {

    const resp = await instance.get('/elementosplanta')
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));

}

export const getElementoPorId = async ( id ) => {

    const resp = await instance.get(`/elementosplanta/${ id }`);
    return resp.data.data;
    
}

export const postElementos = async ( elemento ) => {

    const resp = await instance.post('/elementosplanta', elemento);
    return resp.data.data;

}

export const putElementos = async ( elemento ) => {

    const resp = await instance.put('/elementosplanta', elemento);
    return resp.data.data;

}

/*** PARÁMETROS ***/

export const getParametros = async () => {
    
    const resp = await instance.get('/parametros');
    return resp.data.data;
    
}

export const getValorParametros = async () => {
    
    const resp = await instance.get('/valorparametros');
    return resp.data.data; // Object.entries(response.data.data).map(([key, value]) => (key, value))
    
}

export const getFilasParametros = async ( codigoCliente, codigoOferta, idElemento, idAnalisis, fecha ) => {
    
    const resp = await instance.get(`/valorparametros/parametros/?CodigoCliente=${ codigoCliente }&Oferta=${ codigoOferta }&Id_Elemento=${ idElemento }&Id_Analisis=${ idAnalisis }&fecha=${ fecha }`);
    return resp.data.data;
    
}

export const getFilasParametros2 = async ( codigoCliente, codigoOferta, idElemento, idAnalisis ) => {
    
    const resp = await instance.get(`/valorparametros/parametros/?CodigoCliente=${ codigoCliente }&Oferta=${ codigoOferta }&Id_Elemento=${ idElemento }&Id_Analisis=${ idAnalisis }`);
    return resp.data.data;
    
}

export const getParametrosPlanta = async ( codigoCliente, codigoOferta, idElemento, idAnalisis) => {
    
    const resp = await instance.get(`/parametroselementoplantacliente/parametros/?CodigoCliente=${ codigoCliente }&Oferta=${ codigoOferta }&Id_Elemento=${ idElemento }&Id_Analisis=${ idAnalisis }`);
    return resp.data.data;
    
}

export const getParametrosElemento = async ( cliente, oferta, elemento, analisis ) => {

    const resp = await instance.get(`/parametroselementoplantacliente/parametros/?CodigoCliente=${ cliente }&Oferta=${ oferta }&Id_Elemento=${ elemento }&Id_Analisis=${ analisis }`);
    return resp.data.data;

}

export const getConfParametrosElementoPlantaCliente = async () => {

    const resp = await instance.get('/parametroselementoplantacliente');
    return resp.data.data;

}



export const putParametrosElementoPlantaCliente = async ( parametro ) => {

    const resp = await instance.put('/parametroselementoplantacliente', parametro);
    return resp.data.data;

}

export const postParametrosElementoPlantaCliente = async ( parametro ) => {

    const resp = await instance.post('/parametroselementoplantacliente', parametro);
    return resp.data.data;

}

export const postValorParametros = async ( parametro ) => {

    const resp = await instance.post('/valorparametros', parametro);
    return resp.data.data;

}

export const putValorParametros = async ( parametro ) => {

    const resp = await instance.put('/valorparametros', parametro);
    return resp.data.data;

}

export const getParametrosAnalisisFiltrados = async ( cliente, oferta, elemento, analisis, fecha ) => {

    const resp = await instance.get(`/parametrosanalisisplanta/analisis/?CodigoCliente=${ cliente }&Oferta=${ oferta }&Id_Elemento=${ elemento }&Id_Analisis=${ analisis }&Fecha=${ fecha }`)
    return resp.data.data;
}

/* PDF */
export const generarPdf = async ( valores ) => {
    
    const resp = await instance.post('/PDFGenerator', valores);
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
    /*const resp = await instance.get(`/fileupload/download/${ id }`);
    return resp.data;*/
}

export const bajarPdfNoFQ = ( id, nombre, oferta, elemento, analisis, fecha ) => {

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
    /*const resp = await instance.get(`/fileupload/download/${ id }`);
    return resp.data;*/
}

export const subirPdf = async ( id, archivo ) => {

    const formData = new FormData();

    formData.append('file', archivo )
    
    const resp = await instance.post(`/FileUpload/upload/pdf/${id}`, formData)
    console.log(resp)
    return resp
}


/* Firma */

export const subirFirma = async ( id, firma ) => {

    const formData = new FormData()
    formData.append('file', firma)

    const resp = await instance.post(`/FileUpload/upload/firma/${id}`, formData)
    console.log(resp)
    return resp

}