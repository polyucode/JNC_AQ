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

    const [modalEditar, setModalEditar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);

    const [confParametrosElementoPlantaCliente, setConfParametrosElementoPlantaCliente] = useState([]);

    const [parametrosAnalisisPlanta, setParametrosAnalisisPlanta] = useState([]);

    const [analisisSeleccionado, setAnalisisSeleccionado] = useState({

        id: 0,
        periodo: null,
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

    const [oferta, setOferta] = useState([]);

    const [clientes, setClientes] = useState([]);

    const [elemento, setElemento] = useState([]);

    const [analisis, setAnalisis] = useState([]);
    const [analisisTable, setAnalisisTable] = useState({});

    const [periodo, setPeriodo] = useState("");
    const [fecha, setFecha] = useState("");


    const [actualState, changeCheckState] = useState(false);
    const [actualState2, changeActualState] = useState(false);

    const columnas = [

        //visibles
        { title: 'Periodo', field: 'periodo', type: 'date', filterPlaceholder: "Filtrar por periodo" },
        { title: 'Fecha', field: 'fecha', type: 'date', filterPlaceholder: "Filtrar por fecha" },
        { title: 'Realizado', field: 'realizado', type: 'boolean' },
        { title: 'Operario', field: 'operario', filterPlaceholder: "Filtrar por operario" },
        { title: 'Protocolo', field: 'protocolo' },
        { title: 'Observaciones', field: 'observaciones' },
        { title: 'Facturado', field: 'facturado', type: 'boolean' }
    ];

    const [data, setData] = useState([]);

    const styles = useStyles();

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setAnalisisSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleChangeCheckbox = e => {
        changeCheckState(e.target.checked)
        console.log(e.target.checked)
    }

    const handleChangeCheckbox2 = e => {
        changeActualState(e.target.checked)
        console.log(e.target.checked)
    }

    const bodyInsertar = (
        <div className={styles.modal}>
            <h3>Agregar Nuevo Analisis</h3>
            <div className="row g-4">
                <div className="col-md-4">
                    <TextField
                        id="periodo"
                        label="Periodo"
                        type="date"
                        name="periodo"
                        sx={{ width: 220 }}
                        onChange={handleChangeInput}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="col-md-6">
                    <TextField
                        id="fecha"
                        label="Fecha"
                        type="date"
                        name="fecha"
                        format="mm-yy"
                        sx={{ width: 220 }}
                        onChange={handleChangeInput}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="col-md-6">
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} checked={actualState} label="Realizado" name="realizado" onChange={handleChangeCheckbox} />
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
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} checked={actualState2} label="Facturado" name="facturado" onChange={handleChangeCheckbox2} />
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
                    <TextField
                        id="periodo"
                        label="Periodo"
                        type="date"
                        name="periodo"
                        sx={{ width: 220 }}
                        onChange={(e) => setPeriodo(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
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

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
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

    const GetParametrosAnalisisPlanta = async () => {
        axios.get("/parametrosanalisisplanta", token).then(response => {
            setData(response.data.data)
        })
    }

    useEffect(() => {
        const lookupAnalisis = {};
        analisis.map(fila => lookupAnalisis[fila.id] = fila.nombre);
        setAnalisisTable(lookupAnalisis);

        GetParametrosAnalisisPlanta();
        GetOfertas();
        GetClientes();
        GetAnalisis();
        GetElementos();
    }, [analisis])

    const peticionPost = async () => {
        analisisSeleccionado.id = null;
        console.log(analisisSeleccionado)
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
        <div className="home-container">
            <h4> Visualizacion de datos </h4>
            <div className="datos">
                <Autocomplete
                    disableClearable={true}
                    id="Cliente"
                    options={clientes}
                    getOptionLabel={option => option.codigo}
                    sx={{ width: 250 }}
                    renderInput={(params) => <TextField {...params} label="CodigoCliente" name="codigoCliente" />}
                    onChange={(event, value) => setAnalisisSeleccionado(prevState => ({
                        ...prevState,
                        codigoCliente: parseInt(value.codigo)
                    }))}
                />
                <Autocomplete
                    disableClearable={true}
                    id="Oferta"
                    options={oferta}
                    getOptionLabel={option => option.numeroOferta}
                    sx={{ width: 250 }}
                    renderInput={(params) => <TextField {...params} label="Oferta" name="oferta" />}
                    onChange={(event, value) => setAnalisisSeleccionado(prevState => ({
                        ...prevState,
                        oferta: value.numeroOferta
                    }))}
                />
                <Autocomplete
                    disableClearable={true}
                    id="Elemento"
                    options={elemento}
                    getOptionLabel={option => option.nombre}
                    sx={{ width: 250 }}
                    renderInput={(params) => <TextField {...params} label="Elemento" name="Elemento" />}
                    onChange={(event, value) => setAnalisisSeleccionado(prevState => ({
                        ...prevState,
                        idElemento: value.id
                    }))}
                />
            </div>
            <br/>
            <div className='home-container-elements'>
                <div className="home-col-1">
                    <div className="home-diagrama">
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
                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas[0].id));
                                        abrirCerrarModalEditar();
                                    },
                                },
                            ]}

                            onRowClick={((evt, analisisSeleccionado) => setAnalisisSeleccionado(analisisSeleccionado.tableData.id))}
                            onSelectionChange={(filas) => {
                                console.log(FilasSeleccionadas)
                                setFilasSeleccionadas(filas);
                                if (filas.length > 0)
                                    setAnalisisSeleccionado(filas[0]);
                            }
                            }
                            options={{
                                sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                columnsButton: false,
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

                            title="Fisico Quimico"
                        />
                    </div>
                    <div className="home-tabla-parametros-elemento">
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
                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas[0].idCliente));
                                        abrirCerrarModalEditar();
                                    },
                                },
                            ]}

                            //onRowClick={((evt, analisisSeleccionado) => setAnalisisSeleccionado(analisisSeleccionado.tableData.id))}
                            onSelectionChange={(filas) => {
                                console.log(FilasSeleccionadas)
                                setFilasSeleccionadas(filas);
                                if (filas.length > 0)
                                    setAnalisisSeleccionado(filas[0]);
                            }
                            }
                            options={{
                                sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                columnsButton: false,
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

                            title="Legionela"
                        />
                    </div>
                </div>
                <div className="home-col-2">
                    <div className='home-calendario-mantenimiento'>
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
                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas[0].idCliente));
                                        abrirCerrarModalEditar();
                                    },
                                },
                            ]}

                            onRowClick={((evt, analisisSeleccionado) => setAnalisisSeleccionado(analisisSeleccionado.tableData.id))}
                            onSelectionChange={(filas) => {
                                console.log(FilasSeleccionadas)
                                setFilasSeleccionadas(filas);
                                if (filas.length > 0)
                                    setAnalisisSeleccionado(filas[0]);
                            }
                            }
                            options={{
                                sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                columnsButton: false,
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

                            title="Aerobios"
                        />
                    </div>
                    <div className='home-grafico'>
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
                                        setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas[0].idCliente));
                                        abrirCerrarModalEditar();
                                    },
                                },
                            ]}

                            onRowClick={((evt, analisisSeleccionado) => setAnalisisSeleccionado(analisisSeleccionado.tableData.id))}
                            onSelectionChange={(filas) => {
                                console.log(FilasSeleccionadas)
                                setFilasSeleccionadas(filas);
                                if (filas.length > 0)
                                    setAnalisisSeleccionado(filas[0]);
                            }
                            }
                            options={{
                                sorting: true, paging: true, pageSizeOptions: [5, 8, 10, 15, 20], pageSize: 8, filtering: false, search: false, selection: true,
                                columnsButton: false,
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

                            title="Aguas Residuales"
                        />
                    </div>
                </div>
                        
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

export default Visualizacion;