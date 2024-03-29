import { Modal, Fade, Grid, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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

export const ModalLayout = ({ titulo, contenido, botones, open, onClose }) => {



{/* ()=>peticionPost() */}

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
              <IconButton aria-label="close" color="error" onClick={ onClose }>
                <CloseIcon />
              </IconButton>
            </Grid>

            <Grid container spacing={ 3 } sx={{ alignItems: 'center' }}>
              { contenido }
            </Grid>

            <Grid
              container
              sx={{
                justifyContent: 'flex-end',
                mt: 3,
                borderTop: '1px solid #E0E0E0',
                pt: 1
              }}
              spacing={ 2 }
            >
              {
                botones.map( boton => boton )
              }
            </Grid>

          </Grid>
        </Fade>
      </Modal>
    )
}