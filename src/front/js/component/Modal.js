import React from "react";
import "../../styles/index.css";

const Modal = ({ show, onClose, title, children }) => {
    return (
        <div
            className={`modal fade ${show ? 'show' : ''}`}
            style={{ display: show ? 'block' : 'none' }}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modalLabel"
            aria-hidden={!show}
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btnModalClose" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btnModal btnSecondary" onClick={onClose}>Cerrar</button>
                        {/* Puedes agregar más botones aquí si es necesario */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;