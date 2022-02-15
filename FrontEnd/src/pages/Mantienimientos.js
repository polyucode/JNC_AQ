import React , {useState, useEffect} from "react";
import MaterialTable from '@material-table/core';
import axios from "axios";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Edit from '@material-ui/icons/Edit';
import {Modal, TextField, Button} from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import {makeStyles} from '@material-ui/core/styles';

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
const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
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
  
function Mantenimientos() {

    //variables
    const [modalInsertar, setModalInsertar]= useState(false);

    const [modalEditar, setModalEditar]= useState(false);
    
    const [modalEliminar, setModalEliminar]= useState(false);

    const [mantenimientoCabSeleccionado, setMantenimientoCabSeleccionado] = useState({

      id: 0,
      idCliente: 0,
      idTecnicoAsignado: 0,
      idElementoPlanta: 0,
      numOferta: "",
      tipo: "",
      addDate: null,
      addIdUser: null,
      modDate: null,
      modIdUser: null,
      delDate: null,
      delIdUser: null,
      deleted: null,

    });

    const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);

    const [perfilMantenimientoCabEditar, setperfilMantenimientoCabEditar] = useState([]);

    const [mantenimientoCabMantenimientoCabEditar, setmantenimientoCabMantenimientoCabEditar] = useState([]);

    const [MantenimientoCabEliminar, setMantenimientoCabEliminar] = useState([]);

    const [data, setData] = useState([]);

    const [tecnicos, setTecnicos] = useState([]);

    const [elementosplanta, setElementosPlanta] = useState([]);

    const [clientes, setClientes] = useState([]);

    const [clientesTable, setClientesTable] = useState({});
    
    const [elementosplantaTable, setElementosPlantaTable] = useState({});
    
    const [tecnicosTable, setTecnicosTable] = useState({});

    const [tiposTable, setTiposTable] = useState({});

    const styles= useStyles();    

    const [fechaprevista, setFechaPrevista] = React.useState(new Date('2014-08-18T21:11:54'));

    const columnas=[

      //visibles
      { title: 'Cliente', field: 'idCliente', type: 'numeric',lookup:clientesTable,filterPlaceholder:"Filtrar por cliente" },
      { title: 'Técnico', field: 'idTecnicoAsignado',lookup:tecnicosTable, type: 'numeric',filterPlaceholder:"Filtrar por técnico" },
      { title: 'Elemetno de planta', field: 'idElementoPlanta', type: 'numeric',lookup:elementosplantaTable,filterPlaceholder:"Filtrar por elemento" },
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
          console.log(response.data.data);
          const elemento = Object.entries(response.data.data).map(([key,value]) => (key, value))
          setElementosPlanta(elemento);
        },[])
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
      GetTecnicos();

      const lookupClientes = {};
      clientes.map(fila=>lookupClientes[fila.id]=fila.nombreComercial);
      setClientesTable(lookupClientes);

      const lookupElementosPlanta = {};
      elementosplanta.map(fila=>lookupElementosPlanta[fila.id]=fila.nombre);
      setElementosPlantaTable(lookupElementosPlanta);

      const lookupTipos = {};
      tipos.map(fila=>lookupTipos[fila.id]=fila.nombre);
      setTiposTable(lookupTipos);

      const lookupTecnicos = {};
      tecnicos.map(fila=>lookupTecnicos[fila.id]=fila.nombre);
      setTecnicosTable(lookupTecnicos);

      console.log(lookupClientes);
      console.log(lookupElementosPlanta);

    }, [])

    const peticionPost = async () => {
      console.log(mantenimientoCabSeleccionado)
      mantenimientoCabSeleccionado.id = null;
      await axios.post("/servmantenimientocab", mantenimientoCabSeleccionado)
        .then(response => {
          //setData(data.concat(response.data));
          abrirCerrarModalInsertar();
          peticionGet();
        }).catch(error => {
          console.log(error);
        })
    }

    const peticionPut=async()=>{
      console.log(mantenimientoCabSeleccionado)
      await axios.put("/servmantenimientocab?id=" + mantenimientoCabSeleccionado.id, mantenimientoCabSeleccionado)
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
  
    const peticionDelete=async()=>{
      console.log("id=" + MantenimientoCabEliminar[0].id)
      await axios.delete("/servmantenimientocab/"+ MantenimientoCabEliminar[0].id)
      .then(response=>{
        peticionGet();
        abrirCerrarModalEliminar();
      }).catch(error=>{
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

              {/* Desplegable de Clientes */}
              <Autocomplete
                disableClearable={true}
                id="CboClientes"
                options={clientes}
                getOptionLabel={option => option.nombreComercial}
                sx={{ width: 300}}
                renderInput={(params) => <TextField {...params} label="Clientes" name="idCliente"/>}
                onChange={(event, value) => setMantenimientoCabSeleccionado(prevState=>({
                  ...prevState,
                  idCliente:value.id
                }))}
                />

                {/* Desplegable de Técnicos */}
              <Autocomplete
                disableClearable={true}
                id="CboTecnicos"
                options={tecnicos}
                getOptionLabel={option => option.nombre + ' ' + option.apellidos}
                sx={{ width: 300}}
                renderInput={(params) => <TextField {...params} label="Técnicos" name="idTecnicoAsignado"/>}
                onChange={(event, value) => setMantenimientoCabSeleccionado(prevState=>({
                  ...prevState,
                  idTecnicoAsignado:value.id
                }))}
                />

                {/* Desplegable de elementos planta */}
              <Autocomplete
                disableClearable={true}
                id="CboElementosPlanta"
                options={elementosplanta}
                getOptionLabel={option => option.nombre}
                sx={{ width: 300}}
                renderInput={(params) => <TextField {...params} label="Elemento planta" name="idElementoPlanta"/>}
                onChange={(event, value) => setMantenimientoCabSeleccionado(prevState=>({
                  ...prevState,
                  idElementoPlanta:value.id
                }))}
                />

                {/* Desplegable de tipos*/}
              <Autocomplete
                disableClearable={true}
                id="CboTipos"
                options={tipos}
                getOptionLabel={option => option.nombre}
                sx={{ width: 300}}
                renderInput={(params) => <TextField {...params} label="Tipo" name="idTipo"/>}
                onChange={(event, value) => setMantenimientoCabSeleccionado(prevState=>({
                  ...prevState,
                  tipo:value.id
                }))}
                />
              <TextField className={styles.inputMaterial} label="Número de oferta" name="numOferta" onChange={handleChange}/>
              <br />
                
            {/* Fecha prevista */}
            <TextField
              id="fechaprevista"
              label="Fecha prevista"
              type="date"
              name="numOferta"
              sx={{ width: 220 }}
              //onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
              <br /><br />
              <div align="right">
                <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
                <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
              </div>
            </div>
          )
      
          //modal editar usuario
      
          const abrirCerrarModalEditar=()=>{
            setModalEditar(!modalEditar);
          }
      
        //   const bodyEditar=(
            // <div className={styles.modal}>
            //   <h3>Editar Usuario</h3>
            //   <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.nombre}/>
            //   <br />
            //   <TextField className={styles.inputMaterial} label="Apellidos" name="apellidos" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.apellidos}/>          
            //   <br />
            //   <TextField className={styles.inputMaterial} label="Teléfono" name="telefono" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.telefono}/>
            //   <br />
            //   <TextField className={styles.inputMaterial} label="Usuario" name="usuario" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.usuario}/>
            //   <br />
            //   <FormControlLabel control={<Checkbox defaultChecked />} className={styles.inputMaterial} label="Activo" name="activo" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.activo}/>
            //   <br />
      
            //   {/* Desplegable de Perfiles */}
            //   <Autocomplete
            //     disableClearable={true}
            //     id="CboPerfiles"
            //     options={perfiles}
            //     getOptionLabel={option => option.nombre}
            //     defaultValue={perfilUsuarioEditar[0]}
            //     sx={{ width: 300}}
            //     onChange={handleChangePerfil}
            //     renderInput={(params) => <TextField {...params} label="Perfil"   name="idPerfil"/>}
            //   />
      
            //   {/* Desplegable de Clientes */}
            //   <Autocomplete
            //     disableClearable={true}
            //     disabled={estadoCboCliente}
            //     id="CboClientes"
            //     options={clientes}
            //     getOptionLabel={option => option.nombreComercial}
            //     defaultValue={clienteUsuarioEditar[0]}
            //     sx={{ width: 300}}
            //     renderInput={(params) => <TextField {...params} label="Clientes" name="idCliente"/>}
            //     onChange={(event, value) => setUsuarioSeleccionado(prevState=>({
            //       ...prevState,
            //       idCliente:value.id
            //     }))}
            //   />
      
            //   <br /><br />
            //   <div align="right">
            //     <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
            //     <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
            //   </div>
            // </div>
        //   )
          
          //modal eliminar usuario
          const abrirCerrarModalEliminar=()=>{
            setModalEliminar(!modalEliminar);
          }
      
        //   const bodyEliminar=(
            // <div className={styles.modal}>
            //   <p>Estás seguro que deseas eliminar el usuario ? </p>
            //   <div align="right">
            //     <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
            //     <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
        
            //   </div>
            // </div>
        //   )

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
                    icon: () => <AddCircle style={{ fill: "green"}}/>,
                  tooltip: "Añadir Mantenimiento",
                  isFreeAction: true,
                  onClick: (e,data) => {
                    abrirCerrarModalInsertar()
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
                    // setperfilUsuarioEditar(perfiles.filter(perfil=>perfil.id===FilasSeleccionadas[0].idPerfil));
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
              setMantenimientoCabSeleccionado(filas[0]);}
            }
            options={{sorting:true,paging:true,pageSizeOptions:[5,10,20,50,100,200],pageSize:10,filtering:true,search: false,selection:true,
                columnsButton:true,
                rowStyle: rowData => ({
                    backgroundColor: (mantenimientoCabSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                    whiteSpace: "nowrap"
                  }),

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

        {/*<Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}>
          {bodyEditar}
        </Modal>

        <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}

        </Modal> */}
        </div>

    );

} 

export default Mantenimientos;