import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { Card, Divider, Grid, IconButton, List, ListItem, ListItemText, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import { useEffect } from 'react';
import { deleteAnalisisNivelesPlantasCliente, deleteConfNivelesPlantasCliente, deleteElementosPlanta, getAnalisisNivelesPlantasCliente, getConfNivelesPlantasCliente, getElementosPlanta, getListaElementos } from '../../api';
import { useUsuarioActual } from '../../hooks/useUsuarioActual';

export const NivelPlanta = ({
    nivel,
    contadorElemento,
    setContadorElemento,
    elementosPlanta,
    setElementosPlanta,
    indiceElemento,
    setIndiceElemento,
    confNivelesPlantaCliente
}) => {

    const [elementos, setElementos] = useState([]);
    const [elementosNivel, setElementosNivel] = useState([]);

    const { usuarioActual } = useUsuarioActual();

    useEffect(() => {

        getListaElementos()
            .then(resp => setElementos(resp));

    }, []);

    useEffect(() => {
        setElementosNivel(elementosPlanta.filter(elemento => elemento.nivel === parseInt(nivel)));
    }, [elementosPlanta]);

    const handleSelectElemento = (e) => {

        // Preparamos el elemento a crear
        const texto = e.target.textContent;

        // Si el campo está en blanco, no seguimos
        if (texto == '') return;

        let elemento = {
            id: indiceElemento,
            nombre: texto,
            numero: 0,
            nivel: parseInt(nivel, 10)
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

    }

    const handleDeleteElemento = async (id) => {

        console.log(id)

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

        setElementosPlanta(elementosPlanta.filter(elemento => elemento.id != id));
    }

    return (
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
                                    //disableClearable={ true }
                                    id="elemento"
                                    options={elementos}
                                    disabled
                                    getOptionLabel={option => option.nombre}
                                    renderInput={params => <TextField {...params} variant="outlined" label="Elemento" name="Oferta" />}
                                    onChange={handleSelectElemento}
                                />
                            </Grid>
                            :
                            <Grid item xs={12}>
                                <Autocomplete
                                    //disableClearable={ true }
                                    id="elemento"
                                    options={elementos}
                                    getOptionLabel={option => option.nombre}
                                    renderInput={params => <TextField {...params} variant="outlined" label="Elemento" name="Oferta" />}
                                    onChange={handleSelectElemento}
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
                                                            <Tooltip title="Eliminar elemento">
                                                                <IconButton color="error" edge="end" aria-label="delete" onClick={() => handleDeleteElemento(elemento.id)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        }
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
                    }




                </Grid>
            </Card>
        </Grid>
    )
}