import React, { useEffect, useState } from 'react'
import Trix from "trix"
import './EditorTextoEmail.css'

import { Button, Grid, IconButton, Input } from '@mui/material';
import SeleccionarContactos from './SeleccionarContactos';
import { ModalLayout } from '../ModalLayout';
import AddIcon from '@mui/icons-material/Add';
import { insertarBotonesModal } from '../../helpers/insertarBotonesModal';
import { getContactosByCodigoCliente } from '../../api';
import { getHistorialCorreosEnviadosByCodigoClienteIdElemento } from '../../api/historialCorreosEnviados';
import { DataGrid } from '@mui/x-data-grid';

export const EditorTextoEmail = ({ setTextoEmailEditor, correoGuardado, codigoCliente, setContactosEnviarCorreo, idTarea }) => {
  const [cargado, setCargado] = useState(false)
  const [correosSeleccionados, setCorreosSeleccionados] = useState([]);

  const [modalSeleccionarContacto, setModalSeleccionarContacto] = useState(false);
  const [registroHistoricoCorreos, setRegistroHistoricoCorreos] = useState([]);

  const columns = [
    { field: 'nombreContacto', headerName: 'Nombre', width:140},
    { field: 'email', headerName: 'Email', width:260},
    {
      headerName: 'Fecha',
      field: 'fecha',
      width: 120,
      valueFormatter: (params) => {
          const date = new Date(params.value);
          return date.toLocaleDateString();
      }
  },
  ]

  /* useEffect(async () => {
    await getContactosByCodigoCliente(codigoCliente).then(resp => {
      let auxCadena = '';
      resp.filter(contacto => contacto.correo === true).map((contacto) => {
        auxCadena = auxCadena + contacto.email + ';';
      });
      auxCadena = auxCadena.substring(0, auxCadena.length - 1);
      setCorreosSeleccionados(auxCadena);
      setContactosEnviarCorreo(auxCadena);
    });

    await getHistorialCorreosEnviadosByCodigoClienteIdElemento(codigoCliente, idTarea).then(resp => {
      setRegistroHistoricoCorreos(resp);
    });

  }, []); */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactos = await getContactosByCodigoCliente(codigoCliente);
        let auxCadena = '';
        contactos
          .filter(contacto => contacto.correo === true)
          .forEach(contacto => {
            auxCadena += contacto.email + ';';
          });
        auxCadena = auxCadena.slice(0, -1); // Elimina el último ';'
        setCorreosSeleccionados(auxCadena);
        setContactosEnviarCorreo(auxCadena);
 
        const historial = await getHistorialCorreosEnviadosByCodigoClienteIdElemento(codigoCliente, idTarea);
        setRegistroHistoricoCorreos(historial);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
 
    fetchData();
  }, [codigoCliente, idTarea]);

  useEffect(() => {
    if (correoGuardado !== undefined && correoGuardado !== '' && !cargado) {
      setTextoEmailEditor(correoGuardado);
      setCargado(true);
    }
  }, [correoGuardado, cargado, setTextoEmailEditor]);
  useEffect(() => {
    const handleTrixChange = () => {
      var valor = document.getElementById("inputEmail").value;
      setTextoEmailEditor(valor);
    };

    document.addEventListener("trix-change", handleTrixChange);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener("trix-change", handleTrixChange);
    };
  }, [setTextoEmailEditor]);

  const abrirCerrarModalSeleccionarContacto = () => {
    if (modalSeleccionarContacto) {

    }
    setModalSeleccionarContacto(!modalSeleccionarContacto);

  }

  const seleccionarContactos = () => {
    console.log(codigoCliente);
    abrirCerrarModalSeleccionarContacto();
  }

  const editarCorreosSeleccionados = (e) => {
    setCorreosSeleccionados(e.target.value)
    setContactosEnviarCorreo(e.target.value)
  }

  return (
    <div>
      <input id="inputEmail" value={correoGuardado} type='hidden' name="content"></input>
      <trix-editor className="trix-content" input="inputEmail"></trix-editor>
      <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* <Grid md={12}>
          <Button sx={{ float: 'left', marginTop: '4px' }} variant="contained" onClick={seleccionarContactos}>
            Seleccionar contactos cliente
          </Button>
        </Grid> */}
        <Grid md={12}>
          <Input sx={{ marginTop: '4px', width: '100%' }} placeholder='Correo envio' value={correosSeleccionados} onChange={e => editarCorreosSeleccionados(e)}>
          </Input>
        </Grid>
        <Grid md={12}>
          <DataGrid
            sx={{
              width: '100%',
              height: '200px',
              backgroundColor: '#FFFFFF'
            }}
            rows={registroHistoricoCorreos}
            columns={columns}
            rowHeight={26}
            headerHeight={30}>

          </DataGrid>
        </Grid>
      </Grid>

      <ModalLayout
        titulo="Seleccionar contactos"
        contenido={
          <SeleccionarContactos
            codigoCliente={codigoCliente}
            correosSeleccionados={correosSeleccionados}
            setCorreosSeleccionados={setCorreosSeleccionados}>

          </SeleccionarContactos>
        }
        botones={[
          insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
            // peticionPostProducto();
          })
        ]}
        open={modalSeleccionarContacto}
        onClose={abrirCerrarModalSeleccionarContacto}
      />

    </div>
  );

}
