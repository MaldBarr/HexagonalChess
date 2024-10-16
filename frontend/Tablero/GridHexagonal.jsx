import React from 'react';
import { HexGrid, Layout, Hexagon, Text } from 'react-hexgrid';

const whiteHex = [
  //first column
  [-5, 0, 5],
  [-5, 3, 2],
  //second column
  [-4, 1, 3],
  [-4, 4, 0],
  //third column
  [-3, -1, 4],
  [-3, 2, 1],
  [-3, 5, -2],
  //fourth column
  [-2,-3,5],
  [-2, 0, 2],
  [-2, 3, -1],
  //fifth column
  [-1, -2, 3],
  [-1, 1, 0],
  [-1, 4, -3],
  //sixth column
  [0, -4, 4],
  [0, -1, 1],
  [0, 2, -2],
  [0, 5, -5],
  //seventh column
  [1, -3, 2],
  [1, 0, -1],
  [1, 3, -4],
  //eighth column
  [2, -5, 3],
  [2, -2, 0],
  [2, 1, -3],
  //ninth column
  [3, -4, 1],
  [3, -1, -2],
  [3, 2, -5],
  //tenth column
  [4, -3, -1],
  [4, 0, -4],
  //eleventh column
  [5, -5, 0],
  [5, -2, -3]
];

const darkHex = [
  //first column
  [-5, 5, 0],
  [-5, 2, 3],
  //second column
  [-4, 3, 1],
  [-4, 0, 4],
  //third column
  [-3, 4, -1],
  [-3, 1, 2],
  [-3, -2, 5],
  //fourth column
  [-2, 5, -3],
  [-2, 2, 0],
  [-2, -1, 3],
  //fifth column
  [-1, 3, -2],
  [-1, 0, 1],
  [-1, -3, 4],
  //sixth column
  [0, 4, -4],
  [0, 1, -1],
  [0, -2, 2],
  [0, -5, 5],
  //seventh column
  [1, 2, -3],
  [1, -1, 0],
  [1, -4, 3],
  //eighth column
  [2, -3, 1],
  [2, 0, -2],
  [2, 3, -5],
  //ninth column
  [3, 1, -4],
  [3, -2, -1],
  [3, -5, 2],
  //tenth column
  [4, -4, 0],
  [4, -1, -3],
  //eleventh column
  [5, -3, -2],
  [5, 0, -5]
];

const HexagonalChessBoard = () => {
  const hexagons = [];
  const boardRadius = 5;

  // Crear hexagonos
  for (let q = -boardRadius; q <= boardRadius; q++) {
    for (let r = Math.max(-boardRadius, -q - boardRadius); r <= Math.min(boardRadius, -q + boardRadius); r++) {
      const s = -q - r;
      hexagons.push({ q, r, s });
    }
  }

  
  // Alternar colores de los hexágonos
  const getHexColor = (q, r, s) => {
    if (whiteHex.some(([q1, r1, s1]) => q === q1 && r === r1 && s === s1)) return '#fefefe'; // Blanco
    if (darkHex.some(([q1, r1, s1]) => q === q1 && r === r1 && s === s1)) return '#568b56'; // Oscuro
    else return '#96e896';
  };

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

  return (
    <HexGrid width={600} height={700}>
      <Layout size={{ x: 4, y: 4 }} flat={true} spacing={1.1} origin={{ x: 0, y: 0 }}>
        {hexagons.map(({q, r, s}) => {
          const hexNotation = axialToChessNotation(q, r-1);
          return (
            <g key={`${q}-${r}-${s}`} style={{ fill: getHexColor(q, r, s) }}>
              <Hexagon q={q} r={r} s={s}>
                <Text style={{ fontSize: '1.5px', fill: 'black' }} x={0} y={3}>
                  {hexNotation}
                </Text>
            </Hexagon>
          </g>
          );
        })}
      </Layout>
    </HexGrid>
  );
};

export default HexagonalChessBoard;
