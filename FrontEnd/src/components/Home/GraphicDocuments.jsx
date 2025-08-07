import { Card, CardContent, Chip, Grid, Tab, Tabs, Typography } from "@mui/material"
import { DocumentosAgrupados } from "../DocumentosAgrupados/DocumentosAgrupados";


const TabPanel = ({ children, value, index }) => {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <div>{children}</div>}
        </div>
    );
};

export const GraphicDocuments = ({
    elementoActivo,
    activeTab,
    handleTabChange,
    user,
    plantaActiva,
    clienteSeleccionado,
    parametroActivo,
    ChartContainer,
    elementoGeneralSeleccionado
}) => {

    return (
        <>
            <Card style={{ height: "600px", overflowY: "auto" }}>
                <CardContent sx={{ p: 2 }}>
                    {elementoActivo.nombre ? (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <h4 style={{ marginLeft: "10px", fontSize: "1.25rem" }}>
                                    {elementoActivo.nombre}
                                </h4>
                                <Tabs
                                    value={activeTab}
                                    onChange={handleTabChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                /*centered*/
                                >
                                    <Tab label="Documentos" />
                                    <Tab label="Gráfico" />
                                </Tabs>
                            </Grid>
                            <Grid item xs={12}>
                                <TabPanel value={activeTab} index={0}>
                                    {/* Contingut del grid PDF'S */}
                                    {/*Apartado PDF'S */}
                                    <Grid item xs={12}>
                                        <Card style={{ height: "600px", overflowY: "auto" }}>
                                            <CardContent sx={{ p: 2 }}>
                                                <DocumentosAgrupados
                                                    idUsuario={user.idPerfil}
                                                    planta={plantaActiva}
                                                    cliente={clienteSeleccionado}
                                                    elementoActivo={elementoActivo.nombre}
                                                />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </TabPanel>

                                <TabPanel value={activeTab} index={1}>
                                    {/* Contingut del grid Gràfics */}
                                    <Grid item xs={12}>
                                        <Card style={{ height: "600px", overflowY: "auto" }}>
                                            <CardContent sx={{ p: 2 }}>
                                                <Grid
                                                    container
                                                    spacing={6}
                                                    sx={{ mb: 2, justifyContent: "space-between" }}
                                                >
                                                    {parametroActivo.nombre ? (
                                                        <>
                                                            <Grid item>
                                                                <Typography variant="h6">
                                                                    Vista gráfica del parámetro
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Chip
                                                                    label={parametroActivo.nombre}
                                                                    color="primary"
                                                                />
                                                            </Grid>
                                                        </>
                                                    ) : (
                                                        <Grid item>
                                                            <Typography variant="h6">
                                                                Selecciona un parámetro de la tabla
                                                            </Typography>
                                                        </Grid>
                                                    )}
                                                </Grid>

                                                <ChartContainer />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </TabPanel>
                            </Grid>
                        </Grid>
                    ) : (
                        elementoGeneralSeleccionado !== undefined && (
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <h4 style={{ marginLeft: "10px", fontSize: "1.25rem" }}>
                                        {elementoGeneralSeleccionado.descripcion !== null
                                            ? elementoGeneralSeleccionado.nombre +
                                            " " +
                                            elementoGeneralSeleccionado.descripcion
                                            : elementoGeneralSeleccionado.nombre +
                                            " " +
                                            elementoGeneralSeleccionado.numero}
                                    </h4>
                                    <Tabs
                                        value={activeTab}
                                        onChange={handleTabChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                    /*centered*/
                                    >
                                        <Tab label="Documentos" />
                                        <Tab label="Gráfico" />
                                    </Tabs>
                                </Grid>
                                <Grid item xs={12}>
                                    <TabPanel value={activeTab} index={0}>
                                        {/* Contingut del grid PDF'S */}
                                        {/*Apartado PDF'S */}
                                        <Grid item xs={12}>
                                            <Card
                                                style={{ height: "600px", overflowY: "auto" }}
                                            >
                                                <CardContent sx={{ p: 2 }}>
                                                    <DocumentosAgrupados
                                                        idUsuario={user.idPerfil}
                                                        planta={plantaActiva}
                                                        cliente={clienteSeleccionado}
                                                        elementoActivo={
                                                            elementoGeneralSeleccionado.descripcion !==
                                                                null
                                                                ? elementoGeneralSeleccionado.nombre +
                                                                " " +
                                                                elementoGeneralSeleccionado.descripcion
                                                                : elementoGeneralSeleccionado.nombre +
                                                                " " +
                                                                elementoGeneralSeleccionado.numero
                                                        }
                                                    />
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </TabPanel>

                                    <TabPanel value={activeTab} index={1}>
                                        {/* Contingut del grid Gràfics */}
                                        <Grid item xs={12}>
                                            <Card
                                                style={{ height: "600px", overflowY: "auto" }}
                                            >
                                                <CardContent sx={{ p: 2 }}>
                                                    <Grid
                                                        container
                                                        spacing={6}
                                                        sx={{
                                                            mb: 2,
                                                            justifyContent: "space-between",
                                                        }}
                                                    >
                                                        {parametroActivo.nombre ? (
                                                            <>
                                                                <Grid item>
                                                                    <Typography variant="h6">
                                                                        Vista gráfica del parámetro
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Chip
                                                                        label={parametroActivo.nombre}
                                                                        color="primary"
                                                                    />
                                                                </Grid>
                                                            </>
                                                        ) : (
                                                            <Grid item>
                                                                <Typography variant="h6">
                                                                    Selecciona un parámetro de la tabla
                                                                </Typography>
                                                            </Grid>
                                                        )}
                                                    </Grid>

                                                    <ChartContainer />
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </TabPanel>
                                </Grid>
                            </Grid>
                        )
                    )}
                </CardContent>
            </Card>
        </>
    )
}