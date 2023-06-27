import React from "react";
import { useNavigate } from "react-router-dom";
import seller from '../assets/img/seller.webp';
import buyer from '../assets/img/buyer.png';
import "../assets/css/usersVsSeller.css";


export default function UserVsSellerLogin(){

    const navigate = useNavigate();

    const eleccionUsuario = () => {
            navigate(`/loginUsuario`)   
    };

    const eleccionComprador = () => {
        navigate(`/loginSeller`)
    };
    return (

    <div className="container-fluid log-back">
        <div className=" d-flex flex-column align-items-center justify-content-center">
            <div className="st-login m-5 ">
                <form className=" d-flex flex-column align-items-center p-4 gap-3">
                    <span className="d-flex">
                       <h3>Iniciar Sesión</h3>
                    </span>
                    <div className="d-flex flex-row align-items center gap-3">
                        <div className="d-flex flex-column" data-validate="Enter username or email">
                            <img className="icon-img" src={buyer} alt="" onClick={() => eleccionUsuario()} />
                            <h5>Comprador</h5>
                        </div>
                        <div className="d-flex flex-column" data-validate="Enter password">
                            <img className="icon-img" src={seller} alt="" onClick={() => eleccionComprador()}/>
                            <h5>Vendedor</h5>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    )
}