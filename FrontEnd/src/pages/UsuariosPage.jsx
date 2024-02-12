import React, { useState, useEffect } from "react";
import { Grid, Card, Typography, Button } from '@mui/material';
import { MainLayout } from "../layout/MainLayout";
import { ModalLayout, ModalPopup } from "../components/ModalLayout";
import { ModalLayout2 } from "../components/ModalLayout2";
import { InsertarUsuarioModal } from '../components/Modals/InsertarUsuarioModal';
import { insertarBotonesModal } from "../helpers/insertarBotonesModal";
import { EditarUsuarioModal } from '../components/Modals/EditarUsuarioModal';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';
import { deleteUsuarios, getClientes, getFicheros, getPerfiles, getUsuarios, getUsuariosById, postUsuarios, putUsuarios, subirFirma } from "../api";
import { useUsuarioActual } from "../hooks/useUsuarioActual";

import Swal from 'sweetalert2';

export const UsuariosPage = () => {

  //variables
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [perfilUsuarioEditar, setPerfilUsuarioEditar] = useState([]);
  const [clienteUsuarioEditar, setClienteUsuarioEditar] = useState([]);
  const [UsuarioEliminar, setUsuarioEliminar] = useState([]);
  const [fileChange, setFileChange] = useState(null);

  const [rowsIds, setRowsIds] = useState([]);
  const [rows, setRows] = useState([]);

  const [perfiles, setPerfiles] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [ficheros, setFicheros] = useState([]);
  const [estadoCboCliente, setestadoCboCliente] = useState(true);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
    id: 0,
    nombre: '',
    apellidos: '',
    login: null,
    telefono: '',
    usuario: '',
    password: '',
    repetir_contraseña: '',
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

  const [errorPerfil, setErrorPerfil] = useState(false);
  const [errorContraseña, setErrorContraseña] = useState(false);
  const [errorRepetirContraseña, setErrorRepetirContraseña] = useState(false);
  const [errorNombre, setErrorNombre] = useState(false);

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
    const usuariosFiltrados = resp.filter(usuario => !usuario.deleted);

    setUsuarios(usuariosFiltrados);

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

    if (usuarioSeleccionado.nombre != "") {
      setErrorNombre(false)
    } else {
      setErrorNombre(true)
    }

    if (usuarioSeleccionado.idPerfil != 0) {
      setErrorPerfil(false)
    } else {
      setErrorPerfil(true)
    }

    if (usuarioSeleccionado.password.length >= 4) {
      setErrorContraseña(false)
    } else {
      setErrorContraseña(true)
    }

    if (usuarioSeleccionado.password === usuarioSeleccionado.repetir_contraseña) {
      setErrorRepetirContraseña(false)
    } else {
      setErrorRepetirContraseña(true)
    }

    if (usuarioSeleccionado.idPerfil != 0 && usuarioSeleccionado.password.length >= 4 && usuarioSeleccionado.nombre != "" && usuarioSeleccionado.password === usuarioSeleccionado.repetir_contraseña) {
      setErrorContraseña(false)
      setErrorRepetirContraseña(false)
      setErrorPerfil(false)
      setErrorNombre(false)

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

      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Usuario Creado',
        text: `El usuario se ha creado correctamente`,
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

  // Editar el usuario
  const peticionPut = async () => {

    if (usuarioSeleccionado.nombre != "") {
      setErrorNombre(false)
    } else {
      setErrorNombre(true)
    }

    if (usuarioSeleccionado.idPerfil != 0) {
      setErrorPerfil(false)
    } else {
      setErrorPerfil(true)
    }

    if (usuarioSeleccionado.nombre != "" && usuarioSeleccionado.idPerfil != 0) {
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

      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Usuario Editado',
        text: `El usuario se ha editado correctamente`,
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

  // Borrar el usuario
  const peticionDelete = async () => {

    var i = 0;
    while (i < UsuarioEliminar.length) {

      const resp = await getUsuariosById(UsuarioEliminar[i]);

      resp.deleted = true;

      await putUsuarios(resp);

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

    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Usuario Eliminado',
      text: `El usuario se ha eliminado correctamente`,
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

  //modal insertar usuario
  const abrirCerrarModalInsertar = () => {
    setErrorPerfil(false)
    setErrorContraseña(false)
    setErrorNombre(false)
    setErrorRepetirContraseña(false)
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
    setErrorPerfil(false)
    setErrorContraseña(false)
    setErrorNombre(false)
    setErrorRepetirContraseña(false)
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
    setErrorPerfil(false)
    setErrorContraseña(false)
    setErrorNombre(false)
    setErrorRepetirContraseña(false)
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

  const clientesUnicos = clientes.filter((cliente, index, self) =>
    index === self.findIndex(c => c.razonSocial === cliente.razonSocial)
  );

  return (
    <>
      {usuarioActual.idPerfil === 1 ?
        <MainLayout title='Usuarios'>
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
                  errorPerfil={errorPerfil}
                  errorContraseña={errorContraseña}
                  errorNombre={errorNombre}
                  errorRepetirContraseña={errorRepetirContraseña}
                  clientesUnicos={clientesUnicos}
                />
              }
              botones={[insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                peticionPost();
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
                  errorPerfil={errorPerfil}
                  errorNombre={errorNombre}
                  clientesUnicos={clientesUnicos}
                />}
              botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                peticionPut();
              })]}
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
                }, 'error')
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
              botones={[insertarBotonesModal(<AddIcon />, 'Editar')]}
              open={modalEditar}
              onClose={abrirCerrarModalEditar}
            />
          </div>
        </MainLayout>
      }
    </>
  );

}