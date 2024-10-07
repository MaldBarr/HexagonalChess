import { Link, useLocation } from "react-router-dom";
import React, {useState} from 'react';
import Logo from '/Figuras/g-queen.png';
import './CSS/header.css'

function Header() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const token = localStorage.getItem("token");
    if (token) {
        console.log("El token es: " + token);
    } else {
        console.log("No hay token");
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <>  
            <header>
                <Link to="/"><img src={Logo} className="HeaderLogo"/></Link>
                <Link to="/"><h1>Hex'a'Chess</h1></Link>
                {token && <Link to="/Salas"><button className="play-button">Jugar</button></Link>}
                <div></div>
                
                <ul className={`header-menu ${menuOpen ? 'open' : ''}`}>
                    <li><Link to="/Rules" className={location.pathname === '/Rules' ? 'active' : ''}>Reglas</Link></li>
                    <li><Link to="/AboutUs" className={location.pathname === '/AboutUs' ? 'active' : ''}>Nosotros</Link></li>
                    <li><Link to="/Account" className={location.pathname === '/Account' ? 'active' : ''}>Cuenta</Link></li>
                </ul>
                <div className="menu-icon" onClick={toggleMenu}>
                    &#9776;
                </div>
            </header>
        </>
    );
}


export default Header;