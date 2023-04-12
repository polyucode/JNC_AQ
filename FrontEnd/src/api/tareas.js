import { instance } from '.';


export const getTareas = async () => {

    const resp = await instance.get('/tareas');
    return resp.data.data;

}

export const postTareas = async ( tarea ) => {

    const resp = await instance.post('/tareas', tarea);
    return resp.data.data;
    
}

export const putTareas = async ( tarea ) => {

    const resp = await instance.put(`/tareas?id=${ tarea.id }`, tarea);
    return resp.data.data;

}

export const deleteTareas = async ( idTarea ) => {

    const resp = await instance.delete(`/tareas/${ idTarea }`);
    return resp.data.data;

}