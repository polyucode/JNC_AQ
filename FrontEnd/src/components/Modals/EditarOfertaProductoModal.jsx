import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getProductos } from '../../api';

export const EditarOfertaProductoModal = ({ handleChangeProducto, ofertaProducto, setOfertaProducto, productoEditar, consumos, ofertaSeleccionada }) => {

    const [productos, setProductos] = useState([]);
    const [consumidos, setConsumidos] = useState(0);
    const [pendientes, setPendientes] = useState(0);



    useEffect(() => {

        getProductos()
            .then(productos => {
                setProductos(productos);
            })

        calcularConsumidosYPendientes()
    }, [])

    const calcularConsumidosYPendientes = () => {

        const cantidad = ofertaProducto.cantidad;
        const ofertaProductoKey = `${ofertaSeleccionada.numeroOferta}_${ofertaProducto.producto}`;
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
                        producto: value.id,
                        descripcionProducto: value.descripcion
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} label="Precio" name="precio" type='number' onChange={handleChangeProducto} value={ofertaProducto && ofertaProducto.precio} />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} label="Estimación Consumo" name="cantidad" type='number' onChange={handleChangeProducto} value={ofertaProducto && ofertaProducto.cantidad} />
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