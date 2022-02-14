import React, {useState, useEffect}  from "react";
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
        // <div className="container">
        //     <div className="card" >
        //     <div className="card-body">
        //         <h5 className="card-title"><span style={{fontWeight: "bold"}}>Usuario conectado</span></h5>
        //     </div>    
        //         <ul className="list-group list-group-flush">
        //             <li className="list-group-item"><span style={{fontWeight: "bold"}}> Nombre: </span>{User.nombre + ' ' + User.apellidos}</li>
        //             <li className="list-group-item"><span style={{fontWeight: "bold"}}> Telefono: </span>{User.telefono}</li>
        //             <li className="list-group-item"><span style={{fontWeight: "bold"}}> Usuario: </span>{User.usuario}</li>
        //         </ul>
        //     </div>
        // </div>
        <div className="home-container">
            <div className="logo-principal">
                {/* <img src="jnegre-logo-tagline.png"></img> */}
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img src="jnegre-logo-tagline.png" className="d-block w-100" alt="jnegre logo"/>
                        </div>
                        <div className="carousel-item">
                        <img src="..." className="d-block w-100" alt="jnegre logo"/>
                        </div>
                    </div>
                    </div>
            </div>
            <div className="card-user">
                <div className="card-title">
                  <span>Usuario conectado</span>
                </div>
                <div className="card-content">
                    {/* <ul className="list-group list-group-flush">
                        <li className="list-group-item"><span style={{fontWeight: "bold"}}> Nombre: </span>{User.nombre + ' ' + User.apellidos}</li>
                        <li className="list-group-item"><span style={{fontWeight: "bold"}}> Telefono: </span>{User.telefono}</li>
                        <li className="list-group-item"><span style={{fontWeight: "bold"}}> Usuario: </span>{User.usuario}</li>
                    </ul> */}
                    <div className="card-content-user-data">
                        <div className="card-content-user-variable">
                            <div className="card-content-user-data-title">
                                <span>Nombre</span>
                            </div>
                            <div className="card-content-user-data-value">
                                {/* <span>{User.nombre}</span> */}
                                <span>Alberto</span>
                            </div>
                        </div>

                        <div className="card-content-user-variable">
                            <div className="card-content-user-data-title">
                                <span>Apellidos</span>
                            </div>
                            <div className="card-content-user-data-value">
                                {/* <span>{User.apellidos}</span> */}
                                <span>Moriana Fornas</span>
                            </div>
                        </div>

                        <div className="card-content-user-variable">
                            <div className="card-content-user-data-title">
                                <span>Telefono</span>
                            </div>
                            <div className="card-content-user-data-value">
                                {/* <span>{User.telefono}</span> */}
                                <span>654987321</span>
                            </div>
                        </div>

                        <div className="card-content-user-variable">
                            <div className="card-content-user-data-title">
                                <span>Usuario</span>
                            </div>
                            <div className="card-content-user-data-value">
                                {/* <span>{User.usuario}</span> */}
                                <span>amoriana</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

} 

export default Home;