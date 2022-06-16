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


function ConsumoArticulos() {

    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);



    const [consumoSeleccionado, setConsumoSeleccionado] = useState({
        id: 0,
        codigoCliente: 0,
        oferta: 0,
        producto: 0,
        cantidad: 0,
        precio: 0,
        stockMin: 0,
        stockMax: 0,
        consumidos: 0,
        faltaEntregar: 0,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);

    const [ConsumoEliminar, setConsumoEliminar] = useState([]);

    const [data, setData] = useState([]);

    const [clientes, setClientes] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [productos, setProductos] = useState([]);

    const [clienteEditar, setClienteEditar] = useState([]);
    const [ofertaEditar, setOfertaEditar] = useState([]);
    const [productoEditar, setProductoEditar] = useState([]);

    const styles = useStyles();

    const columnas = [

        //Visibles
        { title: 'CodigoCliente', field: 'codigoCliente', filterPlaceholder: "Filtrar por codigo cliente" },
        { title: 'Oferta', field: 'oferta', filterPlaceholder: "Filtrar por numero oferta" },
        { title: 'Producto', field: 'producto', filterPlaceholder: "Filtrar por producto" },
        { title: 'DescripcionProducto', field: 'descripcionProducto', hidden: true },
        { title: 'Cantidad', field: 'cantidad', filterPlaceholder: "Filtrar por Cantidad" },
        { title: 'Precio', field: 'precio', filterPlaceholder: "Filtrar por precio" },
        { title: 'StockMin', field: 'stockMin', filterPlaceholder: "Filtrar por stockMin" },
        { title: 'StockMax', field: 'stockMax', filterPlaceholder: "Filtrar por stockMax" },
        { title: 'Consumidos', field: 'consumidos', filterPlaceholder: "Filtrar por Consumidos" },
        { title: 'FaltaEntregar', field: 'faltaEntregar', filterPlaceholder: "Filtrar por FaltaEntregar" },

    ];


    const getConsumos = async () => {
        axios.get("/consumos", token).then(response => {
            setData(response.data.data)
        })
    }

    const getClientes = async () => {
        axios.get("/cliente", token).then(response => {
            const cliente = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setClientes(cliente);
        }, [])
    }

    const getProductos = async () => {
        axios.get("/productos", token).then(response => {
            const producto = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setProductos(producto);
        }, [])
    }

    const getOfertas = async () => {
        axios.get("/ofertasclientes", token).then(response => {
            const oferta = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setOfertas(oferta);
        }, [])
    }

    useEffect(() => {
        getConsumos();
        getClientes();
        getOfertas();
        getProductos();
    }, [])

    const peticionPost = async () => {
        consumoSeleccionado.id = null;
        await axios.post("/consumos", consumoSeleccionado, token)
            .then(response => {
                //setData(data.concat(response.data));
                abrirCerrarModalInsertar();
                getConsumos();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPut = async () => {
        await axios.put("/consumos?id=" + consumoSeleccionado.id, consumoSeleccionado, token)
            .then(response => {
                var consumoModificado = data;
                consumoModificado.map(consumo => {
                    if (consumo.id === consumoSeleccionado.id) {
                        consumo = consumoSeleccionado
                    }
                });
                getConsumos();
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionDelete = async () => {
        var i = 0;
        while (i < ConsumoEliminar.length) {
            await axios.delete("/consumos/" + ConsumoEliminar[i].id, token)
                .then(response => {
                    getConsumos();
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
        setConsumoSeleccionado(prevState => ({
            ...prevState,
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        }));
    }

    const bodyInsertar = (
        <div className={styles.modal}>
            <h3>Agregar Nuevo Consumo</h3>
            <div className="row g-3">
                <div className="col-md-6">
                    <Autocomplete
                        disableClearable={true}
                        id="CodigoCliente"
                        options={clientes}
                        getOptionLabel={option => option.codigo}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} type="number" label="CodigoCliente" name="codigoCliente" />}
                        onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                            ...prevState,
                            codigoCliente: parseInt(value.codigo)
                        }))}
                    />
                </div>
                <div className="col-md-6">
                    <Autocomplete
                        disableClearable={true}
                        id="Oferta"
                        options={ofertas}
                        getOptionLabel={option => option.numeroOferta}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} type="number" label="Oferta" name="oferta" />}
                        onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                            ...prevState,
                            oferta: parseInt(value.numeroOferta)
                        }))}
                    />
                </div>
                <div className="col-md-6">
                    <Autocomplete
                        disableClearable={true}
                        id="producto"
                        options={productos}
                        getOptionLabel={option => option.codigoProducto}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} type="number" label="Producto" name="producto" />}
                        onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                            ...prevState,
                            producto: parseInt(value.codigoProducto)
                        }))}
                    />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} type="number" label="Cantidad" name="cantidad" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} type="number" label="Precio" name="precio" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} type="number" label="StockMin" name="stockMin" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} type="number" label="StockMax" name="stockMax" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} type="number" label="Consumidos" name="consumidos" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} type="number" label="FaltaEntregar" name="faltaEntregar" onChange={handleChange} />
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
            <h3>Editar Consumo</h3>
            <div className="row g-3">
                <div className="col-md-6">
                    <Autocomplete
                        disableClearable={true}
                        id="CodigoCliente"
                        options={clientes}
                        getOptionLabel={option => option.codigo}
                        defaultValue={clienteEditar[0]}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} type="number" label="CodigoCliente" name="codigoCliente" />}
                        onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                            ...prevState,
                            codigoCliente: parseInt(value.codigo)
                        }))}
                    />
                </div>
                <div className="col-md-6">
                    <Autocomplete
                        disableClearable={true}
                        id="Oferta"
                        options={ofertas}
                        getOptionLabel={option => option.numeroOferta}
                        defaultValue={ofertaEditar[0]}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} type="number" label="Oferta" name="oferta" />}
                        onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                            ...prevState,
                            oferta: parseInt(value.numeroOferta)
                        }))}
                    />
                </div>
                <div className="col-md-6">
                    <Autocomplete
                        disableClearable={true}
                        id="producto"
                        options={productos}
                        getOptionLabel={option => option.codigoProducto}
                        defaultValue={productoEditar[0]}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} type="number" label="Producto" name="producto" />}
                        onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                            ...prevState,
                            producto: parseInt(value.codigoProducto)
                        }))}
                    />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} type="number" label="Cantidad" name="cantidad" onChange={handleChange} value={consumoSeleccionado && consumoSeleccionado.cantidad} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} type="number" label="Precio" name="precio" onChange={handleChange} value={consumoSeleccionado && consumoSeleccionado.precio} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} type="number" label="StockMin" name="stockMin" onChange={handleChange} value={consumoSeleccionado && consumoSeleccionado.stockMin} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} type="number" label="StockMax" name="stockMax" onChange={handleChange} value={consumoSeleccionado && consumoSeleccionado.stockMax} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} type="number" label="Consumidos" name="consumidos" onChange={handleChange} value={consumoSeleccionado && consumoSeleccionado.consumidos} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} type="number" label="FaltaEntregar" name="faltaEntregar" onChange={handleChange} value={consumoSeleccionado && consumoSeleccionado.faltaEntregar} />
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
            <p>Estás seguro que deseas eliminar el consumo ? </p>
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
                        tooltip: "Añadir Consumo",
                        isFreeAction: true,
                        onClick: (e, data) => {
                            abrirCerrarModalInsertar()
                        },
                    },
                    {
                        icon: () => <RemoveCircle style={{ fill: "red" }} />,
                        tooltip: "Eliminar Consumo",
                        onClick: (event, rowData) => {
                            setConsumoEliminar(FilasSeleccionadas);
                            abrirCerrarModalEliminar()
                        },
                    },
                    {
                        icon: () => <Edit />,
                        tooltip: "Editar Consumo",
                        onClick: (e, data) => {
                            getConsumos();
                            setClienteEditar(clientes.filter(cliente => cliente.codigo === FilasSeleccionadas[0].codigoCliente))
                            setOfertaEditar(ofertas.filter(oferta => oferta.numeroOferta === FilasSeleccionadas[0].oferta))
                            setProductoEditar(productos.filter(producto => producto.codigoProducto === FilasSeleccionadas[0].producto))
                            abrirCerrarModalEditar();
                        },
                    },
                ]}

                onRowClick={((evt, consumoSeleccionado) => setConsumoSeleccionado(consumoSeleccionado.tableData.id))}
                onSelectionChange={(filas) => {
                    setFilasSeleccionadas(filas);
                    setConsumoSeleccionado(filas[0]);
                }
                }
                options={{
                    sorting: true, paging: true, pageSizeOptions: [5, 10, 20, 50, 100, 200], pageSize: 10, filtering: true, search: false, selection: true,
                    columnsButton: true,
                    rowStyle: rowData => ({
                        backgroundColor: (consumoSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                        whiteSpace: "nowrap"
                    }),

                    exportMenu: [{
                        label: 'Export PDF',
                        exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Consumos')
                    }, {
                        label: 'Export CSV',
                        exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Consumos')
                    }]
                }}

                title="Listado de Consumos"
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

export default ConsumoArticulos;