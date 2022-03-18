import React , {useState, useEffect} from "react";
import {TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";

import FirmaFileUploader from '../components/FirmaFileUploader';


const token = {
  headers:{
      Authorization: 'Bearer ' + localStorage.getItem('token')
  }
};

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
}));

function Perfil() {

    const [data, setData] = useState([]);

    const [User,setUsuario] = useState('');
    
    useEffect(()=> {
      const UsuarioActualJSON = localStorage.getItem('UsuarioActual')
      if(UsuarioActualJSON){
          const UsuarioActual = JSON.parse(UsuarioActualJSON)
          setUsuario(UsuarioActual)
      }
    },[])

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
        id: 0,
        nombre: '',
        apellidos: '',
        login: null,
        telefono: '',
        usuario: '',
        password: '',
        activo: false,
        firma: "",
        idCliente: 0,
        idPerfil: 0,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
  
  
    });

    const handleChange=e=>{
        const {name, value}=e.target;
        setUsuarioSeleccionado(prevState=>({
          ...prevState,
          [name]: value
        }));
    }

    const styles= useStyles();

    const uploader = React.createRef();

    const peticionPut=async()=>{
      await axios.put("/usuario?id=" + User.id, User, token)
      .then(response=>{
        var usuarioModificado = data;
        usuarioModificado.map(usuario=>{
          if(usuario.id===User.id){
            usuario = User
          }
        });
      }).catch(error=>{
        console.log(error);
      })
    }

    function enviarImagenFirma(e) {
      e.preventDefault();

      console.log(User);

      // Obtenemos el formulario
      var formData = new FormData(document.getElementById("firma-image-form"));

      // Si no exsisten datos, salimos de la función
      if (undefined === uploader.current) return;

      // Creamos el json para enviar al backend
      User.firma = uploader.current.state.imageSrc;

      //User.firma = "HOLA QUE TAL";

      peticionPut();

    };

    return (
        <div>
            <h4>Perfil de usuario</h4>
            <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange} value={User.nombre} /> {/* value={usuarioSeleccionado&&usuarioSeleccionado.nombre} */}
            <br />
            <div className="firma-image">
              <FirmaFileUploader  ref={uploader} />
              <button type="submit" onClick={enviarImagenFirma}>Subir firma</button>
            </div>
        </div>
    );
}

export default Perfil;