import React from 'react';
import Header from '../Modulos/header.jsx';

import {useState} from 'react';
import {Link} from 'react-router-dom';

function Administrador() {
    return (
        <div>
            <Header />
            <h1>Administracion</h1>
            <p>En esta sección se encuentran las opciones de administrador</p>
        </div>
    )
}

export default Administrador;