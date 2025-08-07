import { Grid, TextField } from '@mui/material';

export const InsertarParametroModal = ({ handleChange, errorNombre, errorUnidad, errorNombreRepetido }) =>{

    return (
        <>
            <Grid item xs={ 3 } md={ 8 }>
                <TextField 
                    sx={{ width: '100%'}} 
                    label="Parámetro"
                    name="nombre"
                    onChange={ handleChange }
                    error={errorNombre || errorNombreRepetido}
                    helperText={
                        errorNombre ? 'Este campo es obligatorio' :
                        (errorNombreRepetido ? 'Este nombre de parámetro ya se está utilizando' : ' ')
                    } 
                />
            </Grid>

            <Grid item xs={ 3 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="Unidad" name="unidad" onChange={ handleChange } error={errorUnidad} helperText={errorUnidad ? 'Este campo es obligatorio' : ' '} />
            </Grid>

        </>
    )
}