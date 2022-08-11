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
    height: 870,
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
    width: '70%'
  }
}));

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 1000,
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


  });

  const [contactoSeleccionado, setContactoSeleccionado] = useState({

    id: 0,
    codigoCliente: 0,
    nombre: '',
    telefono: '',
    email: '',
    cargo: '',
    comentarios: '',
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
  const [dataContacto, setDataContacto] = useState([]);

  const [perfiles, setPerfiles] = useState([]);

  const [poblacion, setPoblacion] = useState([]);

  const [provincia, setProvincia] = useState([]);

  const [comarca, setComarca] = useState([]);

  const styles = useStyles();

  const stylesEditarDet = useStylesEditarDet();

  const [estadoCboCliente, setestadoCboCliente] = useState(true);

  const [comarcaTable, setComarcaTable] = useState({});
  const [poblacionTable, setPoblacionTable] = useState({});
  const [provinciaTable, setProvinciaTable] = useState({});



  const columnas = [

    //Visibles
    { title: 'Codigo', field: 'codigo', filterPlaceholder: "Filtrar por codigo" },
    { title: 'Cif', field: 'cif', filterPlaceholder: "Filtrar por cif" },
    { title: 'RazonSocial', field: 'razonSocial', filterPlaceholder: "Filtrar por Razón Social" },
    { title: 'Telefono', field: 'telefono', filterPlaceholder: "Filtrar por teléfono" },
    { title: 'Movil', field: 'movil', filterPlaceholder: "Filtrar por movil" },
    { title: 'Email', field: 'email', filterPlaceholder: "Filtrar por email" },
    { title: 'Direccion', field: 'direccion', filterPlaceholder: "Filtrar por dirección" },
    { title: 'Poblacion', field: 'poblacion' },
    { title: 'Provincia', field: 'provincia' },
    { title: 'Comarca', field: 'comarca' },
    { title: 'Cp', field: 'cp', filterPlaceholder: "Filtrar por código postal" },

    //Ocultas
    { title: 'Id', field: 'id', filterPlaceholder: "Filtrar por id", hidden: true },
    { title: 'IdSector', field: 'idSector', filterPlaceholder: "Filtrar por id sector", hidden: true },
    { title: 'Pais', field: 'pais', filterPlaceholder: "Filtrar por país", hidden: true },
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
    { title: 'CodigoCliente', field: 'CodigoCliente', type: 'numeric', filterPlaceholder: "Filtrar por CodigoCliente", hidden: true, },
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
      setDataDet(response.data.data.filter(contacto => contacto.codigoCliente === clienteSeleccionado.codigo))
    })
  }

  /*function FiltrarDataContacto () {
    setDataDet(dataContacto.filter(contacto => contacto.codigoCliente === clienteSeleccionado.codigo))
    //peticionGetContacto();
  }*/

  useEffect(() => {

    if (clienteSeleccionado.cp.length < 5) {
      const prov = provincia.filter(prov => prov.codigo === clienteSeleccionado.cp.slice(0, 2));
      (prov.length > 0) && setClienteSeleccionado({
        ...clienteSeleccionado,
        provincia: prov[0].descripcion,
        poblacion: ''
      })
    } else {
      const pueblo = poblacion.filter(pobl => pobl.cp === clienteSeleccionado.cp);
      (pueblo.length > 0) && setClienteSeleccionado({
        ...clienteSeleccionado,
        poblacion: pueblo[0].poblacion
      })

    }

  }, [clienteSeleccionado.cp])


  useEffect(() => {
    peticionGet();
    peticionGetContacto();
    GetPerfiles();
    GetPoblacion();
    GetProvincia();
    GetComarca();
    //FiltrarDataContacto();
  }, [])

  const peticionPost = async () => {
    clienteSeleccionado.id = null;
    await axios.post("/cliente", clienteSeleccionado, token)
      .then(response => {
        //setData(data.concat(response.data));
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
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPut = async () => {
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
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionDelete = async () => {
    var i = 0;
    while (i < ClienteEliminar.length) {
      await axios.delete("/cliente/" + ClienteEliminar[i].id, token)
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
        }).catch(error => {
          console.log(error);
        })
      i++;
    }
  }

  const peticionPostContacto = async () => {
    contactoSeleccionado.id = 0;
    contactoSeleccionado.codigoCliente = clienteSeleccionado.codigo;
    await axios.post("/clientescontactos", contactoSeleccionado, token)
      .then(response => {
        abrirCerrarModalInsertarContacto();
        peticionGetContacto();
        setContactoSeleccionado({
          id: 0,
          codigoCliente: 0,
          nombre: '',
          telefono: '',
          email: '',
          cargo: '',
          comentarios: '',
          addDate: null,
          addIdUser: null,
          modDate: null,
          modIdUser: null,
          delDate: null,
          delIdUser: null,
          deleted: null,
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  const peticionDeleteContacto = async () => {
    var i = 0;
    while (i < ContactoClienteEliminar.length) {
      await axios.delete("/clientescontactos/" + ContactoClienteEliminar[i].id, token)
        .then(response => {
          peticionGetContacto();
          abrirCerrarModalEliminarContacto();
          setContactoSeleccionado({
            id: 0,
            codigoCliente: 0,
            nombre: '',
            telefono: '',
            email: '',
            cargo: '',
            comentarios: '',
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

  const peticionPutContacto = async () => {
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
        setContactoSeleccionado({
          id: 0,
          codigoCliente: 0,
          nombre: '',
          telefono: '',
          email: '',
          cargo: '',
          comentarios: '',
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

  //modal insertar cliente
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const handleChange = e => {
    const { name, value } = e.target;
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
      <br />
      {console.log(clienteSeleccionado)}
      <div className="row g-4">
        <div className="col-md-3">
          <h5> Codigo </h5>
          <TextField className={styles.inputMaterial} type="number" name="codigo" onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <h5> CIF </h5>
          <TextField className={styles.inputMaterial} name="cif" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <h5> Razon Social </h5>
          <TextField className={styles.inputMaterial} name="razonSocial" onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <h5> Teléfono </h5>
          <TextField className={styles.inputMaterial} name="telefono" onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <h5> Móvil </h5>
          <TextField className={styles.inputMaterial} name="movil" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <h5> Email </h5>
          <TextField className={styles.inputMaterial} name="email" onChange={handleChange} />
        </div>
        <div className="col-md-5">
          <h5> Direccion </h5>
          <TextField className={styles.inputMaterial} name="direccion" onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <h5> Codigo Postal </h5>
          <TextField className={styles.inputMaterial} name="cp" onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <h5> País </h5>
          <TextField className={styles.inputMaterial} name="pais" onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <h5> Comarca </h5>
          {/* Desplegable de Comarca */}
          <Autocomplete
            disableClearable={true}
            id="CboCamarca"
            options={comarca}
            getOptionLabel={option => option.descripcion}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="comarca" />}
            onChange={(event, value) => setClienteSeleccionado(prevState => ({
              ...prevState,
              comarca: value.descripcion
            }))}
          />
        </div>
        <div className="col-md-4">
          <h5> Província </h5>
          <TextField className={styles.inputMaterial} name="provincia" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.provincia} />
        </div>
        <div className="col-md-4">
          <h5> Población </h5>
          <TextField className={styles.inputMaterial} name="poblacion" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.poblacion} />
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
      <h3> Cliente </h3>
      <br />
      <div className="row g-3">
        <div className="col-md-2">
          <h5> Codigo </h5>
          <TextField className={stylesEditarDet.inputMaterial} type="number" name="codigo" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.codigo} />
        </div>
        <div className="col-md-2">
          <h5> CIF </h5>
          <TextField className={stylesEditarDet.inputMaterial} name="cif" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.cif} />
        </div>
        <div className="col-md-4">
          <h5> RazonSocial </h5>
          <TextField className={styles.inputMaterial} name="razonSocial" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.razonSocial} />
        </div>
        <div className="col-md-2">
          <h5> Teléfono </h5>
          <TextField className={styles.inputMaterial} name="telefono" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.telefono} />
        </div>
        <div className="col-md-3">
          <h5> Móvil </h5>
          <TextField className={stylesEditarDet.inputMaterial} name="movil" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.movil} />
        </div>
        <div className="col-md-3">
          <h5> Email </h5>
          <TextField className={styles.inputMaterial} name="email" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.email} />
        </div>
        <div className="col-md-3">
          <h5> Dirección </h5>
          <TextField className={styles.inputMaterial} name="direccion" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.direccion} />
        </div>
        <div className="col-md-2">
          <h5> Código Postal </h5>
          <TextField className={stylesEditarDet.inputMaterial} name="cp" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.cp} />
        </div>
        <div className="col-md-3">
          <h5> País </h5>
          <TextField className={styles.inputMaterial} name="pais" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.pais} />
        </div>
        <div className="col-md-3">
          <h5> Comarca </h5>
          {/* Desplegable de Comarca */}
          <Autocomplete
            disableClearable={true}
            id="CboCamarca"
            options={comarca}
            getOptionLabel={option => option.descripcion}
            defaultValue={comarcaClienteEditar[0]}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="comarca" />}
            onChange={(event, value) => setClienteSeleccionado(prevState => ({
              ...prevState,
              comarca: value.descripcion
            }))}
          />
        </div>
        <div className="col-md-3">
          <h5> Província </h5>
          {/* Desplegable de Provincia */}
          <Autocomplete
            disableClearable={true}
            id="CboProvincia"
            options={provincia}
            getOptionLabel={option => option.descripcion}
            defaultValue={provinciaClienteEditar[0]}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="provincia" />}
            onChange={(event, value) => setClienteSeleccionado(prevState => ({
              ...prevState,
              provincia: value.descripcion
            }))}
          />
        </div>
        <div className="col-md-3">
          <h5> Población </h5>
          {/* Desplegable de Población */}
          <TextField className={styles.inputMaterial} name="poblacion" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.poblacion} />
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
              abrirCerrarModalEditarContacto();
            },
          },
        ]}

        onRowClick={((evt, contactoSeleccionado) => {
          setContactoSeleccionado(contactoSeleccionado)
          peticionGetContacto();
          setContactoClienteEditar(contactoSeleccionado[0]);
          abrirCerrarModalEditarContacto();
        })}
        onSelectionChange={(filas) => {
          setFilasSeleccionadasDet(filas);
          if (filas.length > 0)
            setContactoSeleccionado(filas[0]);
        }
        }
        options={{
          sorting: true, paging: true, pageSizeOptions: [1, 2, 3, 4, 5], pageSize: 4, filtering: false, search: false, selection: true,
          columnsButton: true, showSelectAllCheckbox: false,
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
        <Button color="primary" onClick={() => peticionPut()}>Guardar</Button>
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
      <br />
      <div className="row g-3">
        <div className="col-md-6">
          <h5> Cliente </h5>
          <TextField disabled className={stylesEditarDet.inputMaterial} name="codigoCliente" onChange={handleChangeContacto} value={clienteSeleccionado && clienteSeleccionado.codigo} />
        </div>
        <div className="col-md-6">
          <h5> Nombre </h5>
          <TextField className={styles.inputMaterial} name="nombre" onChange={handleChangeContacto} />
        </div>
        <div className="col-md-5">
          <h5> Telefono </h5>
          <TextField className={stylesEditarDet.inputMaterial} name="telefono" onChange={handleChangeContacto} />
        </div>
        <div className="col-md-6">
          <h5> Email </h5>
          <TextField className={styles.inputMaterial} name="email" onChange={handleChangeContacto} />
        </div>
        <div className="col-md-5">
          <h5> Cargo </h5>
          <TextField className={stylesEditarDet.inputMaterial} name="cargo" onChange={handleChangeContacto} />
        </div>
        <div className="col-md-12">
          <h5> Comentarios </h5>
          <TextField className={styles.inputMaterial} name="comentarios" onChange={handleChangeContacto} />
        </div>
        <br />
        <div align="right">
          <Button color="primary" onClick={() => peticionPostContacto()}>Insertar</Button>
          <Button onClick={() => abrirCerrarModalInsertarContacto()}>Cancelar</Button>
        </div>
      </div>
    </div>
  )

  const bodyEditarContacto = (
    <div className={styles.modal}>
      <h3> Contacto </h3>
      <br />
      <div className="row g-3">
        <div className="col-md-6">
          <h5> Cliente </h5>
          <TextField disabled className={stylesEditarDet.inputMaterial} name="codigoCliente" onChange={handleChangeContacto} value={clienteSeleccionado && clienteSeleccionado.codigo} />
        </div>
        <div className="col-md-6">
          <h5> Nombre </h5>
          <TextField className={styles.inputMaterial} name="nombre" onChange={handleChangeContacto} value={contactoSeleccionado && contactoSeleccionado.nombre} />
        </div>
        <div className="col-md-5">
          <h5> Teléfono </h5>
          <TextField className={stylesEditarDet.inputMaterial} name="telefono" onChange={handleChangeContacto} value={contactoSeleccionado && contactoSeleccionado.telefono} />
        </div>
        <div className="col-md-6">
          <h5> Email </h5>
          <TextField className={styles.inputMaterial} name="email" onChange={handleChangeContacto} value={contactoSeleccionado && contactoSeleccionado.email} />
        </div>
        <div className="col-md-5">
          <h5> Cargo </h5>
          <TextField className={stylesEditarDet.inputMaterial} name="cargo" onChange={handleChangeContacto} value={contactoSeleccionado && contactoSeleccionado.cargo} />
        </div>
        <div className="col-md-12">
          <h5> Comentarios </h5>
          <TextField className={styles.inputMaterial} name="comentarios" onChange={handleChangeContacto} value={contactoSeleccionado && contactoSeleccionado.comentarios} />
        </div>
        <div align="right">
          <Button color="primary" onClick={() => peticionPutContacto()}>Guardar</Button>
          <Button onClick={() => abrirCerrarModalEditarContacto()}>Cancelar</Button>
        </div>
      </div>
    </div>
  )

  const bodyEliminarContacto = (
    <div className={styles.modal}>
      <h5>Estás seguro que deseas eliminar el contacto ? </h5>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDeleteContacto()}>Sí</Button>
        <Button onClick={() => abrirCerrarModalEliminarContacto()}>No</Button>

      </div>
    </div>
  )

  const bodyEliminar = (
    <div className={styles.modal}>
      <h5>Estás seguro que deseas eliminar el cliente ? </h5>
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

        onRowClick={((evt, clienteSeleccionado) => {
          setClienteSeleccionado(clienteSeleccionado)
          //setDataDet(dataContacto.filter(contacto => contacto.codigoCliente === clienteSeleccionado.codigo))
          peticionGetContacto();
          setComarcaClienteEditar(comarca.filter(comarca => comarca.descripcion === clienteSeleccionado.comarca));
          setProvinciaClienteEditar(provincia.filter(provincia => provincia.descripcion === clienteSeleccionado.provincia));
          setPoblacionClienteEditar(poblacion.filter(poblacion => poblacion.poblacion === clienteSeleccionado.poblacion));
          abrirCerrarModalEditar();
        })}
        onSelectionChange={(filas) => {
          setFilasSeleccionadas(filas);

          setClienteSeleccionado(filas[0]);
        }
        }
        options={{
          sorting: true, paging: true, pageSizeOptions: [5, 10, 20, 50, 100, 200], pageSize: 10, filtering: true, search: false, selection: true,
          columnsButton: true, showSelectAllCheckbox: false,
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