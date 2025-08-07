import { Card, CardContent, Grid, IconButton, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tooltip, Typography } from "@mui/material";
//Iconos para sumar / restar contador año para Calendario Tareas
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import TimelineIcon from "@mui/icons-material/Timeline";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveIcon from "@mui/icons-material/Remove";
import WarningIcon from "@mui/icons-material/Warning";

const TabPanel = ({ children, value, index }) => {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <div>{children}</div>}
        </div>
    );
};

export const TareasCalendar = ({
    elementoActivo,
    handleDecrementarContador,
    handleIncrementarContador,
    contadorYear,
    parametrosFiltrados,
    analisis,
    handleSeleccionarAnalisis,
    descargarPdf,
    handleTabElementosGeneralChange,
    handleTabElementoGeneralClick,
    tabActivoElementosGeneral,
    elementosGeneral,
    elementoGeneralSeleccionado
}) => {

    return (
        <>
            <Card
                style={{ height: "600px", overflowY: "auto", overflowX: "auto" }}
            >
                <CardContent style={{ minWidth: "1200px" }}>
                    <Grid
                        container
                        spacing={3}
                        sx={{ mb: 5, justifyContent: "space-between" }}
                    >
                        {elementoActivo.nombre ? (
                            <>
                                <Grid item>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <Typography variant="h6">
                                            Calendario de tareas
                                        </Typography>
                                        <h4
                                            style={{ marginLeft: "10px", fontSize: "1.25rem" }}
                                        >
                                            {elementoActivo.nombre}
                                        </h4>
                                    </div>
                                    <IconButton onClick={handleDecrementarContador}>
                                        <NavigateBeforeIcon />
                                    </IconButton>

                                    <span>{contadorYear}</span>

                                    <IconButton onClick={handleIncrementarContador}>
                                        <NavigateNextIcon />
                                    </IconButton>
                                </Grid>
                            </>
                        ) : (
                            <Grid item>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <Typography variant="h6">
                                        Calendario de tareas
                                    </Typography>
                                    <h4 style={{ marginLeft: "10px", fontSize: "1.25rem" }}>
                                        {elementoActivo.nombre}
                                    </h4>
                                </div>
                                <IconButton onClick={handleDecrementarContador}>
                                    <NavigateBeforeIcon />
                                </IconButton>

                                <span>{contadorYear}</span>

                                <IconButton onClick={handleIncrementarContador}>
                                    <NavigateNextIcon />
                                </IconButton>
                            </Grid>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        {elementoActivo.nombre ? (
                            <TableContainer
                                component={Paper}
                                style={{
                                    overflowX: "unset",
                                    minWidth: 1450,
                                }}
                            >
                                <Table sx={{ minWidth: 1200 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ width: "50px" }}></TableCell>
                                            <TableCell align="left" sx={{ width: "100px" }}>
                                                Tipo de análisis
                                            </TableCell>
                                            <TableCell sx={{ width: "100px" }}>Ene</TableCell>
                                            <TableCell sx={{ width: "100px" }}>Feb</TableCell>
                                            <TableCell sx={{ width: "100px" }}>Mar</TableCell>
                                            <TableCell sx={{ width: "100px" }}>Abr</TableCell>
                                            <TableCell sx={{ width: "100px" }}>May</TableCell>
                                            <TableCell sx={{ width: "100px" }}>Jun</TableCell>
                                            <TableCell sx={{ width: "100px" }}>Jul</TableCell>
                                            <TableCell sx={{ width: "100px" }}>Ago</TableCell>
                                            <TableCell sx={{ width: "100px" }}>Sep</TableCell>
                                            <TableCell sx={{ width: "100px" }}>Oct</TableCell>
                                            <TableCell sx={{ width: "100px" }}>Nov</TableCell>
                                            <TableCell sx={{ width: "100px" }}>Dic</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {elementoActivo.nombre &&
                                            // Mapeamos todos los parametros
                                            analisis.map((row) => {
                                                // row -> id, nombre
                                                // tareasFiltradas -> analisis, elemento
                                                var currentTime = new Date();

                                                // Obtenemos todos los valores del parametro actual (valores del mismo parametro, enero, febrero, ...)
                                                const valoresPorTarea =
                                                    parametrosFiltrados.filter(
                                                        (analisis) =>
                                                            parseInt(analisis.analisis, 10) === row.id
                                                    );

                                                let fechas = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]; // -1 = no existe registro, 0 = existe, pero no realizado, 1 = existe y realizado, 2 = tiene el check de Incorrecto o No Valido marcados, 3 = está solamente recogido
                                                let valorFechas = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
                                                let valorFechasRealizado = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
                                                if (valoresPorTarea.length > 0) {
                                                    // Mapeamos los valores en un array, y los registro que no estén seteamos una raya
                                                    valoresPorTarea.map((val) => {
                                                        // Convertimos la fecha del registro en un objeto de fecha
                                                        const fecha = new Date(val.fecha);
                                                        // Contamos solo si los registros son de este año
                                                        //if (fecha.getFullYear() === currentTime.getFullYear()) {
                                                        if (fecha.getFullYear() === contadorYear) {
                                                            for (let i = 0; i < 12; i++) {
                                                                if (fecha.getMonth() === i) {
                                                                    valorFechas[i] = fecha;
                                                                    if (val.incorrecto || val.noValido) {
                                                                        fechas[i] = 2;
                                                                        valorFechasRealizado[i] = new Date(
                                                                            val.fechaRealizado
                                                                        );
                                                                    } else {
                                                                        if (val.realizado) {
                                                                            fechas[i] = 1;
                                                                            valorFechasRealizado[i] = new Date(
                                                                                val.fechaRealizado
                                                                            );
                                                                        } else if (val.recogido) {
                                                                            fechas[i] = 3;
                                                                            valorFechasRealizado[i] = new Date(
                                                                                val.fechaRecogido
                                                                            );
                                                                        } else {
                                                                            fechas[i] = 0;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    });
                                                }

                                                // Devolvemos los valores
                                                return (
                                                    valoresPorTarea.length > 0 && (
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
                                                                    title="Ver parametros del elemento"
                                                                    placement="top"
                                                                >
                                                                    <IconButton
                                                                        onClick={() =>
                                                                            handleSeleccionarAnalisis(row.id)
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
                                                                <TableCell key={index}>
                                                                    <IconButton
                                                                        onClick={() => {
                                                                            descargarPdf(
                                                                                row.id,
                                                                                valorFechas[index]
                                                                            );
                                                                        }}
                                                                        sx={{
                                                                            color: fecha === 3 ? '#2196f3' : undefined // azul solo cuando fecha === 3
                                                                        }}
                                                                        color={
                                                                            fecha === -1
                                                                                ? "primary"
                                                                                : fecha === 0
                                                                                    ? "error"
                                                                                    : fecha === 2
                                                                                        ? "warning"
                                                                                        : fecha === 3
                                                                                            ? undefined
                                                                                            : "success"
                                                                        }
                                                                        disabled={fecha === -1 ? true : false}
                                                                    >
                                                                        {fecha === -1 ? (
                                                                            <RemoveIcon />
                                                                        ) : fecha === 0 ? (
                                                                            <ClearIcon />
                                                                        ) : fecha === 2 ? (
                                                                            <WarningIcon />
                                                                        ) : fecha === 3 ? (
                                                                            <CheckIcon />
                                                                        ) : (
                                                                            <CheckIcon />
                                                                        )}
                                                                    </IconButton>
                                                                    {fecha === -1 ? (
                                                                        <p></p>
                                                                    ) : valorFechasRealizado[index] ===
                                                                        -1 ? (
                                                                        <p>
                                                                            {valorFechas[index] != -1
                                                                                ? valorFechas[
                                                                                    index
                                                                                ].toLocaleDateString()
                                                                                : ""}
                                                                        </p>
                                                                    ) : (
                                                                        <p>
                                                                            {valorFechasRealizado[index] != -1
                                                                                ? valorFechasRealizado[
                                                                                    index
                                                                                ].toLocaleDateString()
                                                                                : ""}
                                                                        </p>
                                                                    )}
                                                                    {/* <p>{valorFechas[index] != -1 ? valorFechas[index].toLocaleDateString() : ""}</p> */}
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    )
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : elementosGeneral.length > 0 ? (
                            <Grid item xs={7}>
                                <Tabs
                                    value={tabActivoElementosGeneral}
                                    onChange={handleTabElementosGeneralChange}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                >
                                    {elementosGeneral
                                        .sort((a, b) => {
                                            // Comparar primero por el nombre (orden alfabético)
                                            if (a.nombre < b.nombre) return -1;
                                            if (a.nombre > b.nombre) return 1;

                                            // Si los nombres son iguales, comparar por número (orden numérico)
                                            return a.numero - b.numero;
                                        })
                                        .map((elemento, index) => {
                                            const nombre = elemento.nombre;
                                            const apellido = elemento.descripcion
                                                ? elemento.descripcion
                                                : elemento.numero;
                                            return (
                                                <Tab
                                                    value={index}
                                                    label={nombre + " " + apellido}
                                                    sx={{ fontSize: "1.20 rem" }}
                                                    onClick={() =>
                                                        handleTabElementoGeneralClick(elemento)
                                                    }
                                                />
                                            );
                                        })}
                                </Tabs>
                                {elementosGeneral
                                    .sort((a, b) => {
                                        // Comparar primero por el nombre (orden alfabético)
                                        if (a.nombre < b.nombre) return -1;
                                        if (a.nombre > b.nombre) return 1;

                                        // Si los nombres son iguales, comparar por número (orden numérico)
                                        return a.numero - b.numero;
                                    })
                                    .map((elemento, index) => {
                                        return (
                                            <TabPanel
                                                value={tabActivoElementosGeneral}
                                                index={index}
                                            >
                                                <TableContainer
                                                    component={Paper}
                                                    sx={{
                                                        overflowX: "unset",
                                                        minWidth: 1450,
                                                    }}
                                                >
                                                    <Table sx={{ minWidth: 1200 }}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell
                                                                    sx={{ width: "50px" }}
                                                                ></TableCell>
                                                                <TableCell
                                                                    align="left"
                                                                    sx={{ width: "100px" }}
                                                                >
                                                                    Tipo de análisis
                                                                </TableCell>
                                                                <TableCell sx={{ width: "100px" }}>
                                                                    Ene
                                                                </TableCell>
                                                                <TableCell sx={{ width: "100px" }}>
                                                                    Feb
                                                                </TableCell>
                                                                <TableCell sx={{ width: "100px" }}>
                                                                    Mar
                                                                </TableCell>
                                                                <TableCell sx={{ width: "100px" }}>
                                                                    Abr
                                                                </TableCell>
                                                                <TableCell sx={{ width: "100px" }}>
                                                                    May
                                                                </TableCell>
                                                                <TableCell sx={{ width: "100px" }}>
                                                                    Jun
                                                                </TableCell>
                                                                <TableCell sx={{ width: "100px" }}>
                                                                    Jul
                                                                </TableCell>
                                                                <TableCell sx={{ width: "100px" }}>
                                                                    Ago
                                                                </TableCell>
                                                                <TableCell sx={{ width: "100px" }}>
                                                                    Sep
                                                                </TableCell>
                                                                <TableCell sx={{ width: "100px" }}>
                                                                    Oct
                                                                </TableCell>
                                                                <TableCell sx={{ width: "100px" }}>
                                                                    Nov
                                                                </TableCell>
                                                                <TableCell sx={{ width: "100px" }}>
                                                                    Dic
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {elementoGeneralSeleccionado &&
                                                                // Mapeamos todos los parametros
                                                                analisis.map((row) => {
                                                                    // Obtenemos todos los valores del parametro actual (valores del mismo parametro, enero, febrero, ...)
                                                                    const valoresPorTarea =
                                                                        parametrosFiltrados.filter(
                                                                            (analisis) =>
                                                                                parseInt(
                                                                                    analisis.analisis,
                                                                                    10
                                                                                ) === row.id
                                                                        );

                                                                    let fechas = [
                                                                        -1, -1, -1, -1, -1, -1, -1, -1, -1,
                                                                        -1, -1, -1,
                                                                    ]; // -1 = no existe registro, 0 = existe, pero no realizado, 1 = existe y realizado, 2 = tiene el check de Incorrecto o No Valido marcados
                                                                    let valorFechas = [
                                                                        -1, -1, -1, -1, -1, -1, -1, -1, -1,
                                                                        -1, -1, -1,
                                                                    ];
                                                                    let valorFechasRealizado = [
                                                                        -1, -1, -1, -1, -1, -1, -1, -1, -1,
                                                                        -1, -1, -1,
                                                                    ];
                                                                    if (valoresPorTarea.length > 0) {
                                                                        // Mapeamos los valores en un array, y los registro que no estén seteamos una raya
                                                                        valoresPorTarea.map((val) => {
                                                                            // Convertimos la fecha del registro en un objeto de fecha
                                                                            const fecha = new Date(val.fecha);
                                                                            // Contamos solo si los registros son de este año
                                                                            if (
                                                                                fecha.getFullYear() ===
                                                                                contadorYear
                                                                            ) {
                                                                                for (let i = 0; i < 12; i++) {
                                                                                    if (fecha.getMonth() === i) {
                                                                                        valorFechas[i] = fecha;
                                                                                        if (
                                                                                            val.incorrecto ||
                                                                                            val.noValido
                                                                                        ) {
                                                                                            fechas[i] = 2;
                                                                                            valorFechasRealizado[i] =
                                                                                                new Date(
                                                                                                    val.fechaRealizado
                                                                                                );
                                                                                        } else {
                                                                                            if (val.realizado) {
                                                                                                fechas[i] = 1;
                                                                                                valorFechasRealizado[i] =
                                                                                                    new Date(
                                                                                                        val.fechaRealizado
                                                                                                    );
                                                                                            } else if (val.recogido) {
                                                                                                fechas[i] = 3;
                                                                                                valorFechasRealizado[i] = new Date(
                                                                                                    val.fechaRecogido
                                                                                                );
                                                                                            } else {
                                                                                                fechas[i] = 0;
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        });
                                                                    }

                                                                    // Devolvemos los valores
                                                                    return (
                                                                        valoresPorTarea.length > 0 && (
                                                                            <TableRow
                                                                                key={row.id}
                                                                                sx={{
                                                                                    "&:last-child td, &:last-child th":
                                                                                        { border: 0 },
                                                                                }}
                                                                            >
                                                                                <TableCell>
                                                                                    <Tooltip
                                                                                        title="Ver parametros del elemento"
                                                                                        placement="top"
                                                                                    >
                                                                                        <IconButton
                                                                                            onClick={() =>
                                                                                                handleSeleccionarAnalisis(
                                                                                                    row.id
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
                                                                                    <TableCell key={index}>
                                                                                        <IconButton
                                                                                            onClick={() => {
                                                                                                descargarPdf(
                                                                                                    row.id,
                                                                                                    valorFechas[index]
                                                                                                );
                                                                                            }}
                                                                                            sx={{
                                                                                                color: fecha === 3 ? '#2196f3' : undefined // azul solo cuando fecha === 3
                                                                                            }}
                                                                                            color={
                                                                                                fecha === -1
                                                                                                    ? "primary"
                                                                                                    : fecha === 0
                                                                                                        ? "error"
                                                                                                        : fecha === 2
                                                                                                            ? "warning"
                                                                                                            : fecha === 3
                                                                                                                ? undefined
                                                                                                                : "success"
                                                                                            }
                                                                                            disabled={
                                                                                                fecha === -1
                                                                                                    ? true
                                                                                                    : false
                                                                                            }
                                                                                        >
                                                                                            {fecha === -1 ? (
                                                                                                <RemoveIcon />
                                                                                            ) : fecha === 0 ? (
                                                                                                <ClearIcon />
                                                                                            ) : fecha === 2 ? (
                                                                                                <WarningIcon />
                                                                                            ) : fecha === 3 ? (
                                                                                                <CheckIcon />
                                                                                            ) : (
                                                                                                <CheckIcon />
                                                                                            )}
                                                                                        </IconButton>
                                                                                        {fecha === -1 ? (
                                                                                            <p></p>
                                                                                        ) : valorFechasRealizado[
                                                                                            index
                                                                                        ] === -1 ? (
                                                                                            <p>
                                                                                                {valorFechas[index] !== -1
                                                                                                    ? valorFechas[
                                                                                                        index
                                                                                                    ].toLocaleDateString()
                                                                                                    : ""}
                                                                                            </p>
                                                                                        ) : (
                                                                                            <p>
                                                                                                {valorFechasRealizado[
                                                                                                    index
                                                                                                ] !== -1
                                                                                                    ? valorFechasRealizado[
                                                                                                        index
                                                                                                    ].toLocaleDateString()
                                                                                                    : ""}
                                                                                            </p>
                                                                                        )}
                                                                                    </TableCell>
                                                                                ))}
                                                                            </TableRow>
                                                                        )
                                                                    );
                                                                })}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </TabPanel>
                                        );
                                    })}
                            </Grid>
                        ) : (
                            <></>
                        )}
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}