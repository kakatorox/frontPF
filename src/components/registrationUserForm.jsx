import React, { useState } from 'react';
import "../assets/css/registration.css";
import axios from 'axios';
import alertify from 'alertifyjs';
import { useNavigate } from "react-router-dom";
import { validateRut, isRutLike } from '@fdograph/rut-utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const urlServer = process.env.REACT_APP_BASE_URL

function RegistrationForm() {
  const [formData, setFormData] = useState({
    nombres: '',
    apellido_paterno: '',
    apellido_materno: '',
    celular: '',
    contrasena: '',
    rut:'',
    correo:'',
    fecha_nacimiento:'',
    sexo:'',
    region:'',
    ciudad:'',
    comuna:'',
    calle:'',
    numero:'',
    descripcion:''
  });

  const navigate = useNavigate();

   async function  postUser (formData){
    const endpoint = "usuario/crear";
    try {
        const consulta = await axios.post(urlServer + endpoint, formData);
        console.log(consulta)
        alertify.success("Usuario registrado con éxito");
        navigate("/loginUsuario");
      } catch (error) {
        alertify.error("Algo salió mal ...");
        console.log(error);
      }
}


   const handleSubmit = (event) => {
     event.preventDefault();
     console.log(formData)
     postUser(formData)
    // Code to submit form data to server
  }

   const handleChange = (event) => {
     setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
   }

   function validarRUT(event) {
        const rut = event.target.value.trim();
        console.log(rut)
        const rutLike = isRutLike(event.target.value.trim())
        console.log(rutLike)
        if(!rutLike){
          alertify.error("Rut debe tener Formato 12.123.123-9");
        }
        const rest =  validateRut(event.target.value.trim())
        console.log(rest)
  }
  

  function calcularDigitoVerificador(numeros) {
    const factores = [3, 2, 7, 6, 5, 4, 3, 2];
    const suma = numeros
      .split('')
      .reverse()
      .reduce((acumulador, digito, indice) => {
        const factor = factores[indice % 8];
        return acumulador + parseInt(digito) * factor;
      }, 0);
    const resto = suma % 11;
    return resto === 0 ? '0' : resto === 1 ? 'K' : `${11 - resto}`;
  }
  

  return (
    <div className='container-fluid back-user d-flex flex-row justify-content-end'>
      <div className="row align-content-center me-5">
        <div className='formulario p-5 st-lo me-5'>
          <h2 className='p-2'>Registro de usuario</h2>
          <form className='form gap-2'  id="formulario" onSubmit={handleSubmit}>
                <div className='dir-col'>
                  <h4>Datos Personales</h4>
                  <div className='GrupoInput col-es'>
                    <input type="text" name="nombres" placeholder=" Nombre" required value={formData.nombres} onChange={handleChange} />
                    <FontAwesomeIcon className='icon' icon={faCheckCircle} />
                  </div>
                  <div className='col-es'>
                    <input type="text" name="apellido_paterno"  placeholder=" Apellido Paterno"  required value={formData.apellido_paterno} onChange={handleChange} />
                  </div>
                  <div className='col-es'>
                    <input type="text" name="apellido_materno" placeholder=" Apellido Materno" required value={formData.apellido_materno} onChange={handleChange} />
                  </div>
                  <div className='col-es'>
                    <input type="text" name="rut" placeholder=" Rut" required value={formData.rut} onChange={handleChange} onBlur={validarRUT} />
                  </div>
                  <div className='col-es'>
                 
                    <input type="tel" name="celular" placeholder=" Celular"required value={formData.celular} onChange={handleChange} />
                  </div>
                  <div>
                    <input type="date" name="fecha_nacimiento" placeholder=" Fecha Nacimiento" required value={formData.fecha_nacimiento} onChange={handleChange} />
                  </div>
                  <div className='col-es'>
                      <input className='text-dark' type="radio" name="sexo" value="masculino" checked={formData.sexo === 'masculino'} onChange={handleChange} /> Masculino
                      <input className='text-dark'type="radio" name="sexo" value="femenino" checked={formData.sexo === 'femenino'} onChange={handleChange} /> Femenino
                  </div>
                  <h4>Informacion de la Cuenta</h4>
                <div className='col-es'>
                  <input type="email" name="correo" placeholder=" Correo" required value={formData.correo} onChange={handleChange} />
                </div>
                <div className='col-es'>
                  <input type="password" name="contrasena" placeholder=" Contraseña"required value={formData.contrasena} onChange={handleChange} />
                </div>

              </div>
              <div className='d-flex flex-column gap-3 dir-col'>
              <h4>Datos Dirección</h4>
                  <div className='col-es'>
                    <input type="text" name="region" placeholder=" Region" required value={formData.region} onChange={handleChange} />
                  </div>
                  <div className='col-es'>
                    <input type="text" name="ciudad" placeholder=" Ciudad" required value={formData.ciudad} onChange={handleChange} />
                  </div>
                  <div className='col-es'>
                    <input type="text" name="comuna" placeholder=" Comuna" required value={formData.comuna} onChange={handleChange} />
                  </div>
                  <div className='col-es'>
                    <input type="text" name="calle"  placeholder=" Calle" required value={formData.calle} onChange={handleChange} />
                  </div>
                  <div className='col-es'>
                    <input type="text" name="numero" placeholder=" Numero" required value={formData.numero} onChange={handleChange} />
                  </div>
                  <div className='col-es'>
                    <input type="text" name="descripcion" placeholder=" Referencia" required value={formData.descripcion} onChange={handleChange} />
                  </div>
                  <div>
                    <input className='button-submit' type="submit" value="Register"  />
                  </div>
              </div>
              <div className='d-flex  gap-2 dir-col'>
                  
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
