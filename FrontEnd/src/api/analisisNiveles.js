import { instance } from '.';

export const getAnalisisNivelesPlantasCliente = async () => {

    const resp = await instance.get('/analisisnivelesplantascliente');
    return resp.data.data;

}

export const getAnalisisNivelesPlantasClientePorIdNivel = async ( idNivel ) => {

    const resp = await instance.get(`/analisisnivelesplantascliente/analisis?Id_NivelesPlanta=${ idNivel }`);
    return resp.data.data;

}

export const putAnalisisNivelesPlantasCliente = async ( analisis ) => {

    const resp = await instance.put('/analisisnivelesplantascliente', analisis);
    return resp.data.data;

}

export const postAnalisisNivelesPlantasCliente = async ( analisis ) => {

    const resp = await instance.post('/analisisnivelesplantascliente', analisis);
    return resp.data.data;

}

export const deleteAnalisisNivelesPlantasCliente = async ( id ) => {

    try {

        const resp = await instance.delete(`/analisisnivelesplantascliente/${ id }`);
        return true;

    } catch( error ) {

        const { status, title } = error.response.data;
        console.error(`Ha habido un error:\n${ status } - ${ title }`);
        return false;
    }

}
