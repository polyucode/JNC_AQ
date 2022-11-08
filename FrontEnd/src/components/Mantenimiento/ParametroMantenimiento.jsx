import { TableRow, TableCell, TextField, InputAdornment } from '@mui/material';

export const ParametroMantenimiento = ({ nombre, unidades }) => {
    return (
        <TableRow>
            <TableCell component="th" scope="row">
                { nombre }
            </TableCell>
            <TableCell>
                <TextField
                    name="valor"
                    type="number"
                    size="small"
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