import React, { useState } from "react";
import { Signup } from "../component/Signup";
import { Link } from "react-router-dom";
import Modal from "../component/Modal";

export const Home = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div className="containerHome">
            <button className="btnHomeRegistro btnPrimary" onClick={handleShow}>
               Registrate
            </button>

            <Modal
                show={showModal}
                onClose={handleClose}
                title="Bienvenidos"
            >
                <Signup />
                <p>
                    <Link to="/login">Inicia sesión</Link>
                </p>
            </Modal>
        </div>
    );
};
