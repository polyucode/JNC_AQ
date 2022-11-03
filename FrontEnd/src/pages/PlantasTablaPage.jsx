import React, { useState, useEffect, useContext } from "react";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import axios from "axios";
import { Tab, Box } from '@mui/material';
import { TabContext } from '@mui/lab';
import { Modal, TextField, Button } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Edit from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ThemeContext } from '../router/AppRouter';

import './PlantasTabla.css';
import TablaElementosTabla from '../components/TablaElementosTabla';
import MaterialTable from "@material-table/core";
import { MainLayout } from "../layout/MainLayout";

import { useParserFront } from "../hooks/useParserFront";
import { useParserBack } from "../hooks/useParserBack";

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

const localization = {
    body: {
        emptyDataSourceMessage: 'No hay datos por mostrar',
        addTooltip: 'Añadir',
        deleteTooltip: 'Eliminar',
        editTooltip: 'Editar',
        filterRow: {
            filterTooltip: 'Filtrar',
        },
        editRow: {
            deleteText: '¿Segura(o) que quiere eliminar?',
            cancelTooltip: 'Cancelar',
            saveTooltip: 'Guardar',
        },
    },
    grouping: {
        placeholder: "Arrastre un encabezado aquí para agrupar",
        groupedBy: 'Agrupado por',
    },
    header: {
        actions: 'Acciones',
    },
    pagination: {
        firstAriaLabel: 'Primera página',
        firstTooltip: 'Primera página',
        labelDisplayedRows: '{from}-{to} de {count}',
        labelRowsPerPage: 'Filas por página:',
        labelRowsSelect: 'filas',
        lastAriaLabel: 'Ultima página',
        lastTooltip: 'Ultima página',
        nextAriaLabel: 'Pagina siguiente',
        nextTooltip: 'Pagina siguiente',
        previousAriaLabel: 'Pagina anterior',
        previousTooltip: 'Pagina anterior',
    },
    toolbar: {
        addRemoveColumns: 'Agregar o eliminar columnas',
        exportAriaLabel: 'Exportar',
        exportName: 'Exportar a CSV',
        exportTitle: 'Exportar',
        nRowsSelected: '{0} filas seleccionadas',
        searchPlaceholder: 'Buscar',
        searchTooltip: 'Buscar',
        showColumnsAriaLabel: 'Mostrar columnas',
        showColumnsTitle: 'Mostrar columnas',
    },
}

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 1000,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    }
}));

