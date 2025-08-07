import React, { useEffect, useState } from 'react'
import './DocumentosAgrupados.css'
import { bajarEsquemaCarpetas } from '../../api';
import { IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { PintarCarpeta } from './PintarCarpeta';

export const DocumentosAgrupados = ({ idUsuario, planta, cliente, elementoActivo }) => {


  let [estructura, setEstructura] = useState(null);

  //TODO: Old, comentado para revisar cuando venga Christian
  // useEffect(async () =>{
  //   bajarEsquemaCarpetas(planta.nombreCliente,planta.codigoCliente,planta.oferta,elementoActivo).then((res) => {
  //     if (JSON.stringify(res.data) !== JSON.stringify(estructura)) {
  //       setEstructura(res.data);
  //     }
  //   });
  //   //TODO: MODIFICAR ESTA CHAPUZA CON CHRISTIAN, NO SE QUE VARIABLE ES LA QUE CAMBIA Y CUANDO
  // },[elementoActivo, estructura])

  useEffect(() => {
    // Definir una función asíncrona dentro del useEffect
    const fetchEstructura = async () => {
      try {
        const res = await bajarEsquemaCarpetas(
          planta.nombreCliente,
          planta.codigoCliente,
          planta.oferta,
          elementoActivo
        );

        // Comparar y actualizar solo si es necesario
        if (JSON.stringify(res.data) !== JSON.stringify(estructura)) {
          setEstructura(res.data);
        }
      } catch (error) {
        console.error("Error al bajar esquema de carpetas:", error);
      }
    };

    // Llamar la función asíncrona
    fetchEstructura();

    // TODO: MODIFICAR ESTA CHAPUZA CON CHRISTIAN, NO SE QUE VARIABLE ES LA QUE CAMBIA Y CUANDO
  }, [elementoActivo, estructura, planta]);

  const actualizarPadre = () => {
    bajarEsquemaCarpetas(planta.nombreCliente, planta.codigoCliente, planta.oferta, elementoActivo).then((res) => {
      setEstructura(res.data);
    });
  }

  if (estructura != null || estructura === "") {
    return (
      <div className='contenedor'>
        <PintarCarpeta
          carpeta={estructura}
          actualizarPadre={actualizarPadre}
          permisoUsuario={idUsuario}
          carpetaRaiz={estructura.nombre}>
        </PintarCarpeta>
      </div>
    )
  } else {
    return (
      <IconButton>
        <AddBoxIcon />
      </IconButton>
    )
  }


}
