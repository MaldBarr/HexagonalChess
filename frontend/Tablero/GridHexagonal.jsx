import React from 'react';
import { HexGrid, Layout, Hexagon, Text } from 'react-hexgrid';
import { useDrop } from 'react-dnd';
import DraggablePiece from './DragPiece';
import DroppableHexagon from './DropPiece';
import { useState } from 'react';
import { toast } from 'react-toastify';

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

const pieces = {
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
}

const getPieceName = (piece) => {
  return piece.split('/')[2].split('.')[0]; // Extract piece name from the URL and remove the file extension
}

//Piece movements
const validMove = (piece, fromHex, toHex, fromQ, fromR, fromS, toQ, toR, toS) => {
  const pieceType = getPieceName(piece).split("-")[1]; // Extract piece type (e.g., 'pawn', 'rook')
  console.log("Validating move for", pieceType, "from", "Q", fromQ, "R", fromR, "S", fromS, "to", "Q", toQ, "R", toR, "S", toS);

  switch (pieceType) {

    case 'pawn':
      return isValidPawnMove(piece, fromQ, fromR, toQ, toR);
    case 'rook':
      return isValidRookMove(fromQ, fromR, fromS, toQ, toR, toS);
    case 'knight':
      return isValidKnightMove(fromQ, fromR, fromS, toQ, toR, toS);
    case 'bishop':
      return isValidBishopMove(fromQ, fromR, fromS, toQ, toR, toS);
    case 'queen':
      return isValidRookMove(fromQ, fromR, fromS, toQ, toR, toS) || isValidBishopMove(fromQ, fromR, fromS, toQ, toR, toS);
    case 'king':
      return isValidKingMove(fromQ, fromR, fromS, toQ, toR, toS);
    default:
      return false;
  }
}

const isValidPawnMove = (piece, fromQ, fromR, toQ, toR) => {
  //Only move one square forward
  piece = getPieceName(piece).split("-")[0];
  if (piece === "w" && toQ === fromQ && toR === fromR - 1) {
    return true;
  }
  return (toQ === fromQ && toR === fromR + 1);
}

const isValidRookMove = (fromQ, fromR, fromS, toQ, toR, toS) => {
  // Vertical movement
  if (fromQ === toQ && fromR !== toR && fromS !== toS) {
    return true;
  }

  // Diagonal movement (type 1)
  if (fromR === toR && fromS != toS && fromQ !== toQ) {
    return true;
  }

  // Diagonal movement (type 2)
  if (fromS === toS && fromR != toR && fromQ !== toQ) {
    return true;
  }
  toast.error("Movimiento inválido");
  return false;
}

const isValidKnightMove = (fromQ, fromR, fromS, toQ, toR, toS) => {
  // L shape movement (Superior left)
  if (toQ === fromQ - 1 && toR === fromR - 2 && toS === fromS + 3) {
    return true;
  }
  // L shape movement (Superior right)
  if (toQ === fromQ + 1 && toR === fromR - 3 && toS === fromS + 2) {
    return true;
  }
  // L shape movement (Upper left up)
  if (toQ === fromQ - 2 && toR === fromR -1 && toS === fromS + 3) {
    return true;
  }
  // L shape movement (Upper left down)
  if (toQ === fromQ - 3 && toR === fromR + 1 && toS === fromS + 2) {
    return true;
  }
  // L shape movement (Upper right up)
  if (toQ === fromQ + 2 && toR === fromR - 3 && toS === fromS + 1) {
    return true;
  }
  // L shape movement (Upper right down)
  if (toQ === fromQ + 3 && toR === fromR - 2 && toS === fromS + 1) {
    return true;
  }
  // L shape movement (Lower left up)
  if (toQ === fromQ - 3 && toR === fromR + 2 && toS === fromS + 1) {
    return true;
  }
  // L shape movement (Lower left down)
  if (toQ === fromQ - 2 && toR === fromR + 3 && toS === fromS - 1) {
    return true;
  }
  // L shape movement (Lower right up)
  if (toQ === fromQ + 3 && toR === fromR - 1 && toS === fromS - 2) {
    return true;
  }
  // L shape movement (Lower right down)
  if (toQ === fromQ + 2 && toR === fromR + 1 && toS === fromS - 3) {
    return true;
  }
  // L shape movement (Inferior left)
  if (toQ === fromQ - 1 && toR === fromR + 3 && toS === fromS - 2) {
    return true;
  }
  // L shape movement (Inferior right)
  if (toQ === fromQ + 1 && toR === fromR + 2 && toS === fromS - 3) {
    return true;
  }
  
  toast.error("Movimiento inválido");
  return false;
}

