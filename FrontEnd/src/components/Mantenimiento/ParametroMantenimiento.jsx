import { TableRow, TableCell, TextField, InputAdornment } from '@mui/material';

export const ParametroMantenimiento = () => {

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                Nombre parámetro
            </TableCell>
            <TableCell>
                <TextField
                    name="valor"
                    type="number"
                    size="small"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">mg</InputAdornment>
                    }}
                />
            </TableCell>
            <TableCell>
                <TextField
                    name="valor"
                    type="number"
                    size="small"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">mg</InputAdornment>
                    }}
                />
            </TableCell>
            <TableCell>
                <TextField
                    name="valor"
                    type="number"
                    size="small"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">mg</InputAdornment>
                    }}
                />
            </TableCell>
        </TableRow>
    )
}