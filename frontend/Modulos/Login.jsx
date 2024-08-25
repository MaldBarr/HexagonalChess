import { Link, useLocation } from "react-router-dom";
import React from 'react';
import './CSS/Login.css'



function Login() {
    return (
        <div>
            <Link to="/">Inicio</Link>
            <h1>Iniciar sesión</h1>
            <form>
                <input type="text" placeholder="Correo" required />
                <input type="password" placeholder="Contraseña" required />
                <button type="submit">Iniciar sesión</button>
            </form>
            <p>¿No tienes una cuenta? <Link to="/Registro">Registrate</Link></p>
        </div>
    )
}

function validarCorreoElectronico(correo) {
    // Expresión regular para validar direcciones de correo electrónico
    var expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
    // Usar el método test para verificar si el correo coincide con la expresión regular
    return expresionRegular.test(correo);
}

export default Login;