import React , {useState, useEffect} from "react";
import MaterialTable from '@material-table/core';
import axios from "axios";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Edit from '@material-ui/icons/Edit';
import {Modal, TextField, Button} from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {makeStyles} from '@material-ui/core/styles';



const columnas=[
    //visibles
    { title: 'Nombre', field: 'nombre', filterPlaceholder:"Filtrar por nombre" },
    { title: 'Apellidos', field: 'apellidos', filterPlaceholder:"Filtrar por apellidos"},
    { title: 'Telefono', field: 'telefono', filterPlaceholder:"Filtrar por Telefono" },
    { title: 'Usuario', field: 'usuario', filterPlaceholder:"Filtrar por usuario" },
    { title: 'Activo', field: 'activo', type: 'boolean' , filterPlaceholder:"Filtrar por activo"},
    { title: 'Firma', field: 'firma', filtering:false },
    { title: 'Perfil', field: 'idPerfil', type: 'numeric', lookup:{1:"Administrador",2:"Cliente",3:"Informador",4:"Inspector"},filterPlaceholder:"Filtrar por perfil" },
    { title: 'Cliente', field: 'idCliente', type: 'numeric',filterPlaceholder:"Filtrar por cliente" },
    
    //Ocultas
    { title: 'Fecha creación', field: 'addDate', type: 'date', filterPlaceholder:"Filtrar por fecah creacion", hidden: true  },
    { title: 'Usuario creación', field: 'AddIdUser', type: 'numeric', filterPlaceholder:"Filtrar por Usuario creación", hidden: true },
    { title: 'Fecha eliminación', field: 'delDate', type: 'date', filterPlaceholder:"Filtrar por Fecha eliminación", hidden: true },
    { title: 'Usuario eliminación', field: 'delIdUser', type: 'numeric', filterPlaceholder:"Filtrar por Usuario eliminación", hidden: true },

    { title: 'Eliminado', field: 'deleted', type: 'boolean', filterPlaceholder:"Filtrar por Eliminado", hidden: true },
    { title: 'Id', field: 'id', type: 'numeric', filterPlaceholder:"Filtrar por Id", hidden: true , },
    { title: 'Login', field: 'login', filterPlaceholder:"Filtrar por Login", hidden: true },

    { title: 'Fecha modificación', field: 'modDate', type: 'date', filterPlaceholder:"Filtrar por Fecha modificación", hidden: true },
    { title: 'Usuario modificacion', field: 'modIdUser', type: 'numeric', filterPlaceholder:"Filtrar por Usuario modificacion", hidden: true },
        
];



