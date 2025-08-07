import { instance } from '.';


export const getArchivosById = async (id) => {
    console.log(id)
    const resp = await instance.get(`/tareaArchivos/${id}`);
    return resp.data;
}

export const getArchivosByIdTarea = async (id) => {

    const resp = await instance.get(`/tareaArchivos/GetArchivosByIdTarea/${id}`);
    return resp.data;

}

export const postArchivo = async ( archivo ) => {

    const resp = await instance.post('/tareaArchivos', archivo);
    return resp;

}

export const deleteArchivo = async ( id ) => {

    const resp = await instance.delete(`/tareaArchivos/${id}`);
    return resp;

}