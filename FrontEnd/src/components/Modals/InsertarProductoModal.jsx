import { Grid, TextField, InputAdornment } from '@mui/material';

export const InsertarProductoModal = ({ change:handleChange, errorProducto, handleChangeDecimal }) =>{

    return (
        <>
            <Grid item xs={ 3 } md={ 3 }>
                <TextField sx={{ width: '100%', marginTop: '22px' }} label="Código Producto" name="codigoProducto" onChange={ handleChange } error={errorProducto} helperText={errorProducto ? 'Este campo es obligatorio' : ' '} />
            </Grid>

            <Grid item xs={ 3 } md={ 5 }>
                <TextField sx={{ width: '100%' }} label="Descripcion" name="descripcion" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 3 } md={ 4 }>
                <TextField 
                    sx={{ width: '100%' }} 
                    label="Definir unidad" 
                    name="kg" 
                    onChange={ handleChangeDecimal }
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                KG
                            </InputAdornment>
                        ),
                    }}  
                />
            </Grid>

        </>
    )
}