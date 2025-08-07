import { useState, useEffect, useContext } from "react";
import { TextField, Autocomplete } from "@mui/material";

import "./Visualizacion.css";
import { MainLayout } from "../layout/MainLayout";
import {
  getAnalisis,
  getAnalisisNivelesPlantasCliente,
  getClientes,
  getConfNivelesPlantasCliente,
  getElementosPlanta,
  getOfertas,
  getParametrosAnalisisPlanta,
  getUsuarios,
  postParametrosAnalisisPlanta,
  putParametrosAnalisisPlanta,
  putParametrosAnalisisPlantaPorId,
  bajarPdf,
  bajarPdfNoFQ,
  subirPdf,
  getFicheros,
  getAnalisisId,
  getParametrosAnalisisById,
  mandarCorreoNoFQ,
} from "../api";

import Swal from "sweetalert2";
import { AnalisisTable } from "../components/AnalisisTable";
import { AuthContext } from "../context/AuthContext";
import {
  getObservacionesByElementoId,
  postObservacion,
} from "../api/observacionesElementos";

export const VisualizacionPage = () => {
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  let opcionesFiltradas = [];
  let opcionesFiltradasAnalisis = [];
  let opcionesTablasFiltradasAnalisis = [];

  const [confNivelesPlantasCliente, setConfNivelesPlantasCliente] = useState(
    []
  );

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
    textoCorreo: "",
    facturado: false,
    numeroFacturado: "",
    operario: 0,
    cancelado: false,
    comentarios: "",
    incorrecto: false,
    noValido: false,
    addDate: null,
    addIdUser: null,
    modDate: null,
    modIdUser: null,
    delDate: null,
    delIdUser: null,
    deleted: null,
    contactosEnviarCorreo: "",
  });

  const [fileChange, setFileChange] = useState(null);

  const [analisisEliminar, setAnalisisEliminar] = useState([]);
  const [analisisEditar, setAnalisisEditar] = useState([]);
  const [elementoTareaEditar, setElementoTareaEditar] = useState([]);
  const [operarioEditar, setOperarioEditar] = useState([]);
  const [pdfEditar, setPdfEditar] = useState([]);

  const [oferta, setOferta] = useState([]);
  const [operarios, setOperarios] = useState([]);
  const [clientes, setClientes] = useState([]);

  const [elementos, setElementos] = useState([]);
  const [ficheros, setFicheros] = useState([]);

  const [analisisNivelesPlantasCliente, setAnalisisNivelesPlantasCliente] =
    useState([]);

  const [analisis, setAnalisis] = useState([]);

  const [errorFecha, setErrorFecha] = useState(false);
  const [contactosEnviarCorreo, setContactosEnviarCorreo] = useState("");
  const columnas = [
    //visibles
    { headerName: "Periodo", field: "periodo", width: 150 },
    {
      headerName: "Fecha",
      field: "fecha",
      width: 150,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
    },
    { headerName: "Recogido", field: "recogido", type: "boolean", width: 100 },
    {
      headerName: "Fecha Recogido",
      field: "fechaRecogido",
      width: 150,
      valueFormatter: (params) => {
        if (params.value != null) {
          const date = new Date(params.value);
          return date.toLocaleDateString();
        } else {
          const date = "";
          return date;
        }
      },
    },
    {
      headerName: "Realizado/Entregado",
      field: "realizado",
      type: "boolean",
      width: 200,
    },
    {
      headerName: "Fecha Realizado",
      field: "fechaRealizado",
      width: 150,
      valueFormatter: (params) => {
        if (params.value != null) {
          const date = new Date(params.value);
          return date.toLocaleDateString();
        } else {
          const date = "";
          return date;
        }
      },
    },
    {
      headerName: "Facturado",
      field: "facturado",
      type: "boolean",
      width: 100,
    },
    { headerName: "Numero Factura", field: "numeroFacturado", width: 150 },
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
      headerName: "PDF",
      field: "pdf",
      width: 700,
      valueFormatter: (params) => {
        const fich = ficheros.find((fichero) => fichero.id === params.value);
        return fich ? fich.name : "";
      },
    },
    {
      headerName: "PDF Recibido",
      field: "recibido",
      type: "boolean",
      width: 100,
    },
    {
      headerName: "Fecha PDF",
      field: "fechaPdf",
      width: 150,
      valueFormatter: (params) => {
        if (params.value != null) {
          const date = new Date(params.value);
          return date.toLocaleDateString();
        } else {
          const date = "";
          return date;
        }
      },
    },
    {
      headerName: "Cancelado",
      field: "cancelado",
      type: "boolean",
      width: 100,
    },
  ];

  const columnas1 = [
    //visibles
    { headerName: "Periodo", field: "periodo", width: 150 },
    {
      headerName: "Fecha",
      field: "fecha",
      width: 200,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
    },
    {
      headerName: "Realizado",
      field: "realizado",
      type: "boolean",
      width: 120,
    },
    {
      headerName: "Fecha Realizado",
      field: "fechaRealizado",
      width: 200,
      valueFormatter: (params) => {
        if (params.value != null) {
          const date = new Date(params.value);
          return date.toLocaleDateString();
        } else {
          const date = "";
          return date;
        }
      },
    },
    {
      headerName: "Facturado",
      field: "facturado",
      type: "boolean",
      width: 100,
    },
    { headerName: "Numero Factura", field: "numeroFacturado", width: 150 },
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
      headerName: "PDF",
      field: "pdf",
      width: 700,
      valueFormatter: (params) => {
        const fich = ficheros.find((fichero) => fichero.id === params.value);
        return fich ? fich.name : "";
      },
    },
    {
      headerName: "Cancelado",
      field: "cancelado",
      type: "boolean",
      width: 100,
    },
  ];

  const columnasAerobios = [
    //visibles
    { headerName: "Periodo", field: "periodo", width: 150 },
    {
      headerName: "Fecha",
      field: "fecha",
      width: 150,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
    },
    { headerName: "Recogido", field: "recogido", type: "boolean", width: 100 },
    {
      headerName: "Fecha Recogido",
      field: "fechaRecogido",
      width: 150,
      valueFormatter: (params) => {
        if (params.value != null) {
          const date = new Date(params.value);
          return date.toLocaleDateString();
        } else {
          const date = "";
          return date;
        }
      },
    },
    {
      headerName: "Realizado/Entregado",
      field: "realizado",
      type: "boolean",
      width: 250,
    },
    {
      headerName: "Fecha Realizado",
      field: "fechaRealizado",
      width: 150,
      valueFormatter: (params) => {
        if (params.value != null) {
          const date = new Date(params.value);
          return date.toLocaleDateString();
        } else {
          const date = "";
          return date;
        }
      },
    },
    {
      headerName: "Facturado",
      field: "facturado",
      type: "boolean",
      width: 100,
    },
    { headerName: "Numero Factura", field: "numeroFacturado", width: 150 },
    { headerName: "Resultado", field: "resultado", width: 120 },
    {
      headerName: "PDF",
      field: "pdf",
      width: 700,
      valueFormatter: (params) => {
        const fich = ficheros.find((fichero) => fichero.id === params.value);
        return fich ? fich.name : "";
      },
    },
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
      headerName: "PDF Recibido",
      field: "recibido",
      type: "boolean",
      width: 100,
    },
    {
      headerName: "Fecha PDF",
      field: "fechaPdf",
      width: 150,
      valueFormatter: (params) => {
        if (params.value != null) {
          const date = new Date(params.value);
          return date.toLocaleDateString();
        } else {
          const date = "";
          return date;
        }
      },
    },
    {
      headerName: "Cancelado",
      field: "cancelado",
      type: "boolean",
      width: 100,
    },
  ];

  const [data, setData] = useState([]);
  const [dataTablas, setDataTablas] = useState([]);

  const [elementosAutocomplete, setElementosAutocomplete] = useState([]);
  const [analisisAutocomplete, setAnalisisAutocomplete] = useState([]);

  const { user } = useContext(AuthContext);

  const [inputCodigoCliente, setInputCodigoCliente] = useState("");
  const [inputNombreCliente, setInputNombreCliente] = useState("");

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

  useEffect(() => {
    if (analisisSeleccionado.nombreElemento !== "") {
      cargarComentarios();
    }
  }, [analisisSeleccionado.elemento]);

  const cargarComentarios = () => {
    getObservacionesByElementoId(analisisSeleccionado.elemento).then((res) => {
      setObservaciones(res);
    });
  };

  useEffect(() => {
    opcionesFiltradas = [];

    const lista = confNivelesPlantasCliente.filter(
      (planta) =>
        planta.codigoCliente === analisisSeleccionado.codigoCliente &&
        planta.oferta === analisisSeleccionado.oferta
    );
    lista.map((elemento) => {
      opcionesFiltradas.push(
        elementos.filter((elem) => elem.id === elemento.id_Elemento)[0]
      );
    });

    setElementosAutocomplete(opcionesFiltradas);
  }, [analisisSeleccionado.codigoCliente, analisisSeleccionado.oferta]);

  useEffect(() => {
    opcionesFiltradasAnalisis = [];
    opcionesTablasFiltradasAnalisis = [];

    const lista = confNivelesPlantasCliente.filter(
      (planta) =>
        planta.codigoCliente === analisisSeleccionado.codigoCliente &&
        planta.oferta === analisisSeleccionado.oferta &&
        planta.id_Elemento === analisisSeleccionado.elemento
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
        opcionesTablasFiltradasAnalisis.push(
          analisis.filter((an) => an.id === anal.id_Analisis)[0]
        );
      });
    });

    setDataTablas(opcionesTablasFiltradasAnalisis);
    setAnalisisAutocomplete(opcionesTablasFiltradasAnalisis);
  }, [analisisSeleccionado.elemento]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAnalisisSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeCheckbox = (e) => {
    const { name, checked } = e.target;
    setAnalisisSeleccionado((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handlePdf = (e) => {
    setFileChange(e.target.files[0]);
  };

  const GetFichero = async () => {
    const resp = await getFicheros();
    const ficherosFiltrados = resp.filter((fichero) => !fichero.deleted);
    setFicheros(ficherosFiltrados);
  };

  const GetParametrosAnalisisPlanta = async () => {
    const resp = await getParametrosAnalisisPlanta();
    const parametrosFiltrados = resp.filter((analisi) => !analisi.deleted);
    setData(parametrosFiltrados);
  };

  const descargarPdf = async () => {
    const resp = await getAnalisisId(analisisSeleccionado.analisis);

    const fecha = new Date(analisisSeleccionado.fecha); // Convertir la cadena a un objeto de fecha

    // Obtener año y mes de la fecha
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1; // Los meses van de 0 a 11, por lo que se suma 1

    // Formatear el mes para asegurarse de que siempre tenga dos dígitos (por ejemplo, '08' en lugar de '8')
    const mesFormateado = mes < 10 ? `0${mes}` : mes;

    // Crear la cadena de fecha en formato 'YYYY-MM'
    const fechaFormateada = `${año}-${mesFormateado}`;

    if (elementoTareaEditar[0].descripcion !== null) {
      await bajarPdf(
        analisisSeleccionado.pdf,
        analisisSeleccionado.codigoCliente,
        elementoTareaEditar[0].nombre + "" + elementoTareaEditar[0].descripcion,
        resp.nombre,
        fechaFormateada,
        { headers: { "Content-type": "application/pdf" } }
      );
    } else {
      await bajarPdf(
        analisisSeleccionado.pdf,
        analisisSeleccionado.codigoCliente,
        elementoTareaEditar[0].nombre + "" + elementoTareaEditar[0].numero,
        resp.nombre,
        fechaFormateada,
        { headers: { "Content-type": "application/pdf" } }
      );
    }
  };

  const descargarPdfNoFQ = async () => {
    const resp = await getAnalisisId(analisisSeleccionado.analisis);

    const fecha = new Date(analisisSeleccionado.fecha); // Convertir la cadena a un objeto de fecha

    // Obtener año y mes de la fecha
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1; // Los meses van de 0 a 11, por lo que se suma 1

    // Formatear el mes para asegurarse de que siempre tenga dos dígitos (por ejemplo, '08' en lugar de '8')
    const mesFormateado = mes < 10 ? `0${mes}` : mes;

    // Crear la cadena de fecha en formato 'YYYY-MM'
    const fechaFormateada = `${año}-${mesFormateado}`;

    if (elementoTareaEditar[0].descripcion !== null) {
      await bajarPdfNoFQ(
        analisisSeleccionado.pdf,
        analisisSeleccionado.codigoCliente,
        elementoTareaEditar[0].nombre + "" + elementoTareaEditar[0].descripcion,
        resp.nombre,
        fechaFormateada,
        { headers: { "Content-type": "application/pdf" } }
      );
    } else {
      await bajarPdfNoFQ(
        analisisSeleccionado.pdf,
        analisisSeleccionado.codigoCliente,
        elementoTareaEditar[0].nombre + "" + elementoTareaEditar[0].numero,
        resp.nombre,
        fechaFormateada,
        { headers: { "Content-type": "application/pdf" } }
      );
    }
  };

  useEffect(() => {
    getClientes().then((resp) =>
      setClientes(resp.filter((cliente) => !cliente.deleted))
    );

    getOfertas().then((resp) =>
      setOferta(resp.filter((oferta) => !oferta.deleted))
    );

    getAnalisis().then((resp) => setAnalisis(resp.filter((an) => !an.deleted)));

    getElementosPlanta().then((resp) =>
      setElementos(resp.filter((el) => !el.deleted))
    );

    getConfNivelesPlantasCliente().then((resp) =>
      setConfNivelesPlantasCliente(resp.filter((nivel) => !nivel.deleted))
    );

    getAnalisisNivelesPlantasCliente().then((resp) =>
      setAnalisisNivelesPlantasCliente(resp.filter((an) => !an.deleted))
    );

    getUsuarios().then((resp) => {
      setOperarios(resp.filter((nivel) => !nivel.deleted));
    });

    GetParametrosAnalisisPlanta();
    GetFichero();
  }, []);

  const peticionPost = async () => {
    if (analisisSeleccionado.fecha != null) {
      setErrorFecha(false);
    } else {
      setErrorFecha(true);
    }

    if (analisisSeleccionado.fecha != null) {
      analisisSeleccionado.id = 0;

      await postParametrosAnalisisPlanta(analisisSeleccionado);

      GetParametrosAnalisisPlanta();
      setFileChange();

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
    }
  };

  const peticionPut = async () => {
    const an = analisis.filter(
      (analisi) => analisi.id === analisisSeleccionado.analisis
    );

    if (analisisSeleccionado.fecha !== "") {
      setErrorFecha(false);
    } else {
      setErrorFecha(true);
    }

    if (analisisSeleccionado.fecha !== "") {
      if (an[0].tipo === 2) {
        const fechaActual = new Date(analisisSeleccionado.fecha);

        const nombreMes = meses[fechaActual.getMonth()];
        const año = fechaActual.getFullYear();

        if (analisisSeleccionado.incorrecto === true) {
          observacionEditar.idElemento = analisisSeleccionado.elemento;
          observacionEditar.observacion = `${an[0].nombre} ${nombreMes} ${año} Incorrecta`;
          observacionEditar.nombreUsuario = user.nombre;
          observacionEditar.apellidosUsuario = user.apellidos;
          observacionEditar.verCliente = true;
          observacionEditar.verInsp = true;

          await postObservacion(observacionEditar);
        }

        if (analisisSeleccionado.noValido === true) {
          observacionEditar.idElemento = analisisSeleccionado.elemento;
          observacionEditar.observacion = `${an[0].nombre} ${nombreMes} ${año} Análisis No Válido`;
          observacionEditar.nombreUsuario = user.nombre;
          observacionEditar.apellidosUsuario = user.apellidos;
          observacionEditar.verCliente = true;
          observacionEditar.verInsp = true;

          await postObservacion(observacionEditar);
        }
      }

      if (fileChange !== null && fileChange !== undefined) {
        const resp = await subirPdf(analisisSeleccionado.id, fileChange);
        if (resp) {
          analisisSeleccionado.pdf = resp.data;
        }
      }

      await putParametrosAnalisisPlantaPorId(analisisSeleccionado);

      var analisisModificado = data;
      analisisModificado.map((analisi) => {
        if (analisi.id === analisisSeleccionado.id) {
          analisi = analisisSeleccionado;
        }
      });

      GetParametrosAnalisisPlanta();
      GetFichero();
      setFileChange();
      cargarComentarios();

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
    var i = 0;

    while (i < analisisEliminar.length) {
      const resp = await getParametrosAnalisisById(analisisEliminar[i]);
      resp.deleted = true;

      await putParametrosAnalisisPlanta(resp);

      GetParametrosAnalisisPlanta();
      setAnalisisSeleccionado({
        id: 0,
        codigoCliente: analisisSeleccionado.codigoCliente,
        nombreCliente: analisisSeleccionado.nombreCliente,
        oferta: analisisSeleccionado.oferta,
        pedido: analisisSeleccionado.pedido,
        elemento: analisisSeleccionado.elemento,
        nombreElemento: analisisSeleccionado.nombreElemento,
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
        textoCorreo: "",
        facturado: false,
        numeroFacturado: "",
        operario: 0,
        cancelado: false,
        comentarios: "",
        incorrecto: false,
        noValido: false,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
        contactosEnviarCorreo: "",
      });

      i++;
    }

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
  };

  const envioCorreo = async () => {
    const resp = await mandarCorreoNoFQ(
      analisisSeleccionado.codigoCliente,
      analisisSeleccionado.textoCorreo,
      analisisSeleccionado.analisis,
      fileChange,
      contactosEnviarCorreo,
      elementoTareaEditar[0].id
    );

    if (resp.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Correo Enviado",
        text: `El correo se ha enviado correctamente`,
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
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Correo No Enviado",
        text: `Hay un error en el envío de correo`,
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

  const onChangeElemento = (e, value, name) => {
    if (e.target.textContent !== "") {
      setDataTablas(opcionesFiltradasAnalisis);
    }

    setAnalisisSeleccionado((prevState) => ({
      ...prevState,
      [name]: value.id,
      nombreElemento: e.target.textContent,
    }));
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
    <>
      {user.idPerfil === 1 ? (
        <MainLayout title="Visualización">
          <div className="home-container">
            <h4> Visualizacion de datos </h4>
            <div className="datos">
              <Autocomplete
                id="codigoCliente"
                sx={{ width: 250 }}
                options={clientes}
                value={
                  clientes.find(
                    (cliente) =>
                      cliente.razonSocial === analisisSeleccionado.nombreCliente
                  ) || null
                }
                filterOptions={(options) =>
                  clientes.filter((cliente) => filtrarNombreCliente(cliente))
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
                  setAnalisisSeleccionado((prevState) => ({
                    ...prevState,
                    nombreCliente: value ? value.razonSocial : null,
                    codigoCliente: value ? parseInt(value.codigo) : null,
                    oferta: "",
                    pedido: "",
                    elemento: "",
                    nombreElemento: "",
                  }))
                }
              />
              <Autocomplete
                id="Cliente"
                name="codigoCliente"
                options={clientes}
                value={
                  clientes.find(
                    (cliente) =>
                      cliente.codigo === analisisSeleccionado.codigoCliente
                  ) || null
                }
                getOptionLabel={(option) => option.codigo.toString()}
                filterOptions={(options) =>
                  clientes.filter((cliente) => filtrarCodigoCliente(cliente))
                }
                onInputChange={(event, newInputValue) => {
                  setInputCodigoCliente(newInputValue);
                }}
                sx={{ width: 250 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="CodigoCliente"
                    name="codigoCliente"
                  />
                )}
                onChange={(event, value) =>
                  setAnalisisSeleccionado((prevState) => ({
                    ...prevState,
                    codigoCliente: value ? parseInt(value.codigo) : null,
                    nombreCliente: value ? value.razonSocial : null,
                    oferta: "",
                    pedido: "",
                    elemento: "",
                    nombreElemento: "",
                  }))
                }
              />
              <Autocomplete
                id="Oferta"
                name="oferta"
                options={oferta}
                value={
                  oferta.find(
                    (ofert) =>
                      ofert.numeroOferta === analisisSeleccionado.oferta
                  ) || null
                }
                getOptionLabel={(option) => option.numeroOferta.toString()}
                filterOptions={(options) => {
                  if (
                    analisisSeleccionado.nombreCliente !== "" &&
                    analisisSeleccionado.codigoCliente !== 0 &&
                    analisisSeleccionado.oferta !== 0 &&
                    analisisSeleccionado.nombreCliente !== null &&
                    analisisSeleccionado.codigoCliente !== null
                  ) {
                    return options.filter(
                      (oferta) =>
                        oferta.nombreCliente ===
                        analisisSeleccionado.nombreCliente &&
                        oferta.codigoCliente ===
                        analisisSeleccionado.codigoCliente &&
                        !oferta.deleted
                    );
                  } else {
                    return options.filter((oferta) => !oferta.deleted);
                  }
                }}
                sx={{ width: 250 }}
                renderInput={(params) => (
                  <TextField {...params} label="Oferta" name="oferta" />
                )}
                onChange={(event, value) =>
                  setAnalisisSeleccionado((prevState) => ({
                    ...prevState,
                    codigoCliente: value ? parseInt(value.codigoCliente) : null,
                    nombreCliente: value ? value.nombreCliente : null,
                    oferta: value ? parseInt(value.numeroOferta) : null,
                    pedido: value ? parseInt(value.pedido) : "",
                    elemento: "",
                    nombreElemento: "",
                  }))
                }
              />
              <TextField
                id="pedido"
                sx={{ width: 250 }}
                label="Pedido"
                style={{ marginTop: "15px" }}
                value={analisisSeleccionado && analisisSeleccionado.pedido}
                name="pedido"
                onChange={(event, value) =>
                  setAnalisisSeleccionado((prevState) => ({
                    ...prevState,
                    pedido: value.pedido,
                  }))
                }
              />
              <Autocomplete
                disableClearable={true}
                id="Elemento"
                options={elementosAutocomplete}
                inputValue={analisisSeleccionado.nombreElemento}
                getOptionLabel={(option) =>
                  option.descripcion !== null
                    ? option.nombre + " " + option.descripcion
                    : option.nombre + " " + option.numero
                }
                sx={{ width: 250 }}
                renderInput={(params) => (
                  <TextField {...params} label="Elemento" name="elemento" />
                )}
                onChange={(event, value) =>
                  onChangeElemento(event, value, "elemento")
                }
              />
            </div>
            <br />
            <div className="home-container-elements">
              <div className="visualizacion">
                <div className="visualizacion-tablas">
                  {dataTablas
                    .sort((a, b) => a.id - b.id)
                    .map((analisi, index) => {
                      const datosElementos = data.filter(
                        (registro) =>
                          registro.elemento ===
                          analisisSeleccionado.elemento &&
                          registro.analisis === analisi.id
                      );
                      return (
                        <>
                          <AnalisisTable
                            title={analisi.nombre}
                            data={data}
                            rows={datosElementos}
                            columnas={analisi.tipo === 0 ? columnas1 : analisis.tipo === 1 ? columnas : columnasAerobios}
                            errorFecha={errorFecha}
                            setErrorFecha={setErrorFecha}
                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                            analisisSeleccionado={analisisSeleccionado}
                            analisiId={analisi.id}
                            analisis={analisis}
                            tipo={analisi.tipo}
                            elementos={elementos}
                            ficheros={ficheros}
                            operarios={operarios}
                            peticionPost={peticionPost}
                            peticionPut={peticionPut}
                            peticionDelete={peticionDelete}
                            descargarPdf={descargarPdf}
                            descargarPdfNoFQ={descargarPdfNoFQ}
                            handleChangeInput={handleChangeInput}
                            fileChange={fileChange}
                            setFileChange={setFileChange}
                            handleChangeCheckbox={handleChangeCheckbox}
                            analisisAutocomplete={analisisAutocomplete}
                            elementosAutocomplete={elementosAutocomplete}
                            analisisEditar={analisisEditar}
                            elementoTareaEditar={elementoTareaEditar}
                            operarioEditar={operarioEditar}
                            pdfEditar={pdfEditar}
                            setAnalisisEliminar={setAnalisisEliminar}
                            setAnalisisEditar={setAnalisisEditar}
                            setElementoTareaEditar={setElementoTareaEditar}
                            setPdfEditar={setPdfEditar}
                            setOperarioEditar={setOperarioEditar}
                            observaciones={observaciones}
                            setObservaciones={setObservaciones}
                            observacion={observacion}
                            setObservacion={setObservacion}
                            observacionEditar={observacionEditar}
                            setObservacionEditar={setObservacionEditar}
                            handlePdf={handlePdf}
                            envioCorreo={envioCorreo}
                            setContactosEnviarCorreo={setContactosEnviarCorreo}
                          />
                          <br />
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </MainLayout>
      ) : (
        <MainLayout title="Visualización">
          <div className="home-container">
            <h4> Visualizacion de datos </h4>
            <div className="datos">
              <Autocomplete
                id="codigoCliente"
                sx={{ width: 250 }}
                options={clientes}
                value={
                  clientes.find(
                    (cliente) =>
                      cliente.razonSocial === analisisSeleccionado.nombreCliente
                  ) || null
                }
                filterOptions={(options) =>
                  clientes.filter((cliente) => filtrarNombreCliente(cliente))
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
                  setAnalisisSeleccionado((prevState) => ({
                    ...prevState,
                    nombreCliente: value ? value.razonSocial : null,
                    codigoCliente: value ? parseInt(value.codigo) : null,
                    oferta: "",
                    pedido: "",
                    elemento: "",
                    nombreElemento: "",
                  }))
                }
              />
              <Autocomplete
                id="Cliente"
                name="codigoCliente"
                options={clientes}
                value={
                  clientes.find(
                    (cliente) =>
                      cliente.codigo === analisisSeleccionado.codigoCliente
                  ) || null
                }
                getOptionLabel={(option) => option.codigo}
                filterOptions={(options) =>
                  clientes.filter((cliente) => filtrarCodigoCliente(cliente))
                }
                onInputChange={(event, newInputValue) => {
                  setInputCodigoCliente(newInputValue);
                }}
                sx={{ width: 250 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="CodigoCliente"
                    name="codigoCliente"
                  />
                )}
                onChange={(event, value) =>
                  setAnalisisSeleccionado((prevState) => ({
                    ...prevState,
                    codigoCliente: value ? parseInt(value.codigo) : null,
                    nombreCliente: value ? value.razonSocial : null,
                    oferta: "",
                    pedido: "",
                    elemento: "",
                    nombreElemento: "",
                  }))
                }
              />
              <Autocomplete
                id="Oferta"
                name="oferta"
                options={oferta}
                value={
                  oferta.find(
                    (ofert) =>
                      ofert.numeroOferta === analisisSeleccionado.oferta
                  ) || null
                }
                getOptionLabel={(option) => option.numeroOferta.toString()}
                filterOptions={(options) => {
                  if (
                    analisisSeleccionado.nombreCliente !== "" &&
                    analisisSeleccionado.codigoCliente !== 0 &&
                    analisisSeleccionado.oferta !== 0 &&
                    analisisSeleccionado.nombreCliente !== null &&
                    analisisSeleccionado.codigoCliente !== null
                  ) {
                    return options.filter(
                      (oferta) =>
                        oferta.nombreCliente ===
                        analisisSeleccionado.nombreCliente &&
                        oferta.codigoCliente ===
                        analisisSeleccionado.codigoCliente &&
                        !oferta.deleted
                    );
                  } else {
                    return options.filter((oferta) => !oferta.deleted);
                  }
                }}
                sx={{ width: 250 }}
                renderInput={(params) => (
                  <TextField {...params} label="Oferta" name="oferta" />
                )}
                onChange={(event, value) =>
                  setAnalisisSeleccionado((prevState) => ({
                    ...prevState,
                    codigoCliente: value ? parseInt(value.codigoCliente) : null,
                    nombreCliente: value ? value.nombreCliente : null,
                    oferta: value ? parseInt(value.numeroOferta) : null,
                    pedido: value ? parseInt(value.pedido) : "",
                    elemento: "",
                    nombreElemento: "",
                  }))
                }
              />
              <TextField
                id="pedido"
                sx={{ width: 250 }}
                label="Pedido"
                style={{ marginTop: "15px" }}
                value={analisisSeleccionado && analisisSeleccionado.pedido}
                name="pedido"
                onChange={(event, value) =>
                  setAnalisisSeleccionado((prevState) => ({
                    ...prevState,
                    pedido: value.pedido,
                  }))
                }
              />
              <Autocomplete
                disableClearable={true}
                id="Elemento"
                options={elementosAutocomplete}
                inputValue={analisisSeleccionado.nombreElemento}
                getOptionLabel={(option) =>
                  option.descripcion !== null
                    ? option.nombre + " " + option.descripcion
                    : option.nombre + " " + option.numero
                }
                sx={{ width: 250 }}
                renderInput={(params) => (
                  <TextField {...params} label="Elemento" name="elemento" />
                )}
                onChange={(event, value) =>
                  onChangeElemento(event, value, "elemento")
                }
              />
            </div>
            <br />
            <div className="home-container-elements">
              <div className="visualizacion">
                <div className="visualizacion-tablas">
                  {dataTablas
                    .sort((a, b) => a.id - b.id)
                    .map((analisi, index) => {
                      const datosElementos = data.filter(
                        (registro) =>
                          registro.elemento ===
                          analisisSeleccionado.elemento &&
                          registro.analisis === analisi.id
                      );
                      return (
                        <>
                          <AnalisisTable
                            title={analisi.nombre}
                            data={data}
                            rows={datosElementos}
                            columnas={analisi.tipo === 0 ? columnas1 : analisis.tipo === 1 ? columnas : columnasAerobios}
                            errorFecha={errorFecha}
                            setErrorFecha={setErrorFecha}
                            setAnalisisSeleccionado={setAnalisisSeleccionado}
                            analisisSeleccionado={analisisSeleccionado}
                            analisiId={analisi.id}
                            analisis={analisis}
                            tipo={analisi.tipo}
                            elementos={elementos}
                            ficheros={ficheros}
                            operarios={operarios}
                            peticionPost={peticionPost}
                            peticionPut={peticionPut}
                            peticionDelete={peticionDelete}
                            descargarPdf={descargarPdf}
                            descargarPdfNoFQ={descargarPdfNoFQ}
                            handleChangeInput={handleChangeInput}
                            fileChange={fileChange}
                            setFileChange={setFileChange}
                            handleChangeCheckbox={handleChangeCheckbox}
                            analisisAutocomplete={analisisAutocomplete}
                            elementosAutocomplete={elementosAutocomplete}
                            analisisEditar={analisisEditar}
                            elementoTareaEditar={elementoTareaEditar}
                            operarioEditar={operarioEditar}
                            pdfEditar={pdfEditar}
                            setAnalisisEliminar={setAnalisisEliminar}
                            setAnalisisEditar={setAnalisisEditar}
                            setElementoTareaEditar={setElementoTareaEditar}
                            setPdfEditar={setPdfEditar}
                            setOperarioEditar={setOperarioEditar}
                            observaciones={observaciones}
                            setObservaciones={setObservaciones}
                            observacion={observacion}
                            setObservacion={setObservacion}
                            observacionEditar={observacionEditar}
                            setObservacionEditar={setObservacionEditar}
                            handlePdf={handlePdf}
                            envioCorreo={envioCorreo}
                            setContactosEnviarCorreo={setContactosEnviarCorreo}
                          />
                          <br />
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </MainLayout>
      )}
    </>
  );
};
