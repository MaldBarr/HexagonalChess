import React from 'react';
import Header from '../Modulos/header.jsx';
import HexagonalChessBoard from '../Tablero/GridHexagonal.jsx';
import { HexGridContext } from '../Tablero/Elementos/HexagonalGridContext.jsx';
import Game from '../Tablero/ConstructorTablero.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import {useState} from 'react';
import {Link} from 'react-router-dom';

function Juego() {

    return (
        <div>
            <Header />
            <DndProvider backend={HTML5Backend}>
                <Game />
            </DndProvider>
            <Link to="/Salas"><button className="forfeit-button">Rendirse</button></Link>
        </div>
    )
}

export default Juego;