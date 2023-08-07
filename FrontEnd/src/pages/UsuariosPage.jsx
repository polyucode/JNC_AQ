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
import { ModalLayout2 } from "../components/ModalLayout2";
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
import { deleteUsuarios, getClientes, getFicheros, getPerfiles, getUsuarios, postUsuarios, putUsuarios, subirFirma } from "../api";
import { useUsuarioActual } from "../hooks/useUsuarioActual";

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
  const [perfilUsuarioEditar, setPerfilUsuarioEditar] = useState([]);
  const [clienteUsuarioEditar, setClienteUsuarioEditar] = useState([]);
  const [UsuarioEliminar, setUsuarioEliminar] = useState([]);
  const [data, setData] = useState([]);
  const [fileChange, setFileChange] = useState(null);

  const [mostrarBoton, setMostrarBoton] = useState(true);

  const [rowsIds, setRowsIds] = useState([]);
  const [rows, setRows] = useState([]);

  const [snackData, setSnackData] = useState({ open: false, msg: 'Testing', severity: 'success' });

  const [perfiles, setPerfiles] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [ficheros, setFicheros] = useState([]);
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

  const [error, setError] = useState(false);

  const { usuarioActual } = useUsuarioActual();

  const columns = [
    //visibles
    { headerName: 'Nombre', field: 'nombre', width: 200 },
    { headerName: 'Apellidos', field: 'apellidos', width: 250 },
    { headerName: 'Telefono', field: 'telefono', width: 200 },
    { headerName: 'Usuario', field: 'usuario', width: 200 },
    { headerName: 'Activo', field: 'activo', type: 'boolean', width: 180 },
    {
      headerName: 'Firma',
      field: 'firma',
      width: 200,
      valueFormatter: (params) => {
        const fichero = ficheros.find((fich) => fich.id === params.value)
        return fichero ? fichero.name : "";
      }
    },
    {
      headerName: 'Perfil',
      field: 'idPerfil',
      type: 'numeric',
      valueFormatter: (params) => {
        const perfil = perfiles.find((perf) => perf.id === params.value);
        return perfil ? perfil.nombre : '';
      },
      width: 200
    },
    {
      headerName: 'Cliente',
      field: 'idCliente',
      type: 'numeric',
      width: 200,
      valueFormatter: (params) => {
        const cliente = clientes.find((clien) => clien.codigo === params.value);
        return cliente ? cliente.razonSocial : '';
      },
    },

  ];

  //peticiones API
  const GetCliente = async () => {

    const resp = await getClientes();

    const clientes = Object.entries(resp).map(([key, value]) => (key, value))
    setClientes(clientes);

  }

  const GetPerfil = async () => {

    const resp = await getPerfiles();

    const perfil = Object.entries(resp).map(([key, value]) => (key, value))
    setPerfiles(perfil);

  }

  // Recoger Usuarios
  const peticionGet = async () => {

    const resp = await getUsuarios();
    setUsuarios(resp);

  }

  const GetFichero = async () => {

    const resp = await getFicheros();

    const fichero = Object.entries(resp).map(([key, value]) => (key, value));
    setFicheros(fichero);
  }

  // Sirve como el componentDidMount, inicia los metodos cuando entra en la página
  useEffect(() => {
    peticionGet();
    GetCliente();
    GetPerfil();
    GetFichero();
  }, [])

  useEffect(() => {

    if (usuarios.length > 0) {
      setRows(usuarios);
    }

  }, [usuarios]);

  //Insertar usuario
  const peticionPost = async () => {

      usuarioSeleccionado.id = null;

      const resp = await postUsuarios(usuarioSeleccionado);

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
  }

  // Editar el usuario
  const peticionPut = async () => {

      if (fileChange != null) {
        const resp = await subirFirma(usuarioSeleccionado.id, fileChange)
        if (resp) {
          usuarioSeleccionado.firma = resp.data
        }
      }
      await putUsuarios(usuarioSeleccionado);

      var usuarioModificado = usuarios;
      usuarioModificado.map(usuario => {
        if (usuario.id === usuarioSeleccionado.id) {
          usuario = usuarioSeleccionado
        }
      });

      abrirCerrarModalEditar();
      peticionGet();
      GetFichero();
      setUsuarioSeleccionado({
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

  }

  // Borrar el usuario
  const peticionDelete = async () => {

    var i = 0;
    while (i < UsuarioEliminar.length) {

      const resp = await deleteUsuarios(UsuarioEliminar[i]);

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
      setUsuarioSeleccionado(usuarios.filter(usuario => usuario.id === ids[0])[0]);
    } else {
      setUsuarioSeleccionado(usuarioSeleccionado);
    }
    setRowsIds(ids);
  }

  const handleChangeCheckbox = e => {
    const { name, value, checked } = e.target
    setUsuarioSeleccionado(prevState => ({
      ...prevState,
      [name]: checked
    }))
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
                    height: 1000,
                    backgroundColor: '#FFFFFF'
                  }}
                  rows={rows}
                  columns={columns}
                  checkboxSelection
                  disableSelectionOnClick
                  onSelectionModelChange={(ids) => handleSelectRow(ids)}
                  onRowClick={(usuarioSeleccionado, evt) => {
                    setUsuarioSeleccionado(usuarioSeleccionado.row)
                    setPerfilUsuarioEditar(perfiles.filter(perfil => perfil.id === usuarioSeleccionado.row.idPerfil));
                    setClienteUsuarioEditar(clientes.filter(cliente => cliente.codigo === usuarioSeleccionado.row.idCliente));

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
                  handleChangeCheckbox={handleChangeCheckbox}
                  //error={error}
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
                  estadoCliente={estadoCboCliente}
                  handlePdf={handleFile}
                  fileChange={fileChange}
                  setUsuarioSeleccionado={setUsuarioSeleccionado}
                  handleChangeCheckbox={handleChangeCheckbox}
                  perfilUsuario={perfilUsuarioEditar}
                  clienteUsuario={clienteUsuarioEditar}
                  //error={error}
                />}
              botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                abrirCerrarModalEditar()
                if (peticionPut()) {
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
        </MainLayout> :
        <MainLayout title='Usuarios'>
          <div>
            <Grid container spacing={2}>

              {/* Título y botones de opción */}
              <Grid item xs={12}>
                <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='h6'>Listado de usuario</Typography>
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
                    height: 1000,
                    backgroundColor: '#FFFFFF'
                  }}
                  rows={rows}
                  columns={columns}
                  disableSelectionOnClick
                  onSelectionModelChange={(ids) => handleSelectRow(ids)}
                  onRowClick={(usuarioSeleccionado, evt) => {
                    setUsuarioSeleccionado(usuarioSeleccionado.row)
                    setPerfilUsuarioEditar(perfiles.filter(perfil => perfil.id === usuarioSeleccionado.row.idPerfil));
                    setClienteUsuarioEditar(clientes.filter(cliente => cliente.codigo === usuarioSeleccionado.row.idCliente));

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
                  handleChangeCheckbox={handleChangeCheckbox}
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

            <ModalLayout2
              titulo="Editar usuario"
              contenido={
                <EditarUsuarioModal
                  usuarioSeleccionado={usuarioSeleccionado}
                  change={handleChange}
                  handleChangePerfil={handleChangePerfil}
                  handleChangeCheckbox={handleChangeCheckbox}
                  estadoCliente={estadoCboCliente}
                  handlePdf={handleFile}
                  fileChange={fileChange}
                  setUsuarioSeleccionado={setUsuarioSeleccionado}
                  perfilUsuario={perfilUsuarioEditar}
                  clienteUsuario={clienteUsuarioEditar}
                />}
              botones={[insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                abrirCerrarModalEditar()
                if (peticionPut()) {
                  setSnackData({ open: true, msg: 'Usuario editado correctamente', severity: 'success' });
                } else {
                  setSnackData({ open: true, msg: 'Ha habido un error al editar el usuario', severity: 'error' })
                }
              })
              ]}
              open={modalEditar}
              onClose={abrirCerrarModalEditar}
            />
          </div>
        </MainLayout>
      }
    </>
  );

}