import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import App from './App.jsx';
import Reglas from './Paginas/Reglas.jsx';
import AboutUs from './Paginas/Nosotros.jsx';
import Cuenta from './Paginas/Cuenta.jsx';
import Salas from './Paginas/Salas.jsx';
import Registro from './Modulos/Registro.jsx';
import Login from './Modulos/Login.jsx';
import Juego from './Paginas/Juego.jsx';
import Administrador from './Paginas/Administracion.jsx';

function Main() {
  let location = useLocation();

  return (
      <Routes location={location}>
        <Route path="/" element={<App />} />
        <Route path="/Rules" element={<Reglas />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Account" element={<Cuenta />} />
        <Route path='/Salas' element={<Salas />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Play" element={<Juego />} />
        <Route path="/Adm" element={<Administrador />} />
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