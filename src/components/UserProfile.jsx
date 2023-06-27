import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Publicaciones from '../views/Publicaciones';
import "../assets/css/profile.css"
import Avatar1 from "../assets/img/Avatar1.png";
import Avatar2 from "../assets/img/Avatar2.webp";
import { useLocation, useNavigate } from 'react-router-dom';



export default function UserProfile() {
    let location = useLocation();
    const navigate = useNavigate();
    console.log(location);

    let nombres = "";
    let apellidoP = "";
    let apellidoM = "";
    let correo = "";
    let celular = "";
    let tipo = "";
    let numero = "";
    let region = "";
    let ciudad = "";
    let calle = "";
    let id = 0;
    let avatar = "";

    const leerToken = () => {
        let token = location.state.token
        const base64Url = token.split('.')[1];
        const payload = JSON.parse(atob(base64Url));
        return payload
    }
    const payload = leerToken()

    if (payload.usuario.tipo === "usuario") {
        console.log(payload.usuario);
        id = payload.usuario.id_usuario;
        nombres = payload.usuario.nombres
        apellidoP = payload.usuario.apellido_paterno
        apellidoM = payload.usuario.apellido_materno
        correo = payload.usuario.correo
        celular = payload.usuario.celular
        tipo = payload.usuario.tipo
        region = payload.usuario.region
        ciudad = payload.usuario.ciudad
        calle = payload.usuario.calle
        numero = payload.usuario.numero
        avatar = Avatar2
        console.log(calle)
    }
    if (payload.usuario.tipo === "vendedor") {
        console.log(payload.usuario);
        id = payload.usuario.id_vendedor;
        nombres = payload.usuario.nombre
        apellidoP = payload.usuario.apellido_paterno
        apellidoM = payload.usuario.apellido_materno
        correo = payload.usuario.correo
        celular = payload.usuario.telefono
        tipo = payload.usuario.tipo
        region = payload.usuario.region
        ciudad = payload.usuario.ciudad
        calle = payload.usuario.calle
        numero = payload.usuario.numero
        avatar = Avatar1
        console.log("vendedor")
    }

    const irPublicacion = () => {
        navigate(`/publicationForm`)
    }



    return (

        <section className="section-profile" style={{ backgroundColor: '#eee', opacity: 0.8 }}>
            <Container className="">
                <Row style={{ marginTop: 1 }}>
                    <Col lg={4}>
                        <Card className="shadow">
                            <Card.Body className="card-body text-center blur">
                                <Card.Img src={avatar} alt="avatar" className="img-fluid m-4" style={{ width: '120px' }} />
                                <Row >
                                    <Col sm={3}>
                                        <i class="fa-solid fa-user"></i>
                                    </Col>
                                    <Col sm={9}>
                                        <h6 className="mb-0 fw-bold">{nombres} {apellidoP} {apellidoM}</h6>
                                    </Col>
                                </Row>

                                <Row >
                                    <Col sm={3}>
                                        <i class="fa-solid fa-at"></i>                                    
                                    </Col>
                                    <Col sm={9}>
                                        <h6 className="mb-0 fw-bold">{correo}</h6>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm={3}>
                                        <i class="fa-solid fa-phone"></i>                                    
                                    </Col>
                                    <Col sm={9}>
                                        <h6 className="mb-0 fw-bold">{celular}</h6>
                                    </Col>
                                </Row>

                                <Row  >
                                    <Col sm={3}>
                                    <i class="fa-solid fa-house"></i>
                                    </Col>
                                    <Col sm={9}>
                                        <h6 className="mb-0 fw-bold">{calle} {numero}, {ciudad}, región de {region} </h6>
                                    </Col>
                                </Row>
                                {tipo === 'vendedor' ? <div className="d-flex justify-content-center mb-2 mt-3">
                                    <Button className="btn-colors" variant="primary" onClick={() => irPublicacion()}>Añadir Productos</Button>
                                </div> :
                                    <div></div>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={8}>
                        <Card className='shadow'>
                            <Card.Body>
                                {tipo === "usuario" ?
                                    < Row >
                                        <Col cmd={12}>
                                            <h4 className="mb-0 fw-bold">
                                                Mis Compras
                                            </h4>
                                        </Col>
                                    </Row> :
                                    <Row>
                                        <Col cmd={12}>
                                            <h4 className="mb-0 fw-bold">
                                                Mis Publicaciones
                                            </h4>
                                        </Col>
                                    </Row>
                                }
                            </Card.Body>
                        </Card>
                        <Row>
                            <Col md={12} style={{ marginTop: "20px" }}>
                                <Publicaciones id={[id = id, tipo = tipo]}></Publicaciones>
                            </Col>

                        </Row>
                    </Col>
                </Row>
            </Container >
        </section >
    );
}
