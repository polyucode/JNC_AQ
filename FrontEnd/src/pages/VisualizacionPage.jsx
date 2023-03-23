import React, { useState, useEffect } from "react";
import MaterialTable from '@material-table/core';
import axios from "axios";
import { Grid, Card, Typography, Button, TextField, Modal, Autocomplete } from '@mui/material';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@mui/material/MenuItem';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';
import { insertarBotonesModal } from '../helpers/insertarBotonesModal';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

import './Visualizacion.css';
import { MainLayout } from "../layout/MainLayout";
import { ModalLayout, ModalPopup } from "../components/ModalLayout";
import { InsertarVisModal } from "../components/Modals/InsertarVisModal";
import { InsertarVisModal1 } from "../components/Modals/InsertarVisModal1";
import { InsertarVisModalAerobio } from "../components/Modals/InsertarVisModalAerobio";
import { InsertarVisModalLegionela } from "../components/Modals/InsertarVisModalLegionela";
import { InsertarVisModalOperario } from "../components/Modals/InsertarVisModalOperario";
import { EditarVisModal } from "../components/Modals/EditarVisModal";
import { EditarVisModal1 } from "../components/Modals/EditarVisModal1";
import { EditarVisModalAerobio } from "../components/Modals/EditarVisModalAerobio";
import { EditarVisModalLegionela } from "../components/Modals/EditarVisModalLegionela";
import { EditarVisModalOperario } from "../components/Modals/EditarVisModalOperario";
import { bajarPdf, bajarPdfNoFQ, subirPdf } from "../api/apiBackend";

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
        width: 800,
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

const useStylesParagraph = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 800,
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
        width: '100%',
        border: '1px solid #DBDBDB'
    }
}));

