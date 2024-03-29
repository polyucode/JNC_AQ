import React, { useState, useEffect } from "react";
import MaterialTable from '@material-table/core';
import axios from "axios";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import { Modal, TextField, Button } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { MainLayout } from "../layout/MainLayout";


const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};


const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 850,
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

const useStyles2 = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 850,
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
        width: '60%'
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


export const ConsumoArticulosPage = () => {

    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);



    const [consumoSeleccionado, setConsumoSeleccionado] = useState({
        id: 0,
        oferta: 0,
        fecha: null,
        codigoProducto: '',
        cantidad: 0,
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
    const [descripcionEditar, setDescripcionEditar] = useState([]);

    const styles = useStyles();
    const styles2 = useStyles2();

    const columnas = [

        //Visibles
        { title: 'Oferta', field: 'oferta', filterPlaceholder: "Filtrar por numero oferta" },
        { title: 'Fecha', field: 'fecha', type: 'date', filterPlaceholder: "Filtrar por fecha" },
        { title: 'Producto', field: 'codigoProducto', filterPlaceholder: "Filtrar por producto" },
        { title: 'Cantidad', field: 'cantidad', filterPlaceholder: "Filtrar por Cantidad" }
    ];


    const getConsumos = async () => {
        axios.get("/consumos", token).then(response => {
            setData(response.data.data)
        })
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
        getOfertas();
        getProductos();
    }, [])

    const peticionPost = async () => {
        consumoSeleccionado.id = 0;
        console.log(consumoSeleccionado)
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
            <br />
            <div className="row g-3">
                <div className="col-md-4">
                    <h5> Oferta </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="Oferta"
                        options={ofertas}
                        getOptionLabel={option => option.numeroOferta}
                        sx={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} type="number" name="oferta" />}
                        onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                            ...prevState,
                            oferta: parseInt(value.numeroOferta)
                        }))}
                    />
                </div>
                <div className="col-md-2">
                    {/* Fecha prevista */}
                    <h5> Fecha </h5>
                    <TextField
                        className={styles.inputMaterial}
                        id="fecha"
                        type="date"
                        name="fecha"
                        sx={{ width: 225 }}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="col-md-4">
                    <h5> Producto </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="codigoProducto"
                        options={productos}
                        getOptionLabel={option => option.codigoProducto}
                        sx={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} name="codigoProducto" />}
                        onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                            ...prevState,
                            codigoProducto: value.codigoProducto
                        }))}
                    />
                </div>
                <div className="col-md-3">
                    <h5> Cantidad </h5>
                    <TextField className={styles2.inputMaterial} type="number" name="cantidad" onChange={handleChange} />
                </div>
            </div>
            <br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
                <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEditar = (
        <div className={styles.modal}>
            <h3> Consumo </h3>
            <br />
            <div className="row g-3">
                <div className="col-md-6">
                    <h5> Oferta </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="Oferta"
                        options={ofertas}
                        getOptionLabel={option => option.numeroOferta}
                        defaultValue={ofertaEditar[0]}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} type="number" name="oferta" />}
                        onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                            ...prevState,
                            oferta: parseInt(value.numeroOferta)
                        }))}
                    />
                </div>
                <div className="col-md-2">
                    {/* Fecha prevista */}
                    <h5> Fecha </h5>
                    <TextField
                        className={styles.inputMaterial}
                        id="fecha"
                        type="date"
                        name="fecha"
                        sx={{ width: 225 }}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={consumoSeleccionado && consumoSeleccionado.fecha}
                    />
                </div>
                <div className="col-md-6">
                    <h5> Producto </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="codigoProducto"
                        options={productos}
                        getOptionLabel={option => option.codigoProducto}
                        defaultValue={productoEditar[0]}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} name="codigoProducto" />}
                        onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                            ...prevState,
                            codigoProducto: value.codigoProducto
                        }))}
                    />
                </div>
                <div className="col-md-6">
                    <h5> Cantidad </h5>
                    <TextField className={styles.inputMaterial} type="number" name="cantidad" onChange={handleChange} value={consumoSeleccionado && consumoSeleccionado.cantidad} />
                </div>
            </div>
            <br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPut()}>Guardar</Button>
                <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEliminar = (
        <div className={styles.modal}>
            <h5>Estás seguro que deseas eliminar el consumo ? </h5>
            <br />
            <div align="right">
                <Button color="secondary" onClick={() => peticionDelete()}>Sí</Button>
                <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
            </div>
        </div>
    )



    return (
        <MainLayout title="Consumo de Artículos">
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
                ]}

                onRowClick={((evt, consumoSeleccionado) => {
                    setConsumoSeleccionado(consumoSeleccionado)
                    getConsumos();
                    setOfertaEditar(ofertas.filter(oferta => oferta.numeroOferta === consumoSeleccionado.oferta))
                    setProductoEditar(productos.filter(producto => producto.codigoProducto === consumoSeleccionado.codigoProducto))
                    abrirCerrarModalEditar();
                })}

                onSelectionChange={(filas) => {
                    setFilasSeleccionadas(filas);
                    if (filas.length > 0) {
                        setConsumoSeleccionado(filas[0]);
                    }
                }}

                options={{
                    sorting: true, paging: true, pageSizeOptions: [5, 10, 20, 50, 100, 200], pageSize: 10, filtering: true, search: false, selection: true,
                    columnsButton: true, showSelectAllCheckbox: false,
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
        </MainLayout>
    )
}