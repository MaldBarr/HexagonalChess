import React, {useEffect} from 'react';
import HexagonalChessBoard from '/Tablero/GridHexagonal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { toast } from 'react-toastify';

import whitePawn from '../Figuras/w-pawn.png';
import blackPawn from '../Figuras/b-pawn.png';

import {useState} from 'react';
import {Link} from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import calcularElo from '../Modulos/Elo';
import Chat from '../Modulos/Chat';

function Juego() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [lobby, setLobby] = useState(null);
    const [whiteInfo, setWhiteInfo] = useState(null);
    const [blackInfo, setBlackInfo] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log(decoded);
                setUserInfo(decoded);
            } catch (error) {
                console.log("Error al decodificar el token", error);
            }
        }
    }, []);


    const roomId = id;

    const [checkKingCaptured, setCheckKingCaptured] = useState({ kingCaptured: false, color: "" });

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

    //End of the game
    useEffect(() => {
        if (checkKingCaptured.kingCaptured) {
            axios.post(`http://localhost:3000/Lobbies/${id}/end`, {
                resultado: checkKingCaptured.color === 'white' ? '2' : '1' //2 para victoria del equipo negro, 1 para victoria del equipo blanco
            })
            .then(response => {
                console.log('Game ended:', response.data);
            })
            .catch(error => {
                console.error('Error ending game:', error);
            });

            //Cambios en el Elo de los jugadores
            var EloWhite = whiteInfo.rating;
            var EloBlack = blackInfo.rating;
            console.log("calculando elo")
            if (checkKingCaptured.color === 'white'){
                EloWhite = calcularElo(EloWhite,EloBlack,0)
                EloBlack = calcularElo(EloBlack,EloWhite,1)
                console.log("new elo white",EloWhite,"new elo black",EloBlack)
            } else {
                EloWhite = calcularElo(EloWhite,EloBlack,1)
                EloBlack = calcularElo(EloBlack,EloWhite,0)
                console.log("new elo white",EloWhite,"new elo black",EloBlack)
            }

            axios.put(`http://localhost:3000/Usuarios/${lobby.id_player_white}/Elo`, {
                rating: EloWhite
            })
            .then(response => {
                console.log('White player rating updated:', response.data);
            })
            .catch(error => {
                console.error('Error updating white player rating:', error);
            });

            axios.put(`http://localhost:3000/Usuarios/${lobby.id_player_black}/Elo`, {
                rating: EloBlack
            })
            .then(response => {
                console.log('Black player rating updated:', response.data);
            })
            .catch(error => {
                console.error('Error updating black player rating:', error);
            });

            navigate('/Salas');
        }
    }, [checkKingCaptured]);

    const forfeit = () => {
        //Cual jugador se rinde
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        var playerForfeiting = lobby.id_player_white === decoded.id ? 'white' : 'black';
        
        //Cambios en el Elo de los jugadores
        var EloWhite = whiteInfo.rating;
        var EloBlack = blackInfo.rating;
        console.log("calculando elo")
        if (playerForfeiting === 'white'){
            EloWhite = calcularElo(EloWhite,EloBlack,0)
            EloBlack = calcularElo(EloBlack,EloWhite,1)
            console.log("new elo white",EloWhite,"new elo black",EloBlack)
        } else {
            EloWhite = calcularElo(EloWhite,EloBlack,1)
            EloBlack = calcularElo(EloBlack,EloWhite,0)
            console.log("new elo white",EloWhite,"new elo black",EloBlack)
        }

        axios.post(`http://localhost:3000/Lobbies/${id}/end`, {
            resultado: playerForfeiting === 'white' ? '2' : '1' //2 para victoria del equipo negro, 1 para el equipo blanco
        })
        .then(response => {
            console.log('Game ended:', response.data);
            toast.success(`${playerForfeiting === 'white' ? 'Jugador Blanco' : 'Jugador negro'} se ha rendido.`)
            navigate('/Salas');
        })
        .catch(error => {
            console.error('Error ending game:', error);
        });
    }

    //Check si el otro jugador se rinde
    

    return (
        <div style={{ width: '100vw' }}>
            <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <section style={{ display: 'flex', boxShadow: lobby && lobby.turn === 'white' ? '0 0 10px 5px yellow' : 'none' }}>
                    <img src={whitePawn} alt="White Pawn" />
                    <div>
                        <h2>{whiteInfo ? whiteInfo.username : 'Loading...'}</h2>
                        <p>{whiteInfo ? whiteInfo.rating : 'Loading...'}</p>
                    </div>
                </section>
                <section style={{ display: 'flex', boxShadow: lobby && lobby.turn === 'black' ? '0 0 10px 5px yellow' : 'none' }}>
                    <img src={blackPawn} alt="Black Pawn" />
                    <div>
                        <h2>{blackInfo ? blackInfo.username : 'Loading...'}</h2>
                        <p>{blackInfo ? blackInfo.rating : 'Loading...'}</p>
                    </div>
                </section>
                <Link onClick={forfeit}><button className="forfeit-button">Rendirse</button></Link>
            </section>
            <section style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <DndProvider backend={HTML5Backend}>
                    {userInfo && lobby ? (<HexagonalChessBoard checkKingCaptured={checkKingCaptured} setCheckKingCaptured={setCheckKingCaptured} roomId={roomId} username={userInfo.username} PColor={lobby && lobby.id_player_white === userInfo.id ? 'w' : 'b'} />) : (<></>)}
                </DndProvider>
                {userInfo ? (<Chat roomId={roomId} username={userInfo.username}/>) : (<></>)}
            </section>
        </div>
    )
}

export default Juego;