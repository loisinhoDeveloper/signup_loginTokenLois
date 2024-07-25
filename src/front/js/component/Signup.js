/* Formulario de registro de usuario. */
import '../../styles/index.css';
import React, { useState } from "react";

import { useNavigate } from "react-router-dom"; //Te permite navegar a una nueva ruta dentro de tu aplicación. 
//útil para redirigir a los usuarios después de que se realicen ciertas acciones, como enviar un formulario.

import { BackendURL } from "../component/backendURL"; 
//variable que generalmente contiene la URL base del backend de la aplicación.Es útil para centralizar y reutilizar la URL del backend en diferentes partes del front-end.
// De esta manera, si la URL del backend cambia, solo necesitas actualizarla en un solo lugar en lugar de buscar y reemplazar en todo el código.
//Si la URL cambia, solo necesitas modificar backendURL.js.(componentes)

export const Signup = () => {
    // Estado del formulario con los campos adicionales
    const [formulario, setFormulario] = useState({
        username: '',
        nombre: '',
        apellidos: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Manejo los cambios en el formulario y actualiza e estado al escribir en uno de los campos de entrada (return signup)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value }); //crea una nueva copia del objeto formulario con todas sus propiedades.
    };

    //Defino la función handleSignup que maneja el envío del formulario despues del registro.
    const handleSignup = async (e) => {
        e.preventDefault(); // Previene la recarga de la página al enviar el formulario

        // Validaciones relacionadas con routes.py
        if (!formulario.username || !formulario.nombre || !formulario.apellidos || !formulario.email || !formulario.password || !formulario.confirmPassword){
            setError("Email y pasword, requeridos.");
            return;
        }

        if (password.length < 6) {
            setError("Demasiado corto, minimo 6 caracteres.");
            return;
        }

        if (form.password !== formulario.confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setError("");

        const resp = await fetch(`${BackendURL}/api/signup`, { // Realiza una solicitud POST al BACKEND para REGISTRAR EL USUARIO. el fetch (${BackendURL}/api/signup) la BackendURL está en .env
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: formulario.username,
                nombre: formulario.nombre,
                apellidos: formulario.apellidos,
                email: formulario.email,
                password: formulario.password,
                confirmPassword: formulario.confirmPassword  // No se necesita en el BACKEND, PERO se incluye en la solicitud para la validación en el cliente.
            })
        });

        // Si la respuesta DESDE EL BACKEND es exitosa, redirige al usuario a la página de inicio de sesión (LOGIN)
        if (resp.ok) { 
            navigate("/login");
        } else {
            const data = await resp.json();
            setError(data.msg ||"Registro fallido");
        }
    };

    return ( //FORMULARIO DE REGISTRO QUE CUMPLIMENTA EL USUARIO 
        <div className="containerRegistro">
            <div className="form-container">
                <div className="form-box">
                    <form onSubmit={handleSignup}>
                        {error && <div className="error">{error}</div>}
                        <div className="input-box">
                            <input
                                type="text"
                                name="username"
                                value={formulario.username}
                                onChange={handleChange} //Cuando el usuario escribe en un campo del formulario,(en este caso name) llama al handleChange y lo actualiza
                                placeholder="Username"
                                required
                            />
                            
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="nombre"
                                value={formulario.nombre}
                                onChange={handleChange}
                                placeholder="Nombre"
                                required
                            />
                            
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="apellidos"
                                value={formulario.apellidos}
                                onChange={handleChange}
                                placeholder="Apellidos"
                                required
                            />
                            
                        </div>
                        <div className="input-box">
                            <input
                                type="email"
                                name="email"
                                value={formulario.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                           
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                name="password"
                                value={formulario.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                            />
                            
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formulario.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                required
                            />
                        </div>
                        <button type="submit" className="btnHomeRegistro2 btnPrimary" >Aceptar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};