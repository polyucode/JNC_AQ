import React, { useState, useEffect } from "react";
import MaterialTable from '@material-table/core';
import axios from "axios";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Edit from '@material-ui/icons/Edit';
import { Modal, TextField, Button } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@material-ui/core/styles';


const token = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
};

//estilos modal

const useStylesEditarDet = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 1500,
    height: 780,
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

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 700,
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

function Clientes() {

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

  const [data, setData] = useState([]);
  const [dataDet, setDataDet] = useState([]);

  const [perfiles, setPerfiles] = useState([]);

  const [poblacion, setPoblacion] = useState([]);

  const [provincia, setProvincia] = useState([]);

  const [comarca, setComarca] = useState([]);

  const styles = useStyles();

  const stylesEditarDet = useStylesEditarDet();

  const [estadoCboCliente, setestadoCboCliente] = useState(true);



  const columnas = [

    //Visibles
    { title: 'Codigo', field: 'codigo', filterPlaceholder: "Filtrar por codigo" },
    { title: 'Cif', field: 'cif', filterPlaceholder: "Filtrar por cif" },
    { title: 'RazonSocial', field: 'razonSocial', filterPlaceholder: "Filtrar por Razón Social" },
    { title: 'NombreComercial', field: 'nombreComercial', filterPlaceholder: "Filtrar por nombre comercial" },

    { title: 'Telefono1', field: 'telefono1', filterPlaceholder: "Filtrar por teléfono" },

    { title: 'Movil', field: 'movil', filterPlaceholder: "Filtrar por movil" },
    { title: 'Email', field: 'email', filterPlaceholder: "Filtrar por email" },

    //Ocultas
    { title: 'Id', field: 'id', filterPlaceholder: "Filtrar por id", hidden: true },


    { title: 'Telefono2', field: 'telefono2', filterPlaceholder: "Filtrar por teléfono", hidden: true },
    { title: 'IdSector', field: 'idSector', filterPlaceholder: "Filtrar por id sector", hidden: true },

    { title: 'Direccion', field: 'direccion', filterPlaceholder: "Filtrar por dirección", hidden: true },
    { title: 'Poblacion', field: 'poblacion', filterPlaceholder: "Filtrar por población", hidden: true },
    { title: 'Provincia', field: 'provincia', filterPlaceholder: "Filtrar por provincia", hidden: true },
    { title: 'Cp', field: 'cp', filterPlaceholder: "Filtrar por código postal", hidden: true },
    { title: 'Pais', field: 'pais', filterPlaceholder: "Filtrar por país", hidden: true },
    { title: 'Comarca', field: 'comarca', filterPlaceholder: "Filtrar por comarca", hidden: true },
    { title: 'CuentaContable', field: 'cuentaContable', filterPlaceholder: "Filtrar por cuenta contable", hidden: true },
  ];

  const columnasDet = [

    //visibles
    { title: 'Nombre', field: 'nombre', filterPlaceholder: "Filtrar por nombre" },
    { title: 'Telefono', field: 'telefono', filterPlaceholder: "Filtrar por telefono" },
    { title: 'Email', field: 'email', type: 'email', filterPlaceholder: "Filtrar por email" },
    { title: 'Cargo', field: 'cargo', filterPlaceholder: "Filtrar por cargo" },
    { title: 'Comentarios', field: 'comentarios', filterPlaceholder: "Filtrar por comentarios" },

    //Ocultas
    { title: 'Id Cliente', field: 'idCliente', type: 'numeric', filterPlaceholder: "Filtrar por IdCliente", hidden: true, },
    { title: 'Fecha creación', field: 'addDate', type: 'date', filterPlaceholder: "Filtrar por fecha creacion", hidden: true },
    { title: 'Usuario creación', field: 'AddIdUser', type: 'numeric', filterPlaceholder: "Filtrar por Usuario creación", hidden: true },
    { title: 'Fecha modificación', field: 'modDate', type: 'date', filterPlaceholder: "Filtrar por Fecha modificación", hidden: true },
    { title: 'Usuario modificacion', field: 'modIdUser', type: 'numeric', filterPlaceholder: "Filtrar por Usuario modificacion", hidden: true },
    { title: 'Fecha eliminación', field: 'delDate', type: 'date', filterPlaceholder: "Filtrar por Fecha eliminación", hidden: true },
    { title: 'Usuario eliminación', field: 'delIdUser', type: 'numeric', filterPlaceholder: "Filtrar por Usuario eliminación", hidden: true },
    { title: 'Eliminado', field: 'deleted', type: 'boolean', filterPlaceholder: "Filtrar por Eliminado", hidden: true },
    { title: 'Id', field: 'id', type: 'numeric', filterPlaceholder: "Filtrar por Id", hidden: true, },

  ];

  //peticiones API
  const GetPoblacion = async () => {
    axios.get("/poblacion", token).then(response => {
      const poblacion = Object.entries(response.data.data).map(([key, value]) => (key, value))
      setPoblacion(poblacion);
    }, [])
  }

  const GetProvincia = async () => {
    axios.get("/provincia", token).then(response => {
      const provincia = Object.entries(response.data.data).map(([key, value]) => (key, value))
      setProvincia(provincia);
    }, [])
  }

  const GetComarca = async () => {
    axios.get("/comarca", token).then(response => {
      const comarca = Object.entries(response.data.data).map(([key, value]) => (key, value))
      setComarca(comarca);
    }, [])
  }

  const GetPerfiles = async () => {
    axios.get("/perfil", token).then(response => {
      const perfil = Object.entries(response.data.data).map(([key, value]) => (key, value))
      setPerfiles(perfil);
    }, [])
  }

  const peticionGet = async () => {
    axios.get("/cliente", token).then(response => {
      setData(response.data.data)
    })
  }

  const peticionGetContacto = async () => {
    axios.get("/clientescontactos", token).then(response => {
      setDataDet(response.data.data)
    })
  }

  useEffect(() => {
    console.log("Prueba USE EFFECT")
    peticionGet();
    peticionGetContacto();
    GetPerfiles();
    GetPoblacion();
    GetProvincia();
    GetComarca();
  }, [])

  const peticionPost = async () => {
    clienteSeleccionado.id = null;
    console.log("Metodo POST Ejecutandose")
    console.log("El cliente seleccionado es:" + clienteSeleccionado)
    await axios.post("/cliente", clienteSeleccionado, token)
      .then(response => {
        //setData(data.concat(response.data));
        abrirCerrarModalInsertar();
        peticionGet();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPut = async () => {
    console.log(clienteSeleccionado)
    await axios.put("/cliente?id=" + clienteSeleccionado.id, clienteSeleccionado, token)
      .then(response => {
        var clienteModificado = data;
        clienteModificado.map(cliente => {
          if (cliente.id === clienteSeleccionado.id) {
            cliente = clienteSeleccionado
          }
        });
        peticionGet();
        abrirCerrarModalEditar();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionDelete = async () => {
    console.log("id=" + ClienteEliminar[0].id)
    var i = 0;
    while (i < ClienteEliminar.length) {
      await axios.delete("/cliente/" + ClienteEliminar[i].id, token)
        .then(response => {
          peticionGet();
          abrirCerrarModalEliminar();
        }).catch(error => {
          console.log(error);
        })
      i++;
    }
  }

  const peticionPostContacto = async () => {
    console.log("Peticion Post ejecutandose");
    contactoSeleccionado.id = null;
    console.log(clienteSeleccionado)
    await axios.post("/clientescontactos", contactoSeleccionado, token)
      .then(response => {
        abrirCerrarModalInsertarContacto();
        peticionGetContacto();
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
          peticionGetContacto();
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
        var contactoModificado = data;
        contactoModificado.map(contacto => {
          if (contacto.id === contactoSeleccionado.id) {
            contacto = contactoSeleccionado
          }
        });
        peticionGetContacto();
        abrirCerrarModalEditarContacto();
      }).catch(error => {
        console.log(error);
      })
  }

  //modal insertar cliente
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    console.log(e.target)
    setClienteSeleccionado(prevState => ({
      ...prevState,
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    }));
  }

  const handleChangeContacto = e => {
    const { name, value } = e.target;
    setContactoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo Cliente</h3>
      <div className="row g-3">
        <div className="col-md-6">
          <TextField className={styles.inputMaterial} type="number" label="Codigo" name="codigo" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <TextField className={styles.inputMaterial} label="Cif" name="cif" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <TextField className={styles.inputMaterial} label="RazonSocial" name="razonSocial" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <TextField className={styles.inputMaterial} label="Teléfono1" name="telefono1" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <TextField className={styles.inputMaterial} label="Teléfono2" name="telefono2" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <TextField className={styles.inputMaterial} label="Móvil" name="movil" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <TextField className={styles.inputMaterial} label="Email" name="email" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <TextField className={styles.inputMaterial} label="Dirección" name="direccion" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <TextField className={styles.inputMaterial} label="Código postal" name="cp" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <TextField className={styles.inputMaterial} label="País" name="pais" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          {/* Desplegable de Comarca */}
          <Autocomplete
            disableClearable={true}
            id="CboCamarca"
            options={comarca}
            getOptionLabel={option => option.descripcion}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Comarca" name="comarca" />}
            onChange={(event, value) => setClienteSeleccionado(prevState => ({
              ...prevState,
              comarca: value.id
            }))}
          />
        </div>
        <div className="col-md-6">
          {/* Desplegable de Provincia */}
          <Autocomplete
            disableClearable={true}
            id="CboProvincia"
            options={provincia}
            getOptionLabel={option => option.descripcion}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Provincia" name="provincia" />}
            onChange={(event, value) => setClienteSeleccionado(prevState => ({
              ...prevState,
              provincia: value.id
            }))}
          />
        </div>
        <div className="col-md-6">
          {/* Desplegable de Población */}
          <Autocomplete
            disableClearable={true}
            id="CboPoblacion"
            options={poblacion}
            getOptionLabel={option => option.poblacion}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Población" name="poblacion" />}
            onChange={(event, value) => setClienteSeleccionado(prevState => ({
              ...prevState,
              poblacion: value.id
            }))}
          />
        </div>
      </div>

      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  //modal editar cliente

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const bodyEditar = (
    <div className={stylesEditarDet.modal}>
      <h3>Editar Cliente</h3>
      <div className="row g-3">
        <div className="col-md-2">
          <TextField className={styles.inputMaterial} type="number" label="Codigo" name="codigo" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.codigo} />
        </div>
        <div className="col-md-2">
          <TextField className={styles.inputMaterial} label="Cif" name="cif" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.cif} />
        </div>
        <div className="col-md-2">
          <TextField className={styles.inputMaterial} label="RazonSocial" name="razonSocial" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.razonSocial} />
        </div>
        <div className="col-md-2">
          <TextField className={styles.inputMaterial} label="Teléfono1" name="telefono1" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.telefono1} />
        </div>
        <div className="col-md-2">
          <TextField className={styles.inputMaterial} label="Teléfono2" name="telefono2" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.telefono2} />
        </div>
        <div className="col-md-3">
          <TextField className={styles.inputMaterial} label="Móvil" name="movil" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.movil} />
        </div>
        <div className="col-md-3">
          <TextField className={styles.inputMaterial} label="Email" name="email" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.email} />
        </div>
        <div className="col-md-3">
          <TextField className={styles.inputMaterial} label="Dirección" name="direccion" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.direccion} />
        </div>
        <div className="col-md-3">
          <TextField className={styles.inputMaterial} label="Código postal" name="cp" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.cp} />
        </div>
        <div className="col-md-3">
          <TextField className={styles.inputMaterial} label="País" name="pais" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.pais} />
        </div>
        <div className="col-md-3">
          {/* Desplegable de Comarca */}
          <Autocomplete
            disableClearable={true}
            id="CboCamarca"
            options={comarca}
            getOptionLabel={option => option.descripcion}
            defaultValue={comarcaClienteEditar[0]}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Comarca" name="comarca" />}
            onChange={(event, value) => setClienteSeleccionado(prevState => ({
              ...prevState,
              comarca: value.id
            }))}
          />
        </div>
        <div className="col-md-3">
          {/* Desplegable de Provincia */}
          <Autocomplete
            disableClearable={true}
            id="CboProvincia"
            options={provincia}
            getOptionLabel={option => option.descripcion}
            defaultValue={provinciaClienteEditar[0]}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Provincia" name="provincia" />}
            onChange={(event, value) => setClienteSeleccionado(prevState => ({
              ...prevState,
              provincia: value.id
            }))}
          />
        </div>
        <div className="col-md-3">
          {/* Desplegable de Población */}
          <Autocomplete
            disableClearable={true}
            id="CboPoblacion"
            options={poblacion}
            getOptionLabel={option => option.poblacion}
            defaultValue={poblacionClienteEditar[0]}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Población" name="poblacion" />}
            onChange={(event, value) => setClienteSeleccionado(prevState => ({
              ...prevState,
              poblacion: value.id
            }))}
          />
        </div>
      </div>
      <br />
      <MaterialTable columns={columnasDet} data={dataDet}
        localization={localization}
        actions={[
          {
            icon: () => <AddCircle style={{ fill: "green" }} />,
            tooltip: "Añadir contacto cliente",
            isFreeAction: true,
            onClick: (e, data) => {
              //setContactoClienteEditar();
              abrirCerrarModalInsertarContacto();
              console.log(dataDet)
            },
          },
          {
            icon: () => <RemoveCircle style={{ fill: "red" }} />,
            tooltip: "Eliminar contacto cliente",
            onClick: (event, rowData) => {
              setContactoClienteEliminar(FilasSeleccionadasDet);
              abrirCerrarModalEliminarContacto();
            },
          },
          {
            icon: () => <Edit />,
            tooltip: "Editar detalle contacto",
            onClick: (e, data) => {
              setContactoClienteEditar(contactoSeleccionado[0]);
              // setClienteMantenimientoCabEditar(clientes.filter(cliente => cliente.id === FilasSeleccionadas[0].idCliente));
              // setElementoMantenimientoCabEditar(elementosplanta.filter(elemento => elemento.id === FilasSeleccionadas[0].idElementoPlanta));
              // setTipoMantenimientoCabEditar(tipos.filter(tipo => tipo.id === FilasSeleccionadas[0].tipo));
              // setTecnicoMantenimientoCabEditar(tecnicos.filter(tecnico => tecnico.id === FilasSeleccionadas[0].idTecnicoAsignado));
              // if(FilasSeleccionadas[0].idPerfil === 2){
              //   setclienteUsuarioEditar(clientes.filter(cliente=>cliente.id===FilasSeleccionadas[0].idCliente));
              //   setestadoCboCliente(false);
              // }else{
              //   setclienteUsuarioEditar(false);
              //   setestadoCboCliente(true);
              // }
              abrirCerrarModalEditarContacto();
            },
          },
        ]}

        onRowClick={((evt, contactoSeleccionado) => setContactoSeleccionado(contactoSeleccionado.tableData.id))}
        onSelectionChange={(filas) => {
          setFilasSeleccionadasDet(filas);
          if (filas.length > 0)
            setContactoSeleccionado(filas[0]);
        }
        }
        options={{
          sorting: true, paging: true, pageSizeOptions: [1, 2, 3, 4, 5], pageSize: 4, filtering: false, search: false, selection: true,
          columnsButton: true,
          rowStyle: rowData => ({
            backgroundColor: (contactoSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
            whiteSpace: "nowrap"
          }),
          exportMenu: [{
            label: 'Export PDF',
            exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de contactos de cliente')
          }, {
            label: 'Export CSV',
            exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de contactos de cliente')
          }]
        }}

        title="Lista contactos del cliente"
      />
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )


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

  const bodyInsertarContacto = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo Contacto</h3>
      <div className="row g-3">
        <div className="col-md-12">
          <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChangeContacto} />
        </div>
        <div className="col-md-12">
          <TextField className={styles.inputMaterial} label="Teléfono" name="telefono" onChange={handleChangeContacto} />
        </div>
        <div className="col-md-12">
          <TextField className={styles.inputMaterial} label="Email" name="email" onChange={handleChangeContacto} />
        </div>
        <div className="col-md-12">
          <TextField className={styles.inputMaterial} label="Cargo" name="cargo" onChange={handleChangeContacto} />
        </div>
        <div className="col-md-12">
          <TextField className={styles.inputMaterial} label="Comentarios" name="comentarios" onChange={handleChangeContacto} />
        </div>
        <div align="right">
          <Button color="primary" onClick={() => peticionPostContacto()}>Insertar</Button>
          <Button onClick={() => abrirCerrarModalInsertarContacto()}>Cancelar</Button>
        </div>
      </div>
    </div>
  )

  const bodyEditarContacto = (
    <div className={styles.modal}>
      <h3>Editar Contacto </h3>
      <div className="row g-3">
        <div className="col-md-12">
          <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChangeContacto} value={contactoSeleccionado && contactoSeleccionado.nombre} />
        </div>
        <div className="col-md-12">
          <TextField className={styles.inputMaterial} label="Telefono" name="telefono" onChange={handleChangeContacto} value={contactoSeleccionado && contactoSeleccionado.telefono} />
        </div>
        <div className="col-md-12">
          <TextField className={styles.inputMaterial} label="Email" name="email" onChange={handleChangeContacto} value={contactoSeleccionado && contactoSeleccionado.email} />
        </div>
        <div className="col-md-12">
          <TextField className={styles.inputMaterial} label="Cargo" name="cargo" onChange={handleChangeContacto} value={contactoSeleccionado && contactoSeleccionado.cargo} />
        </div>
        <div className="col-md-12">
          <TextField className={styles.inputMaterial} label="Comentarios" name="comentarios" onChange={handleChangeContacto} value={contactoSeleccionado && contactoSeleccionado.comentarios} />
        </div>
        <div align="right">
          <Button color="primary" onClick={() => peticionPutContacto()}>Editar</Button>
          <Button onClick={() => abrirCerrarModalEditarContacto()}>Cancelar</Button>
        </div>
      </div>
    </div>
  )

  const bodyEliminarContacto = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el contacto ? </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDeleteContacto()}>Sí</Button>
        <Button onClick={() => abrirCerrarModalEliminarContacto()}>No</Button>

      </div>
    </div>
  )

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el cliente ? </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}>Sí</Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>

      </div>
    </div>
  )


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
            icon: () => <AddCircle style={{ fill: "green" }} />,
            tooltip: "Añadir Cliente",
            isFreeAction: true,
            onClick: (e, data) => {
              abrirCerrarModalInsertar()
            },
          },
          {
            icon: () => <RemoveCircle style={{ fill: "red" }} />,
            tooltip: "Eliminar Cliente",
            onClick: (event, rowData) => {
              setClienteEliminar(FilasSeleccionadas);
              abrirCerrarModalEliminar()
            },
          },
          {
            icon: () => <Edit />,
            tooltip: "Editar Cliente",
            onClick: (e, data) => {
              setComarcaClienteEditar(comarca.filter(comarca => comarca.id === FilasSeleccionadas[0].comarca));
              setProvinciaClienteEditar(provincia.filter(provincia => provincia.id === FilasSeleccionadas[0].provincia));
              setPoblacionClienteEditar(poblacion.filter(poblacion => poblacion.id === FilasSeleccionadas[0].poblacion));
              abrirCerrarModalEditar();
            },
          },
        ]}

        onRowClick={((evt, clienteSeleccionado) => setClienteSeleccionado(clienteSeleccionado.tableData.id))}
        onSelectionChange={(filas) => {
          setFilasSeleccionadas(filas);

          setClienteSeleccionado(filas[0]);
        }
        }
        options={{
          sorting: true, paging: true, pageSizeOptions: [5, 10, 20, 50, 100, 200], pageSize: 10, filtering: true, search: false, selection: true,
          columnsButton: true,
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
      </Modal>
    </div>
  );

}

export default Clientes;