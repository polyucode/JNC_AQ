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
import { height } from "@mui/system";
import MenuItem from '@mui/material/MenuItem';

import './OfertasClientes.css';

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};


const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 900,
        height: 600,
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
        width: 1500,
        height: 930,
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
        width: '40%'
    }
}));

const useStyles3 = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 800,
        height: 120,
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
        width: '30%'
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

    const [modalInsertarProducto, setModalInsertarProducto] = useState(false);

    const [modalEditarProducto, setModalEditarProducto] = useState(false);

    const [modalEliminarProducto, setModalEliminarProducto] = useState(false);

    const [ofertaSeleccionada, setOfertaSeleccionada] = useState({
        id: 0,
        numeroOferta: 0,
        pedido: 0,
        codigoCliente: 0,
        nombreCliente: '',
        descripcion: '',
        fechaInicio: '',
        fechaFinalizacion: '',
        contacto1: '',
        contacto2: '',
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    const [productoSeleccionado, setProductoSeleccionado] = useState({
        id: 0,
        codigoCliente: 0,
        oferta: 0,
        producto: '',
        descripcionProducto: '',
        cantidad: 0,
        precio: 0,
        stockMin: 0,
        stockMax: 0,
        consumidos: 0,
        entregar: 0,
        adr: '',
        portes: '',
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    const selections = [
        {
            value: 'Si',
            label: 'Si',
        },
        {
            value: 'No',
            label: 'No',
        }
    ];

    const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);
    const [FilasSeleccionadasProducto, setFilasSeleccionadasProducto] = useState([]);

    const [ofertaEditar, setOfertaEditar] = useState([]);
    const [OfertaEliminar, setOfertaEliminar] = useState([]);

    const [productoEditar, setProductoEditar] = useState([]);
    const [productoEliminar, setProductoEliminar] = useState([]);

    const [descripcionEditar, setDescripcionEditar] = useState([]);

    const [productos, setProductos] = useState([]);

    const [contactos, setContactos] = useState([]);

    const [clientes, setClientes] = useState([]);
    const [clientesTable, setClientesTable] = useState({});

    const [clientesCodigoEditar, setClientesCodigoEditar] = useState([]);
    const [clientesNombreEditar, setClientesNombreEditar] = useState([]);

    const [contacto1Editar, setContacto1Editar] = useState([]);
    const [contacto2Editar, setContacto2Editar] = useState([]);

    const [nombreFiltrado, setNombreFiltrado] = useState({})

    const [articulos, setArticulos] = useState([]);

    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFinalizacion, setFechaFinalizacion] = useState("");

    const [data, setData] = useState([]);
    const [dataProducto, setDataProducto] = useState([]);

    const [dataDet, setDataDet] = useState([]);

    const styles = useStyles();
    const styles2 = useStyles2();
    const styles3 = useStyles3();

    const [number, setNumber] = useState({ cantidad: 0, consumidos: 0 });
    const [resta, setResta] = useState();
    const [resta2, setResta2] = useState();

    const columnas = [

        //Visibles
        { title: 'NumeroOferta', field: 'numeroOferta', filterPlaceholder: "Filtrar por numero oferta" },
        { title: 'Pedido', field: 'pedido', filterPlaceholder: "Filtrar por pedido" },
        { title: 'CodigoCliente', field: 'codigoCliente', filterPlaceholder: "Filtrar por codigo cliente" },
        { title: 'NombreCliente', field: 'nombreCliente', filterPlaceholder: "Filtrar por nombre cliente" },
        { title: 'Descripcion', field: 'descripcion', filterPlaceholder: "Filtrar por Descripcion" },
        { title: 'FechaInicio', field: 'fechaInicio', type: "date", filterPlaceholder: "Filtrar por FechaInicio" },
        { title: 'FechaFinalizacion', field: 'fechaFinalizacion', type: "date", filterPlaceholder: "Filtrar por Fecha Finalizacion" },
        { title: 'Contacto1', field: 'contacto1', filterPlaceholder: "Filtrar por contacto1" },
        { title: 'Contacto2', field: 'contacto2', filterPlaceholder: "Filtrar por contacto2" },

        //Ocultas
        { title: 'Id', field: 'id', type: 'numeric', filterPlaceholder: "Filtrar por Id", hidden: true, },

    ];

    const columnasProducto = [
        //Visibles
        { title: 'Codigo', field: 'producto', filterPlaceholder: "Filtrar por codigo" },
        { title: 'Descripcion', field: 'descripcionProducto', filterPlaceholder: "Filtrar por descripcion" },
        { title: 'Estimacion', field: 'cantidad', filterPlaceholder: "Filtrar por cantidad" },
        { title: 'Consumidos', field: 'consumidos', filterPlaceholder: "Filtrar por Consumidos" },
        { title: 'Entregar', field: 'entregar', filterPlaceholder: "Filtrar por Entregar" },
        { title: 'Precio', field: 'precio', filterPlaceholder: "Filtrar por precio" },
        { title: 'StockMin', field: 'stockMin', filterPlaceholder: "Filtrar por StockMin" },
        { title: 'StockMax', field: 'stockMax', filterPlaceholder: "Filtrar por StockMax" },
        { title: 'ADR', field: 'adr', filterPlaceholder: "Filtrar por ADR" },
        { title: 'Portes', field: 'portes', filterPlaceholder: "Filtrar por Portes" },
    ];

    const getOfertasProductos = async () => {
        axios.get("/ofertasproductos", token).then(response => {
            setDataDet(response.data.data)
        })
    }

    const getOfertasProductosDet = async () => {
        axios.get("/ofertasproductos", token).then(response => {
            setDataProducto(response.data.data.filter(producto => producto.oferta === ofertaSeleccionada.numeroOferta))
        })
    }

    const getProductos = async () => {
        axios.get("/productos", token).then(response => {
            const producto = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setProductos(producto);
        }, [])
    }

    const getContactos = async () => {
        axios.get("/clientescontactos", token).then(response => {
            const contacto = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setContactos(contacto);
        }, [])
    }

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

    useEffect(() => {
        const { cantidad, consumidos } = number
        setResta(Number(cantidad) - Number(consumidos))
        setResta2(productoSeleccionado.cantidad - productoSeleccionado.consumidos)
    }, [number, productoSeleccionado.consumidos])

    useEffect(() => {
        getContactos();
        getProductos();
        getOfertas();
        getClientes();
        getOfertasProductos();
        getOfertasProductosDet();
    }, [])

    useEffect(() => {
        const lookupClientes = {};
        clientes.map(fila => lookupClientes[fila.id] = fila.razonSocial);
        setClientesTable(lookupClientes);
    }, [clientes])

    const peticionPost = async () => {
        ofertaSeleccionada.id = null;
        await axios.post("/ofertasclientes", ofertaSeleccionada, token)
            .then(response => {
                abrirCerrarModalInsertar();
                getOfertas();
                setOfertaSeleccionada({
                    id: 0,
                    numeroOferta: 0,
                    pedido: 0,
                    codigoCliente: 0,
                    nombreCliente: '',
                    descripcion: '',
                    fechaInicio: '',
                    fechaFinalizacion: '',
                    contacto1: '',
                    contacto2: '',
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
                setOfertaSeleccionada({
                    id: 0,
                    numeroOferta: 0,
                    pedido: 0,
                    codigoCliente: 0,
                    nombreCliente: '',
                    descripcion: '',
                    fechaInicio: '',
                    fechaFinalizacion: '',
                    contacto1: '',
                    contacto2: '',
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
        while (i < OfertaEliminar.length) {
            await axios.delete("/ofertasclientes/" + OfertaEliminar[i].id, token)
                .then(response => {
                    getOfertas();
                    abrirCerrarModalEliminar();
                    setOfertaSeleccionada({
                        id: 0,
                        numeroOferta: 0,
                        pedido: 0,
                        codigoCliente: 0,
                        nombreCliente: '',
                        descripcion: '',
                        fechaInicio: '',
                        fechaFinalizacion: '',
                        contacto1: '',
                        contacto2: '',
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

    const peticionPostProducto = async () => {
        productoSeleccionado.id = 0;
        productoSeleccionado.oferta = ofertaSeleccionada.numeroOferta;
        productoSeleccionado.codigoCliente = ofertaSeleccionada.codigoCliente;
        productoSeleccionado.entregar = resta
        await axios.post("/ofertasproductos", productoSeleccionado, token)
            .then(response => {
                abrirCerrarModalInsertarProducto();
                getOfertasProductosDet();
                getOfertasProductos();
                setProductoSeleccionado({
                    id: 0,
                    codigoCliente: 0,
                    oferta: 0,
                    producto: '',
                    descripcionProducto: '',
                    cantidad: 0,
                    precio: 0,
                    stockMin: 0,
                    stockMax: 0,
                    consumidos: 0,
                    entregar: 0,
                    adr: '',
                    portes: '',
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null,
                })
                setNumber({ cantidad: 0, consumidos: 0})
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPutProducto = async () => {
        productoSeleccionado.entregar = resta2
        await axios.put("/ofertasproductos?id=" + productoSeleccionado.id, productoSeleccionado, token)
            .then(response => {
                var productoModificado = dataProducto;
                productoModificado.map(producto => {
                    if (producto.id === productoSeleccionado.id) {
                        producto = productoSeleccionado
                    }
                });
                getOfertasProductosDet();
                getOfertasProductos();
                abrirCerrarModalEditarProducto();
                setProductoSeleccionado({
                    id: 0,
                    codigoCliente: 0,
                    oferta: 0,
                    producto: '',
                    descripcionProducto: '',
                    cantidad: 0,
                    precio: 0,
                    stockMin: 0,
                    stockMax: 0,
                    consumidos: 0,
                    entregar: 0,
                    adr: '',
                    portes: '',
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null,
                })
                setNumber({ cantidad: 0, consumidos: 0 })
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionDeleteProducto = async () => {
        var i = 0;
        while (i < productoEliminar.length) {
            await axios.delete("/ofertasproductos/" + productoEliminar[i].id, token)
                .then(response => {
                    getOfertasProductosDet();
                    getOfertasProductos();
                    abrirCerrarModalEliminarProducto();
                    setProductoSeleccionado({
                        id: 0,
                        codigoCliente: 0,
                        oferta: 0,
                        producto: '',
                        descripcionProducto: '',
                        cantidad: 0,
                        precio: 0,
                        stockMin: 0,
                        stockMax: 0,
                        consumidos: 0,
                        entregar: 0,
                        adr: '',
                        portes: '',
                        addDate: null,
                        addIdUser: null,
                        modDate: null,
                        modIdUser: null,
                        delDate: null,
                        delIdUser: null,
                        deleted: null,
                    })
                    setNumber({ cantidad: 0, consumidos: 0 })
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

    const abrirCerrarModalInsertarProducto = () => {
        setModalInsertarProducto(!modalInsertarProducto);
    }

    const abrirCerrarModalEliminarProducto = () => {
        setModalEliminarProducto(!modalEliminarProducto);
    }

    const abrirCerrarModalEditarProducto = () => {
        setModalEditarProducto(!modalEditarProducto);
    }

    function FiltrarNombre() {
        setNombreFiltrado(clientes.filter(cliente => cliente.codigo === ofertaSeleccionada.codigoCliente))
    }


    const handleChange = e => {
        const { name, value } = e.target;
        setOfertaSeleccionada(prevState => ({
            ...prevState,
            //[name]: value
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        }));
    }

    const handleChangeProducto = e => {
        const { name, value } = e.target;
        setNumber({ ...number, [name]: value })
        setProductoSeleccionado(prevState => ({
            ...prevState,
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        }));
    }

    const handleChangeFecha = e => {
        const { name, value } = e.target;
        setOfertaSeleccionada(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleChangePrecio = e => {
        const { name, value } = e.target;
        setProductoSeleccionado(prevState => ({
            ...prevState,
            [e.target.name]: e.target.name === 'precio' ? parseFloat(e.target.value) : e.target.value
        }));
    }

    useEffect(() => {

        const descripcion = productos.filter(producto => producto.codigoProducto === productoSeleccionado.producto);
        (descripcion.length > 0) && setProductoSeleccionado({
            ...productoSeleccionado,
            descripcionProducto: descripcion[0].descripcion,
            adr: descripcion[0].adr
        });

    }, [productoSeleccionado.producto]);


    useEffect(() => {

        const nombre = clientes.filter(cliente => cliente.codigo === ofertaSeleccionada.codigoCliente);
        (nombre.length > 0) && setOfertaSeleccionada({
            ...ofertaSeleccionada,
            nombreCliente: nombre[0].razonSocial,
            contacto1: '',
            contacto2: ''
        })

    }, [ofertaSeleccionada.codigoCliente])

    const bodyInsertar = (
        <div className={styles.modal}>
            <h3>Agregar Nueva Oferta</h3>
            <br />
            <div className="row g-3">
                <div className="col-md-3">
                    <h5> Oferta </h5>
                    <TextField className={styles.inputMaterial} type="number" name="numeroOferta" onChange={handleChange} />
                </div>
                <div className="col-md-9">
                    <h5> Descripcion </h5>
                    <TextField className={styles.inputMaterial} name="descripcion" onChange={handleChange} />
                </div>
                <div className="col-md-4">
                    <h5> Pedido </h5>
                    <TextField className={styles.inputMaterial} type="number" name="pedido" onChange={handleChange} />
                </div>
                <div className="col-md-4">
                    <h5> Codigo Cliente</h5>
                    <Autocomplete
                        type="number"
                        disableClearable={true}
                        id="CodigoCliente"
                        options={clientes}
                        getOptionLabel={option => parseInt(option.codigo)}
                        sx={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} type="number" name="codigoCliente" />}
                        onChange={(event, value) => setOfertaSeleccionada(prevState => ({
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
                        inputValue={ofertaSeleccionada.nombreCliente}
                        filterOptions={options => clientes.filter(cliente => cliente.codigo === ofertaSeleccionada.codigoCliente)}
                        getOptionLabel={option => option.razonSocial}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} name="nombreCliente" />}
                        onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                            ...prevState,
                            nombreCliente: value.razonSocial
                        }))}
                    />
                </div>
                <div className="col-md-6">
                    <h5> Fecha Inicio </h5>
                    <TextField
                        id="fechainicio"
                        type="date"
                        name="fechaInicio"
                        sx={{ width: 220 }}
                        onChange={handleChangeFecha}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="col-md-6">
                    <h5> Fecha Finalizacion </h5>
                    <TextField
                        id="fechafinalizacion"
                        type="date"
                        name="fechaFinalizacion"
                        sx={{ width: 220 }}
                        onChange={handleChangeFecha}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="col-md-6">
                    <h5> Contacto 1 </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="contacto1"
                        inputValue={ofertaSeleccionada.contacto1}
                        options={contactos}
                        filterOptions={options => contactos.filter(contacto => contacto.codigoCliente === ofertaSeleccionada.codigoCliente && contacto.nombre !== ofertaSeleccionada.contacto2)}
                        getOptionLabel={option => option.nombre}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} name="contacto1" />}
                        onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                            ...prevState,
                            contacto1: value.nombre
                        }))}
                    />
                </div>
                <div className="col-md-6">
                    <h5> Contacto 2 </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="contacto2"
                        inputValue={ofertaSeleccionada.contacto2}
                        options={contactos}
                        filterOptions={options => contactos.filter(contacto => contacto.codigoCliente === ofertaSeleccionada.codigoCliente && contacto.nombre !== ofertaSeleccionada.contacto1)}
                        getOptionLabel={option => option.nombre}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} name="contacto2" />}
                        onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                            ...prevState,
                            contacto2: value.nombre
                        }))}
                    />
                </div>
            </div>
            <br />
            <br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
                <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEditar = (
        <div className={styles2.modal}>
            <h3>Oferta</h3>
            <br />
            <div className="row g-3">
                <div className="col-md-2">
                    <h5> Numero Oferta </h5>
                    <TextField className={styles.inputMaterial} type="number" name="numeroOferta" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.numeroOferta} />
                </div>
                <div className="col-md-10">
                    <h5> Descripcion </h5>
                    <TextField className={styles.inputMaterial} name="descripcion" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.descripcion} />
                </div>
                <div className="col-md-2">
                    <h5> Pedido </h5>
                    <TextField className={styles.inputMaterial} type="number" name="pedido" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.pedido} />
                </div>
                <div className="col-md-2">
                    <h5> Codigo Cliente </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="CodigoCliente"
                        options={clientes}
                        getOptionLabel={option => option.codigo}
                        defaultValue={clientesCodigoEditar[0]}
                        sx={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} name="codigoCliente" />}
                        onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                            ...prevState,
                            codigoCliente: parseInt(value.codigo)
                        }))}
                    />
                </div>
                <div className="col-md-2">
                    <h5> Nombre Cliente </h5>
                    <TextField className={styles.inputMaterial} name="nombreCliente" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.nombreCliente} />
                </div>
                <div className="col-md-2">
                    <h5> Fecha Inicio </h5>
                    <TextField
                        id="fechainicio"
                        type="date"
                        name="fechaInicio"
                        sx={{ width: 220 }}
                        onChange={handleChangeFecha}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={ofertaSeleccionada && ofertaSeleccionada.fechaInicio}
                    />
                </div>
                <div className="col-md-2">
                    <h5> Fecha Finalizacion </h5>
                    <TextField
                        id="fechafinalizacion"
                        type="date"
                        name="fechaFinalizacion"
                        sx={{ width: 220 }}
                        onChange={handleChangeFecha}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={ofertaSeleccionada && ofertaSeleccionada.fechaFinalizacion}
                    />
                </div>
                <div className="col-md-4">
                    <h5> Contacto 1 </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="contacto1"
                        options={contactos}
                        defaultValue={contacto1Editar[0]}
                        filterOptions={options => contactos.filter(contacto => contacto.codigoCliente === ofertaSeleccionada.codigoCliente && contacto.nombre !== ofertaSeleccionada.contacto2)}
                        getOptionLabel={option => option.nombre}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} name="contacto1" />}
                        onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                            ...prevState,
                            contacto1: value.nombre
                        }))}
                    />
                </div>
                <div className="col-md-4">
                    <h5> Contacto 2 </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="contacto2"
                        options={contactos}
                        defaultValue={contacto2Editar[0]}
                        filterOptions={options => contactos.filter(contacto => contacto.codigoCliente === ofertaSeleccionada.codigoCliente && contacto.nombre !== ofertaSeleccionada.contacto1)}
                        getOptionLabel={option => option.nombre}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} name="contacto2" />}
                        onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                            ...prevState,
                            contacto2: value.nombre
                        }))}
                    />
                </div>
            </div>
            <br />
            <MaterialTable columns={columnasProducto} data={dataProducto}
                localization={localization}
                actions={[
                    {
                        icon: () => <AddCircle style={{ fill: "green" }} />,
                        tooltip: "Añadir Producto",
                        isFreeAction: true,
                        onClick: (e, data) => {
                            abrirCerrarModalInsertarProducto();
                        },
                    },
                    {
                        icon: () => <RemoveCircle style={{ fill: "red" }} />,
                        tooltip: "Eliminar Producto",
                        onClick: (event, rowData) => {
                            setProductoEliminar(FilasSeleccionadasProducto);
                            abrirCerrarModalEliminarProducto();
                        },
                    },
                ]}

                onRowClick={((evt, productoSeleccionado) => {
                    setProductoSeleccionado(productoSeleccionado);
                    getOfertasProductos();
                    setProductoEditar(productos.filter(producto => producto.codigoProducto === productoSeleccionado.producto))
                    abrirCerrarModalEditarProducto();
                })}
                
                onSelectionChange={(filas) => {
                    setFilasSeleccionadasProducto(filas);
                    if (filas.length > 0) {
                        setProductoSeleccionado(filas[0]);
                    }
                }}

                options={{
                    sorting: true, paging: true, pageSizeOptions: [1, 2, 3, 4, 5], pageSize: 5, filtering: false, search: false, selection: true,
                    columnsButton: true, showSelectAllCheckbox: false,
                    rowStyle: rowData => ({
                        backgroundColor: (productoSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                        whiteSpace: "nowrap"
                    }),
                    exportMenu: [{
                        label: 'Export PDF',
                        exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de productos')
                    }, {
                        label: 'Export CSV',
                        exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de productos')
                    }]
                }}

                title="Productos de la oferta"
            />
            <br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPut()}>Guardar</Button>
                <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEliminar = (
        <div className={styles3.modal}>
            <h6>Estás seguro que deseas eliminar la oferta ? </h6>
            <br />
            <div align="right">
                <Button color="secondary" onClick={() => peticionDelete()}>Sí</Button>
                <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
            </div>
        </div>
    )

    const bodyInsertarProducto = (
        <div className={styles.modal}>
            <h3>Agregar Nuevo Producto</h3>
            <br />
            <div className="row g-3">
                <div className="col-md-3">
                    <h5> Producto </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="producto"
                        options={productos}
                        getOptionLabel={option => option.codigoProducto}
                        sx={{ width: 150 }}
                        renderInput={(params) => <TextField {...params} name="producto" />}
                        onChange={(event, value) => setProductoSeleccionado(prevState => ({
                            ...prevState,
                            producto: value.codigoProducto
                        }))}
                    />
                </div>
                <div className="col-md-9">
                    <h5> Descripcion </h5>
                    <TextField
                        id='descripcion'
                        className={styles.inputMaterial}
                        value={productoSeleccionado && productoSeleccionado.descripcionProducto}
                        name="descripcionProducto"
                        onChange={handleChangeProducto}
                    />
                </div>
                <div className="col-md-3">
                    <h5> Estimacion </h5>
                    <TextField className={styles.inputMaterial} type="number" name="cantidad" value={number.cantidad} onChange={handleChangeProducto} />
                </div>
                <div className="col-md-3">
                    <h5> Consumidos </h5>
                    <TextField className={styles.inputMaterial} type="number" name="consumidos" value={number.consumidos} onChange={handleChangeProducto} />
                </div>
                <div className="col-md-3">
                    <h5> Entregar </h5>
                    <TextField className={styles.inputMaterial} type="number" name="entregar" value={resta} />
                </div>
                <div className="col-md-3">
                    <h5> Precio </h5>
                    <TextField className={styles.inputMaterial} type="number" name="precio" onChange={handleChangePrecio} />
                </div>
                <div className="col-md-6">
                    <h5> Stock Min </h5>
                    <TextField className={styles.inputMaterial} type="number" name="stockMin" onChange={handleChangeProducto} />
                </div>
                <div className="col-md-6">
                    <h5> Stock Max </h5>
                    <TextField className={styles.inputMaterial} type="number" name="stockMax" onChange={handleChangeProducto} />
                </div>
                <div className="col-md-12">
                    <h5> ADR </h5>
                    <TextField
                        id='adr'
                        className={styles3.inputMaterial}
                        value={productoSeleccionado && productoSeleccionado.adr}
                        name="adr"
                        onChange={handleChangeProducto}
                    />
                </div>
                <div className="col-md-12">
                    <h5> Portes </h5>
                    <TextField className={styles3.inputMaterial} name="portes" onChange={handleChangeProducto} />
                </div>
            </div>
            <br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPostProducto()}>Insertar</Button>
                <Button onClick={() => abrirCerrarModalInsertarProducto()}>Cancelar</Button>
            </div>
        </div>
    )


    const bodyEditarProducto = (
        <div className={styles.modal}>
            <h3>Producto</h3>
            <br />
            <div className="row g-3">
                <div className="col-md-3">
                    <h5> Codigo </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="producto"
                        options={productos}
                        defaultValue={productoEditar[0]}
                        getOptionLabel={option => option.codigoProducto}
                        sx={{ width: 150 }}
                        renderInput={(params) => <TextField {...params} name="producto" />}
                        onChange={(event, value) => setProductoSeleccionado(prevState => ({
                            ...prevState,
                            producto: value.codigoProducto
                        }))}
                    />
                </div>
                <div className="col-md-9">
                    <h5> Descripcion </h5>
                    <TextField className={styles.inputMaterial} name="descripcionProducto" onChange={handleChangeProducto} value={productoSeleccionado && productoSeleccionado.descripcionProducto} />
                </div>
                <div className="col-md-3">
                    <h5> Estimacion </h5>
                    <TextField className={styles.inputMaterial} type="number" name="cantidad" onChange={handleChangeProducto} value={productoSeleccionado && productoSeleccionado.cantidad} />
                </div>
                <div className="col-md-3">
                    <h5> Consumidos </h5>
                    <TextField className={styles.inputMaterial} type="number" name="consumidos" onChange={handleChangeProducto} value={productoSeleccionado && productoSeleccionado.consumidos} />
                </div>
                <div className="col-md-3">
                    <h5> Entregar </h5>
                    <TextField className={styles.inputMaterial} type="number" name="entregar" onChange={handleChangeProducto} value={resta2} />
                </div>
                <div className="col-md-3">
                    <h5> Precio </h5>
                    <TextField className={styles.inputMaterial} type="number" name="precio" onChange={handleChangePrecio} value={productoSeleccionado && productoSeleccionado.precio} />
                </div>
                <div className="col-md-4">
                    <h5> Stock Min </h5>
                    <TextField className={styles.inputMaterial} type="number" name="stockMin" onChange={handleChangeProducto} value={productoSeleccionado && productoSeleccionado.stockMin} />
                </div>
                <div className="col-md-4">
                    <h5> Stock Max </h5>
                    <TextField className={styles.inputMaterial} type="number" name="stockMax" onChange={handleChangeProducto} value={productoSeleccionado && productoSeleccionado.stockMax} />
                </div>
                <div className="col-md-12">
                    <h5> ADR </h5>
                    <TextField
                        id='adr'
                        className={styles3.inputMaterial}
                        select
                        name="adr"
                        onChange={handleChangeProducto}
                        value={productoSeleccionado.adr}
                    >
                        {selections.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="col-md-12">
                    <h5> Portes </h5>
                    <TextField className={styles3.inputMaterial} name="portes" onChange={handleChangeProducto} value={productoSeleccionado && productoSeleccionado.portes} />
                </div>
            </div>
            <div align="right">
                <Button color="primary" onClick={() => peticionPutProducto()}>Guardar</Button>
                <Button onClick={() => abrirCerrarModalEditarProducto()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEliminarProducto = (
        <div className={styles3.modal}>
            <h6>Estás seguro que deseas eliminar el producto ? </h6>
            <br />
            <div align="right">
                <Button color="secondary" onClick={() => peticionDeleteProducto()}>Sí</Button>
                <Button onClick={() => abrirCerrarModalEliminarProducto()}>No</Button>
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
                ]}
                onRowClick={(event, ofertaSeleccionada) => {
                    // Copy row data and set checked state
                    console.log(ofertaSeleccionada)
                    setOfertaSeleccionada(ofertaSeleccionada);
                    setDataProducto(dataDet.filter(producto => producto.oferta === ofertaSeleccionada.numeroOferta))
                    getOfertasProductos();
                    setClientesCodigoEditar(clientes.filter(cliente => cliente.codigo === ofertaSeleccionada.codigoCliente));
                    setClientesNombreEditar(clientes.filter(cliente => cliente.razonSocial === ofertaSeleccionada.nombreCliente));
                    setContacto1Editar(contactos.filter(contacto => contacto.nombre === ofertaSeleccionada.contacto1))
                    setContacto2Editar(contactos.filter(contacto => contacto.nombre === ofertaSeleccionada.contacto2))
                    abrirCerrarModalEditar();
                }}
                onSelectionChange={(filas) => {
                    setFilasSeleccionadas(filas);
                    if(filas.length > 0){
                        setOfertaSeleccionada(filas[0])
                    }
                }}

                options={{
                    sorting: true, paging: true, pageSizeOptions: [5, 10, 20, 50, 100, 200], pageSize: 10, filtering: true, search: false, selection: true,
                    columnsButton: true, showSelectAllCheckbox: false,
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

            <Modal
                open={modalInsertarProducto}
                onClose={abrirCerrarModalInsertarProducto}>
                {bodyInsertarProducto}
            </Modal>

            <Modal
                open={modalEditarProducto}
                onClose={abrirCerrarModalEditarProducto}>
                {bodyEditarProducto}
            </Modal>

            <Modal
                open={modalEliminarProducto}
                onClose={abrirCerrarModalEliminarProducto}>
                {bodyEliminarProducto}
            </Modal>
        </div>
    )
}

export default OfertasClientes;