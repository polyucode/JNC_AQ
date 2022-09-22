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
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from '@mui/material';

import './OfertasClientes.css';
import { formatDate } from "@fullcalendar/react";

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

    const [modalInsertarConsumido, setModalInsertarConsumido] = useState(false);

    const [ofertaSeleccionada, setOfertaSeleccionada] = useState({
        id: 0,
        numeroOferta: 0,
        pedido: 0,
        codigoCliente: 0,
        nombreCliente: '',
        descripcion: '',
        fechaInicio: null,
        fechaFinalizacion: null,
        contacto1: '',
        contacto2: '',
        contacto3: '',
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

    const [consumoSeleccionado, setConsumoSeleccionado] = useState({
        id: 0,
        oferta: 0,
        fecha: null,
        codigoProducto: '',
        cantidad: 0,
        codigoProveedor: 0,
        modoEnvio: '',
        numAlbaran: 0,
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
    const [proveedores, setProveedores] = useState([]);
    const [envios, setEnvios] = useState([]);

    const [contactos, setContactos] = useState([]);

    const [clientes, setClientes] = useState([]);
    const [clientesTable, setClientesTable] = useState({});

    const [clientesCodigoEditar, setClientesCodigoEditar] = useState([]);
    const [clientesNombreEditar, setClientesNombreEditar] = useState([]);

    const [contacto1Editar, setContacto1Editar] = useState([]);
    const [contacto2Editar, setContacto2Editar] = useState([]);
    const [contacto3Editar, setContacto3Editar] = useState([]);

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
        { title: 'Num Pedido', field: 'pedido', filterPlaceholder: "Filtrar por Num pedido" },
        { title: 'Codigo Cliente', field: 'codigoCliente', filterPlaceholder: "Filtrar por codigo cliente" },
        { title: 'Nombre Cliente', field: 'nombreCliente', filterPlaceholder: "Filtrar por nombre cliente" },
        { title: 'Descripcion', field: 'descripcion', filterPlaceholder: "Filtrar por Descripcion" },
        { title: 'Fecha Inicio Pedido', field: 'fechaInicio', type: "date", filterPlaceholder: "Filtrar por FechaInicio" },
        { title: 'Fecha Fin Pedido', field: 'fechaFinalizacion', type: "date", filterPlaceholder: "Filtrar por Fecha Finalizacion" },
        { title: 'Contacto1', field: 'contacto1', filterPlaceholder: "Filtrar por contacto1" },
        { title: 'Contacto2', field: 'contacto2', filterPlaceholder: "Filtrar por contacto2" },
        { title: 'Contacto3', field: 'contacto3', filterPlaceholder: "Filtrar por contacto3" },

        //Ocultas
        { title: 'Id', field: 'id', type: 'numeric', filterPlaceholder: "Filtrar por Id", hidden: true, },

    ];

    const columnasProducto = [
        //Visibles
        { title: 'Codigo', field: 'producto', filterPlaceholder: "Filtrar por codigo" },
        { title: 'Descripcion', field: 'descripcionProducto', filterPlaceholder: "Filtrar por descripcion" },
        { title: 'Estimacion', field: 'cantidad', filterPlaceholder: "Filtrar por cantidad" },
        { title: 'Consumidos', field: 'consumidos', filterPlaceholder: "Filtrar por Consumidos" },
        { title: 'Pdt. Entregar', field: 'entregar', filterPlaceholder: "Filtrar por Pdt. Entregar" },
        { title: 'Precio/u (€)', field: 'precio', type: 'money', render: rowData => rowData.precio.toLocaleString('es'), filterPlaceholder: "Filtrar por precio" },
        { title: 'Stock Min', field: 'stockMin', filterPlaceholder: "Filtrar por Stock Min" },
        { title: 'Stock Max', field: 'stockMax', filterPlaceholder: "Filtrar por Stock Max" },
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

    const getProveedores = async () => {
        axios.get("/proveedores", token).then(response => {
            const proveedor = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setProveedores(proveedor);
        }, [])
    }

    const getEnvios = async () => {
        axios.get("/modoenvio", token).then(response => {
            const envio = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setEnvios(envio);
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
        getProveedores();
        getEnvios();
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
                console.log(ofertaSeleccionada)
                abrirCerrarModalInsertar();
                getOfertas();
                setOfertaSeleccionada({
                    id: 0,
                    numeroOferta: 0,
                    pedido: 0,
                    codigoCliente: 0,
                    nombreCliente: '',
                    descripcion: '',
                    fechaInicio: null,
                    fechaFinalizacion: null,
                    contacto1: '',
                    contacto2: '',
                    contacto3: '',
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
                    fechaInicio: null,
                    fechaFinalizacion: null,
                    contacto1: '',
                    contacto2: '',
                    contacto3: '',
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
                        fechaInicio: null,
                        fechaFinalizacion: null,
                        contacto1: '',
                        contacto2: '',
                        contacto3: '',
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
                setNumber({ cantidad: 0, consumidos: 0 })
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

    const peticionPostConsumido = async () => {
        consumoSeleccionado.id = 0;
        await axios.post("/consumos", consumoSeleccionado, token)
            .then(response => {
                //setData(data.concat(response.data));
                abrirCerrarModalInsertar();
            }).catch(error => {
                console.log(error);
            })
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

    const abrirCerrarModalInsertarConsumido = () => {
        setModalInsertarConsumido(!modalInsertarConsumido);
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
            nombreCliente: nombre[0].razonSocial
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
                    <h5> Num Pedido </h5>
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
                            codigoCliente: parseInt(value.codigo),
                            contacto1: '',
                            contacto2: '',
                            contacto3: ''
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
                    <h5> Fecha Inicio Pedido </h5>
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
                    <h5> Fecha Fin Pedido </h5>
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
                <div className="col-md-6">
                    <h5> Contacto 3 </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="contacto3"
                        inputValue={ofertaSeleccionada.contacto3}
                        options={contactos}
                        filterOptions={options => contactos.filter(contacto => contacto.codigoCliente === ofertaSeleccionada.codigoCliente && contacto.nombre !== ofertaSeleccionada.contacto1)}
                        getOptionLabel={option => option.nombre}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} name="contacto3" />}
                        onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                            ...prevState,
                            contacto3: value.nombre
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

    function formateandofechas(fecha) {
        const fecha1 = new Date(fecha)

        const fecha2 = fecha1.getFullYear() +
            '-' + String(fecha1.getMonth() + 1).padStart(2, '0') +
            '-' + String(fecha1.getDate()).padStart(2, '0')

        return fecha2
    }

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
                    <h5> Num Pedido </h5>
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
                            codigoCliente: parseInt(value.codigo),
                            contacto1: '',
                            contacto2: '',
                            contacto3: ''
                        }))}
                    />
                </div>
                <div className="col-md-2">
                    <h5> Nombre Cliente </h5>
                    <TextField className={styles.inputMaterial} name="nombreCliente" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.nombreCliente} />
                </div>
                <div className="col-md-2">
                    <h5> Fecha Inicio Pedido </h5>
                    <TextField
                        id="fechainicio"
                        type="date"
                        name="fechaInicio"
                        sx={{ width: 220 }}
                        onChange={handleChangeFecha}
                        InputLabelProps={{
                            shrink: true,
                        }}

                        value={ofertaSeleccionada && formateandofechas(ofertaSeleccionada.fechaInicio)}
                    // value = {ofertaSeleccionada && (ofertaSeleccionada.fechaInicio)}                   
                    />

                </div>
                <div className="col-md-2">
                    <h5> Fecha Fin Pedido </h5>
                    <TextField
                        id="fechafinalizacion"
                        type="date"
                        name="fechaFinalizacion"
                        sx={{ width: 220 }}
                        onChange={handleChangeFecha}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={ofertaSeleccionada && formateandofechas(ofertaSeleccionada.fechaFinalizacion)}
                    // value={ofertaSeleccionada && ofertaSeleccionada.fechaFinalizacion}
                    />
                </div>
                <div className="col-md-4">
                    <h5> Contacto 1 </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="contacto1"
                        options={contactos}
                        inputValue={ofertaSeleccionada.contacto1}
                        defaultValue={contacto1Editar[0]}
                        filterOptions={options => contactos.filter(contacto => contacto.codigoCliente === ofertaSeleccionada.codigoCliente && contacto.nombre !== ofertaSeleccionada.contacto2 && contacto.nombre !== ofertaSeleccionada.contacto3)}
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
                        inputValue={ofertaSeleccionada.contacto2}
                        defaultValue={contacto2Editar[0]}
                        filterOptions={options => contactos.filter(contacto => contacto.codigoCliente === ofertaSeleccionada.codigoCliente && contacto.nombre !== ofertaSeleccionada.contacto1 && contacto.nombre !== ofertaSeleccionada.contacto3)}
                        getOptionLabel={option => option.nombre}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} name="contacto2" />}
                        onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                            ...prevState,
                            contacto2: value.nombre
                        }))}
                    />
                </div>
                <div className="col-md-4">
                    <h5> Contacto 3 </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="contacto3"
                        options={contactos}
                        inputValue={ofertaSeleccionada.contacto3}
                        defaultValue={contacto3Editar[0]}
                        filterOptions={options => contactos.filter(contacto => contacto.codigoCliente === ofertaSeleccionada.codigoCliente && contacto.nombre !== ofertaSeleccionada.contacto1 && contacto.nombre !== ofertaSeleccionada.contacto2)}
                        getOptionLabel={option => option.nombre}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} name="contacto3" />}
                        onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                            ...prevState,
                            contacto3: value.nombre
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
                    <h5> Pdt. Entregar </h5>
                    <TextField className={styles.inputMaterial} type="number" name="entregar" value={resta} />
                </div>
                <div className="col-md-3">
                    <h5> Precio/u </h5>
                    <TextField
                        className={styles.inputMaterial}
                        type="number"
                        name="precio"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        onChange={handleChangePrecio} />
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
                    <Button onClick={abrirCerrarModalInsertarConsumido} variant="contained" size="small" href="#contained-buttons">
                        +
                    </Button>
                </div>
                <div className="col-md-3">
                    <h5> Pdt. Entregar </h5>
                    <TextField className={styles.inputMaterial} type="number" name="entregar" onChange={handleChangeProducto} value={resta2} />
                </div>
                <div className="col-md-3">
                    <h5> Precio/u </h5>
                    <TextField
                        className={styles.inputMaterial}
                        type="number"
                        name="precio"
                        onChange={handleChangePrecio}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        value={productoSeleccionado && productoSeleccionado.precio} />
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

    const bodyInsertarConsumido = (
        <div className={styles.modal}>
            <h3>Agregar Nuevo Consumo</h3>
            <br />
            <div className="row g-3">
                <div className="col-md-4">
                    <h5> Oferta </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="Oferta"
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
                <div className="col-md-4">
                    <h5> Codigo Proveedor </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="codigoProveedor"
                        options={proveedores}
                        getOptionLabel={option => option.codigo}
                        sx={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} name="codigoProveedor" />}
                        onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                            ...prevState,
                            codigoProveedor: value.codigo
                        }))}
                    />
                </div>
                <div className="col-md-3">
                    <h5> Modo de Envio </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="modoEnvio"
                        options={envios}
                        getOptionLabel={option => option.nombre}
                        sx={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} name="modoEnvio" />}
                        onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                            ...prevState,
                            modoEnvio: value.nombre
                        }))}
                    />
                </div>
                <div className="col-md-3">
                    <h5> Numero Albaran </h5>
                    <TextField className={styles2.inputMaterial} type="number" name="numAlbaran" onChange={handleChange} />
                </div>
            </div>
            <br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPostConsumido()}>Insertar</Button>
                <Button onClick={() => abrirCerrarModalInsertarConsumido()}>Cancelar</Button>
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
                    setOfertaSeleccionada(ofertaSeleccionada);
                    setDataProducto(dataDet.filter(producto => producto.oferta === ofertaSeleccionada.numeroOferta))
                    getOfertasProductos();
                    setClientesCodigoEditar(clientes.filter(cliente => cliente.codigo === ofertaSeleccionada.codigoCliente));
                    setClientesNombreEditar(clientes.filter(cliente => cliente.razonSocial === ofertaSeleccionada.nombreCliente));
                    setContacto1Editar(contactos.filter(contacto => contacto.nombre === ofertaSeleccionada.contacto1))
                    setContacto2Editar(contactos.filter(contacto => contacto.nombre === ofertaSeleccionada.contacto2))
                    setContacto3Editar(contactos.filter(contacto => contacto.nombre === ofertaSeleccionada.contacto3))
                    abrirCerrarModalEditar();
                }}
                onSelectionChange={(filas) => {
                    setFilasSeleccionadas(filas);
                    if (filas.length > 0) {
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

            <Modal
                open={modalInsertarConsumido}
                onClose={abrirCerrarModalInsertarConsumido}>
                {bodyInsertarConsumido}
            </Modal>

        </div>
    )
}

export default OfertasClientes;