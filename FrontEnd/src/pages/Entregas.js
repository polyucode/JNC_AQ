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


const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};


const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 900,
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
        fecha: null,
        entregado: false,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    const [codigoClienteEditar, setCodigoClienteEditar] = useState([]);
    const [nombreClienteEditar, setNombreClienteEditar] = useState([]);
    const [elementoEditar, setElementoEditar] = useState([]);
    const [ofertaEditar, setOfertaEditar] = useState([]);
    const [analisisEditar, setAnalisisEditar] = useState([]);

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
        { title: 'Fecha', field: 'fecha', type: 'date' },
        { title: 'Entregado', field: 'entregado', type: 'boolean', filterPlaceholder: "Filtrar por entregado" },

    ];

    const getEntregas = async () => {
        axios.get("http://172.26.0.169:44343/api/entregas", token).then(response => {
            setData(response.data.data)
        })
    }

    useEffect(() => {
        getEntregas();
    }, [])

    const peticionPost = async () => {
        entregaSeleccionada.id = null;
        await axios.post("http://172.26.0.169:44343/api/entregas", entregaSeleccionada, token)
            .then(response => {
                abrirCerrarModalInsertar();
                getEntregas();
                setEntregaSeleccionada({
                    id: 0,
                    codigoCliente: 0,
                    nombreCliente: '',
                    oferta: 0,
                    elemento: '',
                    analisis: '',
                    descripcion: '',
                    fecha: null,
                    entregado: false,
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null,
                })
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPut = async () => {
        await axios.put("http://172.26.0.169:44343/api/entregas?id=" + entregaSeleccionada.id, entregaSeleccionada, token)
            .then(response => {
                var entregaModificada = data;
                entregaModificada.map(entrega => {
                    if (entrega.id === entregaSeleccionada.id) {
                        entrega = entregaSeleccionada
                    }
                });
                getEntregas();
                abrirCerrarModalEditar();
                setEntregaSeleccionada({
                    id: 0,
                    codigoCliente: 0,
                    nombreCliente: '',
                    oferta: 0,
                    elemento: '',
                    analisis: '',
                    descripcion: '',
                    fecha: null,
                    entregado: false,
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null,
                })
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionDelete = async () => {
        var i = 0;
        while (i < EntregaEliminar.length) {
            await axios.delete("http://172.26.0.169:44343/api/entregas/" + EntregaEliminar[i].id, token)
                .then(response => {
                    getEntregas();
                    abrirCerrarModalEliminar();
                    setEntregaSeleccionada({
                        id: 0,
                        codigoCliente: 0,
                        nombreCliente: '',
                        oferta: 0,
                        elemento: '',
                        analisis: '',
                        descripcion: '',
                        fecha: null,
                        entregado: false,
                        addDate: null,
                        addIdUser: null,
                        modDate: null,
                        modIdUser: null,
                        delDate: null,
                        delIdUser: null,
                        deleted: null,
                    })
                }).catch(error => {
                    console.log(error);
                })
            i++;
        }
    }


    const GetAnalisis = async () => {
        axios.get("http://172.26.0.169:44343/api/analisis", token).then(response => {
            const analisi = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setAnalisis(analisi);
        }, [])
    }

    const GetClientes = async () => {
        axios.get("http://172.26.0.169:44343/api/cliente", token).then(response => {
            const cliente = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setClientes(cliente);
        }, [])
    }

    const GetElementos = async () => {
        axios.get("http://172.26.0.169:44343/api/elementosplanta", token).then(response => {
            const elemento = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setElementos(elemento);
        }, [])
    }

    const GetOfertas = async () => {
        axios.get("http://172.26.0.169:44343/api/ofertasclientes", token).then(response => {
            const oferta = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setOfertas(oferta);
        }, [])
    }

    const GetConfAnalisisNivelesPlantasCliente = async () => {
        axios.get("http://172.26.0.169:44343/api/analisisnivelesplantascliente", token).then(response => {
            const niveles = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setConfAnalisisNivelesPlantasCliente(niveles);
        }, [])
    }


    useEffect(() => {
        GetOfertas();
        GetClientes();
        GetElementos();
        GetAnalisis();
        GetConfAnalisisNivelesPlantasCliente();
    }, [])

    useEffect(() => {

        const nombre = clientes.filter(cliente => cliente.codigo === entregaSeleccionada.codigoCliente);
        (nombre.length > 0) && setEntregaSeleccionada({
            ...entregaSeleccionada,
            nombreCliente: nombre[0].razonSocial
        })

    }, [entregaSeleccionada.codigoCliente])

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

    const handleChangeCheck = (e) => {
        const { name, value, checked } = e.target
        setEntregaSeleccionada(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }

    const bodyInsertar = (
        <div className={styles.modal}>
            <h3> Agregar Nueva Entrega </h3>
            <br />
            <div className="row g-4">
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
                    <TextField
                        id='nombreCliente'
                        className={styles.inputMaterial}
                        value={entregaSeleccionada && entregaSeleccionada.nombreCliente}
                        name="nombreCliente"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-4">
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
                <div className="col-md-4">
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
                <div className="col-md-4">
                    <h5> Analisis </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="analisis"
                        options={analisis}
                        className={styles.inputMaterial}
                        filterOptions={options => confAnalisisNivelesPlantasCliente.filter(planta => planta.codigoCliente === entregaSeleccionada.codigoCliente && planta.oferta === entregaSeleccionada.oferta && planta.elemento === entregaSeleccionada.elemento)}
                        getOptionLabel={option => option.analisis}
                        sx={{ width: 250 }}
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
                <div className="col-md-3">
                    <h5> Fecha </h5>
                    <TextField
                        id="fecha"
                        type="date"
                        name="fecha"
                        sx={{ width: 220 }}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="col-md-12">
                    <FormControlLabel disabled control={<Checkbox />} className={styles.inputMaterial} label="Entregado" name="entregado" onChange={handleChangeCheck} />
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
                        disabled
                        disableClearable={true}
                        id="CodigoCliente"
                        options={clientes}
                        defaultValue={codigoClienteEditar[0]}
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
                        disabled
                        disableClearable={true}
                        id="NombreCliente"
                        options={clientes}
                        defaultValue={nombreClienteEditar[0]}
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
                <div className="col-md-4">
                    <h5> Oferta </h5>
                    <Autocomplete
                        disabled
                        disableClearable={true}
                        id="Oferta"
                        options={ofertas}
                        className={styles.inputMaterial}
                        defaultValue={ofertaEditar[0]}
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
                <div className="col-md-4">
                    <h5> Elemento </h5>
                    <Autocomplete
                        disabled
                        disableClearable={true}
                        className={styles.inputMaterial}
                        id="elemento"
                        options={elementos}
                        defaultValue={elementoEditar[0]}
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
                <div className="col-md-4">
                    <h5> Analisis </h5>
                    <Autocomplete
                        disabled
                        disableClearable={true}
                        id="analisis"
                        options={analisis}
                        className={styles.inputMaterial}
                        defaultValue={analisisEditar[0]}
                        filterOptions={options => confAnalisisNivelesPlantasCliente.filter(planta => planta.codigoCliente === entregaSeleccionada.codigoCliente && planta.oferta === entregaSeleccionada.oferta && planta.elemento === entregaSeleccionada.elemento)}
                        getOptionLabel={option => option.analisis}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} name="analisis" />}
                        onChange={(event, value) => setEntregaSeleccionada(prevState => ({
                            ...prevState,
                            analisis: value.analisis
                        }))}
                    />
                </div>
                <div className="col-md-12">
                    <h5> Descripcion </h5>
                    <TextField className={styles.inputMaterial} name="descripcion" onChange={handleChange} value={entregaSeleccionada && entregaSeleccionada.descripcion} />
                </div>
                <div className="col-md-3">
                    <h5> Fecha </h5>
                    <TextField
                        id="fecha"
                        type="date"
                        name="fecha"
                        sx={{ width: 220 }}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={entregaSeleccionada && entregaSeleccionada.fecha}
                    />
                </div>
                <div className="col-md-12">
                    <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} checked={entregaSeleccionada.entregado} label="Entregado" name="entregado" onChange={handleChangeCheck} />
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
                ]}

                onRowClick={((evt, entregaSeleccionada) => {
                    setEntregaSeleccionada(entregaSeleccionada)
                    setCodigoClienteEditar(clientes.filter(cliente => cliente.codigo === entregaSeleccionada.codigoCliente))
                    setNombreClienteEditar(clientes.filter(cliente => cliente.razonSocial === entregaSeleccionada.nombreCliente))
                    setElementoEditar(confAnalisisNivelesPlantasCliente.filter(elemento => elemento.elemento === entregaSeleccionada.elemento));
                    setAnalisisEditar(confAnalisisNivelesPlantasCliente.filter(analisi => analisi.analisis === entregaSeleccionada.analisis));
                    setOfertaEditar(ofertas.filter(oferta => oferta.numeroOferta === entregaSeleccionada.oferta))
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

export default Entregas;