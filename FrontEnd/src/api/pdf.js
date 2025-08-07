import { instance } from '.';
import { getFileById } from './files';

export const generarPdf = async (valores) => {

    const resp = await instance.post('/PDFGenerator', valores);
    return resp.data;

}

export const bajarPdf = async (id, codigo, elemento, analisis, fecha) => {

    const resp = await instance.get(`/fileupload/download/${id}`, { responseType: 'blob' });

    // create file link in browser's memory
    const href = URL.createObjectURL(resp.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', `M${codigo}_${fecha}_${analisis}_${elemento}.pdf`); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);

}

export const bajarPdfNoFQ = async (id, codigo, elemento, analisis, fecha) => {

    const resp = await instance.get(`/fileupload/download/${id}`, { responseType: 'blob' });

    // create file link in browser's memory
    const href = URL.createObjectURL(resp.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', `M${codigo}_${fecha}_${analisis}_${elemento}.pdf`); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);

}

export const bajarPdfInstrucciones = async (id) => {

    const resp = await instance.get(`/fileupload/download/${id}`, { responseType: 'blob' });

    const resp2 = await getFileById(id)

    const href = URL.createObjectURL(resp.data);

    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', `${resp2.name}.pdf`);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);

}

export const subirPdf = async (id, archivo) => {

    const formData = new FormData();

    formData.append('file', archivo);

    const resp = await instance.post(`/FileUpload/upload/pdf/${id}`, formData);
    return resp;

}

export const subirPdfTareas = async (id, archivo) => {

    const formData = new FormData();

    formData.append('file', archivo);

    const resp = await instance.post(`/FileUpload/uploadTask/pdf/${id}`, formData);
    return resp;

}

export const getFicheros = async () => {

    const resp = await instance.get('/files');
    return resp.data.data;

}

export const getFicherosById = async (pdf) => {

    const resp = await instance.get(`/files/?Id=${pdf}`)
    return resp.data.data;

}

//Descargar PDF desde Dashboard
export const bajarPdfDashBoard = async (id, name) => {

    const resp = await instance.get(`/fileupload/download/${id}`, { responseType: 'blob' });
    // create file link in browser's memory
    const href = URL.createObjectURL(resp.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', `${name}.pdf`); //or any other extension
    document.body.appendChild(link);
    link.click();
    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
}

//Descargar esquema de carpetas
export const bajarEsquemaCarpetas = async (nombreCliente, codigoCliente, codigoOferta, tipoAccion) => {
    const resp = await instance.get(`/fileupload/DownloadFolderSchema/${nombreCliente}/${codigoCliente}/${codigoOferta}/${tipoAccion}`);
    return resp;
}

export const descargarArchivoPorRuta = async (path, nombreArchivo) => {

    const resp = await instance.get(`/fileupload/DownloadFileByPath/${encodeURI(path)}/${nombreArchivo}`, { responseType: 'blob' });

    // create file link in browser's memory
    const href = URL.createObjectURL(resp.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', `${nombreArchivo}`); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);

}

export const mandarCorreoNoFQ = async (codigo, texto, analisis, archivo, contactos, idElemento) => {

    const formData = new FormData();
    if (/\r|\n/.exec(texto)) {
        // Do something, the string contains a line break
        texto = texto.replace(/(\r\n|\n|\r)/gm,"<br>");
    }

    //const textoCodificado = texto.replace(/(\r\n|\n|\r)/g, "%0A");

    formData.append('file', archivo);

    // const resp = await instance.post(`/fileupload/send/${codigo}/${texto}/${analisis}`, formData);
    const resp = await instance.post(`/fileupload/send?codigo=${codigo}&texto=${texto}&analisis=${analisis}&contactos=${contactos}&idElemento=${idElemento}`, formData);
    return resp;
}