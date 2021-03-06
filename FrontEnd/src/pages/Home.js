import React, {useState, useEffect}  from "react";
import PermissionsGate from "../PermissionsGate";
import { SCOPES } from "../permission-maps";

import HomeCliente from "../components/HomeCliente";

import './Home.css';

const token = {
    headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};



function Home() {

    const [User,setUsuario] = useState('');

    useEffect(()=> {
        const UsuarioActualJSON = localStorage.getItem('UsuarioActual')
        if(UsuarioActualJSON){
            const UsuarioActual = JSON.parse(UsuarioActualJSON)
            setUsuario(UsuarioActual)
        }
    },[])

    



    return (
        <>
        <HomeCliente/>
        </>
    )
    // return (
    //     <div className="container">
    //         <div className="card" >
    //         <div className="card-body">
    //             <h5 className="card-title"><span style={{fontWeight: "bold"}}>Usuario conectado</span></h5>
    //         </div>    
    //             <ul className="list-group list-group-flush">
    //                 <li className="list-group-item"><span style={{fontWeight: "bold"}}> Nombre: </span>{User.nombre + ' ' + User.apellidos}</li>
    //                 <li className="list-group-item"><span style={{fontWeight: "bold"}}> Telefono: </span>{User.telefono}</li>
    //                 <li className="list-group-item"><span style={{fontWeight: "bold"}}> Usuario: </span>{User.usuario}</li>
    //             </ul>
    //         </div>
    //     </div>

    // );

} 

export default Home;