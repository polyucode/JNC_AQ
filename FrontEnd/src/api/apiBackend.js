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

/*** PARÁMETROS ***/
export const getParametros = async () => {
    
    const resp = await instance.get('/parametros');
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