import React, { useState, useEffect } from "react";
import MaterialTable from '@material-table/core';
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

import FullCalendar from '@fullcalendar/react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import './Mantenimientos.css';

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
  { id: 4, nombre: "Semestral" }
]

//estilos modal
const useStylesEditarDet = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 1500,
    height: 950,
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

//estilos modal
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 850,
    height: 550,
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

function Mantenimientos() {

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
    operario: "",
    idElementoPlanta: 0,
    oferta: 0,
    idAnalisis: 0,
    tipo: 0,
    addDate: null,
    addIdUser: null,
    modDate: null,
    modIdUser: null,
    delDate: null,
    delIdUser: null,
    deleted: null,

  });

  const [mantenimientoDetSeleccionado, setMantenimientoDetSeleccionado] = useState({

    id: 0,
    idCab: 0,
    fechaPrevista: null,
    realizado: false,
    fechaRealizacion: null,
    estado: "",
    observaciones: "",
  });

  const [analisisSeleccionado, setAnalisisSeleccionado] = useState({

    id: 0,
    codigoCliente: 0,
    oferta: 0,
    idElemento: 0,
    periodo: '',
    idAnalisis: 0,
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
  });

  const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);
  const [FilasSeleccionadasDet, setFilasSeleccionadasDet] = useState([]);
  const [FilasSeleccionadasVis, setFilasSeleccionadasVis] = useState([]);

  const [nombreClienteEditar, setNombreClienteEditar] = useState([]);
  const [clienteTareaEditar, setClienteTareaEditar] = useState([]);
  const [elementoTareaEditar, setElementoTareaEditar] = useState([]);
  const [tipoTareaEditar, setTipoTareaEditar] = useState([]);
  const [tecnicoTareaEditar, setTecnicoTareaEditar] = useState([]);
  const [ofertaEditar, setOfertaEditar] = useState([]);
  const [analisisEditar, setAnalisisEditar] = useState([]);

  const [clienteMantenimientoDetEditar, setClienteMantenimientoDetEditar] = useState([]);

  const [clienteAnalisisEditar, setClienteAnalisisEditar] = useState([]);

  const [MantenimientoDetEliminar, setMantenimientoDetEliminar] = useState([]);

  const [TareaEliminar, setTareaEliminar] = useState([]);

  const [AnalisisEliminar, setAnalisisEliminar] = useState([]);

  const [data, setData] = useState([]);
  const [dataDet, setDataDet] = useState([]);
  const [dataVis, setDataVis] = useState([]);

  const [operarios, setOperarios] = useState([]);

  const [elementosplanta, setElementosPlanta] = useState([]);

  const [clientes, setClientes] = useState([]);

  const [analisis, setAnalisis] = useState([]);

  const [ofertas, setOfertas] = useState([]);

  const [clientesTable, setClientesTable] = useState({});

  const [elementosplantaTable, setElementosPlantaTable] = useState({});

  const [tecnicosTable, setTecnicosTable] = useState({});

  const [tiposTable, setTiposTable] = useState({});

  const [analisisTable, setAnalisisTable] = useState({});

  const [fechaprevista, setfechaprevista] = useState("");
  const [fechaRealizacion, setFechaRealizacion] = useState("");

  const styles = useStyles();

  const stylesEditarDet = useStylesEditarDet();


  const columnas = [

    //visibles
    { title: 'Cliente', field: 'codigoCliente', filterPlaceholder: "Filtrar por cliente" },
    { title: 'Nombre Cliente', field: 'nombreCliente', filterPlaceholder: "Filtrar por cliente" },
    { title: 'Operario', field: 'operario', filterPlaceholder: "Filtrar por técnico" },
    { title: 'Elemento de planta', field: 'idElementoPlanta', lookup: elementosplantaTable, filterPlaceholder: "Filtrar por elemento" },
    { title: 'Analisis', field: 'idAnalisis', lookup: analisisTable, filterPlaceholder: "Filtrar por Analisis" },
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

  const peticionGet = async () => {
    axios.get("/servmantenimientocab", token).then(response => {
      setData(response.data.data)
    })
  }

  useEffect(() => {
    peticionGet();
    GetElementosPlanta();
    GetClientes();
    GetOperarios();
    GetAnalisis();
    GetOfertas();
  }, [])


  useEffect(() => {
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

  }, [elementosplanta, analisis, tipos])

  const peticionPost = async () => {
    console.log(tareaSeleccionada)
    tareaSeleccionada.id = null;
    await axios.post("/servmantenimientocab", tareaSeleccionada, token)
      .then(response => {
        console.log(response)
        //Creamos los detalles
        var date = new Date(fechaprevista);

        if (tareaSeleccionada.tipo === 1) {
          for (let i = 0; i < 12; i++) {

            analisisSeleccionado.id = null;
            analisisSeleccionado.codigoCliente = response.data.data.codigoCliente;
            analisisSeleccionado.oferta = response.data.data.oferta
            analisisSeleccionado.idElemento = response.data.data.idElementoPlanta;
            analisisSeleccionado.periodo = "";
            analisisSeleccionado.idAnalisis = response.data.data.idAnalisis;
            analisisSeleccionado.fecha = date.toJSON();
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.operario = response.data.data.operario;
            analisisSeleccionado.protocolo = "";
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
            analisisSeleccionado.oferta = response.data.data.oferta
            analisisSeleccionado.idElemento = response.data.data.idElementoPlanta;
            analisisSeleccionado.periodo = "";
            analisisSeleccionado.idAnalisis = response.data.data.idAnalisis;
            analisisSeleccionado.fecha = date.toJSON();
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.operario = response.data.data.operario;
            analisisSeleccionado.protocolo = "";
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
            analisisSeleccionado.oferta = response.data.data.oferta
            analisisSeleccionado.idElemento = response.data.data.idElementoPlanta;
            analisisSeleccionado.periodo = "";
            analisisSeleccionado.idAnalisis = response.data.data.idAnalisis;
            analisisSeleccionado.fecha = date.toJSON();
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.operario = response.data.data.operario;
            analisisSeleccionado.protocolo = "";
            analisisSeleccionado.observaciones = "";
            analisisSeleccionado.facturado = false;
            analisisSeleccionado.numeroFacturado = "";
            date.setMonth(date.getMonth() + 3)
            peticionPostVis();
          }
        }
        if (tareaSeleccionada.tipo === 4) {
          for (let i = 0; i < 3; i++) {

            analisisSeleccionado.id = null;
            analisisSeleccionado.codigoCliente = response.data.data.codigoCliente;
            analisisSeleccionado.oferta = response.data.data.oferta
            analisisSeleccionado.idElemento = response.data.data.idElementoPlanta;
            analisisSeleccionado.periodo = "";
            analisisSeleccionado.idAnalisis = response.data.data.idAnalisis;
            analisisSeleccionado.fecha = date.toJSON();
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.operario = response.data.data.operario;
            analisisSeleccionado.protocolo = "";
            analisisSeleccionado.observaciones = "";
            analisisSeleccionado.facturado = false;
            analisisSeleccionado.numeroFacturado = "";
            date.setMonth(date.getMonth() + 4)
            peticionPostVis();
          }
        }
        abrirCerrarModalInsertar();
        peticionGet();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPut = async () => {
    await axios.put("/servmantenimientocab?id=" + tareaSeleccionada.id, tareaSeleccionada, token)
      .then(response => {
        var tareaSeleccionada = data;
        tareaSeleccionada.map(tarea => {
          if (tarea.id === tareaSeleccionada.id) {
            tarea = tareaSeleccionada
          }
        });
        peticionGet();
        abrirCerrarModalEditar();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPutDet = async () => {
    console.log(mantenimientoDetSeleccionado)
    await axios.put("/servmantenimientodet?id=" + mantenimientoDetSeleccionado.id, mantenimientoDetSeleccionado, token)
      .then(response => {
        var mantenimientoDetSeleccionado = data;
        mantenimientoDetSeleccionado.map(mantenimientoDet => {
          if (mantenimientoDet.id === mantenimientoDetSeleccionado.id) {
            mantenimientoDet = mantenimientoDetSeleccionado
          }
        });
        peticionGetDet();
        abrirCerrarModalEditarDet();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionDelete = async () => {
    await axios.delete("/servmantenimientocab/" + TareaEliminar[0].id, token)
      .then(response => {
        peticionGet();
        abrirCerrarModalEliminar();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionDeleteDet = async () => {
    var i = 0;
    while (i < MantenimientoDetEliminar.length) {
      await axios.delete("/servmantenimientodet/" + MantenimientoDetEliminar[i].id, token)
        .then(response => {
          peticionGetDet();
          abrirCerrarModalEliminarDet();
        }).catch(error => {
          console.log(error);
        })
      i++;
    }
  }


  const peticionGetVis = async () => {
    axios.get("/parametrosanalisisplanta", token).then(response => {
      setDataVis(response.data.data.filter(analisi => analisi.codigoCliente === tareaSeleccionada.codigoCliente && analisi.oferta === tareaSeleccionada.oferta && analisi.idElemento === tareaSeleccionada.idElementoPlanta))
    })
  }

  const peticionPostVis = async () => {
    analisisSeleccionado.id = 0;
    await axios.post("/parametrosanalisisplanta", analisisSeleccionado, token)
      .then(response => {
        abrirCerrarModalInsertarDet();
        peticionGetVis();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPutVis = async () => {
    await axios.put("/parametrosanalisisplanta?id=" + analisisSeleccionado.id, analisisSeleccionado, token)
      .then(response => {
        var analisisSeleccionado = data;
        analisisSeleccionado.map(analisis => {
          if (analisis.id === analisisSeleccionado.id) {
            analisis = analisisSeleccionado
          }
        });
        peticionGetVis();
        abrirCerrarModalEditarDet();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionDeleteVis = async () => {
    var i = 0;
    while (i < AnalisisEliminar.length) {
      await axios.delete("/parametrosanalisisplanta/" + AnalisisEliminar[i].id, token)
        .then(response => {
          peticionGetVis();
          abrirCerrarModalEliminarDet();
        }).catch(error => {
          console.log(error);
        })
      i++;
    }
  }



  //peticiones mantenimiento detalle
  const peticionGetDet = async () => {
    axios.get("/servmantenimientodet", token).then(response => {
      setDataDet(response.data.data.filter(servicio => servicio.idCab === tareaSeleccionada.id))
    })
  }

  const peticionPostDet = async () => {
    mantenimientoDetSeleccionado.id = 0;
    console.log("Det insertar : " + mantenimientoDetSeleccionado)
    await axios.post("/servmantenimientodet", mantenimientoDetSeleccionado, token)
      .then(response => {
        abrirCerrarModalInsertarDet();
        peticionGetDet();
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

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar tarea</h3>
      <br />
      <div className="row g-3">
        <div className="col-md-6">
          <h5> Codigo Cliente </h5>
          {/* Desplegable de Clientes */}
          <Autocomplete
            disableClearable={true}
            id="CboClientes"
            options={clientes}
            getOptionLabel={option => option.codigo}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} name="codigoCliente" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              codigoCliente: value.codigo
            }))}
          />
        </div>

        <div className="col-md-6">
          <h5> Nombre Cliente </h5>
          {/* Desplegable de Clientes */}
          <Autocomplete
            disableClearable={true}
            id="CboClientes"
            options={clientes}
            getOptionLabel={option => option.razonSocial}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} name="nombreCliente" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              nombreCliente: value.razonSocial
            }))}
          />
        </div>

        {/* Desplegable de elementos planta */}
        <div className="col-md-4">
          <h5> Elemento de planta </h5>
          <Autocomplete
            disableClearable={true}
            id="CboElementosPlanta"
            options={elementosplanta}
            getOptionLabel={option => option.nombre}
            sx={{ width: 250 }}
            renderInput={(params) => <TextField {...params} name="idElementoPlanta" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              idElementoPlanta: value.id
            }))}
          />
        </div>

        <div className="col-md-3">
          <h5> Oferta </h5>
          <Autocomplete
            disableClearable={true}
            id="Oferta"
            options={ofertas}
            getOptionLabel={option => option.numeroOferta}
            sx={{ width: 150 }}
            renderInput={(params) => <TextField {...params} name="oferta" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              oferta: value.numeroOferta
            }))}
          />
        </div>

        <div className="col-md-5">
          <h5> Analisis </h5>
          {/* Desplegable de Técnicos */}
          <Autocomplete
            disableClearable={true}
            id="IdAnalisis"
            options={analisis}
            getOptionLabel={option => option.nombre}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="idAnalisis" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              idAnalisis: value.id
            }))}
          />
        </div>

        <div className="col-md-12">
          <h5> Operario </h5>
          {/* Desplegable de Técnicos */}
          <Autocomplete
            disableClearable={true}
            id="Operarios"
            options={operarios}
            filterOptions={options => operarios.filter(cliente => cliente.idPerfil === 1004)}
            getOptionLabel={option => option.nombre + ' ' + option.apellidos}
            sx={{ width: 350 }}
            renderInput={(params) => <TextField {...params} name="operario" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              operario: value.nombre
            }))}
          />
        </div>

        <div className="col-md-6">
          {/* Desplegable de tipos*/}
          <h5> Periodicidad </h5>
          <Autocomplete
            disableClearable={true}
            id="CboTipos"
            options={tipos}
            getOptionLabel={option => option.nombre}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="idTipo" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              tipo: value.id
            }))}
          />
        </div>
        <div className="col-md-6">
          {/* Fecha prevista */}
          <h5> Fecha Prevista </h5>
          <TextField
            id="fechaprevista"
            type="date"
            name="fechaPrevista"
            sx={{ width: 220 }}
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
      <div className="row g-3">
        <div className="col-md-3">
          <h5> Codigo Cliente </h5>
          {/* Desplegable de Clientes */}
          <Autocomplete
            disableClearable={true}
            id="CboClientes"
            options={clientes}
            defaultValue={clienteTareaEditar[0]}
            getOptionLabel={option => option.codigo}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} name="codigoCliente" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              codigoCliente: value.codigo
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
            defaultValue={nombreClienteEditar[0]}
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
            defaultValue={ofertaEditar[0]}
            getOptionLabel={option => option.numeroOferta}
            sx={{ width: 150 }}
            renderInput={(params) => <TextField {...params} name="oferta" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              oferta: value.numeroOferta
            }))}
          />
        </div>

        <div className="col-md-3">
          <h5> Analisis </h5>
          {/* Desplegable de Técnicos */}
          <Autocomplete
            disableClearable={true}
            id="IdAnalisis"
            options={analisis}
            defaultValue={analisisEditar[0]}
            getOptionLabel={option => option.nombre}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="idAnalisis" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              idAnalisis: value.id
            }))}
          />
        </div>

        <div className="col-md-4">
          {/* Desplegable de Técnicos */}
          <h5> Operario </h5>
          <Autocomplete
            disableClearable={true}
            id="Operario"
            options={operarios}
            defaultValue={tecnicoTareaEditar[0]}
            filterOptions={options => operarios.filter(cliente => cliente.idPerfil === 1004)}
            getOptionLabel={option => option.nombre + ' ' + option.apellidos}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="operario" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              operario: value.nombre
            }))}
          />
        </div>
        <div className="col-md-4">

          {/* Desplegable de elementos planta */}
          <h5> Elemento de planta </h5>
          <Autocomplete
            disableClearable={true}
            id="CboElementosPlanta"
            options={elementosplanta}
            defaultValue={elementoTareaEditar[0]}
            getOptionLabel={option => option.nombre}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="idElementoPlanta" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              idElementoPlanta: value.id
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
      </div>
      <br />
      <div className="row">
        <MaterialTable columns={columnasVis} data={dataVis}
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
            {
              icon: () => <Edit />,
              tooltip: "Editar detalle de tarea",
              onClick: (e, data) => {
                setClienteAnalisisEditar(clientes.filter(cliente => cliente.codigoCliente === tareaSeleccionada.codigoCliente));
                if (mantenimientoDetSeleccionado.realizado === true) {
                  setFechaRealizacion(new Date(mantenimientoDetSeleccionado.fechaRealizacion).getFullYear() + "-" + ("0" + (new Date(mantenimientoDetSeleccionado.fechaRealizacion).getMonth() + 1)).slice(-2) + "-" + ("0" + (new Date(mantenimientoDetSeleccionado.fechaRealizacion).getDate())).slice(-2))
                } else {
                  setFechaRealizacion("")
                }
                abrirCerrarModalEditarDet();
              },
            },
          ]}

          // onRowClick={((evt, mantenimientoDetSeleccionado) => setMantenimientoDetSeleccionado(mantenimientoDetSeleccionado.tableData.id))}
          onSelectionChange={(filas) => {
            setFilasSeleccionadasVis(filas);
            if (filas.length > 0)
              setAnalisisSeleccionado(filas[0]);
          }
          }
          options={{
            sorting: true, paging: true, pageSizeOptions: [1, 3, 5, 7], pageSize: 7, filtering: false, search: false, selection: true,
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

    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la tarea ? </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}>Sí</Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  )


  // modal insertar mantenimiento detalle
  const handleChangeDet = e => {
    const { name, value } = e.target;
    setMantenimientoDetSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleChangeCheck = (event, value) => {
    setMantenimientoDetSeleccionado(prevState => ({
      ...prevState,
      realizado: value
    }))
  }


  const abrirCerrarModalInsertarDet = () => {
    setModalInsertarDet(!modalInsertarDet);
  }

  const bodyInsertarDet = (
    <div className={styles.modal}>
      <h3>Insertar detalle de tarea </h3>
      <div className="row g-3">
        <div className="col-md-6">
          {/* Desplegable de Clientes */}
          <h5> Cliente </h5>
          <Autocomplete
            disableClearable={true}
            id="CboClientes"
            options={clientes}
            getOptionLabel={option => option.codigo}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="codigoCliente" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              codigoCliente: value.codigo
            }))}
          />
        </div>
        <div className="col-md-6">
          <Autocomplete
            disableClearable={true}
            id="Oferta"
            options={ofertas}
            getOptionLabel={option => option.numeroOferta}
            sx={{ width: 150 }}
            renderInput={(params) => <TextField {...params} name="oferta" />}
            onChange={(event, value) => setTareaSeleccionada(prevState => ({
              ...prevState,
              oferta: value.numeroOferta
            }))}
          />
        </div>
        <div className="col-md-6">
          {/* Fecha prevista */}
          <TextField
            id="fechaprevista"
            label="Fecha prevista"
            type="date"
            name="fechaPrevista"
            sx={{ width: 220 }}
            onChange={handleChangeDet}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="col-md-6">
          <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} label="Realizado" name="realizado" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          {/* Fecha realizacion */}
          <TextField
            id="fecharealizacion"
            label="Fecha realización"
            type="date"
            name="fechaRealizacion"
            sx={{ width: 220 }}
            onChange={handleChangeDet}
            InputLabelProps={{
              shrink: true,
            }}
          />
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
      <h3>Editar detalle mantenimiento</h3>
      <div className="row g-3">
        <div className="col-md-6">
          {/* Desplegable de Clientes */}
          <Autocomplete
            disabled
            disableClearable={true}
            id="CboClientesDet"
            options={clientes}
            defaultValue={clienteMantenimientoDetEditar[0]}
            getOptionLabel={option => option.nombreComercial}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Clientes" name="idCliente" />}

          />
        </div>
        <div className="col-md-6">
          <TextField disabled className={styles.inputMaterial} defaultValue={tareaSeleccionada.numOferta} label="Número de oferta" name="numOferta" />
        </div>
        <div className="col-md-6">
          {/* Fecha prevista */}
          <TextField
            id="fechaprevistadet"
            label="Fecha prevista"
            type="date"
            defaultValue={new Date(mantenimientoDetSeleccionado.fechaPrevista).getFullYear() + "-" + ("0" + (new Date(mantenimientoDetSeleccionado.fechaPrevista).getMonth() + 1)).slice(-2) + "-" + ("0" + (new Date(mantenimientoDetSeleccionado.fechaPrevista).getDate())).slice(-2)}
            name="fechaPrevista"
            sx={{ width: 220 }}
            onChange={handleChangeDet}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="col-md-6">
          <FormControlLabel control={<Checkbox defaultChecked={mantenimientoDetSeleccionado.realizado} />} className={styles.inputMaterial} label="Realizado" name="realizado" onChange={handleChangeCheck} />
        </div>
        <div className="col-md-6">
          {/* Fecha realizacion */}
          <TextField
            id="fecharealizacion"
            label="Fecha realización"
            type="date"
            defaultValue={fechaRealizacion}
            name="fechaRealizacion"
            sx={{ width: 220 }}
            onChange={handleChangeDet}
            InputLabelProps={{
              shrink: true,
            }}
          />
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

    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el detalle de tarea ? </p>
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
          {
            icon: () => <Edit />,
            tooltip: "Editar Tarea",
            onClick: (e, data) => {
              peticionGetVis();

              setNombreClienteEditar(clientes.filter(cliente => cliente.razonSocial === FilasSeleccionadas[0].nombreCliente))
              setClienteTareaEditar(clientes.filter(cliente => cliente.codigo === FilasSeleccionadas[0].codigoCliente));
              setElementoTareaEditar(elementosplanta.filter(elemento => elemento.id === FilasSeleccionadas[0].idElementoPlanta));
              setTipoTareaEditar(tipos.filter(tipo => tipo.id === FilasSeleccionadas[0].tipo));
              setTecnicoTareaEditar(operarios.filter(operario => operario.nombre === tareaSeleccionada.operario));
              setAnalisisEditar(analisis.filter(analisi => analisi.id === FilasSeleccionadas[0].idAnalisis));
              setOfertaEditar(ofertas.filter(oferta => oferta.numeroOferta === FilasSeleccionadas[0].oferta))

              abrirCerrarModalEditar();
            },
          },
        ]}

        onRowClick={(evt, tareaSeleccionada) => {
          setTareaSeleccionada(tareaSeleccionada);
          peticionGetVis();
          setNombreClienteEditar(clientes.filter(cliente => cliente.razonSocial === tareaSeleccionada.nombreCliente))
          setClienteTareaEditar(clientes.filter(cliente => cliente.codigo === tareaSeleccionada.codigoCliente));
          setElementoTareaEditar(elementosplanta.filter(elemento => elemento.id === tareaSeleccionada.idElementoPlanta));
          setTipoTareaEditar(tipos.filter(tipo => tipo.id === tareaSeleccionada.tipo));
          setTecnicoTareaEditar(operarios.filter(operario => operario.nombre === tareaSeleccionada.operario));
          setAnalisisEditar(analisis.filter(analisi => analisi.id === tareaSeleccionada.idAnalisis));
          setOfertaEditar(ofertas.filter(oferta => oferta.numeroOferta === tareaSeleccionada.oferta))
          abrirCerrarModalEditar();
        }}
        onSelectionChange={(filas) => {
          setFilasSeleccionadas(filas);
          if (filas.length > 0)
            setTareaSeleccionada(filas[0]);
        }
        }
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

export default Mantenimientos;