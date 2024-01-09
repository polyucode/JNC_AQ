import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Typography, Button, Snackbar, Slide, TextField, InputAdornment, IconButton, Autocomplete } from '@mui/material';
import axios from "axios";
import MuiAlert from '@mui/material/Alert';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { ThemeContext } from "../router/AppRouter";
import { MainLayout } from "../layout/MainLayout";
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';
import { InsertarTareaModal } from '../components/Modals/InsertarTareaModal';
import { EditarTareaModal } from '../components/Modals/EditarTareaModal';
import { insertarBotonesModal } from '../helpers/insertarBotonesModal';
import { ModalLayout } from "../components/ModalLayout";
import { getOfertas, deleteTareas, getAnalisis, getAnalisisNivelesPlantasCliente, getClientes, getConfNivelesPlantasCliente, getElementosPlanta, getTareas, getUsuarios, postParametrosAnalisisPlanta, postTareas, putTareas, getParametrosAnalisisPlanta, getTareaById, deleteParametrosAnalisisPlanta } from "../api";
import { useUsuarioActual } from "../hooks/useUsuarioActual";

import Swal from 'sweetalert2';

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
    operario: 0,
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
    observaciones: '',
    pdf: 0,
    recibido: false,
    fechaPdf: null,
    resultado: '',
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

  const [parametrosAnalisisPlanta, setParametrosAnalisisPlanta] = useState([]);

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

  const [errorCodigo, setErrorCodigo] = useState(false);
  const [errorOferta, setErrorOferta] = useState(false);
  const [errorElemento, setErrorElemento] = useState(false);
  const [errorAnalisis, setErrorAnalisis] = useState(false);
  const [errorOperario, setErrorOperario] = useState(false);
  const [errorFecha, setErrorFecha] = useState(false);
  const [errorPeriodo, setErrorPeriodo] = useState(false);

  const [filterText, setFilterText] = useState('');
  const [filterOferta, setFilterOferta] = useState(0);

  const { usuarioActual } = useUsuarioActual();

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

        if (elemento) {
          if (elemento.descripcion !== null && elemento.descripcion !== undefined) {
            return `${elemento.nombre} ${elemento.descripcion}`;
          } else {
            return `${elemento.nombre} ${elemento.numero}`;
          }
        } else {
          return '';
        }
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
        if (params.value != null) {
          const date = new Date(params.value);
          return date.toLocaleDateString();
        } else {
          const date = "";
          return date;
        }
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

    getParametrosAnalisisPlanta()
      .then(parametros => {
        setParametrosAnalisisPlanta(parametros);
      })

    getElementosPlanta()
      .then(elementos => {
        setElementosPlanta(elementos);
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
      opcionesFiltradasAnalisis.push(analisisNivelesPlantasCliente.filter(anal => anal.id_NivelesPlanta === analisis.id && !anal.deleted));
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

    if (tareaSeleccionada.codigoCliente != 0) {
      setErrorCodigo(false)
    } else {
      setErrorCodigo(true)
    }

    if (tareaSeleccionada.oferta != 0) {
      setErrorOferta(false)
    } else {
      setErrorOferta(true)
    }

    if (tareaSeleccionada.elemento != 0) {
      setErrorElemento(false)
    } else {
      setErrorElemento(true)
    }

    if (tareaSeleccionada.analisis != 0) {
      setErrorAnalisis(false)
    } else {
      setErrorAnalisis(true)
    }

    if (tareaSeleccionada.operario != 0) {
      setErrorOperario(false)
    } else {
      setErrorOperario(true)
    }

    if (tareaSeleccionada.fecha != null) {
      setErrorFecha(false)
    } else {
      setErrorFecha(true)
    }

    if (tareaSeleccionada.tipo != 0) {
      setErrorPeriodo(false)
    } else {
      setErrorPeriodo(true)
    }

    if (tareaSeleccionada.tipo != 0 && tareaSeleccionada.fecha != null && tareaSeleccionada.operario != 0 && tareaSeleccionada.analisis != 0 && tareaSeleccionada.elemento != 0 && tareaSeleccionada.oferta != 0 && tareaSeleccionada.codigoCliente != 0) {
      tareaSeleccionada.id = 0;

      const response = await postTareas(tareaSeleccionada);

      var date = new Date(tareaSeleccionada.fecha);

      if (tareaSeleccionada.tipo === 1) {
        for (let i = 0; i <= 12; i++) {

          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();

          var monthFormatted = month < 10 ? '0' + month : month;
          var dayFormatted = day < 10 ? '0' + day : day;

          var fechaFormateada = year + '-' + monthFormatted + '-' + dayFormatted;

          analisisSeleccionado.id = 0;
          analisisSeleccionado.codigoCliente = response.codigoCliente;
          analisisSeleccionado.nombreCliente = response.nombreCliente;
          analisisSeleccionado.oferta = response.oferta;
          analisisSeleccionado.pedido = response.pedido;
          analisisSeleccionado.elemento = response.elemento;
          analisisSeleccionado.nombreElemento = tareaSeleccionada.nombreElemento;
          analisisSeleccionado.periodo = date.toLocaleDateString('es', { year: 'numeric', month: 'short' });
          analisisSeleccionado.analisis = response.analisis;
          analisisSeleccionado.fecha = fechaFormateada;
          analisisSeleccionado.recogido = false;
          analisisSeleccionado.realizado = false;
          analisisSeleccionado.operario = response.operario;
          analisisSeleccionado.protocolo = response.protocolo;
          analisisSeleccionado.observaciones = "";
          analisisSeleccionado.facturado = false;
          analisisSeleccionado.numeroFacturado = "";
          analisisSeleccionado.cancelado = false;
          analisisSeleccionado.comentarios = "";
          date.setMonth(date.getMonth() + 1);
          peticionPostVis();
        }
      }
      if (tareaSeleccionada.tipo === 2) {
        for (let i = 0; i <= 6; i++) {

          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();

          var monthFormatted = month < 10 ? '0' + month : month;
          var dayFormatted = day < 10 ? '0' + day : day;

          var fechaFormateada = year + '-' + monthFormatted + '-' + dayFormatted;

          analisisSeleccionado.id = 0;
          analisisSeleccionado.codigoCliente = response.codigoCliente;
          analisisSeleccionado.nombreCliente = response.nombreCliente;
          analisisSeleccionado.oferta = response.oferta;
          analisisSeleccionado.pedido = response.pedido;
          analisisSeleccionado.elemento = response.elemento;
          analisisSeleccionado.nombreElemento = tareaSeleccionada.nombreElemento;
          analisisSeleccionado.periodo = date.toLocaleDateString('es', { year: 'numeric', month: 'short' });
          analisisSeleccionado.analisis = response.analisis;
          analisisSeleccionado.fecha = fechaFormateada;
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
        for (let i = 0; i <= 4; i++) {

          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();

          var monthFormatted = month < 10 ? '0' + month : month;
          var dayFormatted = day < 10 ? '0' + day : day;

          var fechaFormateada = year + '-' + monthFormatted + '-' + dayFormatted;

          analisisSeleccionado.id = 0;
          analisisSeleccionado.codigoCliente = response.codigoCliente;
          analisisSeleccionado.nombreCliente = response.nombreCliente;
          analisisSeleccionado.oferta = response.oferta;
          analisisSeleccionado.pedido = response.pedido;
          analisisSeleccionado.elemento = response.elemento;
          analisisSeleccionado.nombreElemento = tareaSeleccionada.nombreElemento;
          analisisSeleccionado.periodo = date.toLocaleDateString('es', { year: 'numeric', month: 'short' });
          analisisSeleccionado.analisis = response.analisis;
          analisisSeleccionado.fecha = fechaFormateada;
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
        for (let i = 0; i <= 2; i++) {

          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();

          var monthFormatted = month < 10 ? '0' + month : month;
          var dayFormatted = day < 10 ? '0' + day : day;

          var fechaFormateada = year + '-' + monthFormatted + '-' + dayFormatted;

          analisisSeleccionado.id = 0;
          analisisSeleccionado.codigoCliente = response.codigoCliente;
          analisisSeleccionado.nombreCliente = response.nombreCliente;
          analisisSeleccionado.oferta = response.oferta;
          analisisSeleccionado.pedido = response.pedido;
          analisisSeleccionado.elemento = response.elemento;
          analisisSeleccionado.nombreElemento = tareaSeleccionada.nombreElemento;
          analisisSeleccionado.periodo = date.toLocaleDateString('es', { year: 'numeric', month: 'short' });
          analisisSeleccionado.analisis = response.analisis;
          analisisSeleccionado.fecha = fechaFormateada;
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
        for (let i = 0; i <= 1; i++) {

          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();

          var monthFormatted = month < 10 ? '0' + month : month;
          var dayFormatted = day < 10 ? '0' + day : day;

          var fechaFormateada = year + '-' + monthFormatted + '-' + dayFormatted;

          analisisSeleccionado.id = 0;
          analisisSeleccionado.codigoCliente = response.codigoCliente;
          analisisSeleccionado.nombreCliente = response.nombreCliente;
          analisisSeleccionado.oferta = response.oferta;
          analisisSeleccionado.pedido = response.pedido;
          analisisSeleccionado.elemento = response.elemento;
          analisisSeleccionado.nombreElemento = tareaSeleccionada.nombreElemento;
          analisisSeleccionado.periodo = date.toLocaleDateString('es', { year: 'numeric', month: 'short' });
          analisisSeleccionado.analisis = response.analisis;
          analisisSeleccionado.fecha = fechaFormateada;
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
          date.setFullYear(date.getFullYear() + 1);
          peticionPostVis();
        }
      }

      abrirCerrarModalInsertar();
      peticionGet();
      setTareaSeleccionada({
        id: 0,
        codigoCliente: 0,
        nombreCliente: "",
        oferta: 0,
        pedido: 0,
        operario: 0,
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

      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Tarea Creada',
        text: `La tarea se ha creado correctamente`,
        showConfirmButton: false,
        timer: 3000,
        showClass: {
          popup: 'animate__animated animate__bounceIn'
        },
        hideClass: {
          popup: 'animate__animated animate__bounceOut'
        }
      });
    }
  }

  const peticionPut = async () => {

    if (tareaSeleccionada.fecha != "") {
      setErrorFecha(false)
    } else {
      setErrorFecha(true)
    }

    if (tareaSeleccionada.fecha != "") {
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
        operario: 0,
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

      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Tarea Editada',
        text: `La tarea se ha editado correctamente`,
        showConfirmButton: false,
        timer: 2000,
        showClass: {
          popup: 'animate__animated animate__bounceIn'
        },
        hideClass: {
          popup: 'animate__animated animate__bounceOut'
        }
      });
    }
  }

  const peticionDelete = async () => {

    var i = 0;

    while (i < TareaEliminar.length) {

      const tarea = await getTareaById(TareaEliminar[i])

      const tareaAnalisis = parametrosAnalisisPlanta.filter(param => param.codigoCliente === tarea.codigoCliente && param.oferta === tarea.oferta && param.elemento === tarea.elemento && param.analisis === tarea.analisis)

      tareaAnalisis.map(async (an) => {
        await deleteParametrosAnalisisPlanta(an.id)
      })

      const resp = await deleteTareas(TareaEliminar[i]);

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
      })

      i++;
    }

    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Tarea Eliminada',
      text: `La tarea se ha eliminado correctamente`,
      showConfirmButton: false,
      timer: 2000,
      showClass: {
        popup: 'animate__animated animate__bounceIn'
      },
      hideClass: {
        popup: 'animate__animated animate__bounceOut'
      }
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

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleFilterOferta = (event) => {
    setFilterOferta(parseInt(event.target.innerText));
  };

  const filteredData = rows.filter(item =>
    item.nombreCliente.toLowerCase().includes(filterText.toLowerCase()) &&
    (filterOferta !== 0 ? item.oferta === filterOferta : true)
  );

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
    setErrorAnalisis(false)
    setErrorCodigo(false)
    setErrorElemento(false)
    setErrorFecha(false)
    setErrorOferta(false)
    setErrorOperario(false)
    setErrorPeriodo(false)
    if (modalInsertar) {
      setTareaSeleccionada({
        id: 0,
        codigoCliente: 0,
        nombreCliente: "",
        oferta: 0,
        pedido: 0,
        operario: 0,
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
    setErrorAnalisis(false)
    setErrorCodigo(false)
    setErrorElemento(false)
    setErrorFecha(false)
    setErrorOferta(false)
    setErrorOperario(false)
    setErrorPeriodo(false)
    if (modalEditar) {
      setTareaSeleccionada({
        id: 0,
        codigoCliente: 0,
        nombreCliente: "",
        oferta: 0,
        pedido: 0,
        operario: 0,
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
    setErrorAnalisis(false)
    setErrorCodigo(false)
    setErrorElemento(false)
    setErrorFecha(false)
    setErrorOferta(false)
    setErrorOperario(false)
    setErrorPeriodo(false)
    if (modalEliminar) {
      setTareaSeleccionada({
        id: 0,
        codigoCliente: 0,
        nombreCliente: "",
        oferta: 0,
        pedido: 0,
        operario: 0,
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
    <>
      {usuarioActual.idPerfil === 1 ?
        <MainLayout title="Tareas">

          <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
            <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
              {snackData.msg}
            </Alert>
          </Snackbar>

          <Grid container spacing={3}>
            {/* Título y botones de opción */}
            <Grid item xs={12}>
              <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h6'>Listado de Tareas</Typography>
                <Grid item xs={4}>
                  <TextField
                    label="Filtrar cliente"
                    variant="outlined"
                    value={filterText}
                    onChange={handleFilterChange}
                    sx={{ width: '50%' }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    disableClearable={true}
                    sx={{ width: '50%' }}
                    id="Oferta"
                    options={ofertas}
                    getOptionLabel={option => option.numeroOferta.toString()}
                    renderInput={(params) => <TextField {...params} label="Filtrar por oferta" name="oferta" />}
                    onChange={handleFilterOferta}
                  />
                </Grid>
                {
                  (rowsIds.length > 0) ?
                    (
                      <Grid item>
                        <Button
                          sx={{ height: '40px' }}
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
                        sx={{ height: '40px' }}
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
                  //components={{ Toolbar: GridToolbar }}
                  localeText={DATAGRID_LOCALE_TEXT}
                  sx={{
                    width: '100%',
                    height: 1000,
                    backgroundColor: '#FFFFFF'
                  }}
                  rows={filteredData}
                  columns={columns}
                  pageSize={100}
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
                errorAnalisis={errorAnalisis}
                errorCodigo={errorCodigo}
                errorElemento={errorElemento}
                errorFecha={errorFecha}
                errorOferta={errorOferta}
                errorOperario={errorOperario}
                errorPeriodo={errorPeriodo}
              />
            }
            botones={[
              insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                peticionPost();
              })
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
                errorFecha={errorFecha}
              />}
            botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
              peticionPut();
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
                peticionDelete();
              }, 'error')
            ]}
            open={modalEliminar}
            onClose={abrirCerrarModalEliminar}
          />

        </MainLayout>
        :
        <MainLayout title="Tareas">

          <Grid container spacing={2}>
            {/* Título y botones de opción */}
            <Grid item xs={12}>
              <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h6'>Listado de Tareas</Typography>
                <Grid item xs={4}>
                  <TextField
                    label="Filtrar cliente"
                    variant="outlined"
                    value={filterText}
                    onChange={handleFilterChange}
                    sx={{ width: '50%' }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    disableClearable={true}
                    sx={{ width: '50%' }}
                    id="Oferta"
                    options={ofertas}
                    getOptionLabel={option => option.numeroOferta.toString()}
                    renderInput={(params) => <TextField {...params} label="Filtrar por oferta" name="oferta" />}
                    onChange={handleFilterOferta}
                  />
                </Grid>
              </Card>
            </Grid>

            {/* Tabla donde se muestran los registros de los clientes */}
            <Grid item xs={12}>
              <Card>
                <DataGrid
                  //components={{ Toolbar: GridToolbar }}
                  localeText={DATAGRID_LOCALE_TEXT}
                  sx={{
                    width: '100%',
                    height: 1000,
                    backgroundColor: '#FFFFFF'
                  }}
                  rows={filteredData}
                  columns={columns}
                  pageSize={100}
                  onSelectionModelChange={(ids) => handleSelectRow(ids)}
                  onRowClick={(tareaSeleccionada, evt) => {
                    setTareaSeleccionada(tareaSeleccionada.row)
                    setNombreClienteEditar(clientes.filter(cliente => cliente.razonSocial === tareaSeleccionada.nombreCliente))
                    setClienteTareaEditar(clientes.filter(cliente => cliente.codigo === tareaSeleccionada.row.codigoCliente));
                    setElementoTareaEditar(elementosplanta.filter(elemento => elemento.id === tareaSeleccionada.row.elemento));
                    setTipoTareaEditar(tipos.filter(tipo => tipo.id === tareaSeleccionada.row.tipo));
                    setTecnicoTareaEditar(operarios.filter(operario => operario.id === tareaSeleccionada.row.operario));
                    setAnalisisEditar(analisis.filter(analisi => analisi.id === tareaSeleccionada.row.analisis));

                    abrirCerrarModalEditar();
                  }}
                />
              </Card>
            </Grid>
          </Grid>

          {/* LISTA DE MODALS */}

          {/* Modal Editar Tarea*/}

          <ModalLayout
            titulo="Editar tarea"
            contenido={
              <EditarTareaModal
                tareaSeleccionada={tareaSeleccionada}
                handleChange={handleChange}
                autocompleteChange={handleAutocompleteChange}
                handleChangeFecha={handleChangeFecha}
                setTareaSeleccionada={setTareaSeleccionada}
                handleChangeAnalisis={handleChangeAnalisis}
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

        </MainLayout>
      }
    </>

  );

}