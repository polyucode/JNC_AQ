import React, { useState, useEffect } from "react";
import MaterialTable from '@material-table/core';
import { Grid, Card, Typography, Button } from '@mui/material';
import axios from "axios";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Edit from '@material-ui/icons/Edit';
import { TextField } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { MainLayout } from "../layout/MainLayout";
import { Modal } from '@mui/material';
import { ModalLayout, ModalPopup } from "../components/ModalLayout";
import { InsertarUsuarioModal, InsertarUsuarioModalBotones } from '../components/Modals/InsertarUsuarioModal';
import { insertarBotonesModal } from "../helpers/insertarBotonesModal";
import { EditarUsuarioModal } from '../components/Modals/EditarUsuarioModal';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel'

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';
import { subirFirma } from "../api/apiBackend";

const token = {
  headers: {
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
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  }
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const UsuariosPage = () => {

  //variables
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);
  const [perfilUsuarioEditar, setperfilUsuarioEditar] = useState([]);
  const [clienteUsuarioEditar, setclienteUsuarioEditar] = useState([]);
  const [UsuarioEliminar, setUsuarioEliminar] = useState([]);
  const [data, setData] = useState([]);
  const [fileChange, setFileChange] = useState(null);

  const [rowsIds, setRowsIds] = useState([]);
  const [rows, setRows] = useState([]);

  const [snackData, setSnackData] = useState({ open: false, msg: 'Testing', severity: 'success' });

  const [perfiles, setPerfiles] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [clientesTable, setClientesTable] = useState({});
  const styles = useStyles();
  const [estadoCboCliente, setestadoCboCliente] = useState(true);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
    id: 0,
    nombre: '',
    apellidos: '',
    login: null,
    telefono: '',
    usuario: '',
    password: '',
    activo: false,
    firma: 0,
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

  const columns = [
    //visibles
    { headerName: 'Nombre', field: 'nombre', width: 200 },
    { headerName: 'Apellidos', field: 'apellidos', width: 250 },
    { headerName: 'Telefono', field: 'telefono', width: 200 },
    { headerName: 'Usuario', field: 'usuario', width: 200 },
    { headerName: 'Activo', field: 'activo', type: 'boolean', width: 180 },
    { headerName: 'Firma', field: 'firma', width: 200 },
    { headerName: 'Perfil', field: 'idPerfil', type: 'numeric', lookup: { 1: "Administrador", 2: "Cliente", 3: "Informador", 4: "Inspector", 1004: "Técnico" }, width: 200 },
    { headerName: 'Cliente', field: 'idCliente', type: 'numeric', lookup: clientesTable, width: 200 },

  ];

  //peticiones API
  const GetClientes = async () => {
    axios.get("/cliente", token).then(response => {
      const clientes = Object.entries(response.data.data).map(([key, value]) => (key, value))
      setClientes(clientes);
    }, [])
  }

  const GetPerfiles = async () => {
    axios.get("/perfil", token).then(response => {
      const perfil = Object.entries(response.data.data).map(([key, value]) => (key, value))
      setPerfiles(perfil);
    }, [])
  }


  // Recoger Usuarios
  const peticionGet = async () => {
    axios.get("/usuario", token).then(response => {
      setData(response.data.data)
    })
  }

  // Sirve como el componentDidMount, inicia los metodos cuando entra en la página
  useEffect(() => {
    peticionGet();
    GetClientes();
    GetPerfiles();
  }, [])

  useEffect(() => {

    if (data.length > 0) {
      setRows(data);
    }

  }, [data]);

  useEffect(() => {

    const lookupClientes = {};
    clientes.map(fila => lookupClientes[fila.id] = fila.nombreComercial);
    setClientesTable(lookupClientes);

  }, [clientes])

  const subirImagen = async () => {
    await subirFirma(usuarioSeleccionado.id, fileChange)
  }
  //Insertar usuario
  const peticionPost = async () => {
    usuarioSeleccionado.id = null;
    await axios.post("/usuario", usuarioSeleccionado, token)
      .then(response => {
        abrirCerrarModalInsertar();
        peticionGet();
        setUsuarioSeleccionado({
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
        })
      }).catch(error => {
        console.log(error);
      })
  }

  // Editar el usuario
  const peticionPut = async () => {
    console.log(usuarioSeleccionado)
    await axios.put("/usuario?id=" + usuarioSeleccionado.id, usuarioSeleccionado, token)
      .then(response => {
        subirImagen()
        var usuarioModificado = data;
        usuarioModificado.map(usuario => {
          if (usuario.id === usuarioSeleccionado.id) {
            usuario = usuarioSeleccionado
          }
        });
        peticionGet();
        abrirCerrarModalEditar();
        setUsuarioSeleccionado({
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
        })
      }).catch(error => {
        console.log(error);
      })
  }

  // Borrar el usuario
  const peticionDelete = async () => {
    var i = 0;
    console.log(UsuarioEliminar[i])
    while (i < UsuarioEliminar.length) {
      await axios.delete("/usuario/" + UsuarioEliminar[i], token)
        .then(response => {
          peticionGet();
          abrirCerrarModalEliminar();
          setUsuarioSeleccionado({
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
          })
        }).catch(error => {
          console.log(error);
        })
      i++;
    }
  }

  //modal insertar usuario
  const abrirCerrarModalInsertar = () => {
    if (modalInsertar) {
      setUsuarioSeleccionado({
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
      })
      setModalInsertar(!modalInsertar);
    } else {
      setModalInsertar(!modalInsertar);
    }
  }

  // Modal editar usuario
  const abrirCerrarModalEditar = () => {
    if (modalEditar) {
      setUsuarioSeleccionado({
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
      })
      setModalEditar(!modalEditar);
    } else {
      setModalEditar(!modalEditar);
    }
  }

  //modal eliminar usuario
  const abrirCerrarModalEliminar = () => {
    if (modalEliminar) {
      setUsuarioSeleccionado({
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
      })
      setModalEliminar(!modalEliminar);
    } else {
      setModalEliminar(!modalEliminar);
    }
  }
  
  const handleFile = e => {
    setFileChange(e.target.files[0])
  }


  const handleChange = (e) => {

    const { name, value } = e.target;
    setUsuarioSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleChangePerfil = (event, value) => {
    setUsuarioSeleccionado(prevState => ({
      ...prevState,
      idPerfil: value.id
    }))
    if (value.id === 2) {
      setestadoCboCliente(false)
    } else {
      setestadoCboCliente(true)
    }

  }

  const handleSelectRow = (ids) => {

    if (ids.length > 0) {
      setUsuarioSeleccionado(data.filter(usuario => usuario.id === ids[0])[0]);
    } else {
      setUsuarioSeleccionado(usuarioSeleccionado);
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
    <MainLayout title='Usuarios'>

      <Snackbar anchorOrigin={{ vertical: 'bot', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
        <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
          {snackData.msg}
        </Alert>
      </Snackbar>

      <div>
        <Grid container spacing={2}>

          {/* Título y botones de opción */}
          <Grid item xs={12}>
            <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='h6'>Listado de usuario</Typography>
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
                          setUsuarioEliminar(rowsIds)
                          abrirCerrarModalEliminar()
                        }} >
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
              onRowClick={(usuarioSeleccionado, evt) => {
                setUsuarioSeleccionado(usuarioSeleccionado.row)
                setperfilUsuarioEditar(perfiles.filter(perfil => perfil.id === usuarioSeleccionado.row.idPerfil));
                setclienteUsuarioEditar(clientes.filter(cliente => cliente.id === usuarioSeleccionado.row.idCliente))
                abrirCerrarModalEditar();
              }}
            />
          </Card>
        </Grid>

        <ModalLayout
          titulo="Agregar nuevo usuario"
          contenido={
            <InsertarUsuarioModal
              change={handleChange}
              handleChangePerfil={handleChangePerfil}
              estadoCliente={estadoCboCliente}
              setUsuarioSeleccionado={setUsuarioSeleccionado}
            />
          }
          botones={[insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
            abrirCerrarModalInsertar();
            if (peticionPost()) {
              setSnackData({ open: true, msg: 'Usuario añadido correctamente', severity: 'success' });
            } else {
              setSnackData({ open: true, msg: 'Ha habido un error al añadir el usuario', severity: 'error' })
            }
          })
          ]}
          open={modalInsertar}
          onClose={abrirCerrarModalInsertar}
        />

        <ModalLayout
          titulo="Editar usuario"
          contenido={
            <EditarUsuarioModal
              usuarioSeleccionado={usuarioSeleccionado}
              change={handleChange}
              handleChangePerfil={handleChangePerfil}
              handleFile={handleFile}
            />}
          botones={[insertarBotonesModal(<AddIcon />, 'Editar', async () => {
            abrirCerrarModalEditar()
            if(peticionPut()){
              setSnackData({ open: true, msg: 'Usuario editado correctamente', severity: 'success' });
            } else {
              setSnackData({ open: true, msg: 'Ha habido un error al editar el usuario', severity: 'error' })
            }
          })
          ]}
          open={modalEditar}
          onClose={abrirCerrarModalEditar}
        />

        <ModalLayout
          titulo="Eliminar Usuario"
          contenido={
            <>
              <Grid item xs={12}>
                <Typography>Estás seguro que deseas eliminar el usuario?</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><b>{usuarioSeleccionado.nombre}</b></Typography>
              </Grid>
            </>
          }
          botones={[
            insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {

              peticionDelete();
              abrirCerrarModalEliminar();

              if (peticionDelete()) {
                setSnackData({ open: true, msg: `Usuario eliminado correctamente: ${usuarioSeleccionado.nombre}`, severity: 'success' });
              } else {
                setSnackData({ open: true, msg: 'Ha habido un error al eliminar el usuario', severity: 'error' })
              }

            }, 'error'),
            insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
          ]}
          open={modalEliminar}
          onClose={abrirCerrarModalEliminar}
        />
      </div>
    </MainLayout>
  );

}