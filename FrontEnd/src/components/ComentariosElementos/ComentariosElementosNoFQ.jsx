import React, { useContext, useEffect, useState } from 'react'
import './ComentariosElementos.css'
import { AuthContext } from '../../context/AuthContext';
import { getComentariosByElementoId, getComentariosByTareaId, postComentario } from '../../api/comentariosElementos';


export const ComentariosElementosNoFQ = ({ idElemento, idAnalisis, nombreAnalisis }) => {

    const [comentarios, setComentarios] = useState([]);
    const [comentarioEscrito, setComentarioEscrito] = useState('');

    const { user } = useContext(AuthContext);


    useEffect(() => {
        cargarComentarios();
    }, [idElemento])

    const cargarComentarios = () => {
        getComentariosByElementoId(idElemento).then(res => {
            setComentarios(res);
        })

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (idElemento === 0) {
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

    return (
        <div>
            <p>Comentarios Informes Fisico-Químico</p>
            <div className='comentarios-elementos-contenedor'>
                <div className='comentario-escrito2'>
                    <form onSubmit={handleSubmit}>
                        <input disabled type='text' className='observacion-escrita2' value={comentarioEscrito} onChange={handleChange}
                            placeholder='Introduzca comentario + Enter'></input>
                    </form>
                </div>
                {
                    comentarios.map((comentario) => {
                        let fechaMostrar = new Date(comentario.fecha);
                        let fechaString = fechaMostrar.toLocaleDateString();
                        return (
                            <div key={comentario.id}>
                                <h4>{comentario.nombreUsuario + ' ' + comentario.apellidosUsuario + ' ' + fechaString + ' ' + comentario.nombreAnalisis}</h4>
                                <p key={comentario.id}>{comentario.comentario}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}