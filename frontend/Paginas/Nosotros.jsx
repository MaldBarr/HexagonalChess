import React from 'react';
import Header from '../Modulos/header.jsx';

import {useState} from 'react';
import {Link} from 'react-router-dom';


function Nosotros() {
    return (
        <div>
            <Header />
            <h1>Nosotros</h1>
            <p>En esta sección se encuentran la informacion de los creadores</p>
        </div>
    )
}

export default Nosotros;