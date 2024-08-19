import React from 'react';
import './style.css'
import javascriptLogo from './javascript.svg'
import Logo from './Figuras/g-queen.png'

import {useState} from 'react'
import {Link} from 'react-router-dom';
import Header from './Modulos/header.jsx'

function App() {

  return(
    <>
      <div className='main-body'>
        <Header />
        <section>
          <h1>Ajedrez Hexagonal de Glinski</h1>
          <p>
            El ajedrez hexagonal de Glinski es una variante del ajedrez en un tablero hexagonal de 91 casillas. 
            Fue inventado por Władysław Glinski en 1935 y se popularizo rapidamente por Europa. <br /><br />
            Esta variante del ajedrez es muy interesante y desafiante, ya que las piezas se mueven de una forma diferente a la del ajedrez tradicional.<br /><br />
            Para empezar a jugar, solo tienes que registrarte y crear una sala o unirte a una sala ya creada.<br /><br />
            Tambien puedes revisar las reglas del juego en la seccion de reglas.<br /><br />
          </p>
        </section>
        <section>
          <a href="https://vitejs.dev" target="_blank">
            <img src={Logo} className="logo"/>
          </a>
          <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
            <img src={javascriptLogo} className="logo vanilla" alt="JavaScript logo" />
          </a>
        </section>
      </div>
    </>
  )
}

export default App