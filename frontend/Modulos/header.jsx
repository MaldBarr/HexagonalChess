import { Link } from "react-router-dom";
import React from 'react';
import Logo from '/Figuras/g-queen.png';
import './CSS/header.css'

function Header() {
    return (
        <>  
            <header>
                <img src={Logo} className="HeaderLogo"/>
                <h3><Link to="/">Hex'a'Chess</Link></h3>
                <ul className="header-menu">
                    <li><Link to="/rules">Reglas</Link></li>
                    <li><Link to="/AboutUs">Nosotros</Link></li>
                    <li><Link to="/Account">Cuenta</Link></li>
                </ul>
            </header>
        </>
    );
}

export default Header;