import { useState, useEffect } from 'react';

let usuarioLocalStorage = localStorage.getItem('usuarioActual');

if( usuarioLocalStorage === null ) {

    usuarioLocalStorage = {
        activo: false,
        addDate: null,
        addIdUser: null,
        apellidos: '',
        delDate: null,
        delIdUser: null,
        deleted: null,
        firma: null,
        id: null,
        idCliente: null,
        idPerfil: null,
        login: '',
        modDate: null,
        modIdUser: null,
        nombre: '',
        password: '',
        telefono: '',
        usuario: ''
    }
    
} else {

    usuarioLocalStorage = JSON.parse( localStorage.getItem('usuarioActual') );
}

export const useUsuarioActual = () => {

    const [ usuarioActual, setUsuarioActual ] = useState( usuarioLocalStorage );
    
    console.log( usuarioActual );

    return {
        //* Propiedades
        usuarioActual,

        //* Métodos
    }
}