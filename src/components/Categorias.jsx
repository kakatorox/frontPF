import React from "react";
import { NavLink } from "react-router-dom";
import '../assets/css/categorias.css';

export default function Categorias() {

    const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);

    return (
        <>
                <div className="d-flex flex-row justify-content-center align-items-flex-start">
                    <div className="Nav-link">
                        <NavLink className={setActiveClass} style={{ color: '#F3EFE0' }} to="/gallery" end>
                            Alimentos
                        </NavLink>
                    </div>
                    <div className="Nav-link">
                        <NavLink className={setActiveClass} style={{ color: '#F3EFE0' }} to="/gallery" end>
                            Descanso
                        </NavLink>
                    </div>
                    <div className="Nav-link">
                        <NavLink className={setActiveClass} style={{ color: '#F3EFE0' }} to="/gallery" end>
                            Accesorios
                        </NavLink>
                    </div>
                    <div className="Nav-link">
                        <NavLink className={setActiveClass} style={{ color: '#F3EFE0' }} to="/gallery" end>
                            Higiene 
                        </NavLink>
                    </div>                    
                    <div className="Nav-link">
                        <NavLink className={setActiveClass} style={{ color: '#F3EFE0' }} to="/gallery" end>
                            Entretencion
                        </NavLink>
                    </div>

                </div>
        </>
    )
}