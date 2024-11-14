import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

function Lobby() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [iniciado, setIniciado] = useState(0);
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

    const deleteLobby = () => {
        axios.put(`http://localhost:3000/Lobbies/${id}`, { iniciado: 2, user2: userInfo.id})
        .then(response => {
            setLobbies(lobbies.map(lobby => 
                lobby.id_Partida === id_Partida ? { ...lobby, iniciado: 1 } : lobby
            ));
        })
        .catch(error => {
            console.error('Error starting lobby:', error);
        });
        navigate('/');
    }

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(`http://localhost:3000/Lobbies/${id}`)
                .then(response => {
                    const lobby = response.data[0];
                    console.log('Lobby status:', lobby);
                    if (lobby.iniciado === 1) {
                        setIniciado(1);
                        clearInterval(interval);
                        // Take action when iniciado changes to 1
                        console.log('Lobby started:', lobby);
                        navigate(`/Play/${id}`);
                    }
                })
                .catch(error => {
                    console.error('Error fetching lobby status:', error);
                });
        }, 100); // Check cada 0.1 segundos
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [id, navigate]);

    return (
        <>
            <h1>Lobby {id}</h1>
            <p>Esperando oponente...</p>
            <button onClick={deleteLobby}>Rendirse</button>
        </>
    );
}

export default Lobby;