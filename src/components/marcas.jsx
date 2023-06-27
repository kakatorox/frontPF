import "../assets/css/marcas.css";
import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import context from "../product_context";
import acana from '../assets/img/acana.png';
import bravery from '../assets/img/BRAVERY.webp';
import bravectorr from '../assets/img/bravectorr.png';
import hills from '../assets/img/hills.jpeg';
import proplan from '../assets/img/proplan.png';
import royalCanin from '../assets/img/royal-canin.png';
import Core from '../assets/img/Wellness_CORE.webp';
import mPets from '../assets/img/m-pets.png';
import wuwu from '../assets/img/wuwu-logo.png';


export default function GalleryMarcas() {

    // const { products } = useContext(context);

    const navigate = useNavigate();
    const productDetails = (marca) => {
            navigate(`/product/${marca}`)
    
    };
    return (
            <div className="container-fluid bg-dark m-5">
                <div className="row justify-content-space-around">
                    <div  className=" d-flex flex-row gap-5">
                        <div className="logo bg-light ">
                            <img src={acana} alt='acana' className="im"  />
                        </div>
                        <div className="logo bg-light ">
                            <img src={bravery} alt='bravery' className="im"  />
                        </div>
                        <div className="logo bg-light ">
                            <img src={bravectorr} alt='bravectorr' className="im"  />
                        </div>
                        <div className="logo bg-light ">
                            <img src={hills} alt='hills' className="im" />
                        </div>
                        <div className="logo bg-light ">
                            <img src={proplan} alt='proplan' className="im" />
                        </div>
                        <div className="logo bg-light ">
                            <img src={royalCanin} alt='royalCanin' className="im" />
                        </div>
                        <div className="logo bg-light ">
                            <img src={Core} alt='core' className="im" />
                        </div>
                        <div className="logo bg-light ">
                            <img src={mPets} alt='mpets' className="im" />
                        </div>
                        <div className="logo bg-light ">
                            <img src={wuwu} alt='wuwu' className="im" />
                        </div>
                    </div>
                </div>
            </div>
    );
}