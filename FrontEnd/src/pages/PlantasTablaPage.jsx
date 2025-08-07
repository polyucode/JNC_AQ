import React, { useState, useEffect } from 'react';
import { Autocomplete, Button, Card, Grid, TableContainer, TextField, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { MainLayout } from "../layout/MainLayout";
import TaskIcon from '@mui/icons-material/Task';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { LineaParametro } from '../components/LineaParametro';
import Swal from 'sweetalert2';
import {
    getParametrosElementoPlantaCliente, getParametrosElementoPlantaClienteConFiltros, postValorParametros,
    getConfNivelesPlantasCliente, getOfertas, getParametros, getAnalisisNivelesPlantasCliente, getAnalisis, getClientes, putParametrosElementoPlantaCliente, 
    postParametrosElementoPlantaCliente, getValorParametros, getElementosPlanta, putValorParametros
} from '../api';

export const PlantasTablaPage = () => {

    /*** VARIABLES ***/
    let opcionesFiltradas = [];
    let opcionesFiltradasAnalisis = [];
    let opcionesNombreFiltradasAnalisis = [];

    /*** ESTADOS ***/
    const [confNivelesPlantasCliente, setConfNivelesPlantasCliente] = useState([]);
    const [confAnalisisNivelesPlantasCliente, setConfAnalisisNivelesPlantasCliente] = useState([]);
    const [oferta, setOferta] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [elementos, setElementos] = useState([]);
    const [analisis, setAnalisis] = useState([]);
    const [parametros, setParametros] = useState([]);
    const [elementosAutocomplete, setElementosAutocomplete] = useState([]);
    const [analisisAutocomplete, setAnalisisAutocomplete] = useState([]);
    const [parametrosElementoPlanta, setParametrosElementoPlanta] = useState([]);
    const [tipoParametros, setTipoParametros] = useState([]);
    const [parametrosSeleccionado, setParametrosSeleccionado] = useState({
        id: 0,
        codigoCliente: '',
        nombreCliente: "",
        oferta: '',
        idElemento: 0,
        nombreElemento: "",
        idAnalisis: 0,
        nombreAnalisis: "",
        fecha: null,
        esPlantilla: false,
        ComptadorLimInf: 0,
        ComptadorLimSup: 0,
        ComptadorUnidades: "",
        ComptadorActivo: false,
        ComptadorVerInspector: false,
        pHLimInf: 0,
        pHLimSup: 0,
        pHUnidades: "",
        pHActivo: false,
        pHVerInspector: false,
        TemperaturaLimInf: 0,
        TemperaturaLimSup: 0,
        TemperaturaUnidades: "",
        TemperaturaActivo: false,
        TemperaturaVerInspector: false,
        ConductivitatLimInf: 0,
        ConductivitatLimSup: 0,
        ConductivitatUnidades: "",
        ConductivitatActivo: false,
        ConductivitatVerInspector: false,
        TDSLimInf: 0,
        TDSLimSup: 0,
        TDSUnidades: "",
        TDSActivo: false,
        TDSVerInspector: false,
        AlcalinitatMLimInf: 0,
        AlcalinitatMLimSup: 0,
        AlcalinitatMUnidades: "",
        AlcalinitatMActivo: false,
        AlcalinitatMVerInspector: false,
        AlcalinitatPLimInf: 0,
        AlcalinitatPLimSup: 0,
        AlcalinitatPUnidades: "",
        AlcalinitatPActivo: false,
        AlcalinitatPVerInspector: false,
        DuresaCalcicaLimInf: 0,
        DuresaCalcicaLimSup: 0,
        DuresaCalcicaUnidades: "",
        DuresaCalcicaActivo: false,
        DuresaCalcicaVerInspector: false,
        DuresaTotalLimInf: 0,
        DuresaTotalLimSup: 0,
        DuresaTotalUnidades: "",
        DuresaTotalActivo: false,
        DuresaTotalVerInspector: false,
        TerbolesaLimInf: 0,
        TerbolesaLimSup: 0,
        TerbolesaUnidades: "",
        TerbolesaActivo: false,
        TerbolesaVerInspector: false,
        FeLimInf: 0,
        FeLimSup: 0,
        FeUnidades: "",
        FeActivo: false,
        FeVerInspector: false,
        ClorursLimInf: 0,
        ClorursLimSup: 0,
        ClorursUnidades: "",
        ClorursActivo: false,
        ClorursVerInspector: false,
        SulfatsLimInf: 0,
        SulfatsLimSup: 0,
        SulfatsUnidades: "",
        SulfatsActivo: false,
        SulfatsVerInspector: false,
        SilicatsLimInf: 0,
        SilicatsLimSup: 0,
        SilicatsUnidades: "",
        SilicatsActivo: false,
        SilicatsVerInspector: false,
        ClorLliureLimInf: 0,
        ClorLliureLimSup: 0,
        ClorLliureUnidades: "",
        ClorLliureActivo: false,
        ClorLliureVerInspector: false,
        ClorTotalLimInf: 0,
        ClorTotalLimSup: 0,
        ClorTotalUnidades: "",
        ClorTotalActivo: false,
        ClorTotalVerInspector: false,
        BromLimInf: 0,
        BromLimSup: 0,
        BromUnidades: "",
        BromActivo: false,
        BromVerInspector: false,
        SulfitsLimInf: 0,
        SulfitsLimSup: 0,
        SulfitsUnidades: "",
        SulfitsActivo: false,
        SulfitsVerInspector: false,
        OrtofosfatsPO4LimInf: 0,
        OrtofosfatsPO4LimSup: 0,
        OrtofosfatsPO4Unidades: "",
        OrtofosfatsPO4Activo: false,
        OrtofosfatsPO4VerInspector: false,
        MoO4LimInf: 0,
        MoO4LimSup: 0,
        MoO4Unidades: "",
        MoO4Activo: false,
        MoO4VerInspector: false,
        IsotiazolonaLimInf: 0,
        IsotiazolonaLimSup: 0,
        IsotiazolonaUnidades: "",
        IsotiazolonaActivo: false,
        IsotiazolonaVerInspector: false,
        AquaproxAB5310LimInf: 0,
        AquaproxAB5310LimSup: 0,
        AquaproxAB5310Unidades: "",
        AquaproxAB5310Activo: false,
        AquaproxAB5310VerInspector: false,
        BiopolLB5LimInf: 0,
        BiopolLB5LimSup: 0,
        BiopolLB5Unidades: "",
        BiopolLB5Activo: false,
        BiopolLB5VerInspector: false,
        MefacideLGLimInf: 0,
        MefacideLGLimSup: 0,
        MefacideLGUnidades: "",
        MefacideLGActivo: false,
        MefacideLGVerInspector: false,
        BiopolIB200LimInf: 0,
        BiopolIB200LimSup: 0,
        BiopolIB200Unidades: "",
        BiopolIB200Activo: false,
        BiopolIB200VerInspector: false,
        Campo1Nombre: "",
        Campo1LimInf: 0,
        Campo1LimSup: 0,
        Campo1Unidades: "",
        Campo1Activo: false,
        Campo1VerInspector: false,
        Campo2Nombre: "",
        Campo2LimInf: 0,
        Campo2LimSup: 0,
        Campo2Unidades: "",
        Campo2Activo: false,
        Campo2VerInspector: false,
        Campo3Nombre: "",
        Campo3LimInf: 0,
        Campo3LimSup: 0,
        Campo3Unidades: "",
        Campo3Activo: false,
        Campo3VerInspector: false,
        Campo4Nombre: "",
        Campo4LimInf: 0,
        Campo4LimSup: 0,
        Campo4Unidades: "",
        Campo4Activo: false,
        Campo4VerInspector: false,
        Campo5Nombre: "",
        Campo5LimInf: 0,
        Campo5LimSup: 0,
        Campo5Unidades: "",
        Campo5Activo: false,
        Campo5VerInspector: false,
        Campo6Nombre: "",
        Campo6LimInf: 0,
        Campo6LimSup: 0,
        Campo6Unidades: "",
        Campo6Activo: false,
        Campo6VerInspector: false,
        Campo7Nombre: "",
        Campo7LimInf: 0,
        Campo7LimSup: 0,
        Campo7Unidades: "",
        Campo7Activo: false,
        Campo7VerInspector: false,
        Campo8Nombre: "",
        Campo8LimInf: 0,
        Campo8LimSup: 0,
        Campo8Unidades: "",
        Campo8Activo: false,
        Campo8VerInspector: false,
    });

    const [valoresParametros, setValoresParametros] = useState([]);

    const [parametrosFiltrados, setParametrosFiltrados] = useState([]);

    const [abroPlantilla, setAbroPlantilla] = useState(false);
    const [key, setKey] = useState(0);

    const [inputCodigoCliente, setInputCodigoCliente] = useState('');
    const [inputNombreCliente, setInputNombreCliente] = useState('');

    // Peticiones al backend
    useEffect(() => {

        getClientes()
            .then(resp => setClientes(resp.filter(cliente => !cliente.deleted)));

        getOfertas()
            .then(resp => setOferta(resp.filter(oferta => !oferta.deleted)));

        getElementosPlanta()
            .then(resp => setElementos(resp.filter(elemento => !elemento.deleted)));

        getParametros()     
            .then(resp => setParametros(resp.filter(param => !param.deleted)));

        getAnalisis()
            .then(resp => setAnalisis(resp.filter(an => !an.deleted)));

        getConfNivelesPlantasCliente()
            .then(resp => setConfNivelesPlantasCliente(resp.filter(nivel => !nivel.deleted)));

        getAnalisisNivelesPlantasCliente()
            .then(resp => setConfAnalisisNivelesPlantasCliente(resp.filter(an => !an.deleted)));

        GetValorParametros();

        GetParametrosElementoPlantaCliente();
    }, []);

    // Efecto para preparar el listado de elementos en el autocompletado
    useEffect(() => {

        opcionesFiltradas = [];

        const lista = confNivelesPlantasCliente.filter(planta => planta.codigoCliente === parametrosSeleccionado.codigoCliente && planta.oferta === parametrosSeleccionado.oferta);
        lista.map(elemento => {
            opcionesFiltradas.push(elementos.filter(elem => elem.id === elemento.id_Elemento)[0]);
        });

        setElementosAutocomplete(opcionesFiltradas);

    }, [parametrosSeleccionado.codigoCliente, parametrosSeleccionado.oferta, confNivelesPlantasCliente]);

    useEffect(() => {

        opcionesFiltradasAnalisis = [];
        opcionesNombreFiltradasAnalisis = [];

        const lista = confNivelesPlantasCliente.filter(planta => planta.codigoCliente === parametrosSeleccionado.codigoCliente && planta.oferta === parametrosSeleccionado.oferta && planta.id_Elemento === parametrosSeleccionado.idElemento);

        lista.map(analisis => {
            opcionesFiltradasAnalisis.push(confAnalisisNivelesPlantasCliente.filter(anal => anal.id_NivelesPlanta === analisis.id && !anal.deleted));
        })

        opcionesFiltradasAnalisis.map(nomAnalisis => {
            nomAnalisis.map(anal => {
                opcionesNombreFiltradasAnalisis.push(analisis.filter(an => an.id === anal.id_Analisis)[0])
            })
        })

        setAnalisisAutocomplete(opcionesNombreFiltradasAnalisis)

    }, [parametrosSeleccionado.idElemento])

    useEffect(() => {
        setTipoParametros(parametros.map(parametro => ({ id: parametro.id, nombre: parametro.nombre, limInf: 0, limSup: 0, unidades: parametro.unidad, activo: false, verInspector: false, esCalculado: parametro.esCalculado })))
    }, [parametros]);

    useEffect(() => {
        if (parametrosFiltrados.length > 0) {
            setAbroPlantilla(true)
        }
    }, [parametrosFiltrados])

    const GetParametrosElementoPlantaCliente = async () => {
        const resp = await getParametrosElementoPlantaCliente();
        const parametrosFiltrados = resp.filter(valor => !valor.deleted)
        setParametrosElementoPlanta(parametrosFiltrados);
    }

    const GetValorParametros = async () => {
        const resp = await getValorParametros();
        setValoresParametros(resp);
    }

    /*** FUNCIONES ***/

    const normalizeDecimal = (value) => {
        if (typeof value !== 'string') {
            value = String(value);
        }

        return value.replace('.', ',');
    };

    const handleLimitInferior = (e) => {

        // Extraemos los datos necesarios
        const { name, value } = e.target;

        const normalizedValue = normalizeDecimal(value);

        // Seteamos el estado recorriendo los valores hasta encontrar la linea correcta
        setTipoParametros(prev => (prev.map(parametro => {

            if (name === parametro.nombre) {
                return { ...parametro, limInf: normalizedValue };
            } else {
                return parametro;
            }

        })));

    }

    const handleLimitSuperior = (e) => {

        // Extraemos los datos necesarios
        const { name, value } = e.target;

        const normalizedValue = normalizeDecimal(value);

        // Seteamos el estado recorriendo los valores hasta encontrar la linea correcta
        setTipoParametros(prev => (prev.map(parametro => {

            if (name === parametro.nombre) {
                return { ...parametro, limSup: normalizedValue };
            } else {
                return parametro;
            }

        })));

    }

    const handleUnidad = (e) => {

        // Extraemos los datos necesarios
        const { name, value } = e.target;

        // Seteamos el estado recorriendo los valores hasta encontrar la linea correcta
        setTipoParametros(prev => (prev.map(parametro => {

            if (name === parametro.nombre) {
                return { ...parametro, unidades: value };
            } else {
                return parametro;
            }

        })));

    }

    const handleActivo = (e) => {

        // Extraemos los datos necesarios
        const { name, checked } = e.target;

        // Seteamos el estado recorriendo los valores hasta encontrar la linea correcta
        setTipoParametros(prev => (
            prev.map(parametro => {
                if (name === parametro.nombre) {
                    return { ...parametro, activo: checked, verInspector: checked }; // Activa "Ver Inspector" al activar "Activo"
                } else {
                    return parametro;
                }
            })
        ));
    }

    //AMF INI handleActivo para los elementos calculados


    const handleVerInspector = (e) => {

        // Extraemos los datos necesarios
        const { name, checked } = e.target;

        // Seteamos el estado recorriendo los valores hasta encontrar la linea correcta
        setTipoParametros(prev => (prev.map(parametro => {

            if (name === parametro.nombre) {
                return { ...parametro, verInspector: checked };
            } else {
                return parametro;
            }

        })));

    }

    async function valorParametros() {

        tipoParametros.map((parametro) => {
            if (parametro.activo === true) {
                const param2 = {
                    id: 0,
                    CodigoCliente: parametrosSeleccionado.codigoCliente,
                    Referencia: "",
                    Oferta: parametrosSeleccionado.oferta,
                    Id_Elemento: parametrosSeleccionado.idElemento,
                    Id_Analisis: parametrosSeleccionado.idAnalisis,
                    Parametro: parametro.id,
                    Fecha: null,
                    Valor: "",
                    Unidad: parametro.unidades,
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null
                }
                const valorFiltradoActivar = valoresParametros.filter(valor => valor.codigoCliente === param2.CodigoCliente && valor.oferta === param2.Oferta && valor.id_Elemento === param2.Id_Elemento && valor.id_Analisis === param2.Id_Analisis && valor.parametro === param2.Parametro && valor.fecha === null && valor.deleted === true)
                if(valorFiltradoActivar.length >= 1){
                    valorFiltradoActivar[0].deleted = false;
                    const resp = putValorParametros(valorFiltradoActivar[0])
                    return resp
                }
                const valorFiltrado = valoresParametros.filter(valor => valor.codigoCliente === param2.CodigoCliente && valor.oferta === param2.Oferta && valor.id_Elemento === param2.Id_Elemento && valor.id_Analisis === param2.Id_Analisis && valor.parametro === param2.Parametro && valor.fecha === null)
                if (valorFiltrado.length === 0) {
                    const resp = postValorParametros(param2);
                    return resp;
                }
            } else{
                const param2 = {
                    id: 0,
                    CodigoCliente: parametrosSeleccionado.codigoCliente,
                    Referencia: "",
                    Oferta: parametrosSeleccionado.oferta,
                    Id_Elemento: parametrosSeleccionado.idElemento,
                    Id_Analisis: parametrosSeleccionado.idAnalisis,
                    Parametro: parametro.id,
                    Fecha: null,
                    Valor: "",
                    Unidad: parametro.unidades,
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null
                }

                const valorFiltrado = valoresParametros.filter(valor => valor.codigoCliente === param2.CodigoCliente && valor.oferta === param2.Oferta && valor.id_Elemento === param2.Id_Elemento && valor.id_Analisis === param2.Id_Analisis && valor.parametro === param2.Parametro && valor.fecha === null)
                if(valorFiltrado.length >= 1){
                    valorFiltrado[0].deleted = true;
                    const resp = putValorParametros(valorFiltrado[0])
                    return resp
                }
            }
        })
    }

    const abrirPlantilla = async () => {

        setAbroPlantilla(false)
        const resp = await getParametrosElementoPlantaClienteConFiltros(parametrosSeleccionado.codigoCliente, parametrosSeleccionado.oferta, parametrosSeleccionado.idElemento, parametrosSeleccionado.idAnalisis);
        const datosMapeados = tipoParametros.map(datos => {
            // Obtenemos el índice del elemeto actual, para poder obtener su nombre luego
            const elementoEncontrado = resp.find(param => param.parametro === datos.id);
            if(!elementoEncontrado){
                return {
                    dbId: 0,
                    id: datos.id,
                    nombre: datos.nombre,
                    limInf: datos.limInf,
                    limSup: datos.limSup,
                    unidades: datos.unidades,
                    activo: datos.activo,
                    verInspector: datos.verInspector,
                }
            } 
            else{
                return {
                    dbId: elementoEncontrado.id,
                    id: elementoEncontrado.parametro,
                    nombre: datos.nombre,
                    limInf: elementoEncontrado.limInf,
                    limSup: elementoEncontrado.limSup,
                    unidades: elementoEncontrado.unidades,
                    activo: elementoEncontrado.activo,
                    verInspector: elementoEncontrado.verInspector,
                }
            }

        });

        const datosOrdenados = datosMapeados.sort((a, b) => a.id - b.id);

        // Una vez mapeado, seteamos los datos en el estado
        setTipoParametros([...datosOrdenados]);

    }

    const guardarPlantilla = async () => {

        valorParametros()
        const resp2 = await getParametrosElementoPlantaClienteConFiltros(parametrosSeleccionado.codigoCliente, parametrosSeleccionado.oferta, parametrosSeleccionado.idElemento, parametrosSeleccionado.idAnalisis);

        if (resp2.length > 0) {
            const resp = tipoParametros.map(async (parametro) => {
                const param = {
                    id: 0,
                    Parametro: parametro.id,
                    CodigoCliente: parametrosSeleccionado.codigoCliente,
                    NombreCliente: parametrosSeleccionado.nombreCliente,
                    Oferta: parametrosSeleccionado.oferta,
                    Id_Elemento: parametrosSeleccionado.idElemento,
                    Id_Analisis: parametrosSeleccionado.idAnalisis,
                    EsPlantilla: true,
                    LimInf: parametro.limInf !== 0 ? parseFloat(typeof parametro.limInf === 'string' ? parametro.limInf.replace(',', '.') : parametro.limInf) : 0,
                    LimSup: parametro.limSup !== 0 ? parseFloat(typeof parametro.limSup === 'string' ? parametro.limSup.replace(',', '.') : parametro.limSup) : 0,
                    Unidades: parametro.unidades,
                    Activo: parametro.activo,
                    VerInspector: parametro.verInspector,
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null
                }

                const registro = resp2.find(item => item.parametro === parametro.id)
                if(registro !== undefined){
                    param.id = registro.id
                    await putParametrosElementoPlantaCliente(param)
                } else{
                    await postParametrosElementoPlantaCliente(param)
                }                            
            })

            if (resp) {

                GetParametrosElementoPlantaCliente();
                GetValorParametros();

                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'Parámetros guardados',
                    text: `Los parámetros del elemento han sido guardados`,
                    showConfirmButton: false,
                    timer: 2000,
                    showClass: {
                        popup: 'animate__animated animate__bounceIn'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__bounceOut'
                    }
                });

            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al guardar',
                    text: `Error al guardar los parametros del elemento`,
                    showConfirmButton: false,
                    timer: 2000,
                    showClass: {
                        popup: 'animate__animated animate__bounceIn'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__bounceOut'
                    }
                });
            }
        } else {

            const resp = tipoParametros.map(async (parametro) => {

                const param = {
                    Parametro: parametro.id,
                    CodigoCliente: parametrosSeleccionado.codigoCliente,
                    NombreCliente: parametrosSeleccionado.nombreCliente,
                    Oferta: parametrosSeleccionado.oferta,
                    Id_Elemento: parametrosSeleccionado.idElemento,
                    Id_Analisis: parametrosSeleccionado.idAnalisis,
                    EsPlantilla: true,
                    LimInf: parametro.limInf !== 0 ? parseFloat(typeof parametro.limInf === 'string' ? parametro.limInf.replace(',', '.') : parametro.limInf) : 0,
                    LimSup: parametro.limSup !== 0 ? parseFloat(typeof parametro.limSup === 'string' ? parametro.limSup.replace(',', '.') : parametro.limSup) : 0,
                    Unidades: parametro.unidades,
                    Activo: parametro.activo,
                    VerInspector: parametro.verInspector,
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null
                }

                await postParametrosElementoPlantaCliente(param);
            })

            if (resp) {

                GetParametrosElementoPlantaCliente();
                GetValorParametros();

                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'Parámetros guardados',
                    text: `Los parámetros del elemento han sido guardados`,
                    showConfirmButton: false,
                    timer: 2000,
                    showClass: {
                        popup: 'animate__animated animate__bounceIn'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__bounceOut'
                    }
                });

            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al guardar',
                    text: `Error al guardar los parametros del elemento`,
                    showConfirmButton: false,
                    timer: 2000,
                    showClass: {
                        popup: 'animate__animated animate__bounceIn'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__bounceOut'
                    }
                });
            }
        }
    }

    const onChangeAnalisis = (e, value, name) => {

        if (e.target.innerText !== "") {
            setParametrosFiltrados(parametrosElementoPlanta.filter(parametro => parametro.codigoCliente === parametrosSeleccionado.codigoCliente && parametro.oferta === parametrosSeleccionado.oferta && parametro.id_Elemento === parametrosSeleccionado.idElemento && parametro.id_Analisis === value.id))
        }

        setParametrosSeleccionado(prevState => ({
            ...prevState,
            idAnalisis: value.id,
            nombreAnalisis: e.target.innerText
        }))
    }

    const onChangeElemento = (e, value, name) => {

        setParametrosSeleccionado(prevState => ({
            ...prevState,
            idElemento: value.id,
            nombreElemento: e.target.innerText,
            idAnalisis: 0,
            nombreAnalisis: ""
        }))

        setParametrosFiltrados([])

        setKey(key + 1)
    }

    function filtrarCodigoCliente(cliente) {
        if (!cliente.deleted) {
            if (inputCodigoCliente === '') {
                return true;
            } else {
                if (cliente.codigo?.toString().indexOf(inputCodigoCliente) >= 0) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }

    function filtrarNombreCliente(cliente) {
        if (!cliente.deleted) {
            if (inputNombreCliente === '') {
                return true;
            } else {
                const nombreClienteLowerCase = cliente.razonSocial ? cliente.razonSocial.toString().toLowerCase() : '';
                const inputNombreClienteLowerCase = inputNombreCliente.toLowerCase();
                return nombreClienteLowerCase.includes(inputNombreClienteLowerCase);
            }
        } else {
            return false;
        }
    }

    return (
        <MainLayout title="Parametrización de planta">
            <Grid container spacing={2}>
                {/* SELECCIÓN DE CLIENTE Y OFERTA */}
                <Grid item xs={12}>
                    <Card sx={{ p: 2, display: 'flex' }}>
                        <Grid container spacing={2} sx={{ alignItems: 'center' }}>

                            <Grid item xs={3}>
                                <Autocomplete
                                    id="codigoCliente"
                                    options={clientes}
                                    value={clientes.find(cliente => cliente.razonSocial === parametrosSeleccionado.nombreCliente) || null}
                                    filterOptions={options => clientes.filter((cliente) => filtrarNombreCliente(cliente))}
                                    onInputChange={(event, newInputValue) => {
                                        setInputNombreCliente(newInputValue);
                                    }}
                                    getOptionLabel={option => option.razonSocial}
                                    renderInput={params => <TextField {...params} label="Nombre cliente" name="nombreCliente" />}
                                    onChange={(event, value) => setParametrosSeleccionado(prevState => ({
                                        ...prevState,
                                        nombreCliente: value ? value.razonSocial : null,
                                        codigoCliente: value ? parseInt(value.codigo) : null,
                                        oferta: '',
                                        idElemento: 0,
                                        nombreElemento: '',
                                        idAnalisis: 0,
                                        nombreAnalisis: ''
                                    }))}
                                />
                            </Grid>

                            <Grid item xs={2}>
                                <Autocomplete
                                    id="codigoCliente"
                                    options={clientes}
                                    value={clientes.find(cliente => cliente.codigo === parametrosSeleccionado.codigoCliente) || null}
                                    filterOptions={options => clientes.filter((cliente) => filtrarCodigoCliente(cliente))}
                                    onInputChange={(event, newInputValue) => {
                                        setInputCodigoCliente(newInputValue);
                                    }}
                                    getOptionLabel={option => option.codigo.toString()}
                                    renderInput={(params) => <TextField {...params} name="codigoCliente" label="Código cliente" />}
                                    onChange={(event, value) => setParametrosSeleccionado(prevState => ({
                                        ...prevState,
                                        codigoCliente: value ? parseInt(value.codigo) : null,
                                        nombreCliente: value ? value.razonSocial : null,
                                        oferta: '',
                                        idElemento: 0,
                                        nombreElemento: '',
                                        idAnalisis: 0,
                                        nombreAnalisis: ''
                                    }))}
                                />
                            </Grid>

                            <Grid item xs={2}>
                                <Autocomplete
                                    id="clientes"
                                    options={oferta}
                                    value={oferta.find(ofert => ofert.numeroOferta === parametrosSeleccionado.oferta) || null}
                                    filterOptions={options => {
                                        if (parametrosSeleccionado.nombreCliente !== "" && parametrosSeleccionado.codigoCliente !== 0 && parametrosSeleccionado.oferta !== 0) {
                                            return options.filter(oferta =>
                                                oferta.nombreCliente === parametrosSeleccionado.nombreCliente && oferta.codigoCliente === parametrosSeleccionado.codigoCliente && !oferta.deleted
                                            );
                                        } else {
                                            return options.filter(oferta => !oferta.deleted);
                                        }
                                    }}
                                    getOptionLabel={option => option.numeroOferta.toString()}
                                    renderInput={params => <TextField {...params} label="Oferta" name="oferta" />}
                                    onChange={(event, value) => setParametrosSeleccionado(prevState => ({
                                        ...prevState,
                                        codigoCliente: value ? parseInt(value.codigoCliente) : null,
                                        nombreCliente: value ? value.nombreCliente : null,
                                        oferta: value ? parseInt(value.numeroOferta) : null,
                                        idElemento: 0,
                                        nombreElemento: '',
                                        idAnalisis: 0,
                                        nombreAnalisis: ''
                                    }))}
                                />
                            </Grid>

                            <Grid item xs={2}>
                                <Autocomplete
                                    disableClearable={true}
                                    id="elemento"
                                    inputValue={parametrosSeleccionado.nombreElemento}
                                    options={elementosAutocomplete}
                                    getOptionLabel={option => option.descripcion !== null ? (option.nombre + ' ' + option.descripcion) : (option.nombre + ' ' + option.numero)}
                                    renderInput={(params) => <TextField {...params} name="elemento" label="Elemento" />}
                                    onChange={(event, value) => onChangeElemento(event, value, "elemento")}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <Autocomplete
                                    disableClearable={true}
                                    key={key}
                                    id="analisis"
                                    inputValue={parametrosSeleccionado.nombreAnalisis}
                                    options={analisisAutocomplete}
                                    filterOptions={options => analisisAutocomplete.filter(an => an.id === 1 || an.id === 2 || an.id === 3 || an.id === 4 || an.id === 5 || an.id === 6 || an.id === 7 || an.id === 8)}
                                    getOptionLabel={option => option.nombre}
                                    renderInput={(params) => <TextField {...params} name="idAnalisis" label="Analisis FQ" />}
                                    onChange={(event, value) => onChangeAnalisis(event, value, "idAnalisis")}
                                />
                            </Grid>

                        </Grid>
                    </Card>
                </Grid>

                {/* BOTONES DE ACCIONES */}
                <Grid item xs={12}>
                    <Card sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Grid container spacing={2} sx={{ justifyContent: 'flex-end' }}>
                            <>
                                {
                                    parametrosFiltrados.length > 0 ?
                                        <>
                                            <Grid item>
                                                <Button
                                                    color='primary'
                                                    variant='contained'
                                                    startIcon={<TaskIcon />}
                                                    onClick={abrirPlantilla}
                                                >
                                                    Abrir plantilla
                                                </Button>
                                            </Grid>

                                            <Grid item>
                                                <Button
                                                    disabled={abroPlantilla}
                                                    color='success'
                                                    variant='contained'
                                                    startIcon={<NoteAddIcon />}
                                                    onClick={guardarPlantilla}
                                                >
                                                    Guardar plantilla
                                                </Button>
                                            </Grid>
                                        </>
                                        :

                                        <Grid item>
                                            <Button
                                                disabled={parametrosSeleccionado.nombreAnalisis === ""}
                                                color='success'
                                                variant='contained'
                                                startIcon={<NoteAddIcon />}
                                                onClick={guardarPlantilla}
                                            >
                                                Guardar plantilla
                                            </Button>
                                        </Grid>
                                }
                            </>
                        </Grid>
                    </Card>
                </Grid>

                {/* TABLA DE PARAMETRIZACIÓN */}
                <Grid item xs={12}>
                    <Card sx={{ p: 2 }}>
                        <Grid container spacing={2} sx={{ flexDirection: 'column' }}>

                            <Grid item>
                                <Typography variant="h6">Parámetros</Typography>
                            </Grid>

                            <Grid item>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }}>

                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nombre</TableCell>
                                                <TableCell>Lim. Mín.</TableCell>
                                                <TableCell>Lim. Máx.</TableCell>
                                                <TableCell>Unidades</TableCell>
                                                <TableCell>Activar</TableCell>
                                                <TableCell>Ver Insp.</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {
                                                parametrosFiltrados.length > 0 ?
                                                    tipoParametros.map((parametro, index) => (
                                                        <LineaParametro
                                                            key={index}
                                                            parametros={tipoParametros}
                                                            indice={index}
                                                            limInf={handleLimitInferior}
                                                            limSup={handleLimitSuperior}
                                                            unidades={handleUnidad}
                                                            activar={handleActivo}
                                                            verInsp={handleVerInspector}
                                                            disabled={abroPlantilla}
                                                            parametrosGenerales={parametros}
                                                        />
                                                    ))
                                                    :
                                                    tipoParametros.map((parametro, index) => (
                                                        <LineaParametro
                                                            key={index}
                                                            parametros={tipoParametros}
                                                            indice={index}
                                                            limInf={handleLimitInferior}
                                                            limSup={handleLimitSuperior}
                                                            unidades={handleUnidad}
                                                            activar={handleActivo}
                                                            verInsp={handleVerInspector}
                                                            disabled={parametrosSeleccionado.nombreAnalisis === ""}
                                                            parametrosGenerales={parametros}
                                                        />
                                                    ))
                                            }
                                        </TableBody>

                                    </Table>
                                </TableContainer>
                            </Grid>

                        </Grid>
                    </Card>
                </Grid>

            </Grid>
        </MainLayout>
    );
}