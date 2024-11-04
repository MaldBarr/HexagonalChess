import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import axios from 'axios';
import Header from '../Modulos/header.jsx';
import '/style.css';

function Salas() {
    const navigate = useNavigate();
    const [lobbies, setLobbies] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    const token = localStorage.getItem("token");
    if (token) {
        console.log("El token es: " + token);
    }

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

    useEffect(() => {
        // Fetch lobby data from the backend
        axios.get('http://localhost:3000/Lobbies')
            .then(response => {
                setLobbies(response.data);
                console.log('Lobbies fetched:', response.data);
            })
            .catch(error => {
                console.error('Error fetching lobbies:', error);
            });
    }, []);

    const createLobby = () => {
        // Create a new lobby in the backend
        axios.post('http://localhost:3000/Lobbies', {id: lobbies.length + 2, user1: userInfo.id, elo1: userInfo.elo})
            .then(response => {
                setLobbies([...lobbies, response.data]);
                console.log('Lobby created:', response.data);
                navigate(`/Lobby/${lobbies.length + 2}`);
            })
            .catch(error => {
                console.error('Error creating lobby:', error);
            });
    };

    const startLobby = (id_Partida) => {
        // Update the lobby in the backend
        axios.put(`http://localhost:3000/lobbies/${id_Partida}`, { iniciado: 1, user2: userInfo.id})
            .then(response => {
                setLobbies(lobbies.map(lobby => 
                    lobby.id_Partida === id_Partida ? { ...lobby, iniciado: 1 } : lobby
                ));
            })
            .catch(error => {
                console.error('Error starting lobby:', error);
            });
    };


    return (
        <div>
            <Header />
            <h1>Salas disponibles</h1>
            {userInfo ? (
                <>
                    <button onClick={createLobby} className="create-lobby-button">Crear Sala</button>
                    <div>
                        {lobbies.filter(lobby => lobby.iniciado === 0).map(lobby => (
                            <div key={lobby.id_Partida} className='LobbyState'>
                                <h2>Sala {lobby.id_Partida}, elo {lobby.elo_white}</h2>
                                <Link to={`/Play/${lobby.id_Partida}`}><button className="play-button" onClick={() => startLobby(lobby.id_Partida)}>Jugar</button></Link>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>Cargando información del usuario...</p>
            )}
        </div>
    );
}

export default Salas;