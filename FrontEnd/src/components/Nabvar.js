import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SlidebarData as SidebarData} from './SlidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';


function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const UsuarioActual = localStorage.getItem('UsuarioActual')

  var entero = 0


function handleClick(e)
{
  document.getElementById("NavTitulo").innerHTML = e
}


  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className='text-white navbar-titulo'>
          <h2 id="NavTitulo" >Inicio</h2>
          </div>
        <div className='navbar-login'>
        <Link  className='nav-link' to={'login'} onClick={() => handleClick('Login')}>
          <FaIcons.FaUser/> 
       </Link>

        </div>


        </div>
        <nav style={{ zIndex: '100000'}} className={sidebar ? 'nav-menu active' : 'nav-menu' }>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars-active'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} onClick={() => handleClick(item.title)} className={item.cName} >
                  
                  <Link to={item.path} >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;