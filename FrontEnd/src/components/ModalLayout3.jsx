import { Modal, Fade, Grid, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../App.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width: { xl: '50%', lg: '60%', md: '70%', sm: '90%' },
  boxShadow: 24
};

export const ModalLayout3 = ({ titulo, contenido, botones, open, onClose }) => {

    return (
      <Modal open={ open } onClose={ onClose } >
        <Fade in={open}>
          <Grid container sx={style}>

            <Grid
              container
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 10px',
                backgroundColor: '#FFFFFF'
              }}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                { titulo }
              </Typography>
              <IconButton aria-label="close" color="error" onClick={ onClose }>
                <CloseIcon />
              </IconButton>
            </Grid>

            <Grid container className="modal-cont" spacing={ 3 } sx={{ alignItems: 'center', maxHeight: 550, overflow: 'auto', width: '100%', padding: '20px' }}>
              { contenido }
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    )
}