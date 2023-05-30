import { useEffect, useState } from "react";
import { createContext } from "react";
import { getAnalisisId, getElementoPorId, getValorParametros } from "../api";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {

    const [listaParametros, setListaParametros] = useState([]);
    const [valoresParametros, setValoresParametros] = useState([]);

    // Valores activos
    const [elementoActivo, setElementoActivo] = useState({});
    const [parametroActivo, setParametroActivo] = useState({});
    const [analisisActivo, setAnalisisActivo] = useState({});

    /*** EFECTOS ***/

    // Obtenemos todos los parámetros
    useEffect(() => {

        getValorParametros()
            .then( resp => setListaParametros( resp ));

    },[]);

    /*** FUNCIONES ***/

    const handleSeleccionarElemento = async ( id ) => {

        console.log('Elemento del diagrama seleccionado: ' + id );
        
        const elemento = await getElementoPorId( id );
        console.log( elementoActivo );

        setElementoActivo( prev => ({ ...prev, nombre: elemento.nombre+' '+elemento.numero, id }));
        setValoresParametros(listaParametros.filter( param => param.id_Elemento === id ));

    }

    const handleSeleccionarAnalisis = async ( id ) => {
        
        const analisi = await getAnalisisId( id );

        setAnalisisActivo( prev => ({ ...prev, nombre: analisi.nombre , id }));
        //setValoresParametros(listaParametros.filter( param => param.id_Elemento === id ));

    }

    const handleSeleccionarParametro = (datos) => {

        setParametroActivo( datos );

    }

    return (
        <DashboardContext.Provider value={{
            elementoActivo,
            parametroActivo,
            analisisActivo,
            valoresParametros,
            handleSeleccionarElemento,
            handleSeleccionarParametro,
            handleSeleccionarAnalisis
        }}>
            { children }
        </DashboardContext.Provider>
    )
}