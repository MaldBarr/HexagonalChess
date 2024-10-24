import React, {useState, useEffect} from 'react';


import black_bishop from '../Figuras/b-bishop.png';
import black_knight from '../Figuras/b-knight.png';
import black_queen from '../Figuras/b-queen.png';
import black_rook from '../Figuras/b-rook.png';
import black_king from '../Figuras/b-king.png';
import white_bishop from '../Figuras/w-bishop.png';
import white_knight from '../Figuras/w-knight.png';
import white_queen from '../Figuras/w-queen.png';
import white_rook from '../Figuras/w-rook.png';
import white_king from '../Figuras/w-king.png';
import white_pawn from '../Figuras/w-pawn.png';
import black_pawn from '../Figuras/b-pawn.png';

import HexagonalChessBoard from './GridHexagonal';

const initialPieces = {
    //white pieces
    b1: white_pawn,
    c2: white_pawn,
    d3: white_pawn,
    e4: white_pawn,
    f5: white_pawn,
    g4: white_pawn,
    h3: white_pawn,
    i2: white_pawn,
    k1: white_pawn,
    c1: white_rook,
    d1: white_knight,
    e1: white_queen,
    f1: white_bishop,
    f2: white_bishop,
    f3: white_bishop,
    g1: white_king,
    h1: white_knight,
    i1: white_rook,

    //black pieces
    b7: black_pawn,
    c7: black_pawn,
    d7: black_pawn,
    e7: black_pawn,
    f7: black_pawn,
    g7: black_pawn,
    h7: black_pawn,
    i7: black_pawn,
    k7: black_pawn,
    c8: black_rook,
    d9: black_knight,
    e10: black_queen,
    f11: black_bishop,
    f10: black_bishop,
    f9: black_bishop,
    g10: black_king,
    h9: black_knight,
    i8: black_rook
};

const Game = () =>{
    return(
        <div>
            <HexagonalChessBoard/>
        </div>
    )
};

export const checkGameOver = (board, currentTurn, whiteFigures, blackFigures) => {
    const figures = currentTurn === 'black' ? blackFigures : whiteFigures;
    const enemyFigures = currentTurn === 'black' ? whiteFigures : blackFigures;
    for (const fig of figures) {
        if (fig.getFigureLegalMoves(board, enemyFigures).length) return false;
    };
    return true;
}

export default Game;