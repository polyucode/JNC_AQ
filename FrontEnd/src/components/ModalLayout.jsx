import { Modal, Fade, Grid, Typography, Button, IconButton, TextField, FormControlLabel, Checkbox, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width: { xl: '50%', lg: '60%', md: '70%', sm: '90%' },
  boxShadow: 24,
  p: 3,
  pt: 1
};

export const ModalLayout = ({ titulo, open, onClose }) => {


const base = (
  <>
    <Grid item xs={ 6 } md={ 4 }>
      <TextField sx={{ width: '100%' }} label="Nombre" name="nombre" onChange={ () => {} } />
    </Grid>
    <Grid item xs={ 6 } md={ 5}>
      <TextField sx={{ width: '100%' }} label="Apellidos" name="apellidos" onChange={ () => {} } />
    </Grid>
    <Grid item xs={ 6 } md={ 3 }>
      <TextField sx={{ width: '100%' }} label="Teléfono" name="telefono" type="number" onChange={ () => {} } />
    </Grid>
    <Grid item xs={ 6 } md={ 4 }>
      <TextField sx={{ width: '100%' }} label="Usuario" name="usuario" onChange={ () => {} } />
    </Grid>
    <Grid item xs={ 4 } md={ 4 }>
      <TextField sx={{ width: '100%' }} label="Contraseña" name="password" type="password" onChange={ () => {} } />
    </Grid>
    <Grid item xs={4} md={ 4 }>
      <TextField sx={{ width: '100%' }} label="Repetir Contraseña" name="repetir_contraseña" type="password" onChange={ () => {} } />
    </Grid>

    <Grid item xs={ 4 }>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Usuario activo"
        name="activo"
        //onChange={handleChange}
      />
    </Grid>

    {/* Desplegable de Perfiles */}
    <Grid item xs={ 4 }>
      <Autocomplete
        disableClearable={ true }
        id="CboPerfiles"
        //options={ perfiles }
        getOptionLabel={ option => option.nombre }
        renderInput={ params => <TextField {...params} label="Perfil" name="idPerfil" /> }
        //onChange={ handleChangePerfil }
      />
    </Grid>

    {/* Desplegable de Clientes */}
    <Grid item xs={ 4 }>
      <Autocomplete
        disableClearable={ true }
        //disabled={ estadoCboCliente }
        id="CboClientes"
        //options={ clientes }
        getOptionLabel={ option => option.nombreComercial }
        renderInput={ params => <TextField {...params} label="Clientes" name="idCliente"/> }
        // onChange={ (event, value) => setUsuarioSeleccionado(prevState=>({
        //   ...prevState,
        //   idCliente:value.id
        // }))}
        />
    </Grid>

        {/* <div align="right">
          
        </div> */}
  </>
)

    return (
      <Modal open={ open } onClose={ onClose }>
        <Fade in={open}>
          <Grid container sx={style}>

            <Grid
              container
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #E0E0E0',
                mb: 3
              }}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                { titulo }
              </Typography>
              <IconButton aria-label="close" color="error" onClick={ () => {} }> {/* () => abrirCerrarModalInsertar() */}
                <CloseIcon />
              </IconButton>
            </Grid>

            <Grid container spacing={ 3 } sx={{ alignItems: 'center' }}>
              { base }
            </Grid>

            <Grid
              container
              sx={{
                justifyContent: 'flex-end',
                mt: 3,
                borderTop: '1px solid #E0E0E0',
                pt: 2,
              }}
            >
              <Button
                color='primary'
                variant='contained'
                startIcon={ <AddIcon /> }
                onClick={ () => {} }
              >
                Insertar
              </Button> {/* ()=>peticionPost() */}
            </Grid>

          </Grid>
        </Fade>
      </Modal>
    )
}