const isValidBishopMove = (fromQ, fromR, fromS, toQ, toR, toS) => {
  // Horizontal movement
  if (toR === fromR+1 && toS === fromS+1 && toQ !== fromQ || 
    toR === fromR-1 && toS === fromS-1 && toQ !== fromQ ||
    toR === fromR+2 && toS === fromS+2 && toQ !== fromQ ||
    toR === fromR-2 && toS === fromS-2 && toQ !== fromQ ||
    toR === fromR+3 && toS === fromS+3 && toQ !== fromQ ||
    toR === fromR-3 && toS === fromS-3 && toQ !== fromQ ||
    toR === fromR+4 && toS === fromS+4 && toQ !== fromQ ||
    toR === fromR-4 && toS === fromS-4 && toQ !== fromQ ||
    toR === fromR+5 && toS === fromS+5 && toQ !== fromQ ||
    toR === fromR-5 && toS === fromS-5 && toQ !== fromQ) {
    return true;
  }
  // Diagonal upLeft-downRight movement
  if (toQ === fromQ+1 && toR === fromR+1 && toS === fromS-2 || 
    toQ === fromQ-1 && toR === fromR-1 && toS === fromS+2 ||
    toQ === fromQ+2 && toR === fromR+2 && toS === fromS-4 ||
    toQ === fromQ-2 && toR === fromR-2 && toS === fromS+4 ||
    toQ === fromQ+3 && toR === fromR+3 && toS === fromS-6 ||
    toQ === fromQ-3 && toR === fromR-3 && toS === fromS+6 ||
    toQ === fromQ+4 && toR === fromR+4 && toS === fromS-8 ||
    toQ === fromQ-4 && toR === fromR-4 && toS === fromS+8 ||
    toQ === fromQ+5 && toR === fromR+5 && toS === fromS-10 ||
    toQ === fromQ-5 && toR === fromR-5 && toS === fromS+10) {
    return true;
  }
  // Diagonal upRight-downLeft movement
  if (toQ === fromQ-1 && toS === fromS-1 && toR === fromR+2 || 
    toQ === fromQ+1 && toS === fromS+1 && toR === fromR-2 ||
    toQ === fromQ-2 && toS === fromS-2 && toR === fromR+4 ||
    toQ === fromQ+2 && toS === fromS+2 && toR === fromR-4 ||
    toQ === fromQ-3 && toS === fromS-3 && toR === fromR+6 ||
    toQ === fromQ+3 && toS === fromS+3 && toR === fromR-6 ||
    toQ === fromQ-4 && toS === fromS-4 && toR === fromR+8 ||
    toQ === fromQ+4 && toS === fromS+4 && toR === fromR-8 ||
    toQ === fromQ-5 && toS === fromS-5 && toR === fromR+10 ||
    toQ === fromQ+5 && toS === fromS+5 && toR === fromR-10) {
    return true;
  }

  toast.error("Movimiento inválido");
  return false;
}

