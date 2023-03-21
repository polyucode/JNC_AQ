import { Grid, Button } from '@mui/material';

export const insertarBotonesModal = ( icono, texto, accion, color, descargar ) => {
    return (
        <Grid item>
            <Button
                color={ color ? color : 'primary' }
                variant='contained'
                startIcon={ icono }
                onClick={ accion }
                descargar='jnegre.pdf'
            >
                { texto }
            </Button>
        </Grid>
    )
}