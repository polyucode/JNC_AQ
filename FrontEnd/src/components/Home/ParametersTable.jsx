import { Card, CardContent, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import TimelineIcon from "@mui/icons-material/Timeline";

export const ParametersTable = ({
    analisisActivo,
    elementoActivo,
    elementoGeneralSeleccionado,
    handleDecrementarContador2,
    handleIncrementarContador2,
    contadorYear2,
    parametros,
    analisisParametros,
    handleTabClick,
    parametrosFiltradosNoFQ
}) => {

    return (
        <>
            <Card style={{ height: "600px", overflowY: "auto" }}>
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                        sx={{ mb: 5, justifyContent: "space-between" }}
                    >
                        {analisisActivo.nombre ? (
                            <>
                                <Grid item>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <Typography variant="h6">
                                            Parámetros del Análisis
                                        </Typography>
                                        {elementoActivo.nombre ? (
                                            <h4
                                                style={{
                                                    marginLeft: "10px",
                                                    fontSize: "1.25rem",
                                                }}
                                            >
                                                {elementoActivo.nombre}
                                            </h4>
                                        ) : (
                                            elementoGeneralSeleccionado !== undefined && (
                                                <h4
                                                    style={{
                                                        marginLeft: "10px",
                                                        fontSize: "1.25rem",
                                                    }}
                                                >
                                                    {elementoGeneralSeleccionado.descripcion !==
                                                        null
                                                        ? elementoGeneralSeleccionado.nombre +
                                                        " " +
                                                        elementoGeneralSeleccionado.descripcion
                                                        : elementoGeneralSeleccionado.nombre +
                                                        " " +
                                                        elementoGeneralSeleccionado.numero}
                                                </h4>
                                            )
                                        )}
                                    </div>
                                    <IconButton onClick={handleDecrementarContador2}>
                                        <NavigateBeforeIcon />
                                    </IconButton>

                                    <span>{contadorYear2}</span>

                                    <IconButton onClick={handleIncrementarContador2}>
                                        <NavigateNextIcon />
                                    </IconButton>
                                </Grid>
                            </>
                        ) : (
                            <Grid item>
                                <Typography variant="h6">
                                    Selecciona un análisis del calendario
                                </Typography>
                                <IconButton onClick={handleDecrementarContador2}>
                                    <NavigateBeforeIcon />
                                </IconButton>

                                <span>{contadorYear2}</span>

                                <IconButton onClick={handleIncrementarContador2}>
                                    <NavigateNextIcon />
                                </IconButton>
                            </Grid>
                        )}
                    </Grid>
                    {analisisActivo.nombre && (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell align="left">Parámetro</TableCell>
                                        <TableCell>Ene</TableCell>
                                        <TableCell>Feb</TableCell>
                                        <TableCell>Mar</TableCell>
                                        <TableCell>Abr</TableCell>
                                        <TableCell>May</TableCell>
                                        <TableCell>Jun</TableCell>
                                        <TableCell>Jul</TableCell>
                                        <TableCell>Ago</TableCell>
                                        <TableCell>Sep</TableCell>
                                        <TableCell>Oct</TableCell>
                                        <TableCell>Nov</TableCell>
                                        <TableCell>Dic</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {analisisActivo.tipo === 0
                                        ? // Mapeamos todos los parametros
                                        parametros.map((row) => {
                                            // Obtenemos todos los valores del parametro actual (valores del mismo parametro, enero, febrero, ...)
                                            const valoresPorParametro =
                                                analisisParametros.filter(
                                                    (param) => param.parametro === row.id
                                                );
                                            let fechas = ["", "", "", "", "", "", "", "", "", "", "", ""];

                                            // Mapeamos los valores en un array, y si no hay datos seteamos un 0
                                            valoresPorParametro.map((val) => {
                                                const fecha = new Date(val.fecha);

                                                if (fecha.getFullYear() === contadorYear2) {
                                                    for (let i = 0; i < 12; i++) {
                                                        if (fecha.getMonth() === i) {
                                                            if (
                                                                val.valor &&
                                                                typeof val.valor === "string" &&
                                                                val.valor.includes(",")
                                                            ) {
                                                                const nuevoValor = val.valor.replace(
                                                                    ",",
                                                                    "."
                                                                );
                                                                fechas[i] = nuevoValor;
                                                            } else {
                                                                fechas[i] = val.valor;
                                                            }
                                                        }
                                                    }
                                                }
                                            });

                                            // Devolvemos los valores
                                            return (
                                                valoresPorParametro.length > 0 && (
                                                    <TableRow
                                                        key={row.id}
                                                        sx={{
                                                            "&:last-child td, &:last-child th": {
                                                                border: 0,
                                                            },
                                                        }}
                                                    >
                                                        <TableCell>
                                                            <Tooltip
                                                                title="Ver en la gráfica"
                                                                placement="left"
                                                            >
                                                                {/* <IconButton onClick={() => handleSeleccionarParametro({ nombre: row.nombre, datos: fechas })}> */}
                                                                {/* Se modifica para que al hacer clic en boton cambie automaticamente de pestaña y pasamos los parametros para dibujar gráfico  */}
                                                                <IconButton
                                                                    onClick={() =>
                                                                        handleTabClick(
                                                                            1,
                                                                            row.nombre,
                                                                            fechas
                                                                        )
                                                                    }
                                                                >
                                                                    <TimelineIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                        <TableCell
                                                            align="left"
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {row.nombre}
                                                        </TableCell>
                                                        {fechas.map((fecha, index) => (
                                                            <TableCell key={index}>{fecha}</TableCell>
                                                        ))}
                                                    </TableRow>
                                                )
                                            );
                                        })
                                        : parametrosFiltradosNoFQ.length > 0 &&
                                        (analisisActivo.nombre.includes("Legionela") ||
                                            analisisActivo.nombre.includes("Aerobios")) &&
                                        (() => {
                                            const fechas = ["", "", "", "", "", "", "", "", "", "", "", ""];

                                            // Organizar los resultados por mes
                                            parametrosFiltradosNoFQ.forEach((val) => {
                                                const fecha = new Date(val.fecha);

                                                if (fecha.getFullYear() === contadorYear2) {
                                                    fechas[fecha.getMonth()] = val.resultado;
                                                }
                                            });

                                            return (
                                                // Renderizar una fila con los resultados organizados
                                                <TableRow
                                                    sx={{
                                                        "&:last-child td, &:last-child th": {
                                                            border: 0,
                                                        },
                                                    }}
                                                >
                                                    <TableCell>
                                                        <Tooltip
                                                            title="Ver en la gráfica"
                                                            placement="left"
                                                        >
                                                            {/* <IconButton onClick={() => handleSeleccionarParametro({ nombre: row.nombre, datos: fechas })}> */}
                                                            {/* Se modifica para que al hacer clic en boton cambie automaticamente de pestaña y pasamos los parametros para dibujar gráfico  */}
                                                            <IconButton
                                                                onClick={() =>
                                                                    handleTabClick(
                                                                        1,
                                                                        analisisActivo.nombre,
                                                                        fechas
                                                                    )
                                                                }
                                                            >
                                                                <TimelineIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {analisisActivo.nombre}
                                                    </TableCell>
                                                    {/* Mostrar los resultados de cada mes */}
                                                    {fechas.map((fecha, idx) => (
                                                        <TableCell key={idx}>
                                                            {fecha != "" ? fecha : "0"}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            );
                                        })()}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </CardContent>
            </Card>
        </>
    )
}