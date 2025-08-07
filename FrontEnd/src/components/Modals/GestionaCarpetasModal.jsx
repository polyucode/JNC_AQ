import { TextField } from '@mui/material';
import React, { useState } from 'react'

export const GestionaCarpetasModal = ({modoVentana, descripcionTexto, labelTexto, visualizarVerTexto, setTextoIntroducidoModal}) => {

  return (
    <div className='contenedor'>
      <p>{descripcionTexto}</p>
      {visualizarVerTexto && <TextField fullWidth label={labelTexto} name="name" onChange={event => setTextoIntroducidoModal(event.target.value)}/>}
    </div>
  )
}