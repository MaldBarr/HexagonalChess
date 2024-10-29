import React from 'react';
import { useDrag } from 'react-dnd';

const DraggablePiece = ({ piece, hexNotation, q, r, s }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'piece',
      item: { hexNotation,q ,r ,s },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));
  
    return (
      <div
        ref={drag}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',  // Within the hexagon
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',  // Center piece
          width: '100%',
          height: '100%',
          opacity: isDragging ? 0.5 : 1,
          cursor: 'pointer',
          zIndex: 2,  // To sure it's above the hexagon
        }}
      >
        <img
          src={piece}
          alt={`Piece ${piece} at ${hexNotation}`}
          style={{
            width: '100%', 
            height: '100%',
          }}
        />
      </div>
    );
  };


export default DraggablePiece;