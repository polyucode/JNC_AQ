import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getOfertas, getProductos } from '../../api';

export const InsertarConsumoModal = ({ change: handleChange, setConsumoSeleccionado }) => {

    const [ofertas, setOfertas] = useState([]);
    const [productos, setProductos] = useState([]);

    useEffect(() => {

        getOfertas(ofertas => {
            setOfertas(ofertas);
        })

        getProductos(productos => {
            setProductos(productos);
        })

    }, [])

    return (
        <>
            <Grid item xs={3} md={4}>
                <Autocomplete
                    disableClearable={true}
                    sx={{ width: '100%' }}
                    id="Oferta"
                    options={ofertas}
                    getOptionLabel={option => option.numeroOferta}
                    renderInput={(params) => <TextField {...params} label="Oferta" name="oferta" />}
                    onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                        ...prevState,
                        oferta: parseInt(value.numeroOferta)
                    }))}
                />
            </Grid>

            <Grid item xs={3} md={4}>
                <h5> Fecha </h5>
                <TextField sx={{ width: '100%' }} name="fecha" type="date" onChange={handleChange} />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} label="Producto" name="producto" onChange={handleChange} />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%' }} label="Cantidad" name="cantidad" type="number" onChange={handleChange} />
            </Grid>

        </>
    )
}