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
import EditAccount from './Paginas/EditarCuenta.jsx';
import LoginAdm from './Modulos/LoginAdm.jsx';
import Lobby from './Paginas/Lobby.jsx';

import { ToastContainer } from 'react-toastify';

function Main() {
  let location = useLocation();

  return (
    <>
      <ToastContainer/>
      <Routes location={location}>
        <Route path="/" element={<App />} />
        <Route path="/Rules" element={<Reglas />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Account" element={<Cuenta />} />
        <Route path='/Salas' element={<Salas />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Play/:id" element={<Juego />} />
        <Route path="/Adm" element={<Administrador />} />
        <Route path="/EditAccount" element={<EditAccount />} />
        <Route path="/LoginAdm" element={<LoginAdm />} />
        <Route path="/Lobby/:id" element={<Lobby />} />
      </Routes>
    </>
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