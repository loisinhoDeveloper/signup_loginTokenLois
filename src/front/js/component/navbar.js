import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar mb-3">
            <Link to="/" className="navbar-brand">
                <img
                    className="startWars"
                    src="https://icons.iconarchive.com/icons/sensibleworld/starwars/512/Death-Star-icon.png"
                    alt="Star Wars Icon"
                />
            </Link>
            <div className="dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Iniciar sesión
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                        <Link to="/login" className="dropdown-item">
                            Iniciar sesión
                        </Link>
                    </li>
                    <li>
                        <Link to="/signup" className="dropdown-item">
                            Registrarse
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};


//navbar-brand es una clase específica que se utiliza para identificar el elemento que contiene el logotipo o nombre de la aplicación en una barra de navegación
