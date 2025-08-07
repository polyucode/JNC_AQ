import React, { useState, useEffect, useContext } from "react";
import { Grid, Card, Typography, Button } from '@mui/material';
import { MainLayout } from "../layout/MainLayout";
import { ModalLayout } from "../components/ModalLayout";
import { insertarBotonesModal } from "../helpers/insertarBotonesModal";

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { DataGrid } from '@mui/x-data-grid';
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';
import { getParametros } from "../api";

import Swal from 'sweetalert2';
import { InsertarParametroModal } from "../components/Modals/InsertarParametroModal";
import { EditarParametroModal } from "../components/Modals/EditarParametroModal";
import { getParametrosById, postParametros, putParametros } from "../api/parametros";

import { ModalLayout2 } from "../components/ModalLayout2";
import { AuthContext } from "../context/AuthContext";

export const ParametrosPage = () => {

  //variables
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [ParametroEliminar, setParametroEliminar] = useState([]);

  const [rowsIds, setRowsIds] = useState([]);
  const [rows, setRows] = useState([]);

  const [errorUnidad, setErrorUnidad] = useState(false);
  const [errorNombre, setErrorNombre] = useState(false);
  const [errorNombreRepetido, setErrorNombreRepetido] = useState(false);

  const [parametros, setParametros] = useState([]);

  const [parametroSeleccionado, setParametroSeleccionado] = useState({
    id: 0,
    nombre: '',
    unidad: '',
    esCalculado: false,
    parametrosCalculo: '',
    idParametroCalculado: -1,
    addDate: null,
    addIdUser: null,
    modDate: null,
    modIdUser: null,
    delDate: null,
    delIdUser: null,
    deleted: null,
  });

  const { user } = useContext(AuthContext);

  const columns = [
    //visibles
    { headerName: 'Nombre', field: 'nombre', width: 750 },
    { headerName: 'Unidad', field: 'unidad', width: 500 },
  ];

  //peticiones API
  const GetParametros = async () => {

    const resp = await getParametros();
    const parametrosFiltrados = resp.filter(param => !param.deleted)
    setParametros(parametrosFiltrados);

  }

  // Sirve como el componentDidMount, inicia los metodos cuando entra en la página
  useEffect(() => {
    GetParametros();
  }, [])

  useEffect(() => {

    if (parametros.length > 0) {
      setRows(parametros);
    } else {
      setRows([])
    }

  }, [parametros]);

  //Insertar usuario
  const peticionPost = async () => {

    const nombreRepetido = parametros.filter(param => param.nombre === parametroSeleccionado.nombre && !param.deleted)

    if (nombreRepetido.length > 0) {
      setErrorNombreRepetido(true)
    } else {
      setErrorNombreRepetido(false)
    }

    if (parametroSeleccionado.nombre != "") {
      setErrorNombre(false)
    } else {
      setErrorNombre(true)
    }

    if (parametroSeleccionado.unidad != "") {
      setErrorUnidad(false)
    } else {
      setErrorUnidad(true)
    }

    if (parametroSeleccionado.unidad != "" && parametroSeleccionado.nombre != "" && nombreRepetido.length === 0) {
      setErrorUnidad(false)
      setErrorNombre(false)
      setErrorNombreRepetido(false)

      parametroSeleccionado.id = 0;

      const resp = await postParametros(parametroSeleccionado);

      GetParametros();

      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Parámetro Creado',
        text: `El parámetro se ha creado correctamente`,
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

    const nombreRepetido = parametros.filter(param => param.nombre === parametroSeleccionado.nombre && param.id !== parametroSeleccionado.id && !param.deleted)

    if (nombreRepetido.length > 0) {
      setErrorNombreRepetido(true)
    } else {
      setErrorNombreRepetido(false)
    }

    if (parametroSeleccionado.nombre != "") {
      setErrorNombre(false)
    } else {
      setErrorNombre(true)
    }

    if (parametroSeleccionado.unidad != "") {
      setErrorUnidad(false)
    } else {
      setErrorUnidad(true)
    }

    if (parametroSeleccionado.nombre != "" && parametroSeleccionado.unidad != "" && nombreRepetido.length === 0) {
      setErrorUnidad(false)
      setErrorNombre(false)
      setErrorNombreRepetido(false)

      var parametroModificado = parametros;
      parametroModificado.map(parametro => {
        if (parametro.id === parametroSeleccionado.id) {
          parametro = parametroSeleccionado
        }
      });

      await putParametros(parametroSeleccionado);

      GetParametros();

      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Parámetro Editado',
        text: `El parámetro se ha editado correctamente`,
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
    while (i < ParametroEliminar.length) {

      const resp = await getParametrosById(ParametroEliminar[i]);

      resp.deleted = true;

      await putParametros(resp);

      GetParametros();
      abrirCerrarModalEliminar();
      setParametroSeleccionado({
        id: 0,
        nombre: '',
        unidad: '',
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
      title: 'Parámetro Eliminado',
      text: `El parámetro se ha eliminado correctamente`,
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
    if (modalInsertar) {
      setParametroSeleccionado({
        id: 0,
        nombre: '',
        unidad: '',
        esCalculado: false,
        parametrosCalculo: '',
        idParametroCalculado: -1,
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
      setParametroSeleccionado({
        id: 0,
        nombre: '',
        unidad: '',
        esCalculado: false,
        parametrosCalculo: '',
        idParametroCalculado: -1,
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
      setParametroSeleccionado({
        id: 0,
        nombre: '',
        unidad: '',
        esCalculado: false,
        parametrosCalculo: '',
        idParametroCalculado: -1,
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


  const handleChange = (e) => {

    const { name, value } = e.target;
    setParametroSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSelectRow = (ids) => {

    if (ids.length > 0) {
      setParametroSeleccionado(parametros.filter(parametro => parametro.id === ids[0])[0]);
    } else {
      setParametroSeleccionado(parametroSeleccionado);
    }
    setRowsIds(ids);
  }

  return (
    <>
      {user.idPerfil === 1 ?
        <MainLayout title='Parámetros'>
          <div>
            <Grid container spacing={2}>

              {/* Título y botones de opción */}
              <Grid item xs={12}>
                <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='h6'>Listado de Parámetros</Typography>
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
                              setParametroEliminar(rowsIds)
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
                  onRowClick={(parametroSeleccionado, evt) => {
                    setParametroSeleccionado(parametroSeleccionado.row)
                    abrirCerrarModalEditar();
                  }}
                />
              </Card>
            </Grid>

            <ModalLayout
              titulo="Agregar nuevo parámetro"
              contenido={
                <InsertarParametroModal
                  handleChange={handleChange}
                  errorNombre={errorNombre}
                  errorUnidad={errorUnidad}
                  errorNombreRepetido={errorNombreRepetido}
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
              titulo="Editar Parámetro"
              contenido={
                <EditarParametroModal
                  parametroSeleccionado={parametroSeleccionado}
                  handleChange={handleChange}
                  errorNombre={errorNombre}
                  errorUnidad={errorUnidad}
                  errorNombreRepetido={errorNombreRepetido}
                />}
              botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                peticionPut();
              })]}
              open={modalEditar}
              onClose={abrirCerrarModalEditar}
            />

            <ModalLayout
              titulo="Eliminar Parámetro"
              contenido={
                <>
                  <Grid item xs={12}>
                    <Typography>Estás seguro que deseas eliminar el parámetro?</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography><b>{parametroSeleccionado.nombre}</b></Typography>
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
        <MainLayout title='Parametros'>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='h6'>Listado de Parámetros</Typography>
                </Card>
              </Grid>
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
                  rows={rows}
                  columns={columns}
                  onSelectionModelChange={(ids) => handleSelectRow(ids)}
                  onRowClick={(parametroSeleccionado, evt) => {
                    setParametroSeleccionado(parametroSeleccionado.row)
                    abrirCerrarModalEditar();
                  }}
                />
              </Card>
            </Grid>

            <ModalLayout2
              titulo="Editar Parámetro"
              contenido={
                <EditarParametroModal
                  parametroSeleccionado={parametroSeleccionado}
                  handleChange={handleChange}
                  errorNombre={errorNombre}
                  errorUnidad={errorUnidad}
                  errorNombreRepetido={errorNombreRepetido}
                />}
              botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                peticionPut();
              })]}
              open={modalEditar}
              onClose={abrirCerrarModalEditar}
            />
          </div>
        </MainLayout>
      }
    </>
  );
}