import { instance } from '.';


export const getConfNivelesPlantasCliente = async () => {

    const resp = await instance.get('/confnivelesplantascliente');
    return resp.data.data;
    
}

export const getConfNivelesPlantasClientePorPlanta = async ( idPlanta ) => {
    
    const resp = await instance.get(`/confnivelesplantascliente/nivel?Id_Planta=${ idPlanta }`);
    return resp.data.data;
    
}

export const putConfNivelesPlantasCliente = async ( nivel ) => {

    const resp = await instance.put('/confnivelesplantascliente', nivel);
    return resp.data.data;

}

export const postConfNivelesPlantasCliente = async ( nivel ) => {

    const resp = await instance.post('/confnivelesplantascliente', nivel);
    return resp.data.data;

}

export const deleteConfNivelesPlantasCliente = async ( id ) => {

    try {

        const resp = await instance.delete(`/confnivelesplantascliente/${ id }`);
        return true;

    } catch( error ) {

        const { status, title } = error.response.data;
        console.error(`Ha habido un error:\n${ status } - ${ title }`);
        return false;
    }
    
}
