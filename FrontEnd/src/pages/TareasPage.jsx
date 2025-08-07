import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Card,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { MainLayout } from "../layout/MainLayout";
import { DATAGRID_LOCALE_TEXT } from "../helpers/datagridLocale";
import { InsertarTareaModal } from "../components/Modals/InsertarTareaModal";
import { EditarTareaModal } from "../components/Modals/EditarTareaModal";
import { insertarBotonesModal } from "../helpers/insertarBotonesModal";
import { ModalLayout } from "../components/ModalLayout";
import {
  getOfertas,
  deleteTareas,
  getAnalisis,
  getAnalisisNivelesPlantasCliente,
  getClientes,
  getConfNivelesPlantasCliente,
  getElementosPlanta,
  getTareas,
  getUsuarios,
  postParametrosAnalisisPlanta,
  postTareas,
  putTareas,
  getParametrosAnalisisPlanta,
  deleteParametrosAnalisisPlanta,
  getFicheros,
  subirPdfTareas,
  putParametrosAnalisisPlanta,
  postArchivo,
  getArchivosByIdTarea,
} from "../api";

import Swal from "sweetalert2";
import { ModalLayout2 } from "../components/ModalLayout2";
import { AuthContext } from "../context/AuthContext";
import { TailSpin } from "react-loader-spinner";

//Tipos Mantenimiento
const tipos = [
  { id: 1, nombre: "Mensual" },
  { id: 2, nombre: "Bimensual" },
  { id: 3, nombre: "Trimestral" },
  { id: 4, nombre: "Semestral" },
  { id: 5, nombre: "Anual" },
];

