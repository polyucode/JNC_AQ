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

    const [clienteUsuarioEditar, setclienteUsuarioEditar] = useState([]);

    const [UsuarioEliminar, setUsuarioEliminar] = useState([]);

    const [data, setData] = useState([]);

    const [perfiles, setPerfiles] = useState([]);

    const [clientes, setClientes] = useState([]);

    const [clientesTable, setClientesTable] = useState({});

    const styles= useStyles();

    const [estadoCboCliente, setestadoCboCliente] = useState(true);
    


    const columnas=[
      //visibles
      { title: 'Nombre', field: 'nombre', filterPlaceholder:"Filtrar por nombre" },
      { title: 'Apellidos', field: 'apellidos', filterPlaceholder:"Filtrar por apellidos"},
      { title: 'Telefono', field: 'telefono', filterPlaceholder:"Filtrar por Telefono" },
      { title: 'Usuario', field: 'usuario', filterPlaceholder:"Filtrar por usuario" },
      { title: 'Activo', field: 'activo', type: 'boolean' , filterPlaceholder:"Filtrar por activo"},
      { title: 'Firma', field: 'firma', filtering:false },
      { title: 'Perfil', field: 'idPerfil', type: 'numeric', lookup:{1:"Administrador",2:"Cliente",3:"Informador",4:"Inspector",1004:"T??cnico"},filterPlaceholder:"Filtrar por perfil" },
      { title: 'Cliente', field: 'idCliente', type: 'numeric',lookup:clientesTable,filterPlaceholder:"Filtrar por cliente" },
      
      //Ocultas
      { title: 'Fecha creaci??n', field: 'addDate', type: 'date', filterPlaceholder:"Filtrar por fecah creacion", hidden: true  },
      { title: 'Usuario creaci??n', field: 'AddIdUser', type: 'numeric', filterPlaceholder:"Filtrar por Usuario creaci??n", hidden: true },
      { title: 'Fecha eliminaci??n', field: 'delDate', type: 'date', filterPlaceholder:"Filtrar por Fecha eliminaci??n", hidden: true },
      { title: 'Usuario eliminaci??n', field: 'delIdUser', type: 'numeric', filterPlaceholder:"Filtrar por Usuario eliminaci??n", hidden: true },
  
      { title: 'Eliminado', field: 'deleted', type: 'boolean', filterPlaceholder:"Filtrar por Eliminado", hidden: true },
      { title: 'Id', field: 'id', type: 'numeric', filterPlaceholder:"Filtrar por Id", hidden: true , },
      { title: 'Login', field: 'login', filterPlaceholder:"Filtrar por Login", hidden: true },
  
      { title: 'Fecha modificaci??n', field: 'modDate', type: 'date', filterPlaceholder:"Filtrar por Fecha modificaci??n", hidden: true },
      { title: 'Usuario modificacion', field: 'modIdUser', type: 'numeric', filterPlaceholder:"Filtrar por Usuario modificacion", hidden: true },
          
  ];

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

    // Recoger Usuarios
    const peticionGet = async () => {
      axios.get("/usuario", token).then(response => {
        for(let i = 0; i < response.data.data.length; i++) {
          if(response.data.data[i].firma) {
            let firmaB64 = response.data.data[i].firma;
            response.data.data[i].firma = <img height="58px" src={firmaB64} />;
          }
        }
        setData(response.data.data)
      })
    }

    // Sirve como el componentDidMount, inicia los metodos cuando entra en la p??gina
    useEffect(() => {
      peticionGet();
      GetPerfiles();
      GetClientes();
    }, [])

    useEffect(() => {

      const lookupClientes = {};
      clientes.map(fila=>lookupClientes[fila.id]=fila.nombreComercial);
      setClientesTable(lookupClientes);
    },[clientes])

    //Insertar usuario
    const peticionPost = async () => {
      usuarioSeleccionado.id = null;
      await axios.post("/usuario", usuarioSeleccionado, token)
        .then(response => {
          //setData(data.concat(response.data));
          abrirCerrarModalInsertar();
          peticionGet();
        }).catch(error => {
          console.log(error);
        })
    }

    // Editar el usuario
    const peticionPut=async()=>{
      console.log(usuarioSeleccionado)
      await axios.put("/usuario?id=" + usuarioSeleccionado.id, usuarioSeleccionado, token)
      .then(response=>{
        var usuarioModificado = data;
        usuarioModificado.map(usuario=>{
          if(usuario.id===usuarioSeleccionado.id){
            usuario = usuarioSeleccionado
          }
        });
        peticionGet();
        abrirCerrarModalEditar();
      }).catch(error=>{
        console.log(error);
      })
    }
  
    // Borrar el usuario
    const peticionDelete=async()=>{
      console.log(UsuarioEliminar.length)
      console.log("id=" + UsuarioEliminar[0].id)
      var i = 0;
      while(i < UsuarioEliminar.length){
        await axios.delete("/usuario/"+ UsuarioEliminar[i].id, token)
        .then(response=>{
          peticionGet();
          abrirCerrarModalEliminar();
        }).catch(error=>{
          console.log(error);
        })
        i++;
      }
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
    }else{
      setestadoCboCliente(true)
    }
    }

    const bodyInsertar=(
      <div className={styles.modal}>
        <h3>Agregar Nuevo Usuario</h3>
        <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange}/>
        <br />
        <TextField className={styles.inputMaterial} label="Apellidos" name="apellidos" onChange={handleChange}/>          
        <br />
        <TextField className={styles.inputMaterial} label="Tel??fono" type="number" name="telefono" onChange={handleChange}/>
        <br />
        <TextField className={styles.inputMaterial} label="Usuario" name="usuario" onChange={handleChange}/>
        <br />
        <TextField className={styles.inputMaterial} label="Password" type="password" name="password" onChange={handleChange}/>
        <br />
        <TextField className={styles.inputMaterial} label="Repetir Contrase??a" type="password" name="repetir_contrase??a" onChange={handleChange}/>
        <br />
        <FormControlLabel control={<Checkbox defaultChecked />} className={styles.inputMaterial} label="Activo" name="activo" onChange={handleChange} />
        <br />

        {/* Desplegable de Perfiles */}
        <Autocomplete
          disableClearable={true}
          id="CboPerfiles"
          options={perfiles}
          getOptionLabel={option => option.nombre}
          sx={{ width: 300}}
          renderInput={(params) => <TextField {...params} label="Perfil" name="idPerfil" />}
          onChange={handleChangePerfil}
        />

        {/* Desplegable de Clientes */}
        <Autocomplete
          disableClearable={true}
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

    // Cuadro de editar usuario
    const bodyEditar=(
      <div className={styles.modal}>
        <h3>Editar Usuario</h3>
        <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.nombre}/>
        <br />
        <TextField className={styles.inputMaterial} label="Apellidos" name="apellidos" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.apellidos}/>          
        <br />
        <TextField className={styles.inputMaterial} label="Tel??fono" name="telefono" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.telefono}/>
        <br />
        <TextField className={styles.inputMaterial} label="Usuario" name="usuario" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.usuario}/>
        <br />
        <FormControlLabel control={<Checkbox defaultChecked />} className={styles.inputMaterial} label="Activo" name="activo" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.activo}/>
        <br />

        {/* Desplegable de Perfiles */}
        <Autocomplete
          disableClearable={true}
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
          disableClearable={true}
          disabled={estadoCboCliente}
          id="CboClientes"
          options={clientes}
          getOptionLabel={option => option.nombreComercial}
          defaultValue={clienteUsuarioEditar[0]}
          sx={{ width: 300}}
          renderInput={(params) => <TextField {...params} label="Clientes" name="idCliente"/>}
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
        <p>Est??s seguro que deseas eliminar el usuario ? </p>
        <div align="right">
          <Button color="secondary" onClick={()=>peticionDelete()}>S??</Button>
          <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
  
        </div>
      </div>
    )


    return (
        <div>
        <MaterialTable columns={columnas} data={data}
            localization={{
                body: {
                  emptyDataSourceMessage: 'No hay datos por mostrar',
                  addTooltip: 'A??adir',
                  deleteTooltip: 'Eliminar',
                  editTooltip: 'Editar',
                  filterRow: {
                    filterTooltip: 'Filtrar',
                  },
                  editRow: {
                    deleteText: '??Segura(o) que quiere eliminar?',
                    cancelTooltip: 'Cancelar',
                    saveTooltip: 'Guardar',
                  },
                },
                grouping: {
                  placeholder: "Arrastre un encabezado aqu?? para agrupar",
                  groupedBy: 'Agrupado por',
                },
                header: {
                  actions: 'Acciones',
                },
                pagination: {
                  firstAriaLabel: 'Primera p??gina',
                  firstTooltip: 'Primera p??gina',
                  labelDisplayedRows: '{from}-{to} de {count}',
                  labelRowsPerPage: 'Filas por p??gina:',
                  labelRowsSelect: 'filas',
                  lastAriaLabel: 'Ultima p??gina',
                  lastTooltip: 'Ultima p??gina',
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
                  tooltip: "A??adir Usuario",
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
                    setperfilUsuarioEditar(perfiles.filter(perfil=>perfil.id===FilasSeleccionadas[0].idPerfil));
                    if(FilasSeleccionadas[0].idPerfil === 2){
                      setclienteUsuarioEditar(clientes.filter(cliente=>cliente.id===FilasSeleccionadas[0].idCliente));
                      setestadoCboCliente(false);
                    }else{
                      setclienteUsuarioEditar(false);
                      setestadoCboCliente(true);
                    }
                    abrirCerrarModalEditar();
                  },
                },
              ]}

            onRowClick={((evt, usuarioSeleccionado) => setUsuarioSeleccionado(usuarioSeleccionado.tableData.id))}  
            onSelectionChange={(filas)=>{
              setFilasSeleccionadas(filas);
              setUsuarioSeleccionado(filas[0]);}
            }
            options={{sorting:true,paging:true,pageSizeOptions:[5,10,20,50,100,200],pageSize:10,filtering:true,search: false,selection:true,
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