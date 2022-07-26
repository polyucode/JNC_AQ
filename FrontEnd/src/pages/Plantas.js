import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactDOM from 'react-dom';
import { Link, Navigate } from 'react-router-dom';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import { Modal, TextField, Button } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { Switch } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@mui/material/MenuItem';


import 'beautiful-react-diagrams/styles.css';
import './Plantas.css';

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 1050,
        height: 750,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%',
        height: 50
    }
}));

const useStyles2 = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 1150,
        height: 750,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '45%',
        height: 55
    }
}));

const tipos = [
    { id: 1, nombre: "Mensual" },
    { id: 2, nombre: "Bimensual" },
    { id: 3, nombre: "Trimestral" },
    { id: 4, nombre: "Semestral" },
    { id: 5, nombre: "Anual" },
    { id: 6, nombre: "Semanal" },
    { id: 7, nombre: "Bisemanal" }
  ]

const selections = [
    {
      value: 'Si',
      label: 'Si',
    },
    {
      value: 'No',
      label: 'No',
    }
  ];

const final = [
    {
        value: 'PDF',
        label: 'PDF',
    },
    {
        value: 'Ok',
        label: 'Ok',
    }
];

const protocolos = [
    {
        value: 'Desinfeccion Parado 4B',
        label: 'Desinfeccion Parado 4B'
    },
    {
        value: 'Desinfeccion Continuo 4B',
        label: 'Desinfeccion Continuo 4B'
    },
    {
        value: 'Desinfeccion limpieza parado',
        label: 'Desinfeccion limpieza parado'
    },
    {
        value: 'Desinfeccion limpieza continuo',
        label: 'Desinfeccion limpieza continuo'
    },
    {
        value: 'Desinfeccion Protocolo 4C',
        label: 'Desinfeccion Protocolo 4C'
    },
    {
        value: 'Desinfeccion de aporte',
        label: 'Desinfeccion de aporte'
    },
    {
        value: 'Desinfeccion contraincendios',
        label: 'Desinfeccion contraincendios'
    },
    {
        value: 'Desinfeccion parado fuente ornamental',
        label: 'Desinfeccion parado fuente ornamental'
    },
    {
        value: 'Desinfeccion ACS (termico)',
        label: 'Desinfeccion ACS (termico)'
    },
    {
        value: 'Desinfeccion AFCH (cloracion)',
        label: 'Desinfeccion AFCH (cloracion)'
    }
]

