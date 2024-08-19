import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import App from './App.jsx';
import Reglas from './Paginas/Reglas.jsx';
import AboutUs from './Paginas/Nosotros.jsx';
import Cuenta from './Paginas/Cuenta.jsx';

function Main() {
  let location = useLocation();

  return (
      <Routes location={location}>
        <Route path="/" element={<App />} />
        <Route path="/rules" element={<Reglas />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Account" element={<Cuenta />} />
      </Routes>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="*" element={<Main />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
);