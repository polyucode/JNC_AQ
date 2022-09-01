import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MaterialTable from '@material-table/core';
import axios from "axios";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { Modal, TextField, Button } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import { ThemeContext } from "../App";

import FullCalendar from '@fullcalendar/react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { FamilyRestroomRounded } from "@mui/icons-material";


const token = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
};

//Tipos Mantenimiento
const tipos = [
  { id: 1, nombre: "Mensual" },
  { id: 2, nombre: "Bimensual" },
  { id: 3, nombre: "Trimestral" },
  { id: 4, nombre: "Semestral" },
  { id: 5, nombre: "Anual" }
  /*{ id: 6, nombre: "Semanal" },
  { id: 7, nombre: "Bisemanal" }*/
]

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

const final = [
  {
    value: 'PDF',
    label: 'PDF',
  },
  {
    value: 'Ok',
    label: 'Ok',
  }
];

const protocolos = [
  {
    value: 'Desinfeccion Parado 4B',
    label: 'Desinfeccion Parado 4B'
  },
  {
    value: 'Desinfeccion Continuo 4B',
    label: 'Desinfeccion Continuo 4B'
  },
  {
    value: 'Desinfeccion limpieza parado',
    label: 'Desinfeccion limpieza parado'
  },
  {
    value: 'Desinfeccion limpieza continuo',
    label: 'Desinfeccion limpieza continuo'
  },
  {
    value: 'Desinfeccion Protocolo 4C',
    label: 'Desinfeccion Protocolo 4C'
  },
  {
    value: 'Desinfeccion de aporte',
    label: 'Desinfeccion de aporte'
  },
  {
    value: 'Desinfeccion contraincendios',
    label: 'Desinfeccion contraincendios'
  },
  {
    value: 'Desinfeccion parado fuente ornamental',
    label: 'Desinfeccion parado fuente ornamental'
  },
  {
    value: 'Desinfeccion ACS (termico)',
    label: 'Desinfeccion ACS (termico)'
  },
  {
    value: 'Desinfeccion AFCH (cloracion)',
    label: 'Desinfeccion AFCH (cloracion)'
  }
]

//estilos modal
const useStylesEditarDet = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 1500,
    height: 1120,
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
    width: '100%',
    height: 50
  }
}));

//estilos modal
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 1050,
    height: 750,
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
    width: '100%',
    height: 50
  }
}));

const useStyles2 = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 1150,
    height: 750,
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
    width: '45%',
    height: 55
  }
}));

const useStylesEliminar = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 650,
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
    width: '100%',
    height: 75
  }
}));

// tablas español
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

