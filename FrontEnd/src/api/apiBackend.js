import axios from 'axios';

const urlBase = 'https://localhost:44343/api';

const token = {
    headers:{ Authorization: 'Bearer ' + localStorage.getItem('token') }
}

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

export const getListaElementos = async () => {

    const resp = await axios.get('/elementos', token);
    return resp.data.data;

}

//*** CLIENTES  ***/

export const getClientes = async () => {

    const resp = await axios.get('/cliente', token);
    return resp.data.data;

}

export const addCliente = async ( clienteSeleccionado ) => {

    // Como no existe, seteamos el ID en Null (La BD se encargará de asignarlo)
    clienteSeleccionado.id = null;

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

/*** PLANTAS ***/

export const getConfPlantaCliente = async () => {

    const resp = await axios.get('/confplantascliente', token);

}

export const postConfPlantaCliente = async ( confPlantaCliente ) => {

    const resp = await axios.post('confplantascliente', confPlantaCliente, token);
    return resp.data.data;

}


/*** ELEMENTOS ***/

export const getElementos = async () => {

    const resp = await axios.get('/elementosplanta', token)
    return Object.entries(resp.data.data).map(([key, value]) => (key, value));

}

export const getParametrosElemento = async ( cliente, oferta, elemento ) => {

    const url = `${ urlBase }/parametroselementoplantacliente/parametros/?CodigoCliente=${ cliente }&Oferta=${ oferta }&Elemento=${ elemento }`;
    const resp = await axios.get(url, token);
    return resp.data.data;

}

export const getParametros = async () => {

    const resp = await axios.get('/parametros', token);
    return resp.data.data;
    
}

///peticiones API
//   const peticionGetContacto = async () => {
    //     console.log("MEtodo Get Ejecutandose")
    //     axios.get("/clientescontactos", token).then(response => {
        //       setDataDet(response.data.data)
//     })
//   }



// const GetConfAnalisisNivelesPlantasCliente = async () => {
//     axios.get("/analisisnivelesplantascliente", token).then(response => {
//         const niveles = Object.entries(response.data.data).map(([key, value]) => (key, value))
//         setConfAnalisisNivelesPlantasCliente(niveles);
//     }, [])
// }

// const GetParametrosPlantaCliente = async () => {
//     axios.get("/parametroselementoplantacliente", token).then(response => {
//         setData(response.data.data)
//     })
// }