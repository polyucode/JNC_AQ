import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import { Modal, TextField, Button } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { Switch } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@mui/material/MenuItem';


import { AddAnalisis } from '../components/AddAnalisis';

import 'beautiful-react-diagrams/styles.css';
import './Plantas.css';

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

function Plantas() {

    const [modalTarea, setModalTarea] = useState(false);

    const [confPlantasCliente, setConfPlantasCliente] = useState({
        id: 0,
        codigoCliente: 0,
        nombreCliente: '',
        oferta: '',
        NumNiveles: 0,
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
        ReactDOM.render(
            listaElementos.map((d, index) => React.createElement('option', { key: index, value: index }, d.nombre + ' ' + d.numero)),
            document.getElementById('analisis-elemento-list')
        );

        crearNodo(elementoNuevo)
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
        // console.log('Crear elemento');
        //removeNode();

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
                React.createElement('option', { key: 'Deposito', value: "Deposito" }, "Deposito"),
                React.createElement('option', { key: 'Filtro', value: "Filtro" }, "Filtro"),
                React.createElement('option', { key: 'Descalcificador', value: "Descalcificador" }, "Descalcificador"),
                React.createElement('option', { key: 'Ultrafiltracion', value: "Ultrafiltracion" }, "Ultrafiltracion"),
                React.createElement('option', { key: 'Arqueta', value: "Arqueta" }, "Arqueta"),
                React.createElement('option', { key: 'Pozo', value: "Pozo" }, "Pozo"),
                React.createElement('option', { key: 'Acometida', value: "Acometida" }, "Acometida")
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
        console.log(listaElementos)
        console.log(elementoAnalisisProps)
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
            case '12':
                elementoAnalisisProps[11].value = e.target.checked;
                break;
            case '13':
                elementoAnalisisProps[12].value = e.target.checked;
                break;
            case '14':
                elementoAnalisisProps[13].value = e.target.checked;
                break;
            case '15':
                elementoAnalisisProps[14].value = e.target.checked;
                break;
            case '16':
                elementoAnalisisProps[15].value = e.target.checked;
                break;
            case '17':
                elementoAnalisisProps[16].value = e.target.checked;
                break;
            case '18':
                elementoAnalisisProps[17].value = e.target.checked;
                break;
            default:
                elementoAnalisisProps[e.target.id].value = e.target.checked;

        }

        // UNa vez actualizado, guardamos las propiedades en el elemento
        // por si el usuario cambia de elemento
        listaElementos[elementoAnalisisId].propiedades = elementoAnalisisProps;
    }

    const GetConfPlantasCliente = async () => {
        axios.get("http://172.26.0.169:44343/api/confplantascliente", token).then(response => {
            setConfPlantasCliente(response.data.data)
        })
    }

    const GetConfNivelesPlantaCliente = async () => {
        axios.get("http://172.26.0.169:44343/api/confnivelesplantascliente", token).then(response => {
            setConfNivelesPlantaCliente(response.data.data)
        })
    }

    const GetElementosPlanta = async () => {
        axios.get("http://172.26.0.169:44343/api/elementosplanta", token).then(response => {
            const elemento = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setElemento(elemento);
        })
    }

    const GetOfertas = async () => {
        axios.get("http://172.26.0.169:44343/api/ofertasclientes", token).then(response => {
            const oferta = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setOferta(oferta);
        }, [])
    }

    const GetAnalisis = async () => {
        axios.get("http://172.26.0.169:44343/api/analisis", token).then(response => {
            const analisi = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setAnalisis(analisi);
        }, [])
    }

    const GetConfAnalisisNivelesPlantasCliente = async () => {
        axios.get("http://172.26.0.169:44343/api/analisisnivelesplantascliente", token).then(response => {
            const niveles = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setConfAnalisisNivelesPlantasCliente(niveles);
        }, [])
    }

    const GetOperarios = async () => {
        axios.get("http://172.26.0.169:44343/api/usuario", token).then(response => {
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
    }, []);

    const peticionPost = async () => {
        if (confPlantasCliente.NumNiveles > 5) {
            alert('El número máximo de niveles que se pueden crear son 5');
            return;
        } else if (confPlantasCliente.codigoCliente == null || confPlantasCliente.oferta == null || confPlantasCliente.NumNiveles <= 0 || confPlantasCliente.NumNiveles == null) {
            alert('Faltan introducir datos correctos para crear los niveles');
            return;
        }
        else {
            await axios.post("http://172.26.0.169:44343/api/confplantascliente", confPlantasCliente, token)
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
                Elemento: elemento.nombre + " " + elemento.numero,
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
            axios.post("http://172.26.0.169:44343/api/confnivelesplantascliente", elem, token)
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
                    axios.post("http://172.26.0.169:44343/api/analisisnivelesplantascliente", analisisElem, token)
                        .then(response => {
                            { response && navigate('/tareas', { replace: true }) }
                            return response
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            })
        })
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

        schema.nodes.push(nodo)
        //addNode(nodo)
        contadorNodo++;

        schema.nodes.forEach((node, index) => {
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

    useEffect(() => {

        const nombre = clientes.filter(cliente => cliente.codigo === confPlantasCliente.codigoCliente);
        (nombre.length > 0) && setConfPlantasCliente({
            ...confPlantasCliente,
            nombreCliente: nombre[0].razonSocial,
            oferta: ''
        })

    }, [confPlantasCliente.codigoCliente])

    const onAddAnalisis = e => {
        console.log("He pulsado el boton");
        e.preventDefault();
        <AddAnalisis/>
    }


    return (

        <div className="main-container">
            <div className='row1-1'>
                <div className='col1-1'>
                    <div className='cliente-niveles-container'>

                        {/* BUSQUEDA DE CLIENTES */}
                        <div className="busqueda-clientes">
                            <h4>Cliente</h4>
                            <hr />
                            <h5>Codigo</h5>
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
                                <h5>Nombre</h5>
                                <Autocomplete
                                    disableClearable={true}
                                    id="NombreCliente"
                                    options={clientes}
                                    inputValue={confPlantasCliente.nombreCliente}
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
                                <h4>Numero de Oferta</h4>
                                <hr />
                                <Autocomplete
                                    disableClearable={true}
                                    id="oferta"
                                    options={oferta}
                                    inputValue={confPlantasCliente.oferta}
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
                            <h4>Número de niveles en planta</h4>
                            <hr />
                            <center>
                                <h5>Número</h5>
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
                        <h4>Análisis por elemento</h4>
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
                                <AddAnalisis guardarAnalisis={setAnalisis} verAnalisis={analisis} />
                                <input type="button" onClick={onAddAnalisis} value="Añadir Analisis" />
                            </div>
                        </div>
                        <button onClick={datosAnalisisElementos}>Guardar</button>
                    </div>

                </div>
                <div className='col2-1'>

                    {/* ELEMENTOS DE PLANTA */}
                    <div className='elementos-planta'>
                        <h4>Elementos de planta</h4>
                        <hr />
                        <div className='elementos-planta-elements' id='elementos-planta'></div>
                    </div>

                </div>

            </div>

            <div className='row2-2'>
                <h4>Diagrama</h4>
                <hr />
                <div style={{ height: '22.5rem' }}>
                    <Diagram schema={schema} onChange={onChange} />
                </div>
            </div>
            <div className='botones'>
                <button><Link to='http://172.26.0.169/YC_React/plantasTabla'>Siguiente</Link></button>
            </div>
        </div>
    )

}

export default Plantas;