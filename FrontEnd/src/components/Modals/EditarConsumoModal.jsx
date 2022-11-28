import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getOfertas, getProductos } from '../../api/apiBackend';

export const EditarConsumoModal = ({ change: handleChange, setConsumoSeleccionado, consumoSeleccionado, productoEditar }) => {

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

    function formateandofechas(fecha) {
        const fecha1 = new Date(fecha)

        const fecha2 = fecha1.getFullYear() +
            '-' + String(fecha1.getMonth() + 1).padStart(2, '0') +
            '-' + String(fecha1.getDate()).padStart(2, '0')

        return fecha2
    }

    return (
        <>
            <Grid item xs={3} md={4}>
                <Autocomplete
                    disableClearable={true}
                    sx={{ width: '100%' }}
                    id="Oferta"
                    inputValue={consumoSeleccionado.oferta}
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
                <TextField sx={{ width: '100%' }} name="fecha" type="date" onChange={handleChange} value={consumoSeleccionado && formateandofechas(consumoSeleccionado.fecha)} />
            </Grid>

            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="codigoProducto"
                    options={productos}
                    getOptionLabel={option => option.descripcion}
                    defaultValue={productoEditar[0]}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} name="codigoProducto" />}
                    onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                        ...prevState,
                        codigoProducto: value.descripcion
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%' }} label="Cantidad" name="cantidad" type="number" onChange={handleChange} value={consumoSeleccionado && consumoSeleccionado.cantidad} />
            </Grid>

        </>
    )
}