export const VisualizacionPage = () => {

    let opcionesFiltradas = [];
    let opcionesFiltradasAnalisis = [];
    let opcionesTablasFiltradasAnalisis = [];

    const [rows1, setRows1] = useState([]);
    const [rows2, setRows2] = useState([]);
    const [rows3, setRows3] = useState([]);
    const [rows4, setRows4] = useState([]);
    const [rows5, setRows5] = useState([]);
    const [rows6, setRows6] = useState([]);
    const [rows7, setRows7] = useState([]);
    const [rows8, setRows8] = useState([]);
    const [rows9, setRows9] = useState([]);
    const [rows10, setRows10] = useState([]);
    const [rows11, setRows11] = useState([]);
    const [rows12, setRows12] = useState([]);
    const [rows13, setRows13] = useState([]);
    const [rows14, setRows14] = useState([]);
    const [rows15, setRows15] = useState([]);
    const [rows16, setRows16] = useState([]);
    const [rows17, setRows17] = useState([]);
    const [rows18, setRows18] = useState([]);

    const [rowsIds1, setRowsIds1] = useState([]);
    const [rowsIds2, setRowsIds2] = useState([]);
    const [rowsIds3, setRowsIds3] = useState([]);
    const [rowsIds4, setRowsIds4] = useState([]);
    const [rowsIds5, setRowsIds5] = useState([]);
    const [rowsIds6, setRowsIds6] = useState([]);
    const [rowsIds7, setRowsIds7] = useState([]);
    const [rowsIds8, setRowsIds8] = useState([]);
    const [rowsIds9, setRowsIds9] = useState([]);
    const [rowsIds10, setRowsIds10] = useState([]);
    const [rowsIds11, setRowsIds11] = useState([]);
    const [rowsIds12, setRowsIds12] = useState([]);
    const [rowsIds13, setRowsIds13] = useState([]);
    const [rowsIds14, setRowsIds14] = useState([]);
    const [rowsIds15, setRowsIds15] = useState([]);
    const [rowsIds16, setRowsIds16] = useState([]);
    const [rowsIds17, setRowsIds17] = useState([]);
    const [rowsIds18, setRowsIds18] = useState([]);

    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalInsertar1, setModalInsertar1] = useState(false);
    const [modalInsertarAerobio, setModalInsertarAerobio] = useState(false);
    const [modalInsertarLegionela, setModalInsertarLegionela] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);
    const [modalEditar1, setModalEditar1] = useState(false);
    const [modalEditarAerobio, setModalEditarAerobio] = useState(false);
    const [modalEditarLegionela, setModalEditarLegionela] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);

    const [confParametrosElementoPlantaCliente, setConfParametrosElementoPlantaCliente] = useState([]);
    const [confNivelesPlantasCliente, setConfNivelesPlantasCliente] = useState([]);

    const [parametrosAnalisisPlanta, setParametrosAnalisisPlanta] = useState([]);

    const [analisisSeleccionado, setAnalisisSeleccionado] = useState({
        id: 0,
        codigoCliente: 0,
        nombreCliente: '',
        oferta: 0,
        pedido: 0,
        elemento: 0,
        nombreElemento: '',
        periodo: '',
        analisis: 0,
        fecha: null,
        realizado: false,
        fechaRealizado: null,
        observaciones: '',
        pdf: 0,
        recibido: false,
        fechaPdf: null,
        resultado: '',
        facturado: false,
        numeroFacturado: '',
        cancelado: false,
        comentarios: '',
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    const [fileChange, setFileChange] = useState(null);

    const protocolos = [
        {
            value: 'Desinfeccion Parado 4B',
            label: 'Desinfeccion Parado 4B'
        },
        {
            value: 'Desinfeccion Continuo 4B',
            label: 'Desinfeccion Continuo 4B'
        },
        {
            value: 'Desinfeccion limpieza parado',
            label: 'Desinfeccion limpieza parado'
        },
        {
            value: 'Desinfeccion limpieza continuo',
            label: 'Desinfeccion limpieza continuo'
        },
        {
            value: 'Desinfeccion Protocolo 4C',
            label: 'Desinfeccion Protocolo 4C'
        },
        {
            value: 'Desinfeccion de aporte',
            label: 'Desinfeccion de aporte'
        },
        {
            value: 'Desinfeccion contraincendios',
            label: 'Desinfeccion contraincendios'
        },
        {
            value: 'Desinfeccion parado fuente ornamental',
            label: 'Desinfeccion parado fuente ornamental'
        },
        {
            value: 'Desinfeccion ACS (termico)',
            label: 'Desinfeccion ACS (termico)'
        },
        {
            value: 'Desinfeccion AFCH (cloracion)',
            label: 'Desinfeccion AFCH (cloracion)'
        }
    ]

    const [FilasSeleccionadas1, setFilasSeleccionadas1] = useState([]);
    const [FilasSeleccionadas2, setFilasSeleccionadas2] = useState([]);
    const [FilasSeleccionadas3, setFilasSeleccionadas3] = useState([]);
    const [FilasSeleccionadas4, setFilasSeleccionadas4] = useState([]);
    const [FilasSeleccionadas5, setFilasSeleccionadas5] = useState([]);
    const [FilasSeleccionadas6, setFilasSeleccionadas6] = useState([]);
    const [FilasSeleccionadas7, setFilasSeleccionadas7] = useState([]);
    const [FilasSeleccionadas8, setFilasSeleccionadas8] = useState([]);
    const [FilasSeleccionadas9, setFilasSeleccionadas9] = useState([]);
    const [FilasSeleccionadas10, setFilasSeleccionadas10] = useState([]);
    const [FilasSeleccionadas11, setFilasSeleccionadas11] = useState([]);
    const [FilasSeleccionadas12, setFilasSeleccionadas12] = useState([]);
    const [FilasSeleccionadas13, setFilasSeleccionadas13] = useState([]);
    const [FilasSeleccionadas14, setFilasSeleccionadas14] = useState([]);
    const [FilasSeleccionadas15, setFilasSeleccionadas15] = useState([]);
    const [FilasSeleccionadas16, setFilasSeleccionadas16] = useState([]);
    const [FilasSeleccionadas17, setFilasSeleccionadas17] = useState([]);
    const [FilasSeleccionadas18, setFilasSeleccionadas18] = useState([]);
    const [FilasSeleccionadas19, setFilasSeleccionadas19] = useState([]);
    const [FilasSeleccionadas20, setFilasSeleccionadas20] = useState([]);
    const [FilasSeleccionadasOtros, setFilasSeleccionadasOtros] = useState([]);

    const [analisisEliminar, setAnalisisEliminar] = useState([]);
    const [analisisEditar, setAnalisisEditar] = useState([]);
    const [elementoTareaEditar, setElementoTareaEditar] = useState([]);

    const [oferta, setOferta] = useState([]);

    const [clientes, setClientes] = useState([]);

    const [elementos, setElementos] = useState([]);
    const [operarios, setOperarios] = useState([]);

    const [analisisNivelesPlantasCliente, setAnalisisNivelesPlantasCliente] = useState([]);

    const [analisis, setAnalisis] = useState([]);
    const [analisisTable, setAnalisisTable] = useState({});

    const [periodo, setPeriodo] = useState("");
    const [fecha, setFecha] = useState("");

    const [dataCliente, setDataCliente] = useState([])

    const [actualState, changeCheckState] = useState(false);
    const [actualState2, changeActualState] = useState(false);

    const columnas = [
        //visibles
        { title: 'Periodo', field: 'periodo', width: 150 },
        { title: 'Fecha', field: 'fecha', type: 'date', width: 150 },
        { title: 'Recogido', field: 'recogido', type: 'boolean', width: 100 },
        { title: 'Fecha Recogido', field: 'fechaRecogido', type: 'date', width: 150 },
        { title: 'Realizado', field: 'realizado', type: 'boolean', width: 100 },
        { title: 'Fecha Realizado', field: 'fechaRealizado', type: 'date', width: 120 },
        { title: 'Observaciones', field: 'observaciones', width: 250 },
        { title: 'Facturado', field: 'facturado', type: 'boolean', width: 100 },
        { title: 'Numero Factura', field: 'numeroFacturado', width: 150 },
        { title: 'PDF', field: 'pdf', width: 150 },
        { title: 'PDF Recibido', field: 'recibido', type: 'boolean', width: 100 },
        { title: 'Fecha PDF', field: 'fechaPdf', type: 'date', width: 150 },
        { title: 'Cancelado', field: 'cancelado', type: 'boolean', width: 100 },
        { title: 'Comentario', field: 'comentario', width: 200 }
    ];

    const columnas1 = [

        //visibles
        { title: 'Periodo', field: 'periodo', width: 150 },
        { title: 'Fecha', field: 'fecha', type: 'date', width: 200 },
        { title: 'Realizado', field: 'realizado', type: 'boolean', width: 120 },
        { title: 'Fecha Realizado', field: 'fechaRealizado', type: 'date', width: 200 },
        { title: 'Observaciones', field: 'observaciones', width: 300 },
        { title: 'Facturado', field: 'facturado', type: 'boolean', width: 100 },
        { title: 'Numero Factura', field: 'numeroFacturado', width: 150 },
        { title: 'Cancelado', field: 'cancelado', type: 'boolean', width: 100 },
        { title: 'Comentario', field: 'comentario', width: 200 }
    ];

    const columnasLegionela = [

        //visibles
        { title: 'Periodo', field: 'periodo', width: 150 },
        { title: 'Fecha', field: 'fecha', type: 'date', width: 150 },
        { title: 'Recogido', field: 'recogido', type: 'boolean', width: 100 },
        { title: 'Fecha Recogido', field: 'fechaRecogido', type: 'date', width: 150 },
        { title: 'Realizado', field: 'realizado', type: 'boolean', width: 120 },
        { title: 'Fecha Realizado', field: 'fechaRealizado', type: 'date', width: 150 },
        { title: 'Observaciones', field: 'observaciones', width: 250 },
        { title: 'Facturado', field: 'facturado', type: 'boolean', width: 100 },
        { title: 'Numero Factura', field: 'numeroFacturado', width: 150 },
        { title: 'Resultado', field: 'resultado', width: 120 },
        { title: 'PDF', field: 'pdf', width: 150 },
        { title: 'PDF Recibido', field: 'recibido', type: 'boolean', width: 100 },
        { title: 'Fecha PDF', field: 'fechaPdf', type: 'date', width: 150 },
        { title: 'Cancelado', field: 'cancelado', type: 'boolean', width: 100 },
        { title: 'Comentario', field: 'comentario', width: 200 }
    ];

    const columnasAerobios = [

        //visibles
        { title: 'Periodo', field: 'periodo', width: 150 },
        { title: 'Fecha', field: 'fecha', type: 'date', width: 150 },
        { title: 'Recogido', field: 'recogido', type: 'boolean', width: 100 },
        { title: 'Fecha Recogido', field: 'fechaRecogido', type: 'date', width: 150 },
        { title: 'Realizado', field: 'realizado', type: 'boolean', width: 100 },
        { title: 'Fecha Realizado', field: 'fechaRealizado', type: 'date', width: 150 },
        { title: 'Observaciones', field: 'observaciones', width: 250 },
        { title: 'Facturado', field: 'facturado', type: 'boolean', width: 100 },
        { title: 'Numero Factura', field: 'numeroFacturado', width: 150 },
        { title: 'Resultado', field: 'resultado', width: 120 },
        { title: 'PDF', field: 'pdf', width: 150 },
        { title: 'PDF Recibido', field: 'recibido', type: 'boolean', width: 100 },
        { title: 'Fecha PDF', field: 'fechaPdf', type: 'date', width: 150 },
        { title: 'Cancelado', field: 'cancelado', type: 'boolean', width: 100 },
        { title: 'Comentario', field: 'comentario', width: 200 }
    ];

    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);
    const [data5, setData5] = useState([]);
    const [data6, setData6] = useState([]);
    const [data7, setData7] = useState([]);
    const [data8, setData8] = useState([]);
    const [data9, setData9] = useState([]);
    const [data10, setData10] = useState([]);
    const [data11, setData11] = useState([]);
    const [data12, setData12] = useState([]);
    const [data13, setData13] = useState([]);
    const [data14, setData14] = useState([]);
    const [data15, setData15] = useState([]);
    const [data16, setData16] = useState([]);
    const [data17, setData17] = useState([]);
    const [data18, setData18] = useState([]);
    const [dataTablas, setDataTablas] = useState([]);
    const [dataEntregas, setDataEntregas] = useState([]);
    const [dataOtros, setDataOtros] = useState([]);

    const [elementosAutocomplete, setElementosAutocomplete] = useState([]);
    const [analisisAutocomplete, setAnalisisAutocomplete] = useState([]);

    const styles = useStyles();
    const stylesParagraph = useStylesParagraph();

    const [snackData, setSnackData] = useState({ open: false, msg: 'Testing', severity: 'success' });

    useEffect(() => {

        opcionesFiltradas = [];

        const lista = confNivelesPlantasCliente.filter(planta => planta.codigoCliente === analisisSeleccionado.codigoCliente && planta.oferta === analisisSeleccionado.oferta);
        lista.map(elemento => {
            opcionesFiltradas.push(elementos.filter(elem => elem.id === elemento.id_Elemento)[0]);
        })

        setElementosAutocomplete(opcionesFiltradas);


    }, [analisisSeleccionado.codigoCliente, analisisSeleccionado.oferta]);

    useEffect(() => {

        opcionesFiltradasAnalisis = [];
        opcionesTablasFiltradasAnalisis = [];

        const lista = confNivelesPlantasCliente.filter(planta => planta.codigoCliente === analisisSeleccionado.codigoCliente && planta.oferta === analisisSeleccionado.oferta && planta.id_Elemento === analisisSeleccionado.elemento);

        lista.map(analisis => {
            opcionesFiltradasAnalisis.push(analisisNivelesPlantasCliente.filter(anal => anal.id_NivelesPlanta === analisis.id));
        })

        opcionesFiltradasAnalisis.map(nomAnalisis => {
            nomAnalisis.map(anal => {
                opcionesTablasFiltradasAnalisis.push(analisis.filter(an => an.id === anal.id_Analisis)[0])
            })
        })

        setDataTablas(opcionesTablasFiltradasAnalisis)
        setAnalisisAutocomplete(opcionesTablasFiltradasAnalisis)

    }, [analisisSeleccionado.elemento])

    useEffect(() => {

        if (data1.length > 0) {
            setRows1(data1);
        }

        if (data2.length > 0) {
            setRows2(data2);
        }

        if (data3.length > 0) {
            setRows3(data3);
        }

        if (data4.length > 0) {
            setRows4(data4);
        }

        if (data5.length > 0) {
            setRows5(data5);
        }

        if (data6.length > 0) {
            setRows6(data6);
        }

        if (data7.length > 0) {
            setRows7(data7);
        }

        if (data8.length > 0) {
            setRows8(data8);
        }

        if (data9.length > 0) {
            setRows9(data9);
        }

        if (data10.length > 0) {
            setRows10(data10);
        }

        if (data11.length > 0) {
            setRows11(data11);
        }

        if (data12.length > 0) {
            setRows12(data12);
        }

        if (data12.length > 0) {
            setRows12(data12);
        }

        if (data13.length > 0) {
            setRows13(data13);
        }

        if (data14.length > 0) {
            setRows14(data14);
        }

        if (data15.length > 0) {
            setRows15(data15);
        }

        if (data16.length > 0) {
            setRows16(data16);
        }

        if (data17.length > 0) {
            setRows17(data17);
        }

        if (data18.length > 0) {
            setRows18(data18);
        }

    }, [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15, data16, data17, data18]);

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setAnalisisSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleChangeCheckbox = e => {
        const { name, value, checked } = e.target
        setAnalisisSeleccionado(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }

    const handleChangeCheckbox2 = e => {
        changeActualState(e.target.checked)
    }

    const handlePdf = e => {
        setFileChange(e.target.files[0])
    }

    function formateandofechas(fecha) {
        const fecha1 = new Date(fecha)

        const fecha2 = fecha1.getFullYear() +
            '-' + String(fecha1.getMonth() + 1).padStart(2, '0') +
            '-' + String(fecha1.getDate()).padStart(2, '0')

        return fecha2
    }

    const subirArchivo = async () => {
        const resp = await subirPdf(analisisSeleccionado.id, fileChange)
        return resp;
    }

    const abrirCerrarModalInsertar = () => {
        if (modalInsertar) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: analisisSeleccionado.codigoCliente,
                nombreCliente: analisisSeleccionado.nombreCliente,
                oferta: analisisSeleccionado.oferta,
                pedido: analisisSeleccionado.pedido,
                elemento: analisisSeleccionado.elemento,
                nombreElemento: analisisSeleccionado.nombreElemento,
                periodo: '',
                analisis: 0,
                fecha: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: '',
                pdf: '',
                fechaPdf: null,
                resultado: '',
                facturado: false,
                numeroFacturado: '',
                cancelado: false,
                comentarios: '',
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
            })
            setModalInsertar(!modalInsertar);
        } else {
            setModalInsertar(!modalInsertar);
        }
    }

    const abrirCerrarModalInsertar1 = () => {
        if (modalInsertar1) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: analisisSeleccionado.codigoCliente,
                nombreCliente: analisisSeleccionado.nombreCliente,
                oferta: analisisSeleccionado.oferta,
                pedido: analisisSeleccionado.pedido,
                elemento: analisisSeleccionado.elemento,
                nombreElemento: analisisSeleccionado.nombreElemento,
                periodo: '',
                analisis: 0,
                fecha: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: '',
                pdf: '',
                fechaPdf: null,
                resultado: '',
                facturado: false,
                numeroFacturado: '',
                cancelado: false,
                comentarios: '',
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
            })
            setModalInsertar1(!modalInsertar1);
        } else {
            setModalInsertar1(!modalInsertar1);
        }
    }

    const abrirCerrarModalInsertarAerobio = () => {
        if (modalInsertarAerobio) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: analisisSeleccionado.codigoCliente,
                nombreCliente: analisisSeleccionado.nombreCliente,
                oferta: analisisSeleccionado.oferta,
                pedido: analisisSeleccionado.pedido,
                elemento: analisisSeleccionado.elemento,
                nombreElemento: analisisSeleccionado.nombreElemento,
                periodo: '',
                analisis: 0,
                fecha: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: '',
                pdf: '',
                fechaPdf: null,
                resultado: '',
                facturado: false,
                numeroFacturado: '',
                cancelado: false,
                comentarios: '',
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
            })
            setModalInsertarAerobio(!modalInsertarAerobio);
        } else {
            setModalInsertarAerobio(!modalInsertarAerobio);
        }
    }

    const abrirCerrarModalInsertarLegionela = () => {
        if (modalInsertarLegionela) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: analisisSeleccionado.codigoCliente,
                nombreCliente: analisisSeleccionado.nombreCliente,
                oferta: analisisSeleccionado.oferta,
                pedido: analisisSeleccionado.pedido,
                elemento: analisisSeleccionado.elemento,
                nombreElemento: analisisSeleccionado.nombreElemento,
                periodo: '',
                analisis: 0,
                fecha: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: '',
                pdf: '',
                fechaPdf: null,
                resultado: '',
                facturado: false,
                numeroFacturado: '',
                cancelado: false,
                comentarios: '',
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
            })
            setModalInsertarLegionela(!modalInsertarLegionela);
        } else {
            setModalInsertarLegionela(!modalInsertarLegionela);
        }
    }

    const abrirCerrarModalEditar = () => {
        if (modalEditar) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: analisisSeleccionado.codigoCliente,
                nombreCliente: analisisSeleccionado.nombreCliente,
                oferta: analisisSeleccionado.oferta,
                pedido: analisisSeleccionado.pedido,
                elemento: analisisSeleccionado.elemento,
                nombreElemento: analisisSeleccionado.nombreElemento,
                periodo: '',
                analisis: 0,
                fecha: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: '',
                pdf: 0,
                fechaPdf: null,
                resultado: '',
                facturado: false,
                numeroFacturado: '',
                cancelado: false,
                comentarios: '',
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
            })
            setModalEditar(!modalEditar);
        } else {
            setModalEditar(!modalEditar);
        }
    }

    const abrirCerrarModalEditar1 = () => {
        if (modalEditar1) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: analisisSeleccionado.codigoCliente,
                nombreCliente: analisisSeleccionado.nombreCliente,
                oferta: analisisSeleccionado.oferta,
                pedido: analisisSeleccionado.pedido,
                elemento: analisisSeleccionado.elemento,
                nombreElemento: analisisSeleccionado.nombreElemento,
                periodo: '',
                analisis: 0,
                fecha: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: '',
                pdf: 0,
                fechaPdf: null,
                resultado: '',
                facturado: false,
                numeroFacturado: '',
                cancelado: false,
                comentarios: '',
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
            })
            setModalEditar1(!modalEditar1);
        } else {
            setModalEditar1(!modalEditar1);
        }
    }

    const abrirCerrarModalEditarAerobio = () => {
        if (modalEditarAerobio) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: analisisSeleccionado.codigoCliente,
                nombreCliente: analisisSeleccionado.nombreCliente,
                oferta: analisisSeleccionado.oferta,
                pedido: analisisSeleccionado.pedido,
                elemento: analisisSeleccionado.elemento,
                nombreElemento: analisisSeleccionado.nombreElemento,
                periodo: '',
                analisis: 0,
                fecha: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: '',
                pdf: 0,
                fechaPdf: null,
                resultado: '',
                facturado: false,
                numeroFacturado: '',
                cancelado: false,
                comentarios: '',
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
            })
            setModalEditarAerobio(!modalEditarAerobio);
        } else {
            setModalEditarAerobio(!modalEditarAerobio);
        }
    }

    const abrirCerrarModalEditarLegionela = () => {
        if (modalEditarLegionela) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: analisisSeleccionado.codigoCliente,
                nombreCliente: analisisSeleccionado.nombreCliente,
                oferta: analisisSeleccionado.oferta,
                pedido: analisisSeleccionado.pedido,
                elemento: analisisSeleccionado.elemento,
                nombreElemento: analisisSeleccionado.nombreElemento,
                periodo: '',
                analisis: 0,
                fecha: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: '',
                pdf: 0,
                fechaPdf: null,
                resultado: '',
                facturado: false,
                numeroFacturado: '',
                cancelado: false,
                comentarios: '',
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
            })
            setModalEditarLegionela(!modalEditarLegionela);
        } else {
            setModalEditarLegionela(!modalEditarLegionela);
        }
    }

    const abrirCerrarModalEliminar = () => {
        if (modalEliminar) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: analisisSeleccionado.codigoCliente,
                nombreCliente: analisisSeleccionado.nombreCliente,
                oferta: analisisSeleccionado.oferta,
                pedido: analisisSeleccionado.pedido,
                elemento: analisisSeleccionado.elemento,
                nombreElemento: analisisSeleccionado.nombreElemento,
                periodo: '',
                analisis: 0,
                fecha: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: '',
                pdf: '',
                fechaPdf: null,
                resultado: '',
                facturado: false,
                numeroFacturado: '',
                cancelado: false,
                comentarios: '',
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
            })
            setModalEliminar(!modalEliminar);
        } else {
            setModalEliminar(!modalEliminar);
        }
    }

    const GetOperarios = async () => {
        axios.get("/usuario", token).then(response => {
            const usuario = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setOperarios(usuario);
        }, [])
    }

    const GetClientes = async () => {
        axios.get("/cliente", token).then(response => {
            const cliente = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setClientes(cliente);
        }, [])
    }

    const GetAnalisis = async () => {
        axios.get("/analisis", token).then(response => {
            const analisi = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setAnalisis(analisi);
        }, [])
    }

    const GetOfertas = async () => {
        axios.get("/ofertasclientes", token).then(response => {
            const oferta = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setOferta(oferta);
        }, [])
    }

    const GetElementos = async () => {
        axios.get("/elementosplanta", token).then(response => {
            const elemento = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setElementos(elemento);
        }, [])
    }

    const GetParametrosAnalisisPlanta = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData(response.data.data)
        })
    }

    const GetAnalisisNivelesPlantasCliente = async () => {
        axios.get("/analisisnivelesplantascliente", token).then(response => {
            const analisisNiveles = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setAnalisisNivelesPlantasCliente(analisisNiveles);
        })
    }

    const GetConfNivelesPlantasCliente = async () => {
        axios.get("/confnivelesplantascliente", token).then(response => {
            const niveles = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setConfNivelesPlantasCliente(niveles);
        })
    }

    const peticionGetEntregas = async () => {
        axios.get("/entregas", token).then(response => {
            setDataEntregas(response.data.data)
        })
    }

    const FisicoQuimicoTorre = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData1(response.data.data.filter(analisis => analisis.analisis === 1 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        })
    }

    const FisicoQuimicoAporte = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData2(response.data.data.filter(analisis => analisis.analisis === 2 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        })
    }

    const FisicoQuimicoAlimentacion = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData3(response.data.data.filter(analisis => analisis.analisis === 3 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        })
    }

    const FisicoQuimicoRechazo = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData4(response.data.data.filter(analisis => analisis.analisis === 4 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        })
    }

    const FisicoQuimicoCondensados = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData5(response.data.data.filter(analisis => analisis.analisis === 5 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        })
    }

    const FisicoQuimicoCaldera = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData6(response.data.data.filter(analisis => analisis.analisis === 6 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        })
    }

    const Aerobios = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData7(response.data.data.filter(analisis => analisis.analisis === 7 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        })
    }

    const Legionela = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData8(response.data.data.filter(analisis => analisis.analisis === 8 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        })
    }

    const AguasResiduales = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData9(response.data.data.filter(analisis => analisis.analisis === 9 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        })
    }

    const Desinfecciones = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData10(response.data.data.filter(analisis => analisis.analisis === 10 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        })
    }

    const Osmosis = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData11(response.data.data.filter(analisis => analisis.analisis === 11 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        })
    }

    const AguaPozo = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData12(response.data.data.filter(analisis => analisis.analisis === 12 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        })
    }

    const DesinfeccionACS = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData13(response.data.data.filter(analisis => analisis.analisis === 13 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        })
    }

    const MantMaqFrio = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData14(response.data.data.filter(analisis => analisis.analisis === 14 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        })
    }

    const Mediciones = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData15(response.data.data.filter(analisis => analisis.analisis === 15 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        })
    }

    const ControlFugaGas = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData16(response.data.data.filter(analisis => analisis.analisis === 16 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        })
    }

    const AguaPotable = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData17(response.data.data.filter(analisis => analisis.analisis === 17 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        })
    }

    const RevisionBandeja = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData18(response.data.data.filter(analisis => analisis.analisis === 18 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        })
    }

    /*const Otros = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setDataOtros(response.data.data.filter(analisis => analisis.analisis !== "Físico-Químico Torre" && analisis.analisis && "Físico-Químico Aporte" && analisis.analisis !== "Físico-Químico Alimentación" && analisis.analisis !== "Físico-Químico Rechazo" && analisis.analisis !== "Físico-Químico Condensados" && analisis.analisis !== "Físico-Químico Caldera" && analisis.analisis !== "Aerobios" && analisis.analisis !== "Legionela" && analisis.analisis !== "Aguas Residuales" && analisis.analisis !== "Desinfecciones" && analisis.analisis !== "Osmosis" && analisis.analisis !== "AguaPozo" && analisis.analisis !== "Desinfección ACS" && analisis.analisis !== "Mantenimiento Maq Frio" && analisis.analisis !== "Mediciones" && analisis.analisis !== "Control Fuga Gas" && analisis.analisis !== "Agua Potable" && analisis.analisis !== "Revisión de Bandeja" && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        })
    }*/

    const descargarPdf = async () => {

        const response = await bajarPdf(analisisSeleccionado.pdf, analisisSeleccionado.nombreCliente, analisisSeleccionado.oferta, (elementoTareaEditar[0].nombre + '' +  elementoTareaEditar[0].numero) , analisisEditar[0].nombre, analisisSeleccionado.fecha, { headers: { 'Content-type' : 'application/pdf' }});
    }

    const descargarPdfNoFQ = async () => {
        const response = await bajarPdfNoFQ(analisisSeleccionado.pdf, analisisSeleccionado.nombreCliente, analisisSeleccionado.oferta, (elementoTareaEditar[0].nombre + '' +  elementoTareaEditar[0].numero) , analisisEditar[0].nombre, analisisSeleccionado.fecha, { headers: { 'Content-type' : 'application/pdf' }});
    }

    function FiltrarData() {
        setData1(data.filter(analisis => analisis.analisis === 1))
        setData2(data.filter(analisis => analisis.analisis === 2))
        setData3(data.filter(analisis => analisis.analisis === 3))
        setData4(data.filter(analisis => analisis.analisis === 4))
        setData5(data.filter(analisis => analisis.analisis === 5))
        setData6(data.filter(analisis => analisis.analisis === 6))
        setData7(data.filter(analisis => analisis.analisis === 7))
        setData8(data.filter(analisis => analisis.analisis === 8))
        setData9(data.filter(analisis => analisis.analisis === 9))
        setData10(data.filter(analisis => analisis.analisis === 10))
        setData11(data.filter(analisis => analisis.analisis === 11))
        setData12(data.filter(analisis => analisis.analisis === 12))
        setData13(data.filter(analisis => analisis.analisis === 13))
        setData14(data.filter(analisis => analisis.analisis === 14))
        setData15(data.filter(analisis => analisis.analisis === 15))
        setData16(data.filter(analisis => analisis.analisis === 16))
        setData17(data.filter(analisis => analisis.analisis === 17))
        setData18(data.filter(analisis => analisis.analisis === 18))
        //setDataOtros(data.filter(analisis => analisis.analisis !== "Físico-Químico Torre" && analisis.analisis && "Físico-Químico Aporte" && analisis.analisis !== "Físico-Químico Alimentación" && analisis.analisis !== "Físico-Químico Rechazo" && analisis.analisis !== "Físico-Químico Condensados" && analisis.analisis !== "Físico-Químico Caldera" && analisis.analisis !== "Aerobios" && analisis.analisis !== "Legionela" && analisis.analisis !== "Aguas Residuales" && analisis.analisis !== "Desinfecciones" && analisis.analisis !== "Osmosis" && analisis.analisis !== "AguaPozo" && analisis.analisis !== "Desinfección ACS" && analisis.analisis !== "Mantenimiento Maq Frio" && analisis.analisis !== "Mediciones" && analisis.analisis !== "Control Fuga Gas" && analisis.analisis !== "Agua Potable" && analisis.analisis !== "Revisión de Bandeja"))
    }

    useEffect(() => {
        GetOperarios();
        GetParametrosAnalisisPlanta();
        FiltrarData();
        GetOfertas();
        GetClientes();
        GetAnalisis();
        GetElementos();
        GetConfNivelesPlantasCliente();
        GetAnalisisNivelesPlantasCliente();
        FisicoQuimicoTorre();
        FisicoQuimicoAporte();
        FisicoQuimicoAlimentacion();
        FisicoQuimicoRechazo();
        FisicoQuimicoCondensados();
        FisicoQuimicoCaldera();
        Aerobios();
        Legionela();
        AguasResiduales();
        Desinfecciones();
        Osmosis();
        AguaPozo();
        DesinfeccionACS();
        MantMaqFrio();
        Mediciones();
        ControlFugaGas();
        AguaPotable();
        RevisionBandeja();
        peticionGetEntregas();
    }, [])

    const peticionPost = async () => {
        analisisSeleccionado.id = null;
        await axios.post("/parametrosanalisisplanta", analisisSeleccionado, token)
            .then(response => {
                AguasResiduales();
                Desinfecciones();
                AguaPozo();
                DesinfeccionACS();
                MantMaqFrio();
                Mediciones();
                ControlFugaGas();
                AguaPotable();
                RevisionBandeja();
                abrirCerrarModalInsertar();
                GetParametrosAnalisisPlanta();
                //Otros();
                setAnalisisSeleccionado({
                    id: 0,
                    codigoCliente: analisisSeleccionado.codigoCliente,
                    nombreCliente: analisisSeleccionado.nombreCliente,
                    oferta: analisisSeleccionado.oferta,
                    pedido: analisisSeleccionado.pedido,
                    elemento: analisisSeleccionado.elemento,
                    nombreElemento: analisisSeleccionado.nombreElemento,
                    periodo: '',
                    analisis: 0,
                    fecha: null,
                    realizado: false,
                    fechaRealizado: null,
                    observaciones: '',
                    pdf: '',
                    fechaPdf: null,
                    resultado: '',
                    facturado: false,
                    numeroFacturado: '',
                    cancelado: false,
                    comentarios: '',
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null,
                })
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPost1 = async () => {
        analisisSeleccionado.id = null;
        await axios.post("/parametrosanalisisplanta", analisisSeleccionado, token)
            .then(response => {
                //setData(data.concat(response.data));
                FisicoQuimicoTorre();
                FisicoQuimicoAporte();
                FisicoQuimicoAlimentacion();
                FisicoQuimicoRechazo();
                FisicoQuimicoCondensados();
                FisicoQuimicoCaldera();
                Osmosis();
                abrirCerrarModalInsertar1();
                GetParametrosAnalisisPlanta();
                setAnalisisSeleccionado({
                    id: 0,
                    codigoCliente: analisisSeleccionado.codigoCliente,
                    nombreCliente: analisisSeleccionado.nombreCliente,
                    oferta: analisisSeleccionado.oferta,
                    pedido: analisisSeleccionado.pedido,
                    elemento: analisisSeleccionado.elemento,
                    nombreElemento: analisisSeleccionado.nombreElemento,
                    periodo: '',
                    analisis: 0,
                    fecha: null,
                    realizado: false,
                    fechaRealizado: null,
                    observaciones: '',
                    pdf: '',
                    fechaPdf: null,
                    resultado: '',
                    facturado: false,
                    numeroFacturado: '',
                    cancelado: false,
                    comentarios: '',
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null,
                })
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPostAerobio = async () => {
        analisisSeleccionado.id = null;
        await axios.post("/parametrosanalisisplanta", analisisSeleccionado, token)
            .then(response => {
                Aerobios();
                abrirCerrarModalInsertarAerobio();
                GetParametrosAnalisisPlanta();
                setAnalisisSeleccionado({
                    id: 0,
                    codigoCliente: analisisSeleccionado.codigoCliente,
                    nombreCliente: analisisSeleccionado.nombreCliente,
                    oferta: analisisSeleccionado.oferta,
                    pedido: analisisSeleccionado.pedido,
                    elemento: analisisSeleccionado.elemento,
                    nombreElemento: analisisSeleccionado.nombreElemento,
                    periodo: '',
                    analisis: 0,
                    fecha: null,
                    realizado: false,
                    fechaRealizado: null,
                    observaciones: '',
                    pdf: '',
                    fechaPdf: null,
                    resultado: '',
                    facturado: false,
                    numeroFacturado: '',
                    cancelado: false,
                    comentarios: '',
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null,
                })
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPostLegionela = async () => {
        analisisSeleccionado.id = null;
        await axios.post("/parametrosanalisisplanta", analisisSeleccionado, token)
            .then(response => {
                Legionela();
                abrirCerrarModalInsertarLegionela();
                GetParametrosAnalisisPlanta();
                setAnalisisSeleccionado({
                    id: 0,
                    codigoCliente: analisisSeleccionado.codigoCliente,
                    nombreCliente: analisisSeleccionado.nombreCliente,
                    oferta: analisisSeleccionado.oferta,
                    pedido: analisisSeleccionado.pedido,
                    elemento: analisisSeleccionado.elemento,
                    nombreElemento: analisisSeleccionado.nombreElemento,
                    periodo: '',
                    analisis: 0,
                    fecha: null,
                    realizado: false,
                    fechaRealizado: null,
                    observaciones: '',
                    pdf: '',
                    fechaPdf: null,
                    resultado: '',
                    facturado: false,
                    numeroFacturado: '',
                    cancelado: false,
                    comentarios: '',
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null,
                })
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
                if(fileChange != null){
                    subirArchivo()
                }
                AguasResiduales();
                Desinfecciones();
                AguaPozo();
                DesinfeccionACS();
                MantMaqFrio();
                Mediciones();
                ControlFugaGas();
                AguaPotable();
                RevisionBandeja();
                GetParametrosAnalisisPlanta();
                //Otros();
                abrirCerrarModalEditar();
                setAnalisisSeleccionado({
                    id: 0,
                    codigoCliente: analisisSeleccionado.codigoCliente,
                    nombreCliente: analisisSeleccionado.nombreCliente,
                    oferta: analisisSeleccionado.oferta,
                    pedido: analisisSeleccionado.pedido,
                    elemento: analisisSeleccionado.elemento,
                    nombreElemento: analisisSeleccionado.nombreElemento,
                    periodo: '',
                    analisis: 0,
                    fecha: null,
                    realizado: false,
                    fechaRealizado: null,
                    observaciones: '',
                    pdf: 0,
                    fechaPdf: null,
                    resultado: '',
                    facturado: false,
                    numeroFacturado: '',
                    cancelado: false,
                    comentarios: '',
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null,
                })
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPut1 = async () => {
        await axios.put("/parametrosanalisisplanta?id=" + analisisSeleccionado.id, analisisSeleccionado, token)
            .then(response => {
                var analisisModificado = data;
                analisisModificado.map(analisi => {
                    if (analisi.id === analisisSeleccionado.id) {
                        analisi = analisisSeleccionado
                    }
                });
                FisicoQuimicoTorre();
                FisicoQuimicoAporte();
                FisicoQuimicoAlimentacion();
                FisicoQuimicoRechazo();
                FisicoQuimicoCondensados();
                FisicoQuimicoCaldera();
                Osmosis();
                GetParametrosAnalisisPlanta();
                abrirCerrarModalEditar1();
                setAnalisisSeleccionado({
                    id: 0,
                    codigoCliente: analisisSeleccionado.codigoCliente,
                    nombreCliente: analisisSeleccionado.nombreCliente,
                    oferta: analisisSeleccionado.oferta,
                    pedido: analisisSeleccionado.pedido,
                    elemento: analisisSeleccionado.elemento,
                    nombreElemento: analisisSeleccionado.nombreElemento,
                    periodo: '',
                    analisis: 0,
                    fecha: null,
                    realizado: false,
                    fechaRealizado: null,
                    observaciones: '',
                    pdf: 0,
                    fechaPdf: null,
                    resultado: '',
                    facturado: false,
                    numeroFacturado: '',
                    cancelado: false,
                    comentarios: '',
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null,
                })
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPutAerobio = async () => {
        await axios.put("/parametrosanalisisplanta?id=" + analisisSeleccionado.id, analisisSeleccionado, token)
            .then(response => {
                var analisisModificado = data;
                analisisModificado.map(analisi => {
                    if (analisi.id === analisisSeleccionado.id) {
                        analisi = analisisSeleccionado
                    }
                });
                if(fileChange != null){
                    subirArchivo()
                }
                Aerobios();
                GetParametrosAnalisisPlanta();
                abrirCerrarModalEditarAerobio();
                setAnalisisSeleccionado({
                    id: 0,
                    codigoCliente: analisisSeleccionado.codigoCliente,
                    nombreCliente: analisisSeleccionado.nombreCliente,
                    oferta: analisisSeleccionado.oferta,
                    pedido: analisisSeleccionado.pedido,
                    elemento: analisisSeleccionado.elemento,
                    nombreElemento: analisisSeleccionado.nombreElemento,
                    periodo: '',
                    analisis: 0,
                    fecha: null,
                    realizado: false,
                    fechaRealizado: null,
                    observaciones: '',
                    pdf: 0,
                    fechaPdf: null,
                    resultado: '',
                    facturado: false,
                    numeroFacturado: '',
                    cancelado: false,
                    comentarios: '',
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null,
                })
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPutLegionela = async () => {
        await axios.put("/parametrosanalisisplanta?id=" + analisisSeleccionado.id, analisisSeleccionado, token)
            .then(response => {
                var analisisModificado = data;
                analisisModificado.map(analisi => {
                    if (analisi.id === analisisSeleccionado.id) {
                        analisi = analisisSeleccionado
                    }
                });
                if(fileChange != null){
                    subirArchivo()
                }
                Legionela();
                GetParametrosAnalisisPlanta();
                abrirCerrarModalEditarLegionela();
                setAnalisisSeleccionado({
                    id: 0,
                    codigoCliente: analisisSeleccionado.codigoCliente,
                    nombreCliente: analisisSeleccionado.nombreCliente,
                    oferta: analisisSeleccionado.oferta,
                    pedido: analisisSeleccionado.pedido,
                    elemento: analisisSeleccionado.elemento,
                    nombreElemento: analisisSeleccionado.nombreElemento,
                    periodo: '',
                    analisis: 0,
                    fecha: null,
                    realizado: false,
                    fechaRealizado: null,
                    observaciones: '',
                    pdf: 0,
                    fechaPdf: null,
                    resultado: '',
                    facturado: false,
                    numeroFacturado: '',
                    cancelado: false,
                    comentarios: '',
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null,
                })
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionDelete = async () => {
        var i = 0;
        while (i < analisisEliminar.length) {
            await axios.delete("/parametrosanalisisplanta/" + analisisEliminar[i].id, token)
                .then(response => {
                    FisicoQuimicoTorre();
                    FisicoQuimicoAporte();
                    FisicoQuimicoAlimentacion();
                    FisicoQuimicoRechazo();
                    FisicoQuimicoCondensados();
                    FisicoQuimicoCaldera();
                    Aerobios();
                    Legionela();
                    AguasResiduales();
                    Desinfecciones();
                    Osmosis();
                    AguaPozo();
                    DesinfeccionACS();
                    MantMaqFrio();
                    Mediciones();
                    ControlFugaGas();
                    AguaPotable();
                    RevisionBandeja();
                    //Otros();
                    GetParametrosAnalisisPlanta();
                    abrirCerrarModalEliminar();
                    setAnalisisSeleccionado({
                        id: 0,
                        codigoCliente: analisisSeleccionado.codigoCliente,
                        nombreCliente: analisisSeleccionado.nombreCliente,
                        oferta: analisisSeleccionado.oferta,
                        pedido: analisisSeleccionado.pedido,
                        elemento: analisisSeleccionado.elemento,
                        nombreElemento: analisisSeleccionado.nombreElemento,
                        periodo: '',
                        analisis: 0,
                        fecha: null,
                        realizado: false,
                        fechaRealizado: null,
                        observaciones: '',
                        pdf: '',
                        fechaPdf: null,
                        resultado: '',
                        facturado: false,
                        numeroFacturado: '',
                        cancelado: false,
                        comentarios: '',
                        addDate: null,
                        addIdUser: null,
                        modDate: null,
                        modIdUser: null,
                        delDate: null,
                        delIdUser: null,
                        deleted: null,
                    })
                }).catch(error => {
                    console.log(error);
                })
            i++;
        }
    }


    const onChangeCliente = (e, value, name) => {

        if (e.target.textContent !== "") {
            setData1(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 1 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData2(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 2 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData3(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 3 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData4(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 4 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData5(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 5 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData6(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 6 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData7(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 7 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData8(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 8 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData9(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 9 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData10(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 10 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData11(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 11 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData12(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 12 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData13(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 13 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData14(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 14 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData15(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 15 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData16(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 16 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData17(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 17 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData18(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 18 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setDataTablas(opcionesFiltradasAnalisis)
            //setDataOtros(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis !== "Físico-Químico Torre" && analisis.analisis && "Físico-Químico Aporte" && analisis.analisis !== "Físico-Químico Alimentación" && analisis.analisis !== "Físico-Químico Rechazo" && analisis.analisis !== "Físico-Químico Condensados" && analisis.analisis !== "Físico-Químico Caldera" && analisis.analisis !== "Aerobios" && analisis.analisis !== "Legionela" && analisis.analisis !== "Aguas Residuales" && analisis.analisis !== "Desinfecciones" && analisis.analisis !== "Osmosis" && analisis.analisis !== "AguaPozo" && analisis.analisis !== "Desinfección ACS" && analisis.analisis !== "Mantenimiento Maq Frio" && analisis.analisis !== "Mediciones" && analisis.analisis !== "Control Fuga Gas" && analisis.analisis !== "Agua Potable" && analisis.analisis !== "Revisión de Bandeja" && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
        }

        setAnalisisSeleccionado((prevState) => ({
            ...prevState,
            [name]: value.codigo,
            oferta: '',
            elemento: '',
            nombreElemento: ''
        }))
    }

    const onChangeOferta = (e, value, name) => {

        if (e.target.textContent !== "") {
            setData1(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 1 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData2(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 2 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData3(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 3 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData4(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 4 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData5(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 5 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData6(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 6 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData7(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 7 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData8(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 8 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData9(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 9 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData10(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 10 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData11(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 11 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData12(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 12 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData13(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 13 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData14(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 14 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData15(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 15 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData16(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 16 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData17(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 17 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData18(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 18 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setDataTablas(opcionesFiltradasAnalisis)
            //setDataOtros(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis !== "Físico-Químico Torre" && analisis.analisis && "Físico-Químico Aporte" && analisis.analisis !== "Físico-Químico Alimentación" && analisis.analisis !== "Físico-Químico Rechazo" && analisis.analisis !== "Físico-Químico Condensados" && analisis.analisis !== "Físico-Químico Caldera" && analisis.analisis !== "Aerobios" && analisis.analisis !== "Legionela" && analisis.analisis !== "Aguas Residuales" && analisis.analisis !== "Desinfecciones" && analisis.analisis !== "Osmosis" && analisis.analisis !== "AguaPozo" && analisis.analisis !== "Desinfección ACS" && analisis.analisis !== "Mantenimiento Maq Frio" && analisis.analisis !== "Mediciones" && analisis.analisis !== "Control Fuga Gas" && analisis.analisis !== "Agua Potable" && analisis.analisis !== "Revisión de Bandeja" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
        }

        setAnalisisSeleccionado((prevState) => ({
            ...prevState,
            [name]: value.numeroOferta,
            elemento: '',
            nombreElemento: ''
        }))
    }

    const onChangeElemento = (e, value, name) => {

        if (e.target.textContent !== "") {
            setData1(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 1 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData2(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 2 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData3(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 3 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData4(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 4 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData5(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 5 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData6(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 6 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData7(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 7 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData8(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 8 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData9(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 9 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData10(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 10 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData11(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 11 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData12(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 12 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData13(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 13 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData14(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 14 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData15(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 15 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData16(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 16 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData17(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 17 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData18(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 18 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setDataTablas(opcionesFiltradasAnalisis)
            //setDataOtros(data.filter(analisis => analisis.elemento === e.target.textContent && analisis.analisis !== "Físico-Químico Torre" && analisis.analisis && "Físico-Químico Aporte" && analisis.analisis !== "Físico-Químico Alimentación" && analisis.analisis !== "Físico-Químico Rechazo" && analisis.analisis !== "Físico-Químico Condensados" && analisis.analisis !== "Físico-Químico Caldera" && analisis.analisis !== "Aerobios" && analisis.analisis !== "Legionela" && analisis.analisis !== "Aguas Residuales" && analisis.analisis !== "Desinfecciones" && analisis.analisis !== "Osmosis" && analisis.analisis !== "AguaPozo" && analisis.analisis !== "Desinfección ACS" && analisis.analisis !== "Mantenimiento Maq Frio" && analisis.analisis !== "Mediciones" && analisis.analisis !== "Control Fuga Gas" && analisis.analisis !== "Agua Potable" && analisis.analisis !== "Revisión de Bandeja" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
        }

        setAnalisisSeleccionado((prevState) => ({
            ...prevState,
            [name]: value.id,
            nombreElemento: e.target.textContent
        }))
    }

    useEffect(() => {

        const nombre = clientes.filter(cliente => cliente.codigo === analisisSeleccionado.codigoCliente);
        (nombre.length > 0) && setAnalisisSeleccionado({
            ...analisisSeleccionado,
            nombreCliente: nombre[0].razonSocial,
            pedido: ''
        })

    }, [analisisSeleccionado.codigoCliente])

    useEffect(() => {

        const pedido = oferta.filter(pedido => pedido.numeroOferta === analisisSeleccionado.oferta);
        (pedido.length > 0) && setAnalisisSeleccionado({
            ...analisisSeleccionado,
            pedido: pedido[0].pedido
        })

    }, [analisisSeleccionado.oferta])

    const handleSelectRow1 = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data1.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds1(ids);

    }

    const handleSelectRow2 = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data2.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds2(ids);

    }

    const handleSelectRow3 = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data3.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds3(ids);

    }

    const handleSelectRow4 = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data4.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds4(ids);

    }

    const handleSelectRow5 = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data5.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds5(ids);

    }

    const handleSelectRow6 = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data6.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds6(ids);

    }

    const handleSelectRow7 = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data7.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds7(ids);

    }

    const handleSelectRow8 = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data8.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds8(ids);

    }

    const handleSelectRow9 = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data9.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds9(ids);

    }

    const handleSelectRow10 = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data10.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds10(ids);

    }

    const handleSelectRow11 = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data11.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds11(ids);

    }

    const handleSelectRow12 = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data12.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds12(ids);

    }

    const handleSelectRow13 = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data13.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds13(ids);

    }

    const handleSelectRow14 = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data14.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds14(ids);

    }

    const handleSelectRow15 = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data15.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds15(ids);

    }

    const handleSelectRow16 = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data16.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds16(ids);

    }

    const handleSelectRow17 = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data17.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds17(ids);

    }

    const handleSelectRow18 = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data18.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds18(ids);

    }

    const handleSnackClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        setSnackData({ open: false, msg: '', severity: 'info' });

    };

    return (
        <MainLayout title="Visualización">

            <div className="home-container">
                <h4> Visualizacion de datos </h4>
                <div className="datos">
                    <Autocomplete
                        disableClearable={true}
                        id="Cliente"
                        name="codigoCliente"
                        options={clientes}
                        getOptionLabel={option => option.codigo}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} label="CodigoCliente" name="codigoCliente" />}
                        onChange={(event, value) => onChangeCliente(event, value, "codigoCliente")}
                    />
                    <Autocomplete
                        disableClearable={true}
                        id="Oferta"
                        options={oferta}
                        inputValue={analisisSeleccionado.oferta}
                        getOptionLabel={option => option.numeroOferta}
                        filterOptions={options => oferta.filter(oferta => oferta.codigoCliente === analisisSeleccionado.codigoCliente)}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} label="Oferta" name="oferta" />}
                        onChange={(event, value) => onChangeOferta(event, value, "oferta")}
                    />
                    <Autocomplete
                        disableClearable={true}
                        id="Elemento"
                        options={elementosAutocomplete}
                        inputValue={analisisSeleccionado.nombreElemento}
                        getOptionLabel={option => (option.nombre + ' ' + option.numero)}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} label="Elemento" name="elemento" />}
                        onChange={(event, value) => onChangeElemento(event, value, "elemento")}
                    />
                </div>
                <div className="datos2">
                    <Autocomplete
                        disableClearable={true}
                        id="Cliente"
                        name="nombreCliente"
                        options={clientes}
                        inputValue={analisisSeleccionado.nombreCliente}
                        getOptionLabel={option => option.razonSocial}
                        filterOptions={options => clientes.filter(cliente => cliente.codigo === analisisSeleccionado.codigoCliente)}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} label="NombreCliente" name="nombreCliente" />}
                        onChange={(event, value) => setAnalisisSeleccionado(prevState => ({
                            ...prevState,
                            nombreCliente: value.razonSocial
                        }))}
                    />
                    <Autocomplete
                        disableClearable={true}
                        id="Pedido"
                        options={oferta}
                        inputValue={analisisSeleccionado.pedido}
                        getOptionLabel={option => option.pedido}
                        filterOptions={options => oferta.filter(pedido => pedido.numeroOferta === analisisSeleccionado.oferta)}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} label="Pedido" name="pedido" />}
                        onChange={(event, value) => setAnalisisSeleccionado(prevState => ({
                            ...prevState,
                            pedido: value.pedido
                        }))}
                    />
                </div>
                <br />
                <div className='home-container-elements'>
                    <div className="visualizacion">
                        <div className="visualizacion-tablas">
                            {dataTablas.map((analisi, index) => {
                                switch (analisi.id) {
                                    case 1:
                                        return (
                                            <>

                                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                                                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                                                        {snackData.msg}
                                                    </Alert>
                                                </Snackbar>

                                                <Grid container spacing={2}>
                                                    {/* Título y botones de opción */}
                                                    <Grid item xs={12}>
                                                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant='h6'>Físico-Químico Torre</Typography>
                                                            {
                                                                (rowsIds1.length > 0) ?
                                                                    (
                                                                        <Grid item>
                                                                            <Button
                                                                                sx={{ mr: 2 }}
                                                                                color='error'
                                                                                variant='contained'
                                                                                startIcon={<DeleteIcon />}
                                                                                onClick={(event, rowData) => {
                                                                                    setAnalisisEliminar(rowsIds1)
                                                                                    abrirCerrarModalEliminar()
                                                                                }}
                                                                            >
                                                                                Eliminar
                                                                            </Button>
                                                                        </Grid>
                                                                    ) : (
                                                                        <Button
                                                                            color='success'
                                                                            variant='contained'
                                                                            startIcon={<AddIcon />}
                                                                            onClick={abrirCerrarModalInsertar1}
                                                                        >Añadir</Button>
                                                                    )
                                                            }
                                                        </Card>
                                                    </Grid>

                                                    {/* Tabla donde se muestran los registros de los clientes */}
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <DataGrid
                                                                components={{ Toolbar: GridToolbar }}
                                                                localeText={DATAGRID_LOCALE_TEXT}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 700,
                                                                    backgroundColor: '#FFFFFF'
                                                                }}
                                                                rows={rows1}
                                                                columns={columnas1}
                                                                pageSize={12}
                                                                rowsPerPageOptions={[12]}
                                                                checkboxSelection
                                                                disableSelectionOnClick
                                                                onSelectionModelChange={(ids) => handleSelectRow1(ids)}
                                                                onRowClick={(analisisSeleccionado, evt) => {
                                                                    setAnalisisSeleccionado(analisisSeleccionado.row)
                                                                    setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                                                    setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                                                    abrirCerrarModalEditar1();
                                                                }}
                                                            />
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                {/* LISTA DE MODALS */}

                                                {/* Agregar tarea */}
                                                <ModalLayout
                                                    titulo="Agregar nueva Tarea"
                                                    contenido={
                                                        <InsertarVisModal1
                                                            change={handleChangeInput}
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                        />
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                                                            abrirCerrarModalInsertar1();

                                                            if (peticionPost1()) {
                                                                setSnackData({ open: true, msg: 'Tarea añadida correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al añadir la tarea', severity: 'error' })
                                                            }

                                                        }, 'success')
                                                    ]}
                                                    open={modalInsertar1}
                                                    onClose={abrirCerrarModalInsertar1}
                                                />

                                                {/* Modal Editar Tarea*/}

                                                <ModalLayout
                                                    titulo="Editar tarea"
                                                    contenido={
                                                        <EditarVisModal1
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            change={handleChangeInput}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            handleChangeCheckbox={handleChangeCheckbox}
                                                            analisisAutocomplete={analisisAutocomplete}
                                                            analisisEditar={analisisEditar}
                                                            elementoTareaEditar={elementoTareaEditar}
                                                            elementosAutocomplete={elementosAutocomplete}
                                                        />}
                                                    botones={[
                                                        insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                            descargarPdf();
                                                        }),
                                                        insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                                                            abrirCerrarModalEditar1()

                                                            if (peticionPut1()) {
                                                                setSnackData({ open: true, msg: 'Tarea editada correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al editar la tarea', severity: 'error' })
                                                            }
                                                        }),

                                                    ]}
                                                    open={modalEditar1}
                                                    onClose={abrirCerrarModalEditar1}
                                                />

                                                {/* Eliminar tarea */}
                                                <ModalLayout
                                                    titulo="Eliminar tarea"
                                                    contenido={
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Typography>Estás seguro que deseas eliminar la tarea?</Typography>
                                                            </Grid>
                                                        </>
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                                            abrirCerrarModalEliminar();

                                                            if (peticionDelete()) {
                                                                setSnackData({ open: true, msg: `Tarea eliminada correctamente`, severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al eliminar la tarea', severity: 'error' })
                                                            }

                                                        }, 'error'),
                                                        insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                                                    ]}
                                                    open={modalEliminar}
                                                    onClose={abrirCerrarModalEliminar}
                                                />

                                            </>
                                        )
                                    case 2:
                                        return (
                                            <>
                                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                                                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                                                        {snackData.msg}
                                                    </Alert>
                                                </Snackbar>

                                                <Grid container spacing={2}>
                                                    {/* Título y botones de opción */}
                                                    <Grid item xs={12}>
                                                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant='h6'>Físico-Químico Aporte</Typography>
                                                            {
                                                                (rowsIds2.length > 0) ?
                                                                    (
                                                                        <Grid item>
                                                                            <Button
                                                                                sx={{ mr: 2 }}
                                                                                color='error'
                                                                                variant='contained'
                                                                                startIcon={<DeleteIcon />}
                                                                                onClick={(event, rowData) => {
                                                                                    setAnalisisEliminar(rowsIds2)
                                                                                    abrirCerrarModalEliminar()
                                                                                }}
                                                                            >
                                                                                Eliminar
                                                                            </Button>
                                                                        </Grid>
                                                                    ) : (
                                                                        <Button
                                                                            color='success'
                                                                            variant='contained'
                                                                            startIcon={<AddIcon />}
                                                                            onClick={abrirCerrarModalInsertar1}
                                                                        >Añadir</Button>
                                                                    )
                                                            }
                                                        </Card>
                                                    </Grid>

                                                    {/* Tabla donde se muestran los registros de los clientes */}
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <DataGrid
                                                                components={{ Toolbar: GridToolbar }}
                                                                localeText={DATAGRID_LOCALE_TEXT}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 700,
                                                                    backgroundColor: '#FFFFFF'
                                                                }}
                                                                rows={rows2}
                                                                columns={columnas1}
                                                                pageSize={12}
                                                                rowsPerPageOptions={[12]}
                                                                checkboxSelection
                                                                disableSelectionOnClick
                                                                onSelectionModelChange={(ids) => handleSelectRow2(ids)}
                                                                onRowClick={(analisisSeleccionado, evt) => {
                                                                    setAnalisisSeleccionado(analisisSeleccionado.row)
                                                                    setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                                                    setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                                                    abrirCerrarModalEditar1();
                                                                }}
                                                            />
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                {/* LISTA DE MODALS */}

                                                {/* Agregar tarea */}
                                                <ModalLayout
                                                    titulo="Agregar nueva Tarea"
                                                    contenido={
                                                        <InsertarVisModal1
                                                            change={handleChangeInput}
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                        />
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                                                            abrirCerrarModalInsertar1();

                                                            if (peticionPost1()) {
                                                                setSnackData({ open: true, msg: 'Tarea añadida correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al añadir la tarea', severity: 'error' })
                                                            }

                                                        }, 'success')
                                                    ]}
                                                    open={modalInsertar1}
                                                    onClose={abrirCerrarModalInsertar1}
                                                />

                                                {/* Modal Editar Tarea*/}

                                                <ModalLayout
                                                    titulo="Editar tarea"
                                                    contenido={
                                                        <EditarVisModal1
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            change={handleChangeInput}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            handleChangeCheckbox={handleChangeCheckbox}
                                                            analisisAutocomplete={analisisAutocomplete}
                                                            analisisEditar={analisisEditar}
                                                            elementoTareaEditar={elementoTareaEditar}
                                                            elementosAutocomplete={elementosAutocomplete}
                                                        />}
                                                    botones={[
                                                        insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                            descargarPdf()
                                                        }),
                                                        insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                                                            abrirCerrarModalEditar1()

                                                            if (peticionPut1()) {
                                                                setSnackData({ open: true, msg: 'Tarea editada correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al editar la tarea', severity: 'error' })
                                                            }
                                                        })
                                                    ]}
                                                    open={modalEditar1}
                                                    onClose={abrirCerrarModalEditar1}
                                                />

                                                {/* Eliminar tarea */}
                                                <ModalLayout
                                                    titulo="Eliminar tarea"
                                                    contenido={
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Typography>Estás seguro que deseas eliminar la tarea?</Typography>
                                                            </Grid>
                                                        </>
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                                            abrirCerrarModalEliminar();

                                                            if (peticionDelete()) {
                                                                setSnackData({ open: true, msg: `Tarea eliminada correctamente`, severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al eliminar la tarea', severity: 'error' })
                                                            }

                                                        }, 'error'),
                                                        insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                                                    ]}
                                                    open={modalEliminar}
                                                    onClose={abrirCerrarModalEliminar}
                                                />

                                            </>
                                        )
                                    case 3:
                                        return (
                                            <>
                                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                                                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                                                        {snackData.msg}
                                                    </Alert>
                                                </Snackbar>

                                                <Grid container spacing={2}>
                                                    {/* Título y botones de opción */}
                                                    <Grid item xs={12}>
                                                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant='h6'>Físico-Químico Alimentación</Typography>
                                                            {
                                                                (rowsIds3.length > 0) ?
                                                                    (
                                                                        <Grid item>
                                                                            <Button
                                                                                sx={{ mr: 2 }}
                                                                                color='error'
                                                                                variant='contained'
                                                                                startIcon={<DeleteIcon />}
                                                                                onClick={(event, rowData) => {
                                                                                    setAnalisisEliminar(rowsIds3)
                                                                                    abrirCerrarModalEliminar()
                                                                                }}
                                                                            >
                                                                                Eliminar
                                                                            </Button>
                                                                        </Grid>
                                                                    ) : (
                                                                        <Button
                                                                            color='success'
                                                                            variant='contained'
                                                                            startIcon={<AddIcon />}
                                                                            onClick={abrirCerrarModalInsertar1}
                                                                        >Añadir</Button>
                                                                    )
                                                            }
                                                        </Card>
                                                    </Grid>

                                                    {/* Tabla donde se muestran los registros de los clientes */}
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <DataGrid
                                                                components={{ Toolbar: GridToolbar }}
                                                                localeText={DATAGRID_LOCALE_TEXT}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 700,
                                                                    backgroundColor: '#FFFFFF'
                                                                }}
                                                                rows={rows3}
                                                                columns={columnas1}
                                                                pageSize={12}
                                                                rowsPerPageOptions={[12]}
                                                                checkboxSelection
                                                                disableSelectionOnClick
                                                                onSelectionModelChange={(ids) => handleSelectRow3(ids)}
                                                                onRowClick={(analisisSeleccionado, evt) => {
                                                                    setAnalisisSeleccionado(analisisSeleccionado.row)
                                                                    setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                                                    setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                                                    abrirCerrarModalEditar1();
                                                                }}
                                                            />
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                {/* LISTA DE MODALS */}

                                                {/* Agregar tarea */}
                                                <ModalLayout
                                                    titulo="Agregar nueva Tarea"
                                                    contenido={
                                                        <InsertarVisModal1
                                                            change={handleChangeInput}
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                        />
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                                                            abrirCerrarModalInsertar1();

                                                            if (peticionPost1()) {
                                                                setSnackData({ open: true, msg: 'Tarea añadida correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al añadir la tarea', severity: 'error' })
                                                            }

                                                        }, 'success')
                                                    ]}
                                                    open={modalInsertar1}
                                                    onClose={abrirCerrarModalInsertar1}
                                                />

                                                {/* Modal Editar Tarea*/}

                                                <ModalLayout
                                                    titulo="Editar tarea"
                                                    contenido={
                                                        <EditarVisModal1
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            change={handleChangeInput}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            handleChangeCheckbox={handleChangeCheckbox}
                                                            analisisAutocomplete={analisisAutocomplete}
                                                            analisisEditar={analisisEditar}
                                                            elementoTareaEditar={elementoTareaEditar}
                                                            elementosAutocomplete={elementosAutocomplete}
                                                        />}
                                                    botones={[
                                                        insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                            descargarPdf();
                                                        }),
                                                        insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                                                            abrirCerrarModalEditar1()

                                                            if (peticionPut1()) {
                                                                setSnackData({ open: true, msg: 'Tarea editada correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al editar la tarea', severity: 'error' })
                                                            }
                                                        })
                                                    ]}
                                                    open={modalEditar1}
                                                    onClose={abrirCerrarModalEditar1}
                                                />

                                                {/* Eliminar tarea */}
                                                <ModalLayout
                                                    titulo="Eliminar tarea"
                                                    contenido={
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Typography>Estás seguro que deseas eliminar la tarea?</Typography>
                                                            </Grid>
                                                        </>
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                                            abrirCerrarModalEliminar();

                                                            if (peticionDelete()) {
                                                                setSnackData({ open: true, msg: `Tarea eliminada correctamente`, severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al eliminar la tarea', severity: 'error' })
                                                            }

                                                        }, 'error'),
                                                        insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                                                    ]}
                                                    open={modalEliminar}
                                                    onClose={abrirCerrarModalEliminar}
                                                />

                                            </>
                                        )
                                    case 4:
                                        return (
                                            <>
                                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                                                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                                                        {snackData.msg}
                                                    </Alert>
                                                </Snackbar>

                                                <Grid container spacing={2}>
                                                    {/* Título y botones de opción */}
                                                    <Grid item xs={12}>
                                                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant='h6'>Físico-Químico Rechazo</Typography>
                                                            {
                                                                (rowsIds4.length > 0) ?
                                                                    (
                                                                        <Grid item>
                                                                            <Button
                                                                                sx={{ mr: 2 }}
                                                                                color='error'
                                                                                variant='contained'
                                                                                startIcon={<DeleteIcon />}
                                                                                onClick={(event, rowData) => {
                                                                                    setAnalisisEliminar(rowsIds4)
                                                                                    abrirCerrarModalEliminar()
                                                                                }}
                                                                            >
                                                                                Eliminar
                                                                            </Button>
                                                                        </Grid>
                                                                    ) : (
                                                                        <Button
                                                                            color='success'
                                                                            variant='contained'
                                                                            startIcon={<AddIcon />}
                                                                            onClick={abrirCerrarModalInsertar1}
                                                                        >Añadir</Button>
                                                                    )
                                                            }
                                                        </Card>
                                                    </Grid>

                                                    {/* Tabla donde se muestran los registros de los clientes */}
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <DataGrid
                                                                components={{ Toolbar: GridToolbar }}
                                                                localeText={DATAGRID_LOCALE_TEXT}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 700,
                                                                    backgroundColor: '#FFFFFF'
                                                                }}
                                                                rows={rows4}
                                                                columns={columnas1}
                                                                pageSize={12}
                                                                rowsPerPageOptions={[12]}
                                                                checkboxSelection
                                                                disableSelectionOnClick
                                                                onSelectionModelChange={(ids) => handleSelectRow4(ids)}
                                                                onRowClick={(analisisSeleccionado, evt) => {
                                                                    setAnalisisSeleccionado(analisisSeleccionado.row)
                                                                    setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                                                    setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                                                    abrirCerrarModalEditar1();
                                                                }}
                                                            />
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                {/* LISTA DE MODALS */}

                                                {/* Agregar tarea */}
                                                <ModalLayout
                                                    titulo="Agregar nueva Tarea"
                                                    contenido={
                                                        <InsertarVisModal1
                                                            change={handleChangeInput}
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                        />
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                                                            abrirCerrarModalInsertar1();

                                                            if (peticionPost1()) {
                                                                setSnackData({ open: true, msg: 'Tarea añadida correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al añadir la tarea', severity: 'error' })
                                                            }

                                                        }, 'success')
                                                    ]}
                                                    open={modalInsertar1}
                                                    onClose={abrirCerrarModalInsertar1}
                                                />

                                                {/* Modal Editar Tarea*/}

                                                <ModalLayout
                                                    titulo="Editar tarea"
                                                    contenido={
                                                        <EditarVisModal1
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            change={handleChangeInput}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            handleChangeCheckbox={handleChangeCheckbox}
                                                            analisisAutocomplete={analisisAutocomplete}
                                                            analisisEditar={analisisEditar}
                                                            elementoTareaEditar={elementoTareaEditar}
                                                            elementosAutocomplete={elementosAutocomplete}
                                                        />}
                                                    botones={[
                                                        insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                            descargarPdf();
                                                        }),
                                                        insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                                                            abrirCerrarModalEditar1()

                                                            if (peticionPut1()) {
                                                                setSnackData({ open: true, msg: 'Tarea editada correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al editar la tarea', severity: 'error' })
                                                            }
                                                        })
                                                    ]}
                                                    open={modalEditar1}
                                                    onClose={abrirCerrarModalEditar1}
                                                />

                                                {/* Eliminar tarea */}
                                                <ModalLayout
                                                    titulo="Eliminar tarea"
                                                    contenido={
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Typography>Estás seguro que deseas eliminar la tarea?</Typography>
                                                            </Grid>
                                                        </>
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                                            abrirCerrarModalEliminar();

                                                            if (peticionDelete()) {
                                                                setSnackData({ open: true, msg: `Tarea eliminada correctamente`, severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al eliminar la tarea', severity: 'error' })
                                                            }

                                                        }, 'error'),
                                                        insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                                                    ]}
                                                    open={modalEliminar}
                                                    onClose={abrirCerrarModalEliminar}
                                                />

                                            </>
                                        )
                                    case 5:
                                        return (
                                            <>
                                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                                                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                                                        {snackData.msg}
                                                    </Alert>
                                                </Snackbar>

                                                <Grid container spacing={2}>
                                                    {/* Título y botones de opción */}
                                                    <Grid item xs={12}>
                                                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant='h6'>Físico-Químico Condensados</Typography>
                                                            {
                                                                (rowsIds5.length > 0) ?
                                                                    (
                                                                        <Grid item>
                                                                            <Button
                                                                                sx={{ mr: 2 }}
                                                                                color='error'
                                                                                variant='contained'
                                                                                startIcon={<DeleteIcon />}
                                                                                onClick={(event, rowData) => {
                                                                                    setAnalisisEliminar(rowsIds5)
                                                                                    abrirCerrarModalEliminar()
                                                                                }}
                                                                            >
                                                                                Eliminar
                                                                            </Button>
                                                                        </Grid>
                                                                    ) : (
                                                                        <Button
                                                                            color='success'
                                                                            variant='contained'
                                                                            startIcon={<AddIcon />}
                                                                            onClick={abrirCerrarModalInsertar1}
                                                                        >Añadir</Button>
                                                                    )
                                                            }
                                                        </Card>
                                                    </Grid>

                                                    {/* Tabla donde se muestran los registros de los clientes */}
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <DataGrid
                                                                components={{ Toolbar: GridToolbar }}
                                                                localeText={DATAGRID_LOCALE_TEXT}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 700,
                                                                    backgroundColor: '#FFFFFF'
                                                                }}
                                                                rows={rows5}
                                                                columns={columnas1}
                                                                pageSize={12}
                                                                rowsPerPageOptions={[12]}
                                                                checkboxSelection
                                                                disableSelectionOnClick
                                                                onSelectionModelChange={(ids) => handleSelectRow5(ids)}
                                                                onRowClick={(analisisSeleccionado, evt) => {
                                                                    setAnalisisSeleccionado(analisisSeleccionado.row)
                                                                    setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                                                    setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                                                    abrirCerrarModalEditar1();
                                                                }}
                                                            />
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                {/* LISTA DE MODALS */}

                                                {/* Agregar tarea */}
                                                <ModalLayout
                                                    titulo="Agregar nueva Tarea"
                                                    contenido={
                                                        <InsertarVisModal1
                                                            change={handleChangeInput}
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                        />
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                                                            abrirCerrarModalInsertar1();

                                                            if (peticionPost1()) {
                                                                setSnackData({ open: true, msg: 'Tarea añadida correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al añadir la tarea', severity: 'error' })
                                                            }

                                                        }, 'success')
                                                    ]}
                                                    open={modalInsertar1}
                                                    onClose={abrirCerrarModalInsertar1}
                                                />

                                                {/* Modal Editar Tarea*/}

                                                <ModalLayout
                                                    titulo="Editar tarea"
                                                    contenido={
                                                        <EditarVisModal1
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            change={handleChangeInput}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            handleChangeCheckbox={handleChangeCheckbox}
                                                            analisisAutocomplete={analisisAutocomplete}
                                                            analisisEditar={analisisEditar}
                                                            elementoTareaEditar={elementoTareaEditar}
                                                            elementosAutocomplete={elementosAutocomplete}
                                                        />}
                                                    botones={[
                                                        insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                            descargarPdf();
                                                        }),
                                                        insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                                                            abrirCerrarModalEditar1()

                                                            if (peticionPut1()) {
                                                                setSnackData({ open: true, msg: 'Tarea editada correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al editar la tarea', severity: 'error' })
                                                            }
                                                        })
                                                    ]}
                                                    open={modalEditar1}
                                                    onClose={abrirCerrarModalEditar1}
                                                />

                                                {/* Eliminar tarea */}
                                                <ModalLayout
                                                    titulo="Eliminar tarea"
                                                    contenido={
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Typography>Estás seguro que deseas eliminar la tarea?</Typography>
                                                            </Grid>
                                                        </>
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                                            abrirCerrarModalEliminar();

                                                            if (peticionDelete()) {
                                                                setSnackData({ open: true, msg: `Tarea eliminada correctamente`, severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al eliminar la tarea', severity: 'error' })
                                                            }

                                                        }, 'error'),
                                                        insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                                                    ]}
                                                    open={modalEliminar}
                                                    onClose={abrirCerrarModalEliminar}
                                                />

                                            </>
                                        )
                                    case 6:
                                        return (
                                            <>
                                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                                                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                                                        {snackData.msg}
                                                    </Alert>
                                                </Snackbar>

                                                <Grid container spacing={2}>
                                                    {/* Título y botones de opción */}
                                                    <Grid item xs={12}>
                                                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant='h6'>Físico-Químico Caldera</Typography>
                                                            {
                                                                (rowsIds6.length > 0) ?
                                                                    (
                                                                        <Grid item>
                                                                            <Button
                                                                                sx={{ mr: 2 }}
                                                                                color='error'
                                                                                variant='contained'
                                                                                startIcon={<DeleteIcon />}
                                                                                onClick={(event, rowData) => {
                                                                                    setAnalisisEliminar(rowsIds6)
                                                                                    abrirCerrarModalEliminar()
                                                                                }}
                                                                            >
                                                                                Eliminar
                                                                            </Button>
                                                                        </Grid>
                                                                    ) : (
                                                                        <Button
                                                                            color='success'
                                                                            variant='contained'
                                                                            startIcon={<AddIcon />}
                                                                            onClick={abrirCerrarModalInsertar1}
                                                                        >Añadir</Button>
                                                                    )
                                                            }
                                                        </Card>
                                                    </Grid>

                                                    {/* Tabla donde se muestran los registros de los clientes */}
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <DataGrid
                                                                components={{ Toolbar: GridToolbar }}
                                                                localeText={DATAGRID_LOCALE_TEXT}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 700,
                                                                    backgroundColor: '#FFFFFF'
                                                                }}
                                                                rows={rows6}
                                                                columns={columnas1}
                                                                pageSize={12}
                                                                rowsPerPageOptions={[12]}
                                                                checkboxSelection
                                                                disableSelectionOnClick
                                                                onSelectionModelChange={(ids) => handleSelectRow6(ids)}
                                                                onRowClick={(analisisSeleccionado, evt) => {
                                                                    setAnalisisSeleccionado(analisisSeleccionado.row)
                                                                    setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                                                    setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                                                    abrirCerrarModalEditar1();
                                                                }}
                                                            />
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                {/* LISTA DE MODALS */}

                                                {/* Agregar tarea */}
                                                <ModalLayout
                                                    titulo="Agregar nueva Tarea"
                                                    contenido={
                                                        <InsertarVisModal1
                                                            change={handleChangeInput}
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                        />
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                                                            abrirCerrarModalInsertar1();

                                                            if (peticionPost1()) {
                                                                setSnackData({ open: true, msg: 'Tarea añadida correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al añadir la tarea', severity: 'error' })
                                                            }

                                                        }, 'success')
                                                    ]}
                                                    open={modalInsertar1}
                                                    onClose={abrirCerrarModalInsertar1}
                                                />

                                                {/* Modal Editar Tarea*/}

                                                <ModalLayout
                                                    titulo="Editar tarea"
                                                    contenido={
                                                        <EditarVisModal1
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            change={handleChangeInput}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            handleChangeCheckbox={handleChangeCheckbox}
                                                            analisisAutocomplete={analisisAutocomplete}
                                                            analisisEditar={analisisEditar}
                                                            elementoTareaEditar={elementoTareaEditar}
                                                            elementosAutocomplete={elementosAutocomplete}
                                                        />}
                                                    botones={[
                                                        insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                            descargarPdf();
                                                        }),
                                                        insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                                                            abrirCerrarModalEditar1()

                                                            if (peticionPut1()) {
                                                                setSnackData({ open: true, msg: 'Tarea editada correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al editar la tarea', severity: 'error' })
                                                            }
                                                        })
                                                    ]}
                                                    open={modalEditar1}
                                                    onClose={abrirCerrarModalEditar1}
                                                />

                                                {/* Eliminar tarea */}
                                                <ModalLayout
                                                    titulo="Eliminar tarea"
                                                    contenido={
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Typography>Estás seguro que deseas eliminar la tarea?</Typography>
                                                            </Grid>
                                                        </>
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                                            abrirCerrarModalEliminar();

                                                            if (peticionDelete()) {
                                                                setSnackData({ open: true, msg: `Tarea eliminada correctamente`, severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al eliminar la tarea', severity: 'error' })
                                                            }

                                                        }, 'error'),
                                                        insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                                                    ]}
                                                    open={modalEliminar}
                                                    onClose={abrirCerrarModalEliminar}
                                                />

                                            </>
                                        )
                                    case 7:
                                        return (
                                            <>
                                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                                                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                                                        {snackData.msg}
                                                    </Alert>
                                                </Snackbar>

                                                <Grid container spacing={2}>
                                                    {/* Título y botones de opción */}
                                                    <Grid item xs={12}>
                                                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant='h6'>Aerobios</Typography>
                                                            {
                                                                (rowsIds7.length > 0) ?
                                                                    (
                                                                        <Grid item>
                                                                            <Button
                                                                                sx={{ mr: 2 }}
                                                                                color='error'
                                                                                variant='contained'
                                                                                startIcon={<DeleteIcon />}
                                                                                onClick={(event, rowData) => {
                                                                                    setAnalisisEliminar(rowsIds7)
                                                                                    abrirCerrarModalEliminar()
                                                                                }}
                                                                            >
                                                                                Eliminar
                                                                            </Button>
                                                                        </Grid>
                                                                    ) : (
                                                                        <Button
                                                                            color='success'
                                                                            variant='contained'
                                                                            startIcon={<AddIcon />}
                                                                            onClick={abrirCerrarModalInsertarAerobio}
                                                                        >Añadir</Button>
                                                                    )
                                                            }
                                                        </Card>
                                                    </Grid>

                                                    {/* Tabla donde se muestran los registros de los clientes */}
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <DataGrid
                                                                components={{ Toolbar: GridToolbar }}
                                                                localeText={DATAGRID_LOCALE_TEXT}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 700,
                                                                    backgroundColor: '#FFFFFF'
                                                                }}
                                                                rows={rows7}
                                                                columns={columnasAerobios}
                                                                pageSize={12}
                                                                rowsPerPageOptions={[12]}
                                                                checkboxSelection
                                                                disableSelectionOnClick
                                                                onSelectionModelChange={(ids) => handleSelectRow7(ids)}
                                                                onRowClick={(analisisSeleccionado, evt) => {
                                                                    setAnalisisSeleccionado(analisisSeleccionado.row)
                                                                    setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                                                    setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                                                    abrirCerrarModalEditarAerobio();
                                                                }}
                                                            />
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                {/* LISTA DE MODALS */}

                                                {/* Agregar tarea */}
                                                <ModalLayout
                                                    titulo="Agregar nueva Tarea"
                                                    contenido={
                                                        <InsertarVisModalAerobio
                                                            change={handleChangeInput}
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}                                                        
                                                        />
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                                                            abrirCerrarModalInsertarAerobio();

                                                            if (peticionPostAerobio()) {
                                                                setSnackData({ open: true, msg: 'Tarea añadida correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al añadir la tarea', severity: 'error' })
                                                            }

                                                        }, 'success')
                                                    ]}
                                                    open={modalInsertarAerobio}
                                                    onClose={abrirCerrarModalInsertarAerobio}
                                                />

                                                {/* Modal Editar Tarea*/}

                                                <ModalLayout
                                                    titulo="Editar tarea"
                                                    contenido={
                                                        <EditarVisModalAerobio
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            change={handleChangeInput}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            handleChangeCheckbox={handleChangeCheckbox}
                                                            analisisAutocomplete={analisisAutocomplete}
                                                            analisisEditar={analisisEditar}
                                                            elementoTareaEditar={elementoTareaEditar}
                                                            elementosAutocomplete={elementosAutocomplete}
                                                            handlePdf={handlePdf}
                                                        />}
                                                    botones={[
                                                        insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                            descargarPdfNoFQ();
                                                        }),
                                                        insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                                                            abrirCerrarModalEditarAerobio()

                                                            if (peticionPutAerobio()) {
                                                                setSnackData({ open: true, msg: 'Tarea editada correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al editar la tarea', severity: 'error' })
                                                            }
                                                        })
                                                    ]}
                                                    open={modalEditarAerobio}
                                                    onClose={abrirCerrarModalEditarAerobio}
                                                />

                                                {/* Eliminar tarea */}
                                                <ModalLayout
                                                    titulo="Eliminar tarea"
                                                    contenido={
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Typography>Estás seguro que deseas eliminar la tarea?</Typography>
                                                            </Grid>
                                                        </>
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                                            abrirCerrarModalEliminar();

                                                            if (peticionDelete()) {
                                                                setSnackData({ open: true, msg: `Tarea eliminada correctamente`, severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al eliminar la tarea', severity: 'error' })
                                                            }

                                                        }, 'error'),
                                                        insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                                                    ]}
                                                    open={modalEliminar}
                                                    onClose={abrirCerrarModalEliminar}
                                                />

                                            </>
                                        )
                                    case 8:
                                        return (
                                            <>
                                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                                                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                                                        {snackData.msg}
                                                    </Alert>
                                                </Snackbar>

                                                <Grid container spacing={2}>
                                                    {/* Título y botones de opción */}
                                                    <Grid item xs={12}>
                                                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant='h6'>Legionela</Typography>
                                                            {
                                                                (rowsIds8.length > 0) ?
                                                                    (
                                                                        <Grid item>
                                                                            <Button
                                                                                sx={{ mr: 2 }}
                                                                                color='error'
                                                                                variant='contained'
                                                                                startIcon={<DeleteIcon />}
                                                                                onClick={(event, rowData) => {
                                                                                    setAnalisisEliminar(rowsIds8)
                                                                                    abrirCerrarModalEliminar()
                                                                                }}
                                                                            >
                                                                                Eliminar
                                                                            </Button>
                                                                        </Grid>
                                                                    ) : (
                                                                        <Button
                                                                            color='success'
                                                                            variant='contained'
                                                                            startIcon={<AddIcon />}
                                                                            onClick={abrirCerrarModalInsertarLegionela}
                                                                        >Añadir</Button>
                                                                    )
                                                            }
                                                        </Card>
                                                    </Grid>

                                                    {/* Tabla donde se muestran los registros de los clientes */}
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <DataGrid
                                                                components={{ Toolbar: GridToolbar }}
                                                                localeText={DATAGRID_LOCALE_TEXT}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 700,
                                                                    backgroundColor: '#FFFFFF'
                                                                }}
                                                                rows={rows8}
                                                                columns={columnasLegionela}
                                                                pageSize={12}
                                                                rowsPerPageOptions={[12]}
                                                                checkboxSelection
                                                                disableSelectionOnClick
                                                                onSelectionModelChange={(ids) => handleSelectRow8(ids)}
                                                                onRowClick={(analisisSeleccionado, evt) => {
                                                                    setAnalisisSeleccionado(analisisSeleccionado.row)
                                                                    setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                                                    setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                                                    abrirCerrarModalEditarLegionela();
                                                                }}
                                                            />
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                {/* LISTA DE MODALS */}

                                                {/* Agregar tarea */}
                                                <ModalLayout
                                                    titulo="Agregar nueva Tarea"
                                                    contenido={
                                                        <InsertarVisModalLegionela
                                                            change={handleChangeInput}
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                        />
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                                                            abrirCerrarModalInsertarLegionela();

                                                            if (peticionPostLegionela()) {
                                                                setSnackData({ open: true, msg: 'Tarea añadida correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al añadir la tarea', severity: 'error' })
                                                            }

                                                        }, 'success')
                                                    ]}
                                                    open={modalInsertarLegionela}
                                                    onClose={abrirCerrarModalInsertarLegionela}
                                                />

                                                {/* Modal Editar Tarea*/}

                                                <ModalLayout
                                                    titulo="Editar tarea"
                                                    contenido={
                                                        <EditarVisModalLegionela
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            change={handleChangeInput}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            handleChangeCheckbox={handleChangeCheckbox}
                                                            analisisAutocomplete={analisisAutocomplete}
                                                            analisisEditar={analisisEditar}
                                                            elementoTareaEditar={elementoTareaEditar}
                                                            elementosAutocomplete={elementosAutocomplete}
                                                            handlePdf={handlePdf}
                                                        />}
                                                    botones={[
                                                        insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                            descargarPdfNoFQ();
                                                        }),
                                                        insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                                                            abrirCerrarModalEditarLegionela()

                                                            if (peticionPutLegionela()) {
                                                                setSnackData({ open: true, msg: 'Tarea editada correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al editar la tarea', severity: 'error' })
                                                            }
                                                        })
                                                    ]}
                                                    open={modalEditarLegionela}
                                                    onClose={abrirCerrarModalEditarLegionela}
                                                />

                                                {/* Eliminar tarea */}
                                                <ModalLayout
                                                    titulo="Eliminar tarea"
                                                    contenido={
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Typography>Estás seguro que deseas eliminar la tarea?</Typography>
                                                            </Grid>
                                                        </>
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                                            abrirCerrarModalEliminar();

                                                            if (peticionDelete()) {
                                                                setSnackData({ open: true, msg: `Tarea eliminada correctamente`, severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al eliminar la tarea', severity: 'error' })
                                                            }

                                                        }, 'error'),
                                                        insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                                                    ]}
                                                    open={modalEliminar}
                                                    onClose={abrirCerrarModalEliminar}
                                                />

                                            </>
                                        )
                                    case 9:
                                        return (
                                            <>
                                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                                                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                                                        {snackData.msg}
                                                    </Alert>
                                                </Snackbar>

                                                <Grid container spacing={2}>
                                                    {/* Título y botones de opción */}
                                                    <Grid item xs={12}>
                                                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant='h6'>Aguas Residuales</Typography>
                                                            {
                                                                (rowsIds9.length > 0) ?
                                                                    (
                                                                        <Grid item>
                                                                            <Button
                                                                                sx={{ mr: 2 }}
                                                                                color='error'
                                                                                variant='contained'
                                                                                startIcon={<DeleteIcon />}
                                                                                onClick={(event, rowData) => {
                                                                                    setAnalisisEliminar(rowsIds9)
                                                                                    abrirCerrarModalEliminar()
                                                                                }}
                                                                            >
                                                                                Eliminar
                                                                            </Button>
                                                                        </Grid>
                                                                    ) : (
                                                                        <Button
                                                                            color='success'
                                                                            variant='contained'
                                                                            startIcon={<AddIcon />}
                                                                            onClick={abrirCerrarModalInsertar}
                                                                        >Añadir</Button>
                                                                    )
                                                            }
                                                        </Card>
                                                    </Grid>

                                                    {/* Tabla donde se muestran los registros de los clientes */}
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <DataGrid
                                                                components={{ Toolbar: GridToolbar }}
                                                                localeText={DATAGRID_LOCALE_TEXT}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 700,
                                                                    backgroundColor: '#FFFFFF'
                                                                }}
                                                                rows={rows9}
                                                                columns={columnas}
                                                                pageSize={12}
                                                                rowsPerPageOptions={[12]}
                                                                checkboxSelection
                                                                disableSelectionOnClick
                                                                onSelectionModelChange={(ids) => handleSelectRow9(ids)}
                                                                onRowClick={(analisisSeleccionado, evt) => {
                                                                    setAnalisisSeleccionado(analisisSeleccionado.row)
                                                                    setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                                                    setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                                                    abrirCerrarModalEditar();
                                                                }}
                                                            />
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                {/* LISTA DE MODALS */}

                                                {/* Agregar tarea */}
                                                <ModalLayout
                                                    titulo="Agregar nueva Tarea"
                                                    contenido={
                                                        <InsertarVisModal
                                                            change={handleChangeInput}
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                        />
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                                                            abrirCerrarModalInsertar();

                                                            if (peticionPost()) {
                                                                setSnackData({ open: true, msg: 'Tarea añadida correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al añadir la tarea', severity: 'error' })
                                                            }

                                                        }, 'success')
                                                    ]}
                                                    open={modalInsertar}
                                                    onClose={abrirCerrarModalInsertar}
                                                />

                                                {/* Modal Editar Tarea*/}

                                                <ModalLayout
                                                    titulo="Editar tarea"
                                                    contenido={
                                                        <EditarVisModal
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            change={handleChangeInput}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            handleChangeCheckbox={handleChangeCheckbox}
                                                            analisisAutocomplete={analisisAutocomplete}
                                                            analisisEditar={analisisEditar}
                                                            elementoTareaEditar={elementoTareaEditar}
                                                            elementosAutocomplete={elementosAutocomplete}
                                                            handlePdf={handlePdf}
                                                        />}
                                                    botones={[
                                                        insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                            descargarPdfNoFQ();
                                                        }),
                                                        insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                                                            abrirCerrarModalEditar()

                                                            if (peticionPut()) {
                                                                setSnackData({ open: true, msg: 'Tarea editada correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al editar la tarea', severity: 'error' })
                                                            }
                                                        })
                                                    ]}
                                                    open={modalEditar}
                                                    onClose={abrirCerrarModalEditar}
                                                />

                                                {/* Eliminar tarea */}
                                                <ModalLayout
                                                    titulo="Eliminar tarea"
                                                    contenido={
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Typography>Estás seguro que deseas eliminar la tarea?</Typography>
                                                            </Grid>
                                                        </>
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                                            abrirCerrarModalEliminar();

                                                            if (peticionDelete()) {
                                                                setSnackData({ open: true, msg: `Tarea eliminada correctamente`, severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al eliminar la tarea', severity: 'error' })
                                                            }

                                                        }, 'error'),
                                                        insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                                                    ]}
                                                    open={modalEliminar}
                                                    onClose={abrirCerrarModalEliminar}
                                                />

                                            </>
                                        )
                                    case 10:
                                        return (
                                            <>
                                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                                                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                                                        {snackData.msg}
                                                    </Alert>
                                                </Snackbar>

                                                <Grid container spacing={2}>
                                                    {/* Título y botones de opción */}
                                                    <Grid item xs={12}>
                                                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant='h6'>Desinfecciones</Typography>
                                                            {
                                                                (rowsIds10.length > 0) ?
                                                                    (
                                                                        <Grid item>
                                                                            <Button
                                                                                sx={{ mr: 2 }}
                                                                                color='error'
                                                                                variant='contained'
                                                                                startIcon={<DeleteIcon />}
                                                                                onClick={(event, rowData) => {
                                                                                    setAnalisisEliminar(rowsIds10)
                                                                                    abrirCerrarModalEliminar()
                                                                                }}
                                                                            >
                                                                                Eliminar
                                                                            </Button>
                                                                        </Grid>
                                                                    ) : (
                                                                        <Button
                                                                            color='success'
                                                                            variant='contained'
                                                                            startIcon={<AddIcon />}
                                                                            onClick={abrirCerrarModalInsertar}
                                                                        >Añadir</Button>
                                                                    )
                                                            }
                                                        </Card>
                                                    </Grid>

                                                    {/* Tabla donde se muestran los registros de los clientes */}
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <DataGrid
                                                                components={{ Toolbar: GridToolbar }}
                                                                localeText={DATAGRID_LOCALE_TEXT}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 700,
                                                                    backgroundColor: '#FFFFFF'
                                                                }}
                                                                rows={rows10}
                                                                columns={columnas}
                                                                pageSize={12}
                                                                rowsPerPageOptions={[12]}
                                                                checkboxSelection
                                                                disableSelectionOnClick
                                                                onSelectionModelChange={(ids) => handleSelectRow10(ids)}
                                                                onRowClick={(analisisSeleccionado, evt) => {
                                                                    setAnalisisSeleccionado(analisisSeleccionado.row)
                                                                    setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                                                    setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                                                    abrirCerrarModalEditar();
                                                                }}
                                                            />
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                {/* LISTA DE MODALS */}

                                                {/* Agregar tarea */}
                                                <ModalLayout
                                                    titulo="Agregar nueva Tarea"
                                                    contenido={
                                                        <InsertarVisModal
                                                            change={handleChangeInput}
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            analisisAutocomplete={analisisAutocomplete}
                                                            analisisEditar={analisisEditar}
                                                        />
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                                                            abrirCerrarModalInsertar();

                                                            if (peticionPost()) {
                                                                setSnackData({ open: true, msg: 'Tarea añadida correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al añadir la tarea', severity: 'error' })
                                                            }

                                                        }, 'success')
                                                    ]}
                                                    open={modalInsertar}
                                                    onClose={abrirCerrarModalInsertar}
                                                />

                                                {/* Modal Editar Tarea*/}

                                                <ModalLayout
                                                    titulo="Editar tarea"
                                                    contenido={
                                                        <EditarVisModal
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            change={handleChangeInput}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            handleChangeCheckbox={handleChangeCheckbox}
                                                            analisisAutocomplete={analisisAutocomplete}
                                                            analisisEditar={analisisEditar}
                                                            elementoTareaEditar={elementoTareaEditar}
                                                            elementosAutocomplete={elementosAutocomplete}
                                                            handlePdf={handlePdf}
                                                        />}
                                                    botones={[
                                                        insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                            descargarPdfNoFQ();
                                                        }),
                                                        insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                                                            abrirCerrarModalEditar()

                                                            if (peticionPut()) {
                                                                setSnackData({ open: true, msg: 'Tarea editada correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al editar la tarea', severity: 'error' })
                                                            }
                                                        })
                                                    ]}
                                                    open={modalEditar}
                                                    onClose={abrirCerrarModalEditar}
                                                />

                                                {/* Eliminar tarea */}
                                                <ModalLayout
                                                    titulo="Eliminar tarea"
                                                    contenido={
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Typography>Estás seguro que deseas eliminar la tarea?</Typography>
                                                            </Grid>
                                                        </>
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                                            abrirCerrarModalEliminar();

                                                            if (peticionDelete()) {
                                                                setSnackData({ open: true, msg: `Tarea eliminada correctamente`, severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al eliminar la tarea', severity: 'error' })
                                                            }

                                                        }, 'error'),
                                                        insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                                                    ]}
                                                    open={modalEliminar}
                                                    onClose={abrirCerrarModalEliminar}
                                                />

                                            </>
                                        )
                                    case 11:
                                        return (
                                            <>
                                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                                                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                                                        {snackData.msg}
                                                    </Alert>
                                                </Snackbar>

                                                <Grid container spacing={2}>
                                                    {/* Título y botones de opción */}
                                                    <Grid item xs={12}>
                                                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant='h6'>Físico-Químico Osmosis</Typography>
                                                            {
                                                                (rowsIds11.length > 0) ?
                                                                    (
                                                                        <Grid item>
                                                                            <Button
                                                                                sx={{ mr: 2 }}
                                                                                color='error'
                                                                                variant='contained'
                                                                                startIcon={<DeleteIcon />}
                                                                                onClick={(event, rowData) => {
                                                                                    setAnalisisEliminar(rowsIds11)
                                                                                    abrirCerrarModalEliminar()
                                                                                }}
                                                                            >
                                                                                Eliminar
                                                                            </Button>
                                                                        </Grid>
                                                                    ) : (
                                                                        <Button
                                                                            color='success'
                                                                            variant='contained'
                                                                            startIcon={<AddIcon />}
                                                                            onClick={abrirCerrarModalInsertar1}
                                                                        >Añadir</Button>
                                                                    )
                                                            }
                                                        </Card>
                                                    </Grid>

                                                    {/* Tabla donde se muestran los registros de los clientes */}
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <DataGrid
                                                                components={{ Toolbar: GridToolbar }}
                                                                localeText={DATAGRID_LOCALE_TEXT}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 700,
                                                                    backgroundColor: '#FFFFFF'
                                                                }}
                                                                rows={rows11}
                                                                columns={columnas1}
                                                                pageSize={12}
                                                                rowsPerPageOptions={[12]}
                                                                checkboxSelection
                                                                disableSelectionOnClick
                                                                onSelectionModelChange={(ids) => handleSelectRow11(ids)}
                                                                onRowClick={(analisisSeleccionado, evt) => {
                                                                    setAnalisisSeleccionado(analisisSeleccionado.row)
                                                                    setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                                                    setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                                                    abrirCerrarModalEditar1();
                                                                }}
                                                            />
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                {/* LISTA DE MODALS */}

                                                {/* Agregar tarea */}
                                                <ModalLayout
                                                    titulo="Agregar nueva Tarea"
                                                    contenido={
                                                        <InsertarVisModal1
                                                            change={handleChangeInput}
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                        />
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                                                            abrirCerrarModalInsertar1();

                                                            if (peticionPost()) {
                                                                setSnackData({ open: true, msg: 'Tarea añadida correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al añadir la tarea', severity: 'error' })
                                                            }

                                                        }, 'success')
                                                    ]}
                                                    open={modalInsertar1}
                                                    onClose={abrirCerrarModalInsertar1}
                                                />

                                                {/* Modal Editar Tarea*/}

                                                <ModalLayout
                                                    titulo="Editar tarea"
                                                    contenido={
                                                        <EditarVisModal1
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            change={handleChangeInput}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            handleChangeCheckbox={handleChangeCheckbox}
                                                            analisisAutocomplete={analisisAutocomplete}
                                                            analisisEditar={analisisEditar}
                                                            elementoTareaEditar={elementoTareaEditar}
                                                            elementosAutocomplete={elementosAutocomplete}
                                                        />}
                                                    botones={[
                                                        insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                            descargarPdf();
                                                        }),
                                                        insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                                                            abrirCerrarModalEditar1()

                                                            if (peticionPut1()) {
                                                                setSnackData({ open: true, msg: 'Tarea editada correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al editar la tarea', severity: 'error' })
                                                            }
                                                        })
                                                    ]}
                                                    open={modalEditar1}
                                                    onClose={abrirCerrarModalEditar1}
                                                />

                                                {/* Eliminar tarea */}
                                                <ModalLayout
                                                    titulo="Eliminar tarea"
                                                    contenido={
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Typography>Estás seguro que deseas eliminar la tarea?</Typography>
                                                            </Grid>
                                                        </>
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                                            abrirCerrarModalEliminar();

                                                            if (peticionDelete()) {
                                                                setSnackData({ open: true, msg: `Tarea eliminada correctamente`, severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al eliminar la tarea', severity: 'error' })
                                                            }

                                                        }, 'error'),
                                                        insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                                                    ]}
                                                    open={modalEliminar}
                                                    onClose={abrirCerrarModalEliminar}
                                                />

                                            </>
                                        )
                                    case 12:
                                        return (
                                            <>
                                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                                                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                                                        {snackData.msg}
                                                    </Alert>
                                                </Snackbar>

                                                <Grid container spacing={2}>
                                                    {/* Título y botones de opción */}
                                                    <Grid item xs={12}>
                                                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant='h6'>Agua Pozo</Typography>
                                                            {
                                                                (rowsIds12.length > 0) ?
                                                                    (
                                                                        <Grid item>
                                                                            <Button
                                                                                sx={{ mr: 2 }}
                                                                                color='error'
                                                                                variant='contained'
                                                                                startIcon={<DeleteIcon />}
                                                                                onClick={(event, rowData) => {
                                                                                    setAnalisisEliminar(rowsIds12)
                                                                                    abrirCerrarModalEliminar()
                                                                                }}
                                                                            >
                                                                                Eliminar
                                                                            </Button>
                                                                        </Grid>
                                                                    ) : (
                                                                        <Button
                                                                            color='success'
                                                                            variant='contained'
                                                                            startIcon={<AddIcon />}
                                                                            onClick={abrirCerrarModalInsertar}
                                                                        >Añadir</Button>
                                                                    )
                                                            }
                                                        </Card>
                                                    </Grid>

                                                    {/* Tabla donde se muestran los registros de los clientes */}
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <DataGrid
                                                                components={{ Toolbar: GridToolbar }}
                                                                localeText={DATAGRID_LOCALE_TEXT}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 700,
                                                                    backgroundColor: '#FFFFFF'
                                                                }}
                                                                rows={rows12}
                                                                columns={columnas}
                                                                pageSize={12}
                                                                rowsPerPageOptions={[12]}
                                                                checkboxSelection
                                                                disableSelectionOnClick
                                                                onSelectionModelChange={(ids) => handleSelectRow12(ids)}
                                                                onRowClick={(analisisSeleccionado, evt) => {
                                                                    setAnalisisSeleccionado(analisisSeleccionado.row)
                                                                    setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                                                    setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                                                    abrirCerrarModalEditar();
                                                                }}
                                                            />
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                {/* LISTA DE MODALS */}

                                                {/* Agregar tarea */}
                                                <ModalLayout
                                                    titulo="Agregar nueva Tarea"
                                                    contenido={
                                                        <InsertarVisModal
                                                            change={handleChangeInput}
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                        />
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                                                            abrirCerrarModalInsertar();

                                                            if (peticionPost()) {
                                                                setSnackData({ open: true, msg: 'Tarea añadida correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al añadir la tarea', severity: 'error' })
                                                            }

                                                        }, 'success')
                                                    ]}
                                                    open={modalInsertar}
                                                    onClose={abrirCerrarModalInsertar}
                                                />

                                                {/* Modal Editar Tarea*/}

                                                <ModalLayout
                                                    titulo="Editar tarea"
                                                    contenido={
                                                        <EditarVisModal
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            change={handleChangeInput}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            handleChangeCheckbox={handleChangeCheckbox}
                                                            analisisAutocomplete={analisisAutocomplete}
                                                            analisisEditar={analisisEditar}
                                                            elementoTareaEditar={elementoTareaEditar}
                                                            elementosAutocomplete={elementosAutocomplete}
                                                            handlePdf={handlePdf}
                                                        />}
                                                    botones={[
                                                        insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                            descargarPdfNoFQ();
                                                        }),
                                                        insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                                                            abrirCerrarModalEditar()

                                                            if (peticionPut()) {
                                                                setSnackData({ open: true, msg: 'Tarea editada correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al editar la tarea', severity: 'error' })
                                                            }
                                                        })
                                                    ]}
                                                    open={modalEditar}
                                                    onClose={abrirCerrarModalEditar}
                                                />

                                                {/* Eliminar tarea */}
                                                <ModalLayout
                                                    titulo="Eliminar tarea"
                                                    contenido={
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Typography>Estás seguro que deseas eliminar la tarea?</Typography>
                                                            </Grid>
                                                        </>
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                                            abrirCerrarModalEliminar();

                                                            if (peticionDelete()) {
                                                                setSnackData({ open: true, msg: `Tarea eliminada correctamente`, severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al eliminar la tarea', severity: 'error' })
                                                            }

                                                        }, 'error'),
                                                        insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                                                    ]}
                                                    open={modalEliminar}
                                                    onClose={abrirCerrarModalEliminar}
                                                />

                                            </>
                                        )
                                    case 13:
                                        return (
                                            <>
                                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                                                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                                                        {snackData.msg}
                                                    </Alert>
                                                </Snackbar>

                                                <Grid container spacing={2}>
                                                    {/* Título y botones de opción */}
                                                    <Grid item xs={12}>
                                                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant='h6'>Desinfeccion ACS</Typography>
                                                            {
                                                                (rowsIds13.length > 0) ?
                                                                    (
                                                                        <Grid item>
                                                                            <Button
                                                                                sx={{ mr: 2 }}
                                                                                color='error'
                                                                                variant='contained'
                                                                                startIcon={<DeleteIcon />}
                                                                                onClick={(event, rowData) => {
                                                                                    setAnalisisEliminar(rowsIds13)
                                                                                    abrirCerrarModalEliminar()
                                                                                }}
                                                                            >
                                                                                Eliminar
                                                                            </Button>
                                                                        </Grid>
                                                                    ) : (
                                                                        <Button
                                                                            color='success'
                                                                            variant='contained'
                                                                            startIcon={<AddIcon />}
                                                                            onClick={abrirCerrarModalInsertar}
                                                                        >Añadir</Button>
                                                                    )
                                                            }
                                                        </Card>
                                                    </Grid>

                                                    {/* Tabla donde se muestran los registros de los clientes */}
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <DataGrid
                                                                components={{ Toolbar: GridToolbar }}
                                                                localeText={DATAGRID_LOCALE_TEXT}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 700,
                                                                    backgroundColor: '#FFFFFF'
                                                                }}
                                                                rows={rows13}
                                                                columns={columnas}
                                                                pageSize={12}
                                                                rowsPerPageOptions={[12]}
                                                                checkboxSelection
                                                                disableSelectionOnClick
                                                                onSelectionModelChange={(ids) => handleSelectRow13(ids)}
                                                                onRowClick={(analisisSeleccionado, evt) => {
                                                                    setAnalisisSeleccionado(analisisSeleccionado.row)
                                                                    setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                                                    setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                                                    abrirCerrarModalEditar();
                                                                }}
                                                            />
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                {/* LISTA DE MODALS */}

                                                {/* Agregar tarea */}
                                                <ModalLayout
                                                    titulo="Agregar nueva Tarea"
                                                    contenido={
                                                        <InsertarVisModal
                                                            change={handleChangeInput}
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                        />
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                                                            abrirCerrarModalInsertar();

                                                            if (peticionPost()) {
                                                                setSnackData({ open: true, msg: 'Tarea añadida correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al añadir la tarea', severity: 'error' })
                                                            }

                                                        }, 'success')
                                                    ]}
                                                    open={modalInsertar}
                                                    onClose={abrirCerrarModalInsertar}
                                                />

                                                {/* Modal Editar Tarea*/}

                                                <ModalLayout
                                                    titulo="Editar tarea"
                                                    contenido={
                                                        <EditarVisModal
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            change={handleChangeInput}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            handleChangeCheckbox={handleChangeCheckbox}
                                                            analisisAutocomplete={analisisAutocomplete}
                                                            analisisEditar={analisisEditar}
                                                            elementoTareaEditar={elementoTareaEditar}
                                                            elementosAutocomplete={elementosAutocomplete}
                                                            handlePdf={handlePdf}
                                                        />}
                                                    botones={[
                                                        insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                            descargarPdfNoFQ();
                                                        }),
                                                        insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                                                            abrirCerrarModalEditar()

                                                            if (peticionPut()) {
                                                                setSnackData({ open: true, msg: 'Tarea editada correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al editar la tarea', severity: 'error' })
                                                            }
                                                        })
                                                    ]}
                                                    open={modalEditar}
                                                    onClose={abrirCerrarModalEditar}
                                                />

                                                {/* Eliminar tarea */}
                                                <ModalLayout
                                                    titulo="Eliminar tarea"
                                                    contenido={
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Typography>Estás seguro que deseas eliminar la tarea?</Typography>
                                                            </Grid>
                                                        </>
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                                            abrirCerrarModalEliminar();

                                                            if (peticionDelete()) {
                                                                setSnackData({ open: true, msg: `Tarea eliminada correctamente`, severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al eliminar la tarea', severity: 'error' })
                                                            }

                                                        }, 'error'),
                                                        insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                                                    ]}
                                                    open={modalEliminar}
                                                    onClose={abrirCerrarModalEliminar}
                                                />

                                            </>
                                        )
                                    case 14:
                                        return (
                                            <>
                                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                                                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                                                        {snackData.msg}
                                                    </Alert>
                                                </Snackbar>

                                                <Grid container spacing={2}>
                                                    {/* Título y botones de opción */}
                                                    <Grid item xs={12}>
                                                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant='h6'>Mantenimiento Maq Frio</Typography>
                                                            {
                                                                (rowsIds14.length > 0) ?
                                                                    (
                                                                        <Grid item>
                                                                            <Button
                                                                                sx={{ mr: 2 }}
                                                                                color='error'
                                                                                variant='contained'
                                                                                startIcon={<DeleteIcon />}
                                                                                onClick={(event, rowData) => {
                                                                                    setAnalisisEliminar(rowsIds14)
                                                                                    abrirCerrarModalEliminar()
                                                                                }}
                                                                            >
                                                                                Eliminar
                                                                            </Button>
                                                                        </Grid>
                                                                    ) : (
                                                                        <Button
                                                                            color='success'
                                                                            variant='contained'
                                                                            startIcon={<AddIcon />}
                                                                            onClick={abrirCerrarModalInsertar}
                                                                        >Añadir</Button>
                                                                    )
                                                            }
                                                        </Card>
                                                    </Grid>

                                                    {/* Tabla donde se muestran los registros de los clientes */}
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <DataGrid
                                                                components={{ Toolbar: GridToolbar }}
                                                                localeText={DATAGRID_LOCALE_TEXT}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 700,
                                                                    backgroundColor: '#FFFFFF'
                                                                }}
                                                                rows={rows14}
                                                                columns={columnas}
                                                                pageSize={12}
                                                                rowsPerPageOptions={[12]}
                                                                checkboxSelection
                                                                disableSelectionOnClick
                                                                onSelectionModelChange={(ids) => handleSelectRow14(ids)}
                                                                onRowClick={(analisisSeleccionado, evt) => {
                                                                    setAnalisisSeleccionado(analisisSeleccionado.row)
                                                                    setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                                                    setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                                                    abrirCerrarModalEditar();
                                                                }}
                                                            />
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                {/* LISTA DE MODALS */}

                                                {/* Agregar tarea */}
                                                <ModalLayout
                                                    titulo="Agregar nueva Tarea"
                                                    contenido={
                                                        <InsertarVisModal
                                                            change={handleChangeInput}
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                        />
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                                                            abrirCerrarModalInsertar();

                                                            if (peticionPost()) {
                                                                setSnackData({ open: true, msg: 'Tarea añadida correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al añadir la tarea', severity: 'error' })
                                                            }

                                                        }, 'success')
                                                    ]}
                                                    open={modalInsertar}
                                                    onClose={abrirCerrarModalInsertar}
                                                />

                                                {/* Modal Editar Tarea*/}

                                                <ModalLayout
                                                    titulo="Editar tarea"
                                                    contenido={
                                                        <EditarVisModal
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            change={handleChangeInput}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            handleChangeCheckbox={handleChangeCheckbox}
                                                            analisisAutocomplete={analisisAutocomplete}
                                                            analisisEditar={analisisEditar}
                                                            elementoTareaEditar={elementoTareaEditar}
                                                            elementosAutocomplete={elementosAutocomplete}
                                                            handlePdf={handlePdf}
                                                        />}
                                                    botones={[
                                                        insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                            descargarPdfNoFQ();
                                                        }),
                                                        insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                                                            abrirCerrarModalEditar()

                                                            if (peticionPut()) {
                                                                setSnackData({ open: true, msg: 'Tarea editada correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al editar la tarea', severity: 'error' })
                                                            }
                                                        })
                                                    ]}
                                                    open={modalEditar}
                                                    onClose={abrirCerrarModalEditar}
                                                />

                                                {/* Eliminar tarea */}
                                                <ModalLayout
                                                    titulo="Eliminar tarea"
                                                    contenido={
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Typography>Estás seguro que deseas eliminar la tarea?</Typography>
                                                            </Grid>
                                                        </>
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                                            abrirCerrarModalEliminar();

                                                            if (peticionDelete()) {
                                                                setSnackData({ open: true, msg: `Tarea eliminada correctamente`, severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al eliminar la tarea', severity: 'error' })
                                                            }

                                                        }, 'error'),
                                                        insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                                                    ]}
                                                    open={modalEliminar}
                                                    onClose={abrirCerrarModalEliminar}
                                                />

                                            </>
                                        )
                                    case 15:
                                        return (
                                            <>
                                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                                                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                                                        {snackData.msg}
                                                    </Alert>
                                                </Snackbar>

                                                <Grid container spacing={2}>
                                                    {/* Título y botones de opción */}
                                                    <Grid item xs={12}>
                                                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant='h6'>Mediciones</Typography>
                                                            {
                                                                (rowsIds15.length > 0) ?
                                                                    (
                                                                        <Grid item>
                                                                            <Button
                                                                                sx={{ mr: 2 }}
                                                                                color='error'
                                                                                variant='contained'
                                                                                startIcon={<DeleteIcon />}
                                                                                onClick={(event, rowData) => {
                                                                                    setAnalisisEliminar(rowsIds15)
                                                                                    abrirCerrarModalEliminar()
                                                                                }}
                                                                            >
                                                                                Eliminar
                                                                            </Button>
                                                                        </Grid>
                                                                    ) : (
                                                                        <Button
                                                                            color='success'
                                                                            variant='contained'
                                                                            startIcon={<AddIcon />}
                                                                            onClick={abrirCerrarModalInsertar}
                                                                        >Añadir</Button>
                                                                    )
                                                            }
                                                        </Card>
                                                    </Grid>

                                                    {/* Tabla donde se muestran los registros de los clientes */}
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <DataGrid
                                                                components={{ Toolbar: GridToolbar }}
                                                                localeText={DATAGRID_LOCALE_TEXT}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 700,
                                                                    backgroundColor: '#FFFFFF'
                                                                }}
                                                                rows={rows15}
                                                                columns={columnas}
                                                                pageSize={12}
                                                                rowsPerPageOptions={[12]}
                                                                checkboxSelection
                                                                disableSelectionOnClick
                                                                onSelectionModelChange={(ids) => handleSelectRow15(ids)}
                                                                onRowClick={(analisisSeleccionado, evt) => {
                                                                    setAnalisisSeleccionado(analisisSeleccionado.row)
                                                                    setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                                                    setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                                                    abrirCerrarModalEditar();
                                                                }}
                                                            />
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                {/* LISTA DE MODALS */}

                                                {/* Agregar tarea */}
                                                <ModalLayout
                                                    titulo="Agregar nueva Tarea"
                                                    contenido={
                                                        <InsertarVisModal
                                                            change={handleChangeInput}
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                        />
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                                                            abrirCerrarModalInsertar();

                                                            if (peticionPost()) {
                                                                setSnackData({ open: true, msg: 'Tarea añadida correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al añadir la tarea', severity: 'error' })
                                                            }

                                                        }, 'success')
                                                    ]}
                                                    open={modalInsertar}
                                                    onClose={abrirCerrarModalInsertar}
                                                />

                                                {/* Modal Editar Tarea*/}

                                                <ModalLayout
                                                    titulo="Editar tarea"
                                                    contenido={
                                                        <EditarVisModal
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            change={handleChangeInput}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            handleChangeCheckbox={handleChangeCheckbox}
                                                            analisisAutocomplete={analisisAutocomplete}
                                                            analisisEditar={analisisEditar}
                                                            elementoTareaEditar={elementoTareaEditar}
                                                            elementosAutocomplete={elementosAutocomplete}
                                                            handlePdf={handlePdf}
                                                        />}
                                                    botones={[
                                                        insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                            descargarPdfNoFQ();
                                                        }),
                                                        insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                                                            abrirCerrarModalEditar()

                                                            if (peticionPut()) {
                                                                setSnackData({ open: true, msg: 'Tarea editada correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al editar la tarea', severity: 'error' })
                                                            }
                                                        })
                                                    ]}
                                                    open={modalEditar}
                                                    onClose={abrirCerrarModalEditar}
                                                />

                                                {/* Eliminar tarea */}
                                                <ModalLayout
                                                    titulo="Eliminar tarea"
                                                    contenido={
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Typography>Estás seguro que deseas eliminar la tarea?</Typography>
                                                            </Grid>
                                                        </>
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                                            abrirCerrarModalEliminar();

                                                            if (peticionDelete()) {
                                                                setSnackData({ open: true, msg: `Tarea eliminada correctamente`, severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al eliminar la tarea', severity: 'error' })
                                                            }

                                                        }, 'error'),
                                                        insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                                                    ]}
                                                    open={modalEliminar}
                                                    onClose={abrirCerrarModalEliminar}
                                                />

                                            </>
                                        )
                                    case 16:
                                        return (
                                            <>
                                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                                                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                                                        {snackData.msg}
                                                    </Alert>
                                                </Snackbar>

                                                <Grid container spacing={2}>
                                                    {/* Título y botones de opción */}
                                                    <Grid item xs={12}>
                                                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant='h6'>Control Fuga de Gas</Typography>
                                                            {
                                                                (rowsIds16.length > 0) ?
                                                                    (
                                                                        <Grid item>
                                                                            <Button
                                                                                sx={{ mr: 2 }}
                                                                                color='error'
                                                                                variant='contained'
                                                                                startIcon={<DeleteIcon />}
                                                                                onClick={(event, rowData) => {
                                                                                    setAnalisisEliminar(rowsIds16)
                                                                                    abrirCerrarModalEliminar()
                                                                                }}
                                                                            >
                                                                                Eliminar
                                                                            </Button>
                                                                        </Grid>
                                                                    ) : (
                                                                        <Button
                                                                            color='success'
                                                                            variant='contained'
                                                                            startIcon={<AddIcon />}
                                                                            onClick={abrirCerrarModalInsertar}
                                                                        >Añadir</Button>
                                                                    )
                                                            }
                                                        </Card>
                                                    </Grid>

                                                    {/* Tabla donde se muestran los registros de los clientes */}
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <DataGrid
                                                                components={{ Toolbar: GridToolbar }}
                                                                localeText={DATAGRID_LOCALE_TEXT}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 700,
                                                                    backgroundColor: '#FFFFFF'
                                                                }}
                                                                rows={rows16}
                                                                columns={columnas}
                                                                pageSize={12}
                                                                rowsPerPageOptions={[12]}
                                                                checkboxSelection
                                                                disableSelectionOnClick
                                                                onSelectionModelChange={(ids) => handleSelectRow16(ids)}
                                                                onRowClick={(analisisSeleccionado, evt) => {
                                                                    setAnalisisSeleccionado(analisisSeleccionado.row)
                                                                    setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                                                    setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                                                    abrirCerrarModalEditar();
                                                                }}
                                                            />
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                {/* LISTA DE MODALS */}

                                                {/* Agregar tarea */}
                                                <ModalLayout
                                                    titulo="Agregar nueva Tarea"
                                                    contenido={
                                                        <InsertarVisModal
                                                            change={handleChangeInput}
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                        />
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                                                            abrirCerrarModalInsertar();

                                                            if (peticionPost()) {
                                                                setSnackData({ open: true, msg: 'Tarea añadida correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al añadir la tarea', severity: 'error' })
                                                            }

                                                        }, 'success')
                                                    ]}
                                                    open={modalInsertar}
                                                    onClose={abrirCerrarModalInsertar}
                                                />

                                                {/* Modal Editar Tarea*/}

                                                <ModalLayout
                                                    titulo="Editar tarea"
                                                    contenido={
                                                        <EditarVisModal
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            change={handleChangeInput}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            handleChangeCheckbox={handleChangeCheckbox}
                                                            analisisAutocomplete={analisisAutocomplete}
                                                            analisisEditar={analisisEditar}
                                                            elementoTareaEditar={elementoTareaEditar}
                                                            elementosAutocomplete={elementosAutocomplete}
                                                            handlePdf={handlePdf}
                                                        />}
                                                    botones={[
                                                        insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                            descargarPdfNoFQ();
                                                        }),
                                                        insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                                                            abrirCerrarModalEditar()

                                                            if (peticionPut()) {
                                                                setSnackData({ open: true, msg: 'Tarea editada correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al editar la tarea', severity: 'error' })
                                                            }
                                                        })
                                                    ]}
                                                    open={modalEditar}
                                                    onClose={abrirCerrarModalEditar}
                                                />

                                                {/* Eliminar tarea */}
                                                <ModalLayout
                                                    titulo="Eliminar tarea"
                                                    contenido={
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Typography>Estás seguro que deseas eliminar la tarea?</Typography>
                                                            </Grid>
                                                        </>
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                                            abrirCerrarModalEliminar();

                                                            if (peticionDelete()) {
                                                                setSnackData({ open: true, msg: `Tarea eliminada correctamente`, severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al eliminar la tarea', severity: 'error' })
                                                            }

                                                        }, 'error'),
                                                        insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                                                    ]}
                                                    open={modalEliminar}
                                                    onClose={abrirCerrarModalEliminar}
                                                />

                                            </>
                                        )
                                    case 17:
                                        return (
                                            <>
                                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                                                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                                                        {snackData.msg}
                                                    </Alert>
                                                </Snackbar>

                                                <Grid container spacing={2}>
                                                    {/* Título y botones de opción */}
                                                    <Grid item xs={12}>
                                                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant='h6'>Agua Potable</Typography>
                                                            {
                                                                (rowsIds17.length > 0) ?
                                                                    (
                                                                        <Grid item>
                                                                            <Button
                                                                                sx={{ mr: 2 }}
                                                                                color='error'
                                                                                variant='contained'
                                                                                startIcon={<DeleteIcon />}
                                                                                onClick={(event, rowData) => {
                                                                                    setAnalisisEliminar(rowsIds17)
                                                                                    abrirCerrarModalEliminar()
                                                                                }}
                                                                            >
                                                                                Eliminar
                                                                            </Button>
                                                                        </Grid>
                                                                    ) : (
                                                                        <Button
                                                                            color='success'
                                                                            variant='contained'
                                                                            startIcon={<AddIcon />}
                                                                            onClick={abrirCerrarModalInsertar}
                                                                        >Añadir</Button>
                                                                    )
                                                            }
                                                        </Card>
                                                    </Grid>

                                                    {/* Tabla donde se muestran los registros de los clientes */}
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <DataGrid
                                                                components={{ Toolbar: GridToolbar }}
                                                                localeText={DATAGRID_LOCALE_TEXT}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 700,
                                                                    backgroundColor: '#FFFFFF'
                                                                }}
                                                                rows={rows17}
                                                                columns={columnas}
                                                                pageSize={12}
                                                                rowsPerPageOptions={[12]}
                                                                checkboxSelection
                                                                disableSelectionOnClick
                                                                onSelectionModelChange={(ids) => handleSelectRow17(ids)}
                                                                onRowClick={(analisisSeleccionado, evt) => {
                                                                    setAnalisisSeleccionado(analisisSeleccionado.row)
                                                                    setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                                                    setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                                                    abrirCerrarModalEditar();
                                                                }}
                                                            />
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                {/* LISTA DE MODALS */}

                                                {/* Agregar tarea */}
                                                <ModalLayout
                                                    titulo="Agregar nueva Tarea"
                                                    contenido={
                                                        <InsertarVisModal
                                                            change={handleChangeInput}
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                        />
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                                                            abrirCerrarModalInsertar();

                                                            if (peticionPost()) {
                                                                setSnackData({ open: true, msg: 'Tarea añadida correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al añadir la tarea', severity: 'error' })
                                                            }

                                                        }, 'success')
                                                    ]}
                                                    open={modalInsertar}
                                                    onClose={abrirCerrarModalInsertar}
                                                />

                                                {/* Modal Editar Tarea*/}

                                                <ModalLayout
                                                    titulo="Editar tarea"
                                                    contenido={
                                                        <EditarVisModal
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            change={handleChangeInput}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            handleChangeCheckbox={handleChangeCheckbox}
                                                            analisisAutocomplete={analisisAutocomplete}
                                                            analisisEditar={analisisEditar}
                                                            elementoTareaEditar={elementoTareaEditar}
                                                            elementosAutocomplete={elementosAutocomplete}
                                                            handlePdf={handlePdf}
                                                        />}
                                                    botones={[
                                                        insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                            descargarPdfNoFQ();
                                                        }),
                                                        insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                                                            abrirCerrarModalEditar()

                                                            if (peticionPut()) {
                                                                setSnackData({ open: true, msg: 'Tarea editada correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al editar la tarea', severity: 'error' })
                                                            }
                                                        })
                                                    ]}
                                                    open={modalEditar}
                                                    onClose={abrirCerrarModalEditar}
                                                />

                                                {/* Eliminar tarea */}
                                                <ModalLayout
                                                    titulo="Eliminar tarea"
                                                    contenido={
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Typography>Estás seguro que deseas eliminar la tarea?</Typography>
                                                            </Grid>
                                                        </>
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                                            abrirCerrarModalEliminar();

                                                            if (peticionDelete()) {
                                                                setSnackData({ open: true, msg: `Tarea eliminada correctamente`, severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al eliminar la tarea', severity: 'error' })
                                                            }

                                                        }, 'error'),
                                                        insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                                                    ]}
                                                    open={modalEliminar}
                                                    onClose={abrirCerrarModalEliminar}
                                                />

                                            </>
                                        )
                                    case 18:
                                        return (
                                            <>
                                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                                                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                                                        {snackData.msg}
                                                    </Alert>
                                                </Snackbar>

                                                <Grid container spacing={2}>
                                                    {/* Título y botones de opción */}
                                                    <Grid item xs={12}>
                                                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant='h6'>Revisión de Bandeja</Typography>
                                                            {
                                                                (rowsIds18.length > 0) ?
                                                                    (
                                                                        <Grid item>
                                                                            <Button
                                                                                sx={{ mr: 2 }}
                                                                                color='error'
                                                                                variant='contained'
                                                                                startIcon={<DeleteIcon />}
                                                                                onClick={(event, rowData) => {
                                                                                    setAnalisisEliminar(rowsIds18)
                                                                                    abrirCerrarModalEliminar()
                                                                                }}
                                                                            >
                                                                                Eliminar
                                                                            </Button>
                                                                        </Grid>
                                                                    ) : (
                                                                        <Button
                                                                            color='success'
                                                                            variant='contained'
                                                                            startIcon={<AddIcon />}
                                                                            onClick={abrirCerrarModalInsertar}
                                                                        >Añadir</Button>
                                                                    )
                                                            }
                                                        </Card>
                                                    </Grid>

                                                    {/* Tabla donde se muestran los registros de los clientes */}
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <DataGrid
                                                                components={{ Toolbar: GridToolbar }}
                                                                localeText={DATAGRID_LOCALE_TEXT}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 700,
                                                                    backgroundColor: '#FFFFFF'
                                                                }}
                                                                rows={rows18}
                                                                columns={columnas}
                                                                pageSize={12}
                                                                rowsPerPageOptions={[12]}
                                                                checkboxSelection
                                                                disableSelectionOnClick
                                                                onSelectionModelChange={(ids) => handleSelectRow18(ids)}
                                                                onRowClick={(analisisSeleccionado, evt) => {
                                                                    setAnalisisSeleccionado(analisisSeleccionado.row)
                                                                    setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.row.analisis));
                                                                    setElementoTareaEditar(elementos.filter(elemento => elemento.id === analisisSeleccionado.row.elemento));
                                                                    abrirCerrarModalEditar();
                                                                }}
                                                            />
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                {/* LISTA DE MODALS */}

                                                {/* Agregar tarea */}
                                                <ModalLayout
                                                    titulo="Agregar nueva Tarea"
                                                    contenido={
                                                        <InsertarVisModal
                                                            change={handleChangeInput}
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                        />
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                                                            abrirCerrarModalInsertar();

                                                            if (peticionPost()) {
                                                                setSnackData({ open: true, msg: 'Tarea añadida correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al añadir la tarea', severity: 'error' })
                                                            }

                                                        }, 'success')
                                                    ]}
                                                    open={modalInsertar}
                                                    onClose={abrirCerrarModalInsertar}
                                                />

                                                {/* Modal Editar Tarea*/}

                                                <ModalLayout
                                                    titulo="Editar tarea"
                                                    contenido={
                                                        <EditarVisModal
                                                            analisisSeleccionado={analisisSeleccionado}
                                                            change={handleChangeInput}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            handleChangeCheckbox={handleChangeCheckbox}
                                                            analisisAutocomplete={analisisAutocomplete}
                                                            analisisEditar={analisisEditar}
                                                            elementoTareaEditar={elementoTareaEditar}
                                                            elementosAutocomplete={elementosAutocomplete}
                                                            handlePdf={handlePdf}
                                                        />}
                                                    botones={[
                                                        insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                            descargarPdfNoFQ();
                                                        }),
                                                        insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                                                            abrirCerrarModalEditar()

                                                            if (peticionPut()) {
                                                                setSnackData({ open: true, msg: 'Tarea editada correctamente', severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al editar la tarea', severity: 'error' })
                                                            }
                                                        })
                                                    ]}
                                                    open={modalEditar}
                                                    onClose={abrirCerrarModalEditar}
                                                />

                                                {/* Eliminar tarea */}
                                                <ModalLayout
                                                    titulo="Eliminar tarea"
                                                    contenido={
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Typography>Estás seguro que deseas eliminar la tarea?</Typography>
                                                            </Grid>
                                                        </>
                                                    }
                                                    botones={[
                                                        insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                                            abrirCerrarModalEliminar();

                                                            if (peticionDelete()) {
                                                                setSnackData({ open: true, msg: `Tarea eliminada correctamente`, severity: 'success' });
                                                            } else {
                                                                setSnackData({ open: true, msg: 'Ha habido un error al eliminar la tarea', severity: 'error' })
                                                            }

                                                        }, 'error'),
                                                        insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                                                    ]}
                                                    open={modalEliminar}
                                                    onClose={abrirCerrarModalEliminar}
                                                />

                                            </>
                                        )
                                        {/*default:
                                        return (
                                            <MaterialTable columns={columnasDet} data={dataOtros}
                                                localization={localization}
                                                actions={[
                                                    {
                                                        icon: () => <AddCircle style={{ fill: "green" }} />,
                                                        tooltip: "Añadir analisis",
                                                        isFreeAction: true,
                                                        onClick: (e, data) => {
                                                            setAnalisisSeleccionado({
                                                                ...analisisSeleccionado,
                                                                analisis: analisi.analisis
                                                            })
                                                            abrirCerrarModalInsertar1();
                                                        },
                                                    },
                                                    {
                                                        icon: () => <RemoveCircle style={{ fill: "red" }} />,
                                                        tooltip: "Eliminar analisis",
                                                        onClick: (event, rowData) => {
                                                            setAnalisisEliminar(FilasSeleccionadas1);
                                                            abrirCerrarModalEliminar();
                                                        },
                                                    },
                                                ]}

                                                onRowClick={((evt, analisisSeleccionado) => {
                                                    setAnalisisSeleccionado(analisisSeleccionado)
                                                    setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.id));
                                                    abrirCerrarModalEditar1();
                                                })}

                                                onSelectionChange={(filas) => {
                                                    setFilasSeleccionadas1(filas);

                                                    if (filas.length > 0) {
                                                        setAnalisisSeleccionado(filas[0]);
                                                    }
                                                }}

                                                options={{
                                                    sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                                    columnsButton: false, showSelectAllCheckbox: false,
                                                    rowStyle: rowData => ({
                                                        backgroundColor: (analisisSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                                                        whiteSpace: "nowrap"
                                                    }),
                                                    exportMenu: [{
                                                        label: 'Export PDF',
                                                        exportFunc: (cols, datas) => ExportPdf(cols, data1, `Listado de ${analisi.analisis}`)
                                                    }, {
                                                        label: 'Export CSV',
                                                        exportFunc: (cols, datas) => ExportCsv(cols, data1, `Listado de ${analisi.analisis}`)
                                                    }]
                                                }}

                                                title={analisi.analisis}
                                            />
                                            )*/}
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );

}