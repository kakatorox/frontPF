import Navbar from "../components/Navbar.jsx";
import Publicaciones from "../components/Publicaciones.jsx";

export default function Publicacion({id}) {
    
    return (
        <>
            <Publicaciones id = {id}></Publicaciones>
        </>
    );
}