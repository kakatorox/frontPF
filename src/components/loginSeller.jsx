import React, { useState } from 'react';
import axios from 'axios'
import alertify from 'alertifyjs';
import { useNavigate } from "react-router-dom";
import "../assets/css/login.css";
const urlServer = process.env.REACT_APP_BASE_URL
export default function LoginSeller(){
    const navigate = useNavigate();
   
    const urlServer = process.env.REACT_APP_BASE_URL
   
    const [formData, setFormData] = useState({
        correo: '',
        contrasena: ''
      });
 
      const iniciarSesionvendedor = async (formData) => {
        const endpoint = "loginSeller";
       
        try { 
           const { data } = await axios.post(urlServer + endpoint, formData);
           console.log(data)
            if (data.statusCode === 200){
              alertify.success(data.message);
              localStorage.setItem("token", data.jwt_token);
              navigate("/");
              leerToken()
            }
           
        } catch (error) {         
           alertify.error("Email o contraseña incorrecta 🙁");
          console.log(error.message);
        }
      }

    const leerToken = () =>{
        let token = localStorage.getItem("token")
        console.log(token)
        const base64Url = token.split('.')[1];
        const payload = JSON.parse(atob(base64Url));
        const nombreUsuario  = payload.usuario.id_usuario;
        console.log(payload)
        console.log(nombreUsuario)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        iniciarSesionvendedor(formData);
    }

    const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      }

    
    return (

    <div className="log-back">
        <div className=" d-flex flex-column align-items-center ">
            <div className="st-log">
                <form className=" d-flex flex-column align-items-center p-4 gap-3" onSubmit={handleSubmit}>
                    <span className="p-b-37">
                       <h3> Inicio de Sesión</h3>
                       <h3> Vendedor </h3>
                    </span>
                    <div className="" data-validate="Enter username or email">
                        <input className="p-2 text-center" type="email" name="correo" placeholder="correo" required value={formData.correo} onChange={handleChange}/>
                            <span className=""></span>
                    </div>
                    <div className="" data-validate="Enter password">
                        <input className="text-center" type="password" name="contrasena" placeholder="password" required value={formData.contrasena} onChange={handleChange}/>
                            <span className="focus-input100"></span>
                    </div>
                    <div className="">
                        <button className="btn-sign-in">
                            Sign In
                        </button>
                    </div>
                    <div className="text-center">
                        {/* <a href="/front-dog-shp/userVsSeller" className="txt2 hov1">
                            Registrate aquí
                        </a> */}
                    </div>
                </form>
            </div>
        </div>
    </div>

    )
}