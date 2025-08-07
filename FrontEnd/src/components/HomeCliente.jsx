import { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import {
  getUsuarios,
  getAnalisis,
  getClientes,
  getConfPlantaClientePorClienteOferta,
  getOfertas,
  getParametros
} from "../api";
import { AuthContext } from "../context/AuthContext";
import { useDiagrama } from "../helpers/generarDiagrama";
import { useNodesState, useEdgesState } from "@xyflow/react";
import { DashboardContext } from "../context/DashboardContext";
//Icono para subir al principio de la pagina
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import "./HomeCliente.css";

import { calcularValorParametroCalculado } from "../helpers/calculadorParametros";

import { useLocation } from "react-router-dom";
import { getObservacionesByElementoId } from "../api/observacionesElementos";
import FlowWithProvider from "./DiagramaEditableEdges/components/FlowWithProvider";
import { ConnectionLine } from "./DiagramaEditableEdges/edges/ConnectionLine";
import { IncidenciasCard } from "./Home/IncidenciasCard";
import { TareasCalendar } from "./Home/TareasCalendar";
import { ParametersTable } from "./Home/ParametersTable";
import { GraphicDocuments } from "./Home/GraphicDocuments";

const HomeCliente = () => {
  // Guardado de datos
  const [clientes, setClientes] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [parametros, setParametros] = useState([]);
  const [analisis, setAnalisis] = useState([]);
  const [plantaActiva, setPlantaActiva] = useState({});

  // operarios hace peticion get y devuelve todos los usuarios de la tabla SYS_Usuarios
  const [operarios, setOperarios] = useState([]);

  //parametrosIncidencias son solo los parametrosAnalisisFiltrados donde el campo Observaciones tiene contenido
  const [parametrosIncidencias, setIncidencias] = useState([]); //parametrosIncidencias son solo los parametrosAnalisisFiltrados donde el campo Observaciones tiene contenido
  const [parametrosPDF, setPDF_Analisis] = useState([]); //parametrosPDF son solo los parametrosAnalisisFiltrados donde el campo pdf es <> 0 o diferente null
  //// David

  const [elementoGeneralSeleccionado, setElementoGeneralSeleccionado] = useState(undefined);

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

  // Variables para el diagrama
  const [nodos, setNodos, onNodesChange] = useNodesState([]);
  const [lados, setLados, onEdgesChange] = useEdgesState([]);
  const { nodeTypesDashboard } = useDiagrama();

  // Variables de contexto
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
    parametrosFiltradosNoFQ,
    GetParametrosFiltradosSinSeleccionarElemento,
    descargarPdf,
    ficherosAll,
    GetFicheros,
  } = useContext(DashboardContext);

  //Variables filtros
  const [inputCodigoCliente, setInputCodigoCliente] = useState("");
  const [inputNombreCliente, setInputNombreCliente] = useState("");

  const { state } = useLocation();

  useEffect(() => {
    setElementoActivo({});
    setAnalisisActivo({});
    setElementoGeneralSeleccionado(undefined);
  }, []);

  // Efecto que realiza las peticiones al cargar la página
  useEffect(() => {
    getUsuarios().then((resp) =>
      setOperarios(resp.filter((op) => !op.deleted))
    );

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

    GetFicheros();
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
      getObservacionesByElementoId(elementosGeneral[0].id).then((res) => {
        setObservaciones(res);
      });
      GetParametrosFiltradosSinSeleccionarElemento(elementosGeneral[0].id);
      setElementoGeneralSeleccionado(elementosGeneral[0]);
    }
  }, [elementosGeneral]);

  useEffect(() => {
    if (state != null) {
      setClienteSeleccionado((prevParam) => ({
        ...prevParam,
        codigoCliente: state.codigoCliente,
        nombreCliente: state.nombreCliente,
        oferta: state.oferta,
      }));

      getConfPlantaClientePorClienteOferta(
        state.codigoCliente,
        state.oferta
      ).then((res) => (res ? setPlantaActiva(res) : setPlantaActiva({})));
    }
  }, [state]);

  // Efecto que filtra las tareas al cambiar los datos de planta activa
  useEffect(() => {

    if (elementoActivo.nombre) {
      const scroll = document.getElementById("scroll");
      scroll.scrollIntoView({ behavior: "smooth" });
    }

    setIncidencias(
      parametrosFiltrados.filter((inc) => inc.observaciones !== "")
    );

    //Aqui filtramos los prametrosAnalisisFiltrados que tengan Observaciones
    setPDF_Analisis(
      parametrosFiltrados.filter((pdf) => pdf.pdf !== null && pdf.pdf !== 0)
    );

    // handleCargarTodosElementosPlanta( plantaActiva.id, plantaActiva.oferta);
  }, [plantaActiva, elementoActivo, parametrosFiltrados]);

  useEffect(() => {
    if (clienteSeleccionado.oferta != "" && clientes.length > 0) {
      if (user.idPerfil === 2) {
        const oferta = ofertas.filter(
          (ofert) =>
            ofert.numeroOferta === clienteSeleccionado.oferta &&
            ofert.codigoCliente === user.idCliente &&
            !ofert.deleted
        )[0];
        if (oferta) {
          handleSeleccionOferta({
            target: { textContent: oferta.numeroOferta.toString() },
          });
        }
      } else {
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
    }
  }, [clienteSeleccionado.oferta]);

  const ChartContainer = () => {
    if (parametroActivo.datos) {
      const rawData = parametroActivo.datos.map((valor, index) => ({
        mes: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][index],
        valor: valor === "" ? null : valor, // Si el valor es "", lo cambiamos a null
      }));

      const months = rawData.map((item) => item.mes);
      const values = rawData.map((item) => item.valor);
      return (
        <Chart style={{ height: "500px" }}>
          <ChartCategoryAxis>
            <ChartCategoryAxisItem
              title={{ text: "Meses" }}
              categories={months}
            />
          </ChartCategoryAxis>
          <ChartSeries>
            <ChartSeriesItem type="line" data={values} />
          </ChartSeries>
        </Chart>
      );
    } else {
      return (
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
    }
  };

  // Con esta función, al seleccionar una oferta seteamos la planta activa
  const handleSeleccionOferta = (e) => {
    setElementoActivo({});
    setAnalisisActivo({});

    const ofertaSeleccionada = parseInt(e.target.textContent);

    getConfPlantaClientePorClienteOferta(
      clienteSeleccionado.codigoCliente,
      ofertaSeleccionada
    ).then((res) => (res ? setPlantaActiva(res) : setPlantaActiva({})));
  };

  const handleSeleccionOferta2 = (e) => {
    const ofertaSeleccionada = parseInt(e.target.textContent);

    setClienteSeleccionado({
      ...clienteSeleccionado,
      oferta: e.target.textContent,
    });

    getConfPlantaClientePorClienteOferta(
      clienteSeleccionado.codigoCliente,
      ofertaSeleccionada
    ).then((res) => (res ? setPlantaActiva(res) : setPlantaActiva({})));
  };

  //Contador para mover o simular desplazamiento año en calendario y parametros análisis, inicializando al año fecha sistema (2 Contadores)
  //Contador1 para Calendario Tareas
  const [contadorYear, setCount] = useState(new Date().getFullYear());

  const handleIncrementarContador = () => {
    setCount(contadorYear + 1);
  };

  const handleDecrementarContador = () => {
    if (contadorYear > 0) {
      setCount(contadorYear - 1);
    }
  };

  //Contador2 para Parametros del Anaálisis
  const [contadorYear2, setCount2] = useState(new Date().getFullYear());

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
  //Contador para mover o simular desplazamiento año en calendario y parametros análisis, inicializando al año fecha sistema (2 Contadores)

  //Pestanyes David
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleTabClick = (tabIndex, nombre, datos) => {
    //Activa penstaña Grafico
    setActiveTab(tabIndex);
    handleSeleccionarParametro({ nombre: nombre, datos: datos });
  };
  //Pestanyes David

  const [tabActivoElementosGeneral, setTabActivoElementosGeneral] = useState(0);

  const handleTabElementosGeneralChange = (event, value) => {
    setTabActivoElementosGeneral(value);
    handleSeleccionarParametro({ nombre: "", datos: "" });
    setAnalisisActivo({});
  };

  const handleTabElementoGeneralClick = (elemento) => {
    setElementoGeneralSeleccionado(elemento);
    handleSeleccionarParametro({ nombre: "", datos: "" });
    GetParametrosFiltradosSinSeleccionarElemento(elemento.id);
  };

  //PopUp David per mostrar incidencia
  const [open, setOpen] = useState(false);

  const handleOpenClosePopUp = () => {
    setOpen(!open);
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

  function filtrarCodigoCliente(cliente) {
    if (!cliente.deleted) {
      if (inputCodigoCliente === "") {
        return true;
      } else {
        if (cliente.codigo?.toString().indexOf(inputCodigoCliente) >= 0) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  function filtrarNombreCliente(cliente) {
    if (!cliente.deleted) {
      if (inputNombreCliente === "") {
        return true;
      } else {
        const nombreClienteLowerCase = cliente.razonSocial
          ? cliente.razonSocial.toString().toLowerCase()
          : "";
        const inputNombreClienteLowerCase = inputNombreCliente.toLowerCase();
        return nombreClienteLowerCase.includes(inputNombreClienteLowerCase);
      }
    } else {
      return false;
    }
  }

  /* function filtrarReferencia(oferta) {
        if (!oferta.deleted) {
            if (clienteSeleccionado.descripcion === '' && clienteSeleccionado.oferta === 0) {
                // Mostrar solo ofertas del cliente actual
                return oferta.codigoCliente === user.idCliente;
            } else if (inputReferencia === '' && oferta.codigoCliente === user.idCliente) {
                return true;
            } else if (oferta.referencia?.toString().indexOf(inputReferencia) >= 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    function filtrarDescripcion(oferta) {
        if (!oferta.deleted) {
            if (clienteSeleccionado.referencia === '' && clienteSeleccionado.oferta === 0) {
                // Mostrar solo ofertas del cliente actual
                return oferta.codigoCliente === user.idCliente;
            } else if (inputDescripcion === '' && oferta.codigoCliente === user.idCliente) {
                return true;
            } else if (oferta.descripcion?.toString().indexOf(inputDescripcion) >= 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } */

  return (
    <>
      {user.idPerfil !== 2 ? (
        <Grid container spacing={2}>
          {/* APARTADO INICIAL, SELECCIÓN DE PLANTA */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={2} sx={{ alignItems: "center" }}>
                  <Grid item xs={5}>
                    <Typography variant="h6">
                      {plantaActiva.nombreCliente
                        ? plantaActiva.nombreCliente
                        : "Selecciona un cliente"}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    {plantaActiva.descripcion && (
                      <Typography>{plantaActiva.descripcion}</Typography>
                    )}
                  </Grid>
                  <Grid item xs={2}>
                    <Autocomplete
                      id="nombreCliente"
                      options={clientes}
                      value={
                        clientes.find(
                          (cliente) =>
                            cliente.razonSocial ===
                            clienteSeleccionado.nombreCliente
                        ) || null
                      }
                      filterOptions={(options) =>
                        clientes.filter((cliente) =>
                          filtrarNombreCliente(cliente)
                        )
                      }
                      onInputChange={(event, newInputValue) => {
                        setInputNombreCliente(newInputValue);
                      }}
                      getOptionLabel={(option) => option.razonSocial}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Nombre Cliente"
                          name="nombreCliente"
                        />
                      )}
                      onChange={(event, value) =>
                        setClienteSeleccionado((prevState) => ({
                          ...prevState,
                          nombreCliente: value ? value.razonSocial : null,
                          codigoCliente: value ? parseInt(value.codigo) : null,
                          oferta: "",
                        }))
                      }
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <Autocomplete
                      id="clientes"
                      options={clientes}
                      value={
                        clientes.find(
                          (cliente) =>
                            cliente.codigo === clienteSeleccionado.codigoCliente
                        ) || null
                      }
                      filterOptions={(options) =>
                        clientes.filter((cliente) =>
                          filtrarCodigoCliente(cliente)
                        )
                      }
                      onInputChange={(event, newInputValue) => {
                        setInputCodigoCliente(newInputValue);
                      }}
                      getOptionLabel={(option) => option.codigo.toString()}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Código Cliente"
                          name="codigoCliente"
                        />
                      )}
                      onChange={(event, value) =>
                        setClienteSeleccionado((prevState) => ({
                          ...prevState,
                          codigoCliente: value ? parseInt(value.codigo) : null,
                          nombreCliente: value ? value.razonSocial : null,
                          oferta: "",
                        }))
                      }
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Autocomplete
                      id="clientes"
                      options={ofertas}
                      value={
                        ofertas.find(
                          (oferta) =>
                            oferta.numeroOferta === clienteSeleccionado.oferta
                        ) || null
                      }
                      filterOptions={(options) => {
                        if (
                          clienteSeleccionado.nombreCliente !== "" &&
                          clienteSeleccionado.codigoCliente !== 0 &&
                          clienteSeleccionado.nombreCliente !== null &&
                          clienteSeleccionado.codigoCliente !== null
                        ) {
                          return options.filter(
                            (oferta) =>
                              oferta.nombreCliente ===
                              clienteSeleccionado.nombreCliente &&
                              oferta.codigoCliente ===
                              clienteSeleccionado.codigoCliente &&
                              !oferta.deleted
                          );
                        } else {
                          return options.filter((oferta) => !oferta.deleted);
                        }
                      }}
                      getOptionLabel={(option) =>
                        option.numeroOferta.toString()
                      }
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
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ pt: 1, pb: 1, pl: 2 }}>
                      Diagrama de la planta
                    </Typography>
                  </Grid>
                  {/* <Grid item xs={12} sx={{ height: 950 }}> */}
                  <Grid item xs={12} sx={{ height: 600 }}>
                    <FlowWithProvider
                      nodes={nodos}
                      edges={lados}
                      onEdgesChange={onEdgesChange}
                      onNodesChange={onNodesChange}
                      nodeTypes={nodeTypesDashboard}
                      connectionLineComponent={ConnectionLine}
                    ></FlowWithProvider>
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
      ) : (
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
                            oferta.numeroOferta ===
                            clienteSeleccionado.oferta &&
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
                      getOptionLabel={(option) =>
                        option.numeroOferta.toString()
                      }
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
                    <FlowWithProvider
                      nodes={nodos}
                      edges={lados}
                      onEdgesChange={onEdgesChange}
                      onNodesChange={onNodesChange}
                      nodeTypes={nodeTypesDashboard}
                      connectionLineComponent={ConnectionLine}
                    ></FlowWithProvider>
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
      )}
    </>
  );
};

export default HomeCliente;
