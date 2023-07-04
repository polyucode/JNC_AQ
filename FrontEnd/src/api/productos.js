import { instance } from '.';

export const getProductos = async () => {

    const resp = await instance.get('/productos');
    console.log(resp)
    return resp.data.data;

}

export const postProductos = async ( producto ) => {

    const resp = await instance.post('/productos', producto);
    return resp.data.data;

}

export const putProductos = async ( producto ) => {

    const resp = await instance.put(`/productos?id=${ producto.id }`, producto);
    return resp.data.data;
    
}

export const deleteProductos = async ( idProducto ) => {

    const resp = await instance.delete(`/productos/${ idProducto }`);
    return resp.data.data;

}