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
import { InsertarUsuarioModal, InsertarUsuarioModalBotones } from '../components/Modals/InsertarUsuarioModal';


// Table MUI
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';
import { addCliente, deleteCliente, getClientes, getComarcas } from '../api/apiBackend';
import { InsertarClienteModal } from '../components/Modals/InsertarClienteModal';
import { insertarBotonesModal } from '../helpers/insertarBotonesModal';
import { useForm } from '../hooks/useForm';


const token = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
};

const clienteSeleccionadoInicial = {
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
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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


  const [clienteSeleccionado, setClienteSeleccionado] = useState(clienteSeleccionadoInicial);

  const [contactoSeleccionado, setContactoSeleccionado] = useState({

    id: 0,
    nombre: '',
    telefono: '',
    email: '',
    cargo: '',
    comentarios: '',
    idCliente: clienteSeleccionado.id,
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


  const [dataDet, setDataDet] = useState([]);

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
    { field: 'cif', headerName: 'CIF', width: 100 },
    { field: 'razonSocial', headerName: 'Razón social', width: 180 },
    { field: 'cuentaContable', headerName: 'Cuenta contable', width: 130 },
    { field: 'direccion', headerName: 'Dirección', width: 250 },
    { field: 'cp', headerName: 'CP', width: 70 },
    { field: 'poblacion', headerName: 'Población', width: 100 },
    { field: 'provincia', headerName: 'Provincia', width: 120 },
    { field: 'comarca', headerName: 'Comarca', width: 140 },
    { field: 'pais', headerName: 'País', width: 100 },
    { field: 'email', headerName: 'Email', width: 240 },
    { field: 'movil', headerName: 'Movil', width: 100 },
    { field: 'telefono', headerName: 'Teléfono', width: 100 },
    { field: 'id', headerName: 'id', width: 20, hidden: true }
  ]

  // Efectos de React
  // Llamadas a las APIs
  useEffect(() => {

    getClientes()
      .then(clientes => {
        setClientes(clientes);
      });
    getComarcas()
      .then(comarcas => {
        setComarcas(comarcas);
      });

    // peticionGetContacto();
    // GetPerfiles();
    // GetPoblacion();
    // GetProvincia();
  }, []);

  // Obtener la lista de clientes
  useEffect(() => {

    if (clientes.length > 0) {
      setRows(clientes);
    }

  }, [clientes]);

  // Obtener la lista de comarcas
  useEffect(() => {

    if (comarcas.length > 0) {
      setComarcas(comarcas);
    }

  }, [comarcas]);






  const peticionPut = async () => {
    console.log(clienteSeleccionado)
    await axios.put("/cliente?id=" + clienteSeleccionado.id, clienteSeleccionado, token)
      .then(response => {
        var clienteModificado = clientes;
        clienteModificado.map(cliente => {
          if (cliente.id === clienteSeleccionado.id) {
            cliente = clienteSeleccionado
          }
        });
        //peticionGet();
        abrirCerrarModalEditar();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPostContacto = async () => {
    console.log("Peticion Post ejecutandose");
    contactoSeleccionado.id = null;
    console.log(clienteSeleccionado)
    await axios.post("/clientescontactos", contactoSeleccionado, token)
      .then(response => {
        abrirCerrarModalInsertarContacto();
        //peticionGetContacto();
      })
      .catch(error => {
        console.log(error);
      })
    console.log(contactoSeleccionado)
  }

  const peticionDeleteContacto = async () => {
    console.log("Peticion Delete ejecutandose")
    var i = 0;
    while (i < ContactoClienteEliminar.length) {
      await axios.delete("/clientescontactos/" + ContactoClienteEliminar[i].id, token)
        .then(response => {
          //peticionGetContacto();
          abrirCerrarModalEliminarContacto();
        }).catch(error => {
          console.log(error);
        })
      i++;
    }
  }

  const peticionPutContacto = async () => {
    console.log(contactoSeleccionado)
    await axios.put("/clientescontactos?id=" + contactoSeleccionado.id, contactoSeleccionado, token)
      .then(response => {
        var contactoModificado = clientes;
        contactoModificado.map(contacto => {
          if (contacto.id === contactoSeleccionado.id) {
            contacto = contactoSeleccionado
          }
        });
        //peticionGetContacto();
        abrirCerrarModalEditarContacto();
      }).catch(error => {
        console.log(error);
      })
  }



  const handleChange = e => {

    const { name, value } = e.target;
    setClienteSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));

  }

  const handleChangeContacto = e => {
    const { name, value } = e.target;
    setContactoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }


  //modal insertar cliente
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  //modal editar cliente
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  // const bodyEditar = (
  //   <div className={stylesEditarDet.modal}>
  //     <h3>Editar Cliente</h3>
  //     <div className="row g-3">
  //       <div className="col-md-2">
  //         <TextField className={styles.inputMaterial} label="Codigo" name="codigo" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.codigo} />
  //       </div>
  //       <div className="col-md-2">
  //         <TextField className={styles.inputMaterial} label="Cif" name="cif" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.cif} />
  //       </div>
  //       <div className="col-md-2">
  //         <TextField className={styles.inputMaterial} label="RazonSocial" name="razonSocial" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.razonSocial} />
  //       </div>
  //       <div className="col-md-2">
  //         <TextField className={styles.inputMaterial} label="Teléfono1" name="telefono1" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.telefono1} />
  //       </div>
  //       <div className="col-md-2">
  //         <TextField className={styles.inputMaterial} label="Teléfono2" name="telefono2" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.telefono2} />
  //       </div>
  //       <div className="col-md-3">
  //         <TextField className={styles.inputMaterial} label="Móvil" name="movil" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.movil} />
  //       </div>
  //       <div className="col-md-3">
  //         <TextField className={styles.inputMaterial} label="Email" name="email" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.email} />
  //       </div>
  //       <div className="col-md-3">
  //         <TextField className={styles.inputMaterial} label="Dirección" name="direccion" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.direccion} />
  //       </div>
  //       <div className="col-md-3">
  //         <TextField className={styles.inputMaterial} label="Código postal" name="cp" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.cp} />
  //       </div>
  //       {/* <div className="col-md-3">
  //         <TextField className={styles.inputMaterial} label="País" name="pais" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.pais} />
  //       </div> */}
  //       <div className="col-md-3">
  //         {/* Desplegable de Comarca */}
  //         <Autocomplete
  //           disableClearable={true}
  //           id="CboCamarca"
  //           options={comarca}
  //           getOptionLabel={option => option.descripcion}
  //           defaultValue={comarcaClienteEditar[0]}
  //           sx={{ width: 300 }}
  //           renderInput={(params) => <TextField {...params} label="Comarca" name="comarca" />}
  //           onChange={(event, value) => setClienteSeleccionado(prevState => ({
  //             ...prevState,
  //             comarca: value.id
  //           }))}
  //         />
  //       </div>
  //       <div className="col-md-3">
  //         {/* Desplegable de Provincia */}
  //         <Autocomplete
  //           disableClearable={true}
  //           id="CboProvincia"
  //           options={provincia}
  //           getOptionLabel={option => option.descripcion}
  //           defaultValue={provinciaClienteEditar[0]}
  //           sx={{ width: 300 }}
  //           renderInput={(params) => <TextField {...params} label="Provincia" name="provincia" />}
  //           onChange={(event, value) => setClienteSeleccionado(prevState => ({
  //             ...prevState,
  //             provincia: value.id
  //           }))}
  //         />
  //       </div>
  //       <div className="col-md-3">
  //         {/* Desplegable de Población */}
  //         <Autocomplete
  //           disableClearable={true}
  //           id="CboPoblacion"
  //           options={poblacion}
  //           getOptionLabel={option => option.poblacion}
  //           defaultValue={poblacionClienteEditar[0]}
  //           sx={{ width: 300 }}
  //           renderInput={(params) => <TextField {...params} label="Población" name="poblacion" />}
  //           onChange={(event, value) => setClienteSeleccionado(prevState => ({
  //             ...prevState,
  //             poblacion: value.id
  //           }))}
  //         />
  //       </div>
  //     </div>
  //     <br />
  //     <MaterialTable columns={columnasDet} data={dataDet}
  //       localization={localization}
  //       actions={[
  //         {
  //           icon: () => <AddCircle style={{ fill: "green" }} />,
  //           tooltip: "Añadir contacto cliente",
  //           isFreeAction: true,
  //           onClick: (e, data) => {
  //             //setContactoClienteEditar();
  //             abrirCerrarModalInsertarContacto();
  //             console.log(dataDet)
  //           },
  //         },
  //         {
  //           icon: () => <RemoveCircle style={{ fill: "red" }} />,
  //           tooltip: "Eliminar contacto cliente",
  //           onClick: (event, rowData) => {
  //             setContactoClienteEliminar(FilasSeleccionadasDet);
  //             abrirCerrarModalEliminarContacto();
  //           },
  //         },
  //         {
  //           icon: () => <Edit />,
  //           tooltip: "Editar detalle contacto",
  //           onClick: (e, data) => {
  //             setContactoClienteEditar(contactoSeleccionado[0]);
  //             // setClienteMantenimientoCabEditar(clientes.filter(cliente => cliente.id === FilasSeleccionadas[0].idCliente));
  //             // setElementoMantenimientoCabEditar(elementosplanta.filter(elemento => elemento.id === FilasSeleccionadas[0].idElementoPlanta));
  //             // setTipoMantenimientoCabEditar(tipos.filter(tipo => tipo.id === FilasSeleccionadas[0].tipo));
  //             // setTecnicoMantenimientoCabEditar(tecnicos.filter(tecnico => tecnico.id === FilasSeleccionadas[0].idTecnicoAsignado));
  //             // if(FilasSeleccionadas[0].idPerfil === 2){
  //             //   setclienteUsuarioEditar(clientes.filter(cliente=>cliente.id===FilasSeleccionadas[0].idCliente));
  //             //   setestadoCboCliente(false);
  //             // }else{
  //             //   setclienteUsuarioEditar(false);
  //             //   setestadoCboCliente(true);
  //             // }
  //             abrirCerrarModalEditarContacto();
  //           },
  //         },
  //       ]}

  //       onRowClick={((evt, contactoSeleccionado) => setContactoSeleccionado(contactoSeleccionado.tableData.id))}
  //       onSelectionChange={(filas) => {
  //         setFilasSeleccionadasDet(filas);
  //         if (filas.length > 0)
  //           setContactoSeleccionado(filas[0]);
  //       }
  //       }
  //       options={{
  //         sorting: true, paging: true, pageSizeOptions: [1, 2, 3, 4, 5], pageSize: 4, filtering: false, search: false, selection: true,
  //         columnsButton: true,
  //         rowStyle: rowData => ({
  //           backgroundColor: (contactoSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
  //           whiteSpace: "nowrap"
  //         }),
  //         exportMenu: [{
  //           label: 'Export PDF',
  //           exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de contactos de cliente')
  //         }, {
  //           label: 'Export CSV',
  //           exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de contactos de cliente')
  //         }]
  //       }}

  //       title="Lista contactos del cliente"
  //     />
  //     <br /><br />
  //     <div align="right">
  //       <Button color="primary" onClick={() => peticionPut()}>Editar</Button>
  //       <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
  //     </div>
  //   </div>
  // )


  //modal eliminar cliente

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  //modal insertar contacto cliente
  const abrirCerrarModalInsertarContacto = () => {
    setModalInsertarContacto(!modalInsertarContacto);
  }

  //modal editar contacto cliente
  const abrirCerrarModalEditarContacto = () => {
    setModalEditarContacto(!modalEditarContacto);
  }

  //modal eliminar contacto cliente
  const abrirCerrarModalEliminarContacto = () => {
    setModalEditar(!modalEditar);
    setModalEliminarContacto(!modalEliminarContacto);
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


  // const bodyInsertarContacto = (
  //   <div className={styles.modal}>
  //     <h3>Agregar Nuevo Contacto</h3>
  //     <div className="row g-3">
  //       <div className="col-md-12">
  //         <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChangeContacto} />
  //       </div>
  //       <div className="col-md-12">
  //         <TextField className={styles.inputMaterial} label="Teléfono" name="telefono" onChange={handleChangeContacto} />
  //       </div>
  //       <div className="col-md-12">
  //         <TextField className={styles.inputMaterial} label="Email" name="email" onChange={handleChangeContacto} />
  //       </div>
  //       <div className="col-md-12">
  //         <TextField className={styles.inputMaterial} label="Cargo" name="cargo" onChange={handleChangeContacto} />
  //       </div>
  //       <div className="col-md-12">
  //         <TextField className={styles.inputMaterial} label="Comentarios" name="comentarios" onChange={handleChangeContacto} />
  //       </div>
  //       <div align="right">
  //         <Button color="primary" onClick={() => peticionPostContacto()}>Insertar</Button>
  //         <Button onClick={() => abrirCerrarModalInsertarContacto()}>Cancelar</Button>
  //       </div>
  //     </div>
  //   </div>
  // )

  // const bodyEditarContacto = (
  //   <div className={styles.modal}>
  //     <h3>Editar Contacto </h3>
  //     <div className="row g-3">
  //       <div className="col-md-12">
  //         <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChangeContacto} value={contactoSeleccionado && contactoSeleccionado.nombre} />
  //       </div>
  //       <div className="col-md-12">
  //         <TextField className={styles.inputMaterial} label="Telefono" name="telefono" onChange={handleChangeContacto} value={contactoSeleccionado && contactoSeleccionado.telefono} />
  //       </div>
  //       <div className="col-md-12">
  //         <TextField className={styles.inputMaterial} label="Email" name="email" onChange={handleChangeContacto} value={contactoSeleccionado && contactoSeleccionado.email} />
  //       </div>
  //       <div className="col-md-12">
  //         <TextField className={styles.inputMaterial} label="Cargo" name="cargo" onChange={handleChangeContacto} value={contactoSeleccionado && contactoSeleccionado.cargo} />
  //       </div>
  //       <div className="col-md-12">
  //         <TextField className={styles.inputMaterial} label="Comentarios" name="comentarios" onChange={handleChangeContacto} value={contactoSeleccionado && contactoSeleccionado.comentarios} />
  //       </div>
  //       <div align="right">
  //         <Button color="primary" onClick={() => peticionPutContacto()}>Editar</Button>
  //         <Button onClick={() => abrirCerrarModalEditarContacto()}>Cancelar</Button>
  //       </div>
  //     </div>
  //   </div>
  // )

  // const bodyEliminarContacto = (
  //   <div className={styles.modal}>
  //     <p>Estás seguro que deseas eliminar el contacto ? </p>
  //     <div align="right">
  //       <Button color="secondary" onClick={() => peticionDeleteContacto()}>Sí</Button>
  //       <Button onClick={() => abrirCerrarModalEliminarContacto()}>No</Button>

  //     </div>
  //   </div>
  // )

  const handleRowClick = (params) => {
    console.log(params)
  }

  const handleSelectRow = (ids) => {

    if (ids.length > 0) {
      setClienteSeleccionado(clientes.filter(cliente => cliente.id === ids[0])[0]);
    } else {
      setClienteSeleccionado(clienteSeleccionadoInicial);
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
      <Grid container spacing={2}>

        {/* Título y botones de opción */}
        <Grid item xs={12}>
          <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h6'>Listado de clientes</Typography>
            {
              (rowsIds.length > 0) ?
                (
                  <Grid item>
                    <Button sx={{ mr: 2 }} color='error' variant='contained' startIcon={<DeleteIcon />} onClick={abrirCerrarModalEliminar} >
                      Eliminar
                    </Button>
                    <Button color='primary' variant='contained' startIcon={<EditIcon />} onClick={abrirCerrarModalEditar}>
                      Editar
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
              onSelectionModelChange={(ids) => handleSelectRow(ids)}
            />
          </Card>
        </Grid>

        {/* LISTA DE MODALS */}

        {/* Agregar cliente */}
        <ModalLayout
          titulo="Agregar nuevo cliente"
          contenido={
            <InsertarClienteModal change={handleChange} autocompleteChange={handleAutocompleteChange} />
          }
          botones={[
            insertarBotonesModal(<AddIcon />, 'Añadir', async () => {

              const result = await addCliente(clienteSeleccionado);
              abrirCerrarModalInsertar();

              if (result) {
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

            const result = await deleteCliente(clienteSeleccionado.id);
            abrirCerrarModalEliminar();

            if (result) {
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

      <Snackbar open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
        <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
          {snackData.msg}
        </Alert>
      </Snackbar>

      {/* <Modal
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

        <Modal
          open={modalInsertarContacto}
          onClose={abrirCerrarModalInsertarContacto}>
          {bodyInsertarContacto}
        </Modal>

        <Modal
          open={modalEliminarContacto}
          onClose={abrirCerrarModalEliminarContacto}>
          {bodyEliminarContacto}
        </Modal>

        <Modal
          open={modalEditarContacto}
          onClose={abrirCerrarModalEditarContacto}>
          {bodyEditarContacto}
        </Modal> */}
    </MainLayout>
  );

}