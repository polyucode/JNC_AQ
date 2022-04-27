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
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
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
  const [modalInsertarDet, setModalInsertarDet]= useState(false);

  const [modalEliminarDet, setModalEliminarDet]= useState(false);

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
  const [FilasSeleccionadasDet, setFilasSeleccionadasDet] = useState([]);

  const [comarcaClienteEditar, setComarcaClienteEditar] = useState([]);
  const [provinciaClienteEditar, setProvinciaClienteEditar] = useState([]);
  const [poblacionClienteEditar, setPoblacionClienteEditar] = useState([]);

  const [clienteClienteEditar, setclienteClienteEditar] = useState([]);

  const [ClienteEliminar, setClienteEliminar] = useState([]);
  const [ContactoClienteEliminar, setContactoClienteEliminar] = useState([]);

  const [data, setData] = useState([]);
  const [dataDet, setDataDet] = useState([]);
 
  const [perfiles, setPerfiles] = useState([]);

  const [poblacion, setPoblacion] = useState([]);

  const [provincia, setProvincia] = useState([]);

  const [comarca, setComarca] = useState([]);

  const [clientesTable, setClientesTable] = useState({});

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
    { title: 'Telefono1', field: 'telefono1', type: 'numeric', filterPlaceholder: "Filtrar por telefono1" },
    { title: 'Extension', field: 'extension', type: 'numeric', filterPlaceholder: "Filtrar por extension" },
    { title: 'Telefono2', field: 'telefono2', type: 'numeric', filterPlaceholder: "Filtrar por telefono2" },
    { title: 'Cargo', field: 'cargo', filterPlaceholder: "Filtrar por cargo" },
    { title: 'Email', field: 'email', type: 'email', filterPlaceholder: "Filtrar por email" },


    //Ocultas
    { title: 'Id Cliente', field: 'idCli', type: 'numeric', filterPlaceholder: "Filtrar por Id Cliente", hidden: true, },
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

  useEffect(() => {
    peticionGet();
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

  //modal insertar cliente
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setClienteSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo Cliente</h3>
      <div className="row g-3">
        <div className="col-md-6">
          <TextField className={styles.inputMaterial} label="Codigo" name="codigo" onChange={handleChange} />
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

  const abrirCerrarModalEliminarDet=()=>{
    setModalEditar(!modalEditar);
    setModalEliminarDet(!modalEliminarDet);
  }

  const bodyEditar = (
    <div className={stylesEditarDet.modal}>
      <h3>Editar Cliente</h3>
      <div className="row g-3">
        <div className="col-md-2">
          <TextField className={styles.inputMaterial} label="Codigo" name="codigo" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.codigo} />
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
      <br/>
      <MaterialTable columns={columnasDet} data={dataDet}
            localization={localization}
            actions={[
              {
                icon: () => <AddCircle style={{ fill: "green" }} />,
                tooltip: "Añadir contacto cliente",
                isFreeAction: true,
                onClick: (e, data) => {
                  abrirCerrarModalInsertarDet();
                  console.log(dataDet)
                },
              },
              {
                icon: () => <RemoveCircle style={{ fill: "red" }} />,
                tooltip: "Eliminar contacto cliente",
                onClick: (event, rowData) => {
                  setContactoClienteEliminar(FilasSeleccionadasDet);
                  abrirCerrarModalEliminarDet();
                },
              },
                            
            ]}

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

  const abrirCerrarModalInsertarDet=()=>{
            
    setModalInsertarDet(!modalInsertarDet);
  }

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
    </div>
  );

}

export default Clientes;