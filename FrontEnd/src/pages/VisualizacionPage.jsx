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
import { ModalLayout2 } from "../components/ModalLayout2";
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
import { deleteParametrosAnalisisPlanta, getAnalisis, getAnalisisNivelesPlantasCliente, getClientes, getConfNivelesPlantasCliente, getElementosPlanta, getEntregas, getOfertas, getParametrosAnalisisPlanta, getUsuarios, postParametrosAnalisisPlanta, putParametrosAnalisisPlanta, putParametrosAnalisisPlantaPorId, bajarPdf, bajarPdfNoFQ, subirPdf, getFicheros, getAnalisisId } from "../api";
import { useUsuarioActual } from "../hooks/useUsuarioActual";

import Swal from 'sweetalert2';
import { AnalisisTable } from "../components/AnalisisTable";

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
    const [rows19, setRows19] = useState([]);
    const [rows20, setRows20] = useState([]);
    const [rows21, setRows21] = useState([]);
    const [rows22, setRows22] = useState([]);
    const [rows23, setRows23] = useState([]);
    const [rows24, setRows24] = useState([]);
    const [rows25, setRows25] = useState([]);
    const [rows26, setRows26] = useState([]);
    const [rows27, setRows27] = useState([]);
    const [rows28, setRows28] = useState([]);
    const [rows29, setRows29] = useState([]);
    const [rows30, setRows30] = useState([]);
    const [rows31, setRows31] = useState([]);
    const [rows32, setRows32] = useState([]);
    const [rows33, setRows33] = useState([]);
    const [rows34, setRows34] = useState([]);
    const [rows35, setRows35] = useState([]);
    const [rows36, setRows36] = useState([]);

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
    const [rowsIds19, setRowsIds19] = useState([]);
    const [rowsIds20, setRowsIds20] = useState([]);
    const [rowsIds21, setRowsIds21] = useState([]);
    const [rowsIds22, setRowsIds22] = useState([]);
    const [rowsIds23, setRowsIds23] = useState([]);
    const [rowsIds24, setRowsIds24] = useState([]);
    const [rowsIds25, setRowsIds25] = useState([]);
    const [rowsIds26, setRowsIds26] = useState([]);
    const [rowsIds27, setRowsIds27] = useState([]);
    const [rowsIds28, setRowsIds28] = useState([]);
    const [rowsIds29, setRowsIds29] = useState([]);
    const [rowsIds30, setRowsIds30] = useState([]);
    const [rowsIds31, setRowsIds31] = useState([]);
    const [rowsIds32, setRowsIds32] = useState([]);
    const [rowsIds33, setRowsIds33] = useState([]);
    const [rowsIds34, setRowsIds34] = useState([]);
    const [rowsIds35, setRowsIds35] = useState([]);
    const [rowsIds36, setRowsIds36] = useState([]);

    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalInsertar1, setModalInsertar1] = useState(false);
    const [modalInsertarAerobio, setModalInsertarAerobio] = useState(false);
    const [modalInsertarLegionela, setModalInsertarLegionela] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEditar1, setModalEditar1] = useState(false);
    const [modalEditarAerobio, setModalEditarAerobio] = useState(false);
    const [modalEditarLegionela, setModalEditarLegionela] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);

    const [confNivelesPlantasCliente, setConfNivelesPlantasCliente] = useState([]);

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
        recogido: false,
        fechaRecogido: null,
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

    const [analisisEliminar, setAnalisisEliminar] = useState([]);
    const [analisisEditar, setAnalisisEditar] = useState([]);
    const [elementoTareaEditar, setElementoTareaEditar] = useState([]);

    const [oferta, setOferta] = useState([]);

    const [clientes, setClientes] = useState([]);

    const [elementos, setElementos] = useState([]);
    const [operarios, setOperarios] = useState([]);
    const [ficheros, setFicheros] = useState([]);

    const [analisisNivelesPlantasCliente, setAnalisisNivelesPlantasCliente] = useState([]);

    const [analisis, setAnalisis] = useState([]);
    const [analisisTable, setAnalisisTable] = useState({});

    const [periodo, setPeriodo] = useState("");
    const [fecha, setFecha] = useState("");

    const [dataCliente, setDataCliente] = useState([])

    const [actualState, changeCheckState] = useState(false);
    const [actualState2, changeActualState] = useState(false);

    const [errorFecha, setErrorFecha] = useState(false);

    const columnas = [
        //visibles
        { headerName: 'Periodo', field: 'periodo', width: 150 },
        {
            headerName: 'Fecha',
            field: 'fecha',
            width: 150,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString();
            }
        },
        { headerName: 'Recogido', field: 'recogido', type: 'boolean', width: 100 },
        {
            headerName: 'Fecha Recogido',
            field: 'fechaRecogido',
            width: 150,
            valueFormatter: (params) => {
                if (params.value != null) {
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else {
                    const date = "";
                    return date;
                }
            }
        },
        { headerName: 'Realizado', field: 'realizado', type: 'boolean', width: 100 },
        {
            headerName: 'Fecha Realizado',
            field: 'fechaRealizado',
            width: 150,
            valueFormatter: (params) => {
                if (params.value != null) {
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else {
                    const date = "";
                    return date;
                }
            }
        },
        { headerName: 'Observaciones', field: 'observaciones', width: 250 },
        { headerName: 'Facturado', field: 'facturado', type: 'boolean', width: 100 },
        { headerName: 'Numero Factura', field: 'numeroFacturado', width: 150 },
        {
            headerName: 'PDF',
            field: 'pdf',
            width: 700,
            valueFormatter: (params) => {
                const fich = ficheros.find((fichero) => fichero.id === params.value)
                return fich ? fich.name : '';
            }
        },
        { headerName: 'PDF Recibido', field: 'recibido', type: 'boolean', width: 100 },
        {
            headerName: 'Fecha PDF',
            field: 'fechaPdf',
            width: 150,
            valueFormatter: (params) => {
                if (params.value != null) {
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else {
                    const date = "";
                    return date;
                }
            }
        },
        { headerName: 'Cancelado', field: 'cancelado', type: 'boolean', width: 100 },
        { headerName: 'Comentario', field: 'comentario', width: 200 }
    ];

    const columnas1 = [

        //visibles
        { headerName: 'Periodo', field: 'periodo', width: 150 },
        {
            headerName: 'Fecha',
            field: 'fecha',
            width: 200,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString();
            }
        },
        { headerName: 'Realizado', field: 'realizado', type: 'boolean', width: 120 },
        {
            headerName: 'Fecha Realizado',
            field: 'fechaRealizado',
            width: 200,
            valueFormatter: (params) => {
                if (params.value != null) {
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else {
                    const date = "";
                    return date;
                }
            }
        },
        { headerName: 'Observaciones', field: 'observaciones', width: 300 },
        { headerName: 'Facturado', field: 'facturado', type: 'boolean', width: 100 },
        { headerName: 'Numero Factura', field: 'numeroFacturado', width: 150 },
        {
            headerName: 'PDF',
            field: 'pdf',
            width: 700,
            valueFormatter: (params) => {
                const fich = ficheros.find((fichero) => fichero.id === params.value)
                return fich ? fich.name : '';
            }
        },
        { headerName: 'Cancelado', field: 'cancelado', type: 'boolean', width: 100 },
        { headerName: 'Comentario', field: 'comentario', width: 200 }
    ];

    const columnasLegionela = [

        //visibles
        { headerName: 'Periodo', field: 'periodo', width: 150 },
        {
            headerName: 'Fecha',
            field: 'fecha',
            width: 150,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString();
            }
        },
        { headerName: 'Recogido', field: 'recogido', type: 'boolean', width: 100 },
        {
            headerName: 'Fecha Recogido',
            field: 'fechaRecogido',
            width: 150,
            valueFormatter: (params) => {
                if (params.value != null) {
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else {
                    const date = "";
                    return date;
                }
            }
        },
        { headerName: 'Realizado', field: 'realizado', type: 'boolean', width: 120 },
        {
            headerName: 'Fecha Realizado',
            field: 'fechaRealizado',
            width: 150,
            valueFormatter: (params) => {
                if (params.value != null) {
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else {
                    const date = "";
                    return date;
                }
            }
        },
        { headerName: 'Observaciones', field: 'observaciones', width: 250 },
        { headerName: 'Facturado', field: 'facturado', type: 'boolean', width: 100 },
        { headerName: 'Numero Factura', field: 'numeroFacturado', width: 150 },
        { headerName: 'Resultado', field: 'resultado', width: 120 },
        {
            headerName: 'PDF',
            field: 'pdf',
            width: 700,
            valueFormatter: (params) => {
                const fich = ficheros.find((fichero) => fichero.id === params.value)
                return fich ? fich.name : '';
            }
        },
        { headerName: 'PDF Recibido', field: 'recibido', type: 'boolean', width: 100 },
        {
            headerName: 'Fecha PDF',
            field: 'fechaPdf',
            width: 150,
            valueFormatter: (params) => {
                if (params.value != null) {
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else {
                    const date = "";
                    return date;
                }
            }
        },
        { headerName: 'Cancelado', field: 'cancelado', type: 'boolean', width: 100 },
        { headerName: 'Comentario', field: 'comentario', width: 200 }
    ];

    const columnasAerobios = [

        //visibles
        { headerName: 'Periodo', field: 'periodo', width: 150 },
        {
            headerName: 'Fecha',
            field: 'fecha',
            width: 150,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString();
            }
        },
        { headerName: 'Recogido', field: 'recogido', type: 'boolean', width: 100 },
        {
            headerName: 'Fecha Recogido',
            field: 'fechaRecogido',
            width: 150,
            valueFormatter: (params) => {
                if (params.value != null) {
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else {
                    const date = "";
                    return date;
                }
            }
        },
        { headerName: 'Realizado', field: 'realizado', type: 'boolean', width: 100 },
        {
            headerName: 'Fecha Realizado',
            field: 'fechaRealizado',
            width: 150,
            valueFormatter: (params) => {
                if (params.value != null) {
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else {
                    const date = "";
                    return date;
                }
            }
        },
        { headerName: 'Observaciones', field: 'observaciones', width: 250 },
        { headerName: 'Facturado', field: 'facturado', type: 'boolean', width: 100 },
        { headerName: 'Numero Factura', field: 'numeroFacturado', width: 150 },
        { headerName: 'Resultado', field: 'resultado', width: 120 },
        {
            headerName: 'PDF',
            field: 'pdf',
            width: 700,
            valueFormatter: (params) => {
                const fich = ficheros.find((fichero) => fichero.id === params.value)
                return fich ? fich.name : '';
            }
        },
        { headerName: 'PDF Recibido', field: 'recibido', type: 'boolean', width: 100 },
        {
            headerName: 'Fecha PDF',
            field: 'fechaPdf',
            width: 150,
            valueFormatter: (params) => {
                if (params.value != null) {
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else {
                    const date = "";
                    return date;
                }
            }
        },
        { headerName: 'Cancelado', field: 'cancelado', type: 'boolean', width: 100 },
        { headerName: 'Comentario', field: 'comentario', width: 200 }
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
    const [data19, setData19] = useState([]);
    const [data20, setData20] = useState([]);
    const [data21, setData21] = useState([]);
    const [data22, setData22] = useState([]);
    const [data23, setData23] = useState([]);
    const [data24, setData24] = useState([]);
    const [data25, setData25] = useState([]);
    const [data26, setData26] = useState([]);
    const [data27, setData27] = useState([]);
    const [data28, setData28] = useState([]);
    const [data29, setData29] = useState([]);
    const [data30, setData30] = useState([]);
    const [data31, setData31] = useState([]);
    const [data32, setData32] = useState([]);
    const [data33, setData33] = useState([]);
    const [data34, setData34] = useState([]);
    const [data35, setData35] = useState([]);
    const [data36, setData36] = useState([]);
    const [dataTablas, setDataTablas] = useState([]);
    const [dataEntregas, setDataEntregas] = useState([]);

    const [elementosAutocomplete, setElementosAutocomplete] = useState([]);
    const [analisisAutocomplete, setAnalisisAutocomplete] = useState([]);

    const [snackData, setSnackData] = useState({ open: false, msg: 'Testing', severity: 'success' });

    const { usuarioActual } = useUsuarioActual();

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
            opcionesFiltradasAnalisis.push(analisisNivelesPlantasCliente.filter(anal => anal.id_NivelesPlanta === analisis.id && !anal.deleted));
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

        if (data19.length > 0) {
            setRows19(data19);
        }

        if (data20.length > 0) {
            setRows20(data20);
        }

        if (data21.length > 0) {
            setRows21(data21);
        }

        if (data22.length > 0) {
            setRows22(data22);
        }

        if (data23.length > 0) {
            setRows23(data23);
        }

        if (data24.length > 0) {
            setRows24(data24);
        }

        if (data25.length > 0) {
            setRows25(data25);
        }

        if (data26.length > 0) {
            setRows26(data26);
        }

        if (data27.length > 0) {
            setRows27(data27);
        }

        if (data28.length > 0) {
            setRows28(data28);
        }

        if (data29.length > 0) {
            setRows29(data29);
        }

        if (data30.length > 0) {
            setRows30(data30);
        }

        if (data31.length > 0) {
            setRows31(data31);
        }

        if (data32.length > 0) {
            setRows32(data32);
        }

        if (data33.length > 0) {
            setRows33(data33);
        }

        if (data34.length > 0) {
            setRows34(data34);
        }

        if (data35.length > 0) {
            setRows35(data35);
        }

        if (data36.length > 0) {
            setRows36(data36);
        }
    }, [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15, data16, data17, data18, data19, data20, data21, data22, data23, data24, data25, data26, data27, data28, data29, data30, data31, data32, data33, data34, data35, data36]);

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

    const abrirCerrarModalInsertar = () => {
        setErrorFecha(false)
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
            setModalInsertar(!modalInsertar);
        } else {
            setModalInsertar(!modalInsertar);
        }
    }

    const abrirCerrarModalInsertar1 = () => {
        setErrorFecha(false)
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
            setModalInsertar1(!modalInsertar1);
        } else {
            setModalInsertar1(!modalInsertar1);
        }
    }

    const abrirCerrarModalInsertarAerobio = () => {
        setErrorFecha(false)
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
            setModalInsertarAerobio(!modalInsertarAerobio);
        } else {
            setModalInsertarAerobio(!modalInsertarAerobio);
        }
    }

    const abrirCerrarModalInsertarLegionela = () => {
        setErrorFecha(false)
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
            setModalInsertarLegionela(!modalInsertarLegionela);
        } else {
            setModalInsertarLegionela(!modalInsertarLegionela);
        }
    }

    const abrirCerrarModalEditar = () => {
        setErrorFecha(false)
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
        setErrorFecha(false)
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
        setErrorFecha(false)
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
        setErrorFecha(false)
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
        setErrorFecha(false)
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
            setModalEliminar(!modalEliminar);
        } else {
            setModalEliminar(!modalEliminar);
        }
    }

    const GetCliente = async () => {

        const resp = await getClientes();

        const cliente = Object.entries(resp).map(([key, value]) => (key, value))
        setClientes(cliente);

    }

    const GetAnalisi = async () => {

        const resp = await getAnalisis();

        const analisi = Object.entries(resp).map(([key, value]) => (key, value));
        setAnalisis(analisi);

    }

    const GetFichero = async () => {

        const resp = await getFicheros();

        const fichero = Object.entries(resp).map(([key, value]) => (key, value));
        setFicheros(fichero);
    }

    const GetOferta = async () => {

        const resp = await getOfertas();

        const oferta = Object.entries(resp).map(([key, value]) => (key, value));
        setOferta(oferta);

    }

    const GetElemento = async () => {

        const resp = await getElementosPlanta();

        const elemento = Object.entries(resp).map(([key, value]) => (key, value));
        setElementos(elemento);

    }

    const GetParametrosAnalisisPlanta = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData(resp);

    }

    const GetAnalisisNivelPlantaCliente = async () => {

        const resp = await getAnalisisNivelesPlantasCliente();

        const analisisNiveles = Object.entries(resp).map(([key, value]) => (key, value));
        setAnalisisNivelesPlantasCliente(analisisNiveles);

    }

    const GetConfNivelPlantaCliente = async () => {

        const resp = await getConfNivelesPlantasCliente();

        const niveles = Object.entries(resp).map(([key, value]) => (key, value))
        setConfNivelesPlantasCliente(niveles);

    }

    const peticionGetEntregas = async () => {

        const resp = await getEntregas();
        setDataEntregas(resp);

    }

    const FisicoQuimicoTorre = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData1(resp.filter(analisis => analisis.analisis === 1 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

    }

    const FisicoQuimicoAlimentacion = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData2(resp.filter(analisis => analisis.analisis === 2 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

    }

    const FisicoQuimicoCondensados = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData3(resp.filter(analisis => analisis.analisis === 3 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

    }

    const FisicoQuimicoOsmosis = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData4(resp.filter(analisis => analisis.analisis === 4 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

    }

    const FisicoQuimicoRechazo = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData5(resp.filter(analisis => analisis.analisis === 5 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

    }

    const FisicoQuimicoProduccion = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData6(resp.filter(analisis => analisis.analisis === 6 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

    }

    const FisicoQuimicoCaldera = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData7(resp.filter(analisis => analisis.analisis === 7 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

    }

    const FisicoQuimicoDescalcificador = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData8(resp.filter(analisis => analisis.analisis === 8 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

    }

    const AerobiosTorre = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData9(resp.filter(analisis => analisis.analisis === 9 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

    }

    const AerobiosACH = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData10(resp.filter(analisis => analisis.analisis === 10 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

    }

    const AguasResiduales = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData11(resp.filter(analisis => analisis.analisis === 11 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

    }

    const Desinfeccion = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData12(resp.filter(analisis => analisis.analisis === 12 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

    }

    const DesinfeccionACH = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData13(resp.filter(analisis => analisis.analisis === 13 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

    }

    const DesinfeccionCI = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData14(resp.filter(analisis => analisis.analisis === 14 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

    }

    const Mediciones = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData15(resp.filter(analisis => analisis.analisis === 15 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

    }

    const AguaPotable = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData16(resp.filter(analisis => analisis.analisis === 16 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

    }

    const LegionelaTorre = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData17(resp.filter(analisis => analisis.analisis === 17 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

    }

    const LegionelaACH = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData18(resp.filter(analisis => analisis.analisis === 18 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

    }

    const LegionelaCI = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData19(resp.filter(analisis => analisis.analisis === 19 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

    }

    const LegionelaDeposito = async () => {
        const resp = await getParametrosAnalisisPlanta();
        setData20(resp.filter(analisis => analisis.analisis === 20 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
    }

    const MantenimientoMaqFrio = async () => {
        const resp = await getParametrosAnalisisPlanta();
        setData21(resp.filter(analisis => analisis.analisis === 21 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
    }

    const ControlFugas = async () => {
        const resp = await getParametrosAnalisisPlanta();
        setData22(resp.filter(analisis => analisis.analisis === 22 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
    }

    const LimpiezaBandejas = async () => {
        const resp = await getParametrosAnalisisPlanta();
        setData23(resp.filter(analisis => analisis.analisis === 23 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
    }

    const LimpiezaRelleno = async () => {
        const resp = await getParametrosAnalisisPlanta();
        setData24(resp.filter(analisis => analisis.analisis === 24 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
    }

    const LimpiezaSeparador = async () => {
        const resp = await getParametrosAnalisisPlanta();
        setData25(resp.filter(analisis => analisis.analisis === 25 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
    }

    const LimpiezaVentana = async () => {
        const resp = await getParametrosAnalisisPlanta();
        setData26(resp.filter(analisis => analisis.analisis === 26 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
    }

    const RevisionOsmosis = async () => {
        const resp = await getParametrosAnalisisPlanta();
        setData27(resp.filter(analisis => analisis.analisis === 27 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
    }

    const RevisionDescalcificador = async () => {
        const resp = await getParametrosAnalisisPlanta();
        setData28(resp.filter(analisis => analisis.analisis === 28 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
    }

    const RevisionFiltros = async () => {
        const resp = await getParametrosAnalisisPlanta();
        setData29(resp.filter(analisis => analisis.analisis === 29 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
    }

    const RevisionClorador = async () => {
        const resp = await getParametrosAnalisisPlanta();
        setData30(resp.filter(analisis => analisis.analisis === 30 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
    }

    const RevisionBomba = async () => {
        const resp = await getParametrosAnalisisPlanta();
        setData31(resp.filter(analisis => analisis.analisis === 31 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
    }

    const RevisionTelecontrol = async () => {
        const resp = await getParametrosAnalisisPlanta();
        setData32(resp.filter(analisis => analisis.analisis === 32 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
    }

    const RevisionFluorescencia = async () => {
        const resp = await getParametrosAnalisisPlanta();
        setData33(resp.filter(analisis => analisis.analisis === 33 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
    }

    const HierroMultiple = async () => {
        const resp = await getParametrosAnalisisPlanta();
        setData34(resp.filter(analisis => analisis.analisis === 34 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
    }

    const AerobiosMultiple = async () => {
        const resp = await getParametrosAnalisisPlanta();
        setData35(resp.filter(analisis => analisis.analisis === 35 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
    }

    const LegionelaMultiple = async () => {
        const resp = await getParametrosAnalisisPlanta();
        setData36(resp.filter(analisis => analisis.analisis === 36 && analisis.oferta === analisisSeleccionado.oferta && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
    }

    const descargarPdf = async () => {

        const resp = await getAnalisisId(analisisSeleccionado.analisis)

        const fecha = new Date(analisisSeleccionado.fecha); // Convertir la cadena a un objeto de fecha

        // Obtener año y mes de la fecha
        const año = fecha.getFullYear();
        const mes = fecha.getMonth() + 1; // Los meses van de 0 a 11, por lo que se suma 1

        // Formatear el mes para asegurarse de que siempre tenga dos dígitos (por ejemplo, '08' en lugar de '8')
        const mesFormateado = mes < 10 ? `0${mes}` : mes;

        // Crear la cadena de fecha en formato 'YYYY-MM'
        const fechaFormateada = `${año}-${mesFormateado}`;

        if (elementoTareaEditar[0].descripcion !== null) {
            const response = await bajarPdf(analisisSeleccionado.pdf, analisisSeleccionado.codigoCliente, (elementoTareaEditar[0].nombre + '' + elementoTareaEditar[0].descripcion), resp.nombre, fechaFormateada, { headers: { 'Content-type': 'application/pdf' } });
        } else {
            const response = await bajarPdf(analisisSeleccionado.pdf, analisisSeleccionado.codigoCliente, (elementoTareaEditar[0].nombre + '' + elementoTareaEditar[0].numero), resp.nombre, fechaFormateada, { headers: { 'Content-type': 'application/pdf' } });
        }

    }

    const descargarPdfNoFQ = async () => {

        const resp = await getAnalisisId(analisisSeleccionado.analisis)

        const fecha = new Date(analisisSeleccionado.fecha); // Convertir la cadena a un objeto de fecha

        // Obtener año y mes de la fecha
        const año = fecha.getFullYear();
        const mes = fecha.getMonth() + 1; // Los meses van de 0 a 11, por lo que se suma 1

        // Formatear el mes para asegurarse de que siempre tenga dos dígitos (por ejemplo, '08' en lugar de '8')
        const mesFormateado = mes < 10 ? `0${mes}` : mes;

        // Crear la cadena de fecha en formato 'YYYY-MM'
        const fechaFormateada = `${año}-${mesFormateado}`;

        if (elementoTareaEditar[0].descripcion !== null) {
            const response = await bajarPdfNoFQ(analisisSeleccionado.pdf, analisisSeleccionado.codigoCliente, (elementoTareaEditar[0].nombre + '' + elementoTareaEditar[0].descripcion), resp.nombre, fechaFormateada, { headers: { 'Content-type': 'application/pdf' } });
        } else {
            const response = await bajarPdfNoFQ(analisisSeleccionado.pdf, analisisSeleccionado.codigoCliente, (elementoTareaEditar[0].nombre + '' + elementoTareaEditar[0].numero), resp.nombre, fechaFormateada, { headers: { 'Content-type': 'application/pdf' } });
        }


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
        setData19(data.filter(analisis => analisis.analisis === 19))
        setData20(data.filter(analisis => analisis.analisis === 20))
        setData21(data.filter(analisis => analisis.analisis === 21))
        setData22(data.filter(analisis => analisis.analisis === 22))
        setData23(data.filter(analisis => analisis.analisis === 23))
        setData24(data.filter(analisis => analisis.analisis === 24))
        setData25(data.filter(analisis => analisis.analisis === 25))
        setData26(data.filter(analisis => analisis.analisis === 26))
        setData27(data.filter(analisis => analisis.analisis === 27))
        setData28(data.filter(analisis => analisis.analisis === 28))
        setData29(data.filter(analisis => analisis.analisis === 29))
        setData30(data.filter(analisis => analisis.analisis === 30))
        setData31(data.filter(analisis => analisis.analisis === 31))
        setData32(data.filter(analisis => analisis.analisis === 32))
        setData33(data.filter(analisis => analisis.analisis === 33))
        setData34(data.filter(analisis => analisis.analisis === 34))
        setData35(data.filter(analisis => analisis.analisis === 35))
        setData36(data.filter(analisis => analisis.analisis === 36))
    }

    useEffect(() => {
        FisicoQuimicoTorre();
        FisicoQuimicoAlimentacion();
        FisicoQuimicoCondensados();
        FisicoQuimicoOsmosis();
        FisicoQuimicoRechazo();
        FisicoQuimicoProduccion();
        FisicoQuimicoCaldera();
        FisicoQuimicoDescalcificador();
        AerobiosTorre();
        AerobiosACH();
        AguasResiduales();
        Desinfeccion();
        DesinfeccionACH();
        DesinfeccionCI();
        Mediciones();
        AguaPotable();
        LegionelaTorre();
        LegionelaACH();
        LegionelaCI();
        LegionelaDeposito();
        MantenimientoMaqFrio();
        ControlFugas();
        LimpiezaBandejas();
        LimpiezaRelleno();
        LimpiezaSeparador();
        LimpiezaVentana();
        RevisionOsmosis();
        RevisionDescalcificador();
        RevisionFiltros();
        RevisionClorador();
        RevisionBomba();
        RevisionTelecontrol();
        RevisionFluorescencia();
        HierroMultiple();
        AerobiosMultiple();
        LegionelaMultiple();
        getUsuarios();
        GetParametrosAnalisisPlanta();
        FiltrarData();
        GetOferta();
        GetCliente();
        GetAnalisi();
        GetElemento();
        GetConfNivelPlantaCliente();
        GetAnalisisNivelPlantaCliente();
        GetFichero();
        peticionGetEntregas();
    }, [])

    const peticionPost = async () => {

        if (analisisSeleccionado.fecha != null) {
            setErrorFecha(false)
        } else {
            setErrorFecha(true)
        }

        if (analisisSeleccionado.fecha != null) {
            analisisSeleccionado.id = 0;

            const resp = await postParametrosAnalisisPlanta(analisisSeleccionado);

            AguasResiduales();
            Desinfeccion();
            DesinfeccionACH();
            DesinfeccionCI();
            Mediciones();
            AguaPotable();
            MantenimientoMaqFrio();
            ControlFugas();
            LimpiezaBandejas();
            LimpiezaRelleno();
            LimpiezaSeparador();
            LimpiezaVentana();
            RevisionOsmosis();
            RevisionDescalcificador();
            RevisionFiltros();
            RevisionClorador();
            RevisionBomba();
            RevisionTelecontrol();
            RevisionFluorescencia();
            HierroMultiple();
            abrirCerrarModalInsertar();
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
                recogido: false,
                fechaRecogido: null,
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
            });

            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Tarea Creada',
                text: `La tarea se ha creado correctamente`,
                showConfirmButton: false,
                timer: 3000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
        }
    }

    const peticionPost1 = async () => {

        if (analisisSeleccionado.fecha != null) {
            setErrorFecha(false)
        } else {
            setErrorFecha(true)
        }

        if (analisisSeleccionado.fecha != null) {
            analisisSeleccionado.id = 0;

            const resp = await postParametrosAnalisisPlanta(analisisSeleccionado);

            FisicoQuimicoTorre();
            FisicoQuimicoAlimentacion();
            FisicoQuimicoCondensados();
            FisicoQuimicoOsmosis();
            FisicoQuimicoRechazo();
            FisicoQuimicoProduccion();
            FisicoQuimicoCaldera();
            FisicoQuimicoDescalcificador();
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
                recogido: false,
                fechaRecogido: null,
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
            });


            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Tarea Creada',
                text: `La tarea se ha creado correctamente`,
                showConfirmButton: false,
                timer: 3000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
        }
    }

    const peticionPostAerobio = async () => {

        if (analisisSeleccionado.fecha != null) {
            setErrorFecha(false)
        } else {
            setErrorFecha(true)
        }

        if (analisisSeleccionado.fecha != null) {
            analisisSeleccionado.id = 0;

            const resp = await postParametrosAnalisisPlanta(analisisSeleccionado);

            abrirCerrarModalInsertarAerobio();
            GetParametrosAnalisisPlanta();
            AerobiosTorre();
            AerobiosACH();
            AerobiosMultiple();
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
                recogido: false,
                fechaRecogido: null,
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
            });

            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Tarea Creada',
                text: `La tarea se ha creado correctamente`,
                showConfirmButton: false,
                timer: 3000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
        }
    }

    const peticionPostLegionela = async () => {

        if (analisisSeleccionado.fecha != null) {
            setErrorFecha(false)
        } else {
            setErrorFecha(true)
        }

        if (analisisSeleccionado.fecha != null) {
            analisisSeleccionado.id = 0;

            const resp = await postParametrosAnalisisPlanta(analisisSeleccionado);

            LegionelaTorre();
            LegionelaACH();
            LegionelaCI();
            LegionelaDeposito();
            LegionelaMultiple();
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
                recogido: false,
                fechaRecogido: null,
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
            });

            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Tarea Creada',
                text: `La tarea se ha creado correctamente`,
                showConfirmButton: false,
                timer: 3000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
        }
    }

    const peticionPut = async () => {

        if (analisisSeleccionado.fecha != "") {
            setErrorFecha(false)
        } else {
            setErrorFecha(true)
        }

        if (analisisSeleccionado.fecha != "") {
            if (fileChange != null) {
                const resp = await subirPdf(analisisSeleccionado.id, fileChange)
                if (resp) {
                    analisisSeleccionado.pdf = resp.data
                }
            }

            await putParametrosAnalisisPlantaPorId(analisisSeleccionado);

            var analisisModificado = data;
            analisisModificado.map(analisi => {
                if (analisi.id === analisisSeleccionado.id) {
                    analisi = analisisSeleccionado
                }
            });

            abrirCerrarModalEditar();
            GetParametrosAnalisisPlanta();
            AguasResiduales();
            Desinfeccion();
            DesinfeccionACH();
            DesinfeccionCI();
            Mediciones();
            AguaPotable();
            MantenimientoMaqFrio();
            ControlFugas();
            LimpiezaBandejas();
            LimpiezaRelleno();
            LimpiezaSeparador();
            LimpiezaVentana();
            RevisionOsmosis();
            RevisionDescalcificador();
            RevisionFiltros();
            RevisionClorador();
            RevisionBomba();
            RevisionTelecontrol();
            RevisionFluorescencia();
            HierroMultiple();
            GetFichero();
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
                recogido: false,
                fechaRecogido: null,
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
            });

            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Tarea Editada',
                text: `La tarea se ha editado correctamente`,
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

    const peticionPut1 = async () => {

        if (analisisSeleccionado.fecha != "") {
            setErrorFecha(false)
        } else {
            setErrorFecha(true)
        }

        if (analisisSeleccionado.fecha != "") {
            const resp = await putParametrosAnalisisPlantaPorId(analisisSeleccionado);

            var analisisModificado = data;
            analisisModificado.map(analisi => {
                if (analisi.id === analisisSeleccionado.id) {
                    analisi = analisisSeleccionado
                }
            });
            FisicoQuimicoTorre();
            FisicoQuimicoAlimentacion();
            FisicoQuimicoCondensados();
            FisicoQuimicoOsmosis();
            FisicoQuimicoRechazo();
            FisicoQuimicoProduccion();
            FisicoQuimicoCaldera();
            FisicoQuimicoDescalcificador();
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
                recogido: false,
                fechaRecogido: null,
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
            });

            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Tarea Editada',
                text: `La tarea se ha editado correctamente`,
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

    const peticionPutAerobio = async () => {

        if (analisisSeleccionado.fecha != "") {
            setErrorFecha(false)
        } else {
            setErrorFecha(true)
        }

        if (analisisSeleccionado.fecha != "") {
            if (fileChange != null) {
                const resp = await subirPdf(analisisSeleccionado.id, fileChange)
                if (resp) {
                    analisisSeleccionado.pdf = resp.data
                }


            }

            await putParametrosAnalisisPlantaPorId(analisisSeleccionado);

            var analisisModificado = data;
            analisisModificado.map(analisi => {
                if (analisi.id === analisisSeleccionado.id) {
                    analisi = analisisSeleccionado
                }
            });

            abrirCerrarModalEditarAerobio();
            GetParametrosAnalisisPlanta();
            AerobiosTorre();
            AerobiosACH();
            AerobiosMultiple();
            GetFichero();
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
                recogido: false,
                fechaRecogido: null,
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
            });

            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Tarea Editada',
                text: `La tarea se ha editado correctamente`,
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

    const peticionPutLegionela = async () => {

        if (analisisSeleccionado.fecha != "") {
            setErrorFecha(false)
        } else {
            setErrorFecha(true)
        }

        if (analisisSeleccionado.fecha != "") {
            if (fileChange != null) {
                const resp = await subirPdf(analisisSeleccionado.id, fileChange)
                if (resp) {
                    analisisSeleccionado.pdf = resp.data
                }


            }

            await putParametrosAnalisisPlantaPorId(analisisSeleccionado);

            var analisisModificado = data;
            analisisModificado.map(analisi => {
                if (analisi.id === analisisSeleccionado.id) {
                    analisi = analisisSeleccionado
                }
            });

            abrirCerrarModalEditarLegionela();
            GetParametrosAnalisisPlanta();
            LegionelaTorre();
            LegionelaACH();
            LegionelaCI();
            LegionelaDeposito();
            LegionelaMultiple();
            GetFichero();
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
                recogido: false,
                fechaRecogido: null,
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
            });

            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Tarea Editada',
                text: `La tarea se ha editado correctamente`,
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

    const peticionDelete = async () => {

        var i = 0;

        while (i < analisisEliminar.length) {

            const resp = await deleteParametrosAnalisisPlanta(analisisEliminar[i]);

            FisicoQuimicoTorre();
            FisicoQuimicoAlimentacion();
            FisicoQuimicoCondensados();
            FisicoQuimicoOsmosis();
            FisicoQuimicoRechazo();
            FisicoQuimicoProduccion();
            FisicoQuimicoCaldera();
            FisicoQuimicoDescalcificador();
            AerobiosTorre();
            AerobiosACH();
            AguasResiduales();
            Desinfeccion();
            DesinfeccionACH();
            DesinfeccionCI();
            Mediciones();
            AguaPotable();
            LegionelaTorre();
            LegionelaACH();
            LegionelaCI();
            LegionelaDeposito();
            MantenimientoMaqFrio();
            ControlFugas();
            LimpiezaBandejas();
            LimpiezaRelleno();
            LimpiezaSeparador();
            LimpiezaVentana();
            RevisionOsmosis();
            RevisionDescalcificador();
            RevisionFiltros();
            RevisionClorador();
            RevisionBomba();
            RevisionTelecontrol();
            RevisionFluorescencia();
            HierroMultiple();
            AerobiosMultiple();
            LegionelaMultiple();
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
                recogido: false,
                fechaRecogido: null,
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
            });

            i++;

        }

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Tarea Eliminada',
            text: `La tarea se ha eliminado correctamente`,
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
            setData19(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 19 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData20(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 20 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData21(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 21 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData22(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 22 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData23(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 23 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData24(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 24 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData25(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 25 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData26(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 26 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData27(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 27 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData28(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 28 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData29(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 29 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData30(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 30 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData31(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 31 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData32(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 32 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData33(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 33 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData34(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 34 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData35(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 35 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData36(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === 36 && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))

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
            setData19(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 19 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData20(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 20 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData21(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 21 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData22(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 22 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData23(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 23 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData24(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 24 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData25(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 25 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData26(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 26 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData27(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 27 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData28(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 28 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData29(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 29 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData30(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 30 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData31(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 31 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData32(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 32 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData33(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 33 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData34(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 34 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData35(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 35 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData36(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === 36 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))

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
            setData19(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 19 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData20(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 20 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData21(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 21 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData22(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 22 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData23(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 23 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData24(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 24 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData25(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 25 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData26(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 26 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData27(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 27 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData28(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 28 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData29(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 29 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData30(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 30 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData31(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 31 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData32(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 32 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData33(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 33 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData34(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 34 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData35(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 35 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData36(data.filter(analisis => analisis.elemento === value.id && analisis.analisis === 36 && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))

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

    const handleSelectRow19 = (ids) => {
        if (ids.length > 0) {
            setAnalisisSeleccionado(data19.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }
        setRowsIds19(ids);
    }

    const handleSelectRow20 = (ids) => {
        if (ids.length > 0) {
            setAnalisisSeleccionado(data20.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }
        setRowsIds20(ids);
    }

    const handleSelectRow21 = (ids) => {
        if (ids.length > 0) {
            setAnalisisSeleccionado(data21.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }
        setRowsIds21(ids);
    }

    const handleSelectRow22 = (ids) => {
        if (ids.length > 0) {
            setAnalisisSeleccionado(data22.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }
        setRowsIds22(ids);
    }

    const handleSelectRow23 = (ids) => {
        if (ids.length > 0) {
            setAnalisisSeleccionado(data23.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }
        setRowsIds23(ids);
    }

    const handleSelectRow24 = (ids) => {
        if (ids.length > 0) {
            setAnalisisSeleccionado(data24.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }
        setRowsIds24(ids);
    }

    const handleSelectRow25 = (ids) => {
        if (ids.length > 0) {
            setAnalisisSeleccionado(data25.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }
        setRowsIds25(ids);
    }

    const handleSelectRow26 = (ids) => {
        if (ids.length > 0) {
            setAnalisisSeleccionado(data26.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }
        setRowsIds26(ids);
    }

    const handleSelectRow27 = (ids) => {
        if (ids.length > 0) {
            setAnalisisSeleccionado(data27.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }
        setRowsIds27(ids);
    }

    const handleSelectRow28 = (ids) => {
        if (ids.length > 0) {
            setAnalisisSeleccionado(data28.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }
        setRowsIds28(ids);
    }

    const handleSelectRow29 = (ids) => {
        if (ids.length > 0) {
            setAnalisisSeleccionado(data29.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }
        setRowsIds29(ids);
    }

    const handleSelectRow30 = (ids) => {
        if (ids.length > 0) {
            setAnalisisSeleccionado(data30.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }
        setRowsIds30(ids);
    }

    const handleSelectRow31 = (ids) => {
        if (ids.length > 0) {
            setAnalisisSeleccionado(data31.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }
        setRowsIds31(ids);
    }

    const handleSelectRow32 = (ids) => {
        if (ids.length > 0) {
            setAnalisisSeleccionado(data32.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }
        setRowsIds32(ids);
    }

    const handleSelectRow33 = (ids) => {
        if (ids.length > 0) {
            setAnalisisSeleccionado(data33.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }
        setRowsIds33(ids);
    }

    const handleSelectRow34 = (ids) => {
        if (ids.length > 0) {
            setAnalisisSeleccionado(data34.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }
        setRowsIds34(ids);
    }

    const handleSelectRow35 = (ids) => {
        if (ids.length > 0) {
            setAnalisisSeleccionado(data35.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }
        setRowsIds35(ids);
    }

    const handleSelectRow36 = (ids) => {
        if (ids.length > 0) {
            setAnalisisSeleccionado(data36.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }
        setRowsIds36(ids);
    }

    const handleSnackClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        setSnackData({ open: false, msg: '', severity: 'info' });

    };

    return (
        <>
            {usuarioActual.idPerfil === 1 ?
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
                            <TextField
                                id='nombreCliente'
                                label="Nombre Cliente"
                                sx={{ width: 250 }}
                                style={{ marginTop: '15px' }}
                                value={analisisSeleccionado && analisisSeleccionado.nombreCliente}
                                name="nombreCliente"
                                onChange={(event, value) => setAnalisisSeleccionado(prevState => ({
                                    ...prevState,
                                    nombreCliente: value.razonSocial
                                }))}
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
                            <TextField
                                id='pedido'
                                sx={{ width: 250 }}
                                label="Pedido"
                                style={{ marginTop: '15px' }}
                                value={analisisSeleccionado && analisisSeleccionado.pedido}
                                name="pedido"
                                onChange={(event, value) => setAnalisisSeleccionado(prevState => ({
                                    ...prevState,
                                    pedido: value.pedido
                                }))}
                            />
                            <Autocomplete
                                disableClearable={true}
                                id="Elemento"
                                options={elementosAutocomplete}
                                inputValue={analisisSeleccionado.nombreElemento}
                                getOptionLabel={option => option.descripcion !== null ? (option.nombre + ' ' + option.descripcion) : (option.nombre + ' ' + option.numero)}
                                sx={{ width: 250 }}
                                renderInput={(params) => <TextField {...params} label="Elemento" name="elemento" />}
                                onChange={(event, value) => onChangeElemento(event, value, "elemento")}
                            />
                        </div>
                        <br />
                        <div className='home-container-elements'>
                            <div className="visualizacion">
                                <div className="visualizacion-tablas">
                                    {dataTablas.sort((a, b) => a.id - b.id).map((analisi, index) => {
                                        switch (analisi.id) {
                                            case 1:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Físico-Químico Torre'
                                                            rowsIds={rowsIds1}
                                                            rows={rows1}
                                                            columnas={columnas1}
                                                            handleSelectRow={handleSelectRow1}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar1}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar1}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal1
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost1();
                                                                })
                                                            ]}
                                                            open={modalInsertar1}
                                                            onClose={abrirCerrarModalInsertar1}
                                                        />

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
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut1()
                                                                }),
                                                            ]}
                                                            open={modalEditar1}
                                                            onClose={abrirCerrarModalEditar1}
                                                        />

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
                                                        <AnalisisTable
                                                            title='Físico-Químico Alimentación'
                                                            rowsIds={rowsIds2}
                                                            rows={rows2}
                                                            columnas={columnas1}
                                                            handleSelectRow={handleSelectRow2}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar1}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar1}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        {/* Agregar tarea */}
                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal1
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost1();
                                                                })
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
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut1()
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
                                                        <AnalisisTable
                                                            title='Físico-Químico Condensados'
                                                            rowsIds={rowsIds3}
                                                            rows={rows3}
                                                            columnas={columnas1}
                                                            handleSelectRow={handleSelectRow3}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar1}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar1}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        {/* LISTA DE MODALS */}

                                                        {/* Agregar tarea */}
                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal1
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost1();
                                                                })
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
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut1()
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
                                                        <AnalisisTable
                                                            title='Físico-Químico Osmosis'
                                                            rowsIds={rowsIds4}
                                                            rows={rows4}
                                                            columnas={columnas1}
                                                            handleSelectRow={handleSelectRow4}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar1}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar1}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal1
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost1();
                                                                })
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
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut1()
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
                                                        <AnalisisTable
                                                            title='Físico-Químico Rechazo'
                                                            rowsIds={rowsIds5}
                                                            rows={rows5}
                                                            columnas={columnas1}
                                                            handleSelectRow={handleSelectRow5}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar1}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar1}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal1
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost1();
                                                                })
                                                            ]}
                                                            open={modalInsertar1}
                                                            onClose={abrirCerrarModalInsertar1}
                                                        />

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
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut1()
                                                                })
                                                            ]}
                                                            open={modalEditar1}
                                                            onClose={abrirCerrarModalEditar1}
                                                        />

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
                                                        <AnalisisTable
                                                            title='Físico-Químico Producción'
                                                            rowsIds={rowsIds6}
                                                            rows={rows6}
                                                            columnas={columnas1}
                                                            handleSelectRow={handleSelectRow6}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar1}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar1}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal1
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost1();
                                                                })
                                                            ]}
                                                            open={modalInsertar1}
                                                            onClose={abrirCerrarModalInsertar1}
                                                        />

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
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut1()
                                                                })
                                                            ]}
                                                            open={modalEditar1}
                                                            onClose={abrirCerrarModalEditar1}
                                                        />

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
                                                        <AnalisisTable
                                                            title='Físico-Químico Caldera'
                                                            rowsIds={rowsIds7}
                                                            rows={rows7}
                                                            columnas={columnas1}
                                                            handleSelectRow={handleSelectRow7}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar1}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar1}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal1
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost1();
                                                                })
                                                            ]}
                                                            open={modalInsertar1}
                                                            onClose={abrirCerrarModalInsertar1}
                                                        />

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
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut1()
                                                                })
                                                            ]}
                                                            open={modalEditar1}
                                                            onClose={abrirCerrarModalEditar1}
                                                        />

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
                                                        <AnalisisTable
                                                            title='Físico-Químico Descalcificador'
                                                            rowsIds={rowsIds8}
                                                            rows={rows8}
                                                            columnas={columnas1}
                                                            handleSelectRow={handleSelectRow8}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar1}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar1}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal1
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost1();
                                                                })
                                                            ]}
                                                            open={modalInsertar1}
                                                            onClose={abrirCerrarModalInsertar1}
                                                        />

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
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut1()
                                                                })
                                                            ]}
                                                            open={modalEditar1}
                                                            onClose={abrirCerrarModalEditar1}
                                                        />

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
                                                        <AnalisisTable
                                                            title='Aerobios Torre'
                                                            rowsIds={rowsIds9}
                                                            rows={rows9}
                                                            columnas={columnasAerobios}
                                                            handleSelectRow={handleSelectRow9}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditarAerobio}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertarAerobio}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModalAerobio
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPostAerobio();
                                                                })
                                                            ]}
                                                            open={modalInsertarAerobio}
                                                            onClose={abrirCerrarModalInsertarAerobio}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPutAerobio()
                                                                })
                                                            ]}
                                                            open={modalEditarAerobio}
                                                            onClose={abrirCerrarModalEditarAerobio}
                                                        />

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
                                                        <AnalisisTable
                                                            title='Aerobios ACH'
                                                            rowsIds={rowsIds10}
                                                            rows={rows10}
                                                            columnas={columnasAerobios}
                                                            handleSelectRow={handleSelectRow10}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditarAerobio}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertarAerobio}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModalAerobio
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPostAerobio();
                                                                })
                                                            ]}
                                                            open={modalInsertarAerobio}
                                                            onClose={abrirCerrarModalInsertarAerobio}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPutAerobio()
                                                                })
                                                            ]}
                                                            open={modalEditarAerobio}
                                                            onClose={abrirCerrarModalEditarAerobio}
                                                        />

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
                                                        <AnalisisTable
                                                            title='Aguas Residuales'
                                                            rowsIds={rowsIds11}
                                                            rows={rows11}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow11}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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
                                                        <AnalisisTable
                                                            title='Desinfección'
                                                            rowsIds={rowsIds12}
                                                            rows={rows12}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow12}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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

                                                        <AnalisisTable
                                                            title='Desinfección ACH'
                                                            rowsIds={rowsIds13}
                                                            rows={rows13}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow13}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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
                                                        <AnalisisTable
                                                            title='Desinfección CI'
                                                            rowsIds={rowsIds14}
                                                            rows={rows14}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow14}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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
                                                        <AnalisisTable
                                                            title='Mediciones'
                                                            rowsIds={rowsIds15}
                                                            rows={rows15}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow15}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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
                                                        <AnalisisTable
                                                            title='Agua Potable / Consumo Humano'
                                                            rowsIds={rowsIds16}
                                                            rows={rows16}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow16}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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
                                                        <AnalisisTable
                                                            title='Legionela Torre'
                                                            rowsIds={rowsIds17}
                                                            rows={rows17}
                                                            columnas={columnasLegionela}
                                                            handleSelectRow={handleSelectRow17}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditarLegionela}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertarLegionela}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModalLegionela
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPostLegionela();
                                                                })
                                                            ]}
                                                            open={modalInsertarLegionela}
                                                            onClose={abrirCerrarModalInsertarLegionela}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPutLegionela();
                                                                })
                                                            ]}
                                                            open={modalEditarLegionela}
                                                            onClose={abrirCerrarModalEditarLegionela}
                                                        />

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
                                                        <AnalisisTable
                                                            title='Legionela ACH'
                                                            rowsIds={rowsIds18}
                                                            rows={rows18}
                                                            columnas={columnasLegionela}
                                                            handleSelectRow={handleSelectRow18}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditarLegionela}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertarLegionela}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModalLegionela
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPostLegionela();
                                                                })
                                                            ]}
                                                            open={modalInsertarLegionela}
                                                            onClose={abrirCerrarModalInsertarLegionela}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPutLegionela()
                                                                })
                                                            ]}
                                                            open={modalEditarLegionela}
                                                            onClose={abrirCerrarModalEditarLegionela}
                                                        />

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
                                            case 19:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Legionela CI'
                                                            rowsIds={rowsIds19}
                                                            rows={rows19}
                                                            columnas={columnasLegionela}
                                                            handleSelectRow={handleSelectRow19}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditarLegionela}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertarLegionela}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModalLegionela
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPostLegionela();
                                                                })
                                                            ]}
                                                            open={modalInsertarLegionela}
                                                            onClose={abrirCerrarModalInsertarLegionela}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPutLegionela()
                                                                })
                                                            ]}
                                                            open={modalEditarLegionela}
                                                            onClose={abrirCerrarModalEditarLegionela}
                                                        />

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
                                            case 20:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Legionela Deposito Aporte'
                                                            rowsIds={rowsIds20}
                                                            rows={rows20}
                                                            columnas={columnasLegionela}
                                                            handleSelectRow={handleSelectRow20}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditarLegionela}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertarLegionela}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModalLegionela
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPutLegionela()
                                                                })
                                                            ]}
                                                            open={modalEditarLegionela}
                                                            onClose={abrirCerrarModalEditarLegionela}
                                                        />

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
                                            case 21:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Mantenimiento Máquina Frio'
                                                            rowsIds={rowsIds21}
                                                            rows={rows21}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow21}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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
                                            case 22:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Control Fugas y Quinquenales'
                                                            rowsIds={rowsIds22}
                                                            rows={rows22}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow22}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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
                                            case 23:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Limpieza de bandejas'
                                                            rowsIds={rowsIds23}
                                                            rows={rows23}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow23}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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
                                            case 24:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Limpieza relleno'
                                                            rowsIds={rowsIds24}
                                                            rows={rows24}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow24}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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
                                            case 25:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Limpieza separador de gotas'
                                                            rowsIds={rowsIds25}
                                                            rows={rows25}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow25}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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
                                            case 26:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Limpieza de ventanas'
                                                            rowsIds={rowsIds26}
                                                            rows={rows26}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow26}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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
                                            case 27:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Revisión Osmosis'
                                                            rowsIds={rowsIds27}
                                                            rows={rows27}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow27}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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
                                            case 28:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Revisión descalcificador'
                                                            rowsIds={rowsIds28}
                                                            rows={rows28}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow28}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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
                                            case 29:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Revisión filtros'
                                                            rowsIds={rowsIds29}
                                                            rows={rows29}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow29}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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
                                            case 30:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Revisión clorador'
                                                            rowsIds={rowsIds30}
                                                            rows={rows30}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow30}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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
                                            case 31:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Revisión bomba'
                                                            rowsIds={rowsIds31}
                                                            rows={rows31}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow31}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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
                                            case 32:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Revisión telecontrol'
                                                            rowsIds={rowsIds32}
                                                            rows={rows32}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow32}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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
                                            case 33:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Revisión fluorescencia'
                                                            rowsIds={rowsIds33}
                                                            rows={rows33}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow33}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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
                                            case 34:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Hierro Múltiple'
                                                            rowsIds={rowsIds34}
                                                            rows={rows34}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow34}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModal
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPost();
                                                                })
                                                            ]}
                                                            open={modalInsertar}
                                                            onClose={abrirCerrarModalInsertar}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />

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
                                            case 35:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Aerobios Múltiple'
                                                            rowsIds={rowsIds35}
                                                            rows={rows35}
                                                            columnas={columnasAerobios}
                                                            handleSelectRow={handleSelectRow35}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditarAerobio}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertarAerobio}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModalAerobio
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPostAerobio();
                                                                })
                                                            ]}
                                                            open={modalInsertarAerobio}
                                                            onClose={abrirCerrarModalInsertarAerobio}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPutAerobio()
                                                                })
                                                            ]}
                                                            open={modalEditarAerobio}
                                                            onClose={abrirCerrarModalEditarAerobio}
                                                        />

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
                                            case 36:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Legionela Múltiple'
                                                            rowsIds={rowsIds36}
                                                            rows={rows36}
                                                            columnas={columnasLegionela}
                                                            handleSelectRow={handleSelectRow36}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditarLegionela}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertarLegionela}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout
                                                            titulo="Agregar nueva Tarea"
                                                            contenido={
                                                                <InsertarVisModalLegionela
                                                                    change={handleChangeInput}
                                                                    analisisSeleccionado={analisisSeleccionado}
                                                                    analisisid={analisi.id}
                                                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                                    analisis={analisis}
                                                                    errorFecha={errorFecha}
                                                                />
                                                            }
                                                            botones={[
                                                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                                                    peticionPostLegionela();
                                                                })
                                                            ]}
                                                            open={modalInsertarLegionela}
                                                            onClose={abrirCerrarModalInsertarLegionela}
                                                        />

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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPutLegionela()
                                                                })
                                                            ]}
                                                            open={modalEditarLegionela}
                                                            onClose={abrirCerrarModalEditarLegionela}
                                                        />

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
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </MainLayout>
                :
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
                            <TextField
                                id='nombreCliente'
                                label="Nombre Cliente"
                                sx={{ width: 250 }}
                                style={{ marginTop: '15px' }}
                                value={analisisSeleccionado && analisisSeleccionado.nombreCliente}
                                name="nombreCliente"
                                onChange={(event, value) => setAnalisisSeleccionado(prevState => ({
                                    ...prevState,
                                    nombreCliente: value.razonSocial
                                }))}
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
                            <TextField
                                id='pedido'
                                sx={{ width: 250 }}
                                label="Pedido"
                                style={{ marginTop: '15px' }}
                                value={analisisSeleccionado && analisisSeleccionado.pedido}
                                name="pedido"
                                onChange={(event, value) => setAnalisisSeleccionado(prevState => ({
                                    ...prevState,
                                    pedido: value.pedido
                                }))}
                            />
                            <Autocomplete
                                disableClearable={true}
                                id="Elemento"
                                options={elementosAutocomplete}
                                inputValue={analisisSeleccionado.nombreElemento}
                                getOptionLabel={option => option.descripcion !== null ? (option.nombre + ' ' + option.descripcion) : (option.nombre + ' ' + option.numero)}
                                sx={{ width: 250 }}
                                renderInput={(params) => <TextField {...params} label="Elemento" name="elemento" />}
                                onChange={(event, value) => onChangeElemento(event, value, "elemento")}
                            />
                        </div>
                        <br />
                        <div className='home-container-elements'>
                            <div className="visualizacion">
                                <div className="visualizacion-tablas">
                                    {dataTablas.sort((a, b) => a.id - b.id).map((analisi, index) => {
                                        switch (analisi.id) {
                                            case 1:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Físico-Químico Torre'
                                                            rowsIds={rowsIds1}
                                                            rows={rows1}
                                                            columnas={columnas1}
                                                            handleSelectRow={handleSelectRow1}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar1}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar1}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut1()
                                                                }),
                                                            ]}
                                                            open={modalEditar1}
                                                            onClose={abrirCerrarModalEditar1}
                                                        />
                                                    </>
                                                )
                                            case 2:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Físico-Químico Alimentación'
                                                            rowsIds={rowsIds2}
                                                            rows={rows2}
                                                            columnas={columnas1}
                                                            handleSelectRow={handleSelectRow2}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar1}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar1}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut1()
                                                                })
                                                            ]}
                                                            open={modalEditar1}
                                                            onClose={abrirCerrarModalEditar1}
                                                        />
                                                    </>
                                                )
                                            case 3:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Físico-Químico Condensados'
                                                            rowsIds={rowsIds3}
                                                            rows={rows3}
                                                            columnas={columnas1}
                                                            handleSelectRow={handleSelectRow3}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar1}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar1}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut1()
                                                                })
                                                            ]}
                                                            open={modalEditar1}
                                                            onClose={abrirCerrarModalEditar1}
                                                        />
                                                    </>
                                                )
                                            case 4:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Físico-Químico Osmosis'
                                                            rowsIds={rowsIds4}
                                                            rows={rows4}
                                                            columnas={columnas1}
                                                            handleSelectRow={handleSelectRow4}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar1}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar1}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut1()
                                                                })
                                                            ]}
                                                            open={modalEditar1}
                                                            onClose={abrirCerrarModalEditar1}
                                                        />
                                                    </>
                                                )
                                            case 5:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Físico-Químico Rechazo'
                                                            rowsIds={rowsIds5}
                                                            rows={rows5}
                                                            columnas={columnas1}
                                                            handleSelectRow={handleSelectRow5}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar1}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar1}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut1()
                                                                })
                                                            ]}
                                                            open={modalEditar1}
                                                            onClose={abrirCerrarModalEditar1}
                                                        />
                                                    </>
                                                )
                                            case 6:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Físico-Químico Producción'
                                                            rowsIds={rowsIds6}
                                                            rows={rows6}
                                                            columnas={columnas1}
                                                            handleSelectRow={handleSelectRow6}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar1}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar1}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut1()
                                                                })
                                                            ]}
                                                            open={modalEditar1}
                                                            onClose={abrirCerrarModalEditar1}
                                                        />
                                                    </>
                                                )
                                            case 7:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Físico-Químico Caldera'
                                                            rowsIds={rowsIds7}
                                                            rows={rows7}
                                                            columnas={columnas1}
                                                            handleSelectRow={handleSelectRow7}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar1}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar1}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut1()
                                                                })
                                                            ]}
                                                            open={modalEditar1}
                                                            onClose={abrirCerrarModalEditar1}
                                                        />
                                                    </>
                                                )
                                            case 8:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Físico-Químico Descalcificador'
                                                            rowsIds={rowsIds8}
                                                            rows={rows8}
                                                            columnas={columnas1}
                                                            handleSelectRow={handleSelectRow8}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar1}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar1}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut1()
                                                                })
                                                            ]}
                                                            open={modalEditar1}
                                                            onClose={abrirCerrarModalEditar1}
                                                        />
                                                    </>
                                                )
                                            case 9:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Aerobios Torre'
                                                            rowsIds={rowsIds9}
                                                            rows={rows9}
                                                            columnas={columnasAerobios}
                                                            handleSelectRow={handleSelectRow9}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditarAerobio}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertarAerobio}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPutAerobio()
                                                                })
                                                            ]}
                                                            open={modalEditarAerobio}
                                                            onClose={abrirCerrarModalEditarAerobio}
                                                        />
                                                    </>
                                                )
                                            case 10:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Aerobios ACH'
                                                            rowsIds={rowsIds10}
                                                            rows={rows10}
                                                            columnas={columnasAerobios}
                                                            handleSelectRow={handleSelectRow10}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditarAerobio}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertarAerobio}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPutAerobio()
                                                                })
                                                            ]}
                                                            open={modalEditarAerobio}
                                                            onClose={abrirCerrarModalEditarAerobio}
                                                        />
                                                    </>
                                                )
                                            case 11:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Aguas Residuales'
                                                            rowsIds={rowsIds11}
                                                            rows={rows11}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow11}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 12:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Desinfección'
                                                            rowsIds={rowsIds12}
                                                            rows={rows12}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow12}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 13:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Desinfección ACH'
                                                            rowsIds={rowsIds13}
                                                            rows={rows13}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow13}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 14:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Desinfección CI'
                                                            rowsIds={rowsIds14}
                                                            rows={rows14}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow14}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 15:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Mediciones'
                                                            rowsIds={rowsIds15}
                                                            rows={rows15}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow15}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 16:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Agua Potable / Consumo Humano'
                                                            rowsIds={rowsIds16}
                                                            rows={rows16}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow16}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 17:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Legionela Torre'
                                                            rowsIds={rowsIds17}
                                                            rows={rows17}
                                                            columnas={columnasLegionela}
                                                            handleSelectRow={handleSelectRow17}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditarLegionela}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertarLegionela}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPutLegionela();
                                                                })
                                                            ]}
                                                            open={modalEditarLegionela}
                                                            onClose={abrirCerrarModalEditarLegionela}
                                                        />
                                                    </>
                                                )
                                            case 18:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Legionela ACH'
                                                            rowsIds={rowsIds18}
                                                            rows={rows18}
                                                            columnas={columnasLegionela}
                                                            handleSelectRow={handleSelectRow18}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditarLegionela}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertarLegionela}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPutLegionela()
                                                                })
                                                            ]}
                                                            open={modalEditarLegionela}
                                                            onClose={abrirCerrarModalEditarLegionela}
                                                        />
                                                    </>
                                                )
                                            case 19:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Legionela CI'
                                                            rowsIds={rowsIds19}
                                                            rows={rows19}
                                                            columnas={columnasLegionela}
                                                            handleSelectRow={handleSelectRow19}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditarLegionela}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertarLegionela}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPutLegionela()
                                                                })
                                                            ]}
                                                            open={modalEditarLegionela}
                                                            onClose={abrirCerrarModalEditarLegionela}
                                                        />
                                                    </>
                                                )
                                            case 20:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Legionela Deposito Aporte'
                                                            rowsIds={rowsIds20}
                                                            rows={rows20}
                                                            columnas={columnasLegionela}
                                                            handleSelectRow={handleSelectRow20}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditarLegionela}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertarLegionela}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPutLegionela()
                                                                })
                                                            ]}
                                                            open={modalEditarLegionela}
                                                            onClose={abrirCerrarModalEditarLegionela}
                                                        />
                                                    </>
                                                )
                                            case 21:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Mantenimiento Máquina Frio'
                                                            rowsIds={rowsIds21}
                                                            rows={rows21}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow21}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 22:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Control Fugas y Quinquenales'
                                                            rowsIds={rowsIds22}
                                                            rows={rows22}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow22}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 23:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Limpieza de bandejas'
                                                            rowsIds={rowsIds23}
                                                            rows={rows23}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow23}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 24:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Limpieza relleno'
                                                            rowsIds={rowsIds24}
                                                            rows={rows24}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow24}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 25:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Limpieza separador de gotas'
                                                            rowsIds={rowsIds25}
                                                            rows={rows25}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow25}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 26:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Limpieza de ventanas'
                                                            rowsIds={rowsIds26}
                                                            rows={rows26}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow26}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 27:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Revisión Osmosis'
                                                            rowsIds={rowsIds27}
                                                            rows={rows27}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow27}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 28:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Revisión descalcificador'
                                                            rowsIds={rowsIds28}
                                                            rows={rows28}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow28}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 29:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Revisión filtros'
                                                            rowsIds={rowsIds29}
                                                            rows={rows29}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow29}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 30:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Revisión clorador'
                                                            rowsIds={rowsIds30}
                                                            rows={rows30}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow30}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 31:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Revisión bomba'
                                                            rowsIds={rowsIds31}
                                                            rows={rows31}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow31}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 32:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Revisión telecontrol'
                                                            rowsIds={rowsIds32}
                                                            rows={rows32}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow32}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 33:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Revisión fluorescencia'
                                                            rowsIds={rowsIds33}
                                                            rows={rows33}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow33}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 34:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Hierro Múltiple'
                                                            rowsIds={rowsIds34}
                                                            rows={rows34}
                                                            columnas={columnas}
                                                            handleSelectRow={handleSelectRow34}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditar}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertar}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPut()
                                                                })
                                                            ]}
                                                            open={modalEditar}
                                                            onClose={abrirCerrarModalEditar}
                                                        />
                                                    </>
                                                )
                                            case 35:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Aerobios Múltiple'
                                                            rowsIds={rowsIds35}
                                                            rows={rows35}
                                                            columnas={columnasAerobios}
                                                            handleSelectRow={handleSelectRow35}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditarAerobio}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertarAerobio}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPutAerobio()
                                                                })
                                                            ]}
                                                            open={modalEditarAerobio}
                                                            onClose={abrirCerrarModalEditarAerobio}
                                                        />
                                                    </>
                                                )
                                            case 36:
                                                return (
                                                    <>
                                                        <AnalisisTable
                                                            title='Legionela Múltiple'
                                                            rowsIds={rowsIds36}
                                                            rows={rows36}
                                                            columnas={columnasLegionela}
                                                            handleSelectRow={handleSelectRow36}
                                                            setAnalisisEliminar={setAnalisisEliminar}
                                                            setAnalisisEditar={setAnalisisEditar}
                                                            setElementoTareaEditar={setElementoTareaEditar}
                                                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                                                            abrirCerrarModalEditar={abrirCerrarModalEditarLegionela}
                                                            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                                                            abrirCerrarModalInsertar={abrirCerrarModalInsertarLegionela}
                                                            analisis={analisis}
                                                            elementos={elementos}
                                                        />

                                                        <ModalLayout2
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
                                                                    fileChange={fileChange}
                                                                />}
                                                            botones={[
                                                                insertarBotonesModal(<PictureAsPdfIcon />, 'Descargar Pdf', async () => {
                                                                    descargarPdfNoFQ();
                                                                }),
                                                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                                                    peticionPutLegionela()
                                                                })
                                                            ]}
                                                            open={modalEditarLegionela}
                                                            onClose={abrirCerrarModalEditarLegionela}
                                                        />
                                                    </>
                                                )
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </MainLayout>
            }
        </>

    );

}