function Plantas() {

    const [modalTarea, setModalTarea] = useState(false);

    const [confPlantasCliente, setConfPlantasCliente] = useState({
        id: 0,
        codigoCliente: 0,
        nombreCliente: '',
        oferta: 0,
        NumNiveles: 0,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    const [tareaSeleccionada, setTareaSeleccionada] = useState({

        id: 0,
        codigoCliente: 0,
        nombreCliente: "",
        operario: "",
        protocolo: "",
        elementoPlanta: "",
        oferta: 0,
        analisis: "",
        final: "",
        valor: "",
        nombreValor: "",
        unidades: "",
        tipo: 0,
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

    const [confAnalisisNivelesPlantasCliente, setConfAnalisisNivelesPlantasCliente] = useState([]);

    /*   const [elementosPlanta, setElementosPlanta] = useState({
           id: 0,
           Nombre: "",
           Numero: 0,
           Maestro: false,
           addDate: null,
           addIdUser: null,
           modDate: null,
           modIdUser: null,
           delDate: null,
           delIdUser: null,
           deleted: null,
       });*/

    const [checked, setChecked] = React.useState(true);

    const [confNivelesPlantaCliente, setConfNivelesPlantaCliente] = useState([]);

    const [clientes, setClientes] = useState([]);
    const [clientesTable, setClientesTable] = useState({});

    const [oferta, setOferta] = useState([]);

    const [elemento, setElemento] = useState([]);

    const [operarios, setOperarios] = useState([]);

    const [analisis, setAnalisis] = useState([]);

    const [nombreCliente, setNombreCliente] = useState([]);

    const styles = useStyles();
    const styles2 = useStyles2();

    const [data, setData] = useState([]);

    const [estadoInput, setEstadoInput] = useState(true);
    const [estadoValor, setEstadoValor] = useState(true);
    const [estadoCancelado, setEstadoCancelado] = useState(true);
    const [estadoOperario, setEstadoOperario] = useState(true);
    const [estadoProtocolo, setEstadoProtocolo] = useState(true);

    const [fechaprevista, setfechaprevista] = useState("");

    let navigate = useNavigate();


    const planta = {
        codigoCliente: 0,
        oferta: 0,
        elementos: []
    }
    let listaElementos = planta.elementos;

    const tipoAnalisis = [];
    analisis.map(analisi => tipoAnalisis.push({ id: analisi.id, nombre: analisi.nombre, value: false }))
    // Variables del analisis del elemento
    let elementoAnalisisId = 0;
    let elementoAnalisisProps = tipoAnalisis;

    // Variables para los nodos del diagrama
    let contadorNodo = 1;
    let contadorPort = 1;

    const CustomRender = ({ id, content, data, inputs, outputs }) => (
        <div style={{ background: data.background, border: '1px solid ' + data.selector, borderRadius: '5px', color: data.color }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {inputs.map((port) => React.cloneElement(port, { style: { width: '10px', height: '34px', background: data.selector } }))}
                <div role="button" style={{ padding: '5px' }}>
                    {content}
                </div>
                {outputs.map((port) => React.cloneElement(port, { style: { width: '10px', height: '34px', background: data.selector } }))}
            </div>
        </div>

    );

    const [schema, { onChange, addNode, removeNode }] = useSchema(createSchema({}));

    const abrirCerrarModalTarea = () => {
        setModalTarea(!modalTarea);
    }

    const handleChangeAnalisis = (event, value) => {
        setTareaSeleccionada(prevState => ({
            ...prevState,
            analisis: value.analisis
        }))
        if (value.analisis === "Otros con Fechas de Trabajo" || value.analisis === "Otros sin Fechas de Trabajo" || value.analisis === "Legionela" || value.analisis === "Aerobios" || value.analisis === "Aguas Residuales" || value.analisis === "Desinfecciones" || value.analisis === "AguaPozo" || value.analisis === "Agua Potable" || value.analisis === "Desinfeccion ACS" || value.analisis === "Mediciones" || value.analisis === "Mantenimiento Maq Frio" || value.analisis === "Control Fuga gas" || value.analisis === "Revision de bandeja") {
            setEstadoInput(false)
        } else {
            setEstadoInput(true)
        }

        if (value.analisis === "Desinfecciones" || value.analisis === "Desinfeccion ACS" || value.analisis === "Mantenimiento Maq Frio" || value.analisis === "Mediciones" || value.analisis === "Control Fuga Gas" || value.analisis === "Agua Potable" || value.analisis === "Revision de Bandeja" || value.analisis === "Otros con Fecha de Trabajo" || value.analisis === "Otros sin Fecha de Trabajo") {
            setEstadoOperario(false)
        } else {
            setEstadoOperario(true)
        }

        if (value.analisis === "Desinfecciones") {
            setEstadoProtocolo(false)
        } else {
            setEstadoProtocolo(true)
        }
    }

    const handleChangeValor = (event, value) => {
        setTareaSeleccionada(prevState => ({
          ...prevState,
          valor: value.props.value
        }))
        if (value.props.value === "Si") {
          setEstadoValor(false)
        } else {
          setEstadoValor(true)
        }
    }

    const handleChange2 = e => {
        const { name, value } = e.target;
        setTareaSeleccionada(prevState => ({
          ...prevState,
          [name]: value
        }));
      }


    const bodyTarea = (
        <div className={styles.modal}>
            <h3>Agregar tarea</h3>
            <br />
            <div className="row g-3">
                <div className="col-md-3">
                    <h5> Codigo Cliente </h5>
                    <TextField className={styles2.inputMaterial} name="codigoCliente" disabled value={confPlantasCliente.codigoCliente} />
                </div>
                <div className="col-md-3">
                    <h5> Nombre Cliente </h5>
                    <TextField className={styles2.inputMaterial} name="nombreCliente" disabled value={confPlantasCliente.nombreCliente} />
                </div>
                <div className="col-md-3">
                    <h5> Oferta </h5>
                    <TextField className={styles2.inputMaterial} name="oferta" disabled value={confPlantasCliente.oferta} />
                </div>

                {/* Desplegable de elementos planta */}
                <div className="col-md-3">
                    <h5> Elemento de planta </h5>
                    <Autocomplete
                        disableClearable={true}
                        className={styles2.inputMaterial}
                        id="CboElementosPlanta"
                        options={elemento}
                        filterOptions={options => confAnalisisNivelesPlantasCliente.filter(planta => planta.codigoCliente === tareaSeleccionada.codigoCliente && planta.oferta === tareaSeleccionada.oferta)}
                        getOptionLabel={option => option.elemento}
                        sx={{ width: 225 }}
                        renderInput={(params) => <TextField {...params} name="elementoPlanta" />}
                        onChange={(event, value) => setTareaSeleccionada(prevState => ({
                            ...prevState,
                            elementoPlanta: value.elemento
                        }))}
                    />
                </div>

                <div className="col-md-5">
                    <h5> Analisis </h5>
                    {/* Desplegable de Técnicos */}
                    <Autocomplete
                        disableClearable={true}
                        className={styles2.inputMaterial}
                        id="analisis"
                        options={analisis}
                        filterOptions={options => confAnalisisNivelesPlantasCliente.filter(planta => planta.codigoCliente === tareaSeleccionada.codigoCliente && planta.oferta === tareaSeleccionada.oferta && planta.elemento === tareaSeleccionada.elementoPlanta)}
                        getOptionLabel={option => option.analisis}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} name="analisis" />}
                        onChange={handleChangeAnalisis}
                    />
                </div>
                <div className="col-md-5">
                    <h5> Final </h5>
                    <TextField
                        disabled={estadoInput}
                        id='final'
                        className={styles2.inputMaterial}
                        select
                        name="final"
                        onChange={handleChange2}
                    >
                        {final.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="col-md-4">
                    <h5> Valor </h5>
                    <TextField
                        disabled={estadoInput}
                        id='valor'
                        className={styles2.inputMaterial}
                        select
                        name="valor"
                        onChange={handleChangeValor}
                    >
                        {selections.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="col-md-4">
                    <h5> Nombre valor </h5>
                    <TextField disabled={estadoValor} className={styles.inputMaterial} name="nombreValor" onChange={handleChange2} />
                </div>
                <div className="col-md-2">
                    <h5> Unidades </h5>
                    <TextField disabled={estadoValor} className={styles.inputMaterial} name="unidades" onChange={handleChange2} />
                </div>
                <div className="col-md-5">
                    <h5> Operario </h5>
                    {/* Desplegable de Técnicos */}
                    <Autocomplete
                        disabled={estadoOperario}
                        disableClearable={true}
                        className={styles.inputMaterial}
                        id="Operarios"
                        options={operarios}
                        filterOptions={options => operarios.filter(cliente => cliente.idPerfil === 1004)}
                        getOptionLabel={option => option.nombre + ' ' + option.apellidos}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} name="operario" />}
                        onChange={(event, value) => setTareaSeleccionada(prevState => ({
                            ...prevState,
                            operario: value.nombre
                        }))}
                    />
                </div>
                <div className="col-md-4">
                    <h5> Protocolo </h5>
                    <TextField
                        disabled={estadoProtocolo}
                        id='protocolo'
                        className={styles.inputMaterial}
                        select
                        name="protocolo"
                        onChange={handleChange2}
                    >
                        {protocolos.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="col-md-4">
                    {/* Desplegable de tipos*/}
                    <h5> Periodicidad </h5>
                    <Autocomplete
                        disableClearable={true}
                        className={styles2.inputMaterial}
                        id="CboTipos"
                        options={tipos}
                        getOptionLabel={option => option.nombre}
                        sx={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} name="idTipo" />}
                        onChange={(event, value) => setTareaSeleccionada(prevState => ({
                            ...prevState,
                            tipo: value.id
                        }))}
                    />
                </div>
                <div className="col-md-2">
                    {/* Fecha prevista */}
                    <h5> Fecha </h5>
                    <TextField
                        className={styles.inputMaterial}
                        id="fecha"
                        type="date"
                        name="fecha"
                        sx={{ width: 225 }}
                        onChange={(e) => setfechaprevista(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
            </div>
            <br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
                <Button onClick={() => abrirCerrarModalTarea()}>Cancelar</Button>
            </div>
        </div>
    )

    function crearElemento(id) {

        const tipoAnalisis = [];
        analisis.map(analisi => tipoAnalisis.push({ id: analisi.id, nombre: analisi.nombre, value: false }))

        const tipoElemento = [];
        elemento.map(elem => tipoElemento.push({ id: elem.id, nombre: elem.nombre, numero: elem.numero }))

        // Preparamos una variable para el elemento nuevo
        let elementoNuevo = {
            id: 0,
            nombre: '',
            numero: 0,
            posicion: 0,
            nivel: 0,
            propiedades: tipoAnalisis,
        }


        // Añadimos el nombre del elemento
        elementoNuevo.nombre = document.getElementById('lista-nivel-' + id).value;
        // Añadimos el número para elementos repetidos
        let elementosRepetidos = listaElementos.filter((element) => element.nombre == elementoNuevo.nombre).length;
        elementoNuevo.numero = elementosRepetidos + 1;


        // Añadimos la posición del elemento en el nivel (por defecto el último)
        let posicionElemento = listaElementos.filter((element) => element.nivel == id).length;
        elementoNuevo.posicion = posicionElemento + 1;

        // Añadimos el nivel
        elementoNuevo.nivel = id;
        // Añadimos el elemento nuevo a la lista principal
        listaElementos.push(elementoNuevo);

        // Preparamos una lista de elementos del nivel para actualizar
        let elementosNivel = listaElementos.filter((element) => element.nivel == id);

        // Creamos los elementos de la lista y los pintamos
        let listaElementosNivel = [];
        elementosNivel.forEach((elemento, index) => {
            listaElementosNivel.push(React.createElement('option', { key: "elemento" + index }, elemento.nombre + ' ' + elemento.numero));
        });

        ReactDOM.render(listaElementosNivel, document.getElementById('lista-elementos-nivel-' + (id)));

        for (id = 0; id < elemento.length; id++) {
            if (tipoElemento[id].nombre === elementoNuevo.nombre && tipoElemento[id].numero === elementoNuevo.numero) {
                elementoNuevo.id = tipoElemento[id].id
            }
        }
        // Actualizamos la lista de análisis por elemento
        if (elementosRepetidos === 0) {
            ReactDOM.render(
                listaElementos.map((d, index) => React.createElement('option', { key: index, value: index }, d.nombre)),
                document.getElementById('analisis-elemento-list')
            );
        } else {
            ReactDOM.render(
                listaElementos.map((d, index) => React.createElement('option', { key: index, value: index }, d.nombre + ' ' + d.numero)),
                document.getElementById('analisis-elemento-list')
            );
        }

        //crearNodo(elementoNuevo)
    }

    function eliminarElemento(id) {

        listaElementos.pop()

        let listaElementosNivel = [];
        listaElementos.forEach((elemento, index) => {
            listaElementosNivel.push(React.createElement('option', { key: "elemento" + index }, elemento.nombre + ' ' + elemento.numero));
        });

        ReactDOM.render(listaElementosNivel, document.getElementById('lista-elementos-nivel-' + (id)));

        ReactDOM.render(
            listaElementos.map((d, index) => React.createElement('option', { key: index, value: index }, d.nombre + ' ' + d.numero)),
            document.getElementById('analisis-elemento-list')
        );
    }

    function crearNiveles() {
        // Obtenemos el valor de la cantidad de niveles a crear
        let numNiveles = document.getElementById('numero-niveles').value;
        let listadoNiveles = [];

        if (numNiveles > 5) {
            alert('El número máximo de niveles que se pueden crear son 5');
            return;
        }

        // Generamos en el DOM la interfaz de los niveles
        for (let i = 0; i < numNiveles; i++) {
            let listadoElementos = [
                React.createElement('option', { key: 'Osmosis', value: "Osmosis" }, "Osmosis"),
                React.createElement('option', { key: 'Caldera', value: "Caldera" }, "Caldera"),
                React.createElement('option', { key: 'Torre', value: "Torre" }, "Torre"),
                React.createElement('option', { key: 'Refrigeracion', value: "Refrigeracion" }, "Refrigeracion"),
                React.createElement('option', { key: 'Deposito', value: "Deposito" }, "Deposito")
            ]

            // Creamos el listado de elementos disponibles


            // Creamos todos los componentes de la interfaz del nivel
            let elementos = [
                React.createElement('h6', { key: 'titulo' }, 'Nivel ' + (i + 1)),
                React.createElement('hr', { key: 'hr' }, null),
                React.createElement('select', { key: 'lista-nivel', id: 'lista-nivel-' + (i + 1) }, listadoElementos),
                React.createElement('button', { key: 'button+', onClick: () => crearElemento(i + 1) }, '+'),
                React.createElement('button', { key: 'button-', onClick: () => eliminarElemento(i + 1) }, '-'),
                React.createElement('select', { key: 'lista-elementos-nivel', className: 'lista-niveles', id: 'lista-elementos-nivel-' + (i + 1), size: 10 }, null),
                React.createElement('input', { key: 'checkbox', type: 'checkbox' }, null),
                React.createElement('label', { key: 'inspector' }, 'Ver inspector'),
                React.createElement('button', { key: 'eliminar', onClick: () => eliminarNivel() }, 'Eliminar')
            ]

            // Creamos el contenedor de planta principal para añadir todos los demás componentes
            let contenido = React.createElement('div', { key: 'planta' + (i + 1), className: 'planta' }, elementos);
            listadoNiveles.push(contenido);
        }

        // Finalmente renderizamos
        ReactDOM.render(listadoNiveles, document.getElementById('elementos-planta'));
    }

    function eliminarNivel() {
        let listaElementosNivel = []
        listaElementosNivel.pop(ReactDOM.render(listaElementosNivel, document.getElementById('elementos-planta')))
    }

    const GetClientes = async () => {
        axios.get("/cliente", token).then(response => {
            const cliente = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setClientes(cliente);
        }, [])
    }

    function selAnalisisElemento() {
        // Obtenemos el elemento mediante si posición
        elementoAnalisisId = document.getElementById('analisis-elemento-list').value;
        elementoAnalisisProps = listaElementos[elementoAnalisisId].propiedades;
        elementoAnalisisProps.map((analisi, index) => document.getElementById(analisi.id).checked = elementoAnalisisProps[index].value)
    }

    function changeAnalisisElemento(e) {
        listaElementos[elementoAnalisisId].propiedades[e.target.id - 1].value = e.target.checked
        elementoAnalisisProps = listaElementos[elementoAnalisisId].propiedades;
        // Cuando cambia el valor de un checkbox, vemos cual de ellos ha sido
        // y actualizamos el valor de la propiedad del elemento
        switch (e.target.id) {
            case '1':
                elementoAnalisisProps[0].value = e.target.checked;
                break;
            case '2':
                elementoAnalisisProps[1].value = e.target.checked;
                break;
            case '3':
                elementoAnalisisProps[2].value = e.target.checked;
                break;
            case '4':
                elementoAnalisisProps[3].value = e.target.checked;
                break;
            case '5':
                elementoAnalisisProps[4].value = e.target.checked;
                break;
            case '6':
                elementoAnalisisProps[5].value = e.target.checked;
                break;
            case '7':
                elementoAnalisisProps[6].value = e.target.checked;
                break;
            case '8':
                elementoAnalisisProps[7].value = e.target.checked;
                break;
            case '9':
                elementoAnalisisProps[8].value = e.target.checked;
                break;
            case '10':
                elementoAnalisisProps[9].value = e.target.checked;
                break;
            case '11':
                elementoAnalisisProps[10].value = e.target.checked;
                break;
            case '15':
                elementoAnalisisProps[11].value = e.target.checked;
                break;
            case '16':
                elementoAnalisisProps[12].value = e.target.checked;
                break;
            case '17':
                elementoAnalisisProps[13].value = e.target.checked;
                break;
            case '18':
                elementoAnalisisProps[14].value = e.target.checked;
                break;
        }

        // UNa vez actualizado, guardamos las propiedades en el elemento
        // por si el usuario cambia de elemento
        listaElementos[elementoAnalisisId].propiedades = elementoAnalisisProps;
    }

    const GetConfPlantasCliente = async () => {
        axios.get("/confplantascliente", token).then(response => {
            setConfPlantasCliente(response.data.data)
        })
    }

    const GetConfNivelesPlantaCliente = async () => {
        axios.get("/confnivelesplantascliente", token).then(response => {
            setConfNivelesPlantaCliente(response.data.data)
        })
    }

    const GetElementosPlanta = async () => {
        axios.get("/elementosplanta", token).then(response => {
            const elemento = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setElemento(elemento);
        })
    }

    const GetOfertas = async () => {
        axios.get("/ofertasclientes", token).then(response => {
            const oferta = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setOferta(oferta);
        }, [])
    }

    const GetAnalisis = async () => {
        axios.get("/analisis", token).then(response => {
            const analisi = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setAnalisis(analisi);
        }, [])
    }

    const GetConfAnalisisNivelesPlantasCliente = async () => {
        axios.get("/analisisnivelesplantascliente", token).then(response => {
            const niveles = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setConfAnalisisNivelesPlantasCliente(niveles);
        }, [])
    }

    const GetOperarios = async () => {
        axios.get("/usuario", token).then(response => {
          const usuario = Object.entries(response.data.data).map(([key, value]) => (key, value))
          setOperarios(usuario);
        }, [])
      }

    useEffect(() => {
        GetOperarios();
        GetConfAnalisisNivelesPlantasCliente();
        GetConfNivelesPlantaCliente();
        GetElementosPlanta();
        GetClientes();
        GetOfertas();
        GetAnalisis();
    }, [])


    const peticionPost = async () => {
        if (confPlantasCliente.NumNiveles > 5) {
            alert('El número máximo de niveles que se pueden crear son 5');
            return;
        } else if (confPlantasCliente.codigoCliente == null || confPlantasCliente.oferta == null || confPlantasCliente.NumNiveles <= 0 || confPlantasCliente.NumNiveles == null) {
            alert('Faltan introducir datos correctos para crear los niveles');
            return;
        }
        else {
            await axios.post("/confplantascliente", confPlantasCliente, token)
                .then(response => {
                    confPlantasCliente.id = response.data.data.id
                    return response.data.data,
                        crearNiveles();
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    async function datosElementos() {
        listaElementos.map((elemento) => {
            const elem = {
                id: 0,
                CodigoCliente: confPlantasCliente.codigoCliente,
                NombreCliente: confPlantasCliente.nombreCliente,
                Oferta: confPlantasCliente.oferta,
                Id_Planta: confPlantasCliente.id,
                Nivel: elemento.nivel,
                IdElemento: elemento.id,
                Visible: false,
                Conecta: "",
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null
            }
            axios.post("/confnivelesplantascliente", elem, token)
                .then(response => {
                    return response
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }

    async function datosAnalisisElementos() {
        datosElementos()
        listaElementos.map((elemento) => {
            elemento.propiedades.map((analisis) => {
                if (analisis.value == true) {
                    const analisisElem = {
                        id: 0,
                        CodigoCliente: confPlantasCliente.codigoCliente,
                        Oferta: confPlantasCliente.oferta,
                        IdPlanta: confPlantasCliente.id,
                        Elemento: elemento.nombre + " " + elemento.numero,
                        Analisis: analisis.nombre,
                        addDate: null,
                        addIdUser: null,
                        modDate: null,
                        modIdUser: null,
                        delDate: null,
                        delIdUser: null,
                        deleted: null
                    }
                    axios.post("/analisisnivelesplantascliente", analisisElem, token)
                        .then(response => {
                            {response && navigate('/tareas', { replace: true })}
                            return response
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            })
        })
        //window.location.reload();
    }

    function crearNodo(elemento) {

        console.log('Crear nodo');

        // Preparamos los input y output
        var input = [];
        var output = [];

        // Según el nivel del elemento, asignamos estilos y entradas o salidas
        if (elemento.nivel == 1) {
            var color = '#d1c4e9'; // 100
            var selector = '#b39ddb'; // 200
            var textoColor = '#4527a0'; // 800
            output = [
                { id: 'port-' + contadorPort, alignment: 'right' }
            ]
            contadorPort += 1;
        }
        if (elemento.nivel == 2) {
            var color = '#c5cae9';
            var selector = '#9fa8da';
            var textoColor = '#283593';
            input = [
                { id: 'port-' + contadorPort, alignment: 'left' }
            ]
            output = [
                { id: 'port-' + (contadorPort + 1), alignment: 'right' }
            ]
            contadorPort += 1;
        }
        if (elemento.nivel == 3) {
            var color = '#bbdefb';
            var selector = '#90caf9';
            var textoColor = '#1565c0';
            input = [
                { id: 'port-' + contadorPort, alignment: 'left' }
            ]
            output = [
                { id: 'port-' + (contadorPort + 1), alignment: 'right' }
            ]
            contadorPort += 1;
        }
        if (elemento.nivel == 4) {
            var color = '#b3e5fc';
            var selector = '#81d4fa';
            var textoColor = '#0277bd';
            input = [
                { id: 'port-' + contadorPort, alignment: 'left' }
            ]
            output = [
                { id: 'port-' + (contadorPort + 1), alignment: 'right' }
            ]
            contadorPort += 1;
        }
        if (elemento.nivel == 5) {
            var color = '#b2ebf2';
            var selector = '#80deea';
            var textoColor = '#00838f';
            input = [
                { id: 'port-' + contadorPort, alignment: 'left' }
            ]
            contadorPort += 1;
        }

        // Creamos el nodo con los datos preparados
        var nodo = {
            id: 'node-' + contadorNodo,
            content: elemento.nombre + ' ' + elemento.numero,
            coordinates: [150 * contadorNodo, 60],
            render: CustomRender,
            data: { background: color, selector: selector, color: textoColor },
            inputs: input,
            outputs: output
        };

        // Augmentamos el contador de nodos y lo añadimos a la lista

        addNode(nodo)
        contadorNodo++;

        schema.nodes.forEach((node) => {
            console.log(node);
        })

        console.log(schema);



    }

    const handleChange = e => {
        const { name, value } = e.target;
        setConfPlantasCliente(prevState => ({
            ...prevState,
            //[name]: value
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        }));
    }


    return (

        <div className="main-container">
            <div className='row1-1'>
                <div className='col1-1'>
                    <div className='cliente-niveles-container'>

                        {/* BUSQUEDA DE CLIENTES */}
                        <div className="busqueda-clientes">
                            <h5>Cliente</h5>
                            <hr />
                            <p>Codigo</p>
                            <Autocomplete
                                disableClearable={true}
                                id="CodigoCliente"
                                options={clientes}
                                getOptionLabel={option => option.codigo}
                                sx={{ width: 250 }}
                                renderInput={(params) => <TextField {...params} type="number" min="0" label="" name="codigoCliente" />}
                                onChange={(event, value) => setConfPlantasCliente(prevState => ({
                                    ...prevState,
                                    codigoCliente: parseInt(value.codigo)
                                }))}
                            />
                            <br />
                            <div className="col-md-6">
                                <p>Nombre</p>
                                <Autocomplete
                                    disableClearable={true}
                                    id="NombreCliente"
                                    options={clientes}
                                    filterOptions={options => clientes.filter(cliente => cliente.codigo === confPlantasCliente.codigoCliente)}
                                    getOptionLabel={option => option.razonSocial}
                                    sx={{ width: 250 }}
                                    renderInput={(params) => <TextField {...params} min="0" label="" name="nombreCliente" />}
                                    onChange={(event, value) => setConfPlantasCliente(prevState => ({
                                        ...prevState,
                                        nombreCliente: value.razonSocial
                                    }))}
                                />
                            </div>
                            <br /><br />
                            <div className='numero-oferta'>
                                <h5>Numero de Oferta</h5>
                                <hr />
                                <Autocomplete
                                    disableClearable={true}
                                    id="oferta"
                                    options={oferta}
                                    filterOptions={options => oferta.filter(oferta => oferta.codigoCliente === confPlantasCliente.codigoCliente)}
                                    getOptionLabel={option => option.numeroOferta}
                                    sx={{ width: 250 }}
                                    renderInput={(params) => <TextField {...params} type="number" name="oferta" />}
                                    onChange={(event, value) => setConfPlantasCliente(prevState => ({
                                        ...prevState,
                                        oferta: parseInt(value.numeroOferta)
                                    }))}
                                />
                            </div>
                        </div>

                        {/* NUMERO DE NIVELES */}
                        <div className='numero-niveles'>
                            <h5>Número de niveles en planta</h5>
                            <hr />
                            <center>
                                <p>Número</p>
                                <input id="numero-niveles" size="2" type="number" min="0" name="NumNiveles" onChange={handleChange} />
                            </center>
                            <div className='botones'>
                                <button onClick={peticionPost}>Crear Niveles </button>
                            </div>
                        </div>

                    </div>
                    <br />

                    {/* ANÁLISIS POR ELEMENTO */}
                    <div className='analisis-elemento'>
                        <h5>Análisis por elemento</h5>
                        <hr />
                        <div className='elementos'>
                            <select name="analisis-elemento" id="analisis-elemento-list" size="6" onChange={selAnalisisElemento}>
                                {
                                    // Recorremos la lista de elementos que tenemos para mostrarlos
                                    listaElementos.map((d, index) => (<option key={index} value={index}>{d.nombre} {d.numero}</option>))
                                }
                            </select>
                            <div className='analisis-elemento-checks'>
                                {
                                    analisis.map((analisi, index) => <div key={index}><input type="checkbox" id={analisi.id} onChange={changeAnalisisElemento} /> {analisi.nombre} </div>)
                                }
                            </div>
                        </div>
                        <button onClick={datosAnalisisElementos}>Guardar</button>
                    </div>

                </div>
                <div className='col2-1'>

                    {/* ELEMENTOS DE PLANTA */}
                    <div className='elementos-planta'>
                        <h5>Elementos de planta</h5>
                        <hr />
                        <div className='elementos-planta-elements' id='elementos-planta'></div>
                    </div>

                </div>

            </div>

            <div className='row2-2'>
                <h5>Diagrama</h5>
                <hr />
                <div style={{ height: '22.5rem' }}>
                    <Diagram schema={schema} onChange={onChange} />
                </div>
            </div>
            <div className='botones'>
                <button><Link to='/plantasTabla'>Siguiente</Link></button>
            </div>




            <Modal
                open={modalTarea}
                onClose={abrirCerrarModalTarea}>
                {bodyTarea}
            </Modal>
        </div>
    )

}

export default Plantas;