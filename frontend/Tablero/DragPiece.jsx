import React from 'react';
import { useDrag } from 'react-dnd';

const DraggablePiece = ({ piece, hexNotation }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'piece',
      item: { hexNotation, piece },
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
          position: 'absolute',  // Ensure it's positioned within the hexagon
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',  // Center the piece in the hexagon
          width: '16px',
          height: '16px',
          opacity: isDragging ? 0.5 : 1,
          cursor: 'pointer',
          zIndex: 2,  // Make sure it's above the hexagon
        }}
      >
        <img
          src={piece}
          alt={`Piece at ${hexNotation}`}
          style={{
            width: '4px', 
            height: '4px',
          }}
        />
      </div>
    );
  };


export default DraggablePiece;