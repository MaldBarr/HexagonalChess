import { Link, useLocation } from "react-router-dom";
import React from 'react';
import './CSS/Login.css';
import FetchPaises from './FetchPaises.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

var data;

function register() {
    axios.get('http://localhost:3000/Registro').then((response) => {
        console.log(response.data);
        data = response.data;
    }).catch((error) => {
        console.log(error);
    });

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        if(validateRegister()){
            alert("Registro exitoso");
            navigate("/Login");
        }
    }

    return (
        <div className="Parent">
            <div className="Container">
                <Link to="/">Inicio</Link>
                <h1>Registro</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" id="username" placeholder="Nombre de usuario" required />
                    <input type="email" id="email" placeholder="Correo electronico" required />
                    <FetchPaises/>
                    <input type="password" id="password" placeholder="Contraseña" required />
                    <input type="password" id="password2" placeholder="Confirmar contraseña" required />
                    <button type="submit">Registrarse</button>
                </form>
                <p>¿Ya tienes una cuenta? <Link to="/Login">Inicia sesión</Link></p>
            </div>
        </div>
    )
} 

function validateRegister(){
    var nombre = $("#username").val();
    var email = $("#email").val();
    var pais = $("#pais").val();
    var contra = $("#password").val();
    var contra2 = $("#password2").val();
    console.log("se ejecuto registro")
    var numCosasVerificadas = 0 ;

    if(nombre.length < 6){
        alert("El nombre de usuario debe tener al menos 6 caracteres");
    } else {
        data.forEach(element => {
            if(element.username == nombre){
                alert("El nombre de usuario no esta disponible");
            } else {
                numCosasVerificadas++;
            }
        });
    }
    if(!validarCorreoElectronico(email)){
        alert("Correo electronico invalido");
    } else {
        data.forEach(element => {
            if(element.email == email){
                alert("El correo ya esta en uso");
            } else {
                numCosasVerificadas++;
            }
        });
    }

    if(pais == null){
        alert("Seleccione un pais");
    } else {
        numCosasVerificadas++;
    }

    if(contra.length < 8){
        alert("La contraseña debe tener al menos 8 caracteres");
    } else if (!/[A-Z]/.test(contra)){
        alert("La contraseña debe tener al menos una letra mayúscula");
    }
    else {
        numCosasVerificadas++;
    }

    if(contra != contra2){
        alert("Las contraseñas no coinciden");
    } else {
        numCosasVerificadas++;
    }

    console.log("numCosasVerificadas: "+numCosasVerificadas);

    if(numCosasVerificadas == 5){
        axios.put('http://localhost:3000/Registro', {
                username: nombre,
                email: email,
                password: contra,
                pais: pais
            }).then((response) => {
                console.log("datos: "+response.data);
            }).catch((error) => {
                console.log(error);
            });
        return true;
    }
    return false;
}

function validarCorreoElectronico(correo) {
    // Expresión regular para validar direcciones de correo electrónico
    var expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
    // Usar el método test para verificar si el correo coincide con la expresión regular
    return expresionRegular.test(correo);
}

export default register;