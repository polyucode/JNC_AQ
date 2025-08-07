/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { Card, Divider, Grid, IconButton, List, ListItem, ListItemText, Tooltip, TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react';
import { deleteElementosPlanta, EliminarIconoElementoPlanta, getElementosPlanta, putConfPlantaCliente, putElementosPlanta, SubirIconoElementoPlanta } from '../../api';
import { ModalLayout2 } from '../ModalLayout2';
import { insertarBotonesModal } from '../../helpers/insertarBotonesModal';
import Swal from 'sweetalert2';
import { preguntarParaEliminar } from '../../helpers/swalHelper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { renombrarCarpeta } from '../../api/carpetas';
import { AuthContext } from '../../context/AuthContext';
import './NivelPlanta.css'

export const NivelPlanta = ({
    nivel,
    contadorElemento,
    setContadorElemento,
    elementosPlanta,
    setElementosPlanta,
    indiceElemento,
    setIndiceElemento,
    elementos,
    confPlantaCliente,
    setLados2,
    setNodos2
}) => {

    //const [elementos, setElementos] = useState([]);
    const [elementosNivel, setElementosNivel] = useState([]);

    const [selectedElemento, setSelectedElemento] = useState(null);
    const [key, setKey] = useState(0);

    const [openModal, setOpenModal] = useState(false);
    const [elementoSeleccionado, setElementoSeleccionado] = useState({
        id: 0,
        nombre: '',
        numero: 0,
        descripcion: '',
        nivel: 0,
        nombreIcono: '',
        verInsp: false,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null
    })
    const [elementName, setElementName] = useState('');
    const [elementNumero, setElementNumero] = useState(0);
    const [elementDescription, setElementDescription] = useState('');

    const { user } = useContext(AuthContext);


    const [iconoElemento, setIconoElemento] = useState({});
    const [iconoElementoNuevo, setIconoElementoNuevo] = useState({});

    const handleFileChange = (e) => {
        if (e.target.files) {
            setIconoElemento(e.target.files[0]);
            setElementoSeleccionado(prevState => ({
                ...prevState,
                nombreIcono: e.target.files[0].name
            }))
        }
    };

    useEffect(() => {
        setElementosNivel(elementosPlanta.filter(elemento => elemento.nivel === parseInt(nivel) && !elemento.deleted));
    }, [elementosPlanta]);

    const handleEditClick = (elementId, elementName, elementNumero, elementDescription, elementNivel, elementIcono) => {
        setOpenModal(true);
        setElementName(elementName);
        setElementNumero(elementNumero);
        setElementDescription(elementDescription);

        setElementoSeleccionado(prevState => ({
            ...prevState,
            id: elementId,
            nombre: elementName,
            numero: elementNumero,
            nombreIcono: elementIcono,
            descripcion: elementDescription,
            nivel: elementNivel
        }))
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSelectElemento = (e) => {
        // Preparamos el elemento a crear
        const texto = e.target.textContent;

        // Si el campo está en blanco, no seguimos
        if (texto === '') return;
        let nombreIconoAux = elementos.filter(elemento => elemento.nombre === texto)[0];
        let elemento = {
            id: indiceElemento,
            nombre: texto,
            numero: 0,
            nivel: parseInt(nivel, 10),
            descripcion: null,
            verInsp: true,
            nombreIcono: nombreIconoAux === undefined ? null : nombreIconoAux.nombreIcono
        }

        // Calculamos el número del elemento
        if (contadorElemento[texto]) {

            setContadorElemento({
                ...contadorElemento,
                [texto]: contadorElemento[texto] + 1
            });
            elemento.numero = contadorElemento[texto] + 1;

        } else {

            setContadorElemento({
                ...contadorElemento,
                [texto]: 1
            });
            elemento.numero = 1;
        }

        // Añadimos el elemento al listado
        // Actualizamos el estado de elementosPlanta manteniendo los elementos anteriores
        setElementosPlanta(prevElementos => [...prevElementos, elemento]);

        // Actualizamos el estado de elementosNivel manteniendo los elementos anteriores
        setElementosNivel(prevElementosNivel => [...prevElementosNivel, elemento]);
        setIndiceElemento(indiceElemento - 1);
        setSelectedElemento(null);
        setKey(key + 1);

    }

    const handleDeleteElemento = async (id, elemento) => {

        if (id > 0) {
            let confirma = await preguntarParaEliminar();
            if (confirma === false) {
                return;
            }

            const respElementos = await getElementosPlanta();

            const elementoBorrado = respElementos.filter(elem => elem.id === id)

            if (elementoBorrado) {
                await deleteElementosPlanta(elementoBorrado[0].id)
            }
        }

        if (contadorElemento[elemento.nombre]) {
            normalizarContador(elemento.nombre, elemento.numero)
        }
        setElementosPlanta(elementosPlanta.filter(elemento => elemento.id !== id));

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Elemento Eliminado',
            text: `El elemento se ha eliminado correctamente`,
            showConfirmButton: false,
            timer: 2000,
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },
            hideClass: {
                popup: 'animate__animated animate__bounceOut'
            }
        });
    }
    const handleSelectCheckBox = (event, id) => {
        setElementosNivel(prevElementos => prevElementos.map(elemento =>
            elemento.id === id ? { ...elemento, verInsp: event.target.checked } : elemento
        ));

        setElementosPlanta(prevElementos => prevElementos.map(elemento =>
            elemento.id === id ? { ...elemento, verInsp: event.target.checked } : elemento
        ));
    };

    const normalizarContador = (nombre, numero) => {
        if (contadorElemento[nombre] === numero) {
            setContadorElemento({
                ...contadorElemento,
                [nombre]: contadorElemento[nombre] - 1
            });
        }
    }

    const handleChange = (event) => {
        setElementDescription(event.target.value)

        setElementoSeleccionado(prevState => ({
            ...prevState,
            descripcion: event.target.value
        }))
    }

    function quitarAcentos(cadena) {
        return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const peticionPutElemento = async () => {

        const elementoAntiguo = elementosPlanta.filter(elem => elem.id === elementoSeleccionado.id)

        if (iconoElemento.length > 0) {
            const icono = await SubirIconoElementoPlanta(elementoSeleccionado.id, iconoElemento);
            elementoSeleccionado.nombreIcono = icono;
        }

        const diagramaParseado = JSON.parse(confPlantaCliente.Diagrama)
        diagramaParseado.nodos.map(async (param) => {

            if (param.type === 'nodoElemento') {
                if (param.data.id === elementoSeleccionado.id) {
                    let descAux = elementoSeleccionado.descripcion === null ? elementoSeleccionado.numero : elementoSeleccionado.descripcion;
                    param.data.label = elementoSeleccionado.nombre + " " + descAux
                }
            }
        })

        var stringed = JSON.stringify(diagramaParseado)

        confPlantaCliente.NumNiveles = parseInt(confPlantaCliente.NumNiveles, 10);
        confPlantaCliente.Diagrama = stringed;


        if (elementoAntiguo[0].descripcion !== null) {
            const rutaCarpeta = `C:\\Users\\chris\\Desktop\\Proyecto Yucode\\JNegra3\\BackEnd\\AnalisisQuimicos.Api\\Pdf\\${confPlantaCliente.NombreCliente.replace(/[.,]/g, " ").trim()}\\${confPlantaCliente.Oferta}\\Planta_${confPlantaCliente.NombreCliente.replace(/[.,]/g, " ").trim()}\\${quitarAcentos(elementoAntiguo[0].nombre.replace(" ", "_")) + "_" + elementoAntiguo[0].descripcion}`;
            //const rutaCarpeta = `C:\\inetpub\\wwwroot\\YC\\Pdf\\${confPlantaCliente.NombreCliente.replace(/[.,]/g, "").trim()}\\${confPlantaCliente.Oferta}\\Planta_${confPlantaCliente.NombreCliente.replace(/[.,]/g, "").trim()}\\${quitarAcentos(elementoAntiguo[0].nombre.replace(" ", "_")) + "_" + elementoAntiguo[0].descripcion}`;
            await renombrarCarpeta(rutaCarpeta, quitarAcentos(elementoAntiguo[0].nombre.replace(" ", "_")) + "_" + elementoAntiguo[0].descripcion, quitarAcentos(elementoSeleccionado.nombre.replace(" ", "_")) + "_" + quitarAcentos(elementoSeleccionado.descripcion))
        } else {
            const rutaCarpeta = `C:\\Users\\chris\\Desktop\\Proyecto Yucode\\JNegra3\\BackEnd\\AnalisisQuimicos.Api\\Pdf\\${confPlantaCliente.NombreCliente.replace(/[.,]/g, " ").trim()}\\${confPlantaCliente.Oferta}\\Planta_${confPlantaCliente.NombreCliente.replace(/[.,]/g, " ").trim()}\\${quitarAcentos(elementoAntiguo[0].nombre.replace(" ", "_")) + "_" + elementoAntiguo[0].numero}`;
            //const rutaCarpeta = `C:\\inetpub\\wwwroot\\YC\\Pdf\\${confPlantaCliente.NombreCliente.replace(/[.,]/g, "").trim()}\\${confPlantaCliente.Oferta}\\Planta_${confPlantaCliente.NombreCliente.replace(/[.,]/g, "").trim()}\\${quitarAcentos(elementoAntiguo[0].nombre.replace(" ", "_")) + "_" + elementoAntiguo[0].numero}`;
            await renombrarCarpeta(rutaCarpeta, quitarAcentos(elementoAntiguo[0].nombre.replace(" ", "_")) + "_" + elementoAntiguo[0].numero, quitarAcentos(elementoSeleccionado.nombre.replace(" ", "_")) + "_" + quitarAcentos(elementoSeleccionado.descripcion))
        }
        await putConfPlantaCliente(confPlantaCliente)

        const datosDiagrama = JSON.parse(confPlantaCliente.Diagrama);
        setNodos2(datosDiagrama.nodos)
        setLados2(datosDiagrama.lados)
        var elementoModificado = elementosPlanta;
        elementoModificado.map(elemento => {
            if (elemento.id === elementoSeleccionado.id) {
                elemento = elementoSeleccionado
            }
        });

        const elementosActualizados = elementosPlanta.map(elemento => {
            if (elemento.id === elementoSeleccionado.id) {
                return elementoSeleccionado;
            } else {
                return elemento;
            }
        });

        setElementosPlanta(elementosActualizados);

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Elemento Modificado',
            text: `El elemento se ha modificado correctamente`,
            showConfirmButton: false,
            timer: 2000,
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },
            hideClass: {
                popup: 'animate__animated animate__bounceOut'
            }
        });

    }

    const activarInputFile = () => {
        let input = document.getElementById("seleccionar-icono-input")
        input.click();
    }

    const eliminarIconoElemento = async () => {
        let confirma = await preguntarParaEliminar();
        if (confirma === false) {
            return;
        }

        setElementoSeleccionado(prevState => ({
            ...prevState,
            nombreIcono: ''
        }))
        // EliminarIconoElementoPlanta(idElemento);
    }

    return (
        <>
            <Grid item xs={4}>
                <Card sx={{ p: 2, display: 'flex' }}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Typography variant="h6">Nivel {nivel}</Typography>
                        </Grid>

                        {
                            user.idPerfil === 1004 ?
                                <Grid item xs={12}>
                                    <Autocomplete
                                        id="elemento"
                                        options={elementos}
                                        disabled
                                        getOptionLabel={option => option.nombre}
                                        renderInput={params => <TextField {...params} variant="outlined" label="Elemento" name="elemento" />}
                                        onChange={handleSelectElemento}
                                    />
                                </Grid>
                                :
                                <Grid item xs={12}>
                                    <Autocomplete
                                        key={key}
                                        id="elemento"
                                        options={elementos}
                                        getOptionLabel={option => option.nombre}
                                        renderInput={params => <TextField {...params} variant="outlined" label="Elemento" name="elemento" />}
                                        onChange={handleSelectElemento}
                                        value={selectedElemento}
                                    />
                                </Grid>
                        }

                        {
                            user.idPerfil === 1004 ?
                                <Grid item xs={12}>
                                    <List>
                                        {
                                            (elementosNivel.length > 0)
                                                ? elementosNivel.sort((a, b) => {
                                                    // Comparar primero por nombre (orden alfabético)
                                                    if (a.nombre < b.nombre) return -1;
                                                    if (a.nombre > b.nombre) return 1;

                                                    // Si los nombres son iguales, comparar por descripción (si no es null)
                                                    if (a.descripcion && b.descripcion) {
                                                        if (a.descripcion < b.descripcion) return -1;
                                                        if (a.descripcion > b.descripcion) return 1;
                                                    }
                                                    // Si solo uno tiene descripción, el que la tenga va primero
                                                    else if (a.descripcion && !b.descripcion) {
                                                        return -1;
                                                    }
                                                    else if (!a.descripcion && b.descripcion) {
                                                        return 1;
                                                    }

                                                    // Si los nombres son iguales y las descripciones son iguales o no existen, comparar por número
                                                    return a.numero - b.numero;
                                                }).map((elemento, index) => (
                                                    <div key={elemento.id}>
                                                        <ListItem
                                                            sx={{ backgroundColor: 'none' }}

                                                        >
                                                            <ListItemText
                                                                primary={
                                                                    <Grid container alignItems="center">
                                                                        <Grid item xs={4}>
                                                                            <Typography variant="subtitle1">
                                                                                {elemento.descripcion !== null ? `${elemento.nombre} ${elemento.descripcion}` : `${elemento.nombre} ${elemento.numero}`}
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={8} style={{ textAlign: 'center', marginBottom: '15px' }}>
                                                                            <Typography variant="subtitle2">
                                                                                Ver Insp.
                                                                            </Typography>
                                                                            <FormControlLabel disabled control={<Checkbox />} checked={elemento.verInsp} name='verInsp' onChange={(event) => handleSelectCheckBox(event, elemento.id)} />
                                                                        </Grid>
                                                                    </Grid>
                                                                }
                                                            />
                                                        </ListItem>

                                                        {(index + 1 !== elementosNivel.length) && <Divider />}
                                                    </div>
                                                ))
                                                : (
                                                    <Typography>Ningún elemento añadido</Typography>
                                                )
                                        }

                                    </List>
                                </Grid>
                                :
                                <Grid item xs={12}>
                                    <List>

                                        {
                                            (elementosNivel.length > 0)
                                                ? elementosNivel.sort((a, b) => {
                                                    // Comparar primero por nombre (orden alfabético)
                                                    if (a.nombre < b.nombre) return -1;
                                                    if (a.nombre > b.nombre) return 1;

                                                    // Si los nombres son iguales, comparar por descripción (si no es null)
                                                    if (a.descripcion && b.descripcion) {
                                                        if (a.descripcion < b.descripcion) return -1;
                                                        if (a.descripcion > b.descripcion) return 1;
                                                    }
                                                    // Si solo uno tiene descripción, el que la tenga va primero
                                                    else if (a.descripcion && !b.descripcion) {
                                                        return -1;
                                                    }
                                                    else if (!a.descripcion && b.descripcion) {
                                                        return 1;
                                                    }

                                                    // Si los nombres son iguales y las descripciones son iguales o no existen, comparar por número
                                                    return a.numero - b.numero;
                                                }).map((elemento, index) => (
                                                    <div key={elemento.id}>
                                                        <ListItem
                                                            sx={{ backgroundColor: 'none' }}
                                                            secondaryAction={
                                                                elemento.id > 0 ?
                                                                    <React.Fragment>
                                                                        <Tooltip title="Editar elemento">
                                                                            <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(elemento.id, elemento.nombre, elemento.numero, elemento.descripcion, elemento.nivel, elemento.nombreIcono)}>
                                                                                <EditIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                        <Tooltip title="Eliminar elemento">
                                                                            <IconButton color="error" edge="end" aria-label="delete" onClick={() => handleDeleteElemento(elemento.id, elemento)}>
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </React.Fragment>
                                                                    :
                                                                    <Tooltip title="Eliminar elemento">
                                                                        <IconButton color="error" edge="end" aria-label="delete" onClick={() => handleDeleteElemento(elemento.id, elemento)}>
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                            }
                                                        >
                                                            <ListItemText
                                                                primary={
                                                                    <Grid container alignItems="center">
                                                                        <Grid item xs={4}>
                                                                            <Typography variant="subtitle1">
                                                                                {elemento.descripcion !== null ? `${elemento.nombre} ${elemento.descripcion}` : `${elemento.nombre} ${elemento.numero}`}
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={8} style={{ textAlign: 'center', marginBottom: '15px' }}>
                                                                            <Typography variant="subtitle2">
                                                                                Ver Insp.
                                                                            </Typography>
                                                                            <FormControlLabel control={<Checkbox />} checked={elemento.verInsp} name='verInsp' onChange={(event) => handleSelectCheckBox(event, elemento.id)} />
                                                                        </Grid>
                                                                    </Grid>
                                                                }
                                                            />
                                                        </ListItem>

                                                        {(index + 1 !== elementosNivel.length) && <Divider />}
                                                    </div>
                                                ))
                                                : (
                                                    <Typography>Ningún elemento añadido</Typography>
                                                )
                                        }

                                    </List>
                                </Grid>
                        }

                    </Grid>
                </Card>
            </Grid>

            <ModalLayout2
                titulo={elementDescription !== null ? `Renombrar elemento de planta ${elementName + ' ' + elementDescription}` : `Renombrar elemento de planta ${elementName + ' ' + elementNumero}`}
                contenido={
                    <Grid item xs={12}>
                        <Grid container sx={{ textAlign: 'center', pb: 2, display: 'flex', flexDirection: 'row' }}>
                            <Grid item xs={3} md={2}>
                                <Typography style={{ marginTop: '10px' }} id="modal-title" variant="h6">
                                    {elementName}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    name="nombre"
                                    value={elementDescription !== null ? elementDescription : elementNumero}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid md={6} sx={{ alignItems: 'center' }}>
                                {
                                    elementoSeleccionado.nombreIcono !== "" && elementoSeleccionado.nombreIcono !== null && elementoSeleccionado.nombreIcono !== undefined ?
                                        (
                                            <Grid sx={{ display: 'flex', flexDirection: 'row' }} md={12}>
                                                <Typography sx={{ marginLeft: '4px' }}>Icono actual:<p>{elementoSeleccionado.nombreIcono}</p></Typography>
                                                {/* <label for="modificar-icono-input" className="custom-file-upload">Modificar icono</label> */}
                                                <Button sx={{ marginLeft: '4px' }}
                                                    color='primary'
                                                    variant='contained'
                                                    onClick={() => activarInputFile()}
                                                >
                                                    Modificar
                                                </Button>
                                                <Button sx={{ marginLeft: '4px' }}
                                                    color='error'
                                                    variant='contained'
                                                    onClick={() => eliminarIconoElemento(elementoSeleccionado.id)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </Grid>
                                        )
                                        :
                                        (
                                            <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} md={12}>
                                                <Typography sx={{ marginLeft: '4px', alignItems: 'center' }}>Seleccionar icono:<p>{elementoSeleccionado.nombreIcono}</p></Typography>
                                                {/* <label for="modificar-icono-input" className="custom-file-upload">Modificar icono</label> */}
                                                <Button sx={{ marginLeft: '4px' }}
                                                    color='primary'
                                                    variant='contained'
                                                    onClick={() => activarInputFile()}
                                                >
                                                    Seleccionar
                                                </Button>
                                            </Grid>
                                        )
                                }
                                <input id="seleccionar-icono-input" type="file" accept="image/png, image/gif, image/jpeg" style={{ marginTop: '10px', marginLeft: '4px' }} onChange={handleFileChange} />
                            </Grid>
                        </Grid>
                    </Grid>
                }
                botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                    if (elementoSeleccionado.nombreIcono === "" || elementoSeleccionado.nombreIcono === null) {
                        EliminarIconoElementoPlanta(elementoSeleccionado.id)
                    }
                    peticionPutElemento();
                    setIconoElemento({});
                })
                ]}
                open={openModal}
                onClose={handleCloseModal}
            />
        </>
    )
}