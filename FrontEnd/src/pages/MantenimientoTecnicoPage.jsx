import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Card,
  CardContent,
  Autocomplete,
  Typography,
  RadioGroup,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import "./MantenimientoTecnico.css";
import { MainLayout } from "../layout/MainLayout";
import { ParametroMantenimiento } from "../components/Mantenimiento/ParametroMantenimiento";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import {
  getConfNivelesPlantasCliente,
  getParametrosElementoPlantaClienteConFiltros,
  getUsuarios,
  getClientes,
  getOfertas,
  getParametros,
  getFilasParametros,
  putValorParametros,
  getAnalisis,
  getAnalisisNivelesPlantasCliente,
  getParametrosAnalisisPlanta,
  generarPdf,
  getParametrosAnalisisFiltrados,
  putParametrosAnalisisPlanta,
  postValorParametros,
  getElementosPlanta,
  getAnalisisId,
  getTareas,
  bajarPdfInstrucciones,
  getArchivosByIdTarea,
  getValorParametros,
} from "../api";
import { ObservacionesElementos } from "../components/ObservacionesElementos/ObservacionesElementos";
import { ComentariosElementos } from "../components/ComentariosElementos/ComentariosElementos";
import { getComentariosByTareaId } from "../api/comentariosElementos";

import { ModalLayout } from "../components/ModalLayout";
import { insertarBotonesModal } from "../helpers/insertarBotonesModal";
import DeleteIcon from "@mui/icons-material/Delete";

import { TailSpin } from "react-loader-spinner";
import { ComentariosElementosNoFQ } from "../components/ComentariosElementos/ComentariosElementosNoFQ";
import {
  getObservacionesByElementoId,
  postObservacion,
} from "../api/observacionesElementos";
import { getFileById } from "../api/files";

