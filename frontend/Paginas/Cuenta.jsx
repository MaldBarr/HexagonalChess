import React from 'react';
import Header from '../Modulos/header.jsx';

import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';

function Cuenta() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserInfo(decoded);
            } catch (error) {
                console.log("Error al decodificar el token", error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUserInfo(null);
    };


    return (
        <div>
            <Header />
            <h1>Cuenta</h1>
            {userInfo ? (
                <div>
                    <p>Bienvenido, {userInfo.username}</p>
                    <p>Email: {userInfo.email}</p>
                    <p>Elo: {userInfo.elo}</p>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
            ) : (
                <div>
                    <Link to="/Login"><h3>Iniciar sesión</h3></Link>
                    <Link to="/Registro"><h3>Registrarse</h3></Link>
                </div>
            )}
        </div>
    )
}

export default Cuenta;