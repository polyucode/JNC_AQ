import { Card, CardContent, Grid, Tab, Tabs, Typography } from "@mui/material";
import { ObservacionesElementos } from "../ObservacionesElementos/ObservacionesElementos";
import { ComentariosElementosNoFQ } from "../ComentariosElementos/ComentariosElementosNoFQ";

const TabPanel = ({ children, value, index }) => {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <div>{children}</div>}
        </div>
    );
};

export const IncidenciasCard = ({
    elementoActivo,
    observaciones,
    setObservaciones,
    observacion,
    setObservacion,
    observacionEditar,
    setObservacionEditar,
    elementosGeneral,
    tabActivoElementosGeneral,
    handleTabElementosGeneralChange,
    handleTabElementoGeneralClick
}) => {
    return (
        <>
            <Card style={{ height: "600px", overflowY: "auto" }}>
                <CardContent sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ pb: 2 }}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <Typography variant="h6">Incidéncias</Typography>
                                <h4 style={{ marginLeft: "10px", fontSize: "1.25rem" }}>
                                    {elementoActivo.nombre}
                                </h4>
                            </div>
                        </Grid>
                        {elementoActivo.nombre ? (
                            <Grid item xs={12}>
                                <ObservacionesElementos
                                    idElemento={elementoActivo.id}
                                    observaciones={observaciones}
                                    setObservaciones={setObservaciones}
                                    observacion={observacion}
                                    setObservacion={setObservacion}
                                    observacionEditar={observacionEditar}
                                    setObservacionEditar={setObservacionEditar}
                                ></ObservacionesElementos>
                                <br />
                                <ComentariosElementosNoFQ
                                    idElemento={elementoActivo.id}
                                ></ComentariosElementosNoFQ>
                            </Grid>
                        ) : elementosGeneral.length > 0 ? (
                            <>
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
                                <Grid item xs={12}>

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
                                                    <ObservacionesElementos
                                                        idElemento={elemento.id}
                                                        observaciones={observaciones}
                                                        setObservaciones={setObservaciones}
                                                        observacion={observacion}
                                                        setObservacion={setObservacion}
                                                        observacionEditar={observacionEditar}
                                                        setObservacionEditar={setObservacionEditar}
                                                    ></ObservacionesElementos>
                                                    <br />
                                                    <ComentariosElementosNoFQ
                                                        idElemento={elemento.id}
                                                    ></ComentariosElementosNoFQ>
                                                </TabPanel>
                                            );
                                        })}
                                </Grid>
                            </>

                        ) : (
                            <></>
                        )}
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}