import { instance } from '.';

export const getElementosPlanta = async () => {

    const resp = await instance.get('/elementosplanta');
    return resp.data.data;

}

export const deleteElementosPlanta = async ( id ) => {

    try {

        const resp = await instance.delete(`/elementosplanta/${ id }`);
        return true;

    } catch( error ) {

        const { status, title } = error.response.data;
        console.error(`Ha habido un error:\n${ status } - ${ title }`);
        return false;
    }

}