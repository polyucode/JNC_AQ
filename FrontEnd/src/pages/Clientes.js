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

function Clientes() {

    //variables
    const [modalInsertar, setModalInsertar]= useState(false);

    const [modalEditar, setModalEditar]= useState(false);
    
    const [modalEliminar, setModalEliminar]= useState(false);

    const [clienteSeleccionado, setClienteSeleccionado] = useState({
      id: 0,
      codigo: '',
      cif: '',
      razonSocial: '',
      nombreComercial: '',
      telefono1: '',
      telefono2: '',
      idSector: 0,
      movil: '',
      email: '',
      direccion: '',
      poblacion: 0,
      provincia: 0,
      cp: '',
      pais: '',
      comarca: 0,
      addDate: null,
      addIdUser: null,
      modDate: null,
      modIdUser: null,
      delDate: null,
      delIdUser: null,
      deleted: null,


    });

    const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);

    const [perfilClienteEditar, setperfilClienteEditar] = useState([]);

    const [clienteClienteEditar, setclienteClienteEditar] = useState([]);

    const [ClienteEliminar, setClienteEliminar] = useState([]);

    const [data, setData] = useState([]);

    const [perfiles, setPerfiles] = useState([]);

    const [poblacion, setPoblacion] = useState([]);

    const [provincia, setProvincia] = useState([]);

    const [comarca, setComarca] = useState([]);

    const [clientesTable, setClientesTable] = useState({});

    const styles= useStyles();

    const [estadoCboCliente, setestadoCboCliente] = useState(true);
    


    const columnas=[

        //Visibles
        { title: 'Codigo', field: 'codigo', filterPlaceholder:"Filtrar por codigo" },
        { title: 'Cif', field: 'cif', filterPlaceholder:"Filtrar por cif" },
        { title: 'RazonSocial', field: 'razonSocial', filterPlaceholder:"Filtrar por Razón Social" },
        { title: 'NombreComercial', field: 'nombreComercial', filterPlaceholder:"Filtrar por nombre comercial" },

        { title: 'Telefono1', field: 'telefono1', filterPlaceholder:"Filtrar por teléfono" },

        { title: 'Movil', field: 'movil', filterPlaceholder:"Filtrar por movil" },
        { title: 'Email', field: 'email', filterPlaceholder:"Filtrar por email" },

        //Ocultas
        { title: 'Id', field: 'id', filterPlaceholder:"Filtrar por id", hidden: true },


        { title: 'Telefono2', field: 'telefono2', filterPlaceholder:"Filtrar por teléfono", hidden: true },
        { title: 'IdSector', field: 'idSector', filterPlaceholder:"Filtrar por id sector", hidden: true },

        { title: 'Direccion', field: 'direccion', filterPlaceholder:"Filtrar por dirección", hidden: true },
        { title: 'Poblacion', field: 'poblacion', filterPlaceholder:"Filtrar por población", hidden: true },
        { title: 'Provincia', field: 'provincia', filterPlaceholder:"Filtrar por provincia", hidden: true },
        { title: 'Cp', field: 'cp', filterPlaceholder:"Filtrar por código postal", hidden: true },
        { title: 'Pais', field: 'pais', filterPlaceholder:"Filtrar por país", hidden: true },
        { title: 'Comarca', field: 'comarca', filterPlaceholder:"Filtrar por comarca", hidden: true },
        { title: 'CuentaContable', field: 'cuentaContable', filterPlaceholder:"Filtrar por cuenta contable", hidden: true },
  ];

    //peticiones API
    const GetPoblacion = async () => {
      axios.get("/poblacion", token).then(response => {
        const poblacion = Object.entries(response.data.data).map(([key,value]) => (key, value))
        setPoblacion(poblacion);
      },[])
    }

    const GetProvincia = async () => {
        axios.get("/provincia", token).then(response => {
          const provincia = Object.entries(response.data.data).map(([key,value]) => (key, value))
          setProvincia(provincia);
        },[])
      }

    const GetComarca = async () => {
        axios.get("/comarca", token).then(response => {
          const comarca = Object.entries(response.data.data).map(([key,value]) => (key, value))
          setComarca(comarca);
        },[])
      }

    const GetPerfiles = async () => {
      axios.get("/perfil", token).then(response => {
        const perfil = Object.entries(response.data.data).map(([key,value]) => (key, value))
        setPerfiles(perfil);
      },[])
    }

    const peticionGet = async () => {
      axios.get("/cliente", token).then(response => {
        setData(response.data.data)
      })
    }

    useEffect(() => {
      peticionGet();
      GetPerfiles();
      GetPoblacion();
      GetProvincia();
      GetComarca();
    }, [])

    const peticionPost = async () => {
      clienteSeleccionado.id = null;
      console.log(clienteSeleccionado)
      await axios.post("/cliente", clienteSeleccionado)
        .then(response => {
          //setData(data.concat(response.data));
          abrirCerrarModalInsertar();
          peticionGet();
        }).catch(error => {
          console.log(error);
        })
    }

    const peticionPut=async()=>{
      console.log(clienteSeleccionado)
      await axios.put("/cliente?id=" + clienteSeleccionado.id, clienteSeleccionado)
      .then(response=>{
        var clienteModificado = data;
        clienteModificado.map(cliente=>{
          if(cliente.id===clienteSeleccionado.id){
            cliente = clienteSeleccionado
          }
        });
        peticionGet();
        abrirCerrarModalEditar();
      }).catch(error=>{
        console.log(error);
      })
    }
  
    const peticionDelete=async()=>{
      console.log("id=" + ClienteEliminar[0].id)
      await axios.delete("/cliente/"+ ClienteEliminar[0].id)
      .then(response=>{
        peticionGet();
        abrirCerrarModalEliminar();
      }).catch(error=>{
        console.log(error);
      })
    }

    //modal insertar cliente
    const abrirCerrarModalInsertar=()=>{
      setModalInsertar(!modalInsertar);
    }

    const handleChange=e=>{
      const {name, value}=e.target;
      setClienteSeleccionado(prevState=>({
        ...prevState,
        [name]: value
      }));
    }

    const bodyInsertar=(
      <div className={styles.modal}>
        <h3>Agregar Nuevo Cliente</h3>
        <TextField className={styles.inputMaterial} label="Codigo" name="codigo" onChange={handleChange}/>
        <br />
        <TextField className={styles.inputMaterial} label="Cif" name="cif" onChange={handleChange}/>
        <br />
        <TextField className={styles.inputMaterial} label="RazonSocial" name="razonSocial" onChange={handleChange}/>
        <br />
        <TextField className={styles.inputMaterial} label="Teléfono1" name="telefono1" onChange={handleChange}/>
        <br />
        <TextField className={styles.inputMaterial} label="Teléfono2" name="telefono2" onChange={handleChange}/>
        <br />
        <TextField className={styles.inputMaterial} label="Móvil" name="movil" onChange={handleChange}/>
        <br />
        <TextField className={styles.inputMaterial} label="Email" name="email" onChange={handleChange}/>
        <br />
        <TextField className={styles.inputMaterial} label="Dirección" name="direccion" onChange={handleChange}/>
        <br />

        {/* Desplegable de Población */}
        <Autocomplete
          disableClearable={true}
          id="CboPoblacion"
          options={poblacion}
          getOptionLabel={option => option.poblacion}
          sx={{ width: 300}}
          renderInput={(params) => <TextField {...params} label="Población" name="poblacion" />}
          onChange={(event, value) => setClienteSeleccionado(prevState=>({
            ...prevState,
            poblacion:value.id
          }))}
            />

        {/* Desplegable de Provincia */}
        <Autocomplete
          disableClearable={true}
          id="CboProvincia"
          options={provincia}
          getOptionLabel={option => option.descripcion}
          sx={{ width: 300}}
          renderInput={(params) => <TextField {...params} label="Provincia" name="provincia" />}
          onChange={(event, value) => setClienteSeleccionado(prevState=>({
            ...prevState,
            provincia:value.id
          }))}
            />

        <TextField className={styles.inputMaterial} label="Código postal" name="cp" onChange={handleChange}/>
        <br />

        <TextField className={styles.inputMaterial} label="País" name="pais" onChange={handleChange}/>
        <br />

        {/* Desplegable de Comarca */}
        <Autocomplete
          disableClearable={true}
          id="CboCamarca"
          options={comarca}
          getOptionLabel={option => option.descripcion}
          sx={{ width: 300}}
          renderInput={(params) => <TextField {...params} label="Comarca" name="comarca" />}
          onChange={(event, value) => setClienteSeleccionado(prevState=>({
            ...prevState,
            comarca:value.id
          }))}
            />

        <br /><br />
        <div align="right">
          <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
          <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
      </div>
    )

    //modal editar cliente

    const abrirCerrarModalEditar=()=>{
      setModalEditar(!modalEditar);
    }

    const bodyEditar=(
      <div className={styles.modal}>
        <h3>Editar Cliente</h3>
        <TextField className={styles.inputMaterial} label="Codigo" name="codigo" onChange={handleChange} value={clienteSeleccionado&&clienteSeleccionado.codigo}/>
        <br />
        <TextField className={styles.inputMaterial} label="Cif" name="cif" onChange={handleChange} value={clienteSeleccionado&&clienteSeleccionado.cif}/>
        <br />
        <TextField className={styles.inputMaterial} label="RazonSocial" name="razonSocial" onChange={handleChange} value={clienteSeleccionado&&clienteSeleccionado.razonSocial}/>
        <br />
        <TextField className={styles.inputMaterial} label="Teléfono1" name="telefono1" onChange={handleChange} value={clienteSeleccionado&&clienteSeleccionado.telefono1}/>
        <br />
        <TextField className={styles.inputMaterial} label="Teléfono2" name="telefono2" onChange={handleChange} value={clienteSeleccionado&&clienteSeleccionado.telefono2}/>
        <br />
        <TextField className={styles.inputMaterial} label="Móvil" name="movil" onChange={handleChange} value={clienteSeleccionado&&clienteSeleccionado.movil}/>
        <br />
        <TextField className={styles.inputMaterial} label="Email" name="email" onChange={handleChange} value={clienteSeleccionado&&clienteSeleccionado.email}/>
        <br />
        <TextField className={styles.inputMaterial} label="Dirección" name="direccion" onChange={handleChange} value={clienteSeleccionado&&clienteSeleccionado.direccion}/>
        <br />

        {/* Desplegable de Población */}
        <Autocomplete
          disableClearable={true}
          id="CboPoblacion"
          options={poblacion}
          getOptionLabel={option => option.poblacion}
          sx={{ width: 300}}
          renderInput={(params) => <TextField {...params} label="Población" name="poblacion" />}
          onChange={(event, value) => setClienteSeleccionado(prevState=>({
            ...prevState,
            poblacion:value.id
          }))}
            />

        {/* Desplegable de Provincia */}
        <Autocomplete
          disableClearable={true}
          id="CboProvincia"
          options={provincia}
          getOptionLabel={option => option.descripcion}
          sx={{ width: 300}}
          renderInput={(params) => <TextField {...params} label="Provincia" name="provincia" />}
          onChange={(event, value) => setClienteSeleccionado(prevState=>({
            ...prevState,
            provincia:value.id
          }))}
            />

        <TextField className={styles.inputMaterial} label="Código postal" name="cp" onChange={handleChange} value={clienteSeleccionado&&clienteSeleccionado.cp}/>
        <br />

        <TextField className={styles.inputMaterial} label="País" name="pais" onChange={handleChange} value={clienteSeleccionado&&clienteSeleccionado.pais}/>
        <br />

        {/* Desplegable de Comarca */}
        <Autocomplete
          disableClearable={true}
          id="CboCamarca"
          options={comarca}
          getOptionLabel={option => option.descripcion}
          sx={{ width: 300}}
          renderInput={(params) => <TextField {...params} label="Comarca" name="comarca" />}
          onChange={(event, value) => setClienteSeleccionado(prevState=>({
            ...prevState,
            comarca:value.id
          }))}
            />

        <br /><br />
        <div align="right">
          <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
          <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>
      </div>
    )
    
    //modal eliminar cliente
    const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
    }

    const bodyEliminar=(
      <div className={styles.modal}>
        <p>Estás seguro que deseas eliminar el cliente ? </p>
        <div align="right">
          <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
          <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
  
        </div>
  
      </div>
    )


    return (
        <div>
        <h1>Clientes</h1>
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
                  tooltip: "Añadir Cliente",
                  isFreeAction: true,
                  onClick: (e,data) => {
                    abrirCerrarModalInsertar()
                },
                },
                {
                    icon: () => <RemoveCircle style={{ fill: "red"}}/>,
                  tooltip: "Eliminar Cliente",
                  onClick: (event,rowData) => {
                    setClienteEliminar(FilasSeleccionadas);
                    abrirCerrarModalEliminar()
                  },
                },
                {
                    icon: () => <Edit/>,
                  tooltip: "Editar Cliente",
                  onClick: (e,data) => {
                    setperfilClienteEditar(perfiles.filter(perfil=>perfil.id===FilasSeleccionadas[0].idPerfil));
                    abrirCerrarModalEditar();
                  },
                },
              ]}

            onRowClick={((evt, clienteSeleccionado) => setClienteSeleccionado(clienteSeleccionado.tableData.id))}  
            onSelectionChange={(filas)=>{
              setFilasSeleccionadas(filas);
              
              setClienteSeleccionado(filas[0]);}
            }
            options={{sorting:true,paging:true,pageSizeOptions:[5,10,20,50,100,200],pageSize:5,filtering:true,search: false,selection:true,
                columnsButton:true,
                rowStyle: rowData => ({
                    backgroundColor: (clienteSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
                    whiteSpace: "nowrap"
                  }),

                exportMenu: [{
                    label: 'Export PDF',
                    exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Clientes')
                  }, {
                    label: 'Export CSV',
                    exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Clientes')
                  }]
            }}
           
            title="Listado de clientes"
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

export default Clientes;