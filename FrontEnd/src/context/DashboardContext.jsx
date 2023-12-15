import { useEffect, useState } from "react";
import { createContext } from "react";
import { getAnalisisId, getElementoPorId, getValorParametros, getParametrosAnalisisPlanta, getElementoPlantaPorId } from "../api";

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

    const GetParametrosAnalisisPlanta = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setParametrosAnalisis(resp);

    }

    const GetValoresParametros = async () => {

        const resp = await getValorParametros();
        setListaParametros(resp);

    }

    /*** FUNCIONES ***/

    const handleSeleccionarElemento = async (id) => {

        const elemento = await getElementoPlantaPorId(id);

        if(elemento.descripcion !== null){
            setElementoActivo(prev => ({ ...prev, nombre: elemento.nombre + ' ' + elemento.descripcion, id }));
        }else{
            setElementoActivo(prev => ({ ...prev, nombre: elemento.nombre + ' ' + elemento.numero, id }));
        }
        
        setValoresParametros(listaParametros.filter(param => param.id_Elemento === id));

        //parametros Analisisi Ordenados por fecha descendente 
        setParametrosFiltrados(parametrosAnalisis
            .filter(an => an.elemento === id)
            .sort((a,b) => {
                const valorA = new Date(a.fecha);
                const valorB = new Date(b.fecha);

                if (valorA < valorB) {
                    return parametrosAnalisis ? 1 : -1;
                }
                if (valorA > valorB) {
                    return parametrosAnalisis ? -1 : 1;                    
                }
            }
            )
        );

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
            handleSeleccionarAnalisis,
            GetParametrosAnalisisPlanta,
            GetValoresParametros
        }}>
            {children}
        </DashboardContext.Provider>
    )
}