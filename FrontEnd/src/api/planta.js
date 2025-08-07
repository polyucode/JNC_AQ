import { instance } from '.';

export const getConfPlantaCliente = async () => {

    const resp = await instance.get('/confplantascliente');
    return resp.data.data;

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

    const resp = await instance.put(`/confplantascliente`, confPlantaCliente);

}

export const deleteConfPlantaCliente = async ( id ) => {

    try {

        const resp = await instance.delete(`/confplantascliente/${ id }`);
        return true;

    } catch( error ) {

        const { status, title } = error.response.data;
        console.error(`Ha habido un error:\n${ status } - ${ title }`);
        return false;
    }
    
}