import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { Card, Divider, Grid, IconButton, List, ListItem, ListItemText, Tooltip, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import { useEffect } from 'react';
import { deleteAnalisisNivelesPlantasCliente, deleteConfNivelesPlantasCliente, deleteElementosPlanta, getAnalisisNivelesPlantasCliente, getConfNivelesPlantasCliente, getElementosPlanta, getListaElementos, putElementosPlanta } from '../../api';
import { useUsuarioActual } from '../../hooks/useUsuarioActual';
import { ModalLayout2 } from '../ModalLayout2';
import { insertarBotonesModal } from '../../helpers/insertarBotonesModal';
import Swal from 'sweetalert2';

export const NivelPlanta = ({
    nivel,
    contadorElemento,
    setContadorElemento,
    elementosPlanta,
    setElementosPlanta,
    indiceElemento,
    setIndiceElemento,
    elementos,
    confNivelesPlantaCliente,
    datosGuardados,
    plantaCreada
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


    const { usuarioActual } = useUsuarioActual();

    useEffect(() => {
        setElementosNivel(elementosPlanta.filter(elemento => elemento.nivel === parseInt(nivel)));
    }, [elementosPlanta]);

    const handleEditClick = (elementId, elementName, elementNumero, elementDescription, elementNivel) => {
        setOpenModal(true);

        setElementName(elementName);
        setElementNumero(elementNumero);
        setElementDescription(elementDescription);

        setElementoSeleccionado(prevState => ({
            ...prevState,
            id: elementId,
            nombre: elementName,
            numero: elementNumero,
            descripcion: elementDescription,
            nivel: elementNivel
        }))

    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSelectElemento = (e, newValue) => {

        // Preparamos el elemento a crear
        const texto = e.target.textContent;

        // Si el campo está en blanco, no seguimos
        if (texto == '') return;

        let elemento = {
            id: indiceElemento,
            nombre: texto,
            numero: 0,
            nivel: parseInt(nivel, 10),
            descripcion: null
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
        setElementosPlanta([...elementosPlanta, elemento]);
        setIndiceElemento(indiceElemento - 1);
        setSelectedElemento(null);
        setKey(key + 1);

    }

    const handleDeleteElemento = async (id, elemento) => {

        if (id > 0) {

            const respAnalisis = await getAnalisisNivelesPlantasCliente();

            const respNiveles = await getConfNivelesPlantasCliente();

            const respElementos = await getElementosPlanta();

            const elementoNivelBorrado = respNiveles.filter(nivel => nivel.id_Elemento == id)

            const analisisElementoBorrado = respAnalisis.filter(analisi => analisi.id_NivelesPlanta == elementoNivelBorrado[0].id)

            const elementoBorrado = respElementos.filter(elem => elem.id == id)

            if (elementoNivelBorrado) {
                await deleteConfNivelesPlantasCliente(elementoNivelBorrado[0].id)
            }

            if (elementoBorrado) {
                await deleteElementosPlanta(elementoBorrado[0].id)
            }

            if (analisisElementoBorrado) {
                analisisElementoBorrado.map(async (anal) => {
                    await deleteAnalisisNivelesPlantasCliente(anal.id)
                })
            }
        }

        if (contadorElemento[elemento.nombre]) {
            normalizarContador(elemento.nombre, elemento.numero)
        }
        setElementosPlanta(elementosPlanta.filter(elemento => elemento.id != id));
    }

    const normalizarContador = (nombre, numero) => {
        if (contadorElemento[nombre] === numero) {
            setContadorElemento({
                ...contadorElemento,
                [nombre]: contadorElemento[nombre] - 1
            });
            // elemento.numero = contadorElemento[nombre] - 1;
        }
    }

    const handleChange = (event) => {

        setElementDescription(event.target.value)

        setElementoSeleccionado(prevState => ({
            ...prevState,
            descripcion: event.target.value
        }))
    }

    const peticionPutElemento = async () => {

        const resp = await putElementosPlanta(elementoSeleccionado);

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

        handleCloseModal()
        setElementoSeleccionado({
            id: 0,
            nombre: '',
            numero: 0,
            descripcion: '',
            nivel: 0,
            addDate: null,
            addIdUser: null,
            modDate: null,
            modIdUser: null,
            delDate: null,
            delIdUser: null,
            deleted: null
        })

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

    return (
        <>
            <Grid item xs={4}>
                <Card sx={{ p: 2, display: 'flex' }}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Typography variant="h6">Nivel {nivel}</Typography>
                        </Grid>

                        {
                            usuarioActual.idPerfil === 1004 ?
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
                            usuarioActual.idPerfil === 1004 ?
                                <Grid item xs={12}>
                                    <List>
                                        {
                                            (elementosNivel.length > 0)
                                                ? elementosNivel.map((elemento, index) => (
                                                    <div key={elemento.id}>
                                                        <ListItem
                                                            sx={{ backgroundColor: 'none' }}

                                                        >
                                                            <ListItemText
                                                                primary={`${elemento.nombre} ${elemento.numero}`}
                                                            />
                                                        </ListItem>

                                                        {(index + 1 != elementosNivel.length) && <Divider />}
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
                                                ? elementosNivel.map((elemento, index) => (
                                                    <div key={elemento.id}>
                                                        <ListItem
                                                            sx={{ backgroundColor: 'none' }}
                                                            secondaryAction={
                                                                elemento.id > 0 ?
                                                                    <React.Fragment>
                                                                        <Tooltip title="Editar elemento">
                                                                            <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(elemento.id, elemento.nombre, elemento.numero, elemento.descripcion, elemento.nivel)}>
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
                                                                primary={elemento.descripcion !== null ? `${elemento.nombre} ${elemento.descripcion}` : `${elemento.nombre} ${elemento.numero}`}
                                                            />
                                                        </ListItem>

                                                        {(index + 1 != elementosNivel.length) && <Divider />}
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
                        <Grid container sx={{ textAlign: 'center', pb: 2 }}>
                            <Grid item xs={3}>
                                <Typography style={{ marginTop: '10px' }} id="modal-title" variant="h6">
                                    {elementName}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    name="nombre"
                                    value={elementDescription !== null ? elementDescription : elementNumero}
                                    onChange={handleChange}
                                />

                            </Grid>
                        </Grid>

                    </Grid>
                }
                botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                    peticionPutElemento();
                })
                ]}
                open={openModal}
                onClose={handleCloseModal}
            />
        </>
    )
}