import { TableRow, TableCell, TextField, InputAdornment, Box } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const ParametroMantenimiento = ({ indice, parametros, onChange, nombre, limite, parametroCalculado }) => {

    const { user } = useContext(AuthContext);

    return (
        <>
            {
                <TableRow>
                    <TableCell component="th" scope="row">
                        {nombre}
                    </TableCell>
                    <TableCell>
                        <TextField
                            id={indice.toString()}
                            error={
                                (() => {
                                    const valor = parseFloat(parametros[indice].valor.replace(',', '.'));
                                    const limSup = parseFloat(limite.limSup.toString().replace(',', '.'));
                                    const limInf = parseFloat(limite.limInf.toString().replace(',', '.'));

                                    return (limSup !== 0 || limInf !== 0) && (valor > limSup || valor < limInf) && parametros[indice].valor !== "";
                                })()
                            }
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
                        parametros[indice].dosMeses.map((row, index) => {
                            const isError = (() => {

                                if (row == "") return false;
                                
                                const valor = row != "" && parseFloat(row.replace(',', '.'));
                                const limSup = parseFloat(limite.limSup.toString().replace(',', '.'));
                                const limInf = parseFloat(limite.limInf.toString().replace(',', '.'));

                                return (limSup !== 0 || limInf !== 0) && (valor > limSup || valor < limInf) && row !== "";
                            })();

                            return (
                                <TableCell key={index}>
                                    <Box
                                        sx={{
                                            position: "relative",
                                            width: "230px",
                                            border: isError ? "1px solid red" : "none", // Agrega un borde rojo si hay error
                                            borderRadius: "4px",
                                            padding: "0px"
                                        }}
                                    >
                                        <TextField
                                            id={index.toString()}
                                            name="valor"
                                            sx={{ width: "100%" }}
                                            size="small"
                                            value={row != "" ? row : ""}
                                            disabled
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">{parametros[indice].unidad}</InputAdornment>
                                            }}
                                        />
                                    </Box>
                                </TableCell>
                            );
                        })
                    }

                </TableRow>
            }
        </>

    )
}