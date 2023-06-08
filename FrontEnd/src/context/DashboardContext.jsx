import { useEffect, useState } from "react";
import { createContext } from "react";
import { getAnalisisId, getElementoPorId, getValorParametros, getParametrosAnalisisPlanta } from "../api";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {

    const [parametrosAnalisis, setParametrosAnalisis] = useState([]);

    const [listaParametros, setListaParametros] = useState([]);
    const [valoresParametros, setValoresParametros] = useState([]);
    const [analisisParametros, setAnalisisParametros] = useState([]);

    const [parametrosFiltrados, setParametrosFiltrados] = useState([]);

    // Valores activos
    const [elementoActivo, setElementoActivo] = useState({});
    const [parametroActivo, setParametroActivo] = useState({});
    const [analisisActivo, setAnalisisActivo] = useState({});

    /*** EFECTOS ***/

    // Obtenemos todos los parámetros
    useEffect(() => {

        getValorParametros()
            .then(resp => setListaParametros(resp));

        getParametrosAnalisisPlanta()
            .then(resp => setParametrosAnalisis(resp));

    }, []);

    /*** FUNCIONES ***/

    const handleSeleccionarElemento = async (id) => {

        console.log('Elemento del diagrama seleccionado: ' + id);

        const elemento = await getElementoPorId(id);
        console.log(elementoActivo);

        setElementoActivo(prev => ({ ...prev, nombre: elemento.nombre + ' ' + elemento.numero, id }));
        setValoresParametros(listaParametros.filter(param => param.id_Elemento === id));

        setParametrosFiltrados(parametrosAnalisis.filter(an => an.elemento === id));

        setAnalisisActivo({})

    }

    const handleSeleccionarAnalisis = async (id) => {

        const analisi = await getAnalisisId(id);

        setAnalisisActivo(prev => ({ ...prev, nombre: analisi.nombre, id }));
        setAnalisisParametros(valoresParametros.filter(param => param.id_Analisis === id));

    }

    const handleSeleccionarParametro = (datos) => {

        setParametroActivo(datos);

    }

    return (
        <DashboardContext.Provider value={{
            elementoActivo,
            parametroActivo,
            analisisActivo,
            parametrosFiltrados,
            valoresParametros,
            analisisParametros,
            setAnalisisActivo,
            setElementoActivo,
            handleSeleccionarElemento,
            handleSeleccionarParametro,
            handleSeleccionarAnalisis
        }}>
            {children}
        </DashboardContext.Provider>
    )
}