import React from 'react';
import Header from '../Modulos/header.jsx';
import '/style.css';

import {useState} from 'react';
import {Link} from 'react-router-dom';

function Salas() { 
    return (
        <div>
            <Header/>
            <h1>Salas disponibles</h1>
        </div>
    )
}

export default Salas;