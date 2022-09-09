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

function Usuarios() {

  //variables
  const [modalInsertar, setModalInsertar] = useState(false);

  const [modalEditar, setModalEditar] = useState(false);

  const [modalEliminar, setModalEliminar] = useState(false);

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
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
    codigoOperario: 0,
    addDate: null,
    addIdUser: null,
    modDate: null,
    modIdUser: null,
    delDate: null,
    delIdUser: null,
    deleted: null,
  });

  const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);

  const [perfilUsuarioEditar, setperfilUsuarioEditar] = useState([]);

  const [clienteUsuarioEditar, setclienteUsuarioEditar] = useState([]);

  const [UsuarioEliminar, setUsuarioEliminar] = useState([]);

  const [data, setData] = useState([]);

  const [perfiles, setPerfiles] = useState([]);

  const [clientes, setClientes] = useState([]);

  const [clientesTable, setClientesTable] = useState({});

  const styles = useStyles();

  const [estadoCboCliente, setestadoCboCliente] = useState(true);

  const [estadoCodigoOperario, setEstadoCodigoOperario] = useState(true);



  const columnas = [
    //visibles
    { title: 'Nombre', field: 'nombre', filterPlaceholder: "Filtrar por nombre" },
    { title: 'Apellidos', field: 'apellidos', filterPlaceholder: "Filtrar por apellidos" },
    { title: 'Telefono', field: 'telefono', filterPlaceholder: "Filtrar por Telefono" },
    { title: 'Usuario', field: 'usuario', filterPlaceholder: "Filtrar por usuario" },
    { title: 'Activo', field: 'activo', type: 'boolean', filterPlaceholder: "Filtrar por activo" },
    { title: 'Firma', field: 'firma', filtering: false },
    { title: 'Perfil', field: 'idPerfil', lookup: { 1: "Administrador", 2: "Cliente", 3: "Informador", 4: "Inspector", 1004: "Técnico" }, filterPlaceholder: "Filtrar por perfil" },
    { title: 'Codigo Operario', field: 'codigoOperario', filterPlaceholder: "Filtrar por codigo Operario" },
    { title: 'Cliente', field: 'idCliente', lookup: clientesTable },

    //Ocultas
    { title: 'Fecha creación', field: 'addDate', type: 'date', filterPlaceholder: "Filtrar por fecah creacion", hidden: true },
    { title: 'Usuario creación', field: 'AddIdUser', type: 'numeric', filterPlaceholder: "Filtrar por Usuario creación", hidden: true },
    { title: 'Fecha eliminación', field: 'delDate', type: 'date', filterPlaceholder: "Filtrar por Fecha eliminación", hidden: true },
    { title: 'Usuario eliminación', field: 'delIdUser', type: 'numeric', filterPlaceholder: "Filtrar por Usuario eliminación", hidden: true },

    { title: 'Eliminado', field: 'deleted', type: 'boolean', filterPlaceholder: "Filtrar por Eliminado", hidden: true },
    { title: 'Id', field: 'id', type: 'numeric', filterPlaceholder: "Filtrar por Id", hidden: true, },
    { title: 'Login', field: 'login', filterPlaceholder: "Filtrar por Login", hidden: true },

    { title: 'Fecha modificación', field: 'modDate', type: 'date', filterPlaceholder: "Filtrar por Fecha modificación", hidden: true },
    { title: 'Usuario modificacion', field: 'modIdUser', type: 'numeric', filterPlaceholder: "Filtrar por Usuario modificacion", hidden: true },

  ];

  //peticiones API
  const GetClientes = async () => {
    axios.get("http://172.26.0.169:44343/api/cliente", token).then(response => {
      const clientes = Object.entries(response.data.data).map(([key, value]) => (key, value))
      setClientes(clientes);
    }, [])
  }

  const GetPerfiles = async () => {
    axios.get("http://172.26.0.169:44343/api/perfil", token).then(response => {
      const perfil = Object.entries(response.data.data).map(([key, value]) => (key, value))
      setPerfiles(perfil);
    }, [])
  }

  // Recoger Usuarios
  const peticionGet = async () => {
    axios.get("http://172.26.0.169:44343/api/usuario", token).then(response => {
      for (let i = 0; i < response.data.data.length; i++) {
        if (response.data.data[i].firma) {
          let firmaB64 = response.data.data[i].firma;
          response.data.data[i].firma = <img height="58px" src={firmaB64} />;
        }
      }
      setData(response.data.data)
    })
  }

  // Sirve como el componentDidMount, inicia los metodos cuando entra en la página
  useEffect(() => {
    peticionGet();
    GetPerfiles();
    GetClientes();
  }, [])

  useEffect(() => {

    const lookupClientes = {};
    clientes.map(fila => lookupClientes[fila.id] = fila.razonSocial);
    setClientesTable(lookupClientes);

  }, [clientes])

  /*useEffect(() => {
    setUsuarioSeleccionado({
      ...usuarioSeleccionado,
      codigoOperario: '',
      idCliente: ''
    })
  }, [usuarioSeleccionado.idPerfil])*/

  //Insertar usuario
  const peticionPost = async () => {
    usuarioSeleccionado.id = null;
    await axios.post("http://172.26.0.169:44343/api/usuario", usuarioSeleccionado, token)
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
          codigoOperario: 0,
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
    await axios.put("http://172.26.0.169:44343/api/usuario?id=" + usuarioSeleccionado.id, usuarioSeleccionado, token)
      .then(response => {
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
          codigoOperario: 0,
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
    while (i < UsuarioEliminar.length) {
      await axios.delete("http://172.26.0.169:44343/api/usuario/" + UsuarioEliminar[i].id, token)
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
            codigoOperario: 0,
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
    setModalInsertar(!modalInsertar);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setUsuarioSeleccionado(prevState => ({
      ...prevState,
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    }));
  }

  const handleChangeCheckbox = e => {
    const { name, value, checked } = e.target
    setUsuarioSeleccionado(prevState => ({
      ...prevState,
      [name]: checked
    }))
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

    if (value.id === 1004) {
      setEstadoCodigoOperario(false)
    } else {
      setEstadoCodigoOperario(true)
    }
  }

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo Usuario</h3>
      <br />
      <div className="row g-4">
        <div className="col-md-6">
          <h5> Nombre </h5>
          <TextField className={styles.inputMaterial} name="nombre" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <h5> Apellidos </h5>
          <TextField className={styles.inputMaterial} name="apellidos" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <h5> Telefono </h5>
          <TextField className={styles.inputMaterial} name="telefono" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <h5> Usuario </h5>
          <TextField className={styles.inputMaterial} name="usuario" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <h5> Contraseña </h5>
          <TextField className={styles.inputMaterial} type="password" name="password" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <h5> Repetir Contraseña </h5>
          <TextField className={styles.inputMaterial} type="password" name="repetir_contraseña" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} label="Activo" name="activo" checked={usuarioSeleccionado.activo} onChange={handleChangeCheckbox} />
        </div>
        <div className="col-md-6">
          <h5> Perfil </h5>
          <Autocomplete
            disableClearable={true}
            id="CboPerfiles"
            options={perfiles}
            getOptionLabel={option => option.nombre}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="idPerfil" />}
            onChange={handleChangePerfil}
          />
        </div>
        <div className="col-md-6">
          <h5> Codigo Operario </h5>
          <TextField disabled={estadoCodigoOperario} className={styles.inputMaterial} type="number" name="codigoOperario" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <h5> Cliente </h5>
          <Autocomplete
            disableClearable={true}
            disabled={estadoCboCliente}
            id="CboClientes"
            options={clientes}
            getOptionLabel={option => option.razonSocial}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="idCliente" />}
            onChange={(event, value) => setUsuarioSeleccionado(prevState => ({
              ...prevState,
              idCliente: value.id
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

  //modal editar usuario

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  // Cuadro de editar usuario
  const bodyEditar = (
    <div className={styles.modal}>
      <h3> Usuario </h3>
      <br />
      <div className="row g-4">
        <div className="col-md-6">
          <h5> Nombre </h5>
          <TextField className={styles.inputMaterial} name="nombre" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.nombre} />
        </div>
        <div className="col-md-6">
          <h5> Apellidos </h5>
          <TextField className={styles.inputMaterial} name="apellidos" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.apellidos} />
        </div>
        <div className="col-md-6">
          <h5> Telefono </h5>
          <TextField className={styles.inputMaterial} name="telefono" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.telefono} />
        </div>
        <div className="col-md-6">
          <h5> Usuario </h5>
          <TextField className={styles.inputMaterial} name="usuario" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.usuario} />
        </div>
        <div className="col-md-6">
          <FormControlLabel control={<Checkbox />} className={styles.inputMaterial} label="Activo" name="activo" checked={usuarioSeleccionado.activo} onChange={handleChangeCheckbox} />
        </div>
        <div className="col-md-6">
          <h5> Perfil </h5>
          <Autocomplete
            disableClearable={true}
            id="CboPerfiles"
            options={perfiles}
            defaultValue={perfilUsuarioEditar[0]}
            getOptionLabel={option => option.nombre}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="idPerfil" />}
            onChange={handleChangePerfil}
          />
        </div>
        <div className="col-md-6">
          <h5> Codigo Operario </h5>
          <TextField disabled={estadoCodigoOperario} className={styles.inputMaterial} type="number" name="codigoOperario" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.codigoOperario} />
        </div>
        <div className="col-md-6">
          <h5> Cliente </h5>
          <Autocomplete
            disableClearable={true}
            disabled={estadoCboCliente}
            id="CboClientes"
            options={clientes}
            inputValue={usuarioSeleccionado.idCliente}
            defaultValue={clienteUsuarioEditar[0]}
            getOptionLabel={option => option.razonSocial}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="idCliente" />}
            onChange={(event, value) => setUsuarioSeleccionado(prevState => ({
              ...prevState,
              idCliente: value.id
            }))}
          />
        </div>
      </div>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>Guardar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  //modal eliminar usuario
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const bodyEliminar = (
    <div className={styles.modal}>
      <h5>Estás seguro que deseas eliminar el usuario ? </h5>
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
            tooltip: "Añadir Usuario",
            isFreeAction: true,
            onClick: (e, data) => {
              abrirCerrarModalInsertar()
            },
          },
          {
            icon: () => <RemoveCircle style={{ fill: "red" }} />,
            tooltip: "Eliminar Usuario",
            onClick: (event, rowData) => {
              setUsuarioEliminar(FilasSeleccionadas);
              abrirCerrarModalEliminar()
            },
          },
          {
            icon: () => <Edit />,
            tooltip: "Editar Usuario",
            onClick: (e, data) => {
              setperfilUsuarioEditar(perfiles.filter(perfil => perfil.id === FilasSeleccionadas[0].idPerfil));
              setclienteUsuarioEditar(clientes.filter(cliente => cliente.razonSocial === FilasSeleccionadas[0].cliente))
              abrirCerrarModalEditar();
            },
          },
        ]}

        onRowClick={((evt, usuarioSeleccionado) => {
          setUsuarioSeleccionado(usuarioSeleccionado)
          setperfilUsuarioEditar(perfiles.filter(perfil => perfil.id === usuarioSeleccionado.idPerfil));
          setclienteUsuarioEditar(clientes.filter(cliente => cliente.id === usuarioSeleccionado.idCliente))
          abrirCerrarModalEditar();
        })}
        onSelectionChange={(filas) => {
          setFilasSeleccionadas(filas);
          if (filas.length > 0)
            setUsuarioSeleccionado(filas[0]);
        }
        }
        options={{
          sorting: true, paging: true, pageSizeOptions: [5, 10, 20, 50, 100, 200], pageSize: 10, filtering: true, search: false, selection: true,
          columnsButton: true, showSelectAllCheckbox: false,
          rowStyle: rowData => ({
            backgroundColor: (usuarioSeleccionado === rowData.tableData.id) ? '#EEE' : '#FFF',
            whiteSpace: "nowrap"
          }),

          exportMenu: [{
            label: 'Export PDF',
            exportFunc: (cols, datas) => ExportPdf(cols, data, 'Listado de Usuarios')
          }, {
            label: 'Export CSV',
            exportFunc: (cols, datas) => ExportCsv(cols, data, 'Listado de Usuarios')
          }]
        }}

        title="Listado de usuarios"
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

export default Usuarios;