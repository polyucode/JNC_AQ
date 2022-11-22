import { Checkbox, TableCell, TableRow, TextField } from "@mui/material"

export const LineaParametro = ({ parametros, indice, limInf, limSup, unidades, activar, verInsp }) => {

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell>{ parametros[indice].nombre }</TableCell>
            <TableCell>
                <TextField
                    name={ parametros[indice].nombre }
                    size="small"
                    margin="none"
                    onChange={ limInf }
                    value={ parametros[indice].limInf }
                    disabled={ !parametros[indice].activo }
                />
            </TableCell>
            <TableCell>
                <TextField
                name={ parametros[indice].nombre }
                    size="small"
                    margin="none"
                    onChange={ limSup }
                    value={ parametros[indice].limSup }
                    disabled={ !parametros[indice].activo }
                />
            </TableCell>
            <TableCell>
                <TextField
                    name={ parametros[indice].nombre }
                    size="small"
                    margin="none"
                    onChange={ unidades }
                    value={parametros[indice].unidades}
                    disabled={ !parametros[indice].activo }
                />
            </TableCell>
            <TableCell>
                <Checkbox
                    name={ parametros[indice].nombre }
                    id={ parametros[indice].nombre + "activo" }
                    onChange={ (e) => activar( e, indice ) }
                    checked={ parametros[indice].activo }
                    value={ parametros[indice].activo }
                />
            </TableCell>
            <TableCell>
                <Checkbox
                    name={ parametros[indice].nombre }
                    id={ parametros[indice].nombre + "verInspector" }
                    onChange={ verInsp }
                    checked={ parametros[indice].verInspector }
                    value={ parametros[indice].verInspector }
                    disabled={ !parametros[indice].activo }
                />
            </TableCell>
        </TableRow>
    )
}