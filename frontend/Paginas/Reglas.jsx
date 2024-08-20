import React from 'react';
import Header from '../Modulos/header.jsx';
import '/style.css';

import {useState} from 'react';
import {Link} from 'react-router-dom';

function Reglas() {
    return (
        <div>
            <Header />
            <h1>Reglas del juego</h1>
            <div className='Rules'>
                <section>
                    <h2>Nuevas posiciones iniciales</h2>
                    <p>En esta versión del juego, las posiciones iniciales se adaptan al siguiente formato: (ver imagen)</p>
                    <p>Como podemos observar, </p>
                </section>
                <section className='SecImagen'>
                    <img className='RulesIMG' src="/setup.png" alt="Tablero hexagonal" />
                </section>
            </div>
            <div className='Rules'>
                <section>
                    <h2>Movimientos del peón (Pawn):</h2>
                    <p>En posición inicial el peón puede avanzar 1 o 2 posiciones, posteriormente solo puede avanzar una posición, las capturas se realizan en diagonal hacia adelante (marcadas con una X), al llegar al lado opuesto el peón se promueve a una reina (posiciones marcadas con una estrella)</p>
                    <p>El peon no puede retroceder a una posicion anterior.</p>
                    <p>La notacion de movimientos del peon es la mas simple, donde solo se marca la coordenada a la cual se mueve la pieza, ejemplo e6</p>
                </section>
                <section className='SecImagen'>
                    <img className='RulesIMG' src="/pawn.png" alt="Peón (Pawn)" />
                </section>
            </div>
            <div className='Rules'>
                <section>
                    <h2>Movimientos de la torre (Rook):</h2>
                    <p>La torre se mueve en línea recta en cualquier dirección, no puede saltar sobre otras piezas, solo puede capturar piezas que se encuentren en su camino.</p>
                    <p>Adicionalmente puede realizar un movimiento de enroque con el rey, en donde el rey se mueve dos posiciones hacia la torre y la torre se ubica en el lugar opuesto</p>
                    <p>Para la notacion de esta pieza se usa R antes de la coordenada, ejemplo Re6</p>
                </section>
                <section className='SecImagen'>
                    <img className='RulesIMG' src="/rook.png" alt="Torre (Rook)" />
                </section>  
            </div>
            <div className='Rules'>
                <section>
                    <h2>Movimientos del caballo (Knight):</h2>
                    <p>El caballo se mueve en forma de L, puede saltar sobre otras piezas, no puede ser bloqueado por otras piezas.</p>
                    <p>Para la notacion de esta pieza se usa N antes de la coordenada, ejemplo Ne6</p>
                </section>
                <section className='SecImagen'>
                    <img className='RulesIMG' src="/knight.png" alt="Caballo (Knight)" />
                </section>
            </div>
            <div className='Rules'>
            <section>
                    <h2>Movimientos del alfil (Bishop):</h2>
                    <p>El alfil se mueve entre los recuadros se su mismo color, una forma de imaginarlo es que se mueve en su propio universo de color, puede ser bloqueado por piezas en su camino</p>
                    <p>Para la notacion de esta pieza se usa B antes de la coordenada, ejemplo Be6</p>
                </section>
                <section className='SecImagen'>
                    <img className='RulesIMG' src="/bishop.png" alt="Alfil (bishop)" />
                </section>
            </div>
            <div className='Rules'>
                <section>
                    <h2>Movimientos de la reina (Queen):</h2>
                    <p>La reina se mueve combinando los movimientos de la torre y del alfil, no puede saltar sobre otras piezas, solo puede capturar piezas que se encuentren en su camino.</p>
                    <p>Para la notacion de esta pieza se usa Q antes de la coordenada, ejemplo Qe6</p>
                </section>
                <section className='SecImagen'>
                    <img className='RulesIMG' src="/queen.png" alt="Reina (Queen)" />
                </section>
            </div>
            <div className='Rules'>
                <section>
                    <h2>Movimientos del rey (King):</h2>
                    <p>El rey se mueve en cualquier dirección, pero solo una posición a la vez, no puede saltar sobre otras piezas, solo puede capturar piezas que se encuentren en su camino.</p>
                    <p>Adicionalmente puede realizar un movimiento de enroque con la torre, en donde el rey se mueve dos posiciones hacia la torre y la torre se ubica en el lugar opuesto</p>
                    <p>Para la notacion de esta pieza se usa K antes de la coordenada, ejemplo Ke6</p>
                    <p>El rey no puede moverse a una casilla donde pueda ser capturado por una pieza enemiga</p>
                    <p>Si el rey no esta siendo capturado y no se puede mover a una casilla donde no sea capturado y ninguna pieza puede defenderlo se indica stale mate y la finalizacion del juego</p>
                    <p>Si el rey esta siendo capturado y se puede mover a una casilla donde no sea capturado se indica jaque y el jugador debe mover al rey a una casilla segura</p>
                    <p>Si el rey no puede moverse a una casilla segura y ninguna pieza puede defenderlo se indica jaque mate y la finalizacion del juego</p>
                </section>
                <section className='SecImagen'>
                    <img className='RulesIMG' src="/king.png" alt="Rey (King)" />
                </section>
            </div>
            <div className='Rules'>
                <section>
                    <h2>Estados de finalizacion:</h2>
                    <p>Jaque mate: Victoria de uno de los 2 lados, donde el rey de uno de los jugadores está siendo capturado y no tiene movimientos que lo saquen de la captura</p>
                    <p>Tablas (Stale mate): Empate, se otorga ¾ de la victoria para el jugador que realiza el stale mate, esta situación sucede cuando el rey no tiene lugares para moverse ya que implican su captura.</p>
                    <p>Abandono: Se otorga victoria al jugador que sigue en juego</p>
                    <p>Finalizacion por limite de tiempo: Se otorga victoria al jugador que aun posee tiempo para jugar</p>
                </section>
                <section className='SecImagen'>
                    <img className='RulesIMG' src="/Figuras/g-queen.png" alt="Reina (Queen)" />
                </section>
            </div>
        </div>
    )
}

export default Reglas;