import { instance } from '.';

// export const getOfertas = async () => {

//     const resp = await instance.get('/ofertascontactos');
//     return resp.data.data;

// }

export const getComentarioById = async ( id ) => {

    const resp = await instance.get(`/comentarioselementos/${id}`);
    return resp.data;
}

export const getComentariosByTareaId = async ( id ) => {

    const resp = await instance.get(`/comentarioselementos/GetByTareaId/${id}`);
    return resp.data;
}

export const getComentariosByElementoId = async ( id ) => {

    const resp = await instance.get(`/comentarioselementos/GetByElementoId/${id}`);
    return resp.data;
}


export const postComentario = async ( comentario ) => {

    const resp = await instance.post('/comentarioselementos', comentario);
    return resp;

}

export const putComentario = async ( comentario ) => {

    const resp = await instance.put(`/comentarioselementos/${comentario.id}`, comentario);
    return resp;

}

export const deleteComentario = async ( id ) => {

    const resp = await instance.delete(`/comentarioselementos/${id}`);
    return resp;

}
