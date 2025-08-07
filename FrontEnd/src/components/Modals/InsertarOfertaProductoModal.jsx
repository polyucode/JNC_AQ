import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getProductos } from '../../api';

export const InsertarOfertaProductoModal = ({ handleChangeProducto, setOfertaProducto, handleChangeDecimal, errorProductoPrecio }) => {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        
        getProductos()
            .then(resp => setProductos(resp.filter(producto => !producto.deleted)));

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
                        idProducto: value.id,
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%', marginTop: '25px' }} label="Precio Unitario" name="precio" onChange={handleChangeDecimal} error={errorProductoPrecio} helperText={errorProductoPrecio ? 'El formato es máximo 2 decimales' : ' '} />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField 
                    sx={{ 
                        width: '100%', 
                        '& input[type=number]': {
                            MozAppearance: 'textfield',
                            '&::-webkit-outer-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0
                            },
                            '&::-webkit-inner-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0
                            }
                        }
                    }} 
                    label="Unidades"
                    name="unidades"
                    type='number'
                    onChange={handleChangeProducto} 
                />
            </Grid>

        </>
    )
}