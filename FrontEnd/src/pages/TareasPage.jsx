import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Typography, Button, Snackbar, Slide } from '@mui/material';
import axios from "axios";
import MuiAlert from '@mui/material/Alert';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { ThemeContext } from "../router/AppRouter";
import { MainLayout } from "../layout/MainLayout";
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';
import { InsertarTareaModal } from '../components/Modals/InsertarTareaModal';
import { EditarTareaModal } from '../components/Modals/EditarTareaModal';
import { insertarBotonesModal } from '../helpers/insertarBotonesModal';
import { ModalLayout } from "../components/ModalLayout";
import { getOfertas, deleteTareas, getAnalisis, getAnalisisNivelesPlantasCliente, getClientes, getConfNivelesPlantasCliente, getElementosPlanta, getTareas, getUsuarios, postParametrosAnalisisPlanta, postTareas, putTareas } from "../api";

const token = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//Tipos Mantenimiento
const tipos = [
  { id: 1, nombre: "Mensual" },
  { id: 2, nombre: "Bimensual" },
  { id: 3, nombre: "Trimestral" },
  { id: 4, nombre: "Semestral" },
  { id: 5, nombre: "Anual" }
]

export const TareasPage = () => {

  const { valores, setValores } = useContext(ThemeContext);

  let opcionesFiltradas = [];
  let opcionesFiltradasAnalisis = [];
  let opcionesNombreFiltradasAnalisis = [];

  //variables
  const [modalInsertar, setModalInsertar] = useState(false);

  const [modalEditar, setModalEditar] = useState(false);

  const [modalEliminar, setModalEliminar] = useState(false);

  //modals detalle

  const [rows, setRows] = useState([]);
  const [rowsIds, setRowsIds] = useState([]);

  const [tareaSeleccionada, setTareaSeleccionada] = useState({

    id: 0,
    codigoCliente: 0,
    nombreCliente: "",
    oferta: 0,
    pedido: 0,
    operario: "",
    protocolo: "",
    elemento: 0,
    nombreElemento: "",
    analisis: 0,
    nombreAnalisis: "",
    fecha: null,
    tipo: 0,
    addDate: null,
    addIdUser: null,
    modDate: null,
    modIdUser: null,
    delDate: null,
    delIdUser: null,
    deleted: null,

  });

  const [analisisSeleccionado, setAnalisisSeleccionado] = useState({

    id: 0,
    codigoCliente: 0,
    nombreCliente: '',
    oferta: 0,
    pedido: 0,
    elemento: 0,
    nombreElemento: '',
    periodo: '',
    analisis: 0,
    fecha: null,
    recogido: false,
    fechaRecogido: null,
    realizado: false,
    fechaRealizado: null,
    operario: '',
    protocolo: '',
    observaciones: '',
    facturado: false,
    numeroFacturado: '',
    cancelado: false,
    comentarios: '',
    addDate: null,
    addIdUser: null,
    modDate: null,
    modIdUser: null,
    delDate: null,
    delIdUser: null,
    deleted: null,
  });

  const [nombreClienteEditar, setNombreClienteEditar] = useState([]);
  const [clienteTareaEditar, setClienteTareaEditar] = useState([]);
  const [elementoTareaEditar, setElementoTareaEditar] = useState([]);
  const [tipoTareaEditar, setTipoTareaEditar] = useState([]);
  const [tecnicoTareaEditar, setTecnicoTareaEditar] = useState([]);
  const [ofertaEditar, setOfertaEditar] = useState([]);
  const [analisisEditar, setAnalisisEditar] = useState([]);

  const [TareaEliminar, setTareaEliminar] = useState([]);

  const [estadoOperario, setEstadoOperario] = useState(true);
  const [estadoProtocolo, setEstadoProtocolo] = useState(true);

  const [data, setData] = useState([]);
  const [dataDet, setDataDet] = useState([]);

  const [tecnicos, setTecnicos] = useState([]);

  const [elementosplanta, setElementosPlanta] = useState([]);

  const [clientes, setClientes] = useState([]);
  const [analisis, setAnalisis] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [operarios, setOperarios] = useState([]);

  const [confNivelesPlantasCliente, setConfNivelesPlantasCliente] = useState([]);
  const [analisisNivelesPlantasCliente, setAnalisisNivelesPlantasCliente] = useState([]);

  const [clientesTable, setClientesTable] = useState({});

  const [elementosplantaTable, setElementosPlantaTable] = useState({});

  const [operariosTable, setOperariosTable] = useState({});

  const [tiposTable, setTiposTable] = useState({});

  const [elementosAutocomplete, setElementosAutocomplete] = useState([]);
  const [analisisAutocomplete, setAnalisisAutocomplete] = useState([]);

  let navigate = useNavigate();

  const [snackData, setSnackData] = useState({ open: false, msg: 'Testing', severity: 'success' });

  const columns = [
    { headerName: 'Cliente', field: 'codigoCliente', width: 120 },
    { headerName: 'Nombre Cliente', field: 'nombreCliente', width: 250 },
    { 
      headerName: 'Operario', 
      field: 'operario', 
      width: 300,
      valueFormatter: (params) => {
        const oper = operarios.find((operario) => operario.id === params.value);
        return oper ? oper.nombre + ' ' + oper.apellidos : '';
      }
    },
    { 
      headerName: 'Elemento', 
      field: 'elemento', 
      width: 250,
      valueFormatter: (params) => {
        const elemento = elementosplanta.find((elemento) => elemento.id === params.value);
        return elemento ? elemento.nombre + ' ' + elemento.numero : '';
      }
    },
    { 
      headerName: 'Analisis', 
      field: 'analisis', 
      width: 250,
      valueFormatter: (params) => {
        const analisi = analisis.find((analisi) => analisi.id === params.value);
        return analisi ? analisi.nombre : '';
      }
    },
    { headerName: 'Oferta', field: 'oferta', width: 150 },
    { 
      headerName: 'Tipo', 
      field: 'tipo', 
      width: 150,
      valueFormatter: (params) => {
        const type = tipos.find((type) => type.id === params.value);
        return type ? type.nombre : '';
      }
    },
    { 
      headerName: 'Fecha', 
      field: 'fecha',  
      width: 250,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      }
    }

  ];

  //peticiones API
  const GetCliente = async () => {

    const resp = await getClientes();

    const cliente = Object.entries(resp).map(([key, value]) => (key, value))
    setClientes(cliente);

  }

  const GetTecnicos = async () => {

    const resp = await getUsuarios();

    const usuario = Object.entries(resp).map(([key, value]) => (key, value));
    setTecnicos(usuario);

  }

  const GetElementoPlanta = async () => {

    const resp = await getElementosPlanta();

    const elemento = Object.entries(resp).map(([key, value]) => (key, value))
    setElementosPlanta(elemento);

  }

  const peticionGet = async () => {

    const resp = await getTareas();
    setData(resp);

  }

  const GetConfNivelPlantaCliente = async () => {

    const resp = await getConfNivelesPlantasCliente();

    const niveles = Object.entries(resp).map(([key, value]) => (key, value));
    setConfNivelesPlantasCliente(niveles);

  }

  const GetAnalisisNivelesPlantasCliente = async () => {

    const resp = await getAnalisisNivelesPlantasCliente();

    const analisisNiveles = Object.entries(resp).map(([key, value]) => (key, value))
    setAnalisisNivelesPlantasCliente(analisisNiveles);

  }

  const GetAnalisi = async () => {

    const resp = await getAnalisis();

    const analisi = Object.entries(resp).map(([key, value]) => (key, value))
    setAnalisis(analisi);

  }

  useEffect(() => {
    peticionGet();
    GetElementoPlanta();
    GetCliente();
    GetTecnicos();
    GetConfNivelPlantaCliente();
    GetAnalisisNivelesPlantasCliente();
    GetAnalisi();

    getOfertas()
      .then(ofertas => {
        setOfertas(ofertas);
      })

    getUsuarios()
      .then(operarios => {
        setOperarios(operarios);
      })

  }, [])

  useEffect(() => {

    if (data.length > 0) {
      setRows(data);
    }

  }, [data]);

  useEffect(() => {

    const nombre = clientes.filter(cliente => cliente.codigo === tareaSeleccionada.codigoCliente);
    (nombre.length > 0) && setTareaSeleccionada({
      ...tareaSeleccionada,
      nombreCliente: nombre[0].razonSocial
    })

  }, [tareaSeleccionada.codigoCliente])

  useEffect(() => {

    const pedido = ofertas.filter(pedido => pedido.numeroOferta === tareaSeleccionada.oferta);
    (pedido.length > 0) && setTareaSeleccionada({
      ...tareaSeleccionada,
      pedido: pedido[0].pedido
    })

  }, [tareaSeleccionada.oferta])


  useEffect(() => {

    opcionesFiltradas = [];

    const lista = confNivelesPlantasCliente.filter(planta => planta.codigoCliente === tareaSeleccionada.codigoCliente && planta.oferta === tareaSeleccionada.oferta);
    lista.map(elemento => {
      opcionesFiltradas.push(elementosplanta.filter(elem => elem.id === elemento.id_Elemento)[0]);
    })

    setElementosAutocomplete(opcionesFiltradas);

  }, [tareaSeleccionada.codigoCliente, tareaSeleccionada.oferta]);

  useEffect(() => {

    opcionesFiltradasAnalisis = [];
    opcionesNombreFiltradasAnalisis = [];

    const lista = confNivelesPlantasCliente.filter(planta => planta.codigoCliente === tareaSeleccionada.codigoCliente && planta.oferta === tareaSeleccionada.oferta && planta.id_Elemento === tareaSeleccionada.elemento);

    lista.map(analisis => {
      opcionesFiltradasAnalisis.push(analisisNivelesPlantasCliente.filter(anal => anal.id_NivelesPlanta === analisis.id));
    })

    opcionesFiltradasAnalisis.map(nomAnalisis => {
      nomAnalisis.map(anal => {
        opcionesNombreFiltradasAnalisis.push(analisis.filter(an => an.id === anal.id_Analisis)[0])
      })
    })

    setAnalisisAutocomplete(opcionesNombreFiltradasAnalisis)

  }, [tareaSeleccionada.elemento])

  useEffect(() => {

    let lookupOperario = {};
    operarios.map(fila => lookupOperario[fila.id] = fila.nombre + ' ' + fila.apellidos)
    setOperariosTable(lookupOperario)

    let lookupTipos = {};
    tipos.map(fila => lookupTipos = { ...lookupTipos, [fila.id]: fila.nombre });
    setTiposTable(lookupTipos);

  }, [operarios, tipos])

  const peticionPost = async () => {

    tareaSeleccionada.id = null;

    const response = await postTareas(tareaSeleccionada);

    //Creamos los detalles
    var date = new Date(tareaSeleccionada.fecha);

    if (tareaSeleccionada.tipo === 1) {
      for (let i = 0; i < 12; i++) {

        analisisSeleccionado.id = 0;
        analisisSeleccionado.codigoCliente = response.codigoCliente;
        analisisSeleccionado.nombreCliente = response.nombreCliente;
        analisisSeleccionado.oferta = response.oferta;
        analisisSeleccionado.pedido = response.pedido;
        analisisSeleccionado.elemento = response.elemento;
        analisisSeleccionado.nombreElemento = tareaSeleccionada.nombreElemento;
        analisisSeleccionado.periodo = date.toLocaleDateString('es', { year: 'numeric', month: 'short' });
        analisisSeleccionado.analisis = response.analisis;
        analisisSeleccionado.fecha = date.toJSON();
        analisisSeleccionado.recogido = false;
        analisisSeleccionado.realizado = false;
        analisisSeleccionado.operario = response.operario;
        analisisSeleccionado.protocolo = response.protocolo;
        analisisSeleccionado.observaciones = "";
        analisisSeleccionado.facturado = false;
        analisisSeleccionado.numeroFacturado = "";
        analisisSeleccionado.cancelado = false;
        analisisSeleccionado.comentarios = "";
        date.setMonth(date.getMonth() + 1)
        peticionPostVis();
      }
    }
    if (tareaSeleccionada.tipo === 2) {
      for (let i = 0; i < 6; i++) {

        analisisSeleccionado.id = 0;
        analisisSeleccionado.codigoCliente = response.codigoCliente;
        analisisSeleccionado.nombreCliente = response.nombreCliente;
        analisisSeleccionado.oferta = response.oferta;
        analisisSeleccionado.pedido = response.pedido;
        analisisSeleccionado.elemento = response.elemento;
        analisisSeleccionado.nombreElemento = tareaSeleccionada.nombreElemento;
        analisisSeleccionado.periodo = date.toLocaleDateString('es', { year: 'numeric', month: 'short' });
        analisisSeleccionado.analisis = response.analisis;
        analisisSeleccionado.fecha = date.toJSON();
        analisisSeleccionado.recogido = false;
        analisisSeleccionado.fechaRecogido = null;
        analisisSeleccionado.realizado = false;
        analisisSeleccionado.fechaRealizado = null;
        analisisSeleccionado.operario = response.operario;
        analisisSeleccionado.protocolo = response.protocolo;
        analisisSeleccionado.observaciones = "";
        analisisSeleccionado.facturado = false;
        analisisSeleccionado.numeroFacturado = "";
        analisisSeleccionado.cancelado = false;
        analisisSeleccionado.comentarios = "";
        date.setMonth(date.getMonth() + 2)
        peticionPostVis();
      }
    }
    if (tareaSeleccionada.tipo === 3) {
      for (let i = 0; i < 4; i++) {

        analisisSeleccionado.id = 0;
        analisisSeleccionado.codigoCliente = response.codigoCliente;
        analisisSeleccionado.nombreCliente = response.nombreCliente;
        analisisSeleccionado.oferta = response.oferta;
        analisisSeleccionado.pedido = response.pedido;
        analisisSeleccionado.elemento = response.elemento;
        analisisSeleccionado.nombreElemento = tareaSeleccionada.nombreElemento;
        analisisSeleccionado.periodo = date.toLocaleDateString('es', { year: 'numeric', month: 'short' });
        analisisSeleccionado.analisis = response.analisis;
        analisisSeleccionado.fecha = date.toJSON();
        analisisSeleccionado.recogido = false;
        analisisSeleccionado.fechaRecogido = null;
        analisisSeleccionado.realizado = false;
        analisisSeleccionado.fechaRealizado = null;
        analisisSeleccionado.operario = response.operario;
        analisisSeleccionado.protocolo = response.protocolo;
        analisisSeleccionado.observaciones = "";
        analisisSeleccionado.facturado = false;
        analisisSeleccionado.numeroFacturado = "";
        analisisSeleccionado.cancelado = false;
        analisisSeleccionado.comentarios = "";
        date.setMonth(date.getMonth() + 3)
        peticionPostVis();
      }
    }
    if (tareaSeleccionada.tipo === 4) {
      for (let i = 0; i < 2; i++) {

        analisisSeleccionado.id = 0;
        analisisSeleccionado.codigoCliente = response.codigoCliente;
        analisisSeleccionado.nombreCliente = response.nombreCliente;
        analisisSeleccionado.oferta = response.oferta;
        analisisSeleccionado.pedido = response.pedido;
        analisisSeleccionado.elemento = response.elemento;
        analisisSeleccionado.nombreElemento = tareaSeleccionada.nombreElemento;
        analisisSeleccionado.periodo = date.toLocaleDateString('es', { year: 'numeric', month: 'short' });
        analisisSeleccionado.analisis = response.analisis;
        analisisSeleccionado.fecha = date.toJSON();
        analisisSeleccionado.recogido = false;
        analisisSeleccionado.fechaRecogido = null;
        analisisSeleccionado.realizado = false;
        analisisSeleccionado.fechaRealizado = null;
        analisisSeleccionado.operario = response.operario;
        analisisSeleccionado.protocolo = response.protocolo;
        analisisSeleccionado.observaciones = "";
        analisisSeleccionado.facturado = false;
        analisisSeleccionado.numeroFacturado = "";
        analisisSeleccionado.cancelado = false;
        analisisSeleccionado.comentarios = "";
        date.setMonth(date.getMonth() + 6)
        peticionPostVis();
      }
    }
    if (tareaSeleccionada.tipo === 5) {
      for (let i = 0; i < 1; i++) {
        analisisSeleccionado.id = 0;
        analisisSeleccionado.codigoCliente = response.codigoCliente;
        analisisSeleccionado.nombreCliente = response.nombreCliente;
        analisisSeleccionado.oferta = response.oferta;
        analisisSeleccionado.pedido = response.pedido;
        analisisSeleccionado.elemento = response.elemento;
        analisisSeleccionado.nombreElemento = tareaSeleccionada.nombreElemento;
        analisisSeleccionado.periodo = date.toLocaleDateString('es', { year: 'numeric', month: 'short' });
        analisisSeleccionado.analisis = response.analisis;
        analisisSeleccionado.fecha = date.toJSON();
        analisisSeleccionado.recogido = false;
        analisisSeleccionado.fechaRecogido = null;
        analisisSeleccionado.realizado = false;
        analisisSeleccionado.fechaRealizado = null;
        analisisSeleccionado.operario = response.operario;
        analisisSeleccionado.protocolo = response.protocolo;
        analisisSeleccionado.observaciones = "";
        analisisSeleccionado.facturado = false;
        analisisSeleccionado.numeroFacturado = "";
        analisisSeleccionado.cancelado = false;
        analisisSeleccionado.comentarios = "";
        date.setMonth(date.getMonth() + 12)
        peticionPostVis();
      }
    }
    /*if (tareaSeleccionada.tipo === 6) {
      for (let i = 0; i < 48; i++) {
        analisisSeleccionado.id = 0;
        analisisSeleccionado.codigoCliente = response.data.data.codigoCliente;
        analisisSeleccionado.nombreCliente = response.data.data.nombreCliente;
        analisisSeleccionado.oferta = response.data.data.oferta;
        analisisSeleccionado.pedido = response.data.data.pedido;
        analisisSeleccionado.elemento = response.data.data.elemento;
        analisisSeleccionado.nombreElemento = tareaSeleccionada.nombreElemento;
        analisisSeleccionado.periodo = "";
        analisisSeleccionado.analisis = response.data.data.analisis;
        analisisSeleccionado.fecha = date.toJSON();
        analisisSeleccionado.recogido = false;
        analisisSeleccionado.fechaRecogido = null;
        analisisSeleccionado.realizado = false;
        analisisSeleccionado.fechaRealizado = null;
        analisisSeleccionado.operario = response.data.data.operario;
        analisisSeleccionado.protocolo = response.data.data.protocolo;
        analisisSeleccionado.observaciones = "";
        analisisSeleccionado.facturado = false;
        analisisSeleccionado.numeroFacturado = "";
        analisisSeleccionado.cancelado = false;
        analisisSeleccionado.comentarios = "";
        date.setDate(date.getDay() + 7)
        peticionPostVis();
      }
    }*/

    abrirCerrarModalInsertar();
    peticionGet();
    /* setValores({ codigo: tareaSeleccionada.codigoCliente, nombre: tareaSeleccionada.nombreCliente, ofertas: tareaSeleccionada.oferta, elemento: tareaSeleccionada.elementoPlanta })
    { tareaSeleccionada.analisis === "Físico-Químico Torre" || tareaSeleccionada.analisis === "Físico-Químico Aporte" || tareaSeleccionada.analisis === "Físico-Químico Alimentación" || tareaSeleccionada.analisis === "Físico-Químico Rechazo" || tareaSeleccionada.analisis === "Físico-Químico Condensados" || tareaSeleccionada.analisis === "Físico-Químico Caldera" && navigate("/plantasTabla", { replace: true }); } */
    setTareaSeleccionada({
      id: 0,
      codigoCliente: 0,
      nombreCliente: "",
      oferta: 0,
      pedido: 0,
      operario: "",
      protocolo: "",
      elemento: 0,
      nombreElemento: "",
      analisis: 0,
      nombreAnalisis: "",
      fecha: null,
      tipo: 0,
      addDate: null,
      addIdUser: null,
      modDate: null,
      modIdUser: null,
      delDate: null,
      delIdUser: null,
      deleted: null,
    });

  }

  const peticionPut = async () => {

    const resp = await putTareas(tareaSeleccionada);

    var tareaModificada = data;
    tareaModificada.map(tarea => {
      if (tarea.id === tareaSeleccionada.id) {
        tarea = tareaSeleccionada
      }
    });
    peticionGet();
    abrirCerrarModalEditar();
    setTareaSeleccionada({
      id: 0,
      codigoCliente: 0,
      nombreCliente: "",
      oferta: 0,
      pedido: 0,
      operario: "",
      protocolo: "",
      elemento: 0,
      nombreElemento: "",
      analisis: 0,
      nombreAnalisis: "",
      fecha: null,
      tipo: 0,
      addDate: null,
      addIdUser: null,
      modDate: null,
      modIdUser: null,
      delDate: null,
      delIdUser: null,
      deleted: null,
    });
   
  }

  const peticionDelete = async () => {

    const resp = await deleteTareas(TareaEliminar[0]);

    peticionGet();
    abrirCerrarModalEliminar();
    setTareaSeleccionada({
      id: 0,
      codigoCliente: 0,
      nombreCliente: "",
      oferta: 0,
      pedido: 0,
      operario: "",
      protocolo: "",
      elemento: 0,
      nombreElemento: "",
      analisis: 0,
      nombreAnalisis: "",
      fecha: null,
      tipo: 0,
      addDate: null,
      addIdUser: null,
      modDate: null,
      modIdUser: null,
      delDate: null,
      delIdUser: null,
      deleted: null,
    });
    
  }


  const peticionPostVis = async () => {

    analisisSeleccionado.id = 0;
    analisisSeleccionado.codigoCliente = tareaSeleccionada.codigoCliente;
    analisisSeleccionado.nombreCliente = tareaSeleccionada.nombreCliente;
    analisisSeleccionado.oferta = tareaSeleccionada.oferta;
    analisisSeleccionado.analisis = tareaSeleccionada.analisis;
    analisisSeleccionado.pedido = tareaSeleccionada.pedido;
    analisisSeleccionado.elemento = tareaSeleccionada.elemento;

    const resp = await postParametrosAnalisisPlanta(analisisSeleccionado);

    //abrirCerrarModalInsertarDet();
    setAnalisisSeleccionado({
      id: 0,
      codigoCliente: 0,
      nombreCliente: '',
      oferta: 0,
      pedido: 0,
      elemento: 0,
      periodo: '',
      analisis: 0,
      fecha: null,
      recogido: false,
      fechaRecogido: null,
      realizado: false,
      fechaRealizado: null,
      operario: '',
      protocolo: '',
      observaciones: '',
      facturado: false,
      numeroFacturado: '',
      cancelado: false,
      comentarios: '',
      addDate: null,
      addIdUser: null,
      modDate: null,
      modIdUser: null,
      delDate: null,
      delIdUser: null,
      deleted: null,
    });
    
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setTareaSeleccionada(prevState => ({
      ...prevState,
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    }));
  }

  const handleChangeFecha = e => {
    const { name, value } = e.target;
    setTareaSeleccionada(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleAutocompleteChange = (e) => {

    // Obtenemos el nombre del campo y su valor
    const name = e.target.id.split('-')[0];
    const value = e.target.innerText;

    setTareaSeleccionada(prevState => ({
      ...prevState,
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    }));

  }

  const handleChangeAnalisis = (event, value) => {
    setTareaSeleccionada(prevState => ({
      ...prevState,
      analisis: parseInt(value.id),
      nombreAnalisis: value.nombre
    }))

    /*if (value.nombre === "Desinfecciones" || value.nombre === "Desinfeccion ACS" || value.nombre === "Mantenimiento Maq Frio" || value.nombre === "Mediciones" || value.nombre === "Control Fuga Gas" || value.nombre === "Agua Potable" || value.nombre === "Revision de Bandeja") {
      setEstadoOperario(false)
    } else {
      setEstadoOperario(true)
    }

    if (value.nombre === "Desinfecciones") {
      setEstadoProtocolo(false)
    } else {
      setEstadoProtocolo(true)
    }*/
  }

  //modal insertar mantenimientocab
  const abrirCerrarModalInsertar = () => {
    if (modalInsertar) {
      setTareaSeleccionada({
        id: 0,
        codigoCliente: 0,
        nombreCliente: "",
        oferta: 0,
        pedido: 0,
        operario: "",
        protocolo: "",
        elemento: 0,
        nombreElemento: "",
        analisis: 0,
        nombreAnalisis: "",
        fecha: null,
        tipo: 0,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
      })
      setModalInsertar(!modalInsertar);
    } else {
      setModalInsertar(!modalInsertar);
    }
  }

  //modal editar mantenimiento

  const abrirCerrarModalEditar = () => {
    if (modalEditar) {
      setTareaSeleccionada({
        id: 0,
        codigoCliente: 0,
        nombreCliente: "",
        oferta: 0,
        pedido: 0,
        operario: "",
        protocolo: "",
        elemento: 0,
        nombreElemento: "",
        analisis: 0,
        nombreAnalisis: "",
        fecha: null,
        tipo: 0,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
      })
      setModalEditar(!modalEditar);
    } else {
      setModalEditar(!modalEditar);
    }
  }

  // modal eliminar mantenimiento
  const abrirCerrarModalEliminar = () => {
    if (modalEliminar) {
      setTareaSeleccionada({
        id: 0,
        codigoCliente: 0,
        nombreCliente: "",
        oferta: 0,
        pedido: 0,
        operario: "",
        protocolo: "",
        elemento: 0,
        nombreElemento: "",
        analisis: 0,
        nombreAnalisis: "",
        fecha: null,
        tipo: 0,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
      })
      setModalEliminar(!modalEliminar);
    } else {
      setModalEliminar(!modalEliminar);
    }
  }

  const handleSelectRow = (ids) => {

    if (ids.length > 0) {
      setTareaSeleccionada(data.filter(tarea => tarea.id === ids[0])[0]);
    } else {
      setTareaSeleccionada(tareaSeleccionada);
    }

    setRowsIds(ids);

  }

  const handleSnackClose = (event, reason) => {

    if (reason === 'clickaway') {
      return;
    }

    setSnackData({ open: false, msg: '', severity: 'info' });

  };

  return (
    <MainLayout title="Tareas">

      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
        <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
          {snackData.msg}
        </Alert>
      </Snackbar>

      <Grid container spacing={2}>
        {/* Título y botones de opción */}
        <Grid item xs={12}>
          <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h6'>Listado de Tareas</Typography>
            {
              (rowsIds.length > 0) ?
                (
                  <Grid item>
                    <Button
                      sx={{ mr: 2 }}
                      color='error'
                      variant='contained'
                      startIcon={<DeleteIcon />}
                      onClick={(event, rowData) => {
                        setTareaEliminar(rowsIds)
                        abrirCerrarModalEliminar()
                      }}
                    >
                      Eliminar
                    </Button>
                  </Grid>
                ) : (
                  <Button
                    color='success'
                    variant='contained'
                    startIcon={<AddIcon />}
                    onClick={abrirCerrarModalInsertar}
                  >Añadir</Button>
                )
            }
          </Card>
        </Grid>

        {/* Tabla donde se muestran los registros de los clientes */}
        <Grid item xs={12}>
          <Card>
            <DataGrid
              components={{ Toolbar: GridToolbar }}
              localeText={DATAGRID_LOCALE_TEXT}
              sx={{
                width: '100%',
                height: 700,
                backgroundColor: '#FFFFFF'
              }}
              rows={rows}
              columns={columns}
              
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={(ids) => handleSelectRow(ids)}
              onRowClick={(tareaSeleccionada, evt) => {
                setTareaSeleccionada(tareaSeleccionada.row)
                setNombreClienteEditar(clientes.filter(cliente => cliente.razonSocial === tareaSeleccionada.nombreCliente))
                setClienteTareaEditar(clientes.filter(cliente => cliente.codigo === tareaSeleccionada.row.codigoCliente));
                setElementoTareaEditar(elementosplanta.filter(elemento => elemento.id === tareaSeleccionada.row.elemento));
                setTipoTareaEditar(tipos.filter(tipo => tipo.id === tareaSeleccionada.row.tipo));
                setTecnicoTareaEditar(operarios.filter(operario => operario.id === tareaSeleccionada.row.operario));
                setAnalisisEditar(analisis.filter(analisi => analisi.id === tareaSeleccionada.row.analisis));

                /*if (analisisEditar[0].nombre === "Desinfecciones" || analisisEditar[0].nombre === "Desinfeccion ACS" || analisisEditar[0].nombre === "Mantenimiento Maq Frio" || analisisEditar[0].nombre === "Mediciones" || analisisEditar[0].nombre === "Control Fuga Gas" || analisisEditar[0].nombre === "Agua Potable" || analisisEditar[0].nombre === "Revision de Bandeja") {
                  setEstadoOperario(false)
                } else {
                  setEstadoOperario(true)
                }
      
                if (analisisEditar[0].nombre === "Desinfecciones") {
                  setEstadoProtocolo(false)
                } else {
                  setEstadoProtocolo(true)
                }*/

                abrirCerrarModalEditar();
              }}
            />
          </Card>
        </Grid>
      </Grid>

      {/* LISTA DE MODALS */}

      {/* Agregar tarea */}
      <ModalLayout
        titulo="Agregar nueva tarea"
        contenido={
          <InsertarTareaModal
            change={handleChange}
            autocompleteChange={handleAutocompleteChange}
            tareaSeleccionada={tareaSeleccionada}
            handleChangeFecha={handleChangeFecha}
            setTareaSeleccionada={setTareaSeleccionada}
            handleChangeAnalisis={handleChangeAnalisis}
            //estadoProtocolo={estadoProtocolo}
            //estadoOperario={estadoOperario}
            elementosAutocomplete={elementosAutocomplete}
            analisisAutocomplete={analisisAutocomplete}
          />
        }
        botones={[
          insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
            abrirCerrarModalInsertar();

            if (peticionPost()) {
              setSnackData({ open: true, msg: 'Tarea añadida correctamente', severity: 'success' });
            } else {
              setSnackData({ open: true, msg: 'Ha habido un error al añadir la tarea', severity: 'error' })
            }

          }, 'success')
        ]}
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      />

      {/* Modal Editar Tarea*/}

      <ModalLayout
        titulo="Editar tarea"
        contenido={
          <EditarTareaModal
            tareaSeleccionada={tareaSeleccionada}
            change={handleChange}
            autocompleteChange={handleAutocompleteChange}
            handleChangeFecha={handleChangeFecha}
            setTareaSeleccionada={setTareaSeleccionada}
            handleChangeAnalisis={handleChangeAnalisis}
            //estadoProtocolo={estadoProtocolo}
            //estadoOperario={estadoOperario}
            codigoClienteEditar={clienteTareaEditar}
            tipoTareaEditar={tipoTareaEditar}
            tecnicoTareaEditar={tecnicoTareaEditar}
            elementosAutocomplete={elementosAutocomplete}
            analisisAutocomplete={analisisAutocomplete}
            elementoTareaEditar={elementoTareaEditar}
            analisisEditar={analisisEditar}
          />}
        botones={[insertarBotonesModal(<AddIcon />, 'Editar', async () => {
          abrirCerrarModalEditar()

          if (peticionPut()) {
            setSnackData({ open: true, msg: 'Tarea editada correctamente', severity: 'success' });
          } else {
            setSnackData({ open: true, msg: 'Ha habido un error al editar la tarea', severity: 'error' })
          }
        })
        ]}
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      />

      {/* Eliminar tarea */}
      <ModalLayout
        titulo="Eliminar tarea"
        contenido={
          <>
            <Grid item xs={12}>
              <Typography>Estás seguro que deseas eliminar la tarea?</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><b>{tareaSeleccionada.nombreCliente}</b></Typography>
            </Grid>
          </>
        }
        botones={[
          insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
            abrirCerrarModalEliminar();

            if (peticionDelete()) {
              setSnackData({ open: true, msg: `Tarea eliminada correctamente: ${tareaSeleccionada.nombreCliente}`, severity: 'success' });
            } else {
              setSnackData({ open: true, msg: 'Ha habido un error al eliminar la tarea', severity: 'error' })
            }

          }, 'error'),
          insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
        ]}
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      />

    </MainLayout>
  );

}