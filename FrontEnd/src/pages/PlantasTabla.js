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
        width: 700,
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

    const [parametrosAnalisisPlanta, setParametrosAnalisisPlanta] = useState([]);

    const [analisisSeleccionado, setAnalisisSeleccionado] = useState({

        id: 0,
        periodo: null,
        oferta: 0,
        pedido: 0,
        fecha: null,
        realizado: false,
        operario: '',
        protocolo: '',
        observaciones: '',
        facturado: false,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,

    });

    const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);

    const [analisisEliminar, setAnalisisEliminar] = useState([]);
    const [analisisEditar, setAnalisisEditar] = useState([]);

    const columnas = [

        //visibles
        { title: 'Periodo', field: 'periodo', type: 'date', filterPlaceholder: "Filtrar por periodo" },
        { title: 'Oferta', field: 'oferta', type: 'numeric', filterPlaceholder: "Filtrar por oferta" },
        { title: 'Pedido', field: 'pedido', type: 'numeric', filterPlaceholder: "Filtrar por pedido" },
        { title: 'Fecha', field: 'fecha', type: 'date', filterPlaceholder: "Filtrar por fecha" },
        { title: 'Realizado', field: 'realizado', type: 'boolean' },
        { title: 'Operario', field: 'operario', filterPlaceholder: "Filtrar por fecah operario" },
        { title: 'Protocolo', field: 'protocolo' },
        { title: 'Observaciones', field: 'observaciones' },
        { title: 'Facturado', field: 'facturado', type: 'boolean' }
    ];

    const [data, setData] = useState([]);

    const styles = useStyles();

    const planta = {
        idCliente: '00256',
        nombreCliente: 'Seat',
        elementos: [{
            nombre: 'Torre',
            numero: 1,
            posicion: 1,
            nivel: 1,
            propiedades: {
                fisicoQuimico: true,
                aerobios: false,
                legionela: true,
                aguaPotable: true,
                aguasResiduales: false
            },
            plantilla: {
                EsPlantilla: false,
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
        },
        {
            nombre: 'Depósito',
            numero: 1,
            posicion: 1,
            nivel: 2,
            propiedades: {
                fisicoQuimico: true,
                aerobios: true,
                legionela: true,
                aguaPotable: true,
                aguasResiduales: false
            },
            plantilla: {
                EsPlantilla: false,
                Comptador: {
                    LimInf: '5',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                PH: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: false,
                    VerInspector: false,
                },
                Temperatura: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'C',
                    Activo: false,
                    VerInspector: false,
                },
                Conductivitat: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
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
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatP: {

                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                DuresaCalcica: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                DuresaTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Terbolesa: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                Fe: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                Clorurs: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Sulfats: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: true,
                },
                Silicats: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: true,
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
                Campo1: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
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
        },
        {
            nombre: 'Osmosis',
            numero: 1,
            posicion: 2,
            nivel: 2,
            propiedades: {
                fisicoQuimico: false,
                aerobios: false,
                legionela: true,
                aguaPotable: false,
                aguasResiduales: true
            },
            plantilla: {
                EsPlantilla: false,
                Comptador: {
                    LimInf: '5',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                PH: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: false,
                },
                Temperatura: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'C',
                    Activo: true,
                    VerInspector: false,
                },
                Conductivitat: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
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
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatP: {

                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                DuresaCalcica: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                DuresaTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Terbolesa: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                Fe: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                Clorurs: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Sulfats: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: true,
                },
                Silicats: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: true,
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
                    Activo: true,
                    VerInspector: false,
                },
                Sulfits: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
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
                Campo1: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
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
                    Activo: true,
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
        },
        {
            nombre: 'Torre',
            numero: 1,
            posicion: 1,
            nivel: 3,
            propiedades: {
                fisicoQuimico: false,
                aerobios: false,
                legionela: true,
                aguaPotable: true,
                aguasResiduales: true
            },
            plantilla: {
                EsPlantilla: false,
                Comptador: {
                    LimInf: '5',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                PH: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: false,
                },
                Temperatura: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'C',
                    Activo: true,
                    VerInspector: false,
                },
                Conductivitat: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
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
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatP: {

                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                DuresaCalcica: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                DuresaTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Terbolesa: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                Fe: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                Clorurs: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Sulfats: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: true,
                },
                Silicats: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: true,
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
                Campo1: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
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
        },
        {
            nombre: 'Torre',
            numero: 2,
            posicion: 2,
            nivel: 3,
            propiedades: {
                fisicoQuimico: true,
                aerobios: false,
                legionela: false,
                aguaPotable: true,
                aguasResiduales: true
            },
            plantilla: {
                EsPlantilla: false,
                Comptador: {
                    LimInf: '5',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                PH: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: false,
                },
                Temperatura: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'C',
                    Activo: true,
                    VerInspector: false,
                },
                Conductivitat: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
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
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatP: {

                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                DuresaCalcica: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                DuresaTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Terbolesa: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                Fe: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                Clorurs: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Sulfats: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: true,
                },
                Silicats: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: true,
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
                Campo1: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
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
        },
        {
            nombre: 'Caldera',
            numero: 1,
            posicion: 1,
            nivel: 4,
            propiedades: {
                fisicoQuimico: false,
                aerobios: true,
                legionela: true,
                aguaPotable: false,
                aguasResiduales: false
            },
            plantilla: {
                EsPlantilla: false,
                Comptador: {
                    LimInf: '5',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                PH: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: false,
                },
                Temperatura: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'C',
                    Activo: true,
                    VerInspector: false,
                },
                Conductivitat: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
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
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                AlcalinitatP: {

                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                DuresaCalcica: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                DuresaTotal: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Terbolesa: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: false,
                },
                Fe: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
                    VerInspector: false,
                },
                Clorurs: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: true,
                    VerInspector: true,
                },
                Sulfats: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: true,
                },
                Silicats: {
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'Un. p',
                    Activo: true,
                    VerInspector: true,
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
                Campo1: {
                    Nombre: '',
                    LimInf: '',
                    LimSup: '',
                    Unidades: 'm3',
                    Activo: false,
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
        }]
    }
    let listaElementos = planta.elementos;
    
    const handleChangeInput=e=>{
        const {name, value}=e.target;
        setAnalisisSeleccionado(prevState=>({
          ...prevState,
          [name]: value
        }));
    }

    const bodyInsertar = (
        <div className={styles.modal}>
            <h3>Agregar Nuevo Analisis</h3>
            <div className="row g-3">
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Periodo" name="periodo" onChange={handleChangeInput} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Oferta" name="oferta" onChange={handleChangeInput} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Pedido" name="pedido" onChange={handleChangeInput} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Fecha" name="fecha" onChange={handleChangeInput} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Realizado" name="realizado" onChange={handleChangeInput} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Operario" name="operario" onChange={handleChangeInput} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Protocolo" name="protocolo" onChange={handleChangeInput} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Observaciones" name="observaciones" onChange={handleChangeInput} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Facturado" name="facturado" onChange={handleChangeInput} />
                </div>
            </div>
            <div align="right">
                <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
                <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEditar = (
        <div className={styles.modal}>
            <h3>Editar Analisis</h3>
            <div className="row g-3">
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Periodo" name="periodo" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.periodo} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Oferta" name="oferta" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.oferta} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Pedido" name="pedido" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.pedido} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Fecha" name="fecha" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.fecha} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Realizado" name="realizado" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.realizado} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Operario" name="operario" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.operario} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Protocolo" name="protocolo" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.protocolo} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Observaciones" name="observaciones" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.observaciones} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Facturado" name="facturado" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.facturado} />
                </div>
            </div>
            <div align="right">
                <Button color="primary" onClick={() => peticionPut()}>Editar</Button>
                <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEliminar=(
            
        <div className={styles.modal}>
          <p>Estás seguro que deseas eliminar el analisis ? </p>
          <div align="right">
            <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
            <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>   
          </div>
        </div>
      )

    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    const [value, setValue] = React.useState('0');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const GetConfParametrosElementoPlantaCliente = async () => {
        axios.get("/parametroselementoplantacliente", token).then(response => {
            setConfParametrosElementoPlantaCliente(response.data.data)
        })
    }

    const GetParametrosAnalisisPlanta = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setParametrosAnalisisPlanta(response.data.data)
        })
    }

    useEffect(() => {
        GetConfParametrosElementoPlantaCliente();
        GetParametrosAnalisisPlanta();
    }, [])

    const peticionPost = async () => {
        analisisSeleccionado.id = null;
        await axios.post("/parametrosanalisisplanta", analisisSeleccionado, token)
          .then(response => {
            //setData(data.concat(response.data));
            abrirCerrarModalInsertar();
            GetParametrosAnalisisPlanta();
          }).catch(error => {
            console.log(error);
          })
    }

    const peticionPut = async () => {
        await axios.put("/parametrosanalisisplanta?id=" + analisisSeleccionado.id, analisisSeleccionado, token)
          .then(response => {
            var analisisModificado = data;
            analisisModificado.map(analisi => {
              if (analisi.id === analisisSeleccionado.id) {
                analisi = analisisSeleccionado
              }
            });
            GetParametrosAnalisisPlanta();
            abrirCerrarModalEditar();
          }).catch(error => {
            console.log(error);
          })
    }

    const peticionDelete = async () => {
        console.log("id=" + analisisEliminar[0].id)
        var i = 0;
        while (i < analisisEliminar.length) {
          await axios.delete("/parametrosanalisisplanta/" + analisisEliminar[i].id, token)
            .then(response => {
              GetParametrosAnalisisPlanta();
              abrirCerrarModalEliminar();
            }).catch(error => {
              console.log(error);
            })
          i++;
        }
    }

    return (
        <div className="contenedor">
            <div className='cliente'>
                <h6>Cliente</h6>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                        </tr>
                        <tr>
                            <td>{planta.idCliente}</td>
                            <td>{planta.nombreCliente}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList id="tab-list" onChange={handleChange}>
                            {
                                listaElementos.map((elemento, index) => <Tab key={index} label={elemento.nombre + ' ' + elemento.numero} value={index.toString()} />)
                            }
                        </TabList>
                    </Box>
                    {/*
                    listaElementos.map((elemento,index) => <TablaElementosTabla key={index} nombre={elemento.nombre} value={index} plantilla={elemento.plantilla} />)
                */}
                    <MaterialTable columns={columnas} data={data}
                        localization={localization}
                        actions={[
                            {
                                icon: () => <AddCircle style={{ fill: "green" }} />,
                                tooltip: "Añadir analisis",
                                isFreeAction: true,
                                onClick: (e, data) => {
                                    abrirCerrarModalInsertar();
                                },
                            },
                            {
                                icon: () => <RemoveCircle style={{ fill: "red" }} />,
                                tooltip: "Eliminar analisis",
                                onClick: (event, rowData) => {
                                    setAnalisisEliminar(FilasSeleccionadas);
                                    abrirCerrarModalEliminar();
                                },
                            },
                            {
                                icon: () => <Edit />,
                                tooltip: "Editar analisis",
                                onClick: (e, data) => {
                                    //setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas[0].idCliente));
                                    abrirCerrarModalEditar();
                                },
                            },
                        ]}

                        // onRowClick={((evt, mantenimientoDetSeleccionado) => setMantenimientoDetSeleccionado(mantenimientoDetSeleccionado.tableData.id))}
                        onSelectionChange={(filas) => {
                            setFilasSeleccionadas(filas);
                            if (filas.length > 0)
                                setAnalisisSeleccionado(filas[0]);
                        }
                        }
                        options={{
                            sorting: true, paging: true, pageSizeOptions: [1, 2, 3, 4, 5], pageSize: 4, filtering: false, search: false, selection: true,
                            columnsButton: true,
                            rowStyle: rowData => ({
                                backgroundColor: (analisisSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                                whiteSpace: "nowrap"
                            }),
                            exportMenu: [{
                                label: 'Export PDF',
                                exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de detalles mantenimientos')
                            }, {
                                label: 'Export CSV',
                                exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de detalles mantenimientos')
                            }]
                        }}

                        title="Listado de analisis"
                    />
                </TabContext>
            </Box>
            <div className='botones-menu'>
                <button>Cancelar</button>
                <button>Aceptar</button>
            </div>

            <Modal
                open={modalInsertar}
                onClose={abrirCerrarModalInsertar}>
                {bodyInsertar}
            </Modal>

            <Modal
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}>
                {bodyEliminar}
            </Modal>

            <Modal
                open={modalEditar}
                onClose={abrirCerrarModalEditar}>
                {bodyEditar}
            </Modal>
        </div>
    );
}

export default PlantasTabla;