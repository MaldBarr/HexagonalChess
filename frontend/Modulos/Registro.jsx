import { Link, useLocation } from "react-router-dom";
import React from 'react';
import './CSS/Login.css';
import FetchPaises from './FetchPaises.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var data;

function register() {
    axios.get('http://localhost:3000/Registro').then((response) => {
        console.log(response.data);
        data = response.data;
    }).catch((error) => {
        console.log(error);
        toast.error("Error al cargar los datos");
    });

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        if(validateRegister()){
            toast.success("Registro exitoso");
            navigate("/Login");
        }
        else{toast.error("Error al registrar");}
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

    console.log("nombre: "+nombre);
    if(nombre.length < 6){
        toast.error("El nombre de usuario debe tener al menos 6 caracteres");
    } else {
        if (data.length == 0){
            console.log("nombre verificado");
            numCosasVerificadas++;
        }
        else{
            data.forEach(element => {
                if(element.username === nombre){
                    console.log("El nombre de usuario no esta disponible");
                } else {
                    console.log("nombre verificado");
                    numCosasVerificadas++;
                }
            });
        }
    }
    if(!validarCorreoElectronico(email)){
        toast.error("Correo electronico invalido");
    } else {
        if (data.length == 0){
            console.log("correo verificado");
            numCosasVerificadas++;
        }
        else {
            data.forEach(element => {
                if(element.email == email){
                    toast.error("El correo ya esta en uso");
                } else {
                    console.log("email: "+email);
                    numCosasVerificadas++;
                }
            });
        }
    }

    if(pais == null){
        toast("Seleccione un pais");
    } else {
        console.log("pais: "+pais);
        numCosasVerificadas++;
    }

    if(contra.length < 8){
        toast.error("La contraseña debe tener al menos 8 caracteres");
    } else if (!/[A-Z]/.test(contra)){
        toast.error("La contraseña debe tener al menos una letra mayúscula");
    }
    else {
        console.log("contra lista");
        numCosasVerificadas++;
    }

    if(contra != contra2){
        toast.error("Las contraseñas no coinciden");
    } else {
        console.log("contras iguales");
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