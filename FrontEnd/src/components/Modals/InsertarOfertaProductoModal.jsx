import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getProductos } from '../../api';

export const InsertarOfertaProductoModal = ({ handleChangeProducto, ofertaProducto, setOfertaProducto, handleChangeDecimal, errorProductoPrecio }) => {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        
        getProductos()
            .then(productos => {
                setProductos(productos);
            })

    }, [])

    return (
        <>
            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="producto"
                    options={productos}
                    getOptionLabel={option => option.descripcion}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} name="producto" label="Producto" />}
                    onChange={(event, value) => setOfertaProducto(prevState => ({
                        ...prevState,
                        producto: value.id,
                        descripcionProducto: value.descripcion
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%', marginTop: '25px' }} label="Precio" name="precio" onChange={handleChangeDecimal} error={errorProductoPrecio} helperText={errorProductoPrecio ? 'El formato es máximo 2 decimales' : ' '} />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} label="Estimación Consumo" name="cantidad" type='number' onChange={handleChangeProducto} />
            </Grid>

        </>
    )
}