import React, { useRef, useState } from 'react'
import './DocumentosAgrupados.css'
import { bajarEsquemaCarpetas, descargarArchivoPorRuta } from '../../api';
import { Icon, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { GestionaCarpetasModal } from '../Modals/GestionaCarpetasModal';
import { ModalLayout } from '../ModalLayout';
import { insertarBotonesModal } from '../../helpers/insertarBotonesModal';
import { borrarArchivo, borrarCarpeta, crearCarpeta, renombrarCarpeta, subirFichero } from '../../api/carpetas';
import Swal from 'sweetalert2';


export const PintarCarpeta = ({ carpeta, permisoUsuario, actualizarPadre, carpetaRaiz }) => {

  //variables ventana modal
  const [modalCarpetas, setModalCarpetas] = useState(false);
  const [tituloVentanaModal, setTituloVentanaModal] = useState("");
  const [modoVentanaModal, setModoVentanaModal] = useState("");
  const [mensajeBotonAceptarVentanaModal, setMensajeBotonAceptarVentanaModal] = useState("");
  const [descripcionTextoModal, setDescripcionTextoModal] = useState("");
  const [textoIntroducidoModal, setTextoIntroducidoModal] = useState("");
  const [labelTextoModal, setLabelTextoModal] = useState("");
  const [visualizarIntroducirTextoModal, setVisualizarIntroducirTextoModal] = useState(true);
  const [carpetaSeleccionada, setCarpetaSeleccionada] = useState({});
  const [ficheroSeleccionado, setFicheroSeleccionado] = useState({});
  const [errorModal, setErrorModal] = useState(false);
  const abrirCerrarModalCarpetas = () => {
    setModalCarpetas(!modalCarpetas);
  };
  //fin variables ventana modal
  const inputFile = useRef(null)
  const buttonActualizar = useRef(null)

  const handleClickEditarNombreCarpeta = (carpeta) => {
    if (carpeta.nombre === carpetaRaiz) {
      mostrarNotificacion('Error', 'No se puede modificar la carpeta principal');
      return;
    }

    setTituloVentanaModal(`Editar nombre carpeta: ${carpeta.nombre}`);
    setModoVentanaModal('EDITAR');
    setMensajeBotonAceptarVentanaModal("Editar");
    setVisualizarIntroducirTextoModal(true);
    setDescripcionTextoModal("Modifica el nombre manteniendo su contenido")
    setLabelTextoModal("Nuevo nombre")
    setCarpetaSeleccionada(carpeta);
    abrirCerrarModalCarpetas();

  }

  const handleClickAgregarCarpeta = (carpeta) => {
    setTituloVentanaModal(`Crear carpeta dentro de ${carpeta.nombre}`);
    setModoVentanaModal('CREAR');
    setMensajeBotonAceptarVentanaModal("Crear");
    setVisualizarIntroducirTextoModal(true);
    setDescripcionTextoModal(`Crea carpeta dentro de ${carpeta.nombre}`);
    setLabelTextoModal("Nombre carpeta")
    setCarpetaSeleccionada(carpeta);
    abrirCerrarModalCarpetas();
  }

  const handleClickEliminarCarpeta = (carpeta) => {
    if (carpeta.nombre === carpetaRaiz) {
      mostrarNotificacion('Error', 'No se puede eliminar la carpeta principal');
      return;
    }
    setTituloVentanaModal(`Eliminar carpeta ${carpeta.nombre}`);
    setModoVentanaModal('ELIMINAR');
    setMensajeBotonAceptarVentanaModal("Eliminar")
    setDescripcionTextoModal("Esta acción es irreversible. Se eliminarán todos los elementos contenidos en ella. ¿Desea continuar?");
    setVisualizarIntroducirTextoModal(false);
    setCarpetaSeleccionada(carpeta);
    abrirCerrarModalCarpetas();
  }

  const handleClickSubirFicheroCarpeta = (carpeta) => {
    inputFile.current.click();
    setCarpetaSeleccionada(carpeta);
  }
  const handleOnChangeFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      subirFichero(carpetaSeleccionada.ruta, event.target.files[0].name, event.target.files[0]);
      buttonActualizar.current.click();
    }
  }

  const handleClickEliminarFichero = (carpeta, nombreFichero) => {
    setTituloVentanaModal(`Eliminar archivo`);
    setModoVentanaModal('ELIMINARFICHERO');
    setMensajeBotonAceptarVentanaModal("Eliminar");
    setDescripcionTextoModal(`Eliminar ${nombreFichero} Esta acción es irreversible ¿Desea continuar?`);
    setVisualizarIntroducirTextoModal(false);
    setCarpetaSeleccionada(carpeta);
    setFicheroSeleccionado(nombreFichero);
    abrirCerrarModalCarpetas();
  }

  const handleClickDescargarFichero = (carpeta, nombreFichero) => {
    setCarpetaSeleccionada(carpeta);
    setFicheroSeleccionado(nombreFichero);
    descargarArchivoPorRuta(carpeta.ruta, nombreFichero);
  }

  const confirmarAccion = () => {
    switch (modoVentanaModal) {
      case "EDITAR": {
        renombrarCarpeta(carpetaSeleccionada.ruta, carpetaSeleccionada.nombre, textoIntroducidoModal);
        break;
      }
      case "CREAR": {
        crearCarpeta(carpetaSeleccionada.ruta, textoIntroducidoModal)
        break;
      }
      case "ELIMINAR": {
        borrarCarpeta(carpetaSeleccionada.ruta);
      }
      case "ELIMINARFICHERO": {
        borrarArchivo(carpetaSeleccionada.ruta, ficheroSeleccionado)
      }
    }
    setCarpetaSeleccionada({});
    abrirCerrarModalCarpetas();
    buttonActualizar.current.click();
  };

  const enviarActualizar = () => {
    actualizarPadre(true);
  }


  const mostrarNotificacion = (titulo, mensaje) => {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: `${titulo}`,
      text: `${mensaje}`,
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
    <div className='estructura-carpetas'>
      <button ref={buttonActualizar} onClick={() => enviarActualizar()} style={{ display: 'none' }}></button>
      <div className='contenedor-carpeta'>
        <IconButton >
          <FolderOpenOutlinedIcon />
        </IconButton>
        <p className='titulo-carpeta' >{carpeta.nombre}</p>
        {permisoUsuario === 1 && <div className='botones-carpeta'>
          <IconButton onClick={event => handleClickEditarNombreCarpeta(carpeta)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={event => handleClickAgregarCarpeta(carpeta)}>
            <AddBoxIcon />
          </IconButton>
          <IconButton onClick={event => handleClickEliminarCarpeta(carpeta)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={event => handleClickSubirFicheroCarpeta(carpeta)}>
            <FileUploadIcon>
            </FileUploadIcon>
          </IconButton>
          <input type='file' ref={inputFile} style={{ display: 'none' }} onChange={handleOnChangeFile} />
        </div>}
      </div>

      <div className='contenedor-ficheros'>
        {
          carpeta.ficheros?.map(nombreFichero => {
            return (
              <div className='fichero-row' key={nombreFichero}>
                <IconButton>
                  <InsertDriveFileOutlinedIcon />
                </IconButton>
                <p className='titulo-fichero'>{nombreFichero}</p>
                {permisoUsuario === 1 && <IconButton onClick={event => handleClickEliminarFichero(carpeta, nombreFichero)}>
                  <DeleteIcon />
                </IconButton>}

                <IconButton onClick={event => handleClickDescargarFichero(carpeta, nombreFichero)}>
                  <DownloadOutlinedIcon />
                </IconButton>
              </div>
            )
          })
        }
      </div>
      {
        carpeta.subCarpetas?.map((carpt, key) => {
          return (
            <PintarCarpeta carpeta={carpt}
              permisoUsuario={permisoUsuario}
              actualizarPadre={enviarActualizar}
              carpetaRaiz={carpetaRaiz}></PintarCarpeta>
          )
        })
      }

      <ModalLayout
        titulo={tituloVentanaModal}
        contenido={
          <GestionaCarpetasModal
            modoVentanaModal={modoVentanaModal}
            descripcionTexto={descripcionTextoModal}
            labelTexto={labelTextoModal}
            setTextoIntroducidoModal={setTextoIntroducidoModal}
            visualizarVerTexto={visualizarIntroducirTextoModal}
            errorModal={errorModal}>
          </GestionaCarpetasModal>
        }
        botones={[
          insertarBotonesModal(<CheckBoxOutlinedIcon />, mensajeBotonAceptarVentanaModal, async () => {
            confirmarAccion();
          })
        ]}
        open={modalCarpetas}
        onClose={abrirCerrarModalCarpetas}
      />
    </div>
  );
}
