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
        idCliente: 0,
        numero: '',
        articulo: '',
        cantidad: '',
        precio: '',
        stockMin: '',
        stockMax: 0,
        consumidos: '',
        faltaEntrega: '',
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

    const [data, setData] = useState([]);

    const styles = useStyles();

    const columnas = [

        //Visibles
        { title: 'CodigoCliente', field: 'codigoCliente', filterPlaceholder: "Filtrar por codigo cliente" },
        { title: 'NumeroOferta', field: 'numeroOferta', filterPlaceholder: "Filtrar por numero oferta" },
        { title: 'Articulo', field: 'articulo', filterPlaceholder: "Filtrar por Articulo" },
        { title: 'Cantidad', field: 'cantidad', filterPlaceholder: "Filtrar por Cantidad" },

        { title: 'StockMin', field: 'stockMin', filterPlaceholder: "Filtrar por teléfono" },
        { title: 'StockMax', field: 'stockMax', filterPlaceholder: "Filtrar por movil" },
        { title: 'Consumidos', field: 'consumidos', filterPlaceholder: "Filtrar por email" },
        { title: 'FaltaEntrega', field: 'faltaEntrega', filterPlaceholder: "Filtrar por email" },
    ];


    const getOfertas = async () => {
        axios.get("/ofertasclientes", token).then(response => {
            setData(response.data.data)
        })
    }

    useEffect(() => {
        getOfertas();
    }, [])

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
                    <TextField className={styles.inputMaterial} label="NumeroOferta" name="numeroOferta" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Articulo" name="articulo" onChange={handleChange} />
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
                        onChange={(e) => setfechainicio(e.target.value)}
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
                        onChange={(e) => setfechafinalizacion(e.target.value)}
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
                        tooltip: "Editar Cliente",
                        onClick: (e, data) => {
                            setComarcaClienteEditar(comarca.filter(comarca => comarca.id === FilasSeleccionadas[0].comarca));
                            setProvinciaClienteEditar(provincia.filter(provincia => provincia.id === FilasSeleccionadas[0].provincia));
                            setPoblacionClienteEditar(poblacion.filter(poblacion => poblacion.id === FilasSeleccionadas[0].poblacion));
                            abrirCerrarModalEditar();
                        },
                    },
                ]}

                onRowClick={((evt, clienteSeleccionado) => setClienteSeleccionado(clienteSeleccionado.tableData.id))}
                onSelectionChange={(filas) => {
                    setFilasSeleccionadas(filas);

                    setClienteSeleccionado(filas[0]);
                }
                }
                options={{
                    sorting: true, paging: true, pageSizeOptions: [5, 10, 20, 50, 100, 200], pageSize: 10, filtering: true, search: false, selection: true,
                    columnsButton: true,
                    rowStyle: rowData => ({
                        backgroundColor: (clienteSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
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
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}>
                {bodyEliminar}

            </Modal>
        </div>
    )
}

export default OfertasClientes;