import React, { useState, useEffect } from "react";
import MaterialTable from '@material-table/core';
import axios from "axios";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import { Modal, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { axiosOptions } from '../api/apiBackend';


const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};


const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 800,
        height: 425,
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


function ModoEnvio() {

    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);

    const [envioSeleccionado, setEnvioSeleccionado] = useState({
        id: 0,
        nombre: '',
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);

    const [EnvioEliminar, setEnvioEliminar] = useState([]);

    const [data, setData] = useState([]);

    const styles = useStyles();

    const columnas = [

        //Visibles
        { title: 'Nombre', field: 'nombre', filterPlaceholder: "Filtrar por nombre"}

    ];

    const getEnvios = async () => {
        axios.get("http://172.26.0.169:44343/api/modoenvio", axiosOptions).then(response => {
            setData(response.data.data)
        })
    }

    useEffect(() => {
        getEnvios();
    }, [])

    const peticionPost = async () => {
        envioSeleccionado.id = null;
        await axios.post("http://172.26.0.169:44343/api/modoenvio", envioSeleccionado, axiosOptions)
            .then(response => {
                abrirCerrarModalInsertar();
                getEnvios();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPut = async () => {
        await axios.put("http://172.26.0.169:44343/api/modoenvio?id=" + envioSeleccionado.id, envioSeleccionado, axiosOptions)
            .then(response => {
                var envioModificado = data;
                envioModificado.map(envio => {
                    if (envio.id === envioSeleccionado.id) {
                        envio = envioSeleccionado
                    }
                });
                getEnvios();
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionDelete = async () => {
        var i = 0;
        while (i < EnvioEliminar.length) {
            await axios.delete("http://172.26.0.169:44343/api/modoenvio/" + EnvioEliminar[i].id, axiosOptions)
                .then(response => {
                    getEnvios();
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
        setEnvioSeleccionado(prevState => ({
            ...prevState,
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        }));
    }

    const bodyInsertar = (
        <div className={styles.modal}>
            <h3>Agregar Nuevo Modo Envio</h3>
            <br/>
            <div className="row g-3">
                <div className="col-md-12">
                    <h5> Nombre </h5>
                    <TextField className={styles.inputMaterial} name="nombre" onChange={handleChange} />
                </div>
            </div>
            <br/>
            <div align="right">
                <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
                <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEditar = (
        <div className={styles.modal}>
            <h3> Modo Envio </h3>
            <br/>
            <div className="row g-3">
                <div className="col-md-12">
                    <h5> Nombre </h5>
                    <TextField className={styles.inputMaterial} name="nombre" onChange={handleChange} value={envioSeleccionado && envioSeleccionado.nombre} />
                </div>
            </div>
            <br/>
            <div align="right">
                <Button color="primary" onClick={() => peticionPut()}>Guardar</Button>
                <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEliminar = (
        <div className={styles.modal}>
            <p>Estás seguro que deseas eliminar el modo de envio ? </p>
            <div align="right">
                <Button color="secondary" onClick={() => peticionDelete()}>Sí</Button>
                <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
            </div>
        </div>
    )

    return (
        <div>
            <MaterialTable columns={columnas} data={data}
                localization={localization}
                actions={[
                    {
                        icon: () => <AddCircle style={{ fill: "green" }} />,
                        tooltip: "Añadir Modo de Envio",
                        isFreeAction: true,
                        onClick: (e, data) => {
                            abrirCerrarModalInsertar()
                        },
                    },
                    {
                        icon: () => <RemoveCircle style={{ fill: "red" }} />,
                        tooltip: "Eliminar Modo de Envio",
                        onClick: (event, rowData) => {
                            setEnvioEliminar(FilasSeleccionadas);
                            abrirCerrarModalEliminar()
                        },
                    },
                ]}

                onRowClick={((evt, envioSeleccionado) => {
                    setEnvioSeleccionado(envioSeleccionado)
                    getEnvios();
                    abrirCerrarModalEditar();
                })}
                
                onSelectionChange={(filas) => {
                    setFilasSeleccionadas(filas);

                    if (filas.length > 0) {
                        setEnvioSeleccionado(filas[0]);
                    }
                }}

                options={{
                    sorting: true, paging: true, pageSizeOptions: [5, 10, 20, 50, 100, 200], pageSize: 10, filtering: true, search: false, selection: true,
                    columnsButton: true, showSelectAllCheckbox: false,
                    rowStyle: rowData => ({
                        backgroundColor: (envioSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                        whiteSpace: "nowrap"
                    }),

                    exportMenu: [{
                        label: 'Export PDF',
                        exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Modos de Envios')
                    }, {
                        label: 'Export CSV',
                        exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Modos de Envios')
                    }]
                }}

                title="Listado de Modos de Envios"
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

export default ModoEnvio;