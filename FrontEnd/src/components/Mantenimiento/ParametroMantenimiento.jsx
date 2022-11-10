import { TableRow, TableCell, TextField, InputAdornment } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { getParametros } from '../../api/apiBackend';

export const ParametroMantenimiento = ({ index, nombre, unidades, valor, parametrosElemento, parametros }) => {

    console.log(parametros)
    const cambiarValor = (e) => {
        const { name, value } = e.target
        parametrosElemento(parametros.map((param) => {
            if(index == param.id){
                return{
                    ...param,
                    [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
                }
            }else{
                return param
            }
        }))

    }




    return (
        <TableRow>
            <TableCell component="th" scope="row">
                { nombre }
            </TableCell>
            <TableCell>
                <TextField
                    id={ index }
                    name="valor"
                    type="number"
                    size="small"
                    defaultValue = { valor }
                    onChange= { cambiarValor }
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{ unidades }</InputAdornment>
                    }}
                />
            </TableCell>
            <TableCell>
                <TextField
                    name="valor"
                    type="number"
                    size="small"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{ unidades }</InputAdornment>
                    }}
                    disabled
                />
            </TableCell>
            <TableCell>
                <TextField
                    name="valor"
                    type="number"
                    size="small"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{ unidades }</InputAdornment>
                    }}
                    disabled
                />
            </TableCell>
        </TableRow>
    )
}