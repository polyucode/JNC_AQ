/*import React, { useState, useEffect } from "react";
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
        width: 900,
        height: 700,
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


function Entregas() {

    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);

    const [entregaSeleccionada, setEntregaSeleccionada] = useState({
        id: 0,
        codigoCliente: '',
        oferta: 0,
        elemento: '',
        analisis: '',
        descripcion: '',
        entregado: false,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    const [elementos, setElementos] = useState([]);

    const [clientes, setClientes] = useState([]);

    const [analisis, setAnalisis] = useState([]);

    const [ofertas, setOfertas] = useState([]);

    const [confAnalisisNivelesPlantasCliente, setConfAnalisisNivelesPlantasCliente] = useState([]);

    const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);

    const [EntregaEliminar, setEntregaEliminar] = useState([]);

    const [data, setData] = useState([]);

    const styles = useStyles();

    const columnas = [

        //Visibles
        { title: 'CodigoCliente', field: 'codigoCliente', filterPlaceholder: "Filtrar por codigo cliente" },
        { title: 'NombreCliente', field: 'nombreCliente', filterPlaceholder: "Filtrar por nombre cliente" },
        { title: 'Oferta', field: 'oferta', filterPlaceholder: "Filtrar por oferta" },
        { title: 'Elemento', field: 'elemento', filterPlaceholder: "Filtrar por elemento" },
        { title: 'Analisis', field: 'analisis', filterPlaceholder: "Filtrar por analisis" },
        { title: 'Descripcion', field: 'descripcion' },
        { title: 'Entregado', field: 'entregado', filterPlaceholder: "Filtrar por entregado" },

    ];

    const getEntregas = async () => {
        axios.get("/entregas", token).then(response => {
            setData(response.data.data)
        })
    }

    useEffect(() => {
        getEntregas();
    }, [])

    const peticionPost = async () => {
        entregaSeleccionada.id = null;
        await axios.post("/entregas", entregaSeleccionada, token)
            .then(response => {
                abrirCerrarModalInsertar();
                getEntregas();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPut = async () => {
        await axios.put("/entregas?id=" + entregaSeleccionada.id, entregaSeleccionada, token)
            .then(response => {
                var entregaModificada = data;
                entregaModificada.map(entrega => {
                    if (entrega.id === entregaSeleccionada.id) {
                        entrega = entregaSeleccionada
                    }
                });
                getEntregas();
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionDelete = async () => {
        var i = 0;
        while (i < EntregaEliminar.length) {
            await axios.delete("/entregas/" + EntregaEliminar[i].id, token)
                .then(response => {
                    getEntregas();
                    abrirCerrarModalEliminar();
                }).catch(error => {
                    console.log(error);
                })
            i++;
        }
    }


    const GetAnalisis = async () => {
        axios.get("/analisis", token).then(response => {
            const analisi = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setAnalisis(analisi);
        }, [])
    }

    const GetClientes = async () => {
        axios.get("/cliente", token).then(response => {
            const cliente = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setClientes(cliente);
        }, [])
    }

    const GetElementos = async () => {
        axios.get("/elementosplanta", token).then(response => {
            const elemento = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setElementos(elemento);
        }, [])
    }

    const GetOfertas = async () => {
        axios.get("/ofertasclientes", token).then(response => {
            const oferta = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setOfertas(oferta);
        }, [])
    }


    useEffect(() => {
        GetOfertas();
        GetClientes();
        GetElementos();
        GetAnalisis();
    }, [])

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
        setEntregaSeleccionada(prevState => ({
            ...prevState,
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        }));
    }

    const handleChangeCheck = (event, value) => {
        setEntregaSeleccionada(prevState => ({
          ...prevState,
          entregado: value
        }))
      }

    const bodyInsertar = (
        <div className={styles.modal}>
            <h3> Agregar Nueva Entrega </h3>
            <br />
            <div className="row g-3">
                <div className="col-md-6">
                    <h5> Codigo Cliente </h5>
                    <Autocomplete
                        type="number"
                        disableClearable={true}
                        id="CodigoCliente"
                        options={clientes}
                        getOptionLabel={option => parseInt(option.codigo)}
                        sx={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} type="number" name="codigoCliente" />}
                        onChange={(event, value) => setEntregaSeleccionada(prevState => ({
                            ...prevState,
                            codigoCliente: parseInt(value.codigo)
                        }))}
                    />
                </div>
                <div className="col-md-4">
                    <h5> Nombre Cliente </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="NombreCliente"
                        options={clientes}
                        filterOptions={options => clientes.filter(cliente => cliente.codigo === entregaSeleccionada.codigoCliente)}
                        getOptionLabel={option => option.razonSocial}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} name="nombreCliente" />}
                        onChange={(event, value) => setEntregaSeleccionada(prevState => ({
                            ...prevState,
                            nombreCliente: value.razonSocial
                        }))}
                    />
                </div>
                <div className="col-md-12">
                    <h5> Oferta </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="Oferta"
                        options={ofertas}
                        className={styles.inputMaterial}
                        filterOptions={options => ofertas.filter(oferta => oferta.codigoCliente === entregaSeleccionada.codigoCliente)}
                        getOptionLabel={option => option.numeroOferta}
                        sx={{ width: 150 }}
                        renderInput={(params) => <TextField {...params} name="oferta" />}
                        onChange={(event, value) => setEntregaSeleccionada(prevState => ({
                            ...prevState,
                            oferta: value.numeroOferta
                        }))}
                    />
                </div>
                <div className="col-md-12">
                    <h5> Elemento </h5>
                    <Autocomplete
                        disableClearable={true}
                        className={styles.inputMaterial}
                        id="elemento"
                        options={elementos}
                        filterOptions={options => confAnalisisNivelesPlantasCliente.filter(planta => planta.codigoCliente === entregaSeleccionada.codigoCliente && planta.oferta === entregaSeleccionada.oferta)}
                        getOptionLabel={option => option.elemento}
                        sx={{ width: 225 }}
                        renderInput={(params) => <TextField {...params} name="elemento" />}
                        onChange={(event, value) => setEntregaSeleccionada(prevState => ({
                            ...prevState,
                            elemento: value.elemento
                        }))}
                    />
                </div>
                <div className="col-md-12">
                    <h5> Analisis </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="analisis"
                        options={analisis}
                        className={styles.inputMaterial}
                        filterOptions={options => confAnalisisNivelesPlantasCliente.filter(planta => planta.codigoCliente === entregaSeleccionada.codigoCliente && planta.oferta === entregaSeleccionada.oferta && planta.elemento === entregaSeleccionada.elementoPlanta)}
                        getOptionLabel={option => option.analisis}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} name="analisis" />}
                        onChange={(event, value) => setEntregaSeleccionada(prevState => ({
                            ...prevState,
                            analisis: value.analisis
                        }))}
                    />
                </div>
                <div className="col-md-12">
                    <h5> Descripcion </h5>
                    <TextField className={styles.inputMaterial} name="descripcion" onChange={handleChange} />
                </div>
                <div className="col-md-12">
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} label="Entregado" name="entregado" onChange={handleChangeCheck} />
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
            <h3> Entrega </h3>
            <br />
            <div className="row g-3">
                <div className="col-md-6">
                    <h5> Codigo Cliente </h5>
                    <Autocomplete
                        type="number"
                        disableClearable={true}
                        id="CodigoCliente"
                        options={clientes}
                        getOptionLabel={option => parseInt(option.codigo)}
                        sx={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} type="number" name="codigoCliente" />}
                        onChange={(event, value) => setEntregaSeleccionada(prevState => ({
                            ...prevState,
                            codigoCliente: parseInt(value.codigo)
                        }))}
                    />
                </div>
                <div className="col-md-4">
                    <h5> Nombre Cliente </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="NombreCliente"
                        options={clientes}
                        filterOptions={options => clientes.filter(cliente => cliente.codigo === entregaSeleccionada.codigoCliente)}
                        getOptionLabel={option => option.razonSocial}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} name="nombreCliente" />}
                        onChange={(event, value) => setEntregaSeleccionada(prevState => ({
                            ...prevState,
                            nombreCliente: value.razonSocial
                        }))}
                    />
                </div>
                <div className="col-md-12">
                    <h5> Oferta </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="Oferta"
                        options={ofertas}
                        className={styles.inputMaterial}
                        filterOptions={options => ofertas.filter(oferta => oferta.codigoCliente === entregaSeleccionada.codigoCliente)}
                        getOptionLabel={option => option.numeroOferta}
                        sx={{ width: 150 }}
                        renderInput={(params) => <TextField {...params} name="oferta" />}
                        onChange={(event, value) => setEntregaSeleccionada(prevState => ({
                            ...prevState,
                            oferta: value.numeroOferta
                        }))}
                    />
                </div>
                <div className="col-md-12">
                    <h5> Elemento </h5>
                    <Autocomplete
                        disableClearable={true}
                        className={styles.inputMaterial}
                        id="elemento"
                        options={elementos}
                        filterOptions={options => confAnalisisNivelesPlantasCliente.filter(planta => planta.codigoCliente === entregaSeleccionada.codigoCliente && planta.oferta === entregaSeleccionada.oferta)}
                        getOptionLabel={option => option.elemento}
                        sx={{ width: 225 }}
                        renderInput={(params) => <TextField {...params} name="elemento" />}
                        onChange={(event, value) => setEntregaSeleccionada(prevState => ({
                            ...prevState,
                            elemento: value.elemento
                        }))}
                    />
                </div>
                <div className="col-md-12">
                    <h5> Analisis </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="analisis"
                        options={analisis}
                        className={styles.inputMaterial}
                        filterOptions={options => confAnalisisNivelesPlantasCliente.filter(planta => planta.codigoCliente === entregaSeleccionada.codigoCliente && planta.oferta === entregaSeleccionada.oferta && planta.elemento === entregaSeleccionada.elementoPlanta)}
                        getOptionLabel={option => option.analisis}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} name="analisis" />}
                        onChange={(event, value) => setEntregaSeleccionada(prevState => ({
                            ...prevState,
                            analisis: value.analisis
                        }))}
                    />
                </div>
                <div className="col-md-12">
                    <h5> Descripcion </h5>
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} label="Entregado" name="entregado" onChange={handleChangeCheck} value={entregaSeleccionada && entregaSeleccionada.entregado} />
                </div>
                <div className="col-md-12">
                    <TextField className={styles.inputMaterial} name="descripcion" onChange={handleChange} value={entregaSeleccionada && entregaSeleccionada.descripcion} />
                </div>
            </div>
            <br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
                <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEliminar = (
        <div className={styles.modal}>
            <h5>Estás seguro que deseas eliminar la entrega ? </h5>
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
                        tooltip: "Añadir Entrega",
                        isFreeAction: true,
                        onClick: (e, data) => {
                            abrirCerrarModalInsertar()
                        },
                    },
                    {
                        icon: () => <RemoveCircle style={{ fill: "red" }} />,
                        tooltip: "Eliminar Entrega",
                        onClick: (event, rowData) => {
                            setEntregaEliminar(FilasSeleccionadas);
                            abrirCerrarModalEliminar()
                        },
                    },
                    {
                        icon: () => <Edit />,
                        tooltip: "Editar Entrega",
                        onClick: (e, data) => {
                            abrirCerrarModalEditar();
                        },
                    },
                ]}

                onRowClick={((evt, entregaSeleccionada) => {
                    setEntregaSeleccionada(entregaSeleccionada)
                    getEntregas();
                    abrirCerrarModalEditar();
                })}
                onSelectionChange={(filas) => {
                    setFilasSeleccionadas(filas);

                    setEntregaSeleccionada(filas[0]);
                }
                }
                options={{
                    sorting: true, paging: true, pageSizeOptions: [5, 10, 20, 50, 100, 200], pageSize: 10, filtering: true, search: false, selection: true,
                    columnsButton: true, showSelectAllCheckbox: false,
                    rowStyle: rowData => ({
                        backgroundColor: (entregaSeleccionada === rowData.tableData.id) ? '#EEE' : '#FFF',
                        whiteSpace: "nowrap"
                    }),

                    exportMenu: [{
                        label: 'Export PDF',
                        exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Entregas')
                    }, {
                        label: 'Export CSV',
                        exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Entregas')
                    }]
                }}

                title="Listado de Entregas"
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

export default Entregas;*/