const isValidKingMove = (fromQ, fromR, fromS, toQ, toR, toS) => {
  // First bishop movement
  if (toR === fromR+1 && toS === fromS+1 && toQ !== fromQ || //Horizontal movement
    toR === fromR-1 && toS === fromS-1 && toQ !== fromQ ||
    toQ === fromQ+1 && toR === fromR+1 && toS === fromS-2 || //Diagonal upLeft-downRight movement
    toQ === fromQ-1 && toR === fromR-1 && toS === fromS+2 ||
    toQ === fromQ-1 && toS === fromS-1 && toR === fromR+2 || //Diagonal upRight-downLeft movement
    toQ === fromQ+1 && toS === fromS+1 && toR === fromR-2 ) {
    return true;
  }
  //First rook movement
  if (toQ === fromQ && toR === fromR+1 && toS === fromS-1 || //Vertical movement
    toQ === fromQ && toR === fromR-1 && toS === fromS+1 ||
    toQ === fromQ-1 && toR === fromR && toS === fromS+1|| //Upleft - Downright movement
    toQ === fromQ+1 && toR === fromR && toS === fromS-1||
    toQ === fromQ-1 && toR === fromR+1 && toS === fromS || //Upright - Downleft movement
    toQ === fromQ+1 && toR === fromR-1 && toS === fromS) {
    return true;
  }
  toast.error("Movimiento inválido");
  return false;
}

const HexagonalChessBoard = () => {
  const hexagons = [];
  const boardRadius = 5;

  const [_, setRender] = useState(false);
  // Crear hexagonos
  for (let q = -boardRadius; q <= boardRadius; q++) {
    for (let r = Math.max(-boardRadius, -q - boardRadius); r <= Math.min(boardRadius, -q + boardRadius); r++) {
      const s = -q - r;
      hexagons.push({ q, r, s });
    }
  }

  const axialToChessNotation = (q, r) => {
    const letters = 'abcdefghikl'; // Letras para mapear
    const boardOrigin = 5; // Tamaño del tablero
    const letter = letters[boardOrigin + q]; // Q para mapear letras
    var number = 0;
    if (q === -5){
      number = boardOrigin - r + Math.abs(q) - 5;
    }
    else if (q === -4 || q === 2){
      number = boardOrigin - r + Math.abs(q) - 4;
    }
    else if (q === -3){ 
      number = boardOrigin - r + Math.abs(q) - 3;
    }
    else if (q === -2 || q === 1){
      number = boardOrigin - r + Math.abs(q) - 2;
    }
    else if (q === -1){
      number = boardOrigin - r + Math.abs(q) - 1;
    }
    else if (q === 0){
      number = boardOrigin - r + Math.abs(q);
    }
    else if (q === 3){
      number = boardOrigin - r + Math.abs(q) - 6;
    }
    else if (q === 4){
      number = boardOrigin - r + Math.abs(q) - 8;
    }
    else if (q === 5){
      number = boardOrigin - r + Math.abs(q) - 10;
    }
    return `${letter}${number}`;
  };

  const movePiece = (fromHex, toHex,  fromQ, fromR, fromS, toQ, toR, toS) => {
    console.log("Moving piece",getPieceName(pieces[fromHex]),"from", fromHex, "to", toHex);
    if (!pieces[fromHex]) return;  // No piece to move from the original hex
    if (pieces[toHex] && getPieceName(pieces[toHex]).split('-')[0] === getPieceName(pieces[fromHex]).split('-')[0]){
      console.log(getPieceName(pieces[toHex]),"can't get captured by",getPieceName(pieces[fromHex]));
      toast.error("No puedes capturar tus propias piezas");
      return; // Prevent capturing own pieces
    }

    if (!validMove(pieces[fromHex], fromHex, toHex,fromQ, fromR, fromS, toQ, toR, toS)) return; // Check if the move is valid

    pieces[toHex] = pieces[fromHex];
    delete pieces[fromHex];
    setRender((prev) => !prev);
  };

  return (
    <HexGrid width={600} height={700}>
      <Layout size={{ x: 5, y: 5 }} flat={true} spacing={1.1} origin={{ x: 0, y: 0 }}>
        {hexagons.map(({q, r, s}) => {
          const hexNotation = axialToChessNotation(q, r-1);
          return (
            <DroppableHexagon
              key={`${q}-${r}-${s}`}
              q={q}
              r={r}
              s={s}
              movePiece={movePiece}
              hexNotation={hexNotation}
            >
              {pieces[hexNotation] && (
                <DraggablePiece piece={pieces[hexNotation]} hexNotation={hexNotation} q={q} r={r} s={s}/>
              )}
            </DroppableHexagon>
          );
        })}
      </Layout>
    </HexGrid>
  );
};

export default HexagonalChessBoard;
