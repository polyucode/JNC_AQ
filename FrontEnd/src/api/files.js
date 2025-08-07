import { instance } from '.';

export const getFileById = async ( id ) => {

    const resp = await instance.get(`/files/${id}`);
    return resp.data.data;

}

export const getFiles = async () => {

    const resp = await instance.get('/files');
    return resp.data.data;

}