export const MantenimientoTecnicoPage = () => {
  const { user } = useContext(AuthContext);

  /*** VARIABLES ***/
  let opcionesFiltradasAnalisis = [];
  let opcionesNombreFiltradasAnalisis = [];

  /*** ESTADOS ***/

  // Declaración de variables
  const [clientes, setClientes] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [elementos, setElementos] = useState([]);
  const [analisis, setAnalisis] = useState([]);
  const [operarios, setOperarios] = useState([]);
  const [parametros, setParametros] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [parametrosElemento, setParametrosElemento] = useState([]);
  const [parametrosAnalisisPlanta, setParametrosAnalisisPlanta] = useState([]);
  const [tareaAnalisisPlanta, setTareaAnalisisPlanta] = useState({});
  const [confNivelesPlantasCliente, setConfNivelesPlantasCliente] = useState(
    []
  );
  const [
    confAnalisisNivelesPlantasCliente,
    setConfAnalisisNivelesPlantasCliente,
  ] = useState([]);
  const [elementosAutocomplete, setElementosAutocomplete] = useState([]);
  const [analisisAutocomplete, setAnalisisAutocomplete] = useState([]);
  const [valoresParametros, setValoresParametros] = useState([]);
  const [parametrosSeleccionado, setParametrosSeleccionado] = useState({
    id: 0,
    codigoCliente: 0,
    nombreCliente: "",
    referencia: "",
    oferta: 0,
    idElemento: 0,
    nombreElemento: "",
    idAnalisis: 0,
    nombreAnalisis: "",
    idOperario: 0,
    realizado: false,
    fecha: null,
    fechaIso: null,
    parametro: 0,
    unidad: "",
    valor: "",
    metodo: "1. 18",
    puntoMuestreo: "Punto de muestreo en el retorno según PPCL"
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

  const [archivoSeleccionado, setArchivoSeleccionado] = useState([]);

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const [parametrosFiltrados, setParametrosFiltrados] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [pdf, setPdf] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [data, setData] = useState([]);

  const [nombreOperario, setNombreOperario] = useState([]);

  const [analisisActivo, setAnalisisActivo] = useState({});

  const [cargando, setCargando] = useState(false);

  const GetConfNivelesPlantasCliente = async () => {
    const resp = await getConfNivelesPlantasCliente();
    const niveles = resp.filter((nivel) => !nivel.deleted);
    setConfNivelesPlantasCliente(niveles);
  };

  const [inputCodigoCliente, setInputCodigoCliente] = useState("");
  const [inputNombreCliente, setInputNombreCliente] = useState("");
  const [inputOferta, setInputOferta] = useState("");
  /*** EFECTOS ***/

  useEffect(() => {
    cargarComentarios();
  }, [parametrosSeleccionado.idElemento]);

  const cargarComentarios = () => {
    getObservacionesByElementoId(parametrosSeleccionado.idElemento).then(
      (res) => {
        setObservaciones(res);
      }
    );
  };

  useEffect(() => {
    setParametrosSeleccionado((prevState) => ({
      ...prevState,
      idOperario: user.id,
    }));
  }, [user]);

  // Peticiones a la api
  useEffect(() => {
    getValorParametros().then((resp) =>
      setData(resp.filter((valor) => !valor.deleted))
    );

    getClientes().then((resp) =>
      setClientes(resp.filter((cliente) => !cliente.deleted))
    );

    getOfertas().then((resp) =>
      setOfertas(resp.filter((oferta) => !oferta.deleted))
    );

    getElementosPlanta().then((resp) =>
      setElementos(resp.filter((el) => !el.deleted))
    );

    getParametros().then((resp) =>
      setParametros(resp.filter((param) => !param.deleted))
    );

    getAnalisis().then((resp) => setAnalisis(resp.filter((an) => !an.deleted)));

    getTareas().then((resp) =>
      setTareas(resp.filter((tarea) => !tarea.deleted))
    );

    getUsuarios().then((resp) =>
      setOperarios(resp.filter((op) => !op.deleted))
    );

    getAnalisisNivelesPlantasCliente().then((resp) =>
      setConfAnalisisNivelesPlantasCliente(resp.filter((an) => !an.deleted))
    );

    getParametrosAnalisisPlanta().then((resp) =>
      setParametrosAnalisisPlanta(resp.filter((param) => !param.deleted))
    );

    GetConfNivelesPlantasCliente();
  }, []);

  // Filtramos elementos para el desplegable
  useEffect(() => {
    let elementosLista = [];

    confNivelesPlantasCliente
      .filter(
        (planta) =>
          planta.codigoCliente === parametrosSeleccionado.codigoCliente &&
          planta.oferta === parametrosSeleccionado.oferta
      )
      .map((elem) => {
        const elementosFiltrados = elementos.filter(
          (elementoLista) => elementoLista.id === elem.id_Elemento
        )[0];
        if (elementosFiltrados !== undefined) {
          elementosLista.push(elementosFiltrados);
        }
      });
    setElementosAutocomplete(elementosLista);
  }, [parametrosSeleccionado.codigoCliente, parametrosSeleccionado.oferta]);

  useEffect(() => {
    opcionesFiltradasAnalisis = [];
    opcionesNombreFiltradasAnalisis = [];

    const lista = confNivelesPlantasCliente.filter(
      (planta) =>
        planta.codigoCliente === parametrosSeleccionado.codigoCliente &&
        planta.oferta === parametrosSeleccionado.oferta &&
        planta.id_Elemento === parametrosSeleccionado.idElemento
    );

    lista.map((analisis) => {
      opcionesFiltradasAnalisis.push(
        confAnalisisNivelesPlantasCliente.filter(
          (anal) => anal.id_NivelesPlanta === analisis.id
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
  }, [parametrosSeleccionado.idElemento]);

  /*** FUNCIONES ***/

  const handleChangePdf = (e) => {
    setArchivoSeleccionado(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParametrosSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeRadioButton = (e) => {
    const { name, value } = e.target;
    if (value === "false") {
      setParametrosSeleccionado((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    } else {
      setParametrosSeleccionado((prevState) => ({
        ...prevState,
        [name]: true,
      }));
    }
  };

  const handleChangeCheckbox = (e) => {
    const { name, checked } = e.target;
    const fechaActual = Date.now();
    const hoy = new Date(fechaActual);
    setTareaAnalisisPlanta((valorPrevio) => ({
      ...valorPrevio,
      [name]: checked,
      fechaRecogido: hoy.toISOString(),
    }));
  };

  const handleChangeCheckbox2 = (e) => {
    const { name, checked } = e.target;
    const fechaActual = Date.now();
    const hoy = new Date(fechaActual);
    setTareaAnalisisPlanta((valorPrevio) => ({
      ...valorPrevio,
      [name]: checked,
      fechaRealizado: hoy.toISOString(),
    }));
  };

  const onChangeElemento = (e, value, name) => {
    setValoresParametros([]);
    setTareaAnalisisPlanta({});

    setParametrosSeleccionado((prevState) => ({
      ...prevState,
      [name]: value.id,
      nombreElemento: e.target.textContent,
      idAnalisis: 0,
      nombreAnalisis: "",
      fecha: null,
      fechaIso: "",
    }));
  };

  const onChangeAnalisis = (e, value, name) => {
    if (e.target.innerText !== "") {
      setParametrosFiltrados(
        tareas.filter(
          (tarea) =>
            tarea.codigoCliente === parametrosSeleccionado.codigoCliente &&
            tarea.oferta === parametrosSeleccionado.oferta &&
            tarea.elemento === parametrosSeleccionado.idElemento &&
            tarea.analisis === value.id
        )
      );
    }

    setValoresParametros([]);
    setTareaAnalisisPlanta({});

    setParametrosSeleccionado((prevState) => ({
      ...prevState,
      [name]: value.id,
      nombreAnalisis: e.target.textContent,
      fecha: null,
      fechaIso: "",
    }));
  };

  const onChangeFecha = async (e, value, name) => {
    await getArchivosByIdTarea(parametrosFiltrados[0].id).then((res) => {
      setArchivos(res);
    });

    setValoresParametros([]);

    setParametrosSeleccionado((prevState) => ({
      ...prevState,
      [name]: value.fecha,
      fechaIso: e.target.textContent,
    }));
  };

  const onChangeOperario = (e, value, name) => {
    setParametrosSeleccionado((prevState) => ({
      ...prevState,
      [name]: value.id,
    }));

    if (tareaAnalisisPlanta != {}) {
      setTareaAnalisisPlanta((prevState) => ({
        ...prevState,
        operario: value.id,
      }));
    }
  };

  const handleOpenModal = async () => {
    setOpenModal(true);

    try {
      const results = await Promise.all(
        archivos.map(async (archivo) => {
          const res = await getFileById(archivo.idFile);
          return res;
        })
      );

      setPdf((prev) => [...prev, ...results]);
    } catch (error) {
      console.error("Error al obtener los archivos:", error);
    }
  };

  const handleGetParametros = async () => {
    const resp = await getFilasParametros(
      parametrosSeleccionado.codigoCliente,
      parametrosSeleccionado.oferta,
      parametrosSeleccionado.idElemento,
      parametrosSeleccionado.idAnalisis,
      parametrosSeleccionado.fecha
    );

    const parametroAsociadosSinFecha = data.filter(
      (valor) =>
        valor.codigoCliente === parametrosSeleccionado.codigoCliente &&
        valor.oferta === parametrosSeleccionado.oferta &&
        valor.id_Elemento === parametrosSeleccionado.idElemento &&
        valor.id_Analisis === parametrosSeleccionado.idAnalisis &&
        valor.fecha === null &&
        !valor.deleted
    );

    const noCoincidentes = parametroAsociadosSinFecha.filter(
      (sinFecha) =>
        !resp.some((conFecha) => conFecha.parametro === sinFecha.parametro)
    );

    const respActualizado = [...resp, ...noCoincidentes];
    setParametrosElemento(respActualizado);

    const resp2 = await getParametrosAnalisisFiltrados(
      parametrosSeleccionado.codigoCliente,
      parametrosSeleccionado.oferta,
      parametrosSeleccionado.idElemento,
      parametrosSeleccionado.idAnalisis,
      parametrosSeleccionado.fecha
    );
    setTareaAnalisisPlanta(resp2[0]);

    const resp3 = await getAnalisisId(resp2[0].analisis);
    setAnalisisActivo((prev) => ({
      ...prev,
      nombre: resp3.nombre,
      id: resp3.id,
      tipo: resp3.tipo,
    }));

    const fecha = new Date(parametrosSeleccionado.fecha);
    const fecha2 = new Date(parametrosSeleccionado.fecha);

    // Resta un mes a la fecha
    fecha.setMonth(fecha.getMonth() - 1);
    fecha2.setMonth(fecha2.getMonth() - 2);

    // Formatea la nueva fecha de vuelta a la cadena en el formato deseado
    const nuevaFechaEnFormatoDeseado = new Date(
      fecha.getTime() - fecha.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 19);
    const nuevaFechaEnFormatoDeseado2 = new Date(
      fecha2.getTime() - fecha2.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 19);

    // Preparamos la variable que almacenará los valores de los parametros
    let parametrosMostrar = [];

    const datos = await getParametrosElementoPlantaClienteConFiltros(
      parametrosSeleccionado.codigoCliente,
      parametrosSeleccionado.oferta,
      parametrosSeleccionado.idElemento,
      parametrosSeleccionado.idAnalisis
    );

    const valoresMesPasado = await getFilasParametros(
      parametrosSeleccionado.codigoCliente,
      parametrosSeleccionado.oferta,
      parametrosSeleccionado.idElemento,
      parametrosSeleccionado.idAnalisis,
      nuevaFechaEnFormatoDeseado
    );
    const valoresDosMesPasado = await getFilasParametros(
      parametrosSeleccionado.codigoCliente,
      parametrosSeleccionado.oferta,
      parametrosSeleccionado.idElemento,
      parametrosSeleccionado.idAnalisis,
      nuevaFechaEnFormatoDeseado2
    );

    if (resp3.tipo === 0) {
      respActualizado.map((registro) => {
        const valoresPorParametro = datos.filter(
          (param) => param.parametro === registro.parametro
        );

        // Preparamos el valor del mes actual y el arreglo de meses
        let mesActual = new Date(parametrosSeleccionado.fecha).getMonth() + 1;

        let fechas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let fechas2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        const valorMesPasado = valoresMesPasado.filter(
          (valor) => valor.parametro === registro.parametro
        );
        const valorDosMesPasado = valoresDosMesPasado.filter(
          (valor) => valor.parametro === registro.parametro
        );
        // Mapeamos los valores en un array, y si no hay datos seteamos un 0
        valorMesPasado.map((val) => {
          const fecha = new Date(val.fecha);

          for (let i = 0; i < 12; i++) {
            if (fecha.getMonth() === i) {
              fechas[i] = val.valor;
            }
          }
        });

        const parametro = parametros.filter(
          (param) => param.id === registro.parametro
        )[0];

        valorDosMesPasado.map((val) => {
          const fecha = new Date(val.fecha);

          for (let i = 0; i < 12; i++) {
            if (fecha.getMonth() === i) {
              fechas2[i] = val.valor;
            }
          }
        });

        // Obtenemos los dos últimos meses y si no hay registros, seteamos un 0

        let ultimoMes = (mesActual - 2 + 12) % 12;
        let penultimoMes = (mesActual - 3 + 12) % 12;

        let valoresMeses = [fechas2[penultimoMes], fechas[ultimoMes]];

        valoresMeses = valoresMeses.reverse();

        // Creamos el objeto
        parametrosMostrar.push({
          id: registro.id,
          codigoCliente: parametrosSeleccionado.codigoCliente,
          fecha: registro.fecha,
          id_Elemento: parametrosSeleccionado.idElemento,
          oferta: parametrosSeleccionado.oferta,
          id_Analisis: parametrosSeleccionado.idAnalisis,
          id_Operario:
            registro.id_Operario != null
              ? registro.id_Operario
              : parametrosSeleccionado.idOperario,
          parametro: registro.parametro,
          referencia: parametrosSeleccionado.referencia,
          unidad: registro.unidad,
          valor: registro.valor,
          limInf: valoresPorParametro[0] ? valoresPorParametro[0].limInf : 0,
          limSup: valoresPorParametro[0] ? valoresPorParametro[0].limSup : 0,
          dosMeses: valoresMeses,
          esCalculado: parametro.esCalculado,
        });
      });
      // Finalmente, añadimos los datos al estado
      setValoresParametros(parametrosMostrar);

      const operario = operarios.find(
        (op) => op.id === parametrosMostrar[0].id_Operario
      );
      setNombreOperario(operario.nombre + " " + operario.apellidos);
    }
  };

  const handleEditarParametro = (e, id) => {
    // Recorremos el array del estado para encontrar el objeto que hemos modificado
    setValoresParametros((prev) =>
      prev.map((row) => {
        if (row.parametro === id) {
          return { ...row, valor: e.target.value };
        } else {
          return row;
        }
      })
    );
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setPdf([]);
    setArchivoSeleccionado([]);
  };

  const descargarPdf = async () => {
    handleCloseModal();

    await bajarPdfInstrucciones(archivoSeleccionado, {
      headers: { "Content-type": "application/pdf" },
    });
  };

  console.log(parametrosSeleccionado, "PARAMETROS")

  const guardarParametros = async () => {
    setCargando(true);

    const analisisSeleccionado = analisis.find(
      (a) => a.id === tareaAnalisisPlanta.analisis
    );

    const fechaActualidad = Date.now();
    const hoy = new Date(fechaActualidad);

    if (analisisSeleccionado && analisisSeleccionado.tipo === 0) {
      const valorVacio = valoresParametros.some(
        (parametro) =>
          parametro.esCalculado === false &&
          (parametro.valor === "" ||
            parametro.valor === null ||
            parametro.valor === undefined)
      );

      if (valorVacio) {
        // Mostrar modal de confirmación si hay algún valor vacío
        const { isConfirmed } = await Swal.fire({
          title: "Hay parámetros vacíos",
          text: "Falta algún parámetro por rellenar, desea continuar o volver atrás para rellenarlo?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "GENERAR PDF",
          cancelButtonText: "VOLVER ATRÁS",
        });

        // Si el usuario elige "Volver atrás", salimos de la función
        if (!isConfirmed) {
          setCargando(false);
          return;
        }
      }

      const valoresParametrosParseado = valoresParametros.map((parametro) => ({
        ...parametro,
        fecha: parametrosSeleccionado.fecha,
        valor: parametro.valor,
        metodo: parametrosSeleccionado.metodo,
        puntoMuestreo: parametrosSeleccionado.puntoMuestreo
      }));
      const comentarios = await getComentariosByTareaId(tareaAnalisisPlanta.id);
      let pdfObjeto;
      if (
        comentarios !== null &&
        comentarios !== undefined &&
        comentarios.length > 0
      ) {
        pdfObjeto = {
          idComentario: comentarios[0].id,
          comentario: comentarios[0].comentario,
          valoresParametros: valoresParametrosParseado,
          fechaRealizado: hoy.toISOString(),
          idTarea: tareaAnalisisPlanta.id,
        };
      } else {
        pdfObjeto = {
          idComentario: 0,
          comentario: "",
          valoresParametros: valoresParametrosParseado,
          fechaRealizado: hoy.toISOString(),
          idTarea: tareaAnalisisPlanta.id,
        };
      }

      const response = await generarPdf(pdfObjeto);

      tareaAnalisisPlanta.pdf = response;
      tareaAnalisisPlanta.nombreElemento =
        parametrosSeleccionado.nombreElemento;
      tareaAnalisisPlanta.operario = parametrosSeleccionado.idOperario;

      const resp2 = await getFilasParametros(
        parametrosSeleccionado.codigoCliente,
        parametrosSeleccionado.oferta,
        parametrosSeleccionado.idElemento,
        parametrosSeleccionado.idAnalisis,
        parametrosSeleccionado.fecha
      );

      const parametroAsociadosSinFecha = data.filter(
        (valor) =>
          valor.codigoCliente === parametrosSeleccionado.codigoCliente &&
          valor.oferta === parametrosSeleccionado.oferta &&
          valor.id_Elemento === parametrosSeleccionado.idElemento &&
          valor.id_Analisis === parametrosSeleccionado.idAnalisis &&
          valor.fecha === null
      );

      const noCoincidentes = parametroAsociadosSinFecha.filter(
        (sinFecha) =>
          !resp2.some((conFecha) => conFecha.parametro === sinFecha.parametro)
      );

      /* const fechaActual2 = Date.now();
            const hoy = new Date(fechaActual2); */

      tareaAnalisisPlanta.realizado = true;
      tareaAnalisisPlanta.fechaRealizado = hoy.toISOString();

      const respActualizado = [...resp2, ...noCoincidentes];

      let count = 0;
      // Recorremos parametro por parametro para hacer una petición POST
      await valoresParametros.map(async (parametro) => {
        let parametroPut = {};

        if (
          (parametro.valor > parametro.limSup ||
            parametro.valor < parametro.limInf) &&
          !(parametro.limInf === 0 && parametro.limSup === 0)
        ) {
          count += 1;
        }

        if (parametro.fecha !== null) {
          parametroPut = {
            CodigoCliente: parametro.codigoCliente,
            Referencia:
              parametro.referencia !== ""
                ? parametro.referencia
                : parametrosSeleccionado.referencia,
            Oferta: parametro.oferta,
            Id_Elemento: parametro.id_Elemento,
            Id_Analisis: parametro.id_Analisis,
            Id_Operario:
              parametro.id_Operario === parametrosSeleccionado.idOperario
                ? parametro.id_Operario
                : parametrosSeleccionado.idOperario,
            Parametro: parametro.parametro,
            Valor: parametro.valor,
            Unidad: parametro.unidad,
            Metodo: parametrosSeleccionado.metodo,
            PuntoMuestreo: parametrosSeleccionado.puntoMuestreo
          };

          const valor = respActualizado.find(
            (item) => item.parametro === parametro.parametro
          );
          parametroPut.Id = valor.id;
          parametroPut.fecha = valor.fecha;

          const resp = await putValorParametros(parametroPut);
          await putParametrosAnalisisPlanta(tareaAnalisisPlanta);

          if (resp) {
            // Avisamos al usuario si ha ido bien
            Swal.fire({
              position: "center",
              icon: "info",
              title: "Datos guardados",
              text: `Los parametros han sido guardados`,
              showConfirmButton: false,
              timer: 2000,
              showClass: {
                popup: "animate__animated animate__bounceIn",
              },
              hideClass: {
                popup: "animate__animated animate__bounceOut",
              },
            });
          } else {
            // Avisamos al usuario
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Error al guardar",
              text: `Ha habido un error en el guardado de datos!`,
              showConfirmButton: false,
              timer: 2000,
              showClass: {
                popup: "animate__animated animate__bounceIn",
              },
              hideClass: {
                popup: "animate__animated animate__bounceOut",
              },
            });

            setCargando(false);
          }
        } else {
          parametroPut = {
            CodigoCliente: parametro.codigoCliente,
            Referencia:
              parametro.referencia !== ""
                ? parametro.referencia
                : parametrosSeleccionado.referencia,
            Oferta: parametro.oferta,
            Id_Elemento: parametro.id_Elemento,
            Id_Analisis: parametro.id_Analisis,
            Id_Operario:
              parametro.id_Operario === 0 ? user.id : parametro.id_Operario,
            Parametro: parametro.parametro,
            Fecha: parametrosSeleccionado.fecha,
            Valor: parametro.valor,
            Unidad: parametro.unidad,
            Metodo: parametrosSeleccionado.metodo,
            PuntoMuestreo: parametrosSeleccionado.puntoMuestreo
          };

          setTareaAnalisisPlanta((valorPrevio) => ({
            ...valorPrevio,
            nombreElemento: parametrosSeleccionado.nombreElemento,
            operario: parametrosSeleccionado.idOperario,
          }));

          const resp = await postValorParametros(parametroPut);

          await putParametrosAnalisisPlanta(tareaAnalisisPlanta);

          if (resp) {
            // Avisamos al usuario si ha ido bien
            Swal.fire({
              position: "center",
              icon: "info",
              title: "Datos guardados",
              text: `Los parametros han sido guardados`,
              showConfirmButton: false,
              timer: 2000,
              showClass: {
                popup: "animate__animated animate__bounceIn",
              },
              hideClass: {
                popup: "animate__animated animate__bounceOut",
              },
            });
          } else {
            // Avisamos al usuario
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Error al guardar",
              text: `Ha habido un error en el guardado de datos!`,
              showConfirmButton: false,
              timer: 2000,
              showClass: {
                popup: "animate__animated animate__bounceIn",
              },
              hideClass: {
                popup: "animate__animated animate__bounceOut",
              },
            });

            setCargando(false);
          }
        }
      });

      const fechaActual = new Date(parametrosSeleccionado.fecha);

      const nombreMes = meses[fechaActual.getMonth()];
      const año = fechaActual.getFullYear();

      if (count > 0) {
        tareaAnalisisPlanta.incorrecto = true;
        tareaAnalisisPlanta.noValido = true;

        observacionEditar.idElemento = parametrosSeleccionado.idElemento;
        observacionEditar.observacion = `Parámetros fisicoquímicos ${nombreMes} ${año} fuera de rango`;
        observacionEditar.nombreUsuario = user.nombre;
        observacionEditar.apellidosUsuario = user.apellidos;
        observacionEditar.verCliente = true;
        observacionEditar.verInsp = true;

        await postObservacion(observacionEditar);
        cargarComentarios();
      } else {
        tareaAnalisisPlanta.incorrecto = false;
        tareaAnalisisPlanta.noValido = false;
      }

      setCargando(false);
    } else {
      setTareaAnalisisPlanta((valorPrevio) => ({
        ...valorPrevio,
        nombreElemento: parametrosSeleccionado.nombreElemento,
        operario: parametrosSeleccionado.idOperario,
      }));

      await putParametrosAnalisisPlanta(tareaAnalisisPlanta);

      Swal.fire({
        position: "center",
        icon: "info",
        title: "Datos guardados",
        text: `Los parametros han sido guardados`,
        showConfirmButton: false,
        timer: 2000,
        showClass: {
          popup: "animate__animated animate__bounceIn",
        },
        hideClass: {
          popup: "animate__animated animate__bounceOut",
        },
      });

      setCargando(false);
    }
  };

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

  return (
    <MainLayout title="Mantenimiento técnico">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Autocomplete
                    id="codigoCliente"
                    options={clientes}
                    value={
                      clientes.find(
                        (cliente) =>
                          cliente.razonSocial ===
                          parametrosSeleccionado.nombreCliente
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
                        label="Nombre cliente"
                        name="nombreCliente"
                      />
                    )}
                    onChange={(event, value) =>
                      setParametrosSeleccionado((prevState) => ({
                        ...prevState,
                        codigoCliente: value ? parseInt(value.codigo) : null,
                        nombreCliente: value ? value.razonSocial : null,
                        oferta: "",
                        idElemento: 0,
                        nombreElemento: "",
                        idAnalisis: 0,
                        nombreAnalisis: "",
                        fecha: null,
                        fechaIso: "",
                      }))
                    }
                  />
                </Grid>

                <Grid item xs={2}>
                  <Autocomplete
                    id="codigoCliente"
                    options={clientes}
                    value={
                      clientes.find(
                        (cliente) =>
                          cliente.codigo ===
                          parametrosSeleccionado.codigoCliente
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
                        label="Código de cliente"
                        name="codigoCliente"
                      />
                    )}
                    onChange={(event, value) =>
                      setParametrosSeleccionado((prevState) => ({
                        ...prevState,
                        codigoCliente: value ? parseInt(value.codigo) : null,
                        nombreCliente: value ? value.razonSocial : null,
                        oferta: "",
                        idElemento: 0,
                        nombreElemento: "",
                        idAnalisis: 0,
                        nombreAnalisis: "",
                        fecha: null,
                        fechaIso: "",
                      }))
                    }
                  />
                </Grid>

                <Grid item xs={2}>
                  <Autocomplete
                    id="codigoCliente"
                    options={ofertas}
                    value={
                      ofertas.find(
                        (oferta) =>
                          oferta.numeroOferta === parametrosSeleccionado.oferta
                      ) || null
                    }
                    filterOptions={(options) => {
                      if (
                        parametrosSeleccionado.nombreCliente !== "" &&
                        parametrosSeleccionado.codigoCliente !== 0 &&
                        parametrosSeleccionado.oferta !== 0 &&
                        parametrosSeleccionado.nombreCliente !== null &&
                        parametrosSeleccionado.codigoCliente !== null
                      ) {
                        return options.filter(
                          (oferta) =>
                            oferta.nombreCliente ===
                            parametrosSeleccionado.nombreCliente &&
                            oferta.codigoCliente ===
                            parametrosSeleccionado.codigoCliente &&
                            !oferta.deleted
                        );
                      } else {
                        return options.filter((oferta) => !oferta.deleted);
                      }
                    }}
                    onInputChange={(event, newInputValue) => {
                      setInputOferta(newInputValue);
                    }}
                    getOptionLabel={(option) => option.numeroOferta.toString()}
                    renderInput={(params) => (
                      <TextField {...params} label="Oferta" name="oferta" />
                    )}
                    onChange={(event, value) =>
                      setParametrosSeleccionado((prevState) => ({
                        ...prevState,
                        codigoCliente: value
                          ? parseInt(value.codigoCliente)
                          : null,
                        nombreCliente: value ? value.nombreCliente : null,
                        oferta: value ? parseInt(value.numeroOferta) : null,
                        idElemento: 0,
                        nombreElemento: "",
                        idAnalisis: 0,
                        nombreAnalisis: "",
                        fecha: null,
                        fechaIso: "",
                      }))
                    }
                  />
                </Grid>

                <Grid item xs={2}>
                  <Autocomplete
                    disableClearable={true}
                    id="elemento"
                    options={elementosAutocomplete}
                    inputValue={parametrosSeleccionado.nombreElemento}
                    getOptionLabel={(option) =>
                      option.descripcion !== null
                        ? option.nombre + " " + option.descripcion
                        : option.nombre + " " + option.numero
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Elemento"
                        name="idElemento"
                      />
                    )}
                    onChange={(event, value) =>
                      onChangeElemento(event, value, "idElemento")
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  <Autocomplete
                    disableClearable={true}
                    id="analisis"
                    inputValue={parametrosSeleccionado.nombreAnalisis}
                    options={analisisAutocomplete}
                    getOptionLabel={(option) => option.nombre}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="idAnalisis"
                        label="Analisis y Revisiones"
                      />
                    )}
                    onChange={(event, value) =>
                      onChangeAnalisis(event, value, "idAnalisis")
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  <Autocomplete
                    disableClearable={true}
                    sx={{ width: "100%" }}
                    id="Operarios"
                    options={operarios}
                    defaultValue={user.idPerfil === 1004 ? user : undefined}
                    filterOptions={(options) =>
                      operarios.filter((cliente) => cliente.idPerfil === 1004)
                    }
                    getOptionLabel={(option) =>
                      option.nombre + " " + option.apellidos
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Operario" name="operario" />
                    )}
                    onChange={(event, value) =>
                      onChangeOperario(event, value, "idOperario")
                    }
                  />
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    sx={{ width: "100%" }}
                    label="Referencia"
                    id="referencia"
                    name="referencia"
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={2}>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue={false}
                      value={parametrosSeleccionado.realizado}
                      onChange={handleChangeRadioButton}
                    >
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        name="realizado"
                        label="Pendientes"
                      />
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        name="realizado"
                        label="Realizado"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={1}
                  style={{ display: "flex", marginTop: "12px" }}
                >
                  <p> Fecha </p>
                </Grid>
                <Grid item xs={2} style={{ display: "flex" }}>
                  <Autocomplete
                    disableClearable={true}
                    sx={{ width: "100%" }}
                    id="fecha"
                    inputValue={parametrosSeleccionado.fechaIso}
                    options={parametrosAnalisisPlanta.sort(
                      (a, b) =>
                        new Date(a.fechas).getTime() >
                        new Date(b.fechas).getTime()
                    )}
                    filterOptions={(options) =>
                      parametrosAnalisisPlanta
                        .filter(
                          (cliente) =>
                            cliente.codigoCliente ===
                            parametrosSeleccionado.codigoCliente &&
                            cliente.oferta === parametrosSeleccionado.oferta &&
                            cliente.elemento ===
                            parametrosSeleccionado.idElemento &&
                            cliente.analisis ===
                            parametrosSeleccionado.idAnalisis &&
                            cliente.realizado ===
                            parametrosSeleccionado.realizado &&
                            !cliente.deleted
                        )
                        .sort(
                          (a, b) =>
                            new Date(a.fechas).getTime() >
                            new Date(b.fechas).getTime()
                        )
                    }
                    getOptionLabel={(option) =>
                      new Date(option.fecha).toLocaleDateString()
                    }
                    renderInput={(params) => (
                      <TextField {...params} name="fecha" />
                    )}
                    onChange={(event, value) =>
                      onChangeFecha(event, value, "fecha")
                    }
                  />
                </Grid>
                {archivos.length > 0 && (
                  <Grid item xs={2} md={2}>
                    <button
                      style={{
                        display: "inline-block",
                        width: "200px",
                        height: "40px",
                        backgroundColor: "#545355",
                        borderRadius: "6px",
                        color: "white",
                        fontSize: "15px",
                      }}
                      onClick={handleOpenModal}
                    >
                      PDF Instrucciones
                    </button>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {valoresParametros.length > 0 &&
          user.idPerfil === 1004 &&
          valoresParametros[0].id_Operario !== user.id ? (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography>
                  Esta tarea la ha realizado {nombreOperario}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          false
        )}
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

        {/* Sección tabla de parámetros */}
        <Grid item xs={12}>
          <Card>
            {analisisActivo.tipo === 1 || analisisActivo.tipo === 2 ? (
              <CardContent style={{ padding: "30px", margin: "15px" }}>
                <Grid container spacing={4}>
                  <Grid item xs={3} md={2}>
                    <FormControlLabel
                      control={<Checkbox />}
                      sx={{ width: "100%" }}
                      label="Recogida de Muestras"
                      name="recogido"
                      checked={tareaAnalisisPlanta.recogido}
                      onChange={handleChangeCheckbox}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      sx={{ width: "100%" }}
                      label="Realizado/Entregado"
                      name="realizado"
                      checked={tareaAnalisisPlanta.realizado}
                      onChange={handleChangeCheckbox2}
                    />
                  </Grid>
                  <Grid item xs={4} md={5}>
                    <ObservacionesElementos
                      idElemento={parametrosSeleccionado.idElemento}
                      observaciones={observaciones}
                      setObservaciones={setObservaciones}
                      observacion={observacion}
                      setObservacion={setObservacion}
                      observacionEditar={observacionEditar}
                      setObservacionEditar={setObservacionEditar}
                    ></ObservacionesElementos>
                  </Grid>

                  <Grid item xs={4} md={5}>
                    <ComentariosElementosNoFQ
                      idElemento={parametrosSeleccionado.idElemento}
                      idAnalisis={parametrosSeleccionado.idAnalisis}
                      nombreAnalisis={parametrosSeleccionado.nombreAnalisis}
                    ></ComentariosElementosNoFQ>
                  </Grid>
                </Grid>
              </CardContent>
            ) : (
              <CardContent>
                {parametrosElemento.length > 0 ? (
                  <>
                    <Grid container spacing={2}>
                      {/* COLUMNA IZQUIERDA: 2 TextFields en columna */}
                      <Grid item xs={12} md={3}>
                        <Grid container spacing={2} direction="column">
                          <Grid item>
                            <TextField
                              label="Metodo Analítico"
                              id="metodo"
                              name="metodo"
                              onChange={handleChange}
                              value={parametrosSeleccionado && parametrosSeleccionado.metodo}
                              sx={{ width: 150 }}
                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              label="Punto de Muestreo"
                              id="puntoMuestreo"
                              name="puntoMuestreo"
                              onChange={handleChange}
                              value={parametrosSeleccionado && parametrosSeleccionado.puntoMuestreo}
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* COMPONENTES OBSERVACIONES Y COMENTARIOS */}
                      <Grid item xs={12} md={4}>
                        <ObservacionesElementos
                          idElemento={parametrosSeleccionado.idElemento}
                          observaciones={observaciones}
                          setObservaciones={setObservaciones}
                          observacion={observacion}
                          setObservacion={setObservacion}
                          observacionEditar={observacionEditar}
                          setObservacionEditar={setObservacionEditar}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <ComentariosElementos
                          idTarea={tareaAnalisisPlanta.id}
                          idElemento={parametrosSeleccionado.idElemento}
                          idAnalisis={parametrosSeleccionado.idAnalisis}
                          nombreAnalisis={parametrosSeleccionado.nombreAnalisis}
                        />
                      </Grid>
                    </Grid>

                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <b>Parámetro</b>
                            </TableCell>
                            <TableCell>
                              <b>Valor</b>
                            </TableCell>
                            <TableCell>
                              <b>Valor mes pasado (fecha) </b>
                            </TableCell>
                            <TableCell>
                              <b>Valor de hace 2 meses (fecha)</b>
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {valoresParametros
                            .sort((a, b) => a.parametro - b.parametro)
                            .map((parametro, index) => {
                              const nombreParametro = parametros.filter(
                                (param) => param.id === parametro.parametro
                              )[0].nombre;
                              const parametroCalculado = parametros.filter(
                                (param) => param.id === parametro.parametro
                              )[0].esCalculado;

                              if (parametroCalculado === false) {
                                return (
                                  <ParametroMantenimiento
                                    limite={{
                                      limSup: parametro.limSup,
                                      limInf: parametro.limInf,
                                    }}
                                    key={index}
                                    indice={index}
                                    parametros={valoresParametros}
                                    onChange={handleEditarParametro}
                                    nombre={nombreParametro}
                                    parametroCalculado={parametroCalculado}
                                  />
                                );
                              }
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                ) : (
                  <Typography>No hay parametros para mostrar</Typography>
                )}
              </CardContent>
            )}
          </Card>
        </Grid>

        {/* Sección de botones */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container sx={{ justifyContent: "flex-end" }} spacing={2}>
                {(valoresParametros.length > 0 || tareaAnalisisPlanta.id) && (
                  <Grid item>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<SaveIcon />}
                      onClick={guardarParametros}
                    >
                      Guardar datos
                    </Button>
                  </Grid>
                )}
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<FileOpenIcon />}
                    onClick={handleGetParametros}
                  >
                    Abrir Plantilla
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <ModalLayout
        titulo="Que archivo quieres descargar?"
        contenido={
          <Select
            value={archivoSeleccionado}
            onChange={handleChangePdf}
            fullWidth
          >
            {pdf.length > 0 &&
              pdf.map((archivo, index) => (
                <MenuItem key={index} value={archivo.id}>
                  {archivo.name}
                </MenuItem>
              ))}
          </Select>
        }
        botones={[
          insertarBotonesModal(<DeleteIcon />, "Descargar", async () => {
            descargarPdf();
          }),
        ]}
        open={openModal}
        onClose={handleCloseModal}
      />
    </MainLayout>
  );
};
