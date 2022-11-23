import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MaterialTable from '@material-table/core';
import { Grid, Card, Typography } from '@mui/material';
import axios from "axios";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Edit from '@material-ui/icons/Edit';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { Modal, TextField, Button } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ThemeContext } from "../router/AppRouter";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import { MainLayout } from "../layout/MainLayout";

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';
import { InsertarTareaModal } from '../components/Modals/InsertarTareaModal';
import { EditarTareaModal } from '../components/Modals/EditarTareaModal';
import { insertarBotonesModal } from '../helpers/insertarBotonesModal';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

import { ModalLayout, ModalPopup } from "../components/ModalLayout";
import { getOfertas, getOperarios } from "../api/apiBackend";

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
  { id: 4, nombre: "Semestral" }
]

export const TareasPage = () => {

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
    elemento: "",
    analisis: "",
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
  const [ofertas, setOfertas] = useState([]);
  const [operarios, setOperarios] = useState([]);

  const [clientesTable, setClientesTable] = useState({});

  const [elementosplantaTable, setElementosPlantaTable] = useState({});

  const [tecnicosTable, setTecnicosTable] = useState({});

  const [tiposTable, setTiposTable] = useState({});

  let navigate = useNavigate();

  const [snackData, setSnackData] = useState({ open: false, msg: 'Testing', severity: 'success' });

  const columns = [
    { title: 'Cliente', field: 'codigoCliente', width: 120 },
    { title: 'Nombre Cliente', field: 'nombreCliente', width: 250 },
    { title: 'Operario', field: 'operario', width: 200 },
    { title: 'Elemento', field: 'elementoPlanta', width: 200 },
    { title: 'Analisis', field: 'analisis', width: 200 },
    { title: 'Oferta', field: 'oferta', width: 100 },
    { title: 'Tipo', field: 'tipo', lookup: tiposTable , width: 100 },
    { title: 'Fecha', field: 'fecha', type: 'date', width: 220 }
  ]

  //peticiones API
  const GetClientes = async () => {
    axios.get("/cliente", token).then(response => {
      const cliente = Object.entries(response.data.data).map(([key, value]) => (key, value))
      setClientes(cliente);
    }, [])
  }

  const GetTecnicos = async () => {
    axios.get("/usuario", token).then(response => {
      const usuario = Object.entries(response.data.data).map(([key, value]) => (key, value))
      setTecnicos(usuario);
    }, [])
  }

  const GetElementosPlanta = async () => {
    axios.get("/elementosplanta", token).then(response => {
      const elemento = Object.entries(response.data.data).map(([key, value]) => (key, value))
      setElementosPlanta(elemento);
    }, [])
  }

  const peticionGet = async () => {
    axios.get("/tareas", token).then(response => {
      setData(response.data.data)
    })
  }

  useEffect(() => {
    peticionGet();
    GetElementosPlanta();
    GetClientes();
    GetTecnicos();

    getOfertas()
      .then(ofertas => {
        setOfertas(ofertas);
      })
    
    getOperarios()
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

    const lookupTipos = {};
    tipos.map(fila => lookupTipos[fila.id] = fila.nombre);
    setTiposTable(lookupTipos);

  }, [tipos])

  const peticionPost = async () => {
    tareaSeleccionada.id = null;
    await axios.post("/tareas", tareaSeleccionada, token)
      .then(response => {
        //Creamos los detalles
        var date = new Date(tareaSeleccionada.fecha);

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
    await axios.delete("/tareas/" + TareaEliminar[0], token)
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
    await axios.post("/parametrosanalisisplanta", analisisSeleccionado, token)
      .then(response => {
        //abrirCerrarModalInsertarDet();

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
      analisis: value.analisis
    }))

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
        elementoPlanta: "",
        analisis: "",
        fecha: null,
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
        elementoPlanta: "",
        analisis: "",
        fecha: null,
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
        elementoPlanta: "",
        analisis: "",
        fecha: null,
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

  console.log(tareaSeleccionada)

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
                //setElementoTareaEditar(confAnalisisNivelesPlantasCliente.filter(elemento => elemento.elemento === tareaSeleccionada.elementoPlanta));
                setTipoTareaEditar(tipos.filter(tipo => tipo.id === tareaSeleccionada.tipo));
                setTecnicoTareaEditar(operarios.filter(operario => (operario.nombre + ' ' + operario.apellidos) === tareaSeleccionada.operario));
                //setAnalisisEditar(confAnalisisNivelesPlantasCliente.filter(analisi => analisi.analisis === tareaSeleccionada.analisis));
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
            estadoProtocolo={estadoProtocolo}
            estadoOperario={estadoOperario}
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
            estadoProtocolo={estadoProtocolo}
            estadoOperario={estadoOperario}
            codigoClienteEditar={clienteTareaEditar}
            tipoTareaEditar={tipoTareaEditar}
            tecnicoTareaEditar={tecnicoTareaEditar}
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