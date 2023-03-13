import { TableRow, TableCell, TextField, InputAdornment } from '@mui/material';

export const ParametroMantenimiento = ({ indice, parametros, onChange, nombre }) => {

    console.log(parametros)
    return (
        <TableRow>

            <TableCell component="th" scope="row">
                { nombre }
            </TableCell>

            <TableCell>
                <TextField
                    id={ indice.toString() }
                    name="valor"
                    size="small"
                    defaultValue={ parametros[indice].valor }
                    onChange={ (e, id) => onChange( e, parametros[indice].parametro ) }
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{ parametros[indice].unidad }</InputAdornment>
                    }}
                />
            </TableCell>

            {
                parametros[indice].dosMeses.map( (row, index) => (
                    <TableCell key={ index }>
                        <TextField
                            id={ index.toString() }
                            name="valor"
                            type="number"
                            size="small"
                            defaultValue = { row }
                            disabled
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{ parametros[indice].unidad }</InputAdornment>
                            }}
                        />
                    </TableCell>
                ))
            }

        </TableRow>
    )
}