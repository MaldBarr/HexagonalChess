import React, {useState, useEffect} from 'react';

import HexagonalChessBoard from './GridHexagonal';


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