const token = {
    headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

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

function Usuarios() {

    //variables
    const [modalInsertar, setModalInsertar]= useState(false);

    const [modalEditar, setModalEditar]= useState(false);
    
    const [modalEliminar, setModalEliminar]= useState(false);

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
      id: 0,
      nombre: '',
      apellidos: '',
      login: null,
      telefono: '',
      usuario: '',
      password: '',
      activo: false,
      firma: '',
      idCliente: 0,
      idPerfil: 0,
      addDate: null,
      addIdUser: null,
      modDate: null,
      modIdUser: null,
      delDate: null,
      delIdUser: null,
      deleted: null,


    });

    const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);

    const [perfilUsuarioEditar, setperfilUsuarioEditar] = useState([]);

    const [UsuarioEliminar, setUsuarioEliminar] = useState([]);

    const [data, setData] = useState([]);

    const [perfiles, setPerfiles] = useState([]);

    const [clientes, setClientes] = useState([]);

    const styles= useStyles();

    const [estadoCboCliente, setestadoCboCliente] = useState(true);


    //peticiones API
    const GetClientes = async () => {
      axios.get("/cliente", token).then(response => {
        const clientes = Object.entries(response.data.data).map(([key,value]) => (key, value))
        setClientes(clientes);
      },[])
    }

    const GetPerfiles = async () => {
      axios.get("/perfil", token).then(response => {
        const perfil = Object.entries(response.data.data).map(([key,value]) => (key, value))
        setPerfiles(perfil);
      },[])
    }


    const peticionGet = async () => {
      axios.get("/usuario", token).then(response => {
        setData(response.data.data)
      })
    }

    useEffect(() => {
      peticionGet();
      GetPerfiles();
    }, [])

    const peticionPost = async () => {
      await axios.post("/usuario", usuarioSeleccionado)
        .then(response => {
          //setData(data.concat(response.data));
          abrirCerrarModalInsertar();
        }).catch(error => {
          console.log(error);
        })
    }

    const peticionPut=async()=>{
      console.log(usuarioSeleccionado)
      await axios.put("/usuario?id=" + usuarioSeleccionado.id, usuarioSeleccionado)
      .then(response=>{
        var usuarioModificado = data;
        usuarioModificado.map(usuario=>{
          if(usuario.id===usuarioSeleccionado.id){
            usuario = usuarioSeleccionado
          }
        });
        setData(usuarioModificado);
        abrirCerrarModalEditar();
      }).catch(error=>{
        console.log(error);
      })
    }
  
    const peticionDelete=async()=>{
      console.log("id=" + UsuarioEliminar[0].id)
      await axios.delete("/usuario/"+ UsuarioEliminar[0].id)
      .then(response=>{
        peticionGet();
        abrirCerrarModalEliminar();
      }).catch(error=>{
        console.log(error);
      })
    }

    //usuarioSeleccionado
    const seleccionarUsuario=(usuario, caso)=>{
      console.log(FilasSeleccionadas)
      (caso==="Editar")?abrirCerrarModalEditar()
      :
      abrirCerrarModalEliminar()
    }

    //modal insertar usuario
    const abrirCerrarModalInsertar=()=>{
      setModalInsertar(!modalInsertar);
    }

    const handleChange=e=>{
      const {name, value}=e.target;
      setUsuarioSeleccionado(prevState=>({
        ...prevState,
        [name]: value
      }));
    }

    const handleChangePerfil=(event,value) => {
    setUsuarioSeleccionado(prevState=>({
    ...prevState,
    idPerfil:value.id
    }))
    if(value.id === 2){
    setestadoCboCliente(false)
    GetClientes();
    }else{
      setestadoCboCliente(true)
    }
    }

    const eliminarFilas=()=>{
      console.log("filasseleccionadas= " + FilasSeleccionadas)
      FilasSeleccionadas.map(element => {
        console.log("elementid" + element.id)
        setUsuarioSeleccionado(element);
        console.log("usuarioSeleccionado" + usuarioSeleccionado.id)
        peticionDelete();
      });

    }

    const bodyInsertar=(
      <div className={styles.modal}>
        <h3>Agregar Nuevo Usuario</h3>
        <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange}/>
        <br />
        <TextField className={styles.inputMaterial} label="Apellidos" name="apellidos" onChange={handleChange}/>          
        <br />
        <TextField className={styles.inputMaterial} label="Teléfono" name="telefono" onChange={handleChange}/>
        <br />
        <TextField className={styles.inputMaterial} label="Usuario" name="usuario" onChange={handleChange}/>
        <br />
        <TextField className={styles.inputMaterial} label="Password" name="password" onChange={handleChange}/>
        <br />
        <TextField className={styles.inputMaterial} label="Repetir Contraseña" name="repetir_contraseña" onChange={handleChange}/>
        <br />
        <FormControlLabel control={<Checkbox defaultChecked />} className={styles.inputMaterial} label="Activo" name="activo" onChange={handleChange} />
        <br />

        {/* Desplegable de Perfiles */}
        <Autocomplete
          disabledPortal
          id="CboPerfiles"
          options={perfiles}
          getOptionLabel={option => option.nombre}
          sx={{ width: 300}}
          renderInput={(params) => <TextField {...params} label="Perfil" name="idPerfil" />}
          onChange={handleChangePerfil}
            />

        {/* Desplegable de Clientes */}
        <Autocomplete
          disabled={estadoCboCliente}
          id="CboClientes"
          options={clientes}
          getOptionLabel={option => option.nombreComercial}
          sx={{ width: 300}}
          renderInput={(params) => <TextField {...params} label="Clientes" name="idCliente"/>}
          onChange={(event, value) => setUsuarioSeleccionado(prevState=>({
            ...prevState,
            idCliente:value.id
          }))}
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

    const bodyEditar=(
      <div className={styles.modal}>
        <h3>Editar Usuario</h3>
        <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.nombre}/>
        <br />
        <TextField className={styles.inputMaterial} label="Apellidos" name="apellidos" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.apellidos}/>          
        <br />
        <TextField className={styles.inputMaterial} label="Teléfono" name="telefono" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.telefono}/>
        <br />
        <TextField className={styles.inputMaterial} label="Usuario" name="usuario" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.usuario}/>
        <br />
        <FormControlLabel control={<Checkbox defaultChecked />} className={styles.inputMaterial} label="Activo" name="activo" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.activo}/>
        <br />

        {/* Desplegable de Perfiles */}
        <Autocomplete
          disablePortal
          id="CboPerfiles"
          options={perfiles}
          getOptionLabel={option => option.nombre}
          defaultValue={perfilUsuarioEditar[0]}
          sx={{ width: 300}}
          onChange={handleChangePerfil}
          renderInput={(params) => <TextField {...params} label="Perfil"   name="idPerfil"/>}
        />

        {/* Desplegable de Clientes */}
        <Autocomplete
          disabled={estadoCboCliente}
          id="CboClientes"
          options={clientes}
          getOptionLabel={option => option.nombreComercial}
          sx={{ width: 300}}
          renderInput={(params) => <TextField {...params} label="Clientes" value={perfilUsuarioEditar&& perfilUsuarioEditar[0] } name="idCliente"/>}
          onChange={(event, value) => setUsuarioSeleccionado(prevState=>({
            ...prevState,
            idCliente:value.id
          }))}
        />

        <br /><br />
        <div align="right">
          <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
          <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>
      </div>
    )
    
    //modal eliminar usuario
    const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
    }

    const bodyEliminar=(
      <div className={styles.modal}>
        <p>Estás seguro que deseas eliminar el usuario ? </p>
        <div align="right">
          <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
          <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
  
        </div>
  
      </div>
    )


    return (
        <div>
        <h1>Usuarios</h1>
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
                  tooltip: "Añadir Usuario",
                  isFreeAction: true,
                  onClick: (e,data) => {
                    abrirCerrarModalInsertar()
                },
                },
                {
                    icon: () => <RemoveCircle style={{ fill: "red"}}/>,
                  tooltip: "Eliminar Usuario",
                  onClick: (event,rowData) => {
                    setUsuarioEliminar(FilasSeleccionadas);
                    abrirCerrarModalEliminar()
                  },
                },
                {
                    icon: () => <Edit/>,
                  tooltip: "Editar Usuario",
                  onClick: (e,data) => {
                    setperfilUsuarioEditar(perfiles.filter(perfil=>perfil.id===FilasSeleccionadas[0].idCliente));
                    abrirCerrarModalEditar();
                  },
                },
              ]}

            onRowClick={((evt, usuarioSeleccionado) => setUsuarioSeleccionado(usuarioSeleccionado.tableData.id))}  
            onSelectionChange={(filas)=>{
              setFilasSeleccionadas(filas);
              setUsuarioSeleccionado(filas[0]);}
            }
            options={{sorting:true,paging:true,pageSizeOptions:[5,10,20,50,100,200],pageSize:5,filtering:true,search: false,selection:true,
                columnsButton:true,
                rowStyle: rowData => ({
                    backgroundColor: (usuarioSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                    whiteSpace: "nowrap"
                  }),

                exportMenu: [{
                    label: 'Export PDF',
                    exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Usuarios')
                  }, {
                    label: 'Export CSV',
                    exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Usuarios')
                  }]
            }}
           
            title="Listado de usuarios"
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
    );

} 

export default Usuarios;