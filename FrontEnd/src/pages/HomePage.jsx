import React, {useState, useEffect}  from "react";
import { MainLayout } from "../layout/MainLayout";
import HomeCliente from "../components/HomeCliente";

import './Home.css';

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

export const HomePage = () => {

    const [User,setUsuario] = useState('');

    useEffect(()=> {
        const UsuarioActualJSON = localStorage.getItem('UsuarioActual')
        if(UsuarioActualJSON){
            const UsuarioActual = JSON.parse(UsuarioActualJSON)
            setUsuario(UsuarioActual)
        }
    },[])

    return (
        <MainLayout title='Inicio'>
            <HomeCliente/>
        </MainLayout>
    );
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