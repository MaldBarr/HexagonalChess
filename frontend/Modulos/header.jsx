import { Link, useLocation } from "react-router-dom";
import React from 'react';
import Logo from '/Figuras/g-queen.png';
import './CSS/header.css'

function Header() {
    const location = useLocation();
    return (
        <>  
            <header>
                <img src={Logo} className="HeaderLogo"/>
                <Link to="/"><h1>Hex'a'Chess</h1></Link>
                <Link to="/Salas"><button className="play-button">Jugar</button></Link>
                <div></div>
                <ul className="header-menu">
                    <li><Link to="/Rules" className={location.pathname === '/Rules' ? 'active' : ''}>Reglas</Link></li>
                    <li><Link to="/AboutUs" className={location.pathname === '/AboutUs' ? 'active' : ''}>Nosotros</Link></li>
                    <li><Link to="/Account" className={location.pathname === '/Account' ? 'active' : ''}>Cuenta</Link></li>
                </ul>
            </header>
        </>
    );
}


export default Header;