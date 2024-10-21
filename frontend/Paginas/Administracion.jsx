import React from 'react';
import Header from '../Modulos/header.jsx';

import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Administrador() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/Adm').then((response) => {
            setUsuarios(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div>
            <Header />
            <h1>Administracion</h1>
            <p>En esta sección se encuentran las opciones de usuarios como administrador</p>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Correo</th>
                        <th>Rating</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => {
                        return (
                            <tr key={usuario.id_Usuario}>
                                <td>{usuario.id_Usuario}</td>
                                <td>{usuario.username}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.rating}</td>
                                <td>
                                    <Link to={`/EditarUsuario/${usuario.id_Usuario}`}>Editar</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Administrador;