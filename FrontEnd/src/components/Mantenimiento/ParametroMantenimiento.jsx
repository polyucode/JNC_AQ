import { TableRow, TableCell, TextField, InputAdornment } from '@mui/material';
import { useUsuarioActual } from '../../hooks/useUsuarioActual';

export const ParametroMantenimiento = ({ indice, parametros, onChange, nombre, limite }) => {

    const { usuarioActual } = useUsuarioActual();

    return (
        <>
            {
                (parametros[0].id_Operario !== usuarioActual.id && usuarioActual.idPerfil === 1004) ? (
                    <TableRow>

                        <TableCell component="th" scope="row">
                            {nombre}
                        </TableCell>

                        <TableCell>
                            <TextField
                                id={indice.toString()}
                                error={(parametros[indice].valor > limite.limSup || parametros[indice].valor < limite.limInf) ? true : false}
                                name="valor"
                                disabled
                                size="small"
                                sx={{ width: "250px" }}
                                defaultValue={parametros[indice].valor}
                                onChange={(e, id) => onChange(e, parametros[indice].parametro)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{parametros[indice].unidad}</InputAdornment>
                                }}
                            />
                        </TableCell>

                        {
                            parametros[indice].dosMeses.map((row, index) => (
                                <TableCell key={index}>
                                    <TextField
                                        id={index.toString()}
                                        name="valor"
                                        type="number"
                                        sx={{ width: "250px" }}
                                        size="small"
                                        defaultValue={row}
                                        disabled
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">{parametros[indice].unidad}</InputAdornment>
                                        }}
                                    />
                                </TableCell>
                            ))
                        }

                    </TableRow>
                )
                    :
                    <TableRow>

                        <TableCell component="th" scope="row">
                            {nombre}
                        </TableCell>

                        <TableCell>
                            <TextField
                                id={indice.toString()}
                                error={(parametros[indice].valor > limite.limSup || parametros[indice].valor < limite.limInf) ? true : false}
                                name="valor"
                                size="small"
                                sx={{ width: "250px" }}
                                defaultValue={parametros[indice].valor}
                                onChange={(e, id) => onChange(e, parametros[indice].parametro)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{parametros[indice].unidad}</InputAdornment>
                                }}
                            />
                        </TableCell>

                        {
                            parametros[indice].dosMeses.map((row, index) => (
                                <TableCell key={index}>
                                    <TextField
                                        id={index.toString()}
                                        name="valor"
                                        type="number"
                                        sx={{ width: "250px" }}
                                        size="small"
                                        defaultValue={row}
                                        disabled
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">{parametros[indice].unidad}</InputAdornment>
                                        }}
                                    />
                                </TableCell>
                            ))
                        }

                    </TableRow>
            }
        </>

    )
}