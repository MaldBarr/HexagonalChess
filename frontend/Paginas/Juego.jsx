import React from 'react';
import Header from '../Modulos/header.jsx';

import {useState} from 'react';
import {Link} from 'react-router-dom';

function Juego() {
    return (
        <div>
            <Header />
            <div className='Rules'>
                <img src='Figuras/Board.png' className='BoardIMG'/>
            </div>
            <Link to="/Salas"><button className="forfeit-button">Rendirse</button></Link>
        </div>
    )
}

export default Juego;