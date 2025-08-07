import { useState, useEffect, useContext } from 'react';
import { Grid, Card, Typography, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { MainLayout } from "../layout/MainLayout";

// Iconos
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { ModalLayout } from "../components/ModalLayout";
import { ModalLayout2 } from '../components/ModalLayout2';

// Table MUI
import { DataGrid } from '@mui/x-data-grid';
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';
import { InsertarClienteModal } from '../components/Modals/InsertarClienteModal';
import { EditarClienteModal } from '../components/Modals/EditarClienteModal';
import { insertarBotonesModal } from '../helpers/insertarBotonesModal';
import { getPoblaciones, getProvincias, putCliente, postCliente, deleteCliente, getClientes, getComarcas } from '../api';

import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';

import { TailSpin } from 'react-loader-spinner';

export const ClientesPage = () => {

  const [rowsIds, setRowsIds] = useState([]);

  //variables
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [cargando, setCargando] = useState(false);

  // Modal detalle 

  const [clienteSeleccionado, setClienteSeleccionado] = useState({
    id: 0,
    codigo: 0,
    cif: '',
    razonSocial: '',
    telefono: '',
    movil: '',
    email: '',
    direccion: '',
    poblacion: '',
    provincia: '',
    cp: '',
    comarca: '',
    idSector: 0,
    addDate: null,
    addIdUser: null,
    modDate: null,
    modIdUser: null,
    delDate: null,
    delIdUser: null,
    deleted: null,
  });

  const [ClienteEliminar, setClienteEliminar] = useState([]);

  const [data, setData] = useState([]);

  const [rows, setRows] = useState([]);

  const [poblacion, setPoblacion] = useState([]);
  const [provincia, setProvincia] = useState([]);
  const [comarcas, setComarcas] = useState([]);

  const [comarcaEditar, setComarcaEditar] = useState([]);

  const { user } = useContext(AuthContext);

  const [errorCodigo, setErrorCodigo] = useState(false);
  const [errorCodigoRepetido, setErrorCodigoRepetido] = useState(false);
  const [errorTelefono, setErrorTelefono] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorDireccion, setErrorDireccion] = useState(false);
  const [errorNombre, setErrorNombre] = useState(false);
  const [errorCP, setErrorCP] = useState(false);

  const [filterText, setFilterText] = useState('');

  // Columnas de la tabla
  const columns = [
    { field: 'codigo', headerName: 'Código', width: 175 },
    { field: 'cif', headerName: 'CIF', width: 150 },
    { field: 'razonSocial', headerName: 'Razón social', width: 250 },
    { field: 'direccion', headerName: 'Dirección', width: 320 },
    { field: 'cp', headerName: 'CP', width: 70 },
    { field: 'poblacion', headerName: 'Población', width: 150 },
    { field: 'provincia', headerName: 'Provincia', width: 150 },
    { field: 'comarca', headerName: 'Comarca', width: 200 },
    { field: 'email', headerName: 'Email', width: 260 },
    { field: 'movil', headerName: 'Movil', width: 150 },
    { field: 'telefono', headerName: 'Teléfono', width: 150 }
  ]

  const GetPoblacion = async () => {
    const resp = await getPoblaciones();
    setPoblacion(resp);
  }

  const GetProvincia = async () => {
    const resp = await getProvincias();
    setProvincia(resp);
  }

  const GetComarcas = async () => {
    const resp = await getComarcas();
    setComarcas(resp);
  }

  // Efectos de React
  // Llamadas a las APIs
  useEffect(() => {
    peticionGet();
    GetPoblacion();
    GetProvincia();
    GetComarcas();
  }, []);

  // Obtener la lista de clientes
  useEffect(() => {

    if (data.length > 0) {
      setRows(data);
    } else {
      setRows([]);
    }

  }, [data]);

  // Obtener la lista de comarcas

  useEffect(() => {

    if (clienteSeleccionado.cp.length > 1 && clienteSeleccionado.cp.length < 5) {
      const prov = provincia.filter(prov => prov.codigo === clienteSeleccionado.cp.slice(0, 2));
      (prov.length > 0) && setClienteSeleccionado({
        ...clienteSeleccionado,
        provincia: prov[0].descripcion,
        poblacion: ''
      })
    } else if (clienteSeleccionado.cp.length === 0 || clienteSeleccionado.cp.length === 1) {
      setClienteSeleccionado({
        ...clienteSeleccionado,
        provincia: ''
      })
    } else {
      const pueblo = poblacion.filter(pobl => pobl.cp === clienteSeleccionado.cp);
      (pueblo.length > 0) && setClienteSeleccionado({
        ...clienteSeleccionado,
        poblacion: pueblo[0].poblacion
      })
    }
  }, [clienteSeleccionado.cp])

  const peticionGet = async () => {

    const resp = await getClientes();
    const clientesFiltrados = resp.filter(cliente => !cliente.deleted);
    setData(clientesFiltrados)

  }

  const peticionPost = async () => {

    const clienteRepetido = data.filter(cliente => cliente.codigo === clienteSeleccionado.codigo)

    if (clienteRepetido.length > 0) {
      setErrorCodigoRepetido(true)
    } else {
      setErrorCodigoRepetido(false)
    }

    if (clienteSeleccionado.codigo !== 0) {
      setErrorCodigo(false)
    } else {
      setErrorCodigo(true)
    }

    if (clienteSeleccionado.razonSocial !== "") {
      setErrorNombre(false)
    } else {
      setErrorNombre(true)
    }

    if (clienteSeleccionado.telefono !== "") {
      setErrorTelefono(false)
    } else {
      setErrorTelefono(true)
    }

    if (clienteSeleccionado.direccion !== "") {
      setErrorDireccion(false)
    } else {
      setErrorDireccion(true)
    }

    if (clienteSeleccionado.cp !== "") {
      setErrorCP(false)
    } else {
      setErrorCP(true)
    }

    if (clienteSeleccionado.email !== "") {
      setErrorEmail(false)
    } else {
      setErrorEmail(true)
    }

    if (clienteSeleccionado.codigo !== 0 && clienteRepetido.length === 0 && clienteSeleccionado.razonSocial !== "" && clienteSeleccionado.telefono !== "" && clienteSeleccionado.direccion !== "" && clienteSeleccionado.cp !== "" && clienteSeleccionado.email !== "") {
      clienteSeleccionado.id = null;

      await postCliente(clienteSeleccionado);

      peticionGet();

      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Cliente Creado',
        text: `El cliente se ha creado correctamente`,
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

    if (clienteRepetido.length > 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Código Repetido',
        text: `Este código ya está siendo utilizado, introduzca otro código`,
        showConfirmButton: false,
        timer: 3000,
        showClass: {
          popup: 'animate__animated animate__bounceIn'
        },
        hideClass: {
          popup: 'animate__animated animate__bounceOut'
        }
      });
    }
  }

  const peticionPut = async () => {

    const clienteRepetido = data.filter(cliente => cliente.codigo === clienteSeleccionado.codigo && clienteSeleccionado.id !== cliente.id)

    if (clienteRepetido.length > 0) {
      setErrorCodigoRepetido(true)
    } else {
      setErrorCodigoRepetido(false)
    }

    if (clienteSeleccionado.codigo !== 0) {
      setErrorCodigo(false)
    } else {
      setErrorCodigo(true)
    }

    if (clienteSeleccionado.razonSocial !== "") {
      setErrorNombre(false)
    } else {
      setErrorNombre(true)
    }

    if (clienteSeleccionado.telefono !== "") {
      setErrorTelefono(false)
    } else {
      setErrorTelefono(true)
    }

    if (clienteSeleccionado.direccion !== "") {
      setErrorDireccion(false)
    } else {
      setErrorDireccion(true)
    }

    if (clienteSeleccionado.cp !== "") {
      setErrorCP(false)
    } else {
      setErrorCP(true)
    }

    if (clienteSeleccionado.email !== "") {
      setErrorEmail(false)
    } else {
      setErrorEmail(true)
    }

    if (clienteSeleccionado.codigo !== 0 && clienteRepetido.length === 0 && clienteSeleccionado.razonSocial !== "" && clienteSeleccionado.telefono !== "" && clienteSeleccionado.direccion !== "" && clienteSeleccionado.cp !== "" && clienteSeleccionado.email !== "") {
      await putCliente(clienteSeleccionado);

      var clienteModificado = data;
      clienteModificado.map(cliente => {
        if (cliente.id === clienteSeleccionado.id) {
          cliente = clienteSeleccionado
        }
      });
      peticionGet();

      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Cliente Editado',
        text: `El cliente se ha editado correctamente`,
        showConfirmButton: false,
        timer: 2000,
        showClass: {
          popup: 'animate__animated animate__bounceIn'
        },
        hideClass: {
          popup: 'animate__animated animate__bounceOut'
        }
      })

    }

    if (clienteRepetido.length > 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Código Repetido',
        text: `Este código ya está siendo utilizado, introduzca otro código`,
        showConfirmButton: false,
        timer: 3000,
        showClass: {
          popup: 'animate__animated animate__bounceIn'
        },
        hideClass: {
          popup: 'animate__animated animate__bounceOut'
        }
      });
    }
  }

  const peticionDelete = async () => {

    abrirCerrarModalEliminar()
    setCargando(true);

    try {
      var i = 0;
      while (i < ClienteEliminar.length) {

        await deleteCliente(ClienteEliminar[i]);

        setClienteSeleccionado({
          id: 0,
          codigo: 0,
          cif: '',
          razonSocial: '',
          telefono: '',
          movil: '',
          email: '',
          direccion: '',
          poblacion: '',
          provincia: '',
          cp: '',
          comarca: '',
          idSector: 0,
          addDate: null,
          addIdUser: null,
          modDate: null,
          modIdUser: null,
          delDate: null,
          delIdUser: null,
          deleted: null,
        })
        i++;

      }

      peticionGet();

      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Cliente Eliminado',
        text: `El cliente se ha eliminado correctamente`,
        showConfirmButton: false,
        timer: 2000,
        showClass: {
          popup: 'animate__animated animate__bounceIn'
        },
        hideClass: {
          popup: 'animate__animated animate__bounceOut'
        }
      });
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        text: 'Error al borrar al cliente',
        showConfirmButton: true,
      });
    } finally {
      setCargando(false)
    }

  }

  const handleChange = e => {

    setClienteSeleccionado(prevState => ({
      ...prevState,
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    }));

  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredData = rows.filter(item =>
    item.razonSocial.toLowerCase().includes(filterText.toLowerCase())
  );

  //modal insertar cliente
  const abrirCerrarModalInsertar = () => {
    setErrorCP(false)
    setErrorCodigo(false)
    setErrorCodigoRepetido(false)
    setErrorDireccion(false)
    setErrorEmail(false)
    setErrorNombre(false)
    setErrorTelefono(false)
    if (modalInsertar) {
      setClienteSeleccionado({
        id: 0,
        codigo: 0,
        cif: '',
        razonSocial: '',
        telefono: '',
        movil: '',
        email: '',
        direccion: '',
        poblacion: '',
        provincia: '',
        cp: '',
        pais: '',
        comarca: '',
        idSector: 0,
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

  //modal editar cliente
  const abrirCerrarModalEditar = () => {
    setErrorCP(false)
    setErrorCodigo(false)
    setErrorCodigoRepetido(false)
    setErrorDireccion(false)
    setErrorEmail(false)
    setErrorNombre(false)
    setErrorTelefono(false)
    if (modalEditar) {
      setClienteSeleccionado({
        id: 0,
        codigo: 0,
        cif: '',
        razonSocial: '',
        telefono: '',
        movil: '',
        email: '',
        direccion: '',
        poblacion: '',
        provincia: '',
        cp: '',
        pais: '',
        comarca: '',
        idSector: 0,
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

  //modal eliminar cliente

  const abrirCerrarModalEliminar = () => {
    setErrorCP(false)
    setErrorCodigo(false)
    setErrorCodigoRepetido(false)
    setErrorDireccion(false)
    setErrorEmail(false)
    setErrorNombre(false)
    setErrorTelefono(false)
    if (modalEliminar) {
      setClienteSeleccionado({
        id: 0,
        codigo: 0,
        cif: '',
        razonSocial: '',
        telefono: '',
        movil: '',
        email: '',
        direccion: '',
        poblacion: '',
        provincia: '',
        cp: '',
        pais: '',
        comarca: '',
        idSector: 0,
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

  const handleAutocompleteChange = (e) => {

    // Obtenemos el nombre del campo y su valor
    const name = e.target.id.split('-')[0];
    const value = e.target.innerText;

    setClienteSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));

  }

  const handleSelectRow = (ids) => {

    if (ids.length > 0) {
      setClienteSeleccionado(data.filter(cliente => cliente.id === ids[0])[0]);
    } else {
      setClienteSeleccionado(clienteSeleccionado);
    }

    setRowsIds(ids);

  }
  return (
    <>
      {
        user.idPerfil === 1 ?
          <MainLayout key="clientes" title='Clientes'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='h6'>Listado de clientes</Typography>
                  <Grid item xs={5}>
                    <TextField
                      label="Filtrar cliente"
                      variant="outlined"
                      value={filterText}
                      onChange={handleFilterChange}
                      sx={{ width: '50%' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  {
                    (rowsIds.length > 0) ?
                      (
                        <Grid item>
                          <Button
                            sx={{ height: '40px' }}
                            color='error'
                            variant='contained'
                            startIcon={<DeleteIcon />}
                            onClick={(event, rowData) => {
                              setClienteEliminar(rowsIds)
                              abrirCerrarModalEliminar()
                            }}
                          >
                            Eliminar
                          </Button>
                        </Grid>
                      ) : (
                        <Button
                          sx={{ height: '40px' }}
                          color='success'
                          variant='contained'
                          startIcon={<AddIcon />}
                          onClick={abrirCerrarModalInsertar}
                        >Añadir</Button>
                      )
                  }
                </Card>
              </Grid>
              {cargando && (
                <div className="spinner-overlay">
                  <TailSpin
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    visible={true}
                  />
                </div>
              )}
              <Grid item xs={12}>
                <Card>
                  <DataGrid
                    localeText={DATAGRID_LOCALE_TEXT}
                    sx={{
                      width: '100%',
                      height: 800,
                      backgroundColor: '#FFFFFF'
                    }}
                    rows={filteredData}
                    columns={columns}
                    checkboxSelection
                    disableSelectionOnClick
                    onSelectionModelChange={(ids) => handleSelectRow(ids)}
                    onRowClick={(clienteSeleccionado, evt) => {
                      setClienteSeleccionado(clienteSeleccionado.row)
                      setComarcaEditar(comarcas.filter(comarca => comarca.descripcion === clienteSeleccionado.row.comarca))
                      abrirCerrarModalEditar();
                    }}
                  />
                </Card>
              </Grid>

            </Grid>

            <ModalLayout
              titulo="Agregar nuevo cliente"
              contenido={
                <InsertarClienteModal
                  clienteSeleccionado={clienteSeleccionado}
                  change={handleChange}
                  autocompleteChange={handleAutocompleteChange}
                  errorCP={errorCP}
                  errorNombre={errorNombre}
                  errorCodigo={errorCodigo}
                  errorDireccion={errorDireccion}
                  errorEmail={errorEmail}
                  errorTelefono={errorTelefono}
                  errorCodigoRepetido={errorCodigoRepetido}
                />
              }
              botones={[
                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                  peticionPost();
                })
              ]}
              open={modalInsertar}
              onClose={abrirCerrarModalInsertar}
            />

            <ModalLayout
              titulo="Editar cliente"
              contenido={
                <EditarClienteModal
                  clienteSeleccionado={clienteSeleccionado}
                  handleChange={handleChange}
                  autocompleteChange={handleAutocompleteChange}
                  comarcaEditar={comarcaEditar}
                  setClienteSeleccionado={setClienteSeleccionado}
                  errorCP={errorCP}
                  errorNombre={errorNombre}
                  errorCodigo={errorCodigo}
                  errorDireccion={errorDireccion}
                  errorEmail={errorEmail}
                  errorTelefono={errorTelefono}
                  errorCodigoRepetido={errorCodigoRepetido}
                />}
              botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                peticionPut();
              })
              ]}
              open={modalEditar}
              onClose={abrirCerrarModalEditar}
            />

            <ModalLayout
              titulo="Eliminar cliente"
              contenido={
                rowsIds.length > 1 ? (
                  <Grid item xs={12}>
                    <Typography>
                      ¿Estás seguro que deseas eliminar los <b>{rowsIds.length}</b> clientes seleccionados?
                    </Typography>
                  </Grid>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <Typography>Estás seguro que deseas eliminar el cliente?</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography><b>{clienteSeleccionado.razonSocial}</b></Typography>
                    </Grid>
                  </>
                )
              }
              botones={[
                insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                  peticionDelete();
                }, 'error')
              ]}
              open={modalEliminar}
              onClose={abrirCerrarModalEliminar}
            />
          </MainLayout>
          :
          <MainLayout key="clientes" title='Clientes'>

            <Grid container spacing={2}>

              <Grid item xs={12}>
                <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='h6'>Listado de clientes</Typography>

                  <Grid item xs={8}>
                    <TextField
                      label="Filtrar cliente"
                      variant="outlined"
                      value={filterText}
                      onChange={handleFilterChange}
                      sx={{ width: '30%' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Card>

              </Grid>

              <Grid item xs={12}>
                <Card>
                  <DataGrid
                    localeText={DATAGRID_LOCALE_TEXT}
                    sx={{
                      width: '100%',
                      height: 1000,
                      backgroundColor: '#FFFFFF'
                    }}
                    rows={filteredData}
                    columns={columns}
                    pageSize={100}
                    onSelectionModelChange={(ids) => handleSelectRow(ids)}
                    onRowClick={(clienteSeleccionado, evt) => {
                      setClienteSeleccionado(clienteSeleccionado.row)
                      setComarcaEditar(comarcas.filter(comarca => comarca.descripcion === clienteSeleccionado.row.comarca))
                      abrirCerrarModalEditar();
                    }}
                  />
                </Card>
              </Grid>

            </Grid>

            <ModalLayout2
              titulo="Editar cliente"
              contenido={
                <EditarClienteModal
                  clienteSeleccionado={clienteSeleccionado}
                  handleChange={handleChange}
                  autocompleteChange={handleAutocompleteChange}
                  comarcaEditar={comarcaEditar}
                  setClienteSeleccionado={setClienteSeleccionado}
                />}
              botones={[insertarBotonesModal(<AddIcon />, 'Guardar')]}
              open={modalEditar}
              onClose={abrirCerrarModalEditar}
            />

          </MainLayout>
      }

    </>

  );

}