export const PlantasTablaPage = () => {

    const { valores } = useContext(ThemeContext);

    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);

    const [confParametrosElementoPlantaCliente, setConfParametrosElementoPlantaCliente] = useState([]);

    const [confNivelesPlantasCliente, setConfNivelesPlantasCliente] = useState([]);

    const [oferta, setOferta] = useState([]);

    const [clientes, setClientes] = useState([]);

    const [elementos, setElementos] = useState([]);

    const [parametros, setParametros] = useState([]);

    const [analisis, setAnalisis] = useState([]);
    const [analisisTable, setAnalisisTable] = useState({});

    const [periodo, setPeriodo] = useState("");
    const [fecha, setFecha] = useState("");


    const [actualState, changeCheckState] = useState(false);
    const [actualState2, changeActualState] = useState(false);

    const [datosParametros, setDatosParametros] = useState([]);

    const columnas = [

        //visibles
        { title: 'Periodo', field: 'periodo', type: 'date', filterPlaceholder: "Filtrar por periodo" },
        { title: 'Analisis', field: 'idAnalisis', lookup: analisisTable, filterPlaceholder: "Filtrar por analisis" },
        { title: 'Fecha', field: 'fecha', type: 'date', filterPlaceholder: "Filtrar por fecha" },
        { title: 'Realizado', field: 'realizado', type: 'boolean' },
        { title: 'Operario', field: 'operario', filterPlaceholder: "Filtrar por operario" },
        { title: 'Protocolo', field: 'protocolo' },
        { title: 'Observaciones', field: 'observaciones' },
        { title: 'Facturado', field: 'facturado', type: 'boolean' }
    ];

    const [datos, setDatos] = useState([]);

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);

    const { parametrosBack, setDatosParametrosBack } = useParserBack();
    const { parametrosFront, setDatosParametrosFront, cambiarCampoFijo, cambiarCampoPersonalizado } = useParserFront(setDatosParametrosBack);

    useEffect(() => {
        setDatosParametrosBack(parametrosFront)
    }, [parametrosFront])

    const styles = useStyles();

    const [parametrosSeleccionado, setParametrosSeleccionado] = useState({

        id: 0,
        codigoCliente: 0,
        nombreCliente: "",
        oferta: '',
        idElemento: 0,
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
    })

    const [parametros2Seleccionado, setParametros2Seleccionado] = useState({

        id: 0,
        codigoCliente: 0,
        nombreCliente: '',
        oferta: '',
        idElemento: 0,
        esPlantilla: false,
        limInf: 0,
        limSup: 0,
        unidades: '',
        activo: false,
        verInspector: false

    })

    console.log(parametrosBack)
    console.log(parametrosFront)

    const tipoParametros = [];
    parametros.map(parametro => tipoParametros.push({ id: parametro.id, nombre: parametro.nombre, liminf: "", limsup: "", unidades: parametro.unidad, activo: false, verinspector: false }))

    console.log(tipoParametros)

    const planta = {
        codigoCliente: 0,
        oferta: 0,
        elementos: {
            plantilla: {
                esPlantilla: false,
                Comptador: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                PH: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                Temperatura: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                Conductivitat: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                TDS: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatM: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatP: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                DuresaCalcica: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                DuresaTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                Terbolesa: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                Fe: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                Clorurs: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                Sulfats: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                Silicats: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                ClorLliure: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                ClorTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                Brom: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                Sulfits: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                Ortofosfats: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                Mo: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                Isotiazolona: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                AquaproxAB5310: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                BiopolLB5: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                MefacideLG: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                BiopolIB200: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                Campo1: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false
                },
                Campo2: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                Campo3: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                Campo4: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                Campo5: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                Campo6: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                Campo7: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                },
                Campo8: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: '',
                    Activo: false,
                    VerInspector: false,
                }
            }
        }
    }

    let listaElementos = planta.elementos;

    const [value, setValue] = React.useState('0');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const GetClientes = async () => {
        axios.get("/cliente", token).then(response => {
            const cliente = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setClientes(cliente);
        }, [])
    }

    const GetOfertas = async () => {
        axios.get("/ofertasclientes", token).then(response => {
            const oferta = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setOferta(oferta);
        }, [])
    }

    const GetParametros = async () => {
        axios.get("/parametros", token).then(response => {
            const parametro = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setParametros(parametro);
        }, [])
    }

    const GetConfParametrosElementoPlantaCliente = async () => {
        axios.get("/parametroselementoplantacliente", token).then(response => {
            setData2(response.data.data)
        })
    }

    const GetConfNivelesPlantasCliente = async () => {
        axios.get("/confnivelesplantascliente", token).then(response => {
            const niveles = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setConfNivelesPlantasCliente(niveles);
        })
    }

    const GetParametrosAnalisisPlanta = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData(response.data.data)
        })
    }

    const GetElementos = async () => {
        axios.get("/elementosplanta", token).then(response => {
            const elemento = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setElementos(elemento);
        }, [])
    }

    useEffect(() => {
        GetParametrosAnalisisPlanta();
        GetConfParametrosElementoPlantaCliente();
        GetOfertas();
        GetClientes();
        GetElementos();
        GetConfNivelesPlantasCliente();
        GetParametros();
    }, [])

    useEffect(() => {

        const nombre = clientes.filter(cliente => cliente.codigo === parametrosSeleccionado.codigoCliente);
        (nombre.length > 0) && setParametrosSeleccionado({
            ...parametrosSeleccionado,
            nombreCliente: nombre[0].razonSocial,
            oferta: '',
            elemento: ''
        })

    }, [parametrosSeleccionado.codigoCliente])

    /* useEffect(() => {

        // Comprobamos si la casilla está marcada. Si lo está deshabilitamos los inputs
        if ("Activo") {
            document.getElementById('LimInf').removeAttribute('disabled');
            document.getElementById('LimSup').removeAttribute('disabled');
            document.getElementById('Unidades').removeAttribute('disabled');
            document.getElementById('VerInspector').removeAttribute('disabled');
        } else {
            document.getElementById('LimInf').setAttribute('disabled', 'disabled');
            document.getElementById('LimSup').setAttribute('disabled', 'disabled');
            document.getElementById('Unidades').setAttribute('disabled', 'disabled');
            document.getElementById('VerInspector').setAttribute('disabled', 'disabled');
        }

    }, []); */

    const handleActivo = (e) => {
        const { name, value, checked } = e.target
        console.log(e.target)
        // Comprobamos si la casilla está marcada. Si lo está deshabilitamos los inputs
        if (checked) {
            document.getElementById(name + 'limInf').removeAttribute('disabled');
            document.getElementById(name + 'limSup').removeAttribute('disabled');
            document.getElementById(name + 'unidades').removeAttribute('disabled');
            document.getElementById(name + 'activo').setAttribute('checked', 'checked');
            document.getElementById(name + 'verInspector').removeAttribute('disabled');
        } else {
            document.getElementById(name + 'limInf').setAttribute('disabled', 'disabled');
            document.getElementById(name + 'limSup').setAttribute('disabled', 'disabled');
            document.getElementById(name + 'unidades').setAttribute('disabled', 'disabled');
            document.getElementById(name + 'activo').removeAttribute('checked');
            document.getElementById(name + 'verInspector').setAttribute('disabled', 'disabled');
        }

    }

    const handleLimitInferior = (e) => {
        const { name, value } = e.target
        console.log(e.target)
        // Actualiza el valor en la variable
        setParametros2Seleccionado(prevState => ({
            ...prevState,
            [name]: value
        }))
        
    }

    const handleLimitSuperior = (e) => {
        const { name, value } = e.target
        console.log(e.target)
        // Actualiza el valor en la variable
        setParametros2Seleccionado(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleVerInspector = (e) => {
        const { name, value, checked } = e.target
        console.log(e.target)
        // Actualiza el valor en la variable
        setParametros2Seleccionado(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }

    const handleUnidad = (e) => {
        const { name, value } = e.target
        console.log(e.target)
        // Actualiza el valor en la variable
        setParametros2Seleccionado(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const editarPlantilla = async () => {
        await axios.put("/parametroselementoplantacliente?id=" + parametrosBack.id, parametrosBack, token)
            .then(response => {
                var parametrosModificado = data2;
                parametrosModificado.map(parametro => {
                    if (parametro.id === parametrosBack.id) {
                        parametro = parametrosBack
                    }
                });
                GetConfParametrosElementoPlantaCliente();
            }).catch(error => {
                console.log(error);
            })
    }

    const GetParametros2 = async () => {

        const url = "/parametroselementoplantacliente/parametros/?CodigoCliente=" + parametrosSeleccionado.codigoCliente + "&Oferta=" + parametrosSeleccionado.oferta + "&Elemento=" + parametrosSeleccionado.elemento
        const response = await axios.get(url, token)

        setDatosParametrosFront(response.data.data)

    }

    async function guardarElementos() {

        parametrosBack.codigoCliente = valores.codigo;
        parametrosBack.nombreCliente = valores.nombre;
        parametrosBack.oferta = valores.ofertas;
        parametrosBack.elemento = valores.elemento;

        await axios.post("/parametroselementoplantacliente", parametrosBack, token)
            .then(response => {
                return response
            }).catch(error => {
                console.log(error);
            })

        //handleObject()
    }

    return (
        <MainLayout title="Plantas (Tabla)">
            <div className="contenedor">
                <div className="contenedor2">
                    <div className='cliente'>
                        <h6>Cliente</h6>
                        <hr />
                        <table>
                            <tbody>
                                <tr>
                                    <th> Código </th>
                                    <th> Nombre </th>
                                    <th> Oferta </th>
                                    <th> Elemento </th>
                                </tr>
                                {!valores.codigo ?
                                    <tr>
                                        <td>
                                            <Autocomplete
                                                disableClearable={true}
                                                className={styles.inputMaterial}
                                                id="codigoCliente"
                                                options={clientes}
                                                getOptionLabel={option => option.codigo}
                                                sx={{ width: 150 }}
                                                renderInput={(params) => <TextField {...params} name="codigoCliente" />}
                                                onChange={(event, value) => setParametrosSeleccionado(prevState => ({
                                                    ...prevState,
                                                    codigoCliente: parseInt(value.codigo)
                                                }))}
                                            />
                                        </td>
                                        <td>
                                            <Autocomplete
                                                disableClearable={true}
                                                id="CboClientes"
                                                className={styles.inputMaterial}
                                                inputValue={parametrosSeleccionado.nombreCliente}
                                                options={clientes}
                                                filterOptions={options => clientes.filter(cliente => cliente.codigo === parametrosSeleccionado.codigoCliente)}
                                                getOptionLabel={option => option.razonSocial}
                                                sx={{ width: 230 }}
                                                renderInput={(params) => <TextField {...params} name="nombreCliente" />}
                                                onChange={(event, value) => setParametrosSeleccionado(prevState => ({
                                                    ...prevState,
                                                    nombreCliente: value.razonSocial
                                                }))}

                                            />
                                        </td>
                                        <td>
                                            <Autocomplete
                                                disableClearable={true}
                                                className={styles.inputMaterial}
                                                id="Oferta"
                                                inputValue={parametrosSeleccionado.oferta}
                                                options={oferta}
                                                filterOptions={options => oferta.filter(oferta => oferta.codigoCliente === parametrosSeleccionado.codigoCliente)}
                                                getOptionLabel={option => option.numeroOferta}
                                                sx={{ width: 150 }}
                                                renderInput={(params) => <TextField {...params} name="oferta" />}
                                                onChange={(event, value) => setParametrosSeleccionado(prevState => ({
                                                    ...prevState,
                                                    oferta: parseInt(value.numeroOferta),
                                                    elemento: ''
                                                }))}
                                            />
                                        </td>
                                        <td>
                                            <Autocomplete
                                                disableClearable={true}
                                                className={styles.inputMaterial}
                                                id="elemento"
                                                inputValue={parametrosSeleccionado.idElemento}
                                                options={elementos}
                                                filterOptions={options => confNivelesPlantasCliente.filter(planta => planta.codigoCliente === parametrosSeleccionado.codigoCliente && planta.oferta === parametrosSeleccionado.oferta)}
                                                getOptionLabel={option => option.id_Elemento}
                                                sx={{ width: 225 }}
                                                renderInput={(params) => <TextField {...params} name="elemento" />}
                                                onChange={(event, value) => setParametrosSeleccionado(prevState => ({
                                                    ...prevState,
                                                    idElemento: value.id
                                                }))}
                                            />
                                        </td>
                                    </tr>
                                    :
                                    <tr>
                                        <td>
                                            <TextField disabled className="cogidoCliente" value={valores.codigo} />
                                        </td>
                                        <td>
                                            <TextField disabled className="nombreCliente" value={valores.nombre} />
                                        </td>
                                        <td>
                                            <TextField disabled className="oferta" value={valores.ofertas} />
                                        </td>
                                        <td>
                                            <TextField disabled className="elemento" value={valores.elemento} />
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    {valores.codigo ?
                        <div className='botones-menu'>
                            <button className="plantilla" onClick={guardarElementos}> Guardar Plantilla </button>
                        </div>
                        :
                        <div className='botones-menu'>
                            <button className="plantilla" onClick={GetParametros}> Abrir Plantilla </button>
                            <button className="plantilla" onClick={guardarElementos}> Guardar Plantilla </button>
                            <button className="plantilla" onClick={editarPlantilla}> Editar Plantilla </button>
                        </div>
                    }
                </div>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <div className="col-1">
                        <h6>Parametrizacion</h6>
                        <hr />
                        <table>
                            <tbody>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Lim. Min.</th>
                                    <th>Lim. Max.</th>
                                    <th>Unidades</th>
                                    <th><center>Activar</center></th>
                                    <th><center>Ver Insp.</center></th>
                                </tr>
                                {
                                    parametros.map((parametro, index) =>
                                        
                                            <tr key={index}>
                                                <td>{parametro.nombre}</td>
                                                <td><input type="number" name={parametro.nombre} id={parametro.nombre + "limInf"} onChange={handleLimitInferior} disabled /></td>
                                                <td><input type="number" name={parametro.nombre} id={parametro.nombre + "limSup"} onChange={handleLimitSuperior} disabled /></td>
                                                <td>
                                                    <input type="text" name={parametro.nombre} id={parametro.nombre + "unidades"} value={parametro.unidad} onChange={handleUnidad} disabled />
                                                </td>
                                                <td><center><input type="checkbox" name={parametro.nombre} id={parametro.nombre + "activo"} onChange={handleActivo} /></center></td>
                                                <td><center><input type="checkbox" name={parametro.nombre} id={parametro.nombre + "verInspector"} onChange={handleVerInspector} disabled /></center></td>
                                            </tr>
                                        
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </Box>
            </div>
        </MainLayout>
    );
}