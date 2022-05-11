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


function Articulos() {

    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);



    const [articuloSeleccionado, setArticuloSeleccionado] = useState({
        id: 0,
        codigoArticulo: '',
        nombre: '',
        stock: '',
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);

    const [ArticuloEliminar, setArticuloEliminar] = useState([]);

    const [data, setData] = useState([]);

    const styles = useStyles();

    const columnas = [

        //Visibles
        { title: 'CodigoArticulo', field: 'codigArticulo', filterPlaceholder: "Filtrar por codigo articulo" },
        { title: 'Nombre', field: 'nombre', filterPlaceholder: "Filtrar por nombre" },
        { title: 'Stock', field: 'stock', filterPlaceholder: "Filtrar por stock" },

    ];

    const getArticulos = async () => {
        axios.get("/articulos", token).then(response => {
            setData(response.data.data)
        })
    }

    useEffect(() => {
        getArticulos();
    }, [])

    const peticionPost = async () => {
        articuloSeleccionado.id = null;
        await axios.post("/articulos", articuloSeleccionado, token)
            .then(response => {
                //setData(data.concat(response.data));
                abrirCerrarModalInsertar();
                getArticulos();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPut = async () => {
        await axios.put("/articulos?id=" + articuloSeleccionado.id, articuloSeleccionado, token)
            .then(response => {
                var articuloModificado = data;
                articuloModificado.map(articulo => {
                    if (articulo.id === articuloSeleccionado.id) {
                        articulo = articuloSeleccionado
                    }
                });
                getArticulos();
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionDelete = async () => {
        var i = 0;
        while (i < ArticuloEliminar.length) {
            await axios.delete("/articulos/" + ArticuloEliminar[i].id, token)
                .then(response => {
                    getArticulos();
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
        setArticuloSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const bodyInsertar = (
        <div className={styles.modal}>
            <h3>Agregar Nuevo Articulo</h3>
            <div className="row g-3">
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="CodigoArticulo" name="codigoArticulo" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Stock" name="stock" onChange={handleChange} />
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
            <h3>Editar Articulo</h3>
            <div className="row g-3">
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="CodigoArticulo" name="codigoArticulo" onChange={handleChange} value={articuloSeleccionado && articuloSeleccionado.codigoArticulo} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange} value={articuloSeleccionado && articuloSeleccionado.nombre} />
                </div>
                <div className="col-md-6">
                    <TextField className={styles.inputMaterial} label="Stock" name="stock" onChange={handleChange} value={articuloSeleccionado && articuloSeleccionado.stock} />
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
            <p>Estás seguro que deseas eliminar el articulo ? </p>
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
                        tooltip: "Añadir Articulo",
                        isFreeAction: true,
                        onClick: (e, data) => {
                            abrirCerrarModalInsertar()
                        },
                    },
                    {
                        icon: () => <RemoveCircle style={{ fill: "red" }} />,
                        tooltip: "Eliminar Articulo",
                        onClick: (event, rowData) => {
                            setArticuloEliminar(FilasSeleccionadas);
                            abrirCerrarModalEliminar()
                        },
                    },
                    {
                        icon: () => <Edit />,
                        tooltip: "Editar Articulo",
                        onClick: (e, data) => {
                            abrirCerrarModalEditar();
                        },
                    },
                ]}

                onRowClick={((evt, articuloSeleccionado) => setArticuloSeleccionado(articuloSeleccionado.tableData.id))}
                onSelectionChange={(filas) => {
                    setFilasSeleccionadas(filas);

                    setArticuloSeleccionado(filas[0]);
                }
                }
                options={{
                    sorting: true, paging: true, pageSizeOptions: [5, 10, 20, 50, 100, 200], pageSize: 10, filtering: true, search: false, selection: true,
                    columnsButton: true,
                    rowStyle: rowData => ({
                        backgroundColor: (articuloSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                        whiteSpace: "nowrap"
                    }),

                    exportMenu: [{
                        label: 'Export PDF',
                        exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Articulos')
                    }, {
                        label: 'Export CSV',
                        exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Articulos')
                    }]
                }}

                title="Listado de Articulos"
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

export default Articulos;