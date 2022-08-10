import React, { useState, useEffect } from "react";
import MaterialTable from '@material-table/core';
import axios from "axios";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Edit from '@material-ui/icons/Edit';
import { Modal, TextField, Button } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@mui/material/MenuItem';

import './Visualizacion.css';

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

function Visualizacion() {

    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalInsertar1, setModalInsertar1] = useState(false);
    const [modalInsertarOperario, setModalInsertarOperario] = useState(false);
    const [modalInsertarAerobio, setModalInsertarAerobio] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);
    const [modalEditar1, setModalEditar1] = useState(false);
    const [modalEditarOperario, setModalEditarOperario] = useState(false);
    const [modalEditarAerobio, setModalEditarAerobio] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);

    const [analisisNivelesPlantasCliente, setAnalisisNivelesPlantasCliente] = useState([]);

    const [parametrosAnalisisPlanta, setParametrosAnalisisPlanta] = useState([]);

    const [analisisSeleccionado, setAnalisisSeleccionado] = useState({
        id: 0,
        codigoCliente: 0,
        oferta: 0,
        elemento: '',
        periodo: '',
        analisis: '',
        nombreAnalisis: '',
        fecha: null,
        realizado: false,
        operario: '',
        protocolo: '',
        observaciones: '',
        facturado: false,
        numeroFacturado: '',
        resultado: '',
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

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

    const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);

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

    const [analisisEliminar, setAnalisisEliminar] = useState([]);
    const [analisisEditar, setAnalisisEditar] = useState([]);

    const [analisisNombre, setAnalisisNombre] = useState([]);

    const [oferta, setOferta] = useState([]);

    const [clientes, setClientes] = useState([]);

    const [elemento, setElemento] = useState([]);

    const [operarios, setOperarios] = useState([]);

    const [archivos2, setArchivos2] = useState([]);

    const [analisis, setAnalisis] = useState([]);
    const [analisisTable, setAnalisisTable] = useState({});

    const [periodo, setPeriodo] = useState("");
    const [fecha, setFecha] = useState("");

    const [dataCliente, setDataCliente] = useState([])

    const [actualState, changeCheckState] = useState(false);
    const [actualState2, changeActualState] = useState(false);

    const columnas = [
        //visibles
        { title: 'Periodo', field: 'periodo' },
        { title: 'Fecha', field: 'fecha', type: 'date' },
        { title: 'Realizado', field: 'realizado', type: 'boolean' },
        { title: 'Operario', field: 'operario' },
        { title: 'Protocolo', field: 'protocolo' },
        { title: 'Observaciones', field: 'observaciones' },
        { title: 'Facturado', field: 'facturado', type: 'boolean' },
        { title: 'Numero Facturado', field: 'numeroFacturado' }
    ];

    const columnasOperario = [

        //visibles
        { title: 'Periodo', field: 'periodo' },
        { title: 'Fecha', field: 'fecha', type: 'date' },
        { title: 'Realizado', field: 'realizado', type: 'boolean' },
        { title: 'Operario', field: 'operario' },
        { title: 'Observaciones', field: 'observaciones' },
        { title: 'Facturado', field: 'facturado', type: 'boolean' },
        { title: 'Numero Facturado', field: 'numeroFacturado' },
    ];

    const columnasVis = [

        //visibles
        { title: 'Nombre Analisis', field: 'nombreAnalisis' },
        { title: 'Periodo', field: 'periodo' },
        { title: 'Fecha', field: 'fecha', type: 'date' },
        { title: 'Realizado', field: 'realizado', type: 'boolean' },
        { title: 'Operario', field: 'operario' },
        { title: 'Protocolo', field: 'protocolo' },
        { title: 'Observaciones', field: 'observaciones' },
        { title: 'Facturado', field: 'facturado', type: 'boolean' },
        { title: 'Numero Facturado', field: 'numeroFacturado' },
    ];

    const columnas1 = [

        //visibles
        { title: 'Periodo', field: 'periodo' },
        { title: 'Fecha', field: 'fecha', type: 'date' },
        { title: 'Realizado', field: 'realizado', type: 'boolean' },
        { title: 'Observaciones', field: 'observaciones' },
        { title: 'Facturado', field: 'facturado', type: 'boolean' },
        { title: 'Numero Facturado', field: 'numeroFacturado' },
    ];

    const columnasAerobios = [

        //visibles
        { title: 'Periodo', field: 'periodo' },
        { title: 'Fecha', field: 'fecha', type: 'date' },
        { title: 'Realizado', field: 'realizado', type: 'boolean' },
        { title: 'Observaciones', field: 'observaciones' },
        { title: 'Facturado', field: 'facturado', type: 'boolean' },
        { title: 'Numero Facturado', field: 'numeroFacturado' },
        { title: 'Resultado', field: 'resultado' },
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
    const [dataTablas, setDataTablas] = useState([]);

    const [archivos, setArchivos] = useState(null);

    const styles = useStyles();

    const subirArchivos = e => {
        setArchivos(e);
    }

    const insertarArchivos = async () => {
        const f = new FormData();

        for (let index = 0; index < archivos.length; index++) {
            f.append("files", archivos[index]);
        }

        await axios.post("/archivos", f)
            .then(response => {
                return response
            }).catch(error => {
                console.log(error);
            })

    }

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

    const bodyInsertar = (
        <div className={styles.modal}>
            <h3>Agregar Nuevo Analisis</h3>
            <br />
            <div className="row g-4">
                <div className="col-md-3">
                    <h5> Codigo Cliente </h5>
                    <TextField className={styles.inputMaterial} name="codigoCliente" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.codigoCliente} />
                </div>
                <div className="col-md-3">
                    <h5> Oferta </h5>
                    <TextField className={styles.inputMaterial} name="oferta" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.oferta} />
                </div>
                <div className="col-md-3">
                    <h5> Elemento </h5>
                    <TextField className={styles.inputMaterial} name="elemento" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.elemento} />
                </div>
                <div className="col-md-5">
                    <h5> Analisis </h5>
                    <Autocomplete
                        disableClearable={true}
                        className={styles.inputMaterial}
                        id="Analisis"
                        options={analisis}
                        filterOptions={options => analisisNivelesPlantasCliente.filter(analisis => analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento)}
                        getOptionLabel={option => option.analisis}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} name="analisis" />}
                        onChange={(event, value) => setAnalisisSeleccionado(prevState => ({
                            ...prevState,
                            analisis: value.analisis
                        }))}
                    />
                </div>
                <div className="col-md-3">
                    <h5> Periodo </h5>
                    <TextField className={styles.inputMaterial} name="periodo" onChange={handleChangeInput} />
                </div>
                <div className="col-md-3">
                    <h5> Fecha </h5>
                    <TextField
                        id="fecha"
                        type="date"
                        name="fecha"
                        sx={{ width: 220 }}
                        onChange={handleChangeInput}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="col-md-6">
                    <h5> Operario </h5>
                    <Autocomplete
                        disableClearable={true}
                        className={styles.inputMaterial}
                        id="Operarios"
                        options={operarios}
                        filterOptions={options => operarios.filter(cliente => cliente.idPerfil === 1004)}
                        getOptionLabel={option => option.nombre + ' ' + option.apellidos}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} name="operario" />}
                        onChange={(event, value) => setAnalisisSeleccionado(prevState => ({
                            ...prevState,
                            operario: value.nombre
                        }))}
                    />
                </div>
                <div className="col-md-6">
                    <h5> Protocolo </h5>
                    <TextField
                        id='protocolo'
                        className={styles.inputMaterial}
                        select
                        name="protocolo"
                        onChange={handleChangeInput}
                    >
                        {protocolos.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="col-md-4">
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} label="Realizado" name="realizado" onChange={handleChangeCheckbox} />
                </div>
                <div className="col-md-4">
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} label="Facturado" name="facturado" onChange={handleChangeCheckbox} />
                </div>
                <div className="col-md-4">
                    <h5> Numero Facturacion </h5>
                    <TextField className={styles.inputMaterial} name="numeroFacturado" onChange={handleChangeInput} />
                </div>
                <div className="col-md-12">
                    <h5> Observaciones </h5>
                    <TextField className={styles.inputMaterial} name="observaciones" onChange={handleChangeInput} />
                </div>
            </div>
            <br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
                <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyInsertar1 = (
        <div className={styles.modal}>
            <h3>Agregar Nuevo Analisis</h3>
            <br />
            <div className="row g-4">
                <div className="col-md-3">
                    <h5> Codigo Cliente </h5>
                    <TextField className={styles.inputMaterial} name="codigoCliente" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.codigoCliente} />
                </div>
                <div className="col-md-3">
                    <h5> Oferta </h5>
                    <TextField className={styles.inputMaterial} name="oferta" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.oferta} />
                </div>
                <div className="col-md-3">
                    <h5> Elemento </h5>
                    <TextField className={styles.inputMaterial} name="elemento" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.elemento} />
                </div>
                <div className="col-md-5">
                    <h5> Analisis </h5>
                    <Autocomplete
                        disableClearable={true}
                        className={styles.inputMaterial}
                        id="Analisis"
                        options={analisis}
                        filterOptions={options => analisisNivelesPlantasCliente.filter(analisis => analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento)}
                        getOptionLabel={option => option.analisis}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} name="analisis" />}
                        onChange={(event, value) => setAnalisisSeleccionado(prevState => ({
                            ...prevState,
                            analisis: value.analisis
                        }))}
                    />
                </div>
                <div className="col-md-3">
                    <h5> Periodo </h5>
                    <TextField className={styles.inputMaterial} name="periodo" onChange={handleChangeInput} />
                </div>
                <div className="col-md-3">
                    <h5> Fecha </h5>
                    <TextField
                        id="fecha"
                        type="date"
                        name="fecha"
                        sx={{ width: 220 }}
                        onChange={handleChangeInput}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="col-md-4">
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} label="Realizado" name="realizado" onChange={handleChangeCheckbox} />
                </div>
                <div className="col-md-4">
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} label="Facturado" name="facturado" onChange={handleChangeCheckbox} />
                </div>
                <div className="col-md-4">
                    <h5> Numero Facturacion </h5>
                    <TextField className={styles.inputMaterial} name="numeroFacturado" onChange={handleChangeInput} />
                </div>
                <div className="col-md-12">
                    <h5> Observaciones </h5>
                    <TextField className={styles.inputMaterial} name="observaciones" onChange={handleChangeInput} />
                </div>
            </div>
            <br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPost1()}>Insertar</Button>
                <Button onClick={() => abrirCerrarModalInsertar1()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyInsertarOperario = (
        <div className={styles.modal}>
            <h3>Agregar Nuevo Analisis</h3>
            <br />
            <div className="row g-4">
                <div className="col-md-3">
                    <h5> Codigo Cliente </h5>
                    <TextField className={styles.inputMaterial} name="codigoCliente" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.codigoCliente} />
                </div>
                <div className="col-md-3">
                    <h5> Oferta </h5>
                    <TextField className={styles.inputMaterial} name="oferta" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.oferta} />
                </div>
                <div className="col-md-3">
                    <h5> Elemento </h5>
                    <TextField className={styles.inputMaterial} name="elemento" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.elemento} />
                </div>
                <div className="col-md-5">
                    <h5> Analisis </h5>
                    <Autocomplete
                        disableClearable={true}
                        className={styles.inputMaterial}
                        id="Analisis"
                        options={analisis}
                        filterOptions={options => analisisNivelesPlantasCliente.filter(analisis => analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento)}
                        getOptionLabel={option => option.analisis}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} name="analisis" />}
                        onChange={(event, value) => setAnalisisSeleccionado(prevState => ({
                            ...prevState,
                            analisis: value.analisis
                        }))}
                    />
                </div>
                <div className="col-md-3">
                    <h5> Periodo </h5>
                    <TextField className={styles.inputMaterial} name="periodo" onChange={handleChangeInput} />
                </div>
                <div className="col-md-3">
                    <h5> Fecha </h5>
                    <TextField
                        id="fecha"
                        type="date"
                        name="fecha"
                        sx={{ width: 220 }}
                        onChange={handleChangeInput}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="col-md-6">
                    <h5> Operario </h5>
                    <Autocomplete
                        disableClearable={true}
                        className={styles.inputMaterial}
                        id="Operarios"
                        options={operarios}
                        filterOptions={options => operarios.filter(cliente => cliente.idPerfil === 1004)}
                        getOptionLabel={option => option.nombre + ' ' + option.apellidos}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} name="operario" />}
                        onChange={(event, value) => setAnalisisSeleccionado(prevState => ({
                            ...prevState,
                            operario: value.nombre
                        }))}
                    />
                </div>
                <div className="col-md-4">
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} label="Realizado" name="realizado" onChange={handleChangeCheckbox} />
                </div>
                <div className="col-md-4">
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} label="Facturado" name="facturado" onChange={handleChangeCheckbox} />
                </div>
                <div className="col-md-4">
                    <h5> Numero Facturacion </h5>
                    <TextField className={styles.inputMaterial} name="numeroFacturado" onChange={handleChangeInput} />
                </div>
                <div className="col-md-12">
                    <h5> Observaciones </h5>
                    <TextField className={styles.inputMaterial} name="observaciones" onChange={handleChangeInput} />
                </div>
            </div>
            <br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPostOperario()}>Insertar</Button>
                <Button onClick={() => abrirCerrarModalInsertarOperario()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyInsertarAerobio = (
        <div className={styles.modal}>
            <h3>Agregar Nuevo Analisis</h3>
            <br />
            <div className="row g-4">
                <div className="col-md-3">
                    <h5> Codigo Cliente </h5>
                    <TextField className={styles.inputMaterial} name="codigoCliente" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.codigoCliente} />
                </div>
                <div className="col-md-3">
                    <h5> Oferta </h5>
                    <TextField className={styles.inputMaterial} name="oferta" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.oferta} />
                </div>
                <div className="col-md-3">
                    <h5> Elemento </h5>
                    <TextField className={styles.inputMaterial} name="elemento" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.elemento} />
                </div>
                <div className="col-md-5">
                    <h5> Analisis </h5>
                    <Autocomplete
                        disableClearable={true}
                        className={styles.inputMaterial}
                        id="Analisis"
                        options={analisis}
                        filterOptions={options => analisisNivelesPlantasCliente.filter(analisis => analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento)}
                        getOptionLabel={option => option.analisis}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} name="analisis" />}
                        onChange={(event, value) => setAnalisisSeleccionado(prevState => ({
                            ...prevState,
                            analisis: value.analisis
                        }))}
                    />
                </div>
                <div className="col-md-3">
                    <h5> Periodo </h5>
                    <TextField className={styles.inputMaterial} name="periodo" onChange={handleChangeInput} />
                </div>
                <div className="col-md-3">
                    <h5> Fecha </h5>
                    <TextField
                        id="fecha"
                        type="date"
                        name="fecha"
                        sx={{ width: 220 }}
                        onChange={handleChangeInput}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="col-md-4">
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} label="Realizado" name="realizado" onChange={handleChangeCheckbox} />
                </div>
                <div className="col-md-4">
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} label="Facturado" name="facturado" onChange={handleChangeCheckbox} />
                </div>
                <div className="col-md-4">
                    <h5> Numero Facturacion </h5>
                    <TextField className={styles.inputMaterial} name="numeroFacturado" onChange={handleChangeInput} />
                </div>
                <div className="col-md-12">
                    <h5> Resultado </h5>
                    <TextField className={styles.inputMaterial} name="resultado" onChange={handleChangeInput} />
                </div>
                <div className="col-md-12">
                    <h5> Observaciones </h5>
                    <TextField className={styles.inputMaterial} name="observaciones" onChange={handleChangeInput} />
                </div>
            </div>
            <br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPostAerobio()}>Insertar</Button>
                <Button onClick={() => abrirCerrarModalInsertarAerobio()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEditar = (
        <div className={styles.modal}>
            <h3> Analisis</h3>
            <br />
            <div className="row g-3">
                <div className="col-md-3">
                    <h5> Codigo Cliente </h5>
                    <TextField className={styles.inputMaterial} name="codigoCliente" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.codigoCliente} />
                </div>
                <div className="col-md-3">
                    <h5> Oferta </h5>
                    <TextField className={styles.inputMaterial} name="oferta" onChange={handleChangeInput} disabled value={analisisSeleccionado && analisisSeleccionado.oferta} />
                </div>
                <div className="col-md-3">
                    <h5> Elemento </h5>
                    <TextField className={styles.inputMaterial} name="elemento" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.elemento} />
                </div>
                <div className="col-md-3">
                    <h5> Analisis </h5>
                    <TextField className={styles.inputMaterial} name="analisis" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.analisis} />
                </div>
                <div className="col-md-3">
                    <h5> Periodo </h5>
                    <TextField className={styles.inputMaterial} name="periodo" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.periodo} />
                </div>
                <div className="col-md-3">
                    <h5> Fecha </h5>
                    <TextField
                        id="fecha"
                        type="date"
                        name="fecha"
                        sx={{ width: 220 }}
                        onChange={handleChangeInput}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={analisisSeleccionado && analisisSeleccionado.fecha}
                    />
                </div>
                <div className="col-md-6">
                    <h5> Operario </h5>
                    <TextField className={styles.inputMaterial} name="operario" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.operario} />
                </div>
                <div className="col-md-9">
                    <h5> Protocolo </h5>
                    <TextField
                        id='protocolo'
                        className={styles.inputMaterial}
                        select
                        name="protocolo"
                        onChange={handleChangeInput}
                        value={analisisSeleccionado && analisisSeleccionado.protocolo}
                    >
                        {protocolos.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="col-md-4">
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} checked={analisisSeleccionado.realizado} label="Realizado" name="realizado" onChange={handleChangeCheckbox} />
                </div>
                <div className="col-md-4">
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} checked={analisisSeleccionado.facturado} label="Facturado" name="facturado" onChange={handleChangeCheckbox} />
                </div>
                <div className="col-md-4">
                    <h5> Numero Facturacion </h5>
                    <TextField className={styles.inputMaterial} name="numeroFacturado" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.numeroFacturado} />
                </div>
                <div className="col-md-12">
                    <h5> Observaciones </h5>
                    <TextField className={styles.inputMaterial} name="observaciones" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.observaciones} />
                </div>
                <div className="col-md-12">
                    <h5> Subir PDF </h5>
                    <input type="file" name="files" multiple onChange={(e) => subirArchivos(e.target.files)} />
                </div>
            </div>
            <br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPut()}>Guardar</Button>
                <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEditar1 = (
        <div className={styles.modal}>
            <h3> Analisis </h3>
            <br />
            <div className="row g-4">
                <div className="col-md-3">
                    <h5> Codigo Cliente </h5>
                    <TextField className={styles.inputMaterial} name="codigoCliente" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.codigoCliente} />
                </div>
                <div className="col-md-3">
                    <h5> Oferta </h5>
                    <TextField className={styles.inputMaterial} name="oferta" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.oferta} />
                </div>
                <div className="col-md-3">
                    <h5> Elemento </h5>
                    <TextField className={styles.inputMaterial} name="elemento" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.elemento} />
                </div>
                <div className="col-md-5">
                    <h5> Analisis </h5>
                    <TextField className={styles.inputMaterial} name="analisis" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.analisis} />
                </div>
                <div className="col-md-3">
                    <h5> Periodo </h5>
                    <TextField className={styles.inputMaterial} name="periodo" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.periodo} />
                </div>
                <div className="col-md-3">
                    <h5> Fecha </h5>
                    <TextField
                        id="fecha"
                        type="date"
                        name="fecha"
                        sx={{ width: 220 }}
                        onChange={handleChangeInput}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={analisisSeleccionado && analisisSeleccionado.fecha}
                    />
                </div>
                <div className="col-md-4">
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} checked={analisisSeleccionado.realizado} label="Realizado" name="realizado" onChange={handleChangeCheckbox} />
                </div>
                <div className="col-md-4">
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} checked={analisisSeleccionado.facturado} label="Facturado" name="facturado" onChange={handleChangeCheckbox} />
                </div>
                <div className="col-md-4">
                    <h5> Numero Facturacion </h5>
                    <TextField className={styles.inputMaterial} name="numeroFacturado" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.numeroFacturado} />
                </div>
                <div className="col-md-12">
                    <h5> Observaciones </h5>
                    <TextField className={styles.inputMaterial} name="observaciones" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.observaciones} />
                </div>
            </div>
            <br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPut1()}>Guardar</Button>
                <Button onClick={() => abrirCerrarModalEditar1()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEditarOperario = (
        <div className={styles.modal}>
            <h3> Analisis </h3>
            <br />
            <div className="row g-4">
                <div className="col-md-3">
                    <h5> Codigo Cliente </h5>
                    <TextField className={styles.inputMaterial} name="codigoCliente" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.codigoCliente} />
                </div>
                <div className="col-md-3">
                    <h5> Oferta </h5>
                    <TextField className={styles.inputMaterial} name="oferta" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.oferta} />
                </div>
                <div className="col-md-3">
                    <h5> Elemento </h5>
                    <TextField className={styles.inputMaterial} name="elemento" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.elemento} />
                </div>
                <div className="col-md-5">
                    <h5> Analisis </h5>
                    <TextField className={styles.inputMaterial} name="analisis" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.analisis} />
                </div>
                <div className="col-md-3">
                    <h5> Periodo </h5>
                    <TextField className={styles.inputMaterial} name="periodo" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.periodo} />
                </div>
                <div className="col-md-3">
                    <h5> Fecha </h5>
                    <TextField
                        id="fecha"
                        type="date"
                        name="fecha"
                        sx={{ width: 220 }}
                        onChange={handleChangeInput}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={analisisSeleccionado && analisisSeleccionado.fecha}
                    />
                </div>
                <div className="col-md-6">
                    <h5> Operario </h5>
                    <Autocomplete
                        disableClearable={true}
                        className={styles.inputMaterial}
                        id="Operarios"
                        options={operarios}
                        filterOptions={options => operarios.filter(cliente => cliente.idPerfil === 1004)}
                        getOptionLabel={option => option.nombre + ' ' + option.apellidos}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} name="operario" />}
                        onChange={(event, value) => setAnalisisSeleccionado(prevState => ({
                            ...prevState,
                            operario: value.nombre
                        }))}
                        value={analisisSeleccionado && analisisSeleccionado.operario}
                    />
                </div>
                <div className="col-md-4">
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} checked={analisisSeleccionado.realizado} label="Realizado" name="realizado" onChange={handleChangeCheckbox} />
                </div>
                <div className="col-md-4">
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} checked={analisisSeleccionado.facturado} label="Facturado" name="facturado" onChange={handleChangeCheckbox} />
                </div>
                <div className="col-md-4">
                    <h5> Numero Facturacion </h5>
                    <TextField className={styles.inputMaterial} name="numeroFacturado" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.numeroFacturado} />
                </div>
                <div className="col-md-12">
                    <h5> Observaciones </h5>
                    <TextField className={styles.inputMaterial} name="observaciones" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.observaciones} />
                </div>
            </div>
            <br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPutOperario()}>Guardar</Button>
                <Button onClick={() => abrirCerrarModalEditarOperario()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEditarAerobio = (
        <div className={styles.modal}>
            <h3> Analisis </h3>
            <br />
            <div className="row g-4">
                <div className="col-md-3">
                    <h5> Codigo Cliente </h5>
                    <TextField className={styles.inputMaterial} name="codigoCliente" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.codigoCliente} />
                </div>
                <div className="col-md-3">
                    <h5> Oferta </h5>
                    <TextField className={styles.inputMaterial} name="oferta" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.oferta} />
                </div>
                <div className="col-md-3">
                    <h5> Elemento </h5>
                    <TextField className={styles.inputMaterial} name="elemento" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.elemento} />
                </div>
                <div className="col-md-5">
                    <h5> Analisis </h5>
                    <TextField className={styles.inputMaterial} name="analisis" disabled onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.analisis} />
                </div>
                <div className="col-md-3">
                    <h5> Periodo </h5>
                    <TextField className={styles.inputMaterial} name="periodo" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.periodo} />
                </div>
                <div className="col-md-3">
                    <h5> Fecha </h5>
                    <TextField
                        id="fecha"
                        type="date"
                        name="fecha"
                        sx={{ width: 220 }}
                        onChange={handleChangeInput}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={analisisSeleccionado && analisisSeleccionado.fecha}
                    />
                </div>
                <div className="col-md-4">
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} checked={analisisSeleccionado.realizado} label="Realizado" name="realizado" onChange={handleChangeCheckbox} />
                </div>
                <div className="col-md-4">
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} checked={analisisSeleccionado.facturado} label="Facturado" name="facturado" onChange={handleChangeCheckbox} />
                </div>
                <div className="col-md-4">
                    <h5> Numero Facturacion </h5>
                    <TextField className={styles.inputMaterial} name="numeroFacturado" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.numeroFacturado} />
                </div>
                <div className="col-md-12">
                    <h5> Resultado </h5>
                    <TextField className={styles.inputMaterial} name="resultado" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.resultado} />
                </div>
                <div className="col-md-12">
                    <h5> Observaciones </h5>
                    <TextField className={styles.inputMaterial} name="observaciones" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.observaciones} />
                </div>
            </div>
            <br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPutAerobio()}>Guardar</Button>
                <Button onClick={() => abrirCerrarModalEditarAerobio()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEliminar = (

        <div className={styles.modal}>
            <p>Estás seguro que deseas eliminar el analisis ? </p>
            <div align="right">
                <Button color="secondary" onClick={() => peticionDelete()}>Sí</Button>
                <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
            </div>
        </div>
    )

    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalInsertar1 = () => {
        setModalInsertar1(!modalInsertar1);
    }

    const abrirCerrarModalInsertarOperario = () => {
        setModalInsertarOperario(!modalInsertarOperario);
    }

    const abrirCerrarModalInsertarAerobio = () => {
        setModalInsertarAerobio(!modalInsertarAerobio);
    }

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const abrirCerrarModalEditar1 = () => {
        setModalEditar1(!modalEditar1);
    }

    const abrirCerrarModalEditarOperario = () => {
        setModalEditarOperario(!modalEditarOperario);
    }

    const abrirCerrarModalEditarAerobio = () => {
        setModalEditarAerobio(!modalEditarAerobio);
    }

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    const GetClientes = async () => {
        axios.get("/cliente", token).then(response => {
            const cliente = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setClientes(cliente);
        }, [])
    }

    const GetArchivos = async () => {
        axios.get("/archivos", token).then(response => {
            const archivo = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setArchivos2(archivo);
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
            setElemento(elemento);
        }, [])
    }

    const GetOperarios = async () => {
        axios.get("/usuario", token).then(response => {
            const usuario = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setOperarios(usuario);
        }, [])
    }

    const GetAnalisisNivelesPlantasCliente = async () => {
        axios.get("/analisisnivelesplantascliente", token).then(response => {
            const analisisNiveles = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setAnalisisNivelesPlantasCliente(analisisNiveles);
        })
    }

    const GetParametrosAnalisisPlanta = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData(response.data.data)
        })
    }

    function FiltrarData() {
        setData1(data.filter(analisis => analisis.analisis === "Físico-Químico"))
        setData2(data.filter(analisis => analisis.analisis === "Aerobios"))
        setData3(data.filter(analisis => analisis.analisis === "Legionela"))
        setData4(data.filter(analisis => analisis.analisis === "Aguas Residuales"))
        setData5(data.filter(analisis => analisis.analisis === "Desinfecciones"))
        setData6(data.filter(analisis => analisis.analisis === "Osmosis"))
        setData7(data.filter(analisis => analisis.analisis === "AguaPozo"))
        setData8(data.filter(analisis => analisis.analisis === "Desinfección ACS"))
        setData9(data.filter(analisis => analisis.analisis === "Mantenimiento Maq Frio"))
        setData10(data.filter(analisis => analisis.analisis === "Mediciones"))
        setData11(data.filter(analisis => analisis.analisis === "Control Fuga Gas"))
        setData12(data.filter(analisis => analisis.analisis === "Agua Potable"))
        setData13(data.filter(analisis => analisis.analisis === "Revision de Bandeja"))
        setData14(data.filter(analisis => analisis.analisis === "Otros con Fecha de Trabajo"))
        setData15(data.filter(analisis => analisis.analisis === "Otros sin Fecha de Trabajo"))
    }

    useEffect(() => {
        GetOperarios();
        GetArchivos();
        GetParametrosAnalisisPlanta();
        FiltrarData();
        GetOfertas();
        GetClientes();
        GetAnalisis();
        GetElementos();
        GetAnalisisNivelesPlantasCliente();
        Tablas();
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

    const peticionPost1 = async () => {
        analisisSeleccionado.id = null;
        await axios.post("/parametrosanalisisplanta", analisisSeleccionado, token)
            .then(response => {
                //setData(data.concat(response.data));
                abrirCerrarModalInsertar1();
                GetParametrosAnalisisPlanta();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPostOperario = async () => {
        analisisSeleccionado.id = null;
        await axios.post("/parametrosanalisisplanta", analisisSeleccionado, token)
            .then(response => {
                //setData(data.concat(response.data));
                abrirCerrarModalInsertarOperario();
                GetParametrosAnalisisPlanta();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPostAerobio = async () => {
        analisisSeleccionado.id = null;
        await axios.post("/parametrosanalisisplanta", analisisSeleccionado, token)
            .then(response => {
                //setData(data.concat(response.data));
                abrirCerrarModalInsertarAerobio();
                GetParametrosAnalisisPlanta();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPut = async () => {
        console.log(analisisSeleccionado)
        await axios.put("/parametrosanalisisplanta?id=" + analisisSeleccionado.id, analisisSeleccionado, token)
            .then(response => {
                var analisisModificado = data;
                analisisModificado.map(analisi => {
                    if (analisi.id === analisisSeleccionado.id) {
                        analisi = analisisSeleccionado
                    }
                });
                GetParametrosAnalisisPlanta();
                insertarArchivos();
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPut1 = async () => {
        console.log(analisisSeleccionado)
        await axios.put("/parametrosanalisisplanta?id=" + analisisSeleccionado.id, analisisSeleccionado, token)
            .then(response => {
                var analisisModificado = data;
                analisisModificado.map(analisi => {
                    if (analisi.id === analisisSeleccionado.id) {
                        analisi = analisisSeleccionado
                    }
                });
                GetParametrosAnalisisPlanta();
                insertarArchivos();
                abrirCerrarModalEditar1();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPutOperario = async () => {
        console.log(analisisSeleccionado)
        await axios.put("/parametrosanalisisplanta?id=" + analisisSeleccionado.id, analisisSeleccionado, token)
            .then(response => {
                var analisisModificado = data;
                analisisModificado.map(analisi => {
                    if (analisi.id === analisisSeleccionado.id) {
                        analisi = analisisSeleccionado
                    }
                });
                GetParametrosAnalisisPlanta();
                insertarArchivos();
                abrirCerrarModalEditarOperario();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPutAerobio = async () => {
        console.log(analisisSeleccionado)
        await axios.put("/parametrosanalisisplanta?id=" + analisisSeleccionado.id, analisisSeleccionado, token)
            .then(response => {
                var analisisModificado = data;
                analisisModificado.map(analisi => {
                    if (analisi.id === analisisSeleccionado.id) {
                        analisi = analisisSeleccionado
                    }
                });
                GetParametrosAnalisisPlanta();
                insertarArchivos();
                abrirCerrarModalEditarAerobio();
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

    const onChangeCliente = (e, value, name) => {

        if (e.target.textContent !== "") {
            setData1(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === "Físico-Químico" && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData2(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === "Aerobios" && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData3(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === "Legionela" && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData4(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === "Aguas Residuales" && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData5(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === "Desinfecciones" && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData6(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === "Osmosis" && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData7(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === "AguaPozo" && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData8(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === "Desinfección ACS" && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData9(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === "Mantenimiento Maq Frio" && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData10(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === "Mediciones" && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData11(data.filter(analisis => analisis.codigoCliente === parseInt(e.target.textContent) && analisis.analisis === "Control Fuga Gas" && analisis.oferta === analisisSeleccionado.oferta && analisis.elemento === analisisSeleccionado.elemento))
            setData12(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === "Agua Potable" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData13(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === "Revision de Bandeja" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData14(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === "Otros con Fecha de Trabajo" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData15(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === "Otros sin Fecha de Trabajo" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setDataTablas(analisisNivelesPlantasCliente.filter((analisisPlanta) => analisisPlanta.codigoCliente === parseInt(e.target.textContent) && analisisPlanta.oferta === analisisSeleccionado.oferta && analisisPlanta.elemento === analisisSeleccionado.elemento))
        }

        setAnalisisSeleccionado((prevState) => ({
            ...prevState,
            [name]: value.codigo
        }))
    }

    const onChangeOferta = (e, value, name) => {

        if (e.target.textContent !== "") {
            setData1(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === "Físico-Químico" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData2(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === "Aerobios" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData3(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === "Legionela" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData4(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === "Aguas Residuales" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData5(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === "Desinfecciones" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData6(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === "Osmosis" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData7(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === "AguaPozo" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData8(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === "Desinfección ACS" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData9(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === "Mantenimiento Maq Frio" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData10(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === "Mediciones" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData11(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === "Control Fuga Gas" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData12(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === "Agua Potable" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData13(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === "Revision de Bandeja" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData14(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === "Otros con Fecha de Trabajo" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setData15(data.filter(analisis => analisis.oferta === parseInt(e.target.textContent) && analisis.analisis === "Otros sin Fecha de Trabajo" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.elemento === analisisSeleccionado.elemento))
            setDataTablas(analisisNivelesPlantasCliente.filter((analisisPlanta) => analisisPlanta.codigoCliente === analisisSeleccionado.codigoCliente && analisisPlanta.oferta === parseInt(e.target.textContent) && analisisPlanta.elemento === analisisSeleccionado.elemento))
        }

        setAnalisisSeleccionado((prevState) => ({
            ...prevState,
            [name]: value.numeroOferta
        }))
    }

    const onChangeElemento = (e, value, name) => {
        if (e.target.textContent !== "") {
            console.log(e.target.textContent)
            setData1(data.filter(analisis => analisis.elemento === e.target.textContent && analisis.analisis === "Físico-Químico" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData2(data.filter(analisis => analisis.elemento === e.target.textContent && analisis.analisis === "Aerobios" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData3(data.filter(analisis => analisis.elemento === e.target.textContent && analisis.analisis === "Legionela" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData4(data.filter(analisis => analisis.elemento === e.target.textContent && analisis.analisis === "Aguas Residuales" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData5(data.filter(analisis => analisis.elemento === e.target.textContent && analisis.analisis === "Desinfecciones" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData6(data.filter(analisis => analisis.elemento === e.target.textContent && analisis.analisis === "Osmosis" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData7(data.filter(analisis => analisis.elemento === e.target.textContent && analisis.analisis === "AguaPozo" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData8(data.filter(analisis => analisis.elemento === e.target.textContent && analisis.analisis === "Desinfección ACS" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData9(data.filter(analisis => analisis.elemento === e.target.textContent && analisis.analisis === "Mantenimiento Maq Frio" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData10(data.filter(analisis => analisis.elemento === e.target.textContent && analisis.analisis === "Mediciones" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData11(data.filter(analisis => analisis.elemento === e.target.textContent && analisis.analisis === "Control Fuga Gas" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData12(data.filter(analisis => analisis.elemento === e.target.textContent && analisis.analisis === "Agua Potable" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData13(data.filter(analisis => analisis.elemento === e.target.textContent && analisis.analisis === "Revision de Bandeja" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData14(data.filter(analisis => analisis.elemento === e.target.textContent && analisis.analisis === "Otros con Fecha de Trabajo" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setData15(data.filter(analisis => analisis.elemento === e.target.textContent && analisis.analisis === "Otros sin Fecha de Trabajo" && analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta))
            setDataTablas(analisisNivelesPlantasCliente.filter((analisisPlanta) => analisisPlanta.codigoCliente === analisisSeleccionado.codigoCliente && analisisPlanta.oferta === analisisSeleccionado.oferta && analisisPlanta.elemento === e.target.textContent))
        }

        setAnalisisSeleccionado((prevState) => ({
            ...prevState,
            [name]: value.elemento
        }))
    }

    function Tablas() {
        setDataTablas(analisisNivelesPlantasCliente.filter((analisisPlanta) => analisisPlanta.codigoCliente === analisisSeleccionado.codigoCliente && analisisPlanta.oferta === analisisSeleccionado.oferta && analisisPlanta.elemento === analisisSeleccionado.elemento))
    }

    return (
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
                    renderInput={(params) => <TextField {...params} type="number" label="CodigoCliente" name="codigoCliente" />}
                    onChange={(event, value) => onChangeCliente(event, value, "codigoCliente")}
                />
                <Autocomplete
                    disableClearable={true}
                    id="Oferta"
                    options={oferta}
                    getOptionLabel={option => option.numeroOferta}
                    filterOptions={options => oferta.filter(oferta => oferta.codigoCliente === analisisSeleccionado.codigoCliente)}
                    sx={{ width: 250 }}
                    renderInput={(params) => <TextField {...params} label="Oferta" name="oferta" />}
                    onChange={(event, value) => onChangeOferta(event, value, "oferta")}
                />
                <Autocomplete
                    disableClearable={true}
                    id="Elemento"
                    options={elemento}
                    filterOptions={options => analisisNivelesPlantasCliente.filter(analisis => analisis.codigoCliente === analisisSeleccionado.codigoCliente && analisis.oferta === analisisSeleccionado.oferta)}
                    getOptionLabel={option => option.elemento}
                    sx={{ width: 250 }}
                    renderInput={(params) => <TextField {...params} label="Elemento" name="elemento" />}
                    onChange={(event, value) => onChangeElemento(event, value, "elemento")}
                />
            </div>
            <br />
            <div className='home-container-elements'>
                <div className="visualizacion">
                    <div className="visualizacion-tablas">
                        {dataTablas.map((analisi, index) => {
                            switch (analisi.analisis) {
                                case "Físico-Químico":
                                    return (
                                        <MaterialTable columns={columnas1} data={data1}
                                            localization={localization}
                                            actions={[
                                                {
                                                    icon: () => <AddCircle style={{ fill: "green" }} />,
                                                    tooltip: "Añadir analisis",
                                                    isFreeAction: true,
                                                    onClick: (e, data) => {
                                                        setAnalisisNombre(analisis.filter(analisi => analisi.nombre === dataTablas.analisis))
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
                                                {
                                                    icon: () => <Edit />,
                                                    tooltip: "Editar analisis",
                                                    onClick: (e, data) => {
                                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas1[0].id));
                                                        abrirCerrarModalEditar1();
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

                                                setAnalisisSeleccionado(filas[0]);
                                            }
                                            }
                                            options={{
                                                sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                                columnsButton: false, showSelectAllCheckbox: false,
                                                rowStyle: rowData => ({
                                                    backgroundColor: (analisisSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                                                    whiteSpace: "nowrap"
                                                }),
                                                exportMenu: [{
                                                    label: 'Export PDF',
                                                    exportFunc: (cols, datas) => ExportPdf(cols, data1, 'Listado de Fisico Quimicos')
                                                }, {
                                                    label: 'Export CSV',
                                                    exportFunc: (cols, datas) => ExportCsv(cols, data1, 'Listado de Fisico Quimicos')
                                                }]
                                            }}

                                            title="Fisico Quimico"
                                        />
                                    )
                                case "Aerobios":
                                    return (
                                        <MaterialTable columns={columnasAerobios} data={data2}
                                            localization={localization}
                                            actions={[
                                                {
                                                    icon: () => <AddCircle style={{ fill: "green" }} />,
                                                    tooltip: "Añadir analisis",
                                                    isFreeAction: true,
                                                    onClick: (e, data) => {
                                                        abrirCerrarModalInsertarAerobio();
                                                    },
                                                },
                                                {
                                                    icon: () => <RemoveCircle style={{ fill: "red" }} />,
                                                    tooltip: "Eliminar analisis",
                                                    onClick: (event, rowData) => {
                                                        setAnalisisEliminar(FilasSeleccionadas2);
                                                        abrirCerrarModalEliminar();
                                                    },
                                                },
                                                {
                                                    icon: () => <Edit />,
                                                    tooltip: "Editar analisis",
                                                    onClick: (e, data) => {
                                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas2[0].idCliente));
                                                        abrirCerrarModalEditarAerobio();
                                                    },
                                                },
                                            ]}

                                            onRowClick={((evt, analisisSeleccionado) => {
                                                setAnalisisSeleccionado(analisisSeleccionado)
                                                setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.id));
                                                abrirCerrarModalEditarAerobio();
                                            })}
                                            onSelectionChange={(filas) => {
                                                setFilasSeleccionadas2(filas);
                                                if (filas.length > 0)
                                                    setAnalisisSeleccionado(filas[0]);
                                            }
                                            }
                                            options={{
                                                sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                                columnsButton: false, showSelectAllCheckbox: false,
                                                rowStyle: rowData => ({
                                                    backgroundColor: (analisisSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                                                    whiteSpace: "nowrap"
                                                }),
                                                exportMenu: [{
                                                    label: 'Export PDF',
                                                    exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Aerobios')
                                                }, {
                                                    label: 'Export CSV',
                                                    exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Aerobios')
                                                }]
                                            }}

                                            title="Aerobios"
                                        />
                                    )
                                case "Legionela":
                                    return (
                                        <MaterialTable columns={columnas1} data={data3}
                                            localization={localization}
                                            actions={[
                                                {
                                                    icon: () => <AddCircle style={{ fill: "green" }} />,
                                                    tooltip: "Añadir analisis",
                                                    isFreeAction: true,
                                                    onClick: (e, data) => {
                                                        abrirCerrarModalInsertar1();
                                                    },
                                                },
                                                {
                                                    icon: () => <RemoveCircle style={{ fill: "red" }} />,
                                                    tooltip: "Eliminar analisis",
                                                    onClick: (event, rowData) => {
                                                        setAnalisisEliminar(FilasSeleccionadas3);
                                                        abrirCerrarModalEliminar();
                                                    },
                                                },
                                                {
                                                    icon: () => <Edit />,
                                                    tooltip: "Editar analisis",
                                                    onClick: (e, data) => {
                                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas3[0].idCliente));
                                                        abrirCerrarModalEditar1();
                                                    },
                                                },
                                            ]}

                                            onRowClick={((evt, analisisSeleccionado) => {
                                                setAnalisisSeleccionado(analisisSeleccionado)
                                                console.log(analisisSeleccionado)
                                                setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.id));
                                                abrirCerrarModalEditar1();
                                            })}
                                            onSelectionChange={(filas) => {
                                                setFilasSeleccionadas3(filas);
                                                if (filas.length > 0)
                                                    setAnalisisSeleccionado(filas[0]);
                                            }
                                            }
                                            options={{
                                                sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                                columnsButton: false, showSelectAllCheckbox: false,
                                                rowStyle: rowData => ({
                                                    backgroundColor: (analisisSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                                                    whiteSpace: "nowrap"
                                                }),
                                                exportMenu: [{
                                                    label: 'Export PDF',
                                                    exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Legionela')
                                                }, {
                                                    label: 'Export CSV',
                                                    exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Legionela')
                                                }]
                                            }}

                                            title="Legionela"
                                        />
                                    )
                                case "Aguas Residuales":
                                    return (
                                        <MaterialTable columns={columnas1} data={data4}
                                            localization={localization}
                                            actions={[
                                                {
                                                    icon: () => <AddCircle style={{ fill: "green" }} />,
                                                    tooltip: "Añadir analisis",
                                                    isFreeAction: true,
                                                    onClick: (e, data) => {
                                                        abrirCerrarModalInsertar1();
                                                    },
                                                },
                                                {
                                                    icon: () => <RemoveCircle style={{ fill: "red" }} />,
                                                    tooltip: "Eliminar analisis",
                                                    onClick: (event, rowData) => {
                                                        setAnalisisEliminar(FilasSeleccionadas4);
                                                        abrirCerrarModalEliminar();
                                                    },
                                                },
                                                {
                                                    icon: () => <Edit />,
                                                    tooltip: "Editar analisis",
                                                    onClick: (e, data) => {
                                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas4[0].idCliente));
                                                        abrirCerrarModalEditar1();
                                                    },
                                                },
                                            ]}

                                            onRowClick={((evt, analisisSeleccionado) => {
                                                setAnalisisSeleccionado(analisisSeleccionado)
                                                setAnalisisEditar(analisis.filter(analisi => analisi.nombre === analisisSeleccionado.analisis));
                                                abrirCerrarModalEditar1();
                                            })}
                                            onSelectionChange={(filas) => {
                                                setFilasSeleccionadas4(filas);
                                                if (filas.length > 0)
                                                    setAnalisisSeleccionado(filas[0]);
                                            }
                                            }
                                            options={{
                                                sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                                columnsButton: false, showSelectAllCheckbox: false,
                                                rowStyle: rowData => ({
                                                    backgroundColor: (analisisSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                                                    whiteSpace: "nowrap"
                                                }),
                                                exportMenu: [{
                                                    label: 'Export PDF',
                                                    exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Aguas Residuales')
                                                }, {
                                                    label: 'Export CSV',
                                                    exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Aguas Residuales')
                                                }]
                                            }}

                                            title="Aguas Residuales"
                                        />
                                    )
                                case "Desinfecciones":
                                    return (
                                        <MaterialTable columns={columnas} data={data5}
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
                                                        setAnalisisEliminar(FilasSeleccionadas5);
                                                        abrirCerrarModalEliminar();
                                                    },
                                                },
                                                {
                                                    icon: () => <Edit />,
                                                    tooltip: "Editar analisis",
                                                    onClick: (e, data) => {
                                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas5[0].id));
                                                        abrirCerrarModalEditar();
                                                    },
                                                },
                                            ]}

                                            onRowClick={((evt, analisisSeleccionado) => {
                                                setAnalisisSeleccionado(analisisSeleccionado)
                                                GetParametrosAnalisisPlanta();
                                                abrirCerrarModalEditar();
                                            })}
                                            onSelectionChange={(filas) => {
                                                setFilasSeleccionadas5(filas);
                                                if (filas.length > 0)
                                                    setAnalisisSeleccionado(filas[0]);
                                            }
                                            }
                                            options={{
                                                sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                                columnsButton: false, showSelectAllCheckbox: false,
                                                rowStyle: rowData => ({
                                                    backgroundColor: (analisisSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                                                    whiteSpace: "nowrap"
                                                }),
                                                exportMenu: [{
                                                    label: 'Export PDF',
                                                    exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Desinfecciones')
                                                }, {
                                                    label: 'Export CSV',
                                                    exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Desinfecciones')
                                                }]
                                            }}

                                            title="Desinfecciones"
                                        />
                                    )
                                case "Osmosis":
                                    return (
                                        <MaterialTable columns={columnas1} data={data6}
                                            localization={localization}
                                            actions={[
                                                {
                                                    icon: () => <AddCircle style={{ fill: "green" }} />,
                                                    tooltip: "Añadir analisis",
                                                    isFreeAction: true,
                                                    onClick: (e, data) => {
                                                        abrirCerrarModalInsertar1();
                                                    },
                                                },
                                                {
                                                    icon: () => <RemoveCircle style={{ fill: "red" }} />,
                                                    tooltip: "Eliminar analisis",
                                                    onClick: (event, rowData) => {
                                                        setAnalisisEliminar(FilasSeleccionadas6);
                                                        abrirCerrarModalEliminar();
                                                    },
                                                },
                                                {
                                                    icon: () => <Edit />,
                                                    tooltip: "Editar analisis",
                                                    onClick: (e, data) => {
                                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas6[0].idCliente));
                                                        abrirCerrarModalEditar1();
                                                    },
                                                },
                                            ]}

                                            onRowClick={((evt, analisisSeleccionado) => {
                                                setAnalisisSeleccionado(analisisSeleccionado)
                                                GetParametrosAnalisisPlanta();
                                                abrirCerrarModalEditar1();
                                            })}
                                            onSelectionChange={(filas) => {
                                                setFilasSeleccionadas6(filas);
                                                if (filas.length > 0)
                                                    setAnalisisSeleccionado(filas[0]);
                                            }
                                            }
                                            options={{
                                                sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                                columnsButton: false, showSelectAllCheckbox: false,
                                                rowStyle: rowData => ({
                                                    backgroundColor: (analisisSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                                                    whiteSpace: "nowrap"
                                                }),
                                                exportMenu: [{
                                                    label: 'Export PDF',
                                                    exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Osmosis')
                                                }, {
                                                    label: 'Export CSV',
                                                    exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Osmosis')
                                                }]
                                            }}

                                            title="Osmosis"
                                        />
                                    )
                                case "AguaPozo":
                                    return (
                                        <MaterialTable columns={columnas1} data={data7}
                                            localization={localization}
                                            actions={[
                                                {
                                                    icon: () => <AddCircle style={{ fill: "green" }} />,
                                                    tooltip: "Añadir analisis",
                                                    isFreeAction: true,
                                                    onClick: (e, data) => {
                                                        abrirCerrarModalInsertar1();
                                                    },
                                                },
                                                {
                                                    icon: () => <RemoveCircle style={{ fill: "red" }} />,
                                                    tooltip: "Eliminar analisis",
                                                    onClick: (event, rowData) => {
                                                        setAnalisisEliminar(FilasSeleccionadas7);
                                                        abrirCerrarModalEliminar();
                                                    },
                                                },
                                                {
                                                    icon: () => <Edit />,
                                                    tooltip: "Editar analisis",
                                                    onClick: (e, data) => {
                                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas7[0].idCliente));
                                                        abrirCerrarModalEditar1();
                                                    },
                                                },
                                            ]}

                                            onRowClick={((evt, analisisSeleccionado) => {
                                                setAnalisisSeleccionado(analisisSeleccionado)
                                                setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.id));
                                                abrirCerrarModalEditar1();
                                            })}
                                            onSelectionChange={(filas) => {
                                                setFilasSeleccionadas7(filas);
                                                if (filas.length > 0)
                                                    setAnalisisSeleccionado(filas[0]);
                                            }
                                            }
                                            options={{
                                                sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                                columnsButton: false, showSelectAllCheckbox: false,
                                                rowStyle: rowData => ({
                                                    backgroundColor: (analisisSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                                                    whiteSpace: "nowrap"
                                                }),
                                                exportMenu: [{
                                                    label: 'Export PDF',
                                                    exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Agua Pozo')
                                                }, {
                                                    label: 'Export CSV',
                                                    exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Agua Pozo')
                                                }]
                                            }}

                                            title="Agua Pozo"
                                        />
                                    )
                                case "Desinfección ACS":
                                    return (
                                        <MaterialTable columns={columnas} data={data8}
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
                                                        setAnalisisEliminar(FilasSeleccionadas8);
                                                        abrirCerrarModalEliminar();
                                                    },
                                                },
                                                {
                                                    icon: () => <Edit />,
                                                    tooltip: "Editar analisis",
                                                    onClick: (e, data) => {
                                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas8[0].idCliente));
                                                        abrirCerrarModalEditar();
                                                    },
                                                },
                                            ]}

                                            onRowClick={((evt, analisisSeleccionado) => {
                                                setAnalisisSeleccionado(analisisSeleccionado)
                                                setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.id));
                                                abrirCerrarModalEditar();
                                            })}
                                            onSelectionChange={(filas) => {
                                                setFilasSeleccionadas8(filas);
                                                if (filas.length > 0)
                                                    setAnalisisSeleccionado(filas[0]);
                                            }
                                            }
                                            options={{
                                                sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                                columnsButton: false, showSelectAllCheckbox: false,
                                                rowStyle: rowData => ({
                                                    backgroundColor: (analisisSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                                                    whiteSpace: "nowrap"
                                                }),
                                                exportMenu: [{
                                                    label: 'Export PDF',
                                                    exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Desinfeccion ACS')
                                                }, {
                                                    label: 'Export CSV',
                                                    exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Desinfeccion ACS')
                                                }]
                                            }}

                                            title="Desinfeccion ACS"
                                        />
                                    )
                                case "Mantenimiento Maq Frio":
                                    return (
                                        <MaterialTable columns={columnasOperario} data={data9}
                                            localization={localization}
                                            actions={[
                                                {
                                                    icon: () => <AddCircle style={{ fill: "green" }} />,
                                                    tooltip: "Añadir analisis",
                                                    isFreeAction: true,
                                                    onClick: (e, data) => {
                                                        abrirCerrarModalInsertarOperario();
                                                    },
                                                },
                                                {
                                                    icon: () => <RemoveCircle style={{ fill: "red" }} />,
                                                    tooltip: "Eliminar analisis",
                                                    onClick: (event, rowData) => {
                                                        setAnalisisEliminar(FilasSeleccionadas9);
                                                        abrirCerrarModalEliminar();
                                                    },
                                                },
                                                {
                                                    icon: () => <Edit />,
                                                    tooltip: "Editar analisis",
                                                    onClick: (e, data) => {
                                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas9[0].id));
                                                        abrirCerrarModalEditarOperario();
                                                    },
                                                },
                                            ]}

                                            onRowClick={((evt, analisisSeleccionado) => {
                                                setAnalisisSeleccionado(analisisSeleccionado)
                                                setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.id));
                                                abrirCerrarModalEditarOperario();
                                            })}
                                            onSelectionChange={(filas) => {
                                                setFilasSeleccionadas9(filas);
                                                if (filas.length > 0)
                                                    setAnalisisSeleccionado(filas[0]);
                                            }
                                            }
                                            options={{
                                                sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                                columnsButton: false, showSelectAllCheckbox: false,
                                                rowStyle: rowData => ({
                                                    backgroundColor: (analisisSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                                                    whiteSpace: "nowrap"
                                                }),
                                                exportMenu: [{
                                                    label: 'Export PDF',
                                                    exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Mantenimiento de Maquina de Frio')
                                                }, {
                                                    label: 'Export CSV',
                                                    exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Mantenimiento de Maquina de Frio')
                                                }]
                                            }}

                                            title="Mantenimiento Maquina Frio"
                                        />
                                    )
                                case "Mediciones":
                                    return (
                                        <MaterialTable columns={columnasOperario} data={data10}
                                            localization={localization}
                                            actions={[
                                                {
                                                    icon: () => <AddCircle style={{ fill: "green" }} />,
                                                    tooltip: "Añadir analisis",
                                                    isFreeAction: true,
                                                    onClick: (e, data) => {
                                                        abrirCerrarModalInsertarOperario();
                                                    },
                                                },
                                                {
                                                    icon: () => <RemoveCircle style={{ fill: "red" }} />,
                                                    tooltip: "Eliminar analisis",
                                                    onClick: (event, rowData) => {
                                                        setAnalisisEliminar(FilasSeleccionadas10);
                                                        abrirCerrarModalEliminar();
                                                    },
                                                },
                                                {
                                                    icon: () => <Edit />,
                                                    tooltip: "Editar analisis",
                                                    onClick: (e, data) => {
                                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas10[0].idCliente));
                                                        abrirCerrarModalEditarOperario();
                                                    },
                                                },
                                            ]}

                                            onRowClick={((evt, analisisSeleccionado) => {
                                                setAnalisisSeleccionado(analisisSeleccionado)
                                                setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.id));
                                                abrirCerrarModalEditarOperario();
                                            })}
                                            onSelectionChange={(filas) => {
                                                setFilasSeleccionadas10(filas);
                                                if (filas.length > 0)
                                                    setAnalisisSeleccionado(filas[0]);
                                            }
                                            }
                                            options={{
                                                sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                                columnsButton: false, showSelectAllCheckbox: false,
                                                rowStyle: rowData => ({
                                                    backgroundColor: (analisisSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                                                    whiteSpace: "nowrap"
                                                }),
                                                exportMenu: [{
                                                    label: 'Export PDF',
                                                    exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Mediciones')
                                                }, {
                                                    label: 'Export CSV',
                                                    exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Mediciones')
                                                }]
                                            }}

                                            title="Mediciones"
                                        />
                                    )
                                case "Control Fuga Gas":
                                    return (
                                        <MaterialTable columns={columnasOperario} data={data11}
                                            localization={localization}
                                            actions={[
                                                {
                                                    icon: () => <AddCircle style={{ fill: "green" }} />,
                                                    tooltip: "Añadir analisis",
                                                    isFreeAction: true,
                                                    onClick: (e, data) => {
                                                        abrirCerrarModalInsertarOperario();
                                                    },
                                                },
                                                {
                                                    icon: () => <RemoveCircle style={{ fill: "red" }} />,
                                                    tooltip: "Eliminar analisis",
                                                    onClick: (event, rowData) => {
                                                        setAnalisisEliminar(FilasSeleccionadas11);
                                                        abrirCerrarModalEliminar();
                                                    },
                                                },
                                                {
                                                    icon: () => <Edit />,
                                                    tooltip: "Editar analisis",
                                                    onClick: (e, data) => {
                                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas11[0].idCliente));
                                                        abrirCerrarModalEditarOperario();
                                                    },
                                                },
                                            ]}

                                            onRowClick={((evt, analisisSeleccionado) => {
                                                setAnalisisSeleccionado(analisisSeleccionado)
                                                setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.id));
                                                abrirCerrarModalEditarOperario();
                                            })}
                                            onSelectionChange={(filas) => {
                                                setFilasSeleccionadas11(filas);
                                                if (filas.length > 0)
                                                    setAnalisisSeleccionado(filas[0]);
                                            }
                                            }
                                            options={{
                                                sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                                columnsButton: false, showSelectAllCheckbox: false,
                                                rowStyle: rowData => ({
                                                    backgroundColor: (analisisSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                                                    whiteSpace: "nowrap"
                                                }),
                                                exportMenu: [{
                                                    label: 'Export PDF',
                                                    exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Control de Fuga de Gas')
                                                }, {
                                                    label: 'Export CSV',
                                                    exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Control de Fuga de Gas')
                                                }]
                                            }}

                                            title="Control Fuga de Gas"
                                        />
                                    )
                                case "Agua Potable":
                                    return (
                                        <MaterialTable columns={columnas1} data={data12}
                                            localization={localization}
                                            actions={[
                                                {
                                                    icon: () => <AddCircle style={{ fill: "green" }} />,
                                                    tooltip: "Añadir analisis",
                                                    isFreeAction: true,
                                                    onClick: (e, data) => {
                                                        abrirCerrarModalInsertar1();
                                                    },
                                                },
                                                {
                                                    icon: () => <RemoveCircle style={{ fill: "red" }} />,
                                                    tooltip: "Eliminar analisis",
                                                    onClick: (event, rowData) => {
                                                        setAnalisisEliminar(FilasSeleccionadas12);
                                                        abrirCerrarModalEliminar();
                                                    },
                                                },
                                                {
                                                    icon: () => <Edit />,
                                                    tooltip: "Editar analisis",
                                                    onClick: (e, data) => {
                                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas12[0].idCliente));
                                                        abrirCerrarModalEditar1();
                                                    },
                                                },
                                            ]}

                                            onRowClick={((evt, analisisSeleccionado) => {
                                                setAnalisisSeleccionado(analisisSeleccionado)
                                                setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.id));
                                                abrirCerrarModalEditar1();
                                            })}
                                            onSelectionChange={(filas) => {
                                                setFilasSeleccionadas12(filas);
                                                if (filas.length > 0)
                                                    setAnalisisSeleccionado(filas[0]);
                                            }
                                            }
                                            options={{
                                                sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                                columnsButton: false, showSelectAllCheckbox: false,
                                                rowStyle: rowData => ({
                                                    backgroundColor: (analisisSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                                                    whiteSpace: "nowrap"
                                                }),
                                                exportMenu: [{
                                                    label: 'Export PDF',
                                                    exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Agua Potable')
                                                }, {
                                                    label: 'Export CSV',
                                                    exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Agua Potable')
                                                }]
                                            }}

                                            title="Agua Potable"
                                        />
                                    )
                                case "Revision de Bandeja":
                                    return (
                                        <MaterialTable columns={columnas1} data={data13}
                                            localization={localization}
                                            actions={[
                                                {
                                                    icon: () => <AddCircle style={{ fill: "green" }} />,
                                                    tooltip: "Añadir analisis",
                                                    isFreeAction: true,
                                                    onClick: (e, data) => {
                                                        abrirCerrarModalInsertar1();
                                                    },
                                                },
                                                {
                                                    icon: () => <RemoveCircle style={{ fill: "red" }} />,
                                                    tooltip: "Eliminar analisis",
                                                    onClick: (event, rowData) => {
                                                        setAnalisisEliminar(FilasSeleccionadas13);
                                                        abrirCerrarModalEliminar();
                                                    },
                                                },
                                                {
                                                    icon: () => <Edit />,
                                                    tooltip: "Editar analisis",
                                                    onClick: (e, data) => {
                                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas13[0].idCliente));
                                                        abrirCerrarModalEditar1();
                                                    },
                                                },
                                            ]}

                                            onRowClick={((evt, analisisSeleccionado) => {
                                                setAnalisisSeleccionado(analisisSeleccionado)
                                                setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.id));
                                                abrirCerrarModalEditar1();
                                            })}
                                            onSelectionChange={(filas) => {
                                                setFilasSeleccionadas13(filas);
                                                if (filas.length > 0)
                                                    setAnalisisSeleccionado(filas[0]);
                                            }
                                            }
                                            options={{
                                                sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                                columnsButton: false, showSelectAllCheckbox: false,
                                                rowStyle: rowData => ({
                                                    backgroundColor: (analisisSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                                                    whiteSpace: "nowrap"
                                                }),
                                                exportMenu: [{
                                                    label: 'Export PDF',
                                                    exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Revision de Bandeja')
                                                }, {
                                                    label: 'Export CSV',
                                                    exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Revision de Bandeja')
                                                }]
                                            }}

                                            title="Revision de Bandeja"
                                        />
                                    )
                                case "Otros con Fecha de Trabajo":
                                    return (
                                        <MaterialTable columns={columnasVis} data={data14}
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
                                                        setAnalisisEliminar(FilasSeleccionadas14);
                                                        abrirCerrarModalEliminar();
                                                    },
                                                },
                                                {
                                                    icon: () => <Edit />,
                                                    tooltip: "Editar analisis",
                                                    onClick: (e, data) => {
                                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas14[0].idCliente));
                                                        abrirCerrarModalEditar();
                                                    },
                                                },
                                            ]}

                                            onRowClick={((evt, analisisSeleccionado) => {
                                                setAnalisisSeleccionado(analisisSeleccionado)
                                                setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.id));
                                                abrirCerrarModalEditar();
                                            })}
                                            onSelectionChange={(filas) => {
                                                setFilasSeleccionadas14(filas);
                                                if (filas.length > 0)
                                                    setAnalisisSeleccionado(filas[0]);
                                            }
                                            }
                                            options={{
                                                sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                                columnsButton: false, showSelectAllCheckbox: false,
                                                rowStyle: rowData => ({
                                                    backgroundColor: (analisisSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                                                    whiteSpace: "nowrap"
                                                }),
                                                exportMenu: [{
                                                    label: 'Export PDF',
                                                    exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de analisis')
                                                }, {
                                                    label: 'Export CSV',
                                                    exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de analisis')
                                                }]
                                            }}

                                            title="Otros con Fecha de Trabajo"
                                        />
                                    )
                                case "Otros sin Fecha de Trabajo":
                                    return (
                                        <MaterialTable columns={columnasVis} data={data15}
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
                                                        setAnalisisEliminar(FilasSeleccionadas15);
                                                        abrirCerrarModalEliminar();
                                                    },
                                                },
                                                {
                                                    icon: () => <Edit />,
                                                    tooltip: "Editar analisis",
                                                    onClick: (e, data) => {
                                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas15[0].idCliente));
                                                        abrirCerrarModalEditar();
                                                    },
                                                },
                                            ]}

                                            onRowClick={((evt, analisisSeleccionado) => {
                                                setAnalisisSeleccionado(analisisSeleccionado)
                                                setAnalisisEditar(analisis.filter(analisi => analisi.id === analisisSeleccionado.id));
                                                abrirCerrarModalEditar();
                                            })}
                                            onSelectionChange={(filas) => {
                                                setFilasSeleccionadas15(filas);
                                                if (filas.length > 0)
                                                    setAnalisisSeleccionado(filas[0]);
                                            }
                                            }
                                            options={{
                                                sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                                columnsButton: false, showSelectAllCheckbox: false,
                                                rowStyle: rowData => ({
                                                    backgroundColor: (analisisSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                                                    whiteSpace: "nowrap"
                                                }),
                                                exportMenu: [{
                                                    label: 'Export PDF',
                                                    exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de analisis')
                                                }, {
                                                    label: 'Export CSV',
                                                    exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de analisis')
                                                }]
                                            }}

                                            title="Otros sin Fecha de Trabajo"
                                        />
                                    )
                            }
                        })
                        }
                    </div>
                </div>
            </div>

            <Modal
                open={modalInsertar}
                onClose={abrirCerrarModalInsertar}>
                {bodyInsertar}
            </Modal>

            <Modal
                open={modalInsertar1}
                onClose={abrirCerrarModalInsertar1}>
                {bodyInsertar1}
            </Modal>

            <Modal
                open={modalInsertarOperario}
                onClose={abrirCerrarModalInsertarOperario}>
                {bodyInsertarOperario}
            </Modal>

            <Modal
                open={modalInsertarAerobio}
                onClose={abrirCerrarModalInsertarAerobio}>
                {bodyInsertarAerobio}
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

            <Modal
                open={modalEditar1}
                onClose={abrirCerrarModalEditar1}>
                {bodyEditar1}
            </Modal>

            <Modal
                open={modalEditarOperario}
                onClose={abrirCerrarModalEditarOperario}>
                {bodyEditarOperario}
            </Modal>

            <Modal
                open={modalEditarAerobio}
                onClose={abrirCerrarModalEditarAerobio}>
                {bodyEditarAerobio}
            </Modal>

        </div>
    );

}

export default Visualizacion;