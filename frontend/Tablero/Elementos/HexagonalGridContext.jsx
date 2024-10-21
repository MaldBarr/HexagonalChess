import React, { createContext, useState } from 'react';

export const HexGridContext = createContext();

export const HexGridProvider = ({ children }) => {
  const [hexagons, setHexagons] = useState([]);

  return (
    <HexGridContext.Provider value={{ hexagons, setHexagons }}>
      {children}
    </HexGridContext.Provider>
  );
};