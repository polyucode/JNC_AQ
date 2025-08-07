import { instance } from '.';


export const getHistorialCorreosEnviadosByCodigoClienteIdElemento = async (idCliente, idElemento) => {

    const resp = await instance.get(`/HistorialCorreosEnviados?codigoCliente=${idCliente}&idElemento=${idElemento}`);
    return resp.data;

}