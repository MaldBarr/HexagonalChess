import { Link, useLocation } from "react-router-dom";
import React from 'react';
import './CSS/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';


function Login() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        validateLogin();
    }

    const validateLogin = () => {
        console.log("se esta ejecutando el login");
        var email = $("#email").val();
        var contra = $("#password").val();
        var validateMail;
        var validatePass;

        if (!validarCorreoElectronico(email)){
            validateMail = false;
        } else {
            validateMail = true;
        }
        if (contra == "") {
            validatePass = false;
        } else {
            validatePass = true;
        }

        if (validateMail && validatePass) {
            axios.post('http://localhost:3000/Login', {
                email: email,
                password: contra
            }).then((response) => {
                console.log(response.data);
                if(response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    alert("Inicio de sesión exitoso");
                    navigate("/");
                } else {
                    alert("Correo o contraseña incorrectos");
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    return (
        <div className="Parent">
            <div className="Container">
                <Link to="/">Inicio</Link>
                <h1>Iniciar sesión</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" id="email" placeholder="Correo" required />
                    <input type="password" id="password" placeholder="Contraseña" required />
                    <button type="submit">Iniciar sesión</button>
                </form>
                <p>¿No tienes una cuenta? <Link to="/Registro">Registrate</Link></p>
                <p>Olvidaste tu Contraseña</p>
            </div>
        </div>
    )
}


function validarCorreoElectronico(correo) {
    // Expresión regular para validar direcciones de correo electrónico
    var expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
    // Usar el método test para verificar si el correo coincide con la expresión regular
    return expresionRegular.test(correo);
}

export default Login;