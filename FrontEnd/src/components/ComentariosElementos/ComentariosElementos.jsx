import React, { useContext, useEffect, useState } from 'react'
import './ComentariosElementos.css'
import { AuthContext } from '../../context/AuthContext';
import { deleteComentario, getComentarioById, getComentariosByElementoId, getComentariosByTareaId, postComentario, putComentario } from '../../api/comentariosElementos';
import { ModalLayout2 } from '../ModalLayout2';
import { Grid, TextField, Typography } from '@mui/material';
import { insertarBotonesModal } from '../../helpers/insertarBotonesModal';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { ModalLayout } from '../ModalLayout';
import { getParametrosAnalisisPlanta } from '../../api';
import { getFiles } from '../../api/files';


export const ComentariosElementos = ({ idTarea, idElemento, idAnalisis, nombreAnalisis }) => {

    const [comentarios, setComentarios] = useState([]);
    const [comentarioEscrito, setComentarioEscrito] = useState('');
    const [comentarioEditar, setComentarioEditar] = useState([]);
    const [comentarioEliminar, setComentarioEliminar] = useState([]);
    const [archivos, setArchivos] = useState([]);
    const [archivosTarea, setArchivosTarea] = useState([]);
    const [tareasAnalisis, setTareasAnalisis] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const [openModalEliminar, setOpenModalEliminar] = useState(false);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        getFiles()
            .then(resp => setArchivos(resp.filter(archivo => archivo.idTareaAnalisis === idTarea && !archivo.deleted)))

        if(idTarea != undefined){
            cargarComentarios();
        } else{
            cargarComentariosElemento();
        }
    }, [idTarea, idElemento])

    const cargarComentarios = () => {
        getComentariosByTareaId(idTarea).then(res => {
            setComentarios(res);
        })
    }

    const cargarComentariosElemento = () => {
        getComentariosByElementoId(idElemento).then(res => {
            setComentarios(res);
        })
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleCloseModalEliminar = () => {
        setOpenModalEliminar(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (idElemento === 0) {
            return;
        }
        if (idTarea === 0) {
            return;
        }
        if (comentarioEscrito === '') {
            return;
        }

        if (idAnalisis === undefined || nombreAnalisis === undefined) {
            return;
        }

        const comentario = {
            idElemento: idElemento,
            idTarea: idTarea,
            comentario: comentarioEscrito,
            nombreUsuario: user.nombre,
            apellidosUsuario: user.apellidos,
            nombreAnalisis: nombreAnalisis,
            idAnalisis: idAnalisis
        }

        await postComentario(comentario);


        setComentarioEscrito('');
        cargarComentarios();
    }
    const handleChange = (event) => {
        setComentarioEscrito(event.target.value);
    }

    const handleChangeComentario = (e) => {
        const { name, value } = e.target;
        setComentarioEditar(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const editarComentario = async (id) => {
        setOpenModal(true)
        const resp = await getComentarioById(id)
        setComentarioEditar(prev => ({ ...prev, ...resp }))
    };

    const eliminarComentario = async (id) => {
        setOpenModalEliminar(true)
        const resp = await getComentarioById(id)
        setComentarioEliminar(prev => ({ ...prev, ...resp }))
    };

    const peticionPutComentario = async () => {

        const resp = await putComentario(comentarioEditar)

        cargarComentarios()

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Comentario Modificado',
            text: `El comentario se ha modificado correctamente`,
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

    const peticionDeleteComentario = async () => {

        const resp = await deleteComentario(comentarioEliminar.id)

        cargarComentarios()
        handleCloseModalEliminar()

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Comentario Eliminado',
            text: `El comentario se ha eliminado correctamente`,
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

    return (
        <>

            <div>
                <p>Comentarios Informes Fisico-Químico</p>
                <div className='comentarios-elementos-contenedor'>
                    <div className='comentario-escrito2'>
                        {
                            comentarios.length > archivos.length ?
                                <form onSubmit={handleSubmit}>
                                    <input disabled type='text' className='observacion-escrita2' value={comentarioEscrito} onChange={handleChange}
                                        placeholder='Introduzca comentario + Enter'></input>
                                </form>
                                :
                                <form onSubmit={handleSubmit}>
                                    <input type='text' className='observacion-escrita2' value={comentarioEscrito} onChange={handleChange}
                                        placeholder='Introduzca comentario + Enter'></input>
                                </form>
                        }
                    </div>
                    {
                        comentarios.map((comentario) => {
                            if (user.nombre === comentario.nombreUsuario && user.apellidos === comentario.apellidosUsuario) {
                                let fechaMostrar = new Date(comentario.fecha);
                                let fechaString = fechaMostrar.toLocaleDateString();
                                const nombreArchivo = archivos.filter(archivo => archivo.idComentario === comentario.id)[0]
                                return (
                                    <div key={comentario.id}>
                                        <h4>
                                            {comentario.nombreUsuario + ' ' + comentario.apellidosUsuario + ' ' + fechaString + ' ' + comentario.nombreAnalisis + ' - ' + (nombreArchivo ? nombreArchivo.name : '')}
                                            <EditIcon
                                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                                                onClick={() => editarComentario(comentario.id)}
                                            />
                                            <DeleteIcon
                                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                                                onClick={() => eliminarComentario(comentario.id)}
                                            />
                                        </h4>
                                        <p key={comentario.id}>{comentario.comentario}</p>
                                    </div>
                                )
                            } else {
                                let fechaMostrar = new Date(comentario.fecha);
                                let fechaString = fechaMostrar.toLocaleDateString();
                                const nombreArchivo = archivos.filter(archivo => archivo.idComentario === comentario.id)[0]
                                return (
                                    <div key={comentario.id}>
                                        <h4>{comentario.nombreUsuario + ' ' + comentario.apellidosUsuario + ' ' + fechaString + ' ' + comentario.nombreAnalisis + ' - ' + (nombreArchivo ? nombreArchivo.name : '')}</h4>
                                        <p key={comentario.id}>{comentario.comentario}</p>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>

            <ModalLayout
                titulo="Editar Comentario"
                contenido={
                    <Grid item xs={12}>
                        <Grid container sx={{ textAlign: 'center', pb: 2 }}>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    name="comentario"
                                    value={comentarioEditar && comentarioEditar.comentario}
                                    onChange={handleChangeComentario}
                                />
                            </Grid>
                        </Grid>

                    </Grid>
                }
                botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                    peticionPutComentario();
                })
                ]}
                open={openModal}
                onClose={handleCloseModal}
            />

            <ModalLayout
                titulo="Eliminar Comentario"
                contenido={
                    <>
                        <Grid item xs={12}>
                            <Typography>Estás seguro que deseas eliminar este comentario?</Typography>
                        </Grid>
                    </>
                }
                botones={[
                    insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                        peticionDeleteComentario();
                    }, 'error')
                ]}
                open={openModalEliminar}
                onClose={handleCloseModalEliminar}
            />

        </>
    )
}