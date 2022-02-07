import React, {Component} from 'react';
import {Link} from 'react-router-dom';

function Nav (){
        return (
            <nav className="navbar navbar-expand navbar-light fixed-top">
                <div className='container'>
                    <Link className="navbar-brand" to={'/'}>Inicio</Link>
                    <div className="collapse navbar-collapse justify-content-end">
                        <ul className='navbar-nav ml-auto'>
                            <li className='nav-item'>
                                <Link  className='nav-link' to={'login'} >Login</Link>
                            </li>
                        </ul> 
                    </div>
                </div>
            </nav>
        );
}

export default  Nav;