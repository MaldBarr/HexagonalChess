import React, {useState, useEffect} from 'react';

import black_bishop from '../Figuras/b-bishop.png';
import black_knight from '../Figuras/b-knight.png';
import black_queen from '../Figuras/b-queen.png';
import black_rook from '../Figuras/b-rook.png';
import white_bishop from '../Figuras/w-bishop.png';
import white_knight from '../Figuras/w-knight.png';
import white_queen from '../Figuras/w-queen.png';
import white_rook from '../Figuras/w-rook.png';
import white_pawn from '../Figuras/w-pawn.png';
import black_pawn from '../Figuras/b-pawn.png';

import HexagonalChessBoard from './GridHexagonal';


const Game = () =>{
    const [pieces, setPieces] = useState({});
    useEffect(() => {
        // Set the initial pieces after the component mounts
        setPieces({
          b1: white_pawn,
          c1: white_rook,
        });
      }, []);
    return(
        <div>
            <HexagonalChessBoard pieces={pieces}/>
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