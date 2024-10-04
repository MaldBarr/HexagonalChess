import bPawn from 'Figuras/b-pawn.png';
import bBishop from 'Figuras/b-bishop.png';
import bKnight from 'Figuras/b-knight.png';
import bQueen from 'Figuras/b-queen.png';
import bRook from 'Figuras/b-rook.png';
import bKing from 'Figuras/b-king.png';

import wPawn from 'Figuras/w-pawn.png';
import wBishop from 'Figuras/w-bishop.png';
import wKnight from 'Figuras/w-knight.png';
import wQueen from 'Figuras/w-queen.png';
import wRook from 'Figuras/w-rook.png';
import wKing from 'Figuras/w-king.png';

import Figure from './Figura';

import {firstCol, secondCol, thirdCol, fourthCol, fifthCol, sixthCol, seventhCol, eighthCol, ninthCol, tenthCol, eleventhCol} from '../ConstructorTablero';

export default class Square {
    constructor(position, color) {
        this.position = position;
        this.color = color;
        this.occupiedBy = null;
        this.intialSetUp(position);
        this.name = `${this.getSquareLetter(position)}${this.getSquareNumber(position)}`;
    }

    intialSetUp(p) {
        //Peones
        if (p >= 67 && p <= 75) this.occupiedBy = new Figure('black', 'pawn', { src: bPawn, alt: 'Peon Negro' }, p);
        if ( p === 2 ||  p === 14 || p === 26 || p === 38 || p === 50 || p === 40 || p === 30 || p === 20 || p === 10) this.occupiedBy = new Figure('white', 'pawn', { src: wPawn, alt: 'Peon Blanco' }, p);

        //Piezas Lado Blanco
        if (p === 3 || p === 9) this.occupiedBy = new Figure('white', 'rook', { src: bRook, alt: 'Torre Blanca' }, p);
        if (p === 4 || p === 8) this.occupiedBy = new Figure('white', 'knight', { src: bKnight, alt: 'Caballo Blanco' }, p);
        if (p === 6 || p === 17 || p === 28) this.occupiedBy = new Figure('white', 'bishop', { src: bBishop, alt: 'Alfil Blanco' }, p);
        if (p === 5) this.occupiedBy = new Figure('white', 'queen', { src: bQueen, alt: 'Reina Blanca' }, p);
        if (p === 7) this.occupiedBy = new Figure('white', 'king', { src: bKing, alt: 'Rey Blanco' }, p);

        //Piezas Lado Negro
        if (p === 76 || p === 82) this.occupiedBy = new Figure('black', 'rook', { src: wRook, alt: 'Torre Negra' }, p);
        if (p === 83 || p === 87) this.occupiedBy = new Figure('black', 'knight', { src: wKnight, alt: 'Caballo Negro' }, p);
        if (p === 85 || p === 89 || p === 91) this.occupiedBy = new Figure('black', 'bishop', { src: wBishop, alt: 'Alfil Negro' }, p);
        if (p === 88) this.occupiedBy = new Figure('black', 'queen', { src: wQueen, alt: 'Reina Negra' }, p);
        if (p === 90) this.occupiedBy = new Figure('black', 'king', { src: wKing, alt: 'Rey Negro' }, p);
    }

    getSquareLetter(p) {
        if (firstCol.includes(p)) return 'a';
        if (secondCol.includes(p)) return 'b';
        if (thirdCol.includes(p)) return 'c';
        if (fourthCol.includes(p)) return 'd';
        if (fifthCol.includes(p)) return 'e';
        if (sixthCol.includes(p)) return 'f';
        if (seventhCol.includes(p)) return 'g';
        if (eighthCol.includes(p)) return 'h';
        if (ninthCol.includes(p)) return 'i';
        if (tenthCol.includes(p)) return 'k';
        return 'l';
    }

    getSquareNumber(p) {
        if (p <= 11) return 1;
        if (p <= 22) return 2;
        if (p <= 33) return 3;
        if (p <= 44) return 4;
        if (p <= 55) return 5;
        if (p <= 66) return 6;
        if (p <= 75) return 7;
        if (p <= 82) return 8;
        if (p <= 87) return 9;
        if (p <= 90) return 10;
        return 11;
    }
}