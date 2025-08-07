import {
  getAnalisis,
  getClientes,
  getConfPlantaClientePorClienteOferta,
  getOfertas,
  getParametros,
} from "../api";
import { useContext, useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Autocomplete,
  IconButton,
} from "@mui/material";

import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
} from "@progress/kendo-react-charts";
import "hammerjs";

import "@progress/kendo-theme-default/dist/all.css";
import { AuthContext } from "../context/AuthContext";
import { useDiagrama } from "../helpers/generarDiagrama";
import ReactFlow, { Background } from "react-flow-renderer";
import { DashboardContext } from "../context/DashboardContext";

//Iconos para sumar / restar contador año para Calendario Tareas
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import "./HomeCliente.css";
import { TareasCalendar } from "./Home/TareasCalendar";
import { IncidenciasCard } from "./Home/IncidenciasCard";
import { ParametersTable } from "./Home/ParametersTable";
import { GraphicDocuments } from "./Home/GraphicDocuments";

const HomeInspector = () => {
  const [clientes, setClientes] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [parametros, setParametros] = useState([]);
  const [analisis, setAnalisis] = useState([]);
  const [plantaActiva, setPlantaActiva] = useState({});

  const [nodos, setNodos] = useState([]);
  const [lados, setLados] = useState([]);
  const { nodeTypesDashboard } = useDiagrama();

  const [clienteSeleccionado, setClienteSeleccionado] = useState({
    id: 0,
    nombreCliente: "",
    codigoCliente: 0,
    oferta: 0,
    descripcion: "",
    referencia: "",
  });

  const [observaciones, setObservaciones] = useState([]);
  const [observacion, setObservacion] = useState({
    id: 0,
    idElemento: 0,
    observacion: "",
    nombreUsuario: "",
    apellidosUsuario: "",
    fecha: null,
    verCliente: true,
    verInsp: true,
  });

  const [observacionEditar, setObservacionEditar] = useState({
    id: 0,
    idElemento: 0,
    observacion: "",
    nombreUsuario: "",
    apellidosUsuario: "",
    fecha: null,
    verCliente: true,
    verInsp: true,
  });

  const { user } = useContext(AuthContext);
  const {
    elementoActivo,
    elementosGeneral,
    parametroActivo,
    analisisActivo,
    analisisParametros,
    parametrosFiltrados,
    setElementoActivo,
    setAnalisisActivo,
    handleSeleccionarParametro,
    handleCargarTodosElementosPlanta,
    handleSeleccionarAnalisis,
    GetParametrosAnalisisPlanta,
    GetValoresParametros,
    GetParametrosElementoPlanta,
    parametrosFiltradosNoFQ,
    GetParametrosFiltradosSinSeleccionarElemento,
    descargarPdf,
  } = useContext(DashboardContext);


  const [elementoGeneralSeleccionado, setElementoGeneralSeleccionado] = useState(undefined);
  const [tabActivoElementosGeneral, setTabActivoElementosGeneral] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const [contadorYear, setCount] = useState(new Date().getFullYear());
  const [contadorYear2, setCount2] = useState(new Date().getFullYear());

  // Efecto que realiza las peticiones al cargar la página
  useEffect(() => {
    getClientes().then((resp) =>
      setClientes(resp.filter((cliente) => !cliente.deleted))
    );

    getOfertas().then((resp) =>
      setOfertas(resp.filter((oferta) => !oferta.deleted))
    );

    getParametros().then((resp) =>
      setParametros(resp.filter((param) => !param.deleted))
    );

    getAnalisis().then((resp) => setAnalisis(resp.filter((an) => !an.deleted)));

    setElementoActivo({});

    GetParametrosAnalisisPlanta();

    GetValoresParametros();

    GetParametrosElementoPlanta();
  }, []);

  // Efecto que carga el diagrama cada vez que se cambia de planta
  useEffect(() => {
    if (plantaActiva.diagrama) {
      const datosDiagrama = JSON.parse(plantaActiva.diagrama);

      setNodos(datosDiagrama.nodos);
      setLados(datosDiagrama.lados);
    } else {
      setNodos([]);
      setLados([]);
    }

    setTabActivoElementosGeneral(0);
    handleCargarTodosElementosPlanta(undefined, undefined);
    setElementoGeneralSeleccionado(undefined);
    handleCargarTodosElementosPlanta(plantaActiva.id, plantaActiva.oferta);
  }, [plantaActiva]);

  useEffect(() => {
    if (
      elementoGeneralSeleccionado === undefined &&
      elementosGeneral.length > 0
    ) {
      GetParametrosFiltradosSinSeleccionarElemento(elementosGeneral[0].id);
      setElementoGeneralSeleccionado(elementosGeneral[0]);
    }
  }, [elementosGeneral]);

  // Efecto que filtra las tareas al cambiar los datos de planta activa
  useEffect(() => {
    if (elementoActivo.nombre) {
      const scroll = document.getElementById("scroll");
      scroll.scrollIntoView({ behavior: "smooth" });
    }
  }, [plantaActiva, elementoActivo, parametrosFiltrados]);

  useEffect(() => {
    if (clienteSeleccionado.oferta !== "" && clientes.length > 0) {
      const oferta = ofertas.filter(
        (ofert) =>
          ofert.numeroOferta === clienteSeleccionado.oferta && !ofert.deleted
      )[0];
      if (oferta) {
        handleSeleccionOferta({
          target: { textContent: oferta.numeroOferta.toString() },
        });
      }
    }
  }, [clienteSeleccionado.oferta]);

  useEffect(() => {
    if (clienteSeleccionado.descripcion !== "" && clientes.length > 0) {
      const nombre = ofertas.filter(
        (oferta) => oferta.descripcion === clienteSeleccionado.descripcion
      );
      nombre.length > 0 &&
        setClienteSeleccionado({
          ...clienteSeleccionado,
          codigoCliente: nombre[0].codigoCliente,
          nombreCliente: nombre[0].nombreCliente,
          referencia: nombre[0].referencia,
          oferta: nombre[0].numeroOferta,
        });
    }
  }, [clienteSeleccionado.descripcion]);

  useEffect(() => {
    setElementoGeneralSeleccionado(undefined);
  }, [elementoActivo]);

  const ChartContainer = () => (
    <Chart style={{ height: "500px" }}>
      <ChartCategoryAxis>
        <ChartCategoryAxisItem
          title={{
            text: "Meses",
          }}
          categories={["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]}
        />
      </ChartCategoryAxis>
      <ChartSeries>
        <ChartSeriesItem type="line" data={parametroActivo.datos} />
      </ChartSeries>
    </Chart>
  );

  const handleSeleccionOferta = (e) => {
    setElementoActivo({});
    setAnalisisActivo({});

    const ofertaSeleccionada = parseInt(e.target.textContent);

    getConfPlantaClientePorClienteOferta(
      clienteSeleccionado.codigoCliente,
      ofertaSeleccionada
    ).then((res) => (res ? setPlantaActiva(res) : setPlantaActiva({})));
  };

  const handleTabElementosGeneralChange = (event, value) => {
    setTabActivoElementosGeneral(value);
    setAnalisisActivo({});
  };

  const handleTabElementoGeneralClick = (elemento) => {
    setElementoGeneralSeleccionado(elemento);
    GetParametrosFiltradosSinSeleccionarElemento(elemento.id);
  };

  const handleIncrementarContador = () => {
    setCount(contadorYear + 1);
  };

  const handleDecrementarContador = () => {
    if (contadorYear > 0) {
      setCount(contadorYear - 1);
    }
  };

  const handleIncrementarContador2 = () => {
    setCount2(contadorYear2 + 1);
    //Reactivamos pestaña PDF
    setActiveTab(0);
  };

  const handleDecrementarContador2 = () => {
    if (contadorYear2 > 0) {
      setCount2(contadorYear2 - 1);
      //Reactivamos pestaña PDF
      setActiveTab(0);
    }
  };

  //Posicionar al principio página al hacer clic en botón
  const handleInicioPagina = () => {
    //posiciona la página al principio
    window.scroll(0, 0);
  };
  //Posicionar al principio página al hacer clic en botón

  //Posicionar al final página al hacer clic en botón
  const handleScrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  //Posicionar al final página al hacer clic en botón

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleTabClick = (tabIndex, nombre, datos) => {
    //Activa penstaña Grafico
    setActiveTab(tabIndex);

    handleSeleccionarParametro({ nombre: nombre, datos: datos });
  };

  return (
    <>
      <Grid container spacing={2}>
        {/* APARTADO INICIAL, SELECCIÓN DE PLANTA */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container sx={{ alignItems: "center" }}>
                <Grid item xs={5}>
                  <Typography variant="h6">
                    {plantaActiva.nombreCliente
                      ? plantaActiva.nombreCliente
                      : "Selecciona un código de oferta"}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  {plantaActiva.descripcion && (
                    <Typography>{plantaActiva.descripcion}</Typography>
                  )}
                </Grid>
                <Grid item xs={2}>
                  <Autocomplete
                    id="descripcion"
                    options={ofertas}
                    value={
                      ofertas.find(
                        (oferta) =>
                          oferta.numeroOferta === clienteSeleccionado.oferta &&
                          oferta.codigoCliente === user.idCliente
                      ) || null
                    }
                    filterOptions={(options) => {
                      if (
                        clienteSeleccionado.referencia !== "" &&
                        clienteSeleccionado.oferta !== 0 &&
                        clienteSeleccionado.referencia !== null &&
                        clienteSeleccionado.oferta !== null
                      ) {
                        return options.filter(
                          (oferta) =>
                            oferta.referencia ===
                            clienteSeleccionado.referencia &&
                            oferta.numeroOferta ===
                            clienteSeleccionado.oferta &&
                            oferta.codigoCliente === user.idCliente &&
                            !oferta.deleted
                        );
                      } else {
                        return options.filter(
                          (oferta) =>
                            !oferta.deleted &&
                            oferta.codigoCliente === user.idCliente
                        );
                      }
                    }}
                    getOptionLabel={(option) => option.descripcion}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Descripción"
                        name="descripcion"
                      />
                    )}
                    onChange={(event, value) =>
                      setClienteSeleccionado((prevState) => ({
                        ...prevState,
                        codigoCliente: value
                          ? parseInt(value.codigoCliente)
                          : null,
                        nombreCliente: value ? value.nombreCliente : null,
                        descripcion: value ? value.descripcion : null,
                        referencia: value ? value.referencia : null,
                        oferta: value ? value.numeroOferta : null,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <Autocomplete
                    id="referencia"
                    options={ofertas}
                    value={
                      ofertas.find(
                        (oferta) =>
                          oferta.descripcion ===
                          clienteSeleccionado.descripcion &&
                          oferta.codigoCliente === user.idCliente
                      ) || null
                    }
                    filterOptions={(options) => {
                      if (
                        clienteSeleccionado.descripcion !== "" &&
                        clienteSeleccionado.oferta !== 0 &&
                        clienteSeleccionado.descripcion !== null &&
                        clienteSeleccionado.oferta !== null
                      ) {
                        return options.filter(
                          (oferta) =>
                            oferta.descripcion ===
                            clienteSeleccionado.descripcion &&
                            oferta.numeroOferta ===
                            clienteSeleccionado.oferta &&
                            oferta.codigoCliente === user.idCliente &&
                            !oferta.deleted
                        );
                      } else {
                        return options.filter(
                          (oferta) =>
                            !oferta.deleted &&
                            oferta.codigoCliente === user.idCliente
                        );
                      }
                    }}
                    getOptionLabel={(option) => option.referencia}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Referencia"
                        name="referencia"
                      />
                    )}
                    onChange={(event, value) =>
                      setClienteSeleccionado((prevState) => ({
                        ...prevState,
                        codigoCliente: value
                          ? parseInt(value.codigoCliente)
                          : null,
                        nombreCliente: value ? value.nombreCliente : null,
                        descripcion: value ? value.descripcion : null,
                        referencia: value ? value.referencia : null,
                        oferta: value ? value.numeroOferta : null,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <Autocomplete
                    id="ofertas"
                    options={ofertas}
                    value={
                      ofertas.find(
                        (oferta) =>
                          oferta.numeroOferta === clienteSeleccionado.oferta
                      ) || null
                    }
                    filterOptions={(options) => {
                      if (
                        clienteSeleccionado.descripcion !== "" &&
                        clienteSeleccionado.referencia !== "" &&
                        clienteSeleccionado.referencia !== null &&
                        clienteSeleccionado.descripcion !== null
                      ) {
                        return options.filter(
                          (oferta) =>
                            oferta.descripcion ===
                            clienteSeleccionado.descripcion &&
                            oferta.referencia ===
                            clienteSeleccionado.referencia &&
                            oferta.codigoCliente === user.idCliente &&
                            !oferta.deleted
                        );
                      } else {
                        return options.filter(
                          (oferta) =>
                            !oferta.deleted &&
                            oferta.codigoCliente === user.idCliente
                        );
                      }
                    }}
                    getOptionLabel={(option) => option.numeroOferta.toString()}
                    renderInput={(params) => (
                      <TextField {...params} label="Oferta" name="oferta" />
                    )}
                    onChange={(event, value) =>
                      setClienteSeleccionado((prevState) => ({
                        ...prevState,
                        codigoCliente: value
                          ? parseInt(value.codigoCliente)
                          : null,
                        nombreCliente: value ? value.nombreCliente : null,
                        oferta: value ? value.numeroOferta : null,
                        descripcion: value ? value.descripcion : null,
                        referencia: value ? value.referencia : null,
                      }))
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* APARTADO DEL DIAGRAMA */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 0 }}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ pt: 1, pb: 1, pl: 2 }}>
                    Diagrama de la planta
                  </Typography>
                </Grid>
                {/* <Grid item xs={12} sx={{ height: 950 }}> */}
                <Grid item xs={12} sx={{ height: 600 }}>
                  <ReactFlow
                    nodes={nodos}
                    edges={lados}
                    nodeTypes={nodeTypesDashboard}
                    fitView
                  >
                    <Background />
                  </ReactFlow>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Trampilla para posicionar pantalla al hacer clic en elemento del diagrama */}
        <Grid item id="scroll" xs={12}></Grid>
        <Grid item xs={12}></Grid>
        {/* Trampilla para posicionar pantalla al hacer clic en elemento del diagrama */}

        {/*Apartado incidencias */}
        <Grid item xs={6} id="scroll">
          <IncidenciasCard
            elementoActivo={elementoActivo}
            observaciones={observaciones}
            setObservaciones={setObservaciones}
            observacion={observacion}
            setObservacion={setObservacion}
            observacionEditar={observacionEditar}
            setObservacionEditar={setObservacionEditar}
            elementosGeneral={elementosGeneral}
            tabActivoElementosGeneral={tabActivoElementosGeneral}
            handleTabElementosGeneralChange={handleTabElementosGeneralChange}
            handleTabElementoGeneralClick={handleTabElementoGeneralClick}
          />
        </Grid>

        {/* APARTADO CALENDARIO DE TAREAS POR ELEMENTO */}
        <Grid item xs={6}>
          <TareasCalendar
            elementoActivo={elementoActivo}
            handleDecrementarContador={handleDecrementarContador}
            contadorYear={contadorYear}
            handleIncrementarContador={handleIncrementarContador}
            analisis={analisis}
            parametrosFiltrados={parametrosFiltrados}
            handleSeleccionarAnalisis={handleSeleccionarAnalisis}
            descargarPdf={descargarPdf}
            handleTabElementosGeneralChange={handleTabElementosGeneralChange}
            handleTabElementoGeneralClick={handleTabElementoGeneralClick}
            tabActivoElementosGeneral={tabActivoElementosGeneral}
            elementosGeneral={elementosGeneral}
            elementoGeneralSeleccionado={elementoGeneralSeleccionado}
          />
        </Grid>
        {/* FIN APARTADO CALENDARIO DE TAREAS */}

        <Grid container align="right">
          <Grid item xs={12}>
            <IconButton onClick={() => handleScrollToBottom()}>
              <ArrowDownwardIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={() => handleInicioPagina()}>
              <ArrowUpwardIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>

        {/* APARTADO TABLA DE PARAMETROS */}
        <Grid item xs={6}>
          <ParametersTable
            analisisActivo={analisisActivo}
            elementoActivo={elementoActivo}
            elementoGeneralSeleccionado={elementoGeneralSeleccionado}
            handleDecrementarContador2={handleDecrementarContador2}
            handleIncrementarContador2={handleIncrementarContador2}
            contadorYear2={contadorYear2}
            parametros={parametros}
            analisisParametros={analisisParametros}
            handleTabClick={handleTabClick}
            parametrosFiltradosNoFQ={parametrosFiltradosNoFQ}
          />
        </Grid>

        {/* APARTADO DOCUMENTOS */}
        <Grid item xs={6}>
          <GraphicDocuments
            elementoActivo={elementoActivo}
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            user={user}
            plantaActiva={plantaActiva}
            clienteSeleccionado={clienteSeleccionado}
            parametroActivo={parametroActivo}
            ChartContainer={ChartContainer}
            elementoGeneralSeleccionado={elementoGeneralSeleccionado}
          />
        </Grid>

        <Grid container align="right">
          <Grid item xs={12}>
            <IconButton onClick={() => handleInicioPagina()}>
              <ArrowUpwardIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HomeInspector;
