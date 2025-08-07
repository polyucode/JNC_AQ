import { Modal, Fade, Grid, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../App.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width: { xl: '50%', lg: '60%', md: '70%', sm: '90%' },
  boxShadow: 24
};

export const ModalLayout2 = ({ titulo, contenido, botones, open, onClose }) => {

const { user } = useContext(AuthContext);

{/* ()=>peticionPost() */}

    return (
      <Modal open={ open } onClose={ onClose } >
        <Fade in={open}>
          <Grid container sx={style}>

            <Grid
              container
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 12px 30px',
                backgroundColor: '#FFFFFF'
              }}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                { titulo }
              </Typography>
              <IconButton aria-label="close" color="error" onClick={ onClose }>
                <CloseIcon />
              </IconButton>
            </Grid>

            <Grid container className="modal-cont" spacing={ 3 } sx={{ alignItems: 'center', maxHeight: 700, overflow: 'auto', width: '100%', padding: '24px' }}>
              { contenido }
            </Grid>

            <Grid
              container
              sx={{
                width: '100%',
                justifyContent: 'flex-end',
                padding: '12px',
                position: 'relative',
                left: '16px'
              }}
              spacing={ 2 }
            >
              {
                user.idPerfil === 1 ?
                botones.map( boton => boton )
                :
                false
              }
            </Grid>

          </Grid>
        </Fade>
      </Modal>
    )
}