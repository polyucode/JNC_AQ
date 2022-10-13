import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import { TextField } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Card, Checkbox, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Switch, Tooltip, Snackbar, Slide, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityBorderIcon from '@mui/icons-material/Visibility';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import Swal from 'sweetalert2';
import SaveIcon from '@mui/icons-material/Save';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

//import 'beautiful-react-diagrams/styles.css';
//mport './Plantas.css';
import { MainLayout } from "../layout/MainLayout";
import { getClientes, getElementos, getOfertas, postConfPlantaCliente } from "../api/apiBackend";
import { CheckBox } from "@mui/icons-material";
import { NivelPlanta } from "../components/Plantas/NivelPlanta";
import { display } from "@mui/system";
import { CheckBoxAnalisis } from "../components/Plantas/CheckBoxAnalisis";

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

export const PlantasPage = () => {

    // Configuración planta del cliente
    const [confPlantaCliente, setConfPlantaCliente] = useState({
        id: 0,
        CodigoCliente: 0,
        nombreCliente: '',
        Oferta: 0,
        NumNiveles: 0,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });
    const [plantaCreada, setPlantaCreada] = useState(false);
    const [niveles, setNiveles] = useState([]);

    // Datos de los autocomplete
    const [clientes, setClientes] = useState([]);
    const [ofertas, setOfertas] = useState([]);

    // Listado de elementos
    const [elementosPlanta, setElementosPlanta] = useState([]);
    const [contadorElemento, setContadorElemento] = useState({});
    const [indiceElemento, setIndiceElemento] = useState(0);
    const [elementoSeleccionado, setElementoSeleccionado] = useState(0);

    const [snackData, setSnackData] = useState({ open: false, msg: 'Testing', severity: 'success' });

    const [confNivelesPlantaCliente, setConfNivelesPlantaCliente] = useState({
        id: 0,
        CodigoCliente: 0,
        Id_Planta: 0,
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
    /*
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

    const [checked, setChecked] = React.useState(true);

    //const [confPlantasCliente, setConfPlantasCliente] = useState([]);

    //const [confNivelesPlantaCliente, setConfNivelesPlantaCliente] = useState([]);

    const [clientesTable, setClientesTable] = useState({});

    const [nombreCliente, setNombreCliente] = useState([]);

    const [data, setData] = useState([]);

    const planta = {
        codigoCliente: 0,
        nombrePlanta: '',
        elementos: []
    }
    let listaElementos = planta.elementos;

    // Variables del analisis del elemento
    let elementoAnalisisId = 0;
    let elementoAnalisisProps = {
        fisicoQuimico: false,
        aerobios: false,
        legionela: false,
        aguaPotable: false,
        aguasResiduales: false,
        desinfecciones: false,
        osmosis: false,
        aguaPozo: false,
        acs: false,
        maquinaFrio: false,
        mediciones: false,
        controlGas: false,
        otros: false
    };

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
                aguasResiduales: false,
                desinfecciones: false,
                osmosis: false,
                aguaPozo: false,
                acs: false,
                maquinaFrio: false,
                mediciones: false,
                controlGas: false,
                otros: false
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


        //crearNodo(elementoNuevo)
    }

    function eliminarElemento(id) {

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
        // console.log('Crear elemento');
        // crearNodo(elementoNuevo);

    }

    function crearNiveles() {

        console.log('Niveles')

        // Obtenemos el valor de la cantidad de niveles a crear
        // let numNiveles = document.getElementById('numero-niveles').value;
        // let listadoNiveles = [];

        // if (numNiveles > 5) {
        //     alert('El número máximo de niveles que se pueden crear son 5');
        //     return;
        // }

        // Generamos en el DOM la interfaz de los niveles
        //for (let i = 0; i < numNiveles; i++) {

            // Creamos el listado de elementos disponibles
            // let listadoElementos = [
            //     React.createElement('option', { value: 'Osmosis' }, 'Osmosis'),
            //     React.createElement('option', { value: 'Depósito' }, 'Depósito'),
            //     React.createElement('option', { value: 'Refrigeración' }, 'Refrigeración'),
            //     React.createElement('option', { value: 'Torre' }, 'Torre'),
            //     React.createElement('option', { value: 'Caldera' }, 'Caldera')
            // ];

            // Creamos todos los componentes de la interfaz del nivel
            // let elementos = [
            //     React.createElement('h6', null, 'Nivel ' + (i + 1)),
            //     React.createElement('hr', null, null),
            //     React.createElement('select', { id: 'lista-nivel-' + (i + 1) }, listadoElementos),
            //     React.createElement('button', { onClick: () => crearElemento(i + 1) }, '+'),
            //     React.createElement('button', { onClick: () => eliminarElemento(i + 1) }, '-'),
            //     React.createElement('select', { className: 'lista-niveles', id: 'lista-elementos-nivel-' + (i + 1), size: 10 }, null),
            //     React.createElement('input', { type: 'checkbox' }, null),
            //     React.createElement('label', null, 'Ver inspector'),
            //     React.createElement('button', { onClick: () => eliminarNivel() }, 'Eliminar')
            // ]

            // Creamos el contenedor de planta principal para añadir todos los demás componentes
        //     let contenido = React.createElement('div', { className: 'planta' }, elementos);
        //     listadoNiveles.push(contenido);
        // }

        // Finalmente renderizamos
        //ReactDOM.render(listadoNiveles, document.getElementById('elementos-planta'));

    }

    function eliminarNivel() {
        let listaElementosNivel = []
        listaElementosNivel.pop(ReactDOM.render(listaElementosNivel, document.getElementById('elementos-planta')))
    }

    function selAnalisisElemento() {
        console.log(listaElementos[elementoAnalisisId])
        // Obtenemos el elemento mediante si posición
        elementoAnalisisId = document.getElementById('analisis-elemento-list').value;
        elementoAnalisisProps = listaElementos[elementoAnalisisId].propiedades;

        // Seteamos los checkboxs según los datos almacenados en el elemento
        document.getElementById('ckb-fisico-quimico').checked = elementoAnalisisProps.fisicoQuimico;
        document.getElementById('ckb-aerobios').checked = elementoAnalisisProps.aerobios;
        document.getElementById('ckb-legionela').checked = elementoAnalisisProps.legionela;
        document.getElementById('ckb-agua-potable').checked = elementoAnalisisProps.aguaPotable;
        document.getElementById('ckb-aguas-residuales').checked = elementoAnalisisProps.aguasResiduales;
        document.getElementById('ckb-desinfecciones').checked = elementoAnalisisProps.desinfecciones;
        document.getElementById('ckb-osmosis').checked = elementoAnalisisProps.osmosis;
        document.getElementById('ckb-agua-pozo').checked = elementoAnalisisProps.aguaPozo;
        document.getElementById('ckb-acs').checked = elementoAnalisisProps.acs;
        document.getElementById('ckb-maquina-frio').checked = elementoAnalisisProps.maquinaFrio;
        document.getElementById('ckb-mediciones').checked = elementoAnalisisProps.mediciones;
        document.getElementById('ckb-fuga-gas').checked = elementoAnalisisProps.controlGas;
        document.getElementById('ckb-otros').checked = elementoAnalisisProps.otros;
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
            case 'ckb-desinfecciones':
                elementoAnalisisProps.desinfecciones = e.target.checked;
                break;
            case 'ckb-osmosis':
                elementoAnalisisProps.osmosis = e.target.checked;
                break;
            case 'ckb-agua-pozo':
                elementoAnalisisProps.aguaPozo = e.target.checked;
                break;
            case 'ckb-acs':
                elementoAnalisisProps.acs = e.target.checked;
                break;
            case 'ckb-maquina-frio':
                elementoAnalisisProps.maquinaFrio = e.target.checked;
                break;
            case 'ckb-mediciones':
                elementoAnalisisProps.mediciones = e.target.checked;
                break;
            case 'ckb-fuga-gas':
                elementoAnalisisProps.controlGas = e.target.checked;
                break;
            case 'ckb-otros':
                elementoAnalisisProps.otros = e.target.checked;
                break;
        }

        // UNa vez actualizado, guardamos las propiedades en el elemento
        // por si el usuario cambia de elemento
        listaElementos[elementoAnalisisId].propiedades = elementoAnalisisProps;
    }

    

    const GetConfNivelesPlantaCliente = async () => {
        axios.get("/confnivelesplantascliente", token).then(response => {
            setConfNivelesPlantaCliente(response.data.data)
        })
    }


    // Obtenemos todos los datos necesarios de la base de datos
    useEffect(() => {
        //GetConfPlantasCliente();
        GetConfNivelesPlantaCliente();
        
        getClientes()
            .then( resp => { setClientes(resp) });

        getOfertas()
            .then( resp => { setOfertas(resp) });

        //getElementos()
        //    .then( resp => { setElementosPlanta(resp) });
        
            //peticionGet();
    }, []);

    // Setea el nombre del cliente cada vez que se selecciona un código de cliente
    useEffect(() => {

        if( confPlantaCliente.CodigoCliente != 0 ) {
            const clienteSeleccionado = clientes.filter( cliente => cliente.codigo === confPlantaCliente.CodigoCliente )[0];
            setConfPlantaCliente({
                ...confPlantaCliente,
                nombreCliente: clienteSeleccionado.razonSocial
            });
        }

    },[confPlantaCliente.CodigoCliente])

    const peticionPost = async () => {

        //crearNiveles();

        if ( confPlantaCliente.NumNiveles > 5 ) {

            Swal.fire({
                title: 'Error',
                text: 'El número máximo de niveles que se pueden crear son 5',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
            return;

        } else if (confPlantaCliente.CodigoCliente == null || confPlantaCliente.Oferta == null || confPlantaCliente.NumNiveles <= 0 || confPlantaCliente.NumNiveles == null) {
            
            Swal.fire({
                title: 'Error',
                text: 'Faltan introducir datos correctos para crear los niveles',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
            return;
        }
        else {

            setPlantaCreada(true);
            
            for( let i = 0; i < confPlantaCliente.NumNiveles; i++ ) {
                setNiveles( prevState => [ ...prevState, i + 1 ]);
            }
            
            // TODO: Obtener el nombre del cliente

            // Registramos todos los datos en la base de datos
            // const resp = await postConfPlantaCliente( confPlantaCliente );

            // TODO: Añadimos el ID de planta generado en el estado

        }
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
            contadorPort += 2;
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
            contadorPort += 2;
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
            contadorPort += 2;
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

        contadorNodo += 1;

        schema.nodes.forEach((node) => {
            console.log(node);
        })

        console.log(schema);
        addNode(nodo);



    }

    const guardarNiveles = async () => {
        await axios.post("/confnivelesplantascliente", confNivelesPlantaCliente, token)
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
    }


    const handleChange = (e) => {

        const { name, value } = e.target;
        // setConfPlantasCliente(prevState => ({
        //     ...prevState,
        //     //[name]: value
        //     [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        // }));
    }

    const handleConfPlantaClienteChange = ( event ) => {

        switch( event.target.tagName) {

            case 'LI':

                const name = event.target.id.split('-')[0];
                setConfPlantaCliente({
                    ...confPlantaCliente,
                    [name]: parseInt(event.target.textContent, 10)
                });

                break;

            case 'INPUT':

                setConfPlantaCliente({
                    ...confPlantaCliente,
                    [event.target.name]: parseInt(event.target.value, 10)
                });

                break;

            default:
                break;

        }

    }

    const handleAnalisis = ( event ) => {

        setElementoSeleccionado({
            ...elementoSeleccionado,
            analisis: {
                ...elementoSeleccionado.analisis,
                [event.target.name]: event.target.checked
            }
        });

    }

    const handleSeleccionarElemento = ( elemento ) => {
        setElementoSeleccionado( elemento );
    }

    const handleGuardarAnalisisElemento = () => {

        const elementosActualizados = elementosPlanta.map( elemento => {

            if( elemento.id === elementoSeleccionado.id ) {
                return { ...elemento, analisis: { ...elementoSeleccionado.analisis } }
            } else {
                return elemento
            }

        });

        setElementosPlanta(elementosActualizados);
        setSnackData({ open: true, msg: 'Analisis del elemento guardado correctamente', severity: 'success' });
    
    }

    const handleSnackClose = (event, reason) => {

        if (reason === 'clickaway') {
          return;
        }
    
        setSnackData({ open: false, msg: '', severity: 'info' });
    
      };


    return (
        <MainLayout title="Plantas">

            <Grid container spacing={2}>

                {/* APARTADO DE DATOS DE PLANTA */}
                <Grid item xs={12}>
                    <Card sx={{ p: 2, display: 'flex' }}>
                        <Grid container spacing={ 2 } sx={{ alignItems: 'center' }}>

                            {/* Código de Cliente */}
                            <Grid item xs={ 4 }>
                                <Autocomplete
                                    disabled={ plantaCreada }
                                    disableClearable={ true }
                                    id="CodigoCliente"
                                    options={ clientes }
                                    getOptionLabel={ option => option.codigo.toString() }
                                    renderInput={ params => <TextField {...params} variant="outlined" type="number" label="Código de Cliente" name="CodigoCliente" /> }
                                    onChange={ handleConfPlantaClienteChange }
                                />
                            </Grid>

                            {/* Número de Oferta */}
                            <Grid item xs={ 4 }>
                                <Autocomplete
                                    disabled={ plantaCreada }
                                    disableClearable={ true }
                                    id="Oferta"
                                    options={ ofertas }
                                    getOptionLabel={ option => option.numeroOferta.toString() }
                                    renderInput={ params => <TextField {...params} variant="outlined" type="number" label="Número de Oferta" name="Oferta" />}
                                    onChange={ handleConfPlantaClienteChange }
                                />
                            </Grid>

                            {/* Número de niveles */}
                            <Grid item xs={ 2 }>
                                <TextField disabled={ plantaCreada } sx={{ width: '100%' }} variant="outlined" label="Nº de niveles" name="NumNiveles" onChange={ handleConfPlantaClienteChange } />
                            </Grid>

                            {/* Botón para crear */}
                            <Grid item xs={ 2 }>
                                <Button disabled={ plantaCreada } sx={{ width: '100%' }} color='success' variant='contained' startIcon={<AddIcon />} onClick={ peticionPost }>
                                    Crear
                                </Button>
                            </Grid>

                        </Grid>
                    </Card>
                </Grid>

                {/* APARTADO DE NIVELES */}
                <Grid item xs={ 12 }>
                    <Grid container spacing={ 2 }>
                        {
                            niveles.map( nivel => (
                                <NivelPlanta
                                    key={ nivel }
                                    nivel={ nivel }
                                    contadorElemento={ contadorElemento }
                                    setContadorElemento={ setContadorElemento }
                                    elementosPlanta={ elementosPlanta }
                                    setElementosPlanta={ setElementosPlanta }
                                    indiceElemento={ indiceElemento }
                                    setIndiceElemento={ setIndiceElemento }
                                /> 
                            ))
                        }
                    </Grid>
                </Grid>

                {/* APARTADO DE LISTADO DE ELEMENTOS */}
                <Grid item xs={ 4 }>
                    <Card sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                        <Typography variant="h6" sx={{ width: '100%' }}>Listado de elementos</Typography>
                        {
                            ( elementosPlanta.length > 0 )
                            ? (
                                <List>
                                    {
                                        elementosPlanta.map( elemento => (
                                            <ListItemButton
                                                key={ elemento.id }
                                                selected={ elementoSeleccionado.id === elemento.id }
                                                onClick={ () => handleSeleccionarElemento( elemento ) }
                                            >
                                                <ListItemText primary={ elemento.nombre+' '+elemento.numero } />
                                            </ListItemButton>
                                        ))
                                    }
                                </List>
                            ) : (
                                <Typography>Ningún elemento añadido</Typography>
                            )
                        }
                        
                    </Card>
                </Grid>

                {/* APARTADO DE ANALISIS POR ELEMENTO */}
                <Grid item xs={ 8 }>
                    <Card sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                        <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>

                            <Grid item>
                                <Typography variant="h6" sx={{ width: '100%' }}>Analisis por elemento</Typography>
                            </Grid>

                            <Grid item>
                                <Tooltip title="Guardar analisis del elemento seleccionado" placement="left">
                                    <IconButton color="primary" component="label" onClick={ handleGuardarAnalisisElemento }>
                                        <SaveIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>

                        </Grid>

                        {/* Mensaje de feedback al guardar tipos de analisis del elemento */}
                        <Grid container>
                            <Grid item xs={ 12 }>
                                <Alert className="animate__animated animate__flipInX" onClose={handleSnackClose} severity={snackData.severity} sx={{
                                    width: '100%',
                                    display: snackData.open ? 'flex' : 'none'
                                }}>
                                    {snackData.msg}
                                </Alert>
                            </Grid>
                        </Grid>
                        
                        {/* Listado de checkboxs para marcar los analisis */}
                        <Grid container spacing={ 2 }>
                            <Grid item xs={ 6 }>
                                <FormGroup>
                                    <CheckBoxAnalisis label="Físico-Químico" name="fisicoQuimico" onChange={ handleAnalisis } elementoSeleccionado={ elementoSeleccionado } elementosPlanta={ elementosPlanta } />
                                    <CheckBoxAnalisis label="Aerobios" name="aerobios" onChange={ handleAnalisis } elementoSeleccionado={ elementoSeleccionado } elementosPlanta={ elementosPlanta } />
                                    <CheckBoxAnalisis label="Legionela" name="legionela" onChange={ handleAnalisis } elementoSeleccionado={ elementoSeleccionado } elementosPlanta={ elementosPlanta } />
                                    <CheckBoxAnalisis label="Agua Potable" name="aguaPotable" onChange={ handleAnalisis } elementoSeleccionado={ elementoSeleccionado } elementosPlanta={ elementosPlanta } />
                                    <CheckBoxAnalisis label="Aguas Residuales" name="aguasResiduales" onChange={ handleAnalisis } elementoSeleccionado={ elementoSeleccionado } elementosPlanta={ elementosPlanta } />
                                    <CheckBoxAnalisis label="Desinfecciones" name="desinfecciones" onChange={ handleAnalisis } elementoSeleccionado={ elementoSeleccionado } elementosPlanta={ elementosPlanta } />
                                    <CheckBoxAnalisis label="Osmosis" name="osmosis" onChange={ handleAnalisis } elementoSeleccionado={ elementoSeleccionado } elementosPlanta={ elementosPlanta } />
                                </FormGroup>
                            </Grid>

                            <Grid item xs={ 6 }>
                                <FormGroup>
                                    <CheckBoxAnalisis label="Agua Pozo" name="aguaPozo" onChange={ handleAnalisis } elementoSeleccionado={ elementoSeleccionado } elementosPlanta={ elementosPlanta } />
                                    <CheckBoxAnalisis label="ACS" name="acs" onChange={ handleAnalisis } elementoSeleccionado={ elementoSeleccionado } elementosPlanta={ elementosPlanta } />
                                    <CheckBoxAnalisis label="Mantenimiento Maq Frio" name="mantenimientoMaqFrio" onChange={ handleAnalisis } elementoSeleccionado={ elementoSeleccionado } elementosPlanta={ elementosPlanta } />
                                    <CheckBoxAnalisis label="Mediciones" name="mediciones" onChange={ handleAnalisis } elementoSeleccionado={ elementoSeleccionado } elementosPlanta={ elementosPlanta } />
                                    <CheckBoxAnalisis label="Control fuga de gas" name="controlFugaGas" onChange={ handleAnalisis } elementoSeleccionado={ elementoSeleccionado } elementosPlanta={ elementosPlanta } />
                                    <CheckBoxAnalisis label="Otros" name="otros" onChange={ handleAnalisis } elementoSeleccionado={ elementoSeleccionado } elementosPlanta={ elementosPlanta } />
                                </FormGroup>
                            </Grid>
                        </Grid>

                    </Card>
                </Grid>

                {/* BOTONES DE ACCIONES */}
                <Grid item xs={ 12 }>
                    <Card sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>

                        <Button disabled color='success' variant='contained' startIcon={ <SaveIcon /> } onClick={ peticionPost }>
                            Guardar datos
                        </Button>

                        <Button sx={{ ml: 2 }} color='primary' variant='contained' startIcon={ <AccountTreeIcon /> } onClick={ () => {} }>
                            Generar diagrama
                        </Button>

                    </Card>
                </Grid>

                {/* APARTADO DE DIAGRAMA */}
                <Grid item xs={ 12 }>
                    <Card sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                        <Typography variant="h6">Diagrama (Pendiente de colocar)</Typography>
                        <pre>
                            <code>
                                {
                                    JSON.stringify( elementosPlanta, null, 3 )
                                }
                            </code>
                        </pre>
                    </Card>
                </Grid>

            </Grid>

        </MainLayout>
    )

}