import React from 'react';
import Header from '../Modulos/header.jsx';

import {useState} from 'react';
import {Link} from 'react-router-dom';

function Reglas() {
    return (
        <div>
            <Header />
            <h1>Reglas</h1>
            <p>En esta sección se encuentran las reglas del juego</p>
        </div>
    )
}

export default Reglas;