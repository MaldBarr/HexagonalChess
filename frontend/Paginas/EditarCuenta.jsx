import React from 'react';
import Header from '../Modulos/header.jsx';

import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import $ from 'jquery';

var data;

function EditAccount() {
    const [userInfo, setUserInfo] = useState(null);
    const [tokenCreationTime, setTokenCreationTime] = useState(null);

    axios.get('http://localhost:3000/Registro').then((response) => {
        console.log(response.data);
        data = response.data;
    }).catch((error) => {
        console.log(error);
        toast.error("Error al cargar los datos");
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.iat) {
                    const creationTime = new Date(decoded.iat * 1000);
                    setTokenCreationTime(creationTime.toLocaleString());
                }
                setUserInfo(decoded);
            } catch (error) {
                console.log("Error al decodificar el token", error);
            }
        }
    }, []);

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        if(validateEdit(userInfo)){
            toast.success("Datos editados correctamente");
            navigate("/Login");
        }
        else{
            toast.error("Error al editar los datos");
        }
    }

    return (
        <div>
            <Header />
            {userInfo ? (
                <div className="Parent">
                    <div className="Container">
                        <h1>Administracion de cuenta</h1>
                        <p>Bienvenido/a, {userInfo.username}</p>
                        <p>Aqui puedes editar los datos de tu cuenta</p>
                        <form onSubmit={handleSubmit}>
                            <p>Nombre de usuario</p>
                            <input type="text" id="username" placeholder={userInfo.username} required />
                            <p>Contraseña nueva</p>
                            <input type="password" id="password" placeholder="Contraseña" required />
                            <p>Confirmar contraseña nueva</p>
                            <input type="password" id="password2" placeholder="Confirmar contraseña" required />
                            <button type="submit">Editar cuenta</button>
                            <button onClick={() => navigate("/Account")}>Cancelar</button>
                        </form>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Error al cargar los datos</p>
                    <Link to="/"><h3>Inicio</h3></Link>
                </div>
            )}
        </div>
    )
}

function validateEdit(userInfo){
    var nombre = $("#username").val();
    var contra = $("#password").val();
    var contra2 = $("#password2").val();

    console.log("se ejecuto registro")
    var numCosasVerificadas = 0 ;

    if(nombre.length < 6){
        toast("El nombre de usuario debe tener al menos 6 caracteres");
    } else {
        data.forEach(element => {
            if(element.username == nombre){
                toast("El nombre de usuario no esta disponible");
            } else {
                numCosasVerificadas++;
            }
        });
    }

    if(contra.length < 8){
        toast("La contraseña debe tener al menos 8 caracteres");
    } else if (!/[A-Z]/.test(contra)){
        toast("La contraseña debe tener al menos una letra mayúscula");
    }
    else {
        numCosasVerificadas++;
    }

    if(contra != contra2){
        toast("Las contraseñas no coinciden");
    } else {
        numCosasVerificadas++;
    }

    if(numCosasVerificadas == 3){
        axios.put('http://localhost:3000/EditAccount', {
                username: nombre,
                password: contra,
                email: userInfo.email,
            }).then((response) => {
                console.log("datos: "+response.data);
            }).catch((error) => {
                console.log(error);
            });
        return true;
    }
    return false;
}

export default EditAccount;