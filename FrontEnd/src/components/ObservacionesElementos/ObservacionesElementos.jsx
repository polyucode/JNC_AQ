import React, { useContext, useEffect, useState } from "react";
import "./ObservacionesElementos.css";
import { AuthContext } from "../../context/AuthContext";
import {
  deleteObservacion,
  getObservacionById,
  getObservacionesByElementoId,
  postObservacion,
  putObservacion,
} from "../../api/observacionesElementos";
import { insertarBotonesModal } from "../../helpers/insertarBotonesModal";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { ModalLayout2 } from "../ModalLayout2";
import { ModalLayout } from "../ModalLayout";
import Checkbox from "@mui/material/Checkbox";

export const ObservacionesElementos = ({
  idElemento,
  observaciones,
  setObservaciones,
  observacion,
  setObservacion,
  observacionEditar,
  setObservacionEditar,
}) => {
  const [comentarioEliminar, setComentarioEliminar] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    cargarComentarios();
  }, [idElemento]);

  const cargarComentarios = () => {
    getObservacionesByElementoId(idElemento).then((res) => {
      setObservaciones(res);
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setObservacionEditar({
      id: 0,
      idElemento: 0,
      observacion: "",
      nombreUsuario: "",
      apellidosUsuario: "",
      fecha: null,
      verCliente: true,
      verInsp: true,
    });
  };

  const handleCloseModalEliminar = () => {
    setOpenModalEliminar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (idElemento === 0) {
      console.log("Elija un elemento");
      return;
    }
    if (observacion.observacion === "") {
      return;
    }

    observacion.idElemento = idElemento;
    observacion.nombreUsuario = user.nombre;
    observacion.apellidosUsuario = user.apellidos;
    /* if (user.idPerfil === 2) {
            observacion.verCliente = true
        }

        if(user.idPerfil === 4){
            observacion.verCliente = true
            observacion.verInsp = true
        } */

    observacion.verCliente = true;
    observacion.verInsp = true;

    await postObservacion(observacion);

    setObservacion({
      id: 0,
      idElemento: 0,
      observacion: "",
      nombreUsuario: "",
      apellidosUsuario: "",
      fecha: null,
      verCliente: true,
      verInsp: true,
    });
    cargarComentarios();
  };

  const handleChangeComentario = (e) => {
    const { name, value } = e.target;
    setObservacionEditar((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeCheckbox = (event) => {
    const { name, value, checked } = event.target;
    setObservacion((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleChangeCheckboxEditar = (event) => {
    const { name, value, checked } = event.target;
    setObservacionEditar((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleChangeObservacion = (event) => {
    setObservacion((prevState) => ({
      ...prevState,
      observacion: event.target.value,
    }));
  };

  const editarComentario = async (id) => {
    setOpenModal(true);
    const resp = await getObservacionById(id);
    setObservacionEditar((prev) => ({ ...prev, ...resp }));
  };

  const eliminarComentario = async (id) => {
    setOpenModalEliminar(true);
    const resp = await getObservacionById(id);
    setComentarioEliminar((prev) => ({ ...prev, ...resp }));
  };

  const peticionPutComentario = async () => {
    observacionEditar.verCliente = true;
    observacionEditar.verInsp = true;
    const resp = await putObservacion(observacionEditar);

    cargarComentarios();

    Swal.fire({
      position: "center",
      icon: "info",
      title: "Observación Modificada",
      text: `La observación se ha modificado correctamente`,
      showConfirmButton: false,
      timer: 2000,
      showClass: {
        popup: "animate__animated animate__bounceIn",
      },
      hideClass: {
        popup: "animate__animated animate__bounceOut",
      },
    });
  };

  const peticionDeleteComentario = async () => {
    const resp = await deleteObservacion(comentarioEliminar.id);

    cargarComentarios();
    handleCloseModalEliminar();

    Swal.fire({
      position: "center",
      icon: "info",
      title: "Observación Eliminada",
      text: `La observación se ha eliminado correctamente`,
      showConfirmButton: false,
      timer: 2000,
      showClass: {
        popup: "animate__animated animate__bounceIn",
      },
      hideClass: {
        popup: "animate__animated animate__bounceOut",
      },
    });
  };

  if (user.idPerfil !== 2 && user.idPerfil !== 4) {
    return (
      <>
        <div>
          <p>Registro de Incidencias</p>
          <div className="comentarios-elementos-contenedor">
            <div className="comentario-escrito">
              <form onSubmit={handleSubmit} style={{ width: "90%" }}>
                <input
                  type="text"
                  className="observacion-escrita"
                  value={observacion && observacion.observacion}
                  onChange={handleChangeObservacion}
                  placeholder="Introduzca observación + Enter"
                ></input>
                {/* <button type='submit' className='boton-guardar'>Guardar</button> */}
              </form>
              <div className="checkboxes">
                <FormControlLabel
                  control={<Checkbox disabled />}
                  label="Ver Cliente"
                  name="verCliente"
                  checked={observacion.verCliente}
                  onChange={handleChangeCheckbox}
                />
                <FormControlLabel
                  control={<Checkbox disabled />}
                  label="Ver Inspector"
                  name="verInsp"
                  checked={observacion.verInsp}
                  onChange={handleChangeCheckbox}
                />
              </div>
            </div>
            {observaciones.map((comentario) => {
              if (
                user.nombre === comentario.nombreUsuario &&
                user.apellidos === comentario.apellidosUsuario
              ) {
                let fechaMostrar = new Date(comentario.fecha);
                let fechaString = fechaMostrar.toLocaleDateString();
                return (
                  <div key={comentario.id}>
                    <h4>
                      {comentario.nombreUsuario +
                        " " +
                        comentario.apellidosUsuario +
                        " " +
                        fechaString}
                      <EditIcon
                        style={{ cursor: "pointer", marginLeft: "5px" }}
                        onClick={() => editarComentario(comentario.id)}
                      />
                      <DeleteIcon
                        style={{ cursor: "pointer", marginLeft: "5px" }}
                        onClick={() => eliminarComentario(comentario.id)}
                      />
                    </h4>
                    <p key={comentario.id}>{comentario.observacion}</p>
                  </div>
                );
              } else {
                let fechaMostrar = new Date(comentario.fecha);
                let fechaString = fechaMostrar.toLocaleDateString();
                return (
                  <div key={comentario.id}>
                    <h4>
                      {comentario.nombreUsuario +
                        " " +
                        comentario.apellidosUsuario +
                        " " +
                        fechaString}
                    </h4>
                    <p key={comentario.id}>{comentario.observacion}</p>
                  </div>
                );
              }
            })}
          </div>
        </div>

        <ModalLayout
          titulo="Editar Incidencia"
          contenido={
            <Grid item xs={12}>
              <Grid container sx={{ textAlign: "center", pb: 2 }}>
                <Grid item xs={12}>
                  <TextField
                    sx={{ width: "100%", marginBottom: "15px" }}
                    name="observacion"
                    value={observacionEditar && observacionEditar.observacion}
                    onChange={handleChangeComentario}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControlLabel
                    control={<Checkbox disabled />}
                    label="Ver Cliente"
                    name="verCliente"
                    checked={observacionEditar.verCliente}
                    onChange={handleChangeCheckboxEditar}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControlLabel
                    control={<Checkbox disabled />}
                    label="Ver Inspector"
                    name="verInsp"
                    checked={observacionEditar.verInsp}
                    onChange={handleChangeCheckboxEditar}
                  />
                </Grid>
              </Grid>
            </Grid>
          }
          botones={[
            insertarBotonesModal(<AddIcon />, "Guardar", async () => {
              peticionPutComentario();
            }),
          ]}
          open={openModal}
          onClose={handleCloseModal}
        />

        <ModalLayout
          titulo="Eliminar Incidencia"
          contenido={
            <>
              <Grid item xs={12}>
                <Typography>
                  Estás seguro que deseas eliminar esta incidencia?
                </Typography>
              </Grid>
            </>
          }
          botones={[
            insertarBotonesModal(
              <DeleteIcon />,
              "Eliminar",
              async () => {
                peticionDeleteComentario();
              },
              "error"
            ),
          ]}
          open={openModalEliminar}
          onClose={handleCloseModalEliminar}
        />
      </>
    );
  } else if (user.idPerfil === 2) {
    return (
      <>
        <div>
          <p>Registro de Incidencias</p>
          <div className="comentarios-elementos-contenedor">
            <div className="comentario-escrito">
              <form onSubmit={handleSubmit} style={{ width: "90%" }}>
                <input
                  type="text"
                  className="observacion-escrita"
                  value={observacion && observacion.observacion}
                  onChange={handleChangeObservacion}
                  placeholder="Introduzca observación + Enter"
                ></input>
              </form>
              <div className="checkboxes">
                <FormControlLabel
                  control={<Checkbox disabled />}
                  label="Ver Inspector"
                  name="verInsp"
                  checked={observacion.verInsp}
                  onChange={handleChangeCheckbox}
                />
              </div>
            </div>
            {observaciones.map((comentario) => {
              if (comentario.verCliente === true) {
                if (
                  user.nombre === comentario.nombreUsuario &&
                  user.apellidos === comentario.apellidosUsuario
                ) {
                  let fechaMostrar = new Date(comentario.fecha);
                  let fechaString = fechaMostrar.toLocaleDateString();
                  return (
                    <div key={comentario.id}>
                      <h4>
                        {comentario.nombreUsuario +
                          " " +
                          comentario.apellidosUsuario +
                          " " +
                          fechaString}
                        <EditIcon
                          style={{ cursor: "pointer", marginLeft: "5px" }}
                          onClick={() => editarComentario(comentario.id)}
                        />
                        <DeleteIcon
                          style={{ cursor: "pointer", marginLeft: "5px" }}
                          onClick={() => eliminarComentario(comentario.id)}
                        />
                      </h4>
                      <p key={comentario.id}>{comentario.observacion}</p>
                    </div>
                  );
                } else {
                  let fechaMostrar = new Date(comentario.fecha);
                  let fechaString = fechaMostrar.toLocaleDateString();
                  return (
                    <div key={comentario.id}>
                      <h4>
                        {comentario.nombreUsuario +
                          " " +
                          comentario.apellidosUsuario +
                          " " +
                          fechaString}
                      </h4>
                      <p key={comentario.id}>{comentario.observacion}</p>
                    </div>
                  );
                }
              }
            })}
          </div>
        </div>

        <ModalLayout
          titulo="Editar Incidencia"
          contenido={
            <Grid item xs={12}>
              <Grid container sx={{ textAlign: "center", pb: 2 }}>
                <Grid item xs={12}>
                  <TextField
                    sx={{ width: "100%", marginBottom: "15px" }}
                    name="observacion"
                    value={observacionEditar && observacionEditar.observacion}
                    onChange={handleChangeComentario}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControlLabel
                    control={<Checkbox disabled />}
                    label="Ver Inspector"
                    name="verInsp"
                    checked={observacionEditar.verInsp}
                    onChange={handleChangeCheckboxEditar}
                  />
                </Grid>
              </Grid>
            </Grid>
          }
          botones={[
            insertarBotonesModal(<AddIcon />, "Guardar", async () => {
              peticionPutComentario();
            }),
          ]}
          open={openModal}
          onClose={handleCloseModal}
        />

        <ModalLayout
          titulo="Eliminar Incidencia"
          contenido={
            <>
              <Grid item xs={12}>
                <Typography>
                  Estás seguro que deseas eliminar esta incidencia?
                </Typography>
              </Grid>
            </>
          }
          botones={[
            insertarBotonesModal(
              <DeleteIcon />,
              "Eliminar",
              async () => {
                peticionDeleteComentario();
              },
              "error"
            ),
          ]}
          open={openModalEliminar}
          onClose={handleCloseModalEliminar}
        />
      </>
    );
  } else {
    return (
      <>
        <div>
          <p>Registro de Incidencias</p>
          <div className="comentarios-elementos-contenedor">
            <div className="comentario-escrito">
              <form onSubmit={handleSubmit} style={{ width: "90%" }}>
                <input
                  type="text"
                  className="observacion-escrita"
                  value={observacion && observacion.observacion}
                  onChange={handleChangeObservacion}
                  placeholder="Introduzca observación + Enter"
                ></input>
              </form>
            </div>
            {observaciones.map((comentario) => {
              if (comentario.verInsp === true) {
                if (
                  user.nombre === comentario.nombreUsuario &&
                  user.apellidos === comentario.apellidosUsuario
                ) {
                  let fechaMostrar = new Date(comentario.fecha);
                  let fechaString = fechaMostrar.toLocaleDateString();
                  return (
                    <div key={comentario.id}>
                      <h4>
                        {comentario.nombreUsuario +
                          " " +
                          comentario.apellidosUsuario +
                          " " +
                          fechaString}
                        <EditIcon
                          style={{ cursor: "pointer", marginLeft: "5px" }}
                          onClick={() => editarComentario(comentario.id)}
                        />
                        <DeleteIcon
                          style={{ cursor: "pointer", marginLeft: "5px" }}
                          onClick={() => eliminarComentario(comentario.id)}
                        />
                      </h4>
                      <p key={comentario.id}>{comentario.observacion}</p>
                    </div>
                  );
                } else {
                  let fechaMostrar = new Date(comentario.fecha);
                  let fechaString = fechaMostrar.toLocaleDateString();
                  return (
                    <div key={comentario.id}>
                      <h4>
                        {comentario.nombreUsuario +
                          " " +
                          comentario.apellidosUsuario +
                          " " +
                          fechaString}
                      </h4>
                      <p key={comentario.id}>{comentario.observacion}</p>
                    </div>
                  );
                }
              }
            })}
          </div>
        </div>

        <ModalLayout
          titulo="Editar Incidencia"
          contenido={
            <Grid item xs={12}>
              <Grid container sx={{ textAlign: "center", pb: 2 }}>
                <Grid item xs={12}>
                  <TextField
                    sx={{ width: "100%", marginBottom: "15px" }}
                    name="observacion"
                    value={observacionEditar && observacionEditar.observacion}
                    onChange={handleChangeComentario}
                  />
                </Grid>
                {/* <Grid item xs={3}>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="Ver Cliente"
                                        name="verCliente"
                                        checked={observacionEditar.verCliente}
                                        onChange={handleChangeCheckboxEditar}
                                    />
                                </Grid> */}
                {/* <Grid item xs={3}>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="Ver Inspector"
                                        name="verInsp"
                                        checked={observacionEditar.verInsp}
                                        onChange={handleChangeCheckboxEditar}
                                    />
                                </Grid> */}
              </Grid>
            </Grid>
          }
          botones={[
            insertarBotonesModal(<AddIcon />, "Guardar", async () => {
              peticionPutComentario();
            }),
          ]}
          open={openModal}
          onClose={handleCloseModal}
        />

        <ModalLayout
          titulo="Eliminar Incidencia"
          contenido={
            <>
              <Grid item xs={12}>
                <Typography>
                  Estás seguro que deseas eliminar esta incidencia?
                </Typography>
              </Grid>
            </>
          }
          botones={[
            insertarBotonesModal(
              <DeleteIcon />,
              "Eliminar",
              async () => {
                peticionDeleteComentario();
              },
              "error"
            ),
          ]}
          open={openModalEliminar}
          onClose={handleCloseModalEliminar}
        />
      </>
    );
  }
};