function Tareas() {

  const { valores, setValores } = useContext(ThemeContext);


  //variables
  const [modalInsertar, setModalInsertar] = useState(false);

  const [modalEditar, setModalEditar] = useState(false);

  const [modalEliminar, setModalEliminar] = useState(false);

  //modals detalle
  const [modalInsertarDet, setModalInsertarDet] = useState(false);

  const [modalEditarDet, setModalEditarDet] = useState(false);

  const [modalEliminarDet, setModalEliminarDet] = useState(false);

  const [modalCalendario, setmodalCalendario] = useState(false);


  const [tareaSeleccionada, setTareaSeleccionada] = useState({

    id: 0,
    codigoCliente: 0,
    nombreCliente: "",
    oferta: 0,
    pedido: 0,
    operario: "",
    protocolo: "",
    elementoPlanta: "",
    analisis: "",
    final: "",
    valor: "",
    nombreValor: "",
    unidades: "",
    tipo: 0,
    cancelado: false,
    comentarios: "",
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
    elemento: '',
    periodo: '',
    analisis: '',
    fecha: null,
    realizado: false,
    operario: '',
    protocolo: '',
    observaciones: '',
    facturado: false,
    numeroFacturado: '',
    recogido: false,
    addDate: null,
    addIdUser: null,
    modDate: null,
    modIdUser: null,
    delDate: null,
    delIdUser: null,
    deleted: null,
  });

  const [entregaSeleccionada, setEntregaSeleccionada] = useState({

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
  });

  const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);
  const [FilasSeleccionadasVis, setFilasSeleccionadasVis] = useState([]);

  const [nombreClienteEditar, setNombreClienteEditar] = useState([]);
  const [clienteTareaEditar, setClienteTareaEditar] = useState([]);
  const [elementoTareaEditar, setElementoTareaEditar] = useState([]);
  const [tipoTareaEditar, setTipoTareaEditar] = useState([]);
  const [tecnicoTareaEditar, setTecnicoTareaEditar] = useState([]);
  const [ofertaEditar, setOfertaEditar] = useState([]);
  const [analisisEditar, setAnalisisEditar] = useState([]);

  const [clienteAnalisisEditar, setClienteAnalisisEditar] = useState([]);

  const [TareaEliminar, setTareaEliminar] = useState([]);

  const [AnalisisEliminar, setAnalisisEliminar] = useState([]);

  const [data, setData] = useState([]);
  const [dataVis, setDataVis] = useState([]);
  const [dataAnalisis, setDataAnalisis] = useState([]);
  const [dataEntregas, setDataEntregas] = useState([]);

  const [operarios, setOperarios] = useState([]);

  const [elementosplanta, setElementosPlanta] = useState([]);

  const [clientes, setClientes] = useState([]);

  const [analisis, setAnalisis] = useState([]);

  const [ofertas, setOfertas] = useState([]);

  const [confAnalisisNivelesPlantasCliente, setConfAnalisisNivelesPlantasCliente] = useState([]);

  const [elementosplantaTable, setElementosPlantaTable] = useState({});

  const [tiposTable, setTiposTable] = useState({});

  const [operariosTable, setOperariosTable] = useState({});

  const [analisisTable, setAnalisisTable] = useState({});

  const [fechaprevista, setfechaprevista] = useState("");

  const [estadoInput, setEstadoInput] = useState(true);
  const [estadoValor, setEstadoValor] = useState(true);
  const [estadoCancelado, setEstadoCancelado] = useState(true);
  const [estadoOperario, setEstadoOperario] = useState(true);
  const [estadoProtocolo, setEstadoProtocolo] = useState(true);
  const [estadoRecogido, setEstadoRecogido] = useState(true);

  const styles = useStyles();
  const styles2 = useStyles2();

  const stylesEditarDet = useStylesEditarDet();
  const stylesEliminar = useStylesEliminar();

  let navigate = useNavigate();

  const columnas = [

    //visibles
    { title: 'Cliente', field: 'codigoCliente', filterPlaceholder: "Filtrar por cliente" },
    { title: 'Nombre Cliente', field: 'nombreCliente', filterPlaceholder: "Filtrar por cliente" },
    { title: 'Operario', field: 'operario', filterPlaceholder: "Filtrar por técnico" },
    { title: 'Elemento de planta', field: 'elementoPlanta', filterPlaceholder: "Filtrar por elemento" },
    { title: 'Analisis', field: 'analisis', filterPlaceholder: "Filtrar por Analisis" },
    { title: 'Oferta', field: 'oferta', filterPlaceholder: "Filtrar por oferta" },
    { title: 'Tipo', field: 'tipo', lookup: tiposTable, filterPlaceholder: "Filtrar por tipo" },

    //Ocultas
    { title: 'Fecha creación', field: 'addDate', type: 'date', filterPlaceholder: "Filtrar por fecha creacion", hidden: true },
    { title: 'Usuario creación', field: 'AddIdUser', filterPlaceholder: "Filtrar por Usuario creación", hidden: true },
    { title: 'Fecha eliminación', field: 'delDate', type: 'date', filterPlaceholder: "Filtrar por Fecha eliminación", hidden: true },
    { title: 'Usuario eliminación', field: 'delIdUser', filterPlaceholder: "Filtrar por Usuario eliminación", hidden: true },
    { title: 'Eliminado', field: 'deleted', type: 'boolean', filterPlaceholder: "Filtrar por Eliminado", hidden: true },
    { title: 'Id', field: 'id', filterPlaceholder: "Filtrar por Id", hidden: true, },
    { title: 'Fecha modificación', field: 'modDate', type: 'date', filterPlaceholder: "Filtrar por Fecha modificación", hidden: true },
    { title: 'Usuario modificacion', field: 'modIdUser', filterPlaceholder: "Filtrar por Usuario modificacion", hidden: true },

  ];

  const columnasVis = [
    //visibles
    { title: 'Periodo', field: 'periodo' },
    { title: 'Fecha', field: 'fecha', type: 'date' },
    { title: 'Realizado', field: 'realizado', type: 'boolean' },
    { title: 'Protocolo', field: 'protocolo' },
    { title: 'Observaciones', field: 'observaciones' },
    { title: 'Facturado', field: 'facturado', type: 'boolean' },
    { title: 'Numero Facturado', field: 'numeroFacturado' }
  ];

  //peticiones API
  const GetClientes = async () => {
    axios.get("/cliente", token).then(response => {
      const cliente = Object.entries(response.data.data).map(([key, value]) => (key, value))
      setClientes(cliente);
    }, [])
  }

  const GetOperarios = async () => {
    axios.get("/usuario", token).then(response => {
      const usuario = Object.entries(response.data.data).map(([key, value]) => (key, value))
      setOperarios(usuario);
    }, [])
  }

  const GetElementosPlanta = async () => {
    axios.get("/elementosplanta", token).then(response => {
      const elemento = Object.entries(response.data.data).map(([key, value]) => (key, value))
      setElementosPlanta(elemento);
    }, [])
  }

  const GetAnalisis = async () => {
    axios.get("/analisis", token).then(response => {
      const analisi = Object.entries(response.data.data).map(([key, value]) => (key, value))
      setAnalisis(analisi);
    }, [])
  }

  const GetOfertas = async () => {
    axios.get("/ofertasclientes", token).then(response => {
      const oferta = Object.entries(response.data.data).map(([key, value]) => (key, value))
      setOfertas(oferta);
    }, [])
  }

  const GetConfAnalisisNivelesPlantasCliente = async () => {
    axios.get("/analisisnivelesplantascliente", token).then(response => {
      const niveles = Object.entries(response.data.data).map(([key, value]) => (key, value))
      setConfAnalisisNivelesPlantasCliente(niveles);
    }, [])
  }

  const peticionGet = async () => {
    axios.get("/tareas", token).then(response => {
      setData(response.data.data)
    })
  }

  const peticionGetVis = async () => {
    axios.get("/parametrosanalisisplanta", token).then(response => {
      setDataVis(response.data.data)
    })
  }

  const peticionGetAnalisis = async () => {
    axios.get("/parametrosanalisisplanta", token).then(response => {
      setDataAnalisis(response.data.data.filter(analisi => analisi.codigoCliente === tareaSeleccionada.codigoCliente && analisi.oferta === tareaSeleccionada.oferta && analisi.elemento === tareaSeleccionada.elementoPlanta && analisi.analisis === tareaSeleccionada.analisis))
    })
  }

  const peticionGetEntregas = async () => {
    axios.get("/entregas", token).then(response => {
      setDataEntregas(response.data.data)
    })
  }

  useEffect(() => {
    peticionGet();
    GetElementosPlanta();
    GetClientes();
    GetOperarios();
    GetAnalisis();
    GetOfertas();
    GetConfAnalisisNivelesPlantasCliente();
    peticionGetAnalisis();
    peticionGetVis();
    peticionGetEntregas();
  }, [])


  useEffect(() => {
    const lookupOperario = {};
    operarios.map(fila => lookupOperario[fila.id] = fila.nombre + ' ' + fila.apellidos)
    setOperariosTable(lookupOperario)

    const lookupElementosPlanta = {};
    elementosplanta.map(fila => lookupElementosPlanta[fila.id] = fila.nombre);
    setElementosPlantaTable(lookupElementosPlanta);
    //console.log("ElementosTable " + JSON.stringify(elementosplantaTable))

    const lookupTipos = {};
    tipos.map(fila => lookupTipos[fila.id] = fila.nombre);
    setTiposTable(lookupTipos);
    //console.log("tiposTable " + JSON.stringify(tiposTable))

    const lookupAnalisis = {};
    analisis.map(fila => lookupAnalisis[fila.id] = fila.nombre);
    setAnalisisTable(lookupAnalisis);

  }, [elementosplanta, analisis, tipos, operarios])

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

    const analisisFiltro = confAnalisisNivelesPlantasCliente.filter(planta => planta.codigoCliente === tareaSeleccionada.codigoCliente && planta.oferta === tareaSeleccionada.oferta);
    (analisisFiltro.length > 0) && console.log(analisisFiltro)
    const newArray = [];
    analisisFiltro.forEach(analisi => {
      if (newArray === []) {
        newArray.push(analisi.elemento)
      } else {
        if (!newArray.includes(analisi.elemento)) {
          newArray.push(analisi.elemento)
        }
      }
    })
    console.log(newArray)

  }, [tareaSeleccionada.oferta])


  const peticionPost = async () => {
    tareaSeleccionada.id = null;
    await axios.post("/tareas", tareaSeleccionada, token)
      .then(response => {
        //Creamos los detalles
        var date = new Date(fechaprevista);

        if (tareaSeleccionada.tipo === 1) {
          for (let i = 0; i < 12; i++) {

            analisisSeleccionado.id = null;
            analisisSeleccionado.codigoCliente = response.data.data.codigoCliente;
            analisisSeleccionado.nombreCliente = response.data.data.nombreCliente;
            analisisSeleccionado.oferta = response.data.data.oferta;
            analisisSeleccionado.pedido = response.data.data.pedido;
            analisisSeleccionado.elemento = response.data.data.elementoPlanta;
            analisisSeleccionado.periodo = date.toLocaleDateString('es', { year: 'numeric', month: 'short' });
            analisisSeleccionado.analisis = response.data.data.analisis;
            analisisSeleccionado.fecha = date.toJSON();
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.operario = response.data.data.operario;
            analisisSeleccionado.protocolo = response.data.data.protocolo;
            analisisSeleccionado.observaciones = "";
            analisisSeleccionado.facturado = false;
            analisisSeleccionado.numeroFacturado = "";
            date.setMonth(date.getMonth() + 1)
            peticionPostVis();
          }
        }
        if (tareaSeleccionada.tipo === 2) {
          for (let i = 0; i < 6; i++) {

            analisisSeleccionado.id = null;
            analisisSeleccionado.codigoCliente = response.data.data.codigoCliente;
            analisisSeleccionado.nombreCliente = response.data.data.nombreCliente;
            analisisSeleccionado.oferta = response.data.data.oferta;
            analisisSeleccionado.pedido = response.data.data.pedido;
            analisisSeleccionado.elemento = response.data.data.elementoPlanta;
            analisisSeleccionado.periodo = date.toLocaleDateString('es', { year: 'numeric', month: 'short' });
            analisisSeleccionado.analisis = response.data.data.analisis;
            analisisSeleccionado.fecha = date.toJSON();
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.operario = response.data.data.operario;
            analisisSeleccionado.protocolo = response.data.data.protocolo;
            analisisSeleccionado.observaciones = "";
            analisisSeleccionado.facturado = false;
            analisisSeleccionado.numeroFacturado = "";
            date.setMonth(date.getMonth() + 2)
            peticionPostVis();
          }
        }
        if (tareaSeleccionada.tipo === 3) {
          for (let i = 0; i < 4; i++) {

            analisisSeleccionado.id = null;
            analisisSeleccionado.codigoCliente = response.data.data.codigoCliente;
            analisisSeleccionado.nombreCliente = response.data.data.nombreCliente;
            analisisSeleccionado.oferta = response.data.data.oferta;
            analisisSeleccionado.pedido = response.data.data.pedido;
            analisisSeleccionado.elemento = response.data.data.elementoPlanta;
            analisisSeleccionado.periodo = date.toLocaleDateString('es', { year: 'numeric', month: 'short' });
            analisisSeleccionado.analisis = response.data.data.analisis;
            analisisSeleccionado.fecha = date.toJSON();
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.operario = response.data.data.operario;
            analisisSeleccionado.protocolo = response.data.data.protocolo;
            analisisSeleccionado.observaciones = "";
            analisisSeleccionado.facturado = false;
            analisisSeleccionado.numeroFacturado = "";
            date.setMonth(date.getMonth() + 3)
            peticionPostVis();
          }
        }
        if (tareaSeleccionada.tipo === 4) {
          for (let i = 0; i < 2; i++) {

            analisisSeleccionado.id = null;
            analisisSeleccionado.codigoCliente = response.data.data.codigoCliente;
            analisisSeleccionado.nombreCliente = response.data.data.nombreCliente;
            analisisSeleccionado.oferta = response.data.data.oferta;
            analisisSeleccionado.pedido = response.data.data.pedido;
            analisisSeleccionado.elemento = response.data.data.elementoPlanta;
            analisisSeleccionado.periodo = date.toLocaleDateString('es', { year: 'numeric', month: 'short' });
            analisisSeleccionado.analisis = response.data.data.analisis;
            analisisSeleccionado.fecha = date.toJSON();
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.operario = response.data.data.operario;
            analisisSeleccionado.protocolo = response.data.data.protocolo;
            analisisSeleccionado.observaciones = "";
            analisisSeleccionado.facturado = false;
            analisisSeleccionado.numeroFacturado = "";
            date.setMonth(date.getMonth() + 6)
            peticionPostVis();
          }
        }
        if (tareaSeleccionada.tipo === 5) {
          for (let i = 0; i < 1; i++) {
            analisisSeleccionado.id = null;
            analisisSeleccionado.codigoCliente = response.data.data.codigoCliente;
            analisisSeleccionado.nombreCliente = response.data.data.nombreCliente;
            analisisSeleccionado.oferta = response.data.data.oferta;
            analisisSeleccionado.pedido = response.data.data.pedido;
            analisisSeleccionado.elemento = response.data.data.elementoPlanta;
            analisisSeleccionado.periodo = date.toLocaleDateString('es', { year: 'numeric', month: 'short' });
            analisisSeleccionado.analisis = response.data.data.analisis;
            analisisSeleccionado.fecha = date.toJSON();
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.operario = response.data.data.operario;
            analisisSeleccionado.protocolo = response.data.data.protocolo;
            analisisSeleccionado.observaciones = "";
            analisisSeleccionado.facturado = false;
            analisisSeleccionado.numeroFacturado = "";
            date.setMonth(date.getMonth() + 12)
            peticionPostVis();
          }
        }
        /*if (tareaSeleccionada.tipo === 6) {
          for (let i = 0; i < 48; i++) {
            analisisSeleccionado.id = null;
            analisisSeleccionado.codigoCliente = response.data.data.codigoCliente;
            analisisSeleccionado.nombreCliente = response.data.data.nombreCliente;
            analisisSeleccionado.oferta = response.data.data.oferta;
            analisisSeleccionado.pedido = response.data.data.pedido;
            analisisSeleccionado.elemento = response.data.data.elementoPlanta;
            analisisSeleccionado.periodo = "";
            analisisSeleccionado.analisis = response.data.data.analisis;
            analisisSeleccionado.fecha = date.toJSON();
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.operario = response.data.data.operario;
            analisisSeleccionado.protocolo = response.data.data.protocolo;
            analisisSeleccionado.observaciones = "";
            analisisSeleccionado.facturado = false;
            analisisSeleccionado.numeroFacturado = "";
            date.setDate(date.getDay() + 7)
            peticionPostVis();
          }
        }*/

        abrirCerrarModalInsertar();
        peticionGet();
        setValores({ codigo: tareaSeleccionada.codigoCliente, nombre: tareaSeleccionada.nombreCliente, ofertas: tareaSeleccionada.oferta, elemento: tareaSeleccionada.elementoPlanta })
        { tareaSeleccionada.analisis === "Físico-Químico Torre" || tareaSeleccionada.analisis === "Físico-Químico Aporte" || tareaSeleccionada.analisis === "Físico-Químico Alimentación" || tareaSeleccionada.analisis === "Físico-Químico Rechazo" || tareaSeleccionada.analisis === "Físico-Químico Condensados" || tareaSeleccionada.analisis === "Físico-Químico Caldera" && navigate("/plantasTabla", { replace: true }); }
        setTareaSeleccionada({
          id: 0,
          codigoCliente: 0,
          nombreCliente: "",
          operario: "",
          protocolo: "",
          elementoPlanta: "",
          oferta: 0,
          pedido: 0,
          analisis: "",
          final: "",
          valor: "",
          nombreValor: "",
          unidades: "",
          tipo: 0,
          cancelado: false,
          comentarios: "",
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
    await axios.put("/tareas?id=" + tareaSeleccionada.id, tareaSeleccionada, token)
      .then(response => {
        var tareaSeleccionada = data;
        tareaSeleccionada.map(tarea => {
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
          operario: "",
          protocolo: "",
          elementoPlanta: "",
          oferta: 0,
          pedido: 0,
          analisis: "",
          final: "",
          valor: "",
          nombreValor: "",
          unidades: "",
          tipo: 0,
          cancelado: false,
          comentarios: "",
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
    await axios.delete("/tareas/" + TareaEliminar[0].id, token)
      .then(response => {
        peticionGet();
        abrirCerrarModalEliminar();
        setTareaSeleccionada({
          id: 0,
          codigoCliente: 0,
          nombreCliente: "",
          operario: "",
          protocolo: "",
          elementoPlanta: "",
          oferta: 0,
          pedido: 0,
          analisis: "",
          final: "",
          valor: "",
          nombreValor: "",
          unidades: "",
          tipo: 0,
          cancelado: false,
          comentarios: "",
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

  const peticionPostVis = async () => {
    analisisSeleccionado.id = 0;
    analisisSeleccionado.codigoCliente = tareaSeleccionada.codigoCliente;
    analisisSeleccionado.nombreCliente = tareaSeleccionada.nombreCliente;
    analisisSeleccionado.oferta = tareaSeleccionada.oferta;
    analisisSeleccionado.analisis = tareaSeleccionada.analisis;
    analisisSeleccionado.pedido = tareaSeleccionada.pedido;
    analisisSeleccionado.elemento = tareaSeleccionada.elementoPlanta;
    console.log(analisisSeleccionado)
    await axios.post("/parametrosanalisisplanta", analisisSeleccionado, token)
      .then(response => {
        //abrirCerrarModalInsertarDet();
        peticionGetAnalisis();
        peticionGetVis();
        setAnalisisSeleccionado({
          id: 0,
          codigoCliente: 0,
          nombreCliente: '',
          oferta: 0,
          pedido: 0,
          elemento: '',
          periodo: '',
          analisis: '',
          fecha: null,
          realizado: false,
          operario: '',
          protocolo: '',
          observaciones: '',
          facturado: false,
          numeroFacturado: '',
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

  const peticionPutVis = async () => {
    if (analisisSeleccionado.recogido === true) {
      peticionPostEntrega();
    }
    await axios.put("/parametrosanalisisplanta?id=" + analisisSeleccionado.id, analisisSeleccionado, token)
      .then(response => {
        var analisisSeleccionado = dataAnalisis;
        analisisSeleccionado.map(analisis => {
          if (analisis.id === analisisSeleccionado.id) {
            analisis = analisisSeleccionado
          }
        });
        peticionGetAnalisis();
        peticionGetVis();
        abrirCerrarModalEditarDet();
        setAnalisisSeleccionado({
          id: 0,
          codigoCliente: 0,
          nombreCliente: '',
          oferta: 0,
          pedido: 0,
          elemento: '',
          periodo: '',
          analisis: '',
          fecha: null,
          realizado: false,
          operario: '',
          protocolo: '',
          observaciones: '',
          facturado: false,
          numeroFacturado: '',
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

  const peticionDeleteVis = async () => {
    var i = 0;
    while (i < AnalisisEliminar.length) {
      await axios.delete("/parametrosanalisisplanta/" + AnalisisEliminar[i].id, token)
        .then(response => {
          peticionGetAnalisis();
          peticionGetVis();
          abrirCerrarModalEliminarDet();
          setAnalisisSeleccionado({
            id: 0,
            codigoCliente: 0,
            nombreCliente: '',
            oferta: 0,
            pedido: 0,
            elemento: '',
            periodo: '',
            analisis: '',
            fecha: null,
            realizado: false,
            operario: '',
            protocolo: '',
            observaciones: '',
            facturado: false,
            numeroFacturado: '',
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

  const peticionPostEntrega = async () => {
    entregaSeleccionada.id = 0;
    entregaSeleccionada.codigoCliente = analisisSeleccionado.codigoCliente;
    entregaSeleccionada.nombreCliente = analisisSeleccionado.nombreCliente;
    entregaSeleccionada.oferta = analisisSeleccionado.oferta;
    entregaSeleccionada.elemento = analisisSeleccionado.elemento;
    entregaSeleccionada.analisis = analisisSeleccionado.analisis;
    entregaSeleccionada.descripcion = `Muestra de ${analisisSeleccionado.analisis} del cliente ${analisisSeleccionado.nombreCliente}`;
    entregaSeleccionada.fecha = analisisSeleccionado.fecha;
    await axios.post("/entregas", entregaSeleccionada, token)
      .then(response => {
        peticionGetEntregas();
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

  //modal insertar mantenimientocab
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setTareaSeleccionada(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleChangeTipo = (event, value) => {
    setTareaSeleccionada(prevState => ({
      ...prevState,
      tipo: value.id
    }))
  }

  const handleChangeCheck3 = (event, value) => {
    setTareaSeleccionada(prevState => ({
      ...prevState,
      cancelado: value
    }))
    if (value == true) {
      setEstadoCancelado(false)
    } else {
      setEstadoCancelado(true)
    }
  }

  const handleChangeVis = e => {
    const { name, value } = e.target;
    setAnalisisSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleChangeCheck = (event, value) => {
    setAnalisisSeleccionado(prevState => ({
      ...prevState,
      realizado: value
    }))
  }

  const handleChangeValor = (event, value) => {
    setTareaSeleccionada(prevState => ({
      ...prevState,
      valor: value.props.value
    }))
    if (value.props.value === "Si") {
      setEstadoValor(false)
    } else {
      setEstadoValor(true)
    }
  }

  const handleChangeCheck2 = (event, value) => {
    setAnalisisSeleccionado(prevState => ({
      ...prevState,
      facturado: value
    }))
  }

  const handleChangeCheck4 = (e) => {
    const { name, value, checked } = e.target
    setAnalisisSeleccionado(prevState => ({
      ...prevState,
      [name]: checked
    }))
  }

  const handleChangeAnalisis = (event, value) => {
    setTareaSeleccionada(prevState => ({
      ...prevState,
      analisis: value.analisis
    }))
    if (value.analisis === "Otros con Fechas de Trabajo" || value.analisis === "Otros sin Fechas de Trabajo" || value.analisis === "Legionela" || value.analisis === "Aerobios" || value.analisis === "Aguas Residuales" || value.analisis === "Desinfecciones" || value.analisis === "AguaPozo" || value.analisis === "Agua Potable" || value.analisis === "Desinfeccion ACS" || value.analisis === "Mediciones" || value.analisis === "Mantenimiento Maq Frio" || value.analisis === "Control Fuga gas" || value.analisis === "Revision de bandeja") {
      setEstadoInput(false)
    } else {
      setEstadoInput(true)
    }

    if (value.analisis === "Desinfecciones" || value.analisis === "Desinfeccion ACS" || value.analisis === "Mantenimiento Maq Frio" || value.analisis === "Mediciones" || value.analisis === "Control Fuga Gas" || value.analisis === "Agua Potable" || value.analisis === "Revision de Bandeja" || value.analisis === "Otros con Fecha de Trabajo" || value.analisis === "Otros sin Fecha de Trabajo") {
      setEstadoOperario(false)
    } else {
      setEstadoOperario(true)
    }

    if (value.analisis === "Desinfecciones") {
      setEstadoProtocolo(false)
    } else {
      setEstadoProtocolo(true)
    }
  }

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar tarea</h3>
      <br />
      <div className="row g-3">
        <div className="col-md-3">
          <h5> Codigo Cliente </h5>
          {/* Desplegable de Clientes */}
          <Autocomplete
            disableClearable={true}
            className={styles2.inputMaterial}
            id="CboClientes"
            options={clientes}
            getOptionLabel={option => option.codigo}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} name="codigoCliente" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              codigoCliente: parseInt(value.codigo),
              pedido: '',
              elementoPlanta: ''
            }))}
          />
        </div>

        <div className="col-md-3">
          <h5> Nombre Cliente </h5>
          {/* Desplegable de Clientes */}
          <TextField
            id='nombreCliente'
            className={styles.inputMaterial}
            value={tareaSeleccionada && tareaSeleccionada.nombreCliente}
            name="nombreCliente"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <h5> Oferta </h5>
          <Autocomplete
            disableClearable={true}
            className={styles2.inputMaterial}
            id="Oferta"
            inputValue={tareaSeleccionada.oferta}
            options={ofertas}
            filterOptions={options => ofertas.filter(oferta => oferta.codigoCliente === tareaSeleccionada.codigoCliente)}
            getOptionLabel={option => option.numeroOferta}
            sx={{ width: 150 }}
            renderInput={(params) => <TextField {...params} name="oferta" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              oferta: parseInt(value.numeroOferta)
            }))}
          />
        </div>
        <div className="col-md-3">
          <h5> Pedido </h5>
          <TextField
            id='pedido'
            className={styles.inputMaterial}
            value={tareaSeleccionada && tareaSeleccionada.pedido}
            name="pedido"
            onChange={handleChange}
          />
        </div>

        {/* Desplegable de elementos planta */}
        <div className="col-md-3">
          <h5> Elemento de planta </h5>
          <Autocomplete
            disableClearable={true}
            className={styles2.inputMaterial}
            id="CboElementosPlanta"
            inputValue={tareaSeleccionada.elementoPlanta}
            options={elementosplanta}
            filterOptions={options => confAnalisisNivelesPlantasCliente.filter(planta => planta.codigoCliente === tareaSeleccionada.codigoCliente && planta.oferta === tareaSeleccionada.oferta)}
            getOptionLabel={option => option.elemento}
            sx={{ width: 225 }}
            renderInput={(params) => <TextField {...params} name="elementoPlanta" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              elementoPlanta: value.elemento
            }))}
          />
        </div>

        <div className="col-md-5">
          <h5> Analisis </h5>
          {/* Desplegable de Técnicos */}
          <Autocomplete
            disableClearable={true}
            className={styles2.inputMaterial}
            id="analisis"
            options={analisis}
            filterOptions={options => confAnalisisNivelesPlantasCliente.filter(planta => planta.codigoCliente === tareaSeleccionada.codigoCliente && planta.oferta === tareaSeleccionada.oferta && planta.elemento === tareaSeleccionada.elementoPlanta)}
            getOptionLabel={option => option.analisis}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="analisis" />}
            onChange={handleChangeAnalisis}
          />
        </div>
        <div className="col-md-5">
          <h5> Final </h5>
          <TextField
            disabled={estadoInput}
            id='final'
            className={styles2.inputMaterial}
            select
            name="final"
            onChange={handleChange}
          >
            {final.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        {/*<div className="col-md-4">
          <h5> Valor </h5>
          <TextField
            disabled={estadoInput}
            id='valor'
            className={styles2.inputMaterial}
            select
            name="valor"
            onChange={handleChangeValor}
          >
            {selections.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-md-4">
          <h5> Nombre valor </h5>
          <TextField disabled={estadoValor} className={styles.inputMaterial} name="nombreValor" onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <h5> Unidades </h5>
          <TextField disabled={estadoValor} className={styles.inputMaterial} name="unidades" onChange={handleChange} />
        </div>*/}
        <div className="col-md-5">
          <h5> Operario </h5>
          {/* Desplegable de Técnicos */}
          <Autocomplete
            disabled={estadoOperario}
            disableClearable={true}
            className={styles.inputMaterial}
            id="Operarios"
            options={operarios}
            filterOptions={options => operarios.filter(cliente => cliente.idPerfil === 1004)}
            getOptionLabel={option => option.nombre + ' ' + option.apellidos}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="operario" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              operario: value.nombre + ' ' + value.apellidos
            }))}
          />
        </div>
        <div className="col-md-4">
          <h5> Protocolo </h5>
          <TextField
            disabled={estadoProtocolo}
            id='protocolo'
            className={styles.inputMaterial}
            select
            name="protocolo"
            onChange={handleChange}
          >
            {protocolos.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-md-4">
          {/* Desplegable de tipos*/}
          <h5> Periodicidad </h5>
          <Autocomplete
            disableClearable={true}
            className={styles2.inputMaterial}
            id="CboTipos"
            options={tipos}
            getOptionLabel={option => option.nombre}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} name="idTipo" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              tipo: value.id
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
            onChange={(e) => setfechaprevista(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  //modal editar mantenimiento

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarCalendario = () => {
    setmodalCalendario(!modalCalendario);
  }

  const bodyCalendar = (
    <div className={stylesEditarDet.modal}>
      <h3>Calendario</h3>
      <FullCalendar
        plugins={[resourceTimelinePlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
        headerToolbar={{
          left: 'today prev,next',
          center: 'title',
          right: 'resourceTimelineMonth'
        }}
        timeZone='UTC'
        initialView='resourceTimelineDay'
        scrollTime='08:00'
        aspectRatio={1.5}
        weekends={false}
        height={650}
        resourceAreaHeaderContent='Elementos'
        resources={[
          {
            id: 1,
            title: 'Elemento 1'
          },
          {
            id: 2,
            title: 'Elemento 2'
          },
          {
            id: 3,
            title: 'Elemento 3'
          },
        ]}
        events={[
          {
            id: 1,
            title: 'Mantenimiento 1',
            start: '2022-03-01',
            end: '2022-03-06',
            resourceId: 1,
            color: 'red'
          },
          {
            id: 2,
            title: 'Mantenimiento 2',
            start: '2022-03-05',
            end: '2022-03-11',
            resourceId: 3,
            color: 'green'
          },
          {
            id: 3,
            title: 'Mantenimiento 3',
            start: '2022-03-15',
            end: '2022-03-23',
            resourceId: 2,
            color: 'orange'
          }
        ]}
      //events= 'https://fullcalendar.io/api/demo-feeds/events.json?single-day&for-resource-timeline'
      />
    </div>
  )

  const bodyEditar = (
    <div className={stylesEditarDet.modal}>
      <h3>Tarea</h3>
      <br />
      <div className="row g-3">
        <div className="col-md-3">
          <h5> Codigo Cliente </h5>
          {/* Desplegable de Clientes */}
          <Autocomplete
            disableClearable={true}
            id="CboClientes"
            options={clientes}
            className={stylesEditarDet.inputMaterial}
            defaultValue={clienteTareaEditar[0]}
            getOptionLabel={option => option.codigo}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} name="codigoCliente" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              codigoCliente: value.codigo,
              oferta: '',
              elementoPlanta: '',
              analisis: '',
              pedido: ''
            }))}
          />
        </div>

        <div className="col-md-3">
          <h5> Nombre Cliente </h5>
          {/* Desplegable de Clientes */}
          <Autocomplete
            disableClearable={true}
            id="NombreCliente"
            options={clientes}
            className={stylesEditarDet.inputMaterial}
            inputValue={tareaSeleccionada.nombreCliente}
            defaultValue={nombreClienteEditar[0]}
            filterOptions={options => clientes.filter(cliente => cliente.codigo === tareaSeleccionada.codigoCliente)}
            getOptionLabel={option => option.razonSocial}
            sx={{ width: 250 }}
            renderInput={(params) => <TextField {...params} name="nombreCliente" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              nombreCliente: value.razonSocial
            }))}
          />
        </div>

        <div className="col-md-3">
          <h5> Oferta </h5>
          <Autocomplete
            disableClearable={true}
            id="Oferta"
            options={ofertas}
            className={stylesEditarDet.inputMaterial}
            defaultValue={ofertaEditar[0]}
            inputValue={tareaSeleccionada.oferta}
            filterOptions={options => ofertas.filter(oferta => oferta.codigoCliente === tareaSeleccionada.codigoCliente)}
            getOptionLabel={option => option.numeroOferta}
            sx={{ width: 150 }}
            renderInput={(params) => <TextField {...params} name="oferta" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              oferta: parseInt(value.numeroOferta),
              elementoPlanta: '',
              analisis: ''
            }))}
          />
        </div>
        <div className="col-md-3">
          <h5> Pedido </h5>
          <TextField
            id='pedido'
            className={styles2.inputMaterial}
            name="pedido"
            value={tareaSeleccionada && tareaSeleccionada.pedido}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <h5> Analisis </h5>
          {/* Desplegable de Técnicos */}
          <Autocomplete
            disableClearable={true}
            id="analisis"
            options={analisis}
            className={stylesEditarDet.inputMaterial}
            defaultValue={analisisEditar[0]}
            inputValue={tareaSeleccionada.analisis}
            filterOptions={options => confAnalisisNivelesPlantasCliente.filter(planta => planta.codigoCliente === tareaSeleccionada.codigoCliente && planta.oferta === tareaSeleccionada.oferta && planta.elemento === tareaSeleccionada.elementoPlanta)}
            getOptionLabel={option => option.analisis}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="analisis" />}
            onChange={handleChangeAnalisis}
          />
        </div>
        <div className="col-md-3">
          <h5> Final </h5>
          <TextField
            disabled={estadoInput}
            id='final'
            className={styles2.inputMaterial}
            select
            name="final"
            onChange={handleChange}
            value={tareaSeleccionada.final}
          >
            {final.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        {/*<div className="col-md-3">
          <h5> Valor </h5>
          <TextField
            disabled={estadoInput}
            id='valor'
            className={styles2.inputMaterial}
            select
            name="valor"
            onChange={handleChangeValor}
            value={tareaSeleccionada.valor}
          >
            {selections.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-md-3">
          <h5> Nombre valor </h5>
          <TextField disabled={estadoValor} className={styles.inputMaterial} name="nombreValor" onChange={handleChange} value={tareaSeleccionada.nombreValor} />
        </div>
        <div className="col-md-3">
          <h5> Unidades </h5>
          <TextField disabled={estadoValor} className={styles2.inputMaterial} name="unidades" onChange={handleChange} value={tareaSeleccionada.unidades} />
        </div>*/}

        <div className="col-md-4">
          {/* Desplegable de Técnicos */}
          <h5> Operario </h5>
          <Autocomplete
            disabled={estadoOperario}
            disableClearable={true}
            id="Operario"
            options={operarios}
            className={stylesEditarDet.inputMaterial}
            defaultValue={tecnicoTareaEditar[0]}
            filterOptions={options => operarios.filter(cliente => cliente.idPerfil === 1004)}
            getOptionLabel={option => option.nombre + ' ' + option.apellidos}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="operario" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              operario: value.nombre + ' ' + value.apellidos
            }))}
          />
        </div>
        <div className="col-md-4">
          {/* Desplegable de elementos planta */}
          <h5> Elemento de planta </h5>
          <Autocomplete
            disableClearable={true}
            className={styles2.inputMaterial}
            id="CboElementosPlanta"
            options={elementosplanta}
            defaultValue={elementoTareaEditar[0]}
            inputValue={tareaSeleccionada.elementoPlanta}
            filterOptions={options => confAnalisisNivelesPlantasCliente.filter(planta => planta.codigoCliente === tareaSeleccionada.codigoCliente && planta.oferta === tareaSeleccionada.oferta)}
            getOptionLabel={option => option.elemento}
            sx={{ width: 225 }}
            renderInput={(params) => <TextField {...params} name="elementoPlanta" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              elementoPlanta: value.elemento,
              analisis: ''
            }))}
          />
        </div>

        <div className="col-md-4">
          {/* Desplegable de tipos*/}
          <h5> Periodicidad </h5>
          <Autocomplete
            disableClearable={true}
            id="CboTipos"
            options={tipos}
            className={stylesEditarDet.inputMaterial}
            defaultValue={tipoTareaEditar[0]}
            getOptionLabel={option => option.nombre}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="idTipo" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              tipo: value.id
            }))}
          />
        </div>
        <div className="col-md-2">
          <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} label="Se Cancela" name="cancelado" onChange={handleChangeCheck3} />
        </div>
        <div className="col-md-10">
          <h5> Comentarios </h5>
          <TextField disabled={estadoCancelado} className={styles.inputMaterial} name="comentarios" onChange={handleChange} />
        </div>
      </div>
      <div className="row">
        <MaterialTable columns={columnasVis} data={dataAnalisis}
          localization={localization}
          actions={[
            {
              icon: () => <CalendarToday />,
              tooltip: "Ver calendario",
              isFreeAction: true,
              onClick: (e, data) => {
                abrirCerrarCalendario();
              },
            },
            {
              icon: () => <AddCircle style={{ fill: "green" }} />,
              tooltip: "Añadir detalle de tarea",
              isFreeAction: true,
              onClick: (e, data) => {
                abrirCerrarModalInsertarDet();
              },
            },
            {
              icon: () => <RemoveCircle style={{ fill: "red" }} />,
              tooltip: "Eliminar detalle de tarea",
              onClick: (event, rowData) => {
                setAnalisisEliminar(FilasSeleccionadasVis);
                abrirCerrarModalEliminarDet();
              },
            },
          ]}

          onRowClick={((evt, analisisSeleccionado) => {
            setAnalisisSeleccionado(analisisSeleccionado)
            peticionGetVis();
            setClienteAnalisisEditar(clientes.filter(cliente => cliente.codigoCliente === tareaSeleccionada.codigoCliente));
            if (analisisSeleccionado.analisis === "Aerobios" || analisisSeleccionado.analisis === "Legionela") {
              setEstadoRecogido(false)
            } else {
              setEstadoRecogido(true)
            }
            abrirCerrarModalEditarDet();
          })}

          onSelectionChange={(filas) => {
            setFilasSeleccionadasVis(filas);
            if (filas.length > 0)
              setAnalisisSeleccionado(filas[0]);
          }}

          options={{
            sorting: true, paging: true, pageSizeOptions: [1, 3, 4, 5], pageSize: 4, filtering: false, search: false, selection: true,
            columnsButton: false, showSelectAllCheckbox: false,
            rowStyle: rowData => ({
              backgroundColor: (analisisSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
              whiteSpace: "nowrap"
            }),
            exportMenu: [{
              label: 'Export PDF',
              exportFunc: (cols, datas) => ExportPdf(cols, data, 'Detalles de la tarea')
            }, {
              label: 'Export CSV',
              exportFunc: (cols, datas) => ExportCsv(cols, data, 'Detalles de la tarea')
            }]
          }}

          title="Detalles de la tarea"
        />
      </div>
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>Guardar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  // modal eliminar mantenimiento
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const bodyEliminar = (

    <div className={stylesEliminar.modal}>
      <h5>Estás seguro que deseas eliminar la tarea ? </h5>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}>Sí</Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  )


  // modal insertar mantenimiento detalle


  const abrirCerrarModalInsertarDet = () => {
    setModalInsertarDet(!modalInsertarDet);
  }

  const bodyInsertarDet = (
    <div className={styles2.modal}>
      <h3>Insertar detalle de tarea </h3>
      <br />
      <div className="row g-3">
        <div className="col-md-3">
          <h5> Cliente </h5>
          <TextField className={styles.inputMaterial} name="codigoCliente" disabled onChange={handleChangeVis} value={tareaSeleccionada && tareaSeleccionada.codigoCliente} />
        </div>
        <div className="col-md-3">
          <h5> Oferta </h5>
          <TextField className={styles.inputMaterial} name="oferta" disabled onChange={handleChangeVis} value={tareaSeleccionada && tareaSeleccionada.oferta} />
        </div>
        <div className="col-md-3">
          <h5> Analisis </h5>
          <TextField className={styles.inputMaterial} name="analisis" disabled onChange={handleChangeVis} value={tareaSeleccionada && tareaSeleccionada.analisis} />
        </div>
        <div className="col-md-3">
          <h5> Elemento de planta </h5>
          <TextField className={styles.inputMaterial} name="elemento" disabled onChange={handleChangeVis} value={tareaSeleccionada && tareaSeleccionada.elementoPlanta} />
        </div>
        <div className="col-md-3">
          <h5> Periodo </h5>
          <TextField className={styles.inputMaterial} name="periodo" onChange={handleChangeVis} />
        </div>
        <div className="col-md-3">
          <h5> Fecha </h5>
          {/* Fecha prevista */}
          <TextField
            id="fecha"
            type="date"
            name="fecha"
            sx={{ width: 150 }}
            onChange={handleChangeVis}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="col-md-5">
          {/* Fecha realizacion */}
          <h5> Protocolo </h5>
          <TextField
            id='protocolo'
            className={styles.inputMaterial}
            select
            name="protocolo"
            onChange={handleChangeVis}
          >
            {protocolos.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-md-3">
          <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} label="Realizado" name="realizado" onChange={handleChangeCheck} />
        </div>
        <div className="col-md-3">
          <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} label="Facturado" name="facturado" onChange={handleChangeCheck2} />
        </div>
        <div className="col-md-6">
          <h5> Numero Facturacion </h5>
          <TextField className={styles2.inputMaterial} name="numeroFacturado" onChange={handleChangeVis} />
        </div>
        <div className="col-md-12">
          <h5> Observaciones </h5>
          <TextField className={styles.inputMaterial} name="observaciones" onChange={handleChangeVis} />
        </div>
      </div>


      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPostVis()}>Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertarDet()}>Cancelar</Button>
      </div>
    </div>
  )

  // modal editar mantenimiento detalle
  const abrirCerrarModalEditarDet = () => {
    setModalInsertar(!modalInsertar);
    setModalEditarDet(!modalEditarDet);

  }

  const bodyEditarDet = (
    <div className={styles.modal}>
      <h3>Detalle de tarea</h3>
      <br />
      <div className="row g-3">
        <div className="col-md-3">
          {/* Desplegable de Clientes */}
          <h5> Cliente </h5>
          <TextField className={styles.inputMaterial} name="codigoCliente" disabled onChange={handleChangeVis} value={tareaSeleccionada && tareaSeleccionada.codigoCliente} />
        </div>
        <div className="col-md-3">
          <h5> Oferta </h5>
          <TextField className={styles.inputMaterial} name="oferta" disabled onChange={handleChangeVis} value={tareaSeleccionada && tareaSeleccionada.oferta} />
        </div>
        <div className="col-md-3">
          <h5> Analisis </h5>
          <TextField className={styles.inputMaterial} name="analisis" disabled onChange={handleChangeVis} value={tareaSeleccionada && tareaSeleccionada.analisis} />
        </div>
        <div className="col-md-3">
          <h5> Elemento de planta </h5>
          <TextField className={styles.inputMaterial} name="elemento" disabled onChange={handleChangeVis} value={tareaSeleccionada && tareaSeleccionada.elementoPlanta} />
        </div>
        <div className="col-md-3">
          <h5> Periodo </h5>
          <TextField className={styles.inputMaterial} name="periodo" onChange={handleChangeVis} value={analisisSeleccionado && analisisSeleccionado.periodo} />
        </div>
        <div className="col-md-3">
          <h5> Fecha </h5>
          <TextField
            id="fecha"
            type="date"
            name="fecha"
            sx={{ width: 150 }}
            onChange={handleChangeVis}
            InputLabelProps={{
              shrink: true,
            }}
            value={analisisSeleccionado && analisisSeleccionado.fecha}
          />
        </div>
        <div className="col-md-2">
          <FormControlLabel control={<Checkbox />} disabled={estadoRecogido} className={styles.inputMaterial} checked={analisisSeleccionado.recogido} label="Recogido" name="recogido" onChange={handleChangeCheck4} />
        </div>
        <div className="col-md-5">
          {/* Fecha realizacion */}
          <h5> Protocolo </h5>
          <TextField
            id='protocolo'
            className={styles.inputMaterial}
            select
            name="protocolo"
            onChange={handleChangeVis}
            value={analisisSeleccionado && analisisSeleccionado.protocolo}
          >
            {protocolos.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-md-3">
          <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} label="Realizado" name="realizado" onChange={handleChangeCheck} value={analisisSeleccionado && analisisSeleccionado.realizado} />
        </div>
        <div className="col-md-3">
          <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} label="Facturado" name="facturado" onChange={handleChangeCheck2} value={analisisSeleccionado && analisisSeleccionado.facturado} />
        </div>
        <div className="col-md-6">
          <h5> Numero Facturacion </h5>
          <TextField className={styles2.inputMaterial} name="numeroFacturado" onChange={handleChangeVis} value={analisisSeleccionado && analisisSeleccionado.numeroFacturado} />
        </div>
        <div className="col-md-12">
          <h5> Observaciones </h5>
          <TextField className={styles.inputMaterial} name="observaciones" onChange={handleChangeVis} value={analisisSeleccionado && analisisSeleccionado.observaciones} />
        </div>
      </div>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPutVis()}>Editar</Button>
        <Button onClick={() => abrirCerrarModalEditarDet()}>Cancelar</Button>
      </div>
    </div>
  )

  // modal eliminar mantenimiento
  const abrirCerrarModalEliminarDet = () => {
    setModalEditar(!modalEditar);
    setModalEliminarDet(!modalEliminarDet);
  }

  const bodyEliminarDet = (

    <div className={stylesEliminar.modal}>
      <h5>Estás seguro que deseas eliminar el detalle de tarea ? </h5>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDeleteVis()}>Sí</Button>
        <Button onClick={() => abrirCerrarModalEliminarDet()}>No</Button>

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
            tooltip: "Añadir Tarea",
            isFreeAction: true,
            onClick: (e, data) => {
              abrirCerrarModalInsertar();
            },
          },
          {
            icon: () => <RemoveCircle style={{ fill: "red" }} />,
            tooltip: "Eliminar Tarea",
            onClick: (event, rowData) => {
              setTareaEliminar(FilasSeleccionadas);
              abrirCerrarModalEliminar()
            },
          },
        ]}

        onRowClick={(evt, tareaSeleccionada) => {
          setTareaSeleccionada(tareaSeleccionada);
          setDataAnalisis(dataVis.filter(analisi => analisi.codigoCliente === tareaSeleccionada.codigoCliente && analisi.oferta === tareaSeleccionada.oferta && analisi.elemento === tareaSeleccionada.elementoPlanta && analisi.analisis === tareaSeleccionada.analisis))
          peticionGetVis();
          setNombreClienteEditar(clientes.filter(cliente => cliente.razonSocial === tareaSeleccionada.nombreCliente))
          setClienteTareaEditar(clientes.filter(cliente => cliente.codigo === tareaSeleccionada.codigoCliente));
          setElementoTareaEditar(confAnalisisNivelesPlantasCliente.filter(elemento => elemento.elemento === tareaSeleccionada.elementoPlanta));
          setTipoTareaEditar(tipos.filter(tipo => tipo.id === tareaSeleccionada.tipo));
          setTecnicoTareaEditar(operarios.filter(operario => (operario.nombre + ' ' + operario.apellidos) === tareaSeleccionada.operario));
          setAnalisisEditar(confAnalisisNivelesPlantasCliente.filter(analisi => analisi.analisis === tareaSeleccionada.analisis));
          setOfertaEditar(ofertas.filter(oferta => oferta.numeroOferta === tareaSeleccionada.oferta))
          if (tareaSeleccionada.analisis === "Otros con Fechas de Trabajo" || tareaSeleccionada.analisis === "Otros sin Fechas de Trabajo" || tareaSeleccionada.analisis === "Legionela" || tareaSeleccionada.analisis === "Aerobios" || tareaSeleccionada.analisis === "Aguas Residuales" || tareaSeleccionada.analisis === "Desinfecciones" || tareaSeleccionada.analisis === "AguaPozo" || tareaSeleccionada.analisis === "Agua Potable" || tareaSeleccionada.analisis === "Desinfeccion ACS" || tareaSeleccionada.analisis === "Mediciones" || tareaSeleccionada.analisis === "Mantenimiento Maq Frio" || tareaSeleccionada.analisis === "Control Fuga gas" || tareaSeleccionada.analisis === "Revision de bandeja") {
            setEstadoInput(false)
          } else {
            setEstadoInput(true)
          }

          if (tareaSeleccionada.analisis === "Desinfecciones" || tareaSeleccionada.analisis === "Desinfeccion ACS" || tareaSeleccionada.analisis === "Mantenimiento Maq Frio" || tareaSeleccionada.analisis === "Mediciones" || tareaSeleccionada.analisis === "Control Fuga Gas" || tareaSeleccionada.analisis === "Agua Potable" || tareaSeleccionada.analisis === "Revision de Bandeja" || tareaSeleccionada.analisis === "Otros con Fecha de Trabajo" || tareaSeleccionada.analisis === "Otros sin Fecha de Trabajo") {
            setEstadoOperario(false)
          } else {
            setEstadoOperario(true)
          }

          if (tareaSeleccionada.analisis === "Desinfecciones") {
            setEstadoProtocolo(false)
          } else {
            setEstadoProtocolo(true)
          }

          if (tareaSeleccionada.valor === "Si") {
            setEstadoValor(false)
          } else {
            setEstadoValor(true)
          }

          abrirCerrarModalEditar();
        }}

        onSelectionChange={(filas) => {
          setFilasSeleccionadas(filas);
          if (filas.length > 0)
            setTareaSeleccionada(filas[0]);
        }}

        options={{
          sorting: true, paging: true, pageSizeOptions: [5, 10, 20, 50, 100], pageSize: 10, filtering: true, search: false, selection: true,
          columnsButton: true, showSelectAllCheckbox: false,
          rowStyle: rowData => ({
            backgroundColor: (tareaSeleccionada === rowData.tableData.id) ? '#EEE' : '#FFF',
            whiteSpace: "nowrap"
          }),
          headerStyle: {
            height: 10,
            backgroundcolor: "#D8D8D8"
          },
          exportMenu: [{
            label: 'Export PDF',
            exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Tareas')
          }, {
            label: 'Export CSV',
            exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Tareas')
          }]
        }}

        title="Listado de Tareas"
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

      {/* modal detalle */}
      <Modal
        open={modalInsertarDet}
        onClose={abrirCerrarModalInsertarDet}>
        {bodyInsertarDet}
      </Modal>

      <Modal
        open={modalEditarDet}
        onClose={abrirCerrarModalEditarDet}>
        {bodyEditarDet}
      </Modal>

      <Modal
        open={modalEliminarDet}
        onClose={abrirCerrarModalEliminarDet}>
        {bodyEliminarDet}
      </Modal>

      <Modal
        open={modalCalendario}
        onClose={abrirCerrarCalendario}>
        {bodyCalendar}
      </Modal>

    </div>
  );

}

export default Tareas;