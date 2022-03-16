

function Perfil() {

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
        id: 0,
        nombre: '',
        apellidos: '',
        login: null,
        telefono: '',
        usuario: '',
        password: '',
        activo: false,
        firma: '',
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

    return (
        <div>
            <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.nombre}/>
            <br />
        </div>
    );
}

export default Perfil;