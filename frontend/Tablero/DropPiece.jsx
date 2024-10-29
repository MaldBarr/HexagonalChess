import React from 'react';
import { useDrop } from 'react-dnd';
import { Hexagon, Text } from 'react-hexgrid';

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

const getHexColor = (q, r, s) => {
    if (whiteHex.some(([q1, r1, s1]) => q === q1 && r === r1 && s === s1)) return '#fefefe'; // Blanco
    if (darkHex.some(([q1, r1, s1]) => q === q1 && r === r1 && s === s1)) return '#568b56'; // Oscuro
    else return '#96e896';
    };

const DroppableHexagon = ({ q, r, s, movePiece, hexNotation, children }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'piece',
        drop: (item) => {
            const fromQ = item.q;
            const fromR = item.r;
            const fromS = item.s;
            movePiece(item.hexNotation, hexNotation, fromQ, fromR, fromS, q, r, s);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
    <g ref={drop}>
        <Hexagon q={q} r={r} s={s} style={{ fill: getHexColor(q,r,s)}}>
            <foreignObject x={-3} y={-4} width={6} height={6}>
                {children}
            </foreignObject>
            <Text style={{ fontSize: '1.5px', fill: 'black' }} x={0} y={3}>
                {hexNotation} {q},{r},{s}
            </Text> 
        </Hexagon>
    </g>
    );
};

export default DroppableHexagon;