export const TareasPage = () => {
  let opcionesFiltradas = [];
  let opcionesFiltradasAnalisis = [];
  let opcionesNombreFiltradasAnalisis = [];

  //variables
  const [modalInsertar, setModalInsertar] = useState(false);

  const [modalEditar, setModalEditar] = useState(false);

  const [modalEliminar, setModalEliminar] = useState(false);

  //modals detalle

  const [rows, setRows] = useState([]);
  const [rowsIds, setRowsIds] = useState([]);

  const [tareaSeleccionada, setTareaSeleccionada] = useState({
    id: 0,
    codigoCliente: 0,
    nombreCliente: "",
    oferta: 0,
    pedido: 0,
    operario: 0,
    elemento: 0,
    nombreElemento: "",
    analisis: 0,
    nombreAnalisis: "",
    fecha: null,
    tipo: 0,
    observaciones: "",
    pdf: 0,
    addDate: null,
    addIdUser: null,
    modDate: null,
    modIdUser: null,
    delDate: null,
    delIdUser: null,
    deleted: null,
  });

  const [analisisSeleccionado, setAnalisisSeleccionado] = useState({
    id: 0,
    codigoCliente: 0,
    nombreCliente: "",
    oferta: 0,
    pedido: 0,
    elemento: 0,
    nombreElemento: "",
    periodo: "",
    analisis: 0,
    fecha: null,
    recogido: false,
    fechaRecogido: null,
    realizado: false,
    fechaRealizado: null,
    observaciones: "",
    pdf: 0,
    recibido: false,
    fechaPdf: null,
    resultado: "",
    facturado: false,
    numeroFacturado: "",
    cancelado: false,
    comentarios: "",
    addDate: null,
    addIdUser: null,
    modDate: null,
    modIdUser: null,
    delDate: null,
    delIdUser: null,
    deleted: null,
  });

  const [clienteTareaEditar, setClienteTareaEditar] = useState([]);
  const [elementoTareaEditar, setElementoTareaEditar] = useState([]);
  const [tipoTareaEditar, setTipoTareaEditar] = useState([]);
  const [tecnicoTareaEditar, setTecnicoTareaEditar] = useState([]);
  const [analisisEditar, setAnalisisEditar] = useState([]);
  const [pdfEditar, setPdfEditar] = useState([]);

  const [TareaEliminar, setTareaEliminar] = useState([]);

  const [data, setData] = useState([]);

  const [tareasNuevas, setTareasNuevas] = useState([]);

  const [elementosplanta, setElementosPlanta] = useState([]);

  const [clientes, setClientes] = useState([]);
  const [analisis, setAnalisis] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [operarios, setOperarios] = useState([]);
  const [ficheros, setFicheros] = useState([]);

  const [parametrosAnalisisPlanta, setParametrosAnalisisPlanta] = useState([]);

  const [confNivelesPlantasCliente, setConfNivelesPlantasCliente] = useState(
    []
  );
  const [analisisNivelesPlantasCliente, setAnalisisNivelesPlantasCliente] =
    useState([]);

  const [elementosAutocomplete, setElementosAutocomplete] = useState([]);
  const [analisisAutocomplete, setAnalisisAutocomplete] = useState([]);

  const [errorCodigo, setErrorCodigo] = useState(false);
  const [errorOferta, setErrorOferta] = useState(false);
  const [errorElemento, setErrorElemento] = useState(false);
  const [errorAnalisis, setErrorAnalisis] = useState(false);
  const [errorOperario, setErrorOperario] = useState(false);
  const [errorFecha, setErrorFecha] = useState(false);
  const [errorPeriodo, setErrorPeriodo] = useState(false);

  const [filterText, setFilterText] = useState("");
  const [filterOferta, setFilterOferta] = useState(0);

  const [files, setFiles] = useState([]);

  const [archivos, setArchivos] = useState([]);

  const { user } = useContext(AuthContext);

  const [cargando, setCargando] = useState(false);

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

  const columns = [
    { headerName: "Cliente", field: "codigoCliente", width: 120 },
    { headerName: "Nombre Cliente", field: "nombreCliente", width: 250 },
    {
      headerName: "Operario",
      field: "operario",
      width: 300,
      valueFormatter: (params) => {
        const oper = operarios.find((operario) => operario.id === params.value);
        return oper ? oper.nombre + " " + oper.apellidos : "";
      },
    },
    {
      headerName: "Elemento",
      field: "elemento",
      width: 250,
      valueFormatter: (params) => {
        const elemento = elementosplanta.find(
          (elemento) => elemento.id === params.value
        );

        if (elemento) {
          if (
            elemento.descripcion !== null &&
            elemento.descripcion !== undefined
          ) {
            return `${elemento.nombre} ${elemento.descripcion}`;
          } else {
            return `${elemento.nombre} ${elemento.numero}`;
          }
        } else {
          return "";
        }
      },
    },
    {
      headerName: "Analisis",
      field: "analisis",
      width: 250,
      valueFormatter: (params) => {
        const analisi = analisis.find((analisi) => analisi.id === params.value);
        return analisi ? analisi.nombre : "";
      },
    },
    { headerName: "Oferta", field: "oferta", width: 150 },
    {
      headerName: "Tipo",
      field: "tipo",
      width: 150,
      valueFormatter: (params) => {
        const type = tipos.find((type) => type.id === params.value);
        return type ? type.nombre : "";
      },
    },
    {
      headerName: "Fecha",
      field: "fecha",
      width: 250,
      valueFormatter: (params) => {
        if (params.value !== null) {
          const date = new Date(params.value);
          return date.toLocaleDateString();
        } else {
          const date = "";
          return date;
        }
      },
    },
    { headerName: "Observaciones", field: "observaciones", width: 150 },
    {
      headerName: "PDF",
      field: "pdf",
      width: 700,
      valueFormatter: (params) => {
        const fich = ficheros.find((fichero) => fichero.id === params.value);
        return fich ? fich.name : "";
      },
    },
  ];

  const peticionGet = async () => {
    const resp = await getTareas();
    const tareasFiltradas = resp.filter((tarea) => !tarea.deleted);
    setData(tareasFiltradas);
  };

  const peticionGetTareas = async () => {
    const resp = await getParametrosAnalisisPlanta();
    if (tareaSeleccionada.id !== 0) {
      const tareasFiltradas = resp.filter(
        (analisi) =>
          analisi.codigoCliente === tareaSeleccionada.codigoCliente &&
          analisi.oferta === tareaSeleccionada.oferta &&
          analisi.elemento === tareaSeleccionada.elemento &&
          analisi.analisis === tareaSeleccionada.analisis &&
          !analisi.deleted
      );
      setTareasNuevas(tareasFiltradas);
    }
  };

  const peticionGetArchivos = async () => {
    try {
      const res = await getArchivosByIdTarea(tareaSeleccionada.id);
      const sortedRes = res.sort((a, b) => a.idFile - b.idFile); // Ordenar por idFile
      setArchivos(sortedRes);
    } catch (error) {
      console.error("Error fetching archivos:", error);
    }
  };

  useEffect(() => {
    if (tareaSeleccionada.id !== 0) {
      peticionGetArchivos();
    }
  }, [tareaSeleccionada]);

  const GetFichero = async () => {
    const resp = await getFicheros();
    const ficherosFiltrados = resp.filter((fichero) => !fichero.deleted);
    setFicheros(ficherosFiltrados);
  };

  useEffect(() => {
    peticionGet();
    GetFichero();

    getAnalisisNivelesPlantasCliente().then((resp) => {
      setAnalisisNivelesPlantasCliente(resp.filter((nivel) => !nivel.deleted));
    });

    getConfNivelesPlantasCliente().then((resp) => {
      setConfNivelesPlantasCliente(resp.filter((nivel) => !nivel.deleted));
    });

    getAnalisis().then((resp) => {
      setAnalisis(resp.filter((nivel) => !nivel.deleted));
    });

    getClientes().then((resp) => {
      setClientes(resp.filter((nivel) => !nivel.deleted));
    });

    getOfertas().then((resp) => {
      setOfertas(resp.filter((nivel) => !nivel.deleted));
    });

    getUsuarios().then((resp) => {
      setOperarios(resp.filter((nivel) => !nivel.deleted));
    });

    getParametrosAnalisisPlanta().then((resp) => {
      setParametrosAnalisisPlanta(resp.filter((nivel) => !nivel.deleted));
    });

    getElementosPlanta().then((resp) => {
      setElementosPlanta(resp.filter((nivel) => !nivel.deleted));
    });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setRows(data);
    } else {
      setRows([]);
    }
  }, [data]);

  useEffect(() => {
    opcionesFiltradas = [];

    const lista = confNivelesPlantasCliente.filter(
      (planta) =>
        planta.codigoCliente === tareaSeleccionada.codigoCliente &&
        planta.oferta === tareaSeleccionada.oferta &&
        !planta.deleted
    );
    lista.map((elemento) => {
      const elementosFiltrados = elementosplanta.filter(
        (elem) => elem.id === elemento.id_Elemento
      )[0];
      if (elementosFiltrados !== undefined) {
        opcionesFiltradas.push(elementosFiltrados);
      }
    });

    setElementosAutocomplete(opcionesFiltradas);
  }, [tareaSeleccionada.codigoCliente, tareaSeleccionada.oferta]);

  useEffect(() => {
    opcionesFiltradasAnalisis = [];
    opcionesNombreFiltradasAnalisis = [];

    const lista = confNivelesPlantasCliente.filter(
      (planta) =>
        planta.codigoCliente === tareaSeleccionada.codigoCliente &&
        planta.oferta === tareaSeleccionada.oferta &&
        planta.id_Elemento === tareaSeleccionada.elemento
    );

    lista.map((analisis) => {
      opcionesFiltradasAnalisis.push(
        analisisNivelesPlantasCliente.filter(
          (anal) => anal.id_NivelesPlanta === analisis.id && !anal.deleted
        )
      );
    });

    opcionesFiltradasAnalisis.map((nomAnalisis) => {
      nomAnalisis.map((anal) => {
        opcionesNombreFiltradasAnalisis.push(
          analisis.filter((an) => an.id === anal.id_Analisis)[0]
        );
      });
    });

    setAnalisisAutocomplete(opcionesNombreFiltradasAnalisis);
  }, [tareaSeleccionada.elemento]);

  const peticionPost = async () => {
    const tareaRepetida = data.filter(
      (tarea) =>
        tarea.codigoCliente === tareaSeleccionada.codigoCliente &&
        tarea.oferta === tareaSeleccionada.oferta &&
        tarea.elemento === tareaSeleccionada.elemento &&
        tarea.analisis === tareaSeleccionada.analisis
    );

    if (tareaSeleccionada.codigoCliente !== 0) {
      setErrorCodigo(false);
    } else {
      setErrorCodigo(true);
    }

    if (tareaSeleccionada.oferta !== 0) {
      setErrorOferta(false);
    } else {
      setErrorOferta(true);
    }

    if (tareaSeleccionada.elemento !== 0) {
      setErrorElemento(false);
    } else {
      setErrorElemento(true);
    }

    if (tareaSeleccionada.analisis !== 0) {
      setErrorAnalisis(false);
    } else {
      setErrorAnalisis(true);
    }

    if (tareaSeleccionada.operario !== 0) {
      setErrorOperario(false);
    } else {
      setErrorOperario(true);
    }

    if (tareaSeleccionada.fecha !== null) {
      setErrorFecha(false);
    } else {
      setErrorFecha(true);
    }

    if (tareaSeleccionada.tipo !== 0) {
      setErrorPeriodo(false);
    } else {
      setErrorPeriodo(true);
    }

    if (
      tareaSeleccionada.tipo !== 0 &&
      tareaSeleccionada.fecha !== null &&
      tareaSeleccionada.operario !== 0 &&
      tareaSeleccionada.analisis !== 0 &&
      tareaSeleccionada.elemento !== 0 &&
      tareaSeleccionada.oferta !== 0 &&
      tareaSeleccionada.codigoCliente !== 0
    ) {
      if (tareaRepetida.length === 0) {
        tareaSeleccionada.id = 0;

        const response = await postTareas(tareaSeleccionada);

        if (files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const resp = await subirPdfTareas(response.id, file);
            if (resp) {
              const archivo = {
                idTarea: response.id,
                idFile: resp.data,
              };

              await postArchivo(archivo);
            }
          }
        }

        var date = new Date(tareaSeleccionada.fecha);

        if (tareaSeleccionada.tipo === 1) {
          for (let i = 0; i < 12; i++) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

            var monthFormatted = month < 10 ? "0" + month : month;
            var dayFormatted = day < 10 ? "0" + day : day;

            var fechaFormateada =
              year + "-" + monthFormatted + "-" + dayFormatted;

            analisisSeleccionado.id = 0;
            analisisSeleccionado.codigoCliente = response.codigoCliente;
            analisisSeleccionado.nombreCliente = response.nombreCliente;
            analisisSeleccionado.oferta = response.oferta;
            analisisSeleccionado.pedido = response.pedido;
            analisisSeleccionado.elemento = response.elemento;
            analisisSeleccionado.nombreElemento =
              tareaSeleccionada.nombreElemento;
            analisisSeleccionado.periodo = date.toLocaleDateString("es", {
              year: "numeric",
              month: "short",
            });
            analisisSeleccionado.analisis = response.analisis;
            analisisSeleccionado.fecha = fechaFormateada;
            analisisSeleccionado.recogido = false;
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.operario = response.operario;
            analisisSeleccionado.protocolo = response.protocolo;
            analisisSeleccionado.observaciones = "";
            analisisSeleccionado.facturado = false;
            analisisSeleccionado.numeroFacturado = "";
            analisisSeleccionado.cancelado = false;
            analisisSeleccionado.comentarios = "";
            date.setMonth(date.getMonth() + 1);
            peticionPostVis();
          }
        }
        if (tareaSeleccionada.tipo === 2) {
          for (let i = 0; i < 6; i++) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

            var monthFormatted = month < 10 ? "0" + month : month;
            var dayFormatted = day < 10 ? "0" + day : day;

            var fechaFormateada =
              year + "-" + monthFormatted + "-" + dayFormatted;

            analisisSeleccionado.id = 0;
            analisisSeleccionado.codigoCliente = response.codigoCliente;
            analisisSeleccionado.nombreCliente = response.nombreCliente;
            analisisSeleccionado.oferta = response.oferta;
            analisisSeleccionado.pedido = response.pedido;
            analisisSeleccionado.elemento = response.elemento;
            analisisSeleccionado.nombreElemento =
              tareaSeleccionada.nombreElemento;
            analisisSeleccionado.periodo = date.toLocaleDateString("es", {
              year: "numeric",
              month: "short",
            });
            analisisSeleccionado.analisis = response.analisis;
            analisisSeleccionado.fecha = fechaFormateada;
            analisisSeleccionado.recogido = false;
            analisisSeleccionado.fechaRecogido = null;
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.fechaRealizado = null;
            analisisSeleccionado.operario = response.operario;
            analisisSeleccionado.protocolo = response.protocolo;
            analisisSeleccionado.observaciones = "";
            analisisSeleccionado.facturado = false;
            analisisSeleccionado.numeroFacturado = "";
            analisisSeleccionado.cancelado = false;
            analisisSeleccionado.comentarios = "";
            date.setMonth(date.getMonth() + 2);
            peticionPostVis();
          }
        }
        if (tareaSeleccionada.tipo === 3) {
          for (let i = 0; i < 4; i++) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

            var monthFormatted = month < 10 ? "0" + month : month;
            var dayFormatted = day < 10 ? "0" + day : day;

            var fechaFormateada =
              year + "-" + monthFormatted + "-" + dayFormatted;

            analisisSeleccionado.id = 0;
            analisisSeleccionado.codigoCliente = response.codigoCliente;
            analisisSeleccionado.nombreCliente = response.nombreCliente;
            analisisSeleccionado.oferta = response.oferta;
            analisisSeleccionado.pedido = response.pedido;
            analisisSeleccionado.elemento = response.elemento;
            analisisSeleccionado.nombreElemento =
              tareaSeleccionada.nombreElemento;
            analisisSeleccionado.periodo = date.toLocaleDateString("es", {
              year: "numeric",
              month: "short",
            });
            analisisSeleccionado.analisis = response.analisis;
            analisisSeleccionado.fecha = fechaFormateada;
            analisisSeleccionado.recogido = false;
            analisisSeleccionado.fechaRecogido = null;
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.fechaRealizado = null;
            analisisSeleccionado.operario = response.operario;
            analisisSeleccionado.protocolo = response.protocolo;
            analisisSeleccionado.observaciones = "";
            analisisSeleccionado.facturado = false;
            analisisSeleccionado.numeroFacturado = "";
            analisisSeleccionado.cancelado = false;
            analisisSeleccionado.comentarios = "";
            date.setMonth(date.getMonth() + 3);
            peticionPostVis();
          }
        }
        if (tareaSeleccionada.tipo === 4) {
          for (let i = 0; i < 2; i++) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

            var monthFormatted = month < 10 ? "0" + month : month;
            var dayFormatted = day < 10 ? "0" + day : day;

            var fechaFormateada =
              year + "-" + monthFormatted + "-" + dayFormatted;

            analisisSeleccionado.id = 0;
            analisisSeleccionado.codigoCliente = response.codigoCliente;
            analisisSeleccionado.nombreCliente = response.nombreCliente;
            analisisSeleccionado.oferta = response.oferta;
            analisisSeleccionado.pedido = response.pedido;
            analisisSeleccionado.elemento = response.elemento;
            analisisSeleccionado.nombreElemento =
              tareaSeleccionada.nombreElemento;
            analisisSeleccionado.periodo = date.toLocaleDateString("es", {
              year: "numeric",
              month: "short",
            });
            analisisSeleccionado.analisis = response.analisis;
            analisisSeleccionado.fecha = fechaFormateada;
            analisisSeleccionado.recogido = false;
            analisisSeleccionado.fechaRecogido = null;
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.fechaRealizado = null;
            analisisSeleccionado.operario = response.operario;
            analisisSeleccionado.protocolo = response.protocolo;
            analisisSeleccionado.observaciones = "";
            analisisSeleccionado.facturado = false;
            analisisSeleccionado.numeroFacturado = "";
            analisisSeleccionado.cancelado = false;
            analisisSeleccionado.comentarios = "";
            date.setMonth(date.getMonth() + 6);
            peticionPostVis();
          }
        }
        if (tareaSeleccionada.tipo === 5) {
          for (let i = 0; i < 1; i++) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

            var monthFormatted = month < 10 ? "0" + month : month;
            var dayFormatted = day < 10 ? "0" + day : day;

            var fechaFormateada =
              year + "-" + monthFormatted + "-" + dayFormatted;

            analisisSeleccionado.id = 0;
            analisisSeleccionado.codigoCliente = response.codigoCliente;
            analisisSeleccionado.nombreCliente = response.nombreCliente;
            analisisSeleccionado.oferta = response.oferta;
            analisisSeleccionado.pedido = response.pedido;
            analisisSeleccionado.elemento = response.elemento;
            analisisSeleccionado.nombreElemento =
              tareaSeleccionada.nombreElemento;
            analisisSeleccionado.periodo = date.toLocaleDateString("es", {
              year: "numeric",
              month: "short",
            });
            analisisSeleccionado.analisis = response.analisis;
            analisisSeleccionado.fecha = fechaFormateada;
            analisisSeleccionado.recogido = false;
            analisisSeleccionado.fechaRecogido = null;
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.fechaRealizado = null;
            analisisSeleccionado.operario = response.operario;
            analisisSeleccionado.protocolo = response.protocolo;
            analisisSeleccionado.observaciones = "";
            analisisSeleccionado.facturado = false;
            analisisSeleccionado.numeroFacturado = "";
            analisisSeleccionado.cancelado = false;
            analisisSeleccionado.comentarios = "";
            date.setFullYear(date.getFullYear() + 1);

            peticionPostVis();
          }
        }

        peticionGet();
        GetFichero();
        setFiles([]);

        Swal.fire({
          position: "center",
          icon: "info",
          title: "Tarea Creada",
          text: `La tarea se ha creado correctamente`,
          showConfirmButton: false,
          timer: 3000,
          showClass: {
            popup: "animate__animated animate__bounceIn",
          },
          hideClass: {
            popup: "animate__animated animate__bounceOut",
          },
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error",
          text: `Ya existe una tarea con estos valores`,
          showConfirmButton: true,
        });
      }
    }
  };

  const peticionPut = async () => {
    const tareaFiltrada = data.filter(
      (tarea) => tarea.id === tareaSeleccionada.id
    );

    if (tareaSeleccionada.fecha !== "") {
      setErrorFecha(false);
    } else {
      setErrorFecha(true);
    }

    if (tareaSeleccionada.fecha !== "") {
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const resp = await subirPdfTareas(tareaSeleccionada.id, file);
          if (resp) {
            const archivo = {
              idTarea: tareaSeleccionada.id,
              idFile: resp.data,
            };

            await postArchivo(archivo);
          }
        }
      }

      if (tareaFiltrada[0].tipo !== tareaSeleccionada.tipo) {
        const tareasAsociadas = parametrosAnalisisPlanta.filter(
          (analisi) =>
            analisi.codigoCliente === tareaSeleccionada.codigoCliente &&
            analisi.oferta === tareaSeleccionada.oferta &&
            analisi.elemento === tareaSeleccionada.elemento &&
            analisi.analisis === tareaSeleccionada.analisis &&
            !analisi.deleted
        );

        if (tareasAsociadas.length > 0) {
          await Promise.all([
            ...tareasAsociadas.map((tarea) => {
              return deleteParametrosAnalisisPlanta(tarea.id);
            }),
          ]);
        }

        const elemento = elementosplanta.filter(
          (elem) => elem.id === tareaSeleccionada.elemento
        );
        let nombreElemento = "";

        if (elemento[0].descripcion !== null) {
          nombreElemento = elemento[0].nombre + " " + elemento[0].descripcion;
        } else {
          nombreElemento = elemento[0].nombre + " " + elemento[0].numero;
        }

        var date = new Date(tareaSeleccionada.fecha);

        if (tareaSeleccionada.tipo === 1) {
          for (let i = 0; i < 12; i++) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

            var monthFormatted = month < 10 ? "0" + month : month;
            var dayFormatted = day < 10 ? "0" + day : day;

            var fechaFormateada =
              year + "-" + monthFormatted + "-" + dayFormatted;

            analisisSeleccionado.id = 0;
            analisisSeleccionado.codigoCliente =
              tareaSeleccionada.codigoCliente;
            analisisSeleccionado.nombreCliente =
              tareaSeleccionada.nombreCliente;
            analisisSeleccionado.oferta = tareaSeleccionada.oferta;
            analisisSeleccionado.pedido = tareaSeleccionada.pedido;
            analisisSeleccionado.elemento = tareaSeleccionada.elemento;
            analisisSeleccionado.nombreElemento = nombreElemento;
            analisisSeleccionado.periodo = date.toLocaleDateString("es", {
              year: "numeric",
              month: "short",
            });
            analisisSeleccionado.analisis = tareaSeleccionada.analisis;
            analisisSeleccionado.fecha = fechaFormateada;
            analisisSeleccionado.recogido = false;
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.operario = tareaSeleccionada.operario;
            analisisSeleccionado.observaciones = "";
            analisisSeleccionado.facturado = false;
            analisisSeleccionado.numeroFacturado = "";
            analisisSeleccionado.cancelado = false;
            analisisSeleccionado.comentarios = "";
            date.setMonth(date.getMonth() + 1);
            peticionPostVis();
          }
        }
        if (tareaSeleccionada.tipo === 2) {
          for (let i = 0; i < 6; i++) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

            var monthFormatted = month < 10 ? "0" + month : month;
            var dayFormatted = day < 10 ? "0" + day : day;

            var fechaFormateada =
              year + "-" + monthFormatted + "-" + dayFormatted;

            analisisSeleccionado.id = 0;
            analisisSeleccionado.codigoCliente =
              tareaSeleccionada.codigoCliente;
            analisisSeleccionado.nombreCliente =
              tareaSeleccionada.nombreCliente;
            analisisSeleccionado.oferta = tareaSeleccionada.oferta;
            analisisSeleccionado.pedido = tareaSeleccionada.pedido;
            analisisSeleccionado.elemento = tareaSeleccionada.elemento;
            analisisSeleccionado.nombreElemento = nombreElemento;
            analisisSeleccionado.periodo = date.toLocaleDateString("es", {
              year: "numeric",
              month: "short",
            });
            analisisSeleccionado.analisis = tareaSeleccionada.analisis;
            analisisSeleccionado.fecha = fechaFormateada;
            analisisSeleccionado.recogido = false;
            analisisSeleccionado.fechaRecogido = null;
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.fechaRealizado = null;
            analisisSeleccionado.operario = tareaSeleccionada.operario;
            analisisSeleccionado.observaciones = "";
            analisisSeleccionado.facturado = false;
            analisisSeleccionado.numeroFacturado = "";
            analisisSeleccionado.cancelado = false;
            analisisSeleccionado.comentarios = "";
            date.setMonth(date.getMonth() + 2);
            peticionPostVis();
          }
        }
        if (tareaSeleccionada.tipo === 3) {
          for (let i = 0; i < 4; i++) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

            var monthFormatted = month < 10 ? "0" + month : month;
            var dayFormatted = day < 10 ? "0" + day : day;

            var fechaFormateada =
              year + "-" + monthFormatted + "-" + dayFormatted;

            analisisSeleccionado.id = 0;
            analisisSeleccionado.codigoCliente =
              tareaSeleccionada.codigoCliente;
            analisisSeleccionado.nombreCliente =
              tareaSeleccionada.nombreCliente;
            analisisSeleccionado.oferta = tareaSeleccionada.oferta;
            analisisSeleccionado.pedido = tareaSeleccionada.pedido;
            analisisSeleccionado.elemento = tareaSeleccionada.elemento;
            analisisSeleccionado.nombreElemento = nombreElemento;
            analisisSeleccionado.periodo = date.toLocaleDateString("es", {
              year: "numeric",
              month: "short",
            });
            analisisSeleccionado.analisis = tareaSeleccionada.analisis;
            analisisSeleccionado.fecha = fechaFormateada;
            analisisSeleccionado.recogido = false;
            analisisSeleccionado.fechaRecogido = null;
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.fechaRealizado = null;
            analisisSeleccionado.operario = tareaSeleccionada.operario;
            analisisSeleccionado.observaciones = "";
            analisisSeleccionado.facturado = false;
            analisisSeleccionado.numeroFacturado = "";
            analisisSeleccionado.cancelado = false;
            analisisSeleccionado.comentarios = "";
            date.setMonth(date.getMonth() + 3);
            peticionPostVis();
          }
        }
        if (tareaSeleccionada.tipo === 4) {
          for (let i = 0; i < 2; i++) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

            var monthFormatted = month < 10 ? "0" + month : month;
            var dayFormatted = day < 10 ? "0" + day : day;

            var fechaFormateada =
              year + "-" + monthFormatted + "-" + dayFormatted;

            analisisSeleccionado.id = 0;
            analisisSeleccionado.codigoCliente =
              tareaSeleccionada.codigoCliente;
            analisisSeleccionado.nombreCliente =
              tareaSeleccionada.nombreCliente;
            analisisSeleccionado.oferta = tareaSeleccionada.oferta;
            analisisSeleccionado.pedido = tareaSeleccionada.pedido;
            analisisSeleccionado.elemento = tareaSeleccionada.elemento;
            analisisSeleccionado.nombreElemento = nombreElemento;
            analisisSeleccionado.periodo = date.toLocaleDateString("es", {
              year: "numeric",
              month: "short",
            });
            analisisSeleccionado.analisis = tareaSeleccionada.analisis;
            analisisSeleccionado.fecha = fechaFormateada;
            analisisSeleccionado.recogido = false;
            analisisSeleccionado.fechaRecogido = null;
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.fechaRealizado = null;
            analisisSeleccionado.operario = tareaSeleccionada.operario;
            analisisSeleccionado.observaciones = "";
            analisisSeleccionado.facturado = false;
            analisisSeleccionado.numeroFacturado = "";
            analisisSeleccionado.cancelado = false;
            analisisSeleccionado.comentarios = "";
            date.setMonth(date.getMonth() + 6);
            peticionPostVis();
          }
        }
        if (tareaSeleccionada.tipo === 5) {
          for (let i = 0; i < 1; i++) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

            var monthFormatted = month < 10 ? "0" + month : month;
            var dayFormatted = day < 10 ? "0" + day : day;

            var fechaFormateada =
              year + "-" + monthFormatted + "-" + dayFormatted;

            analisisSeleccionado.id = 0;
            analisisSeleccionado.codigoCliente =
              tareaSeleccionada.codigoCliente;
            analisisSeleccionado.nombreCliente =
              tareaSeleccionada.nombreCliente;
            analisisSeleccionado.oferta = tareaSeleccionada.oferta;
            analisisSeleccionado.pedido = tareaSeleccionada.pedido;
            analisisSeleccionado.elemento = tareaSeleccionada.elemento;
            analisisSeleccionado.nombreElemento = nombreElemento;
            analisisSeleccionado.periodo = date.toLocaleDateString("es", {
              year: "numeric",
              month: "short",
            });
            analisisSeleccionado.analisis = tareaSeleccionada.analisis;
            analisisSeleccionado.fecha = fechaFormateada;
            analisisSeleccionado.recogido = false;
            analisisSeleccionado.fechaRecogido = null;
            analisisSeleccionado.realizado = false;
            analisisSeleccionado.fechaRealizado = null;
            analisisSeleccionado.operario = tareaSeleccionada.operario;
            analisisSeleccionado.observaciones = "";
            analisisSeleccionado.facturado = false;
            analisisSeleccionado.numeroFacturado = "";
            analisisSeleccionado.cancelado = false;
            analisisSeleccionado.comentarios = "";
            date.setFullYear(date.getFullYear() + 1);
            peticionPostVis();
          }
        }
      }

      if (tareaFiltrada[0].operario !== tareaSeleccionada.operario) {
        const tareasAsociadas = parametrosAnalisisPlanta.filter(
          (analisi) =>
            analisi.codigoCliente === tareaSeleccionada.codigoCliente &&
            analisi.oferta === tareaSeleccionada.oferta &&
            analisi.elemento === tareaSeleccionada.elemento &&
            analisi.analisis === tareaSeleccionada.analisis &&
            !analisi.deleted
        );

        if (tareasAsociadas.length > 0) {
          await Promise.all([
            ...tareasAsociadas.map((tarea) => {
              tarea.operario = tareaSeleccionada.operario;
              return putParametrosAnalisisPlanta(tarea);
            }),
          ]);
        }
      }

      await putTareas(tareaSeleccionada);

      var tareaModificada = data;
      tareaModificada.map((tarea) => {
        if (tarea.id === tareaSeleccionada.id) {
          tarea = tareaSeleccionada;
        }
      });
      peticionGet();
      peticionGetTareas();
      peticionGetArchivos();
      GetFichero();
      setFiles([]);

      Swal.fire({
        position: "center",
        icon: "info",
        title: "Tarea Editada",
        text: `La tarea se ha editado correctamente`,
        showConfirmButton: false,
        timer: 2000,
        showClass: {
          popup: "animate__animated animate__bounceIn",
        },
        hideClass: {
          popup: "animate__animated animate__bounceOut",
        },
      });
    }
  };

  const peticionDelete = async () => {
    abrirCerrarModalEliminar();
    setCargando(true);

    try {
      var i = 0;

      while (i < TareaEliminar.length) {
        await deleteTareas(TareaEliminar[i]);

        setTareaSeleccionada({
          id: 0,
          codigoCliente: 0,
          nombreCliente: "",
          oferta: 0,
          pedido: 0,
          operario: "",
          protocolo: "",
          elemento: 0,
          nombreElemento: "",
          analisis: 0,
          nombreAnalisis: "",
          fecha: null,
          tipo: 0,
          observaciones: "",
          pdf: 0,
          addDate: null,
          addIdUser: null,
          modDate: null,
          modIdUser: null,
          delDate: null,
          delIdUser: null,
          deleted: null,
        });

        i++;
      }

      peticionGet();

      Swal.fire({
        position: "center",
        icon: "info",
        title: "Tarea Eliminada",
        text: `La tarea se ha eliminado correctamente`,
        showConfirmButton: false,
        timer: 2000,
        showClass: {
          popup: "animate__animated animate__bounceIn",
        },
        hideClass: {
          popup: "animate__animated animate__bounceOut",
        },
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: "Error al borrar la tarea",
        showConfirmButton: true,
      });
    } finally {
      setCargando(false);
    }
  };

  const peticionPostVis = async () => {
    analisisSeleccionado.id = 0;
    analisisSeleccionado.codigoCliente = tareaSeleccionada.codigoCliente;
    analisisSeleccionado.nombreCliente = tareaSeleccionada.nombreCliente;
    analisisSeleccionado.oferta = tareaSeleccionada.oferta;
    analisisSeleccionado.analisis = tareaSeleccionada.analisis;
    analisisSeleccionado.pedido = tareaSeleccionada.pedido;
    analisisSeleccionado.elemento = tareaSeleccionada.elemento;

    await postParametrosAnalisisPlanta(analisisSeleccionado);

    setAnalisisSeleccionado({
      id: 0,
      codigoCliente: 0,
      nombreCliente: "",
      oferta: 0,
      pedido: 0,
      elemento: 0,
      periodo: "",
      analisis: 0,
      fecha: null,
      recogido: false,
      fechaRecogido: null,
      realizado: false,
      fechaRealizado: null,
      operario: "",
      protocolo: "",
      observaciones: "",
      facturado: false,
      numeroFacturado: "",
      cancelado: false,
      comentarios: "",
      addDate: null,
      addIdUser: null,
      modDate: null,
      modIdUser: null,
      delDate: null,
      delIdUser: null,
      deleted: null,
    });
  };

  const handleChange = (e) => {
    setTareaSeleccionada((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.type === "number" ? parseInt(e.target.value) : e.target.value,
    }));
  };

  const handleChangeFecha = (e) => {
    const { name, value } = e.target;
    setTareaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleFilterOferta = (event) => {
    if (event.target.innerText !== undefined) {
      setFilterOferta(parseInt(event.target.innerText));
    } else {
      setFilterOferta(0);
    }
  };

  const handlePdf = (e) => {
    setFiles(e.target.files);
  };

  const filteredData = rows.filter(
    (item) =>
      item.nombreCliente.toLowerCase().includes(filterText.toLowerCase()) &&
      (filterOferta !== 0 ? item.oferta === filterOferta : true)
  );

  const handleAutocompleteChange = (e) => {
    setTareaSeleccionada((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.type === "number" ? parseInt(e.target.value) : e.target.value,
    }));
  };

  const handleChangeAnalisis = (event, value) => {
    setTareaSeleccionada((prevState) => ({
      ...prevState,
      analisis: parseInt(value.id),
      nombreAnalisis: value.nombre,
    }));
  };

  //modal insertar mantenimientocab
  const abrirCerrarModalInsertar = () => {
    setErrorAnalisis(false);
    setErrorCodigo(false);
    setErrorElemento(false);
    setErrorFecha(false);
    setErrorOferta(false);
    setErrorOperario(false);
    setErrorPeriodo(false);
    setFiles([]);
    if (modalInsertar) {
      setTareaSeleccionada({
        id: 0,
        codigoCliente: 0,
        nombreCliente: "",
        oferta: 0,
        pedido: 0,
        operario: 0,
        elemento: 0,
        nombreElemento: "",
        analisis: 0,
        nombreAnalisis: "",
        fecha: null,
        tipo: 0,
        observaciones: "",
        pdf: 0,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
      });
      setObservacion({
        id: 0,
        idElemento: 0,
        observacion: "",
        nombreUsuario: "",
        apellidosUsuario: "",
        fecha: null,
        verCliente: false,
        verInsp: false,
      });
      setObservaciones([]);
      setObservacionEditar({
        id: 0,
        idElemento: 0,
        observacion: "",
        nombreUsuario: "",
        apellidosUsuario: "",
        fecha: null,
        verCliente: true,
        verInsp: true,
      });
      setModalInsertar(!modalInsertar);
    } else {
      setModalInsertar(!modalInsertar);
    }
  };

  //modal editar mantenimiento

  const abrirCerrarModalEditar = () => {
    setTareasNuevas([]);
    setErrorAnalisis(false);
    setErrorCodigo(false);
    setErrorElemento(false);
    setErrorFecha(false);
    setErrorOferta(false);
    setErrorOperario(false);
    setErrorPeriodo(false);
    setFiles([]);
    if (modalEditar) {
      setTareaSeleccionada({
        id: 0,
        codigoCliente: 0,
        nombreCliente: "",
        oferta: 0,
        pedido: 0,
        operario: 0,
        elemento: 0,
        nombreElemento: "",
        analisis: 0,
        nombreAnalisis: "",
        fecha: null,
        tipo: 0,
        observaciones: "",
        pdf: 0,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
      });
      setObservacion({
        id: 0,
        idElemento: 0,
        observacion: "",
        nombreUsuario: "",
        apellidosUsuario: "",
        fecha: null,
        verCliente: true,
        verInsp: true,
      });
      setObservaciones([]);
      setObservacionEditar({
        id: 0,
        idElemento: 0,
        observacion: "",
        nombreUsuario: "",
        apellidosUsuario: "",
        fecha: null,
        verCliente: true,
        verInsp: true,
      });
      setModalEditar(!modalEditar);
    } else {
      setModalEditar(!modalEditar);
    }
  };

  // modal eliminar mantenimiento
  const abrirCerrarModalEliminar = () => {
    setErrorAnalisis(false);
    setErrorCodigo(false);
    setErrorElemento(false);
    setErrorFecha(false);
    setErrorOferta(false);
    setErrorOperario(false);
    setErrorPeriodo(false);
    setFiles([]);
    if (modalEliminar) {
      setTareaSeleccionada({
        id: 0,
        codigoCliente: 0,
        nombreCliente: "",
        oferta: 0,
        pedido: 0,
        operario: 0,
        elemento: 0,
        nombreElemento: "",
        analisis: 0,
        nombreAnalisis: "",
        fecha: null,
        tipo: 0,
        observaciones: "",
        pdf: 0,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
      });
      setObservacion({
        id: 0,
        idElemento: 0,
        observacion: "",
        nombreUsuario: "",
        apellidosUsuario: "",
        fecha: null,
        verCliente: true,
        verInsp: true,
      });
      setObservaciones([]);
      setObservacionEditar({
        id: 0,
        idElemento: 0,
        observacion: "",
        nombreUsuario: "",
        apellidosUsuario: "",
        fecha: null,
        verCliente: true,
        verInsp: true,
      });
      setModalEliminar(!modalEliminar);
    } else {
      setModalEliminar(!modalEliminar);
    }
  };

  const handleSelectRow = (ids) => {
    if (ids.length > 0) {
      setTareaSeleccionada(data.filter((tarea) => tarea.id === ids[0])[0]);
    } else {
      setTareaSeleccionada(tareaSeleccionada);
    }

    setRowsIds(ids);
  };

  return (
    <>
      {user.idPerfil === 1 ? (
        <MainLayout title="Tareas">
          <Grid container spacing={3}>
            {/* Título y botones de opción */}
            <Grid item xs={12}>
              <Card
                sx={{ p: 2, display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="h6">Listado de Tareas</Typography>
                <Grid item xs={4}>
                  <TextField
                    label="Filtrar cliente"
                    variant="outlined"
                    value={filterText}
                    onChange={handleFilterChange}
                    sx={{ width: "50%" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    sx={{ width: "50%" }}
                    id="Oferta"
                    options={ofertas}
                    filterOptions={(options) =>
                      ofertas.filter((oferta) => !oferta.deleted)
                    }
                    getOptionLabel={(option) => option.numeroOferta.toString()}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Filtrar por oferta"
                        name="oferta"
                      />
                    )}
                    onChange={handleFilterOferta}
                  />
                </Grid>
                {rowsIds.length > 0 ? (
                  <Grid item>
                    <Button
                      sx={{ height: "40px" }}
                      color="error"
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      onClick={(event, rowData) => {
                        setTareaEliminar(rowsIds);
                        abrirCerrarModalEliminar();
                      }}
                    >
                      Eliminar
                    </Button>
                  </Grid>
                ) : (
                  <Button
                    sx={{ height: "40px" }}
                    color="success"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={abrirCerrarModalInsertar}
                  >
                    Añadir
                  </Button>
                )}
              </Card>
            </Grid>
            {cargando && (
              <div className="spinner-overlay">
                <TailSpin
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  visible={true}
                />
              </div>
            )}
            {/* Tabla donde se muestran los registros de los clientes */}
            <Grid item xs={12}>
              <Card>
                <DataGrid
                  localeText={DATAGRID_LOCALE_TEXT}
                  sx={{
                    width: "100%",
                    height: 1000,
                    backgroundColor: "#FFFFFF",
                  }}
                  rows={filteredData}
                  columns={columns}
                  pageSize={100}
                  checkboxSelection
                  disableSelectionOnClick
                  onSelectionModelChange={(ids) => handleSelectRow(ids)}
                  onRowClick={(tareaSeleccionada, evt) => {
                    setTareaSeleccionada(tareaSeleccionada.row);
                    setClienteTareaEditar(
                      clientes.filter(
                        (cliente) =>
                          cliente.codigo === tareaSeleccionada.row.codigoCliente
                      )
                    );
                    setElementoTareaEditar(
                      elementosplanta.filter(
                        (elemento) =>
                          elemento.id === tareaSeleccionada.row.elemento
                      )
                    );
                    setTipoTareaEditar(
                      tipos.filter(
                        (tipo) => tipo.id === tareaSeleccionada.row.tipo
                      )
                    );
                    setTecnicoTareaEditar(
                      operarios.filter(
                        (operario) =>
                          operario.id === tareaSeleccionada.row.operario
                      )
                    );
                    setAnalisisEditar(
                      analisis.filter(
                        (analisi) =>
                          analisi.id === tareaSeleccionada.row.analisis
                      )
                    );
                    setPdfEditar(
                      ficheros.filter(
                        (fich) => fich.id === tareaSeleccionada.row.pdf
                      )
                    );
                    abrirCerrarModalEditar();
                  }}
                />
              </Card>
            </Grid>
          </Grid>

          {/* LISTA DE MODALS */}

          {/* Agregar tarea */}
          <ModalLayout
            titulo="Agregar nueva tarea"
            contenido={
              <InsertarTareaModal
                change={handleChange}
                autocompleteChange={handleAutocompleteChange}
                tareaSeleccionada={tareaSeleccionada}
                handleChangeFecha={handleChangeFecha}
                setTareaSeleccionada={setTareaSeleccionada}
                handleChangeAnalisis={handleChangeAnalisis}
                elementosAutocomplete={elementosAutocomplete}
                analisisAutocomplete={analisisAutocomplete}
                errorAnalisis={errorAnalisis}
                errorCodigo={errorCodigo}
                errorElemento={errorElemento}
                errorFecha={errorFecha}
                errorOferta={errorOferta}
                errorOperario={errorOperario}
                errorPeriodo={errorPeriodo}
                handlePdf={handlePdf}
                files={files}
                observaciones={observaciones}
                setObservaciones={setObservaciones}
                observacion={observacion}
                setObservacion={setObservacion}
                observacionEditar={observacionEditar}
                setObservacionEditar={setObservacionEditar}
                operarios={operarios}
                clientes={clientes}
                ofertas={ofertas}
              />
            }
            botones={[
              insertarBotonesModal(<AddIcon />, "Insertar", async () => {
                peticionPost();
              }),
            ]}
            open={modalInsertar}
            onClose={abrirCerrarModalInsertar}
          />

          {/* Modal Editar Tarea*/}

          <ModalLayout
            titulo="Editar tarea"
            contenido={
              <EditarTareaModal
                handleChange={handleChange}
                tareaSeleccionada={tareaSeleccionada}
                autocompleteChange={handleAutocompleteChange}
                handleChangeFecha={handleChangeFecha}
                setTareaSeleccionada={setTareaSeleccionada}
                handleChangeAnalisis={handleChangeAnalisis}
                codigoClienteEditar={clienteTareaEditar}
                tipoTareaEditar={tipoTareaEditar}
                tecnicoTareaEditar={tecnicoTareaEditar}
                elementosAutocomplete={elementosAutocomplete}
                analisisAutocomplete={analisisAutocomplete}
                elementoTareaEditar={elementoTareaEditar}
                analisisEditar={analisisEditar}
                pdfEditar={pdfEditar}
                errorFecha={errorFecha}
                handlePdf={handlePdf}
                tareasNuevas={tareasNuevas}
                files={files}
                archivos={archivos}
                setArchivos={setArchivos}
                observaciones={observaciones}
                setObservaciones={setObservaciones}
                observacion={observacion}
                setObservacion={setObservacion}
                observacionEditar={observacionEditar}
                setObservacionEditar={setObservacionEditar}
              />
            }
            botones={[
              insertarBotonesModal(<AddIcon />, "Guardar", async () => {
                peticionPut();
              }),
            ]}
            open={modalEditar}
            onClose={abrirCerrarModalEditar}
          />

          {/* Eliminar tarea */}
          <ModalLayout
            titulo="Eliminar tarea"
            contenido={
              rowsIds.length > 1 ? (
                <Grid item xs={12}>
                  <Typography>
                    ¿Estás seguro que deseas eliminar las <b>{rowsIds.length}</b> tareas seleccionadas?
                  </Typography>
                </Grid>
              ) : (
                <>
                  <Grid item xs={12}>
                    <Typography>
                      Estás seguro que deseas eliminar la tarea?
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <b>{tareaSeleccionada.nombreCliente}</b>
                    </Typography>
                  </Grid>
                </>
              )
            }
            botones={[
              insertarBotonesModal(
                <DeleteIcon />,
                "Eliminar",
                async () => {
                  peticionDelete();
                },
                "error"
              ),
            ]}
            open={modalEliminar}
            onClose={abrirCerrarModalEliminar}
          />
        </MainLayout >
      ) : (
        <MainLayout title="Tareas">
          <Grid container spacing={2}>
            {/* Título y botones de opción */}
            <Grid item xs={12}>
              <Card
                sx={{ p: 2, display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="h6">Listado de Tareas</Typography>
                <Grid item xs={4}>
                  <TextField
                    label="Filtrar cliente"
                    variant="outlined"
                    value={filterText}
                    onChange={handleFilterChange}
                    sx={{ width: "50%" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    sx={{ width: "50%" }}
                    id="Oferta"
                    options={ofertas}
                    getOptionLabel={(option) => option.numeroOferta.toString()}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Filtrar por oferta"
                        name="oferta"
                      />
                    )}
                    onChange={handleFilterOferta}
                  />
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <DataGrid
                  localeText={DATAGRID_LOCALE_TEXT}
                  sx={{
                    width: "100%",
                    height: 1000,
                    backgroundColor: "#FFFFFF",
                  }}
                  rows={filteredData}
                  columns={columns}
                  pageSize={100}
                  onSelectionModelChange={(ids) => handleSelectRow(ids)}
                  onRowClick={(tareaSeleccionada, evt) => {
                    setTareaSeleccionada(tareaSeleccionada.row);
                    setClienteTareaEditar(
                      clientes.filter(
                        (cliente) =>
                          cliente.codigo === tareaSeleccionada.row.codigoCliente
                      )
                    );
                    setElementoTareaEditar(
                      elementosplanta.filter(
                        (elemento) =>
                          elemento.id === tareaSeleccionada.row.elemento
                      )
                    );
                    setTipoTareaEditar(
                      tipos.filter(
                        (tipo) => tipo.id === tareaSeleccionada.row.tipo
                      )
                    );
                    setTecnicoTareaEditar(
                      operarios.filter(
                        (operario) =>
                          operario.id === tareaSeleccionada.row.operario
                      )
                    );
                    setAnalisisEditar(
                      analisis.filter(
                        (analisi) =>
                          analisi.id === tareaSeleccionada.row.analisis
                      )
                    );
                    setPdfEditar(
                      ficheros.filter(
                        (fich) => fich.id === tareaSeleccionada.row.pdf
                      )
                    );
                    abrirCerrarModalEditar();
                  }}
                />
              </Card>
            </Grid>
          </Grid>

          <ModalLayout2
            titulo="Editar tarea"
            contenido={
              <EditarTareaModal
                handleChange={handleChange}
                tareaSeleccionada={tareaSeleccionada}
                autocompleteChange={handleAutocompleteChange}
                handleChangeFecha={handleChangeFecha}
                setTareaSeleccionada={setTareaSeleccionada}
                handleChangeAnalisis={handleChangeAnalisis}
                codigoClienteEditar={clienteTareaEditar}
                tipoTareaEditar={tipoTareaEditar}
                tecnicoTareaEditar={tecnicoTareaEditar}
                elementosAutocomplete={elementosAutocomplete}
                analisisAutocomplete={analisisAutocomplete}
                elementoTareaEditar={elementoTareaEditar}
                analisisEditar={analisisEditar}
                pdfEditar={pdfEditar}
                errorFecha={errorFecha}
                handlePdf={handlePdf}
                tareasNuevas={tareasNuevas}
                files={files}
                archivos={archivos}
                setArchivos={setArchivos}
                observaciones={observaciones}
                setObservaciones={setObservaciones}
                observacion={observacion}
                setObservacion={setObservacion}
                observacionEditar={observacionEditar}
                setObservacionEditar={setObservacionEditar}
              />
            }
            botones={[insertarBotonesModal(<AddIcon />, "Guardar")]}
            open={modalEditar}
            onClose={abrirCerrarModalEditar}
          />
        </MainLayout>
      )}
    </>
  );
};
