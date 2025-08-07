import { instance } from '.';


export const renombrarCarpeta = async (path, oldName, newName) =>{

    const encodedPath = path ? encodeURI(path) : "root";  // Usamos "root" como valor especial si el path está vacío
    const resp = await instance.post(`/fileupload/ChangeFolderName/${encodedPath}/${encodeURI(oldName)}/${encodeURI(newName)}`);
    return resp;
}

export const crearCarpeta = async (path, folderName) =>{

    const resp = await instance.post(`/fileupload/CreateNewFolder/${encodeURI(path)}/${folderName}`);
    return resp;
}

export const borrarCarpeta = async (path) =>{

    const resp = await instance.post(`/fileupload/DeleteFolder/${encodeURI(path)}`);
    return resp;
}

export const subirFichero = async (path, fileName,file) =>{
    const formData = new FormData();

    formData.append('file', file);
    const resp = await instance.post(`/fileupload/UploadFile/${encodeURI(path)}/${fileName}`, formData);
    return resp;
}

export const borrarArchivo = async (path, fileName) =>{

    const resp = await instance.post(`/fileupload/DeleteFile/${encodeURI(path)}/${fileName}`);
    return resp;
}

