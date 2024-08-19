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
        </div>
    )
}

export default Cuenta;