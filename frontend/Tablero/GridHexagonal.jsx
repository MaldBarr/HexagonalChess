import React from 'react';
import { HexGrid, Layout, Hexagon, Text } from 'react-hexgrid';
import { useDrop } from 'react-dnd';
import DraggablePiece from './DragPiece';
import DroppableHexagon from './DropPiece';
import { useState } from 'react';

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

const HexagonalChessBoard = () => {
  const hexagons = [];
  const boardRadius = 5;

  const [pieces, setPieces] = useState({
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
  });
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

  // Drag and drop
  /* OLD Version
  const [{ isOver }, drop] = useDrop({
    accept: 'piece',
    drop: (item, monitor) => {
      const newPosition = axialToChessNotation(item.q, item.r); // New hexagon position
      const piece = pieces[item.hexNotation]; // Get the piece being dragged

      setPieces((prevPieces) => {
        const newPieces = { ...prevPieces };
        delete newPieces[item.hexNotation]; // Remove piece from old position
        newPieces[newPosition] = piece; // Place piece at new position
        return newPieces;
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });*/

  const movePiece = (fromHex, toHex) => {
    if (!pieces[fromHex]) return;  // No piece to move from the original hex

    setPieces((prevPieces) => {
      const newPieces = { ...prevPieces };
      newPieces[toHex] = newPieces[fromHex];  // Move the piece to the new hex
      delete newPieces[fromHex];  // Remove the piece from the old hex
      return newPieces;
    });
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
                <DraggablePiece piece={pieces[hexNotation]} hexNotation={hexNotation} />
              )}
              {/* Show the hexagon notation
              <Text style={{ fontSize: '1.5px', fill: 'black' }} x={0} y={3}>
                  {hexNotation}
              </Text> 
              */}
              
            </DroppableHexagon>
          );
        })}
      </Layout>
    </HexGrid>
  );
};

export default HexagonalChessBoard;
