// Información que solo puedes acceder si te registras o logueas. 



import React, { useState } from "react";

import { useNavigate } from "react-router-dom"; //Te permite navegar a una nueva ruta dentro de tu aplicación. 
//útil para redirigir a los usuarios después de que se realicen ciertas acciones, como enviar un formulario.

import { BackendURL } from "../component/backendURL"; 
//variable que generalmente contiene la URL base del backend de la aplicación.Es útil para centralizar y reutilizar la URL del backend en diferentes partes del front-end.
// De esta manera, si la URL del backend cambia, solo necesitas actualizarla en un solo lugar en lugar de buscar y reemplazar en todo el código.
//Si la URL cambia, solo necesitas modificar backendURL.js.(componentes)

export const Privada = () => {
    const { store, actions } = useContext(Context); //para acceder al contexto que contiene el estado global (store) y las acciones (actions).
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.token) { //si el token del usuario no está en store.token
            actions.verificoToken().then(() => { //hace una solicitud al backend para verificar si el token es válido.
                if (!store.token) { //Si el token sigue no está 
                    navigate("/login"); // Redirige al usuario a la página de inicio de sesión (login)
                }
            });
        }
    }, [store.token, actions, navigate]); //se ejecuta  cada vez que store.token, actions, o navigate cambian.

    if (!store.user) { //Si la información del usuario aún no está disponible en la variable store.user
        return <div>Loading...</div>; //mensaje de carga
    }

    return ( //Si la información del usuario está disponible en la variable store.user. Se muestra un mensaje de bienvenida con el correo electrónico del usuario
        <div>
            <h1>Welcome {store.user.email}</h1>
            <p>{store.token}</p> 
            
        </div>
    );
};