import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getProductos } from '../../api';

export const EditarOfertaProductoModal = ({ handleChangeProducto, ofertaProducto, setOfertaProducto, productoEditar, consumos, ofertaSeleccionada, errorProductoPrecio }) => {

    const [productos, setProductos] = useState([]);
    const [consumidos, setConsumidos] = useState(0);
    const [pendientes, setPendientes] = useState(0);



    useEffect(() => {

        getProductos()
            .then(resp => setProductos(resp.filter(producto => !producto.deleted)));

        calcularConsumidosYPendientes()
    }, [])

    const calcularConsumidosYPendientes = () => {

        const cantidad = ofertaProducto.unidades;
        const ofertaProductoKey = `${ofertaSeleccionada.numeroOferta}_${ofertaProducto.idProducto}`;
        const consumoInfo = consumos[ofertaProductoKey];

        const consumidos = consumoInfo ? consumoInfo.totalCantidad : 0;

        setConsumidos(consumidos)

        const pendientes = cantidad - consumidos;

        setPendientes(pendientes)
    }

    return (
        <>
            <Grid item xs={6} md={6}>
                <Autocomplete
                    disableClearable={true}
                    id="producto"
                    options={productos}
                    defaultValue={productoEditar[0]}
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
                <TextField sx={{ width: '100%', marginTop: '25px' }} label="Precio Unitario" name="precio" onChange={handleChangeProducto} error={errorProductoPrecio} helperText={errorProductoPrecio ? 'El formato es máximo 2 decimales' : ' '} value={ofertaProducto && ofertaProducto.precio} />
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
                    value={ofertaProducto && ofertaProducto.unidades}
                />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField disabled sx={{ width: '100%' }} label="Consumidos" name="consumidos" type='number' onChange={handleChangeProducto} value={consumidos} />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField disabled sx={{ width: '100%' }} label="Pendientes" name="pendientes" type='number' onChange={handleChangeProducto} value={pendientes} />
            </Grid>

        </>
    )
}