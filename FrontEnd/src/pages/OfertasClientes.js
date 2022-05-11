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


const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};


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


function OfertasClientes() {

    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);



    const [ofertaSeleccionada, setOfertaSeleccionada] = useState({
        id: 0,
        codigoCliente: '',
        numero: 0,
        articulo: '',
        cantidad: 0,
        precio: 0,
        stockMin: 0,
        stockMax: 0,
        consumidos: 0,
        faltaEntrega: 0,
        idCliente: 0,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);

    const [OfertaEliminar, setOfertaEliminar] = useState([]);

    const [clientes, setClientes] = useState([]);
    const [clientesTable, setClientesTable] = useState({});

    const [articulos, setArticulos] = useState([]);

    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFinalizacion, setFechaFinalizacion] = useState("");

    const [data, setData] = useState([]);

    const styles = useStyles();

    const columnas = [

        //Visibles
        { title: 'CodigoCliente', field: 'codigoCliente', filterPlaceholder: "Filtrar por codigo cliente" },
        { title: 'NumeroOferta', field: 'numeroOferta', filterPlaceholder: "Filtrar por numero oferta" },
        { title: 'Articulo', field: 'articulo', filterPlaceholder: "Filtrar por Articulo" },
        { title: 'Cantidad', field: 'cantidad', filterPlaceholder: "Filtrar por Cantidad" },
        { title: 'Precio', field: 'precio', filterPlaceholder: "Filtrar por Precio" },
        { title: 'StockMin', field: 'stockMin', filterPlaceholder: "Filtrar por teléfono" },
        { title: 'StockMax', field: 'stockMax', filterPlaceholder: "Filtrar por movil" },
        { title: 'Consumidos', field: 'consumidos', filterPlaceholder: "Filtrar por email" },
        { title: 'FaltaEntregar', field: 'faltaEntregar', filterPlaceholder: "Filtrar por email" },


        //Ocultas
        { title: 'IdCliente', field: 'idcliente', hidden: true },
        { title: 'Id', field: 'id', type: 'numeric', filterPlaceholder: "Filtrar por Id", hidden: true, },

    ];
    const getOfertas = async () => {
        axios.get("/ofertasclientes", token).then(response => {
            setData(response.data.data)
        })
    }

    const getClientes = async () => {
        axios.get("/cliente", token).then(response => {
            const cliente = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setClientes(cliente);
        }, [])
    }

    const getArticulos = async () => {
        axios.get("/articulos", token).then(response => {
            const articulo = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setArticulos(articulo);
        }, [])
    }

    useEffect(() => {
        getOfertas();
        getClientes();
        getArticulos();
    }, [])

    useEffect(() => {
        const lookupClientes = {};
        clientes.map(fila => lookupClientes[fila.id] = fila.codigo);
        setClientesTable(lookupClientes);
        console.log("clientesTable " + JSON.stringify(clientesTable) )
    },[clientes])

    const peticionPost = async () => {
        ofertaSeleccionada.id = null;
        await axios.post("/ofertasclientes", ofertaSeleccionada, token)
            .then(response => {
                //setData(data.concat(response.data));
                abrirCerrarModalInsertar();
                getOfertas();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPut = async () => {
        console.log(ofertaSeleccionada)
        await axios.put("/ofertasclientes?id=" + ofertaSeleccionada.id, ofertaSeleccionada, token)
            .then(response => {
                var ofertaModificada = data;
                ofertaModificada.map(oferta => {
                    if (oferta.id === ofertaSeleccionada.id) {
                        oferta = ofertaSeleccionada
                    }
                });
                getOfertas();
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionDelete = async () => {
        var i = 0;
        while (i < OfertaEliminar.length) {
            await axios.delete("/ofertasclientes/" + OfertaEliminar[i].id, token)
                .then(response => {
                    getOfertas();
                    abrirCerrarModalEliminar();
                }).catch(error => {
                    console.log(error);
                })
            i++;
        }
    }

    //Modales
    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }


    const handleChange = e => {
        const { name, value } = e.target;
        setOfertaSeleccionada(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const bodyInsertar = (
        <div className={styles.modal}>
            <h3>Agregar Nueva Oferta</h3>
            <div className="row g-3">
                <div className="col-md-6">
                    <Autocomplete
                        disableClearable={true}
                        id="CodigoCliente"
                        options={clientes}
                        getOptionLabel={option => option.codigo}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="CodigoCliente" name="codigoCliente" />}
                        onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                            ...prevState,
                            idCliente: value.id
                        }))}
                    />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="NumeroOferta" name="numero" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <Autocomplete
                        disableClearable={true}
                        id="Articulos"
                        options={articulos}
                        getOptionLabel={option => option.codigoArticulo}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="articulos" name="articulos" />}
                        onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                            ...prevState,
                            idArticulo: value.id
                        }))}
                    />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Cantidad" name="cantidad" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Precio" name="precio" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="StockMin" name="stockMin" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="StockMax" name="stockMax" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Consumidos" name="consumidos" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="FaltaEntregar" name="faltaEntregar" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <TextField
                        id="fechainicio"
                        label="Fecha Inicio"
                        type="date"
                        name="fechaInicio"
                        sx={{ width: 220 }}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="col-md-6">
                    {/* Fecha prevista */}
                    <TextField
                        id="fechafinalizacion"
                        label="Fecha finalizacion"
                        type="date"
                        name="fechaFinalizacion"
                        sx={{ width: 220 }}
                        onChange={(e) => setFechaFinalizacion(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
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
            <h3>Editar Oferta</h3>
            <div className="row g-3">
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="CodigoCliente" name="codigoCliente" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.codigoCliente} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Numero" name="numero" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.numero} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Articulo" name="articulo" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.articulo} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Cantidad" name="cantidad" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.cantidad} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Precio" name="precio" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.precio} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="StockMin" name="stockMin" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.stockMin} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="StockMax" name="stockMax" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.stockMax} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Consumidos" name="consumidos" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.consumidos} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="FaltaEntregar" name="faltaentregar" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.faltaEntrega} />
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
            <p>Estás seguro que deseas eliminar la oferta ? </p>
            <div align="right">
                <Button color="secondary" onClick={() => peticionDelete()}>Sí</Button>
                <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>

            </div>
        </div>
    )



    return (
        <div>
            <MaterialTable columns={columnas} data={data}
                localization={{
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
                }}
                actions={[
                    {
                        icon: () => <AddCircle style={{ fill: "green" }} />,
                        tooltip: "Añadir Oferta",
                        isFreeAction: true,
                        onClick: (e, data) => {
                            abrirCerrarModalInsertar()
                        },
                    },
                    {
                        icon: () => <RemoveCircle style={{ fill: "red" }} />,
                        tooltip: "Eliminar Oferta",
                        onClick: (event, rowData) => {
                            setOfertaEliminar(FilasSeleccionadas);
                            abrirCerrarModalEliminar()
                        },
                    },
                    {
                        icon: () => <Edit />,
                        tooltip: "Editar Oferta",
                        onClick: (e, data) => {
                            abrirCerrarModalEditar();
                        },
                    },
                ]}

                onRowClick={((evt, ofertaSeleccionada) => setOfertaSeleccionada(ofertaSeleccionada.tableData.id))}
                onSelectionChange={(filas) => {
                    setFilasSeleccionadas(filas);

                    setOfertaSeleccionada(filas[0]);
                }
                }
                options={{
                    sorting: true, paging: true, pageSizeOptions: [5, 10, 20, 50, 100, 200], pageSize: 10, filtering: true, search: false, selection: true,
                    columnsButton: true,
                    rowStyle: rowData => ({
                        backgroundColor: (ofertaSeleccionada === rowData.tableData.id) ? '#EEE' : '#FFF',
                        whiteSpace: "nowrap"
                    }),

                    exportMenu: [{
                        label: 'Export PDF',
                        exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Ofertas')
                    }, {
                        label: 'Export CSV',
                        exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Ofertas')
                    }]
                }}

                title="Listado de Ofertas"
            />
            <Modal
                open={modalInsertar}
                onClose={abrirCerrarModalInsertar}>
                {bodyInsertar}
            </Modal>

            <Modal
                open={modalEditar}
                onClose={abrirCerrarModalEditar}>
                {bodyEditar}
            </Modal>

            <Modal
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}>
                {bodyEliminar}
            </Modal>
        </div>
    )
}

export default OfertasClientes;