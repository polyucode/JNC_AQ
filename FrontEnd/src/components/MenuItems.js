import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';

import Dropdown from "./Dropdown";

import './MenuItems.css';

function Logout(){
    localStorage.clear();
    window.location.reload(false);
}

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);

  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  const handleClick = (id) => {

    switch (id){
        case 1:
            
            break;
        case 2:
            Logout();
            break;
    }
    console.log(id);
  };

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}{" "}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        //<a href="/#">{items.title}</a>
        <button
            className="submenu"
            type="button"
            aria-haspopup="menu"
            onClick={items.id ? () => handleClick(items.id) : null}
        >
          {items.link ? (<Link  style={{padding: 0}} className='nav-link' to={"YC_React/" + items.linkName} onClick={() => handleClick('Login')}>{items.title}</Link>) : items.title}
        {/* {items.title} */}
      </button>
      )}
    </li>
  );
};

export default MenuItems;