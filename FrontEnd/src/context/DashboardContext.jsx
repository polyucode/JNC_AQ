import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { getAnalisisId, getElementoPorId, getValorParametros, getParametrosAnalisisPlanta, getElementoPlantaPorId, getElementosPlanta, getConfNivelesPlantasCliente, bajarPdfNoFQ, getParametrosElementoPlantaCliente, bajarPdfDashBoard, bajarPdfInstrucciones, getFicheros } from "../api";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthContext";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {

    const [parametrosAnalisis, setParametrosAnalisis] = useState([]);

    const [listaPlantaFiltrada, setListaPlantaFiltrada] = useState([]);
    const [listaParametros, setListaParametros] = useState([]);
    const [valoresParametros, setValoresParametros] = useState([]);
    const [valoresParametrosNoFQ, setValoresParametrosNoFQ] = useState([]);
    const [analisisParametros, setAnalisisParametros] = useState([]);

    const [ficherosAll, setFicheros] = useState([]);

    const [parametrosFiltrados, setParametrosFiltrados] = useState([]);
    const [parametrosFiltradosNoFQ, setParametrosFiltradosNoFQ] = useState([]);
    const [parametrosPlantaCliente, setParametrosPlantaCliente] = useState([]);

    // Valores activos
    const [elementoActivo, setElementoActivo] = useState({});
    const [parametroActivo, setParametroActivo] = useState({});
    const [analisisActivo, setAnalisisActivo] = useState({});

    // Valores generales para punto 15 bloque 6
    const [elementosGeneral, setElementosGeneral] = useState({});

    const { user } = useContext(AuthContext);

    /*** EFECTOS ***/

    const GetParametrosAnalisisPlanta = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setParametrosAnalisis(resp.filter(param => !param.deleted));

    }

    const GetFicheros = async () => {

        const resp = await getFicheros();
        setFicheros(resp.filter(param => !param.deleted));

    }

    const GetValoresParametros = async () => {

        const resp = await getValorParametros();
        setListaParametros(resp.filter(valor => !valor.deleted));

    }

    const GetParametrosElementoPlanta = async () => {

        const resp = await getParametrosElementoPlantaCliente();
        setParametrosPlantaCliente(resp.filter(param => !param.deleted));
    }

    /*** FUNCIONES ***/

    const handleSeleccionarElemento = async (id) => {

        const elemento = await getElementoPlantaPorId(id);

        if (elemento.descripcion !== null) {
            setElementoActivo(prev => ({ ...prev, nombre: elemento.nombre + ' ' + elemento.descripcion, id }));
        } else {
            setElementoActivo(prev => ({ ...prev, nombre: elemento.nombre + ' ' + elemento.numero, id }));
        }

        setValoresParametros(listaParametros.filter(param => param.id_Elemento === id));
        setValoresParametrosNoFQ(parametrosAnalisis.filter(param => param.elemento === id));

        //parametros Analisisi Ordenados por fecha descendente 
        setParametrosFiltrados(parametrosAnalisis
            .filter(an => an.elemento === id)
            .sort((a, b) => {
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

    //AMF INI MODIFICACION PUNTO 15

    const handleCargarTodosElementosPlanta = async (idPlanta, oferta) => {
        if (idPlanta === undefined || oferta === undefined) {
            setElementosGeneral({});
            return;
        }
        const elementosTodos = await getElementosPlanta();
        let confElementosPlanta = await getConfNivelesPlantasCliente();
        let result = [];
        if (user.idPerfil === 4) {
            confElementosPlanta = confElementosPlanta.filter(elm => elm.oferta === oferta && elm.id_Planta === idPlanta && !elm.deleted);
            confElementosPlanta.map((element, index) => {
                let elementoFiltrado = elementosTodos.find(elm => elm.id === element.id_Elemento && elm.verInsp && !elm.deleted);
                if(elementoFiltrado != undefined){
                    result.push(elementoFiltrado);
                }
            });
        } else {
            confElementosPlanta = confElementosPlanta.filter(elm => elm.oferta === oferta && elm.id_Planta === idPlanta && !elm.deleted);
            confElementosPlanta.map((element, index) => {
                let elementoFiltrado = elementosTodos.find(elm => elm.id === element.id_Elemento && !elm.deleted);
                result.push(elementoFiltrado);
            });
        }

        setElementosGeneral(result);

    }

    const GetParametrosFiltradosSinSeleccionarElemento = (id) => {
        setValoresParametros(listaParametros.filter(param => param.id_Elemento === id));
        setValoresParametrosNoFQ(parametrosAnalisis.filter(param => param.elemento === id));

        //parametros Analisisi Ordenados por fecha descendente 
        setParametrosFiltrados(parametrosAnalisis
            .filter(an => an.elemento === id)
            // .sort((a,b) => {
            //     const valorA = new Date(a.fecha);
            //     const valorB = new Date(b.fecha);

            //     if (valorA < valorB) {
            //         return parametrosAnalisis ? 1 : -1;
            //     }
            //     if (valorA > valorB) {
            //         return parametrosAnalisis ? -1 : 1;                    
            //     }
            // }
        )
            ;
    }
    //AMF FIN

    const handleSeleccionarAnalisis = async (id) => {

        const analisi = await getAnalisisId(id);
        setAnalisisActivo(prev => ({ ...prev, nombre: analisi.nombre, tipo: analisi.tipo, id }));
        setAnalisisParametros(valoresParametros.filter(param => param.id_Analisis === id));
        setParametrosFiltradosNoFQ(valoresParametrosNoFQ.filter(param => param.analisis === id));
        setListaPlantaFiltrada(parametrosPlantaCliente.filter(param => param.id_Analisis === id))

    }

    const descargarPdf = async (id, fecha) => {

        const analisi = await getAnalisisId(id);

        const date = new Date(fecha);
        // Obtener el año, mes y día
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
        const day = String(date.getDate()).padStart(2, '0');

        // Formatear la fecha en YYYY-MM-DD
        const formattedDate = `${year}-${month}-${day}`;

        const tarea = valoresParametrosNoFQ.filter(param => {
            // Extraer solo la parte de la fecha (YYYY-MM-DD) del registro
            const recordDate = param.fecha.split('T')[0];
            return param.analisis === id && recordDate === formattedDate;
        })[0];

        const fichero = ficherosAll.filter(fich => fich.id === tarea.pdf)[0]
        if (fichero !== null && fichero !== undefined) {
            await bajarPdfDashBoard(fichero.id, fichero.name, { headers: { 'Content-type': 'application/pdf' } })
        } else {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Pdf no encontrado',
                text: `Esta tarea no tiene ningún pdf adjunto`,
                showConfirmButton: true
            });
        }
    }

    const handleSeleccionarParametro = (datos) => {
        setParametroActivo(datos);
    }

    return (
        <DashboardContext.Provider value={{
            elementoActivo,
            elementosGeneral,
            parametroActivo,
            analisisActivo,
            parametrosFiltrados,
            valoresParametros,
            analisisParametros,
            setAnalisisActivo,
            setElementoActivo,
            handleSeleccionarElemento,
            handleCargarTodosElementosPlanta,
            handleSeleccionarParametro,
            handleSeleccionarAnalisis,
            GetParametrosAnalisisPlanta,
            GetValoresParametros,
            GetParametrosElementoPlanta,
            valoresParametrosNoFQ,
            parametrosFiltradosNoFQ,
            parametrosAnalisis,
            listaPlantaFiltrada,
            GetParametrosFiltradosSinSeleccionarElemento,
            descargarPdf,
            ficherosAll,
            GetFicheros
        }}>
            {children}
        </DashboardContext.Provider>
    )
}