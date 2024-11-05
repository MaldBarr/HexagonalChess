import React, {useEffect} from 'react';
import Game from '../Tablero/ConstructorTablero.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import {useParams} from 'react-router-dom';

import whitePawn from '../Figuras/w-pawn.png';
import blackPawn from '../Figuras/b-pawn.png';

import {useState} from 'react';
import {Link} from 'react-router-dom';

function Juego() {
    const {id} = useParams();
    const [lobby, setLobby] = useState(null);
    const [whiteInfo, setWhiteInfo] = useState(null);
    const [blackInfo, setBlackInfo] = useState(null);

    //Info del juego
    useEffect(() => {
        axios.get(`http://localhost:3000/Lobbies/${id}`)
            .then(response => {
                setLobby(response.data[0]);
                console.log('Lobby fetched:', response.data[0]);
            })
            .catch(error => {
                console.error('Error fetching lobby:', error);
            });
    }, []);

    //Info del jugador blanco
    useEffect(() => {
        if (lobby && lobby.id_player_white) {
            console.log(lobby.id_player_white);
            axios.get(`http://localhost:3000/Usuarios/${lobby.id_player_white}`)
                .then(response => {
                    setWhiteInfo(response.data[0]);
                    console.log('White player fetched:', response.data[0]);
                })
                .catch(error => {
                    console.error('Error fetching white player:', error);
                });
        }
    }, [lobby]);

    //Info del jugador negro
    useEffect(() => {
        if (lobby && lobby.id_player_white) {
            console.log(lobby.id_player_black);
            axios.get(`http://localhost:3000/Usuarios/${lobby.id_player_black}`)
                .then(response => {
                    setBlackInfo(response.data[0]);
                    console.log('Black player fetched:', response.data[0]);
                })
                .catch(error => {
                    console.error('Error fetching black player:', error);
                });
        }
    }, [lobby]);

    return (
        <div>
            <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <img src={whitePawn} alt="White Pawn"/>
                    <div>
                        <h2>{whiteInfo ? whiteInfo.username : 'Loading...'}</h2>
                        <p>{whiteInfo ? whiteInfo.rating : 'Loading...'}</p>
                    </div>
                    <div className="Separador"></div>
                    <img src={blackPawn} alt="Black Pawn"/>
                    <div>
                        <h2>{blackInfo ? blackInfo.username : 'Loading...'}</h2>
                        <p>{blackInfo ? blackInfo.rating : 'Loading...'}</p>
                    </div>
            </section>
            <DndProvider backend={HTML5Backend}>
                <Game />
            </DndProvider>
            <Link to="/Salas"><button className="forfeit-button">Rendirse</button></Link>
        </div>
    )
}

export default Juego;