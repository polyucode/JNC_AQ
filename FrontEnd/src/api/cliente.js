import { instance } from '.';


export const getClientes = async () => {

    const resp = await instance.get('/cliente');
    return resp.data.data;

}

export const getClienteById = async ( id ) => {

    const resp = await instance.get(`/cliente/${id}`);
    return resp.data.data;
    
}

export const putCliente = async ( cliente ) => {

    const resp = await instance.put(`/cliente?id=${ cliente.id }`, cliente);
    return resp;

}

export const postCliente = async ( clienteSeleccionado ) => {
    // Como no existe, seteamos el ID en Null (La BD se encargará de asignarlo)
    clienteSeleccionado.id = 0;
    try {

        await instance.post('/cliente', clienteSeleccionado);
        return true;

    } catch( error ) {
        const { status, title } = error.response.data;
        console.error(`Ha habido un error:\n${ status } - ${ title }`);
        return false;
    }

}

export const deleteCliente = async ( idCliente ) => {

    try {

        const resp = await instance.delete(`/cliente/${ idCliente }`);
        return true;

    } catch( error ) {

        const { status, title } = error.response.data;
        console.error(`Ha habido un error:\n${ status } - ${ title }`);
        return false;
    }
        

}