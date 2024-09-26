import React from 'react';
import Header from '../Modulos/header.jsx';
import ReactPlayer from 'react-player';

import {useState} from 'react';
import {Link} from 'react-router-dom';


function Nosotros() {
    return (
        <div>
            <Header />
            <h1>Sobre Nosotros</h1>
            <div className='Rules'>
                <section>
                    <h2>Carlos Maldonado</h2>
                    <p>Estudiante de Ingenieria de ejecución Informatica en la Pontificia Universidad Catolica de Valparaiso</p>
                    <p>Desarrollador de la pagina web</p>
                    <p></p>
                </section>
                <section className='SecImagen'>
                    <img src='public/Dev.png' className='RulesIMG'/>
                </section>
            </div>
        </div>
    )
}

export default Nosotros;