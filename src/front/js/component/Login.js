// Formulario de inicio de sesión de usuario.

import React, { useState } from "react";

import { useNavigate } from "react-router-dom"; //Te permite navegar a una nueva ruta dentro de tu aplicación. 
//útil para redirigir a los usuarios después de que se realicen ciertas acciones, como enviar un formulario.

import { BackendURL } from "../component/backendURL"; 
//variable que generalmente contiene la URL base del backend de la aplicación.Es útil para centralizar y reutilizar la URL del backend en diferentes partes del front-end.
// De esta manera, si la URL del backend cambia, solo necesitas actualizarla en un solo lugar en lugar de buscar y reemplazar en todo el código.
//Si la URL cambia, solo necesitas modificar backendURL.js.(componentes)


export const Login = () => {
    const [email, setEmail] = useState(""); //Estado Local del Componente: Es suficiente para manejar email, error y password, no hace falta meterlos en flux.js
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault(); //Esto es lo que nos permite  acceder a la info, si estamos registrados y logueados.


        // Validaciones
        if (!email || !password) {
            setError("Email y pasword, requeridos.");
            return;
        }
        setError("");


        const resp = await fetch(`${BackendURL}/api/token`, { //el fetch (${BackendURL}/api/signup) la BackendURL está en .env
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (resp.ok) {
            const data = await resp.json();
            sessionStorage.setItem("token", data.token); //se pone para mantener el token, a pesar que se refresque.
            navigate("/private");

        } else {
            const data = await resp.json();
            setError(data.msg ||"Error al iniciar la sesión");
        }
    };

    return ( //Inicio de Sesión
        <div>
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleLogin}> 
                {error && <div className="error">{error}</div>} {/* Muestra un mensaje de error si existe.*/} 
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password" //oculta el password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};



//  export const LogIn = () => {
//     const { store, actions } = useContext(Context);
//     const [email, setEmail] = useState("');
//     const [password, setPassword] = useState('');
//     const logIn = (email, password) =>
//     actions. login (email, password)
//     ｝


// return (
//     ‹div className="home d-flex align-items-center justify-content-center">
//     <div className="log-in-container text-center">
//     <div className="mt -5">
//     <img src={logIn} className="w-75" alt="" />
//     </ div>
//     <p className="fs-2 mt-3">¡Hola de nuevo!</p>
//     <p className="text-secondary">Bienvenido otra vez</p>
//     <div>
//     ‹div class="d-flex flex-column justify-content-center gap-4 px-5 mt -4">
//     <input tvpe="email" class="form-control" placeholder="Email" aria-label="Email"
//     aria-describedby="basic-addon1" onChange={(e) => setEmail (e. target.value)} value={email}/>