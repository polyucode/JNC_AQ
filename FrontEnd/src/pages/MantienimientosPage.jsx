import React , {useState, useEffect} from "react";
import MaterialTable from '@material-table/core';
import axios from "axios";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Edit from '@material-ui/icons/Edit';
import CalendarToday from '@material-ui/icons/CalendarToday';
import {Modal, TextField, Button} from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import {makeStyles} from '@material-ui/core/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import FullCalendar from '@fullcalendar/react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { MainLayout } from "../layout/MainLayout";

const token = {
    headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

//Tipos Mantenimiento
const tipos = [
    {id:1, nombre:"Mensual"},
    {id:2, nombre:"Bimensual"},
    {id:3, nombre:"Trimestral"},
    {id:4, nombre:"Semestral"}      
]

//estilos modal
const useStylesEditarDet = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 1500,
      height: 850,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));

  //estilos modal
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
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
  
export const MantenimientosPage = () => {

    //variables
    const [modalInsertar, setModalInsertar]= useState(false);

    const [modalEditar, setModalEditar]= useState(false);
    
    const [modalEliminar, setModalEliminar]= useState(false);

    //modals detalle
    const [modalInsertarDet, setModalInsertarDet]= useState(false);

    const [modalEditarDet, setModalEditarDet]= useState(false);
    
    const [modalEliminarDet, setModalEliminarDet]= useState(false);

    const [modalCalendario, setmodalCalendario]= useState(false);


    const [mantenimientoCabSeleccionado, setMantenimientoCabSeleccionado] = useState({

      id: 0,
      idCliente: 0,
      idTecnicoAsignado: 0,
      idElementoPlanta: 0,
      numOferta: "",
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

    const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);
    const [FilasSeleccionadasDet, setFilasSeleccionadasDet] = useState([]);

    const [clienteMantenimientoCabEditar, setClienteMantenimientoCabEditar] = useState([]);
    const [elementoMantenimientoCabEditar, setElementoMantenimientoCabEditar] = useState([]);
    const [tipoMantenimientoCabEditar, setTipoMantenimientoCabEditar] = useState([]);
    const [tecnicoMantenimientoCabEditar, setTecnicoMantenimientoCabEditar] = useState([]);

    const [clienteMantenimientoDetEditar, setClienteMantenimientoDetEditar] = useState([]);

    const [mantenimientoCabMantenimientoCabEditar, setmantenimientoCabMantenimientoCabEditar] = useState([]);

    const [MantenimientoCabEliminar, setMantenimientoCabEliminar] = useState([]);
    const [MantenimientoDetEliminar, setMantenimientoDetEliminar] = useState([]);

    const [data, setData] = useState([]);
    const [dataDet, setDataDet] = useState([]);

    const [tecnicos, setTecnicos] = useState([]);

    const [elementosplanta, setElementosPlanta] = useState([]);

    const [clientes, setClientes] = useState([]);

    const [clientesTable, setClientesTable] = useState({});
    
    const [elementosplantaTable, setElementosPlantaTable] = useState({});
    
    const [tecnicosTable, setTecnicosTable] = useState({});

    const [tiposTable, setTiposTable] = useState({});

    const [fechaprevista, setfechaprevista] = useState("");
    const [fechaRealizacion, setFechaRealizacion] = useState("");

    const styles= useStyles();   
    
    const stylesEditarDet = useStylesEditarDet();

    
    const columnas= [

      //visibles
      { title: 'Cliente', field: 'idCliente', type: 'numeric',lookup:clientesTable,filterPlaceholder:"Filtrar por cliente", cellStyle: { textAlign: "left" } },
      { title: 'Técnico', field: 'idTecnicoAsignado',lookup:tecnicosTable, type: 'numeric',filterPlaceholder:"Filtrar por técnico", cellStyle: { textAlign: "left" } },
      { title: 'Elemetno de planta', field: 'idElementoPlanta', type: 'numeric',lookup:elementosplantaTable,filterPlaceholder:"Filtrar por elemento", cellStyle: { textAlign: "left" } },
      { title: 'Número de oferta', field: 'numOferta', filterPlaceholder:"Filtrar por oferta" },
      { title: 'Tipo', field: 'tipo',lookup:tiposTable, filterPlaceholder:"Filtrar por tipo"},



      //Ocultas
      { title: 'Fecha creación', field: 'addDate', type: 'date', filterPlaceholder:"Filtrar por fecah creacion", hidden: true  },
      { title: 'Usuario creación', field: 'AddIdUser', type: 'numeric', filterPlaceholder:"Filtrar por Usuario creación", hidden: true },
      { title: 'Fecha eliminación', field: 'delDate', type: 'date', filterPlaceholder:"Filtrar por Fecha eliminación", hidden: true },
      { title: 'Usuario eliminación', field: 'delIdUser', type: 'numeric', filterPlaceholder:"Filtrar por Usuario eliminación", hidden: true },
      { title: 'Eliminado', field: 'deleted', type: 'boolean', filterPlaceholder:"Filtrar por Eliminado", hidden: true },
      { title: 'Id', field: 'id', type: 'numeric', filterPlaceholder:"Filtrar por Id", hidden: true , },
      { title: 'Fecha modificación', field: 'modDate', type: 'date', filterPlaceholder:"Filtrar por Fecha modificación", hidden: true },
      { title: 'Usuario modificacion', field: 'modIdUser', type: 'numeric', filterPlaceholder:"Filtrar por Usuario modificacion", hidden: true },
          
  ];
  
  const columnasDet=[

    //visibles
    { title: 'Fecha Prevista', field: 'fechaPrevista', type: 'date',filterPlaceholder:"Filtrar por fecha" },
    { title: 'Realizado', field: 'realizado', type: 'boolean',filterPlaceholder:"Filtrar por realizado" },
    { title: 'Fecha Realización', field: 'fechaRealizacion', type: 'date',filterPlaceholder:"Filtrar por fecha" },
    { title: 'Estado', field: 'estado',filterPlaceholder:"Filtrar por estado" },
    { title: 'Observaciones', field: 'observaciones',filterPlaceholder:"Filtrar por observaciones" },


    //Ocultas
    { title: 'Id Cabecera', field: 'idCab', type: 'numeric', filterPlaceholder:"Filtrar por Id Cabecera", hidden: true , },
    { title: 'Fecha creación', field: 'addDate', type: 'date', filterPlaceholder:"Filtrar por fecah creacion", hidden: true  },
    { title: 'Usuario creación', field: 'AddIdUser', type: 'numeric', filterPlaceholder:"Filtrar por Usuario creación", hidden: true },
    { title: 'Fecha eliminación', field: 'delDate', type: 'date', filterPlaceholder:"Filtrar por Fecha eliminación", hidden: true },
    { title: 'Usuario eliminación', field: 'delIdUser', type: 'numeric', filterPlaceholder:"Filtrar por Usuario eliminación", hidden: true },
    { title: 'Eliminado', field: 'deleted', type: 'boolean', filterPlaceholder:"Filtrar por Eliminado", hidden: true },
    { title: 'Id', field: 'id', type: 'numeric', filterPlaceholder:"Filtrar por Id", hidden: true , },
    { title: 'Fecha modificación', field: 'modDate', type: 'date', filterPlaceholder:"Filtrar por Fecha modificación", hidden: true },
    { title: 'Usuario modificacion', field: 'modIdUser', type: 'numeric', filterPlaceholder:"Filtrar por Usuario modificacion", hidden: true },
        
];

    //peticiones API
    const GetClientes = async () => {
      axios.get("/cliente", token).then(response => {
        const cliente = Object.entries(response.data.data).map(([key,value]) => (key, value))
        setClientes(cliente);
      },[])
    }

    const GetTecnicos = async () => {
      axios.get("/usuario", token).then(response => {
        const usuario = Object.entries(response.data.data).map(([key,value]) => (key, value))
        setTecnicos(usuario);
      },[])
    }

    const GetElementosPlanta = async () => {
        axios.get("/elementosplanta", token).then(response => {
          const elemento = Object.entries(response.data.data).map(([key,value]) => (key, value))
          setElementosPlanta(elemento);
        },[])
      }

    const  peticionGet = async () => {
      axios.get("/servmantenimientocab", token).then(response => {
        setData(response.data.data)
      })


    }

    useEffect(() => {
      peticionGet();


      GetElementosPlanta();
      GetClientes();
      GetTecnicos();


    }, [])


    useEffect(() => { 
            //lookups
            const lookupClientes = {};
            clientes.map(fila=>lookupClientes[fila.id]=fila.nombreComercial);
            setClientesTable(lookupClientes);
            console.log("clientesTable " + JSON.stringify(clientesTable) )
            const lookupElementosPlanta = {};
            elementosplanta.map(fila=>lookupElementosPlanta[fila.id]=fila.nombre);
            setElementosPlantaTable(lookupElementosPlanta);
            //console.log("ElementosTable " + JSON.stringify(elementosplantaTable))
        
            const lookupTipos = {};
            tipos.map(fila=>lookupTipos[fila.id]=fila.nombre);
            setTiposTable(lookupTipos);
            //console.log("tiposTable " + JSON.stringify(tiposTable))
        
            const lookupTecnicos = {};
            tecnicos.map(fila=>lookupTecnicos[fila.id]=fila.nombre);
            setTecnicosTable(lookupTecnicos);
            //console.log("tecnicosTable " + JSON.stringify(tecnicosTable))

     }, [clientes,tecnicos,elementosplanta])

    const peticionPost = async () => {
      console.log(mantenimientoCabSeleccionado)
      mantenimientoCabSeleccionado.id = null;
      await axios.post("/servmantenimientocab", mantenimientoCabSeleccionado,token)
        .then(response => {
          //Creamos los detalles
          var date = new Date(fechaprevista);
          
          if(mantenimientoCabSeleccionado.tipo === 1){
            for(let i = 0;i<12;i++){

              mantenimientoDetSeleccionado.id = null;
              mantenimientoDetSeleccionado.idCab = response.data.data.id;
              mantenimientoDetSeleccionado.fechaPrevista = date.toJSON();
              mantenimientoDetSeleccionado.realizado = false;
              mantenimientoDetSeleccionado.fechaRealizacion = null;
              mantenimientoDetSeleccionado.estado = "1";
              mantenimientoDetSeleccionado.observaciones = "Servicio de Mantenimiento añadido automaticamente";
              date.setMonth(date.getMonth()+1)
              peticionPostDet();
            }
          }
          if(mantenimientoCabSeleccionado.tipo === 2){
            for(let i = 0;i<6;i++){

              mantenimientoDetSeleccionado.id = null;
              mantenimientoDetSeleccionado.idCab = response.data.data.id;
              mantenimientoDetSeleccionado.fechaPrevista = date.toJSON();
              mantenimientoDetSeleccionado.realizado = false;
              mantenimientoDetSeleccionado.fechaRealizacion = null;
              mantenimientoDetSeleccionado.estado = "1";
              mantenimientoDetSeleccionado.observaciones = "Servicio de Mantenimiento añadido automaticamente";
              date.setMonth(date.getMonth()+2)
              peticionPostDet();
            }
          }
          if(mantenimientoCabSeleccionado.tipo === 3){
            for(let i = 0;i<4;i++){

              mantenimientoDetSeleccionado.id = null;
              mantenimientoDetSeleccionado.idCab = response.data.data.id;
              mantenimientoDetSeleccionado.fechaPrevista = date.toJSON();
              mantenimientoDetSeleccionado.realizado = false;
              mantenimientoDetSeleccionado.fechaRealizacion = null;
              mantenimientoDetSeleccionado.estado = "1";
              mantenimientoDetSeleccionado.observaciones = "Servicio de Mantenimiento añadido automaticamente";
              date.setMonth(date.getMonth()+3)
              peticionPostDet();
            }
          }
          if(mantenimientoCabSeleccionado.tipo === 4){
            for(let i = 0;i<3;i++){

              mantenimientoDetSeleccionado.id = null;
              mantenimientoDetSeleccionado.idCab = response.data.data.id;
              mantenimientoDetSeleccionado.fechaPrevista = date.toJSON();
              mantenimientoDetSeleccionado.realizado = false;
              mantenimientoDetSeleccionado.fechaRealizacion = null;
              mantenimientoDetSeleccionado.estado = "1";
              mantenimientoDetSeleccionado.observaciones = "Servicio de Mantenimiento añadido automaticamente";
              date.setMonth(date.getMonth()+4)
              peticionPostDet();
            }
          }
          
          abrirCerrarModalInsertar();
          peticionGet();
        }).catch(error => {
          console.log(error);
        })
    }

    const peticionPut=async()=>{
      console.log("Metodo PUT" + mantenimientoCabSeleccionado)
      await axios.put("/servmantenimientocab?id=" + mantenimientoCabSeleccionado.id, mantenimientoCabSeleccionado, token)
      .then(response=>{
        var mantenimientoCabModificado = data;
        mantenimientoCabModificado.map(mantenimientoCab=>{
          if(mantenimientoCab.id===mantenimientoCabSeleccionado.id){
            mantenimientoCab = mantenimientoCabSeleccionado
          }
        });
        peticionGet();
        abrirCerrarModalEditar();
      }).catch(error=>{
        console.log(error);
      })
    }
  
    const peticionPutDet=async()=>{
      console.log(mantenimientoDetSeleccionado)
      await axios.put("/servmantenimientodet?id=" + mantenimientoDetSeleccionado.id, mantenimientoDetSeleccionado, token)
      .then(response=>{
        var mantenimientoDetSeleccionado = data;
        mantenimientoDetSeleccionado.map(mantenimientoDet=>{
          if(mantenimientoDet.id===mantenimientoDetSeleccionado.id){
            mantenimientoDet = mantenimientoDetSeleccionado
          }
        });
        peticionGetDet();
        abrirCerrarModalEditarDet();
      }).catch(error=>{
        console.log(error);
      })
    }

    const peticionDelete=async()=>{
      console.log("id=" + MantenimientoCabEliminar[0].id)
      await axios.delete("/servmantenimientocab/"+ MantenimientoCabEliminar[0].id, token)
      .then(response=>{
        peticionGet();
        abrirCerrarModalEliminar();
      }).catch(error=>{
        console.log(error);
      })
    }

    const peticionDeleteDet=async()=>{
      console.log("id=" + MantenimientoDetEliminar[0].id)
      var i = 0;
      while(i < MantenimientoDetEliminar.length){
        await axios.delete("/servmantenimientodet/"+ MantenimientoDetEliminar[i].id, token)
        .then(response=>{
          peticionGetDet();
          abrirCerrarModalEliminarDet();
        }).catch(error=>{
          console.log(error);
        })
        i++;
      }
    }

    //peticiones mantenimiento detalle
    const peticionGetDet = async () => {
      axios.get("/servmantenimientodet", token).then(response => {
        setDataDet(response.data.data.filter(servicio => servicio.idCab === mantenimientoCabSeleccionado.id))
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
        const abrirCerrarModalInsertar=()=>{
            setModalInsertar(!modalInsertar);
          }
      
          const handleChange=e=>{
            const {name, value}=e.target;
            setMantenimientoCabSeleccionado(prevState=>({
              ...prevState,
              [name]: value
            }));
          }
      
          const handleChangeTipo=(event,value) => {
            setMantenimientoCabSeleccionado(prevState=>({
          ...prevState,
          tipo:value.id
          }))
        //   if(value.id === 2){
        //   setestadoCboCliente(false)
        //   }else{
        //     setestadoCboCliente(true)
        //   }
          }

        const bodyInsertar=(
            <div className={styles.modal}>
              <h3>Agregar mantenimiento</h3>
            <div className="row g-3">
              <div className="col-md-6">
                {/* Desplegable de Clientes */}
                <Autocomplete
                  disableClearable={true}
                  id="CboClientes"
                  options={clientes}
                  getOptionLabel={option => option.nombreComercial}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Clientes" name="idCliente" />}
                  onChange={(event, value) => setMantenimientoCabSeleccionado(prevState => ({
                    ...prevState,
                    idCliente: value.id
                  }))}
                />
              </div>
              
              <div className="col-md-6">
              {/* Desplegable de Técnicos */}
              <Autocomplete
                disableClearable={true}
                id="CboTecnicos"
                options={tecnicos}
                filterOptions={options => tecnicos.filter(cliente => cliente.idPerfil === 1004)}
                getOptionLabel={option => option.nombre + ' ' + option.apellidos}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Técnicos" name="idTecnicoAsignado" />}
                onChange={(event, value) => setMantenimientoCabSeleccionado(prevState => ({
                  ...prevState,
                  idTecnicoAsignado: value.id
                }))}
              />
              </div>
              {/* Desplegable de elementos planta */}
              <div className="col-md-6">
              <Autocomplete
                disableClearable={true}
                id="CboElementosPlanta"
                options={elementosplanta}
                getOptionLabel={option => option.nombre}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Elemento planta" name="idElementoPlanta" />}
                onChange={(event, value) => setMantenimientoCabSeleccionado(prevState => ({
                  ...prevState,
                  idElementoPlanta: value.id
                }))}
              />
              </div>
              <div className="col-md-6">
              {/* Desplegable de tipos*/}
              <Autocomplete
                disableClearable={true}
                id="CboTipos"
                options={tipos}
                getOptionLabel={option => option.nombre}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Tipo" name="idTipo" />}
                onChange={(event, value) => setMantenimientoCabSeleccionado(prevState => ({
                  ...prevState,
                  tipo: value.id
                }))}
              />
              </div>

              <div className="col-md-6">
              <TextField className={styles.inputMaterial} label="Número de oferta" name="numOferta" onChange={handleChange} />
              </div>
              
              <br />
              <div className="col-md-6">
              {/* Fecha prevista */}
              <TextField
                id="fechaprevista"
                label="Fecha prevista"
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
                <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
                <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
              </div>
            </div>
          )
      
          //modal editar mantenimiento
      
          const abrirCerrarModalEditar=()=>{
            setModalEditar(!modalEditar);
          }

          const abrirCerrarCalendario=()=>{
            setmodalCalendario(!modalCalendario);
          }

          const bodyCalendar=(
            <div className={stylesEditarDet.modal}>
              <h3>Calendario</h3>
              <FullCalendar
                plugins={[ resourceTimelinePlugin, dayGridPlugin, timeGridPlugin, listPlugin ]}
                headerToolbar={{
                  left: 'today prev,next',
                  center: 'title',
                  right: 'resourceTimelineMonth'
                }}
                timeZone= 'UTC'
                initialView= 'resourceTimelineDay'
                scrollTime= '08:00'
                aspectRatio= {1.5}
                weekends={false}
                height= {650}
                resourceAreaHeaderContent= 'Elementos'
                resources= {[
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
                events={ [
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
      
          const bodyEditar=(
            <div className={stylesEditarDet.modal}>
              <h3>Editar mantenimiento</h3>
              <div className="row g-3">
              <div className="col-md-6">
              {/* Desplegable de Clientes */}
              <Autocomplete
                disableClearable={true}
                id="CboClientes"
                options={clientes}
                defaultValue={clienteMantenimientoCabEditar[0]}
                getOptionLabel={option => option.nombreComercial}
                sx={{ width: 300}}
                renderInput={(params) => <TextField {...params} label="Clientes" name="idCliente"/>}
                onChange={(event, value) => setMantenimientoCabSeleccionado(prevState=>({
                  ...prevState,
                  idCliente:value.id
                }))}
                />
                </div>
                <div className="col-md-6">
                {/* Desplegable de Técnicos */}
              <Autocomplete
                disableClearable={true}
                id="CboTecnicos"
                options={tecnicos}
                defaultValue={tecnicoMantenimientoCabEditar[0]}
                filterOptions={options => tecnicos.filter(cliente=>cliente.idPerfil===1004)}
                getOptionLabel={option => option.nombre + ' ' + option.apellidos}
                sx={{ width: 300}}
                renderInput={(params) => <TextField {...params} label="Técnicos" name="idTecnicoAsignado"/>}
                onChange={(event, value) => setMantenimientoCabSeleccionado(prevState=>({
                  ...prevState,
                  idTecnicoAsignado:value.id
                }))}
                />
                </div>
                <div className="col-md-6">

                {/* Desplegable de elementos planta */}
              <Autocomplete
                disableClearable={true}
                id="CboElementosPlanta"
                options={elementosplanta}
                defaultValue={elementoMantenimientoCabEditar[0]}
                getOptionLabel={option => option.nombre}
                sx={{ width: 300}}
                renderInput={(params) => <TextField {...params} label="Elemento planta" name="idElementoPlanta"/>}
                onChange={(event, value) => setMantenimientoCabSeleccionado(prevState=>({
                  ...prevState,
                  idElementoPlanta:value.id
                }))}
                />
                </div>
                <div className="col-md-6">

                {/* Desplegable de tipos*/}
              <Autocomplete
                disableClearable={true}
                id="CboTipos"
                options={tipos}
                defaultValue={tipoMantenimientoCabEditar[0]}
                getOptionLabel={option => option.nombre}
                sx={{ width: 300}}
                renderInput={(params) => <TextField {...params} label="Tipo" name="idTipo"/>}
                onChange={(event, value) => setMantenimientoCabSeleccionado(prevState=>({
                  ...prevState,
                  tipo:value.id
                }))}
                />
                </div>
                <div className="col-md-6">
              <TextField className={styles.inputMaterial} label="Número de oferta" name="numOferta" value={mantenimientoCabSeleccionado&&mantenimientoCabSeleccionado.numOferta} onChange={handleChange}/>      
              </div>
              </div>
              <br />
              <div className="row">
              {/* Listado de mantenimientosDet */}
              <MaterialTable columns={columnasDet} data={dataDet}
                localization={localization}
                actions={[
                  {
                    icon: () => <CalendarToday />,
                    tooltip: "Ver calendario",
                    isFreeAction: true,
                    onClick: (e, data) => {
                      abrirCerrarCalendario();
                      console.log("CALENDARIO")
                    },
                  },
                  {
                    icon: () => <AddCircle style={{ fill: "green" }} />,
                    tooltip: "Añadir detalle mantenimiento",
                    isFreeAction: true,
                    onClick: (e, data) => {
                      setClienteMantenimientoDetEditar(clientes.filter(cliente => cliente.id === FilasSeleccionadas[0].idCliente));
                      abrirCerrarModalInsertarDet();
                      console.log(dataDet)
                    },
                  },
                  {
                    icon: () => <RemoveCircle style={{ fill: "red" }} />,
                    tooltip: "Eliminar detalle mantenimiento",
                    onClick: (event, rowData) => {
                      setMantenimientoDetEliminar(FilasSeleccionadasDet);
                      abrirCerrarModalEliminarDet();
                    },
                  },
                  {
                    icon: () => <Edit />,
                    tooltip: "Editar detalle mantenimiento",
                    onClick: (e, data) => {
                      setClienteMantenimientoDetEditar(clientes.filter(cliente => cliente.id === FilasSeleccionadas[0].idCliente));
                      if(mantenimientoDetSeleccionado.realizado === true){
                        console.log("prueba fecha not null")
                        setFechaRealizacion(new Date(mantenimientoDetSeleccionado.fechaRealizacion).getFullYear() + "-" + ("0" + (new Date(mantenimientoDetSeleccionado.fechaRealizacion).getMonth() + 1)).slice(-2) + "-" + ("0" + (new Date(mantenimientoDetSeleccionado.fechaRealizacion).getDate())).slice(-2))
                      }else{
                        setFechaRealizacion("")
                      }
                      console.log(mantenimientoDetSeleccionado)                      // setClienteMantenimientoCabEditar(clientes.filter(cliente => cliente.id === FilasSeleccionadas[0].idCliente));
                      // setElementoMantenimientoCabEditar(elementosplanta.filter(elemento => elemento.id === FilasSeleccionadas[0].idElementoPlanta));
                      // setTipoMantenimientoCabEditar(tipos.filter(tipo => tipo.id === FilasSeleccionadas[0].tipo));
                      // setTecnicoMantenimientoCabEditar(tecnicos.filter(tecnico => tecnico.id === FilasSeleccionadas[0].idTecnicoAsignado));
                      // if(FilasSeleccionadas[0].idPerfil === 2){
                      //   setclienteUsuarioEditar(clientes.filter(cliente=>cliente.id===FilasSeleccionadas[0].idCliente));
                      //   setestadoCboCliente(false);
                      // }else{
                      //   setclienteUsuarioEditar(false);
                      //   setestadoCboCliente(true);
                      // }
                      abrirCerrarModalEditarDet();
                    },
                  },
                ]}

                // onRowClick={((evt, mantenimientoDetSeleccionado) => setMantenimientoDetSeleccionado(mantenimientoDetSeleccionado.tableData.id))}
                onSelectionChange={(filas) => {
                  setFilasSeleccionadasDet(filas);
                  if(filas.length > 0)
                  setMantenimientoDetSeleccionado(filas[0]);
                }
                }
                options={{
                  sorting: true, paging: true, pageSizeOptions: [1, 2, 3, 4, 5], pageSize: 5, filtering: false, search: false, selection: true,
                  columnsButton: true,
                  rowStyle: rowData => ({
                    backgroundColor: (mantenimientoDetSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                    whiteSpace: "nowrap"
                  }),
                  exportMenu: [{
                    label: 'Export PDF',
                    exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de detalles mantenimientos')
                  }, {
                    label: 'Export CSV',
                    exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de detalles mantenimientos')
                  }]
                }}

                title="Listado detalles de mantenimientos"
              />
            </div>
              <br />
              <div align="right">
                <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
                <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
              </div>
            </div>
          )
          
          // modal eliminar mantenimiento
          const abrirCerrarModalEliminar=()=>{
            setModalEliminar(!modalEliminar);
          }
      
          const bodyEliminar=(
            
            <div className={styles.modal}>
              <p>Estás seguro que deseas eliminar el mantenimiento ? </p>
              <div align="right">
                <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
                <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
        
              </div>
            </div>
          )


          // modal insertar mantenimiento detalle
          const handleChangeDet=e=>{
            const {name, value}=e.target;
            setMantenimientoDetSeleccionado(prevState=>({
              ...prevState,
              [name]: value
            }));
          }

          const handleChangeCheck=(event,value) => {
            setMantenimientoDetSeleccionado(prevState=>({
          ...prevState,
          realizado:value
          }))
          }


          const abrirCerrarModalInsertarDet=()=>{
            
            setModalInsertarDet(!modalInsertarDet);
          }

          const bodyInsertarDet=(
            <div className={styles.modal}>
              <h3>Insertar detalle mantenimiento</h3>
              <div className="row g-3">
              <div className="col-md-6">
                {/* Desplegable de Clientes */}
                <Autocomplete
                  disabled
                  disableClearable={true}
                  id="CboClientes"
                  options={clientes}
                  defaultValue={clienteMantenimientoDetEditar[0]}
                  getOptionLabel={option => option.nombreComercial}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Clientes" name="idCliente" />}
                 
                />
              </div>
              <div className="col-md-6">
              <TextField disabled className={styles.inputMaterial} label="Número de oferta" name="numOferta" defaultValue={mantenimientoCabSeleccionado.numOferta} onChange={handleChangeDet} />
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
                <Button color="primary" onClick={()=>peticionPostDet()}>Insertar</Button>
                <Button onClick={()=>abrirCerrarModalInsertarDet()}>Cancelar</Button>
              </div>
            </div>
          )

                    // modal editar mantenimiento detalle
                    const abrirCerrarModalEditarDet=()=>{
                      setModalInsertar(!modalInsertar);
                      setModalEditarDet(!modalEditarDet);

                    }
          
                    const bodyEditarDet=(
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
                        <TextField disabled className={styles.inputMaterial} defaultValue={mantenimientoCabSeleccionado.numOferta} label="Número de oferta" name="numOferta" />
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
                        <FormControlLabel control={<Checkbox defaultChecked={mantenimientoDetSeleccionado.realizado} />}  className={styles.inputMaterial} label="Realizado" name="realizado" onChange={handleChangeCheck} />
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
                          <Button color="primary" onClick={()=>peticionPutDet()}>Editar</Button>
                          <Button onClick={()=>abrirCerrarModalEditarDet()}>Cancelar</Button>
                        </div>
                      </div>
                    )

                    // modal eliminar mantenimiento
          const abrirCerrarModalEliminarDet=()=>{
            setModalEditar(!modalEditar);
            setModalEliminarDet(!modalEliminarDet);
          }
      
          const bodyEliminarDet=(
            
            <div className={styles.modal}>
              <p>Estás seguro que deseas eliminar el detalle de mantenimiento ? </p>
              <div align="right">
                <Button color="secondary" onClick={()=>peticionDeleteDet()}>Sí</Button>
                <Button onClick={()=>abrirCerrarModalEliminarDet()}>No</Button>
        
              </div>
            </div>
          )

    return (
      <MainLayout title="Mantenimientos">
        <div>
        <MaterialTable columns={columnas} data={data}
            localization={localization}
            actions={[
                {
                    icon: () => <AddCircle style={{ fill: "green"}}/>,
                  tooltip: "Añadir Mantenimiento",
                  isFreeAction: true,
                  onClick: (e,data) => {
                    abrirCerrarModalInsertar();
                },
                },
                {
                    icon: () => <RemoveCircle style={{ fill: "red"}}/>,
                  tooltip: "Eliminar Mantenimiento",
                  onClick: (event,rowData) => {
                    setMantenimientoCabEliminar(FilasSeleccionadas);
                    abrirCerrarModalEliminar()
                  },
                },
                {
                    icon: () => <Edit/>,
                  tooltip: "Editar Mantenimiento",
                  onClick: (e,data) => {
                     peticionGetDet();

                     setClienteMantenimientoCabEditar(clientes.filter(cliente=>cliente.id===FilasSeleccionadas[0].idCliente));
                     setElementoMantenimientoCabEditar(elementosplanta.filter(elemento=>elemento.id===FilasSeleccionadas[0].idElementoPlanta));
                     setTipoMantenimientoCabEditar(tipos.filter(tipo=>tipo.id===FilasSeleccionadas[0].tipo));
                     setTecnicoMantenimientoCabEditar(tecnicos.filter(tecnico=>tecnico.id===FilasSeleccionadas[0].idTecnicoAsignado));
                    // if(FilasSeleccionadas[0].idPerfil === 2){
                    //   setclienteUsuarioEditar(clientes.filter(cliente=>cliente.id===FilasSeleccionadas[0].idCliente));
                    //   setestadoCboCliente(false);
                    // }else{
                    //   setclienteUsuarioEditar(false);
                    //   setestadoCboCliente(true);
                    // }
                    abrirCerrarModalEditar();
                  },
                },
              ]}

            onRowClick={((evt, mantenimientoCabSeleccionado) => setMantenimientoCabSeleccionado(mantenimientoCabSeleccionado.tableData.id))}  
            onSelectionChange={(filas)=>{
              setFilasSeleccionadas(filas);
              if(filas.length > 0)
              setMantenimientoCabSeleccionado(filas[0]);
            }
            }
            options={{sorting:true,paging:true,pageSizeOptions:[5,10,20,50,100,200],pageSize:10,filtering:true,search: false,selection:true,
                columnsButton:true,
                rowStyle: rowData => ({
                    backgroundColor: (mantenimientoCabSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                    whiteSpace: "nowrap"
                  }),
                headerStyle: {
                    height: 10,
                    backgroundcolor: "#D8D8D8"
                  },
                exportMenu: [{
                    label: 'Export PDF',
                    exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Mantenimientos')
                  }, {
                    label: 'Export CSV',
                    exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Mantenimientos')
                  }]
            }}
           
            title="Listado de mantenimientos"
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
      </MainLayout>
    );

}