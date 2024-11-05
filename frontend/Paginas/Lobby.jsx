import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Lobby() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [iniciado, setIniciado] = useState(0);

    const deleteLobby = () => {
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