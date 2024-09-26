import React from 'react';
import Header from '../Modulos/header.jsx';

import {useState} from 'react';
import {Link} from 'react-router-dom';

function Cuenta() {
    return (
        <div>
            <Header />
            <h1>Cuenta</h1>
            <p>En esta sección se encuentran las opciones de cuenta</p>
            <Link to="/Login"><h3>Iniciar sesión</h3></Link>
            <Link to="/Registro"><h3>Registrarse</h3></Link>
        </div>
    )
}

export default Cuenta;