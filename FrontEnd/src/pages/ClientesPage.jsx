import React, { useState, useEffect } from 'react';
import { Grid, Card, Typography, Button } from '@mui/material';
import MaterialTable from '@material-table/core';
import axios from "axios";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Edit from '@material-ui/icons/Edit';
import { Modal, TextField } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { MainLayout } from "../layout/MainLayout";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

// Iconos
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

import { ModalLayout, ModalPopup } from "../components/ModalLayout";


// Table MUI
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';
import { addCliente, deleteCliente, getClientes, getComarcas } from '../api/apiBackend';
import { InsertarClienteModal } from '../components/Modals/InsertarClienteModal';
import { EditarClienteModal } from '../components/Modals/EditarClienteModal';
import { insertarBotonesModal } from '../helpers/insertarBotonesModal';
import { useForm } from '../hooks/useForm';


const token = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ClientesPage = () => {

  const [rowsSelected, setRowsSelected] = useState(false);
  const [rowsIds, setRowsIds] = useState([]);

  //variables
  const [modalInsertar, setModalInsertar] = useState(false);

  const [modalEditar, setModalEditar] = useState(false);

  const [modalEliminar, setModalEliminar] = useState(false);


  // Modal detalle 
  const [modalInsertarContacto, setModalInsertarContacto] = useState(false);

  const [modalEditarContacto, setModalEditarContacto] = useState(false);

  const [modalEliminarContacto, setModalEliminarContacto] = useState(false);


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

  const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);
  const [FilasSeleccionadasDet, setFilasSeleccionadasDet] = useState([]);

  const [comarcaClienteEditar, setComarcaClienteEditar] = useState([]);
  const [provinciaClienteEditar, setProvinciaClienteEditar] = useState([]);
  const [poblacionClienteEditar, setPoblacionClienteEditar] = useState([]);

  const [clienteClienteEditar, setclienteClienteEditar] = useState([]);

  const [ClienteEliminar, setClienteEliminar] = useState([]);
  const [contactoClienteEditar, setContactoClienteEditar] = useState([]);
  const [ContactoClienteEliminar, setContactoClienteEliminar] = useState([]);


  const [data, setData] = useState([]);

  const [rows, setRows] = useState([]);

  const [clientes, setClientes] = useState([]);
  const [perfiles, setPerfiles] = useState([]);
  const [poblacion, setPoblacion] = useState([]);
  const [provincia, setProvincia] = useState([]);
  const [comarcas, setComarcas] = useState([]);


  const [estadoCboCliente, setestadoCboCliente] = useState(true);
  const [snackData, setSnackData] = useState({ open: false, msg: 'Testing', severity: 'success' });

  // Columnas de la tabla
  const columns = [
    { field: 'codigo', headerName: 'Código', width: 100 },
    { field: 'cif', headerName: 'CIF', width: 120 },
    { field: 'razonSocial', headerName: 'Razón social', width: 250 },
    { field: 'direccion', headerName: 'Dirección', width: 320 },
    { field: 'cp', headerName: 'CP', width: 70 },
    { field: 'poblacion', headerName: 'Población', width: 100 },
    { field: 'provincia', headerName: 'Provincia', width: 120 },
    { field: 'comarca', headerName: 'Comarca', width: 140 },
    { field: 'email', headerName: 'Email', width: 260 },
    { field: 'movil', headerName: 'Movil', width: 100 },
    { field: 'telefono', headerName: 'Teléfono', width: 100 }
  ]

  const GetPoblacion = async () => {
    axios.get("http://172.26.0.169:44343/api/poblacion", token).then(response => {
      const poblacion = Object.entries(response.data.data).map(([key, value]) => (key, value))
      setPoblacion(poblacion);
    }, [])
  }

  const GetProvincia = async () => {
    axios.get("http://172.26.0.169:44343/api/provincia", token).then(response => {
      const provincia = Object.entries(response.data.data).map(([key, value]) => (key, value))
      setProvincia(provincia);
    }, [])
  }

  // Efectos de React
  // Llamadas a las APIs
  useEffect(() => {
    peticionGet();

    // peticionGetContacto();
    //GetPerfiles();
    GetPoblacion();
    GetProvincia();
  }, []);

  // Obtener la lista de clientes
  useEffect(() => {

    if (data.length > 0) {
      setRows(data);
    }

  }, [data]);

  // Obtener la lista de comarcas
  useEffect(() => {

    if (comarcas.length > 0) {
      setComarcas(comarcas);
    }

  }, [comarcas]);

  useEffect(() => {

    if (clienteSeleccionado.cp.length > 1 && clienteSeleccionado.cp.length < 5) {
      const prov = provincia.filter(prov => prov.codigo === clienteSeleccionado.cp.slice(0, 2));
      (prov.length > 0) && setClienteSeleccionado({
        ...clienteSeleccionado,
        provincia: prov[0].descripcion,
        poblacion: ''
      })
    } else if (clienteSeleccionado.cp.length == 0 || clienteSeleccionado.cp.length == 1) {
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
    axios.get("http://172.26.0.169:44343/api/cliente", token).then(response => {
      setData(response.data.data)
    })
  }

  const peticionPost = async () => {
    clienteSeleccionado.id = null;
    await axios.post("http://172.26.0.169:44343/api/cliente", clienteSeleccionado, token)
      .then(response => {
        abrirCerrarModalInsertar();
        peticionGet();
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
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPut = async () => {
    await axios.put("http://172.26.0.169:44343/api/cliente?id=" + clienteSeleccionado.id, clienteSeleccionado, token)
      .then(response => {
        var clienteModificado = data;
        clienteModificado.map(cliente => {
          if (cliente.id === clienteSeleccionado.id) {
            cliente = clienteSeleccionado
          }
        });
        peticionGet();
        abrirCerrarModalEditar();
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
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionDelete = async () => {
    var i = 0;
    console.log(ClienteEliminar[i])
    while (i < ClienteEliminar.length) {
      await axios.delete("http://172.26.0.169:44343/api/cliente/" + ClienteEliminar[i], token)
        .then(response => {
          peticionGet();
          abrirCerrarModalEliminar();
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
        }).catch(error => {
          console.log(error);
        })
      i++;
    }
  }

  const handleChange = e => {

    const { name, value } = e.target;
    setClienteSeleccionado(prevState => ({
      ...prevState,
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    }));

  }

  //modal insertar cliente
  const abrirCerrarModalInsertar = () => {
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

  const [snackOpen, setSnackOpen] = React.useState(false);

  const handleSnackClose = (event, reason) => {

    if (reason === 'clickaway') {
      return;
    }

    setSnackData({ open: false, msg: '', severity: 'info' });

  };

  return (
    <MainLayout title='Clientes'>

      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
        <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
          {snackData.msg}
        </Alert>
      </Snackbar>

      <Grid container spacing={2}>

        {/* Título y botones de opción */}
        <Grid item xs={12}>
          <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h6'>Listado de clientes</Typography>
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
                        setClienteEliminar(rowsIds)
                        abrirCerrarModalEliminar()
                      }}
                    >
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
              onRowClick={(clienteSeleccionado, evt) => {
                setClienteSeleccionado(clienteSeleccionado.row)
                abrirCerrarModalEditar();
              }}
            />
          </Card>
        </Grid>

        {/* LISTA DE MODALS */}

        {/* Agregar cliente */}
        <ModalLayout
          titulo="Agregar nuevo cliente"
          contenido={
            <InsertarClienteModal clienteSeleccionado={clienteSeleccionado} change={handleChange} autocompleteChange={handleAutocompleteChange} />
          }
          botones={[
            insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
              abrirCerrarModalInsertar();

              if (peticionPost()) {
                setSnackData({ open: true, msg: 'Cliente añadido correctamente', severity: 'success' });
              } else {
                setSnackData({ open: true, msg: 'Ha habido un error al añadir el cliente', severity: 'error' })
              }

            }, 'success')
          ]}
          open={modalInsertar}
          onClose={abrirCerrarModalInsertar}
        />

      </Grid>

      {/* Modal Editar Cliente*/}

      <ModalLayout
        titulo="Editar cliente"
        contenido={
          <EditarClienteModal
            clienteSeleccionado={clienteSeleccionado}
            change={handleChange}
            autocompleteChange={handleAutocompleteChange}
          />}
        botones={[insertarBotonesModal(<AddIcon />, 'Editar', async () => {
          abrirCerrarModalEditar()

          if (peticionPut()) {
            setSnackData({ open: true, msg: 'Cliente editado correctamente', severity: 'success' });
          } else {
            setSnackData({ open: true, msg: 'Ha habido un error al editar el cliente', severity: 'error' })
          }
        })
        ]}
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      />

      {/* Eliminar cliente */}
      <ModalLayout
        titulo="Eliminar cliente"
        contenido={
          <>
            <Grid item xs={12}>
              <Typography>Estás seguro que deseas eliminar el cliente?</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><b>{clienteSeleccionado.razonSocial}</b></Typography>
            </Grid>
          </>
        }
        botones={[
          insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
            abrirCerrarModalEliminar();

            if (peticionDelete()) {
              setSnackData({ open: true, msg: `Cliente eliminado correctamente: ${clienteSeleccionado.razonSocial}`, severity: 'success' });
            } else {
              setSnackData({ open: true, msg: 'Ha habido un error al eliminar el cliente', severity: 'error' })
            }

          }, 'error'),
          insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
        ]}
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      />
    </MainLayout>
  );

}