import axios from 'axios';

const token = {
    headers:{ Authorization: 'Bearer ' + localStorage.getItem('token') }
}

export const getPerfiles = async () => {

    const resp = await axios.get('/perfil', token);
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

//*** CLIENTES  */

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

///peticiones API
//   const peticionGetContacto = async () => {
    //     console.log("MEtodo Get Ejecutandose")
    //     axios.get("/clientescontactos", token).then(response => {
        //       setDataDet(response.data.data)
//     })
//   }