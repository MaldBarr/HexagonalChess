import React from 'react';
import Header from '../Modulos/header.jsx';
import HexagonalChessBoard from '../Tablero/GridHexagonal.jsx';

import {useState} from 'react';
import {Link} from 'react-router-dom';

function Juego() {

    return (
        <div>
            <Header />
            <HexagonalChessBoard />
            <Link to="/Salas"><button className="forfeit-button">Rendirse</button></Link>
        </div>
    )
}

export default Juego;