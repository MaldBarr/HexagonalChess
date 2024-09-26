import { Link, useLocation } from "react-router-dom";
import React from 'react';
import './CSS/Login.css';
import FetchPaises from './FetchPaises.jsx';

function register() {
    return (
        <div className="Parent">
            <div className="Container">
                <Link to="/">Inicio</Link>
                <h1>Registro</h1>
                <form>
                    <input type="text" placeholder="Nombre de usuario" required />
                    <input type="email" placeholder="Correo electronico" required />
                    <FetchPaises/>
                    <input type="password" placeholder="Contraseña" required />
                    <input type="password" placeholder="Confirmar contraseña" required />
                    <button type="submit">Registrarse</button>
                </form>
                <p>¿Ya tienes una cuenta? <Link to="/Login">Inicia sesión</Link></p>
            </div>
        </div>
    )
} 

function validarCorreoElectronico(correo) {
    // Expresión regular para validar direcciones de correo electrónico
    var expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
    // Usar el método test para verificar si el correo coincide con la expresión regular
    return expresionRegular.test(correo);
}

export default register;