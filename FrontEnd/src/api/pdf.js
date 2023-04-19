import { instance } from '.';

export const generarPdf = async ( valores ) => {
    
    const resp = await instance.post('/PDFGenerator', valores);
    return resp.data;

}

export const bajarPdf = async ( id, nombre, oferta, elemento, analisis, fecha ) => {

    const resp = await instance.get(`/fileupload/download/${ id }`, { responseType: 'blob' });

    // create file link in browser's memory
    const href = URL.createObjectURL(resp.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', `${nombre}_${oferta}_${elemento}_${analisis}_${fecha}.pdf`); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);

}

export const bajarPdfNoFQ = async ( id, nombre, oferta, elemento, analisis, fecha ) => {

    const resp = await instance.get(`/fileupload/download/${ id }`, { responseType: 'blob' });

    // create file link in browser's memory
    const href = URL.createObjectURL(resp.data);
    
    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', `${nombre}_${oferta}_${elemento}_${analisis}_${fecha}.pdf`); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);

}

export const subirPdf = async ( id, archivo ) => {

    const formData = new FormData();

    formData.append('file', archivo);
    
    const resp = await instance.post(`/FileUpload/upload/pdf/${id}`, formData);
    return resp;
    
}