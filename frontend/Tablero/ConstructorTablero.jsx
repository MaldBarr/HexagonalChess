import React from 'react';

import black_bishop from 'Figuras/b-bishop.png';
import black_knight from 'Figuras/b-knight.png';
import black_queen from 'Figuras/b-queen.png';
import black_rook from 'Figuras/b-rook.png';
import white_bishop from 'Figuras/w-bishop.png';
import white_knight from 'Figuras/w-knight.png';
import white_queen from 'Figuras/w-queen.png';
import white_rook from 'Figuras/w-rook.png';

export function initialSetUp() {
    const arr = [];
    let colorShouldInverse = false;

    for (let i = 1; i <= 91; i++) {
        const square = new Square(i, i % 2 === Number(colorShouldInverse) ? 'var(--primaryDark)' : 'var(--secondary)');
        arr.push(square);
        if (i % 11 === 0) colorShouldInverse = !colorShouldInverse;
    }
    return arr;
}

export const firstCol = [1, 12, 23, 34, 45, 56];
export const secondCol = [2, 13, 24, 35, 46, 57, 67];
export const thirdCol = [3, 14, 25, 36, 47, 58, 68, 76];
export const fourthCol = [4, 15, 26, 37, 48, 59, 69, 77, 83];
export const fifthCol = [5, 16, 27, 38, 49, 60, 70, 78, 84, 88];
export const sixthCol = [6, 17, 28, 39, 50, 61, 71, 79, 85, 89, 91];
export const seventhCol = [7, 18, 29, 40, 51, 62, 72, 80, 86, 90];
export const eighthCol = [8, 19, 30, 41, 52, 63, 73, 81, 87];
export const ninthCol = [9, 20, 31, 42, 53, 64, 74, 82];
export const tenthCol = [10, 21, 32, 43, 54, 65, 75];
export const eleventhCol = [11, 22, 33, 44, 55, 66];


const imageSources = { black_bishop, black_knight, black_queen, black_rook, white_bishop, white_knight, white_queen, white_rook };

export const checkGameOver = (board, currentTurn, whiteFigures, blackFigures) => {
    const figures = currentTurn === 'black' ? blackFigures : whiteFigures;
    const enemyFigures = currentTurn === 'black' ? whiteFigures : blackFigures;
    for (const fig of figures) {
        if (fig.getFigureLegalMoves(board, enemyFigures).length) return false;
    };
    return true;
}