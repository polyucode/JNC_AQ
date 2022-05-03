import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Modal, TextField, Button } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import { Switch } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import 'beautiful-react-diagrams/styles.css';
import './Plantas.css';

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

function Plantas() {

    /*const [confPlantasCliente, setConfPlantasCliente] = useState({
        id: 0,
        IdCliente: 0,
        IdPlanta: 0,
        NumNiveles: 0,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    const [confNivelesPlantaCliente, setConfNivelesPlantaCliente] = useState({
        id: 0,
        IdCliente: 0,
        IdPlanta: 0,
        Nivel: 0,
        Id_Elemento: 0,
        Orden: 0,
        Visible: false,
        Conecta: "",
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    const [elementosPlanta, setElementosPlanta] = useState({
        id: 0,
        Nombre: "",
        Maestro: false,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });*/

    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 35,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
            '& .MuiSwitch-thumb': {
                width: 15,
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
                transform: 'translateX(12px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 12,
            height: 12,
            borderRadius: 6,
            transition: theme.transitions.create(['width'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor:
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
            boxSizing: 'border-box',
        },
    }));

    const [confPlantasCliente, setConfPlantasCliente] = useState([]);

    const [confNivelesPlantaCliente, setConfNivelesPlantaCliente] = useState([]);

    const [elementosPlanta, setElementosPlanta] = useState([]);

    const [clientes, setClientes] = useState([]);

    const [nombreCliente, setNombreCliente] = useState([]);

    const [data, setData] = useState([]);

    const planta = {
        idCliente: '',
        nombreCliente: '',
        elementos: []
    }
    let listaElementos = planta.elementos;

    // Variables del analisis del elemento
    const elementoAnalisisId = 0;
    const elementoAnalisisProps = {
        fisicoQuimico: false,
        aerobios: false,
        legionela: false,
        aguaPotable: false,
        aguasResiduales: false
    };

    // Variables para los nodos del diagrama
    let contadorNodo = 1;
    let contadorPort = 1;

    const CustomRender = ({ id, content, data, inputs, outputs }) => (

        <div style={{background: data.background, border: '1px solid '+data.selector, borderRadius: '5px', color: data.color}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                {inputs.map((port) => React.cloneElement(port, {style: { width: '10px', height: '34px', background: data.selector }}))}
                <div role="button" style={{padding: '5px'}}>
                {content}
                </div>
                {outputs.map((port) => React.cloneElement(port, {style: { width: '10px', height: '34px', background: data.selector }}))}
            </div>
        </div>
    
    );

    const [schema, { onChange, addNode, removeNode }] = useSchema(createSchema({}));

    function crearElemento(id) {

        // Preparamos una variable para el elemento nuevo
        let elementoNuevo = {
            nombre: '',
            numero: 0,
            posicion: 0,
            nivel: 0,
            propiedades: {
                fisicoQuimico: false,
                aerobios: false,
                legionela: false,
                aguaPotable: false,
                aguasResiduales: false
            }
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
        console.log(elementosNivel)
        // Creamos los elementos de la lista y los pintamos
        let listaElementosNivel = [];
        elementosNivel.forEach((elemento) => {
            listaElementosNivel.push(React.createElement('option', null, elemento.nombre + ' ' + elemento.numero));
        });
        ReactDOM.render(listaElementosNivel, document.getElementById('lista-elementos-nivel-' + (id)));

        // Actualizamos la lista de análisis por elemento
        ReactDOM.render(
            listaElementos.map((d, index) => React.createElement('option', { key: index, value: index }, d.nombre + ' ' + d.numero)),
            document.getElementById('analisis-elemento-list')
        );
        console.log(listaElementos)
    }

    function eliminarElemento(id) {
        console.log(id)
        console.log(listaElementos)

        listaElementos.pop()

        let listaElementosNivel = [];
        listaElementos.forEach((elemento) => {
            listaElementosNivel.push(React.createElement('option', null, elemento.nombre + ' ' + elemento.numero));
        });

        ReactDOM.render(listaElementosNivel, document.getElementById('lista-elementos-nivel-' + (id)));

        ReactDOM.render(
            listaElementos.map((d, index) => React.createElement('option', { key: index, value: index }, d.nombre + ' ' + d.numero)),
            document.getElementById('analisis-elemento-list')
        );

        console.log('Crear elemento');
        crearNodo(elementoNuevo);

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

            // Creamos el listado de elementos disponibles
            let listadoElementos = [
                React.createElement('option', { value: 'Osmosis' }, 'Osmosis'),
                React.createElement('option', { value: 'Depósito' }, 'Depósito'),
                React.createElement('option', { value: 'Refrigeración' }, 'Refrigeración'),
                React.createElement('option', { value: 'Torre' }, 'Torre'),
                React.createElement('option', { value: 'Caldera' }, 'Caldera')
            ];

            // Creamos todos los componentes de la interfaz del nivel
            let elementos = [
                React.createElement('h6', null, 'Nivel ' + (i + 1)),
                React.createElement('hr', null, null),
                React.createElement('select', { id: 'lista-nivel-' + (i + 1) }, listadoElementos),
                React.createElement('button', { onClick: () => crearElemento(i + 1) }, '+'),
                React.createElement('button', { onClick: () => eliminarElemento(i + 1) }, '-'),
                React.createElement('select', { class: 'lista-niveles', id: 'lista-elementos-nivel-' + (i + 1), size: 10 }, null),
                React.createElement('input', { type: 'checkbox' }, null),
                React.createElement('label', null, 'Ver inspector'),
                React.createElement('button', { onClick: () => eliminarNivel() }, 'Eliminar')
            ]

            // Creamos el contenedor de planta principal para añadir todos los demás componentes
            let contenido = React.createElement('div', { className: 'planta' }, elementos);
            listadoNiveles.push(contenido);
            console.log("Este es el listado de niveles" + listadoNiveles)
        }

        // Finalmente renderizamos
        ReactDOM.render(listadoNiveles, document.getElementById('elementos-planta'));
        console.log(listadoNiveles)
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

        // Seteamos los checkboxs según los datos almacenados en el elemento
        document.getElementById('ckb-fisico-quimico').checked = elementoAnalisisProps.fisicoQuimico;
        document.getElementById('ckb-aerobios').checked = elementoAnalisisProps.aerobios;
        document.getElementById('ckb-legionela').checked = elementoAnalisisProps.legionela;
        document.getElementById('ckb-agua-potable').checked = elementoAnalisisProps.aguaPotable;
        document.getElementById('ckb-aguas-residuales').checked = elementoAnalisisProps.aguasResiduales;

    }

    function changeAnalisisElemento(e) {

        // Cuando cambia el valor de un checkbox, vemos cual de ellos ha sido
        // y actualizamos el valor de la propiedad del elemento
        switch (e.target.id) {
            case 'ckb-fisico-quimico':
                elementoAnalisisProps.fisicoQuimico = e.target.checked;
                break;
            case 'ckb-aerobios':
                elementoAnalisisProps.aerobios = e.target.checked;
                break;
            case 'ckb-legionela':
                elementoAnalisisProps.legionela = e.target.checked;
                break;
            case 'ckb-agua-potable':
                elementoAnalisisProps.aguaPotable = e.target.checked;
                break;
            case 'ckb-aguas-residuales':
                elementoAnalisisProps.aguasResiduales = e.target.checked;
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
            setElementosPlanta(response.data.data)
        })
    }

    useEffect(() => {
        GetConfPlantasCliente();
        GetConfNivelesPlantaCliente();
        GetElementosPlanta();
        GetClientes();
        //peticionGet();
        //GetPerfiles();
        //GetPoblacion();
        //GetProvincia();
        //GetComarca();
    }, [])

    function crearNodo(elemento) {

        console.log('Crear nodo');

        // Preparamos los input y output
        var input = [];
        var output = [];

        // Según el nivel del elemento, asignamos estilos y entradas o salidas
        if(elemento.nivel == 1){
            var color = '#d1c4e9'; // 100
            var selector = '#b39ddb'; // 200
            var textoColor = '#4527a0'; // 800
            output = [
                { id: 'port-'+contadorPort, alignment: 'right' }
            ]
            contadorPort += 1;
        }
        if(elemento.nivel == 2){
            var color = '#c5cae9';
            var selector = '#9fa8da';
            var textoColor = '#283593';
            input = [
                { id: 'port-'+contadorPort, alignment: 'left' }
            ]
            output = [
                { id: 'port-'+(contadorPort+1), alignment: 'right' }
            ]
            contadorPort += 2;
        }
        if(elemento.nivel == 3){
            var color = '#bbdefb';
            var selector = '#90caf9';
            var textoColor = '#1565c0';
            input = [
                { id: 'port-'+contadorPort, alignment: 'left' }
            ]
            output = [
                { id: 'port-'+(contadorPort+1), alignment: 'right' }
            ]
            contadorPort += 2;
        }
        if(elemento.nivel == 4){
            var color = '#b3e5fc';
            var selector = '#81d4fa';
            var textoColor = '#0277bd';
            input = [
                { id: 'port-'+contadorPort, alignment: 'left' }
            ]
            output = [
                { id: 'port-'+(contadorPort+1), alignment: 'right' }
            ]
            contadorPort += 2;
        }
        if(elemento.nivel == 5){
            var color = '#b2ebf2';
            var selector = '#80deea';
            var textoColor = '#00838f';
            input = [
                { id: 'port-'+contadorPort, alignment: 'left' }
            ]
            contadorPort += 1;
        }

        // Creamos el nodo con los datos preparados
        var nodo = {
            id: 'node-'+contadorNodo,
            content: elemento.nombre+' '+elemento.numero,
            coordinates: [150*contadorNodo, 60],
            render: CustomRender,
            data: {background: color, selector: selector, color: textoColor},
            inputs: input,
            outputs: output
        };

        // Augmentamos el contador de nodos y lo añadimos a la lista
        contadorNodo += 1;

        schema.nodes.forEach((node) => {
            console.log(node.id);
        })

        addNode(nodo);

        console.log(schema);

    }


    return(
    
        <div className="main-container">
            <div className='row1'>
                <div className='col1'>
                    <div className='cliente-niveles-container'>

                        {/* BUSQUEDA DE CLIENTES */}
                        <div className="busqueda-clientes">
                            <h5>Cliente</h5>
                            <hr />
                            <p>Codigo</p>
                            <Autocomplete
                                disableClearable={true}
                                id="codigo"
                                options={clientes}
                                getOptionLabel={option => option.codigo}
                                sx={{ width: 250 }}
                                renderInput={(params) => <TextField {...params} label="" name="codigo" />}
                                onChange={(event, value) => setClientes(prevState => ({
                                    ...prevState,
                                    idCliente: value.id

                                }))}
                            />
                            <br /><br />
                            <p>Nombre</p>
                            <Autocomplete
                                disableClearable={true}
                                id="nombre"
                                options={clientes}
                                getOptionLabel={option => option.nombreComercial}
                                sx={{ width: 250 }}
                                renderInput={(params) => <TextField {...params} name="nombre" />}
                                onChange={(event, value) => setClientes(prevState => ({
                                    ...prevState,
                                    idCliente: value.id
                                }))}
                            />
                        </div>

                        {/* NUMERO DE NIVELES */}
                        <div className='numero-niveles'>
                            <h5>Número de niveles en planta</h5>
                            <hr />
                            <center>
                                <p>Número</p>
                                <input type="text" id="numero-niveles" size="2" />
                            </center>
                            <div className='botones'>
                                <button>Cancelar</button>
                                <button onClick={crearNiveles}>Aceptar</button>
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
                                <h4> Necesita parametrización? </h4>
                                <FormGroup>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography>No</Typography>
                                        <AntSwitch defaultChecked />
                                        <Typography>Si</Typography>
                                    </Stack>
                                </FormGroup>
                                <br />
                                {AntSwitch &&
                                    <React.Fragment>
                                        <label><input type="checkbox" id="ckb-fisico-quimico" onChange={changeAnalisisElemento} /> Físico-Químico</label><br />
                                        <label><input type="checkbox" id="ckb-aerobios" onChange={changeAnalisisElemento} /> Aerobios</label><br />
                                        <label><input type="checkbox" id="ckb-legionela" onChange={changeAnalisisElemento} /> Legionela</label><br />
                                        <label><input type="checkbox" id="ckb-agua-potable" onChange={changeAnalisisElemento} /> Agua Potable</label><br />
                                        <label><input type="checkbox" id="ckb-aguas-residuales" onChange={changeAnalisisElemento} /> Aguas Residuales</label>
                                    </React.Fragment>
                                }

                            </div>
                        </div>
                        <button>Guardar</button>
                    </div>

                </div>
                <div className='col2'>

                    {/* ELEMENTOS DE PLANTA */}
                    <div className='elementos-planta'>
                        <h5>Elementos de planta</h5>
                        <hr />
                        <div className='elementos-planta-elements' id='elementos-planta'></div>
                    </div>

                </div>

            </div>

            <div className='row2'>
                <h5>Diagrama</h5>
                <hr />
                <div style={{ height: '22.5rem' }}>
                    <Diagram schema={schema} onChange={onChange} />
                </div>
            </div>
            <div className='botones'>
                <button><Link to='/plantasTabla'>Siguiente</Link></button>
            </div>
        </div>

    )
    
}

export default Plantas;