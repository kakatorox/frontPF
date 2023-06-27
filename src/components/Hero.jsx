import React from "react";
import '../assets/css/hero.css'
import doggieHero from '../assets/img/carrousel1.jpg';
import doggie2 from '../assets/img/carrousel2.png';
import doggie3 from '../assets/img/carrousel3.jpg';
import doggie4 from '../assets/img/carrousel4.jpg';
import doggie5 from '../assets/img/carrousel5.jpg';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

export default function Hero () {
    return (
        <section id="header" className="jumbotron text-center background-hero" >
            <div className="">
                <Carousel>
                    <Carousel.Item interval={3000} className="item">
                        <img
                            className="d-block w-100 img-hero"
                            src={doggieHero}
                            alt="dog"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3000} className="item">

                        <img
                            className="d-block w-100 img-hero2"
                            src={doggie2}
                            alt="Two"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3000} className="item">
                        <img
                            className="d-block w-100 img-hero3"
                            src={doggie3}
                            alt="three"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3000} className="item">
                        <img
                            className="d-block w-100 img-hero4"
                            src={doggie4}
                            alt="four"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3000} className="item">

                        <img
                            className="d-block w-100 img-hero5"
                            src={doggie5}
                            alt="five"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
        </section >
    )
}