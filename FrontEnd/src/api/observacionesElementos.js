import { instance } from '.';

// export const getOfertas = async () => {

//     const resp = await instance.get('/ofertascontactos');
//     return resp.data.data;

// }

export const getObservacionById = async ( id ) => {

    const resp = await instance.get(`/observacioneselementos/${id}`);
    return resp.data;
}

export const getObservacionesByElementoId = async ( id ) => {

    const resp = await instance.get(`/observacioneselementos/GetByElementoId/${id}`);
    return resp.data;
}


export const postObservacion = async ( observacion ) => {

    const resp = await instance.post('/observacioneselementos', observacion);
    return resp;

}

export const putObservacion = async ( observacion ) => {

    const resp = await instance.put(`/observacioneselementos/${observacion.id}`, observacion);
    return resp;

}

export const deleteObservacion = async ( id ) => {

    const resp = await instance.delete(`/observacioneselementos/${id}`);
    return resp;

}
