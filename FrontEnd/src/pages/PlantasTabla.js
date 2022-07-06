import React, { useState, useEffect } from "react";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import axios from "axios";
import { Tab, Box } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import { Modal, TextField, Button } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Edit from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import './PlantasTabla.css';
import TablaElementosTabla from '../components/TablaElementosTabla';
import MaterialTable from "@material-table/core";

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

function PlantasTabla() {

    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);

    const [confParametrosElementoPlantaCliente, setConfParametrosElementoPlantaCliente] = useState([]);

    const [analisisNivelesPlantasCliente, setAnalisisNivelesPlantasCliente] = useState([]);

    const [oferta, setOferta] = useState([]);

    const [clientes, setClientes] = useState([]);

    const [analisis, setAnalisis] = useState([]);
    const [analisisTable, setAnalisisTable] = useState({});

    const [periodo, setPeriodo] = useState("");
    const [fecha, setFecha] = useState("");


    const [actualState, changeCheckState] = useState(false);
    const [actualState2, changeActualState] = useState(false);

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

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);

    const styles = useStyles();

    const planta = {
        codigoCliente: 0,
        oferta: 0,
        elementos: []
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

    const GetAnalisisNivelesPlantasCliente = async () => {
        axios.get("/analisisnivelesplantascliente", token).then(response => {
            const analisisNiveles = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setAnalisisNivelesPlantasCliente(analisisNiveles);
        })
    }

    const GetConfParametrosElementoPlantaCliente = async () => {
        axios.get("/parametroselementoplantacliente", token).then(response => {
            setData2(response.data.data)
        })
    }

    function FiltrarData(){
        setData(analisisNivelesPlantasCliente.filter(analisis => analisis.codigoCliente === confParametrosElementoPlantaCliente.codigoCliente && analisis.oferta === confParametrosElementoPlantaCliente.oferta))
    } 

    const onChangeCliente = (e, value, name) => {
        if(e.target.textContent !== ""){
            setData(analisisNivelesPlantasCliente.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.oferta === confParametrosElementoPlantaCliente.oferta))
        }

        setConfParametrosElementoPlantaCliente((prevState) => ({
            ...prevState,
            [name]: value.codigo
        }))

        Datos();
    }

    const onChangeOferta = (e, value, name) => {
        if(e.target.textContent !== ""){
            setData(analisisNivelesPlantasCliente.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.codigoCliente === confParametrosElementoPlantaCliente.codigoCliente))
        }

        setConfParametrosElementoPlantaCliente((prevState) => ({
            ...prevState,
            [name]: value.numeroOferta
        }))

        Datos();
    }

    function Datos() {
        let elementoNuevo = {
            nombre: data.analisis,
            plantilla: {
                esPlantilla: false,
                Comptador: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                PH: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. ph',
                    Activo: false,
                    VerInspector: false,
                },
                Temperatura: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'ºC',
                    Activo: false,
                    VerInspector: false,
                },
                Conductivitat: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'uS/cm',
                    Activo: false,
                    VerInspector: false,
                },
                TDS: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'uS/cm',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatM: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'mg/l CaCO3',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatP: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'mg/l CaCO3',
                    Activo: false,
                    VerInspector: false,
                },
                DuresaCalcica: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'mg/l CaCO3',
                    Activo: false,
                    VerInspector: false,
                },
                DuresaTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'mg/l CaCO3',
                    Activo: false,
                    VerInspector: false,
                },
                Terbolesa: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'N.T.U',
                    Activo: false,
                    VerInspector: false,
                },
                Fe: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'mg/l',
                    Activo: false,
                    VerInspector: false,
                },
                Clorurs: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                Sulfats: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: false,
                    VerInspector: false,
                },
                Silicats: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: false,
                    VerInspector: false,
                },
                ClorLliure: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'C',
                    Activo: false,
                    VerInspector: false,
                },
                ClorTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: false,
                    VerInspector: false,
                },
                Brom: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'mg/l',
                    Activo: false,
                    VerInspector: false,
                },
                Sulfits: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                Ortofosfats: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                Mo: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                Isotiazolona: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                AquaproxAB5310: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                BiopolLB5: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                MefacideLG: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                BiopolIB200: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                Campo1: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Activo: false,
                    VerInspector: false
                },
                Campo2: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo3: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo4: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo5: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo6: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo7: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo8: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo9: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo10: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo11: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                },
                Campo12: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                }
            }
        }

        listaElementos.push(elementoNuevo)
    }

    useEffect(() => {
        FiltrarData();
        GetConfParametrosElementoPlantaCliente();
        GetOfertas();
        GetClientes();
        GetAnalisisNivelesPlantasCliente();
        Datos();
    }, [])

    return (
        <div className="contenedor">
            <div className='cliente'>
                <h6>Cliente</h6>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <th>Código</th>
                            <th> Nombre </th>
                            <th>Oferta</th>
                        </tr>
                        <tr>
                            <td>
                                {console.log(listaElementos)}
                                <Autocomplete
                                    disableClearable={true}
                                    id="Cliente"
                                    options={clientes}
                                    getOptionLabel={option => option.codigo}
                                    sx={{ width: 200 }}
                                    renderInput={(params) => <TextField {...params} name="codigoCliente" />}
                                    onChange={(event, value) => onChangeCliente(event, value, "codigoCliente")}
                                />
                            </td>
                            <td>
                                <Autocomplete
                                    disableClearable={true}
                                    id="NombreCliente"
                                    options={clientes}
                                    filterOptions={options => clientes.filter(cliente => cliente.codigo === confParametrosElementoPlantaCliente.codigoCliente)}
                                    getOptionLabel={option => option.razonSocial}
                                    sx={{ width: 200 }}
                                    renderInput={(params) => <TextField {...params} name="nombreCliente" />}
                                    onChange={(event, value) => setConfParametrosElementoPlantaCliente(prevState => ({
                                        ...prevState,
                                        nombreCliente: value.razonSocial
                                    }))}
                                />
                            </td>
                            <td>
                                <Autocomplete
                                    disableClearable={true}
                                    id="Oferta"
                                    options={oferta}
                                    filterOptions={options => oferta.filter(oferta => oferta.codigoCliente === confParametrosElementoPlantaCliente.codigoCliente)}
                                    getOptionLabel={option => option.numeroOferta}
                                    sx={{ width: 200 }}
                                    renderInput={(params) => <TextField {...params}  name="numeroOferta" />}
                                    onChange={(event, value) => onChangeOferta(event, value, "oferta")}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList id="tab-list" onChange={handleChange}>
                            {
                                data.map((elemento, index) => <Tab key={index} label={elemento.elemento} value={index.toString()} />)
                            }
                        </TabList>
                    </Box>
                    {
                        listaElementos.map((elemento, index) => <TablaElementosTabla key={index} nombre={elemento.nombre} value={index} plantilla={elemento.plantilla} />)
                    }
                </TabContext>
            </Box>
            <div className='botones-menu'>
                <button>Cancelar</button>
                <button>Aceptar</button>
            </div>
        </div>
    );
}

export default PlantasTabla;