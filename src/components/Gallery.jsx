import "../assets/css/gallery.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import contextProductos from "../producto_context";
import cartContext from "../cart_context";
import contextCost from "../total_amount_context";
//import PacmanLoader from "react-spinners/PacmanLoader";

export default function Gallery() {
    let location = useLocation();
    const navigate = useNavigate();
    const { cost, setCost } = useContext(contextCost);
    const { cart, setCart } = useContext(cartContext);
    const [sort, setSort] = useState("Menor");
    // Data for Products
    const { products, setProducts } = useContext(contextProductos);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    var productsResponse = [];

    const makeRequests = () => {
        try {
            fetch('https://backmarketdb.fly.dev/productos/listado').then((res) => res.json())
                .then((data) => {
                    productsResponse = data;
                    setProducts(productsResponse);
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                });
        } catch {
            console.error("Multiple fetch failed");
        }
    }

    useEffect(() => {
        makeRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        filterProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, products]);

    const addToCart = (product) => {
        var newCart = cart;
        const totalAmount = cost + product.precio;
        var foundIndex = cart.findIndex(x => x.id_producto === product.id_producto);
        if (foundIndex !== -1) {
            let cantidad = newCart[foundIndex]['cantidad'];
            newCart[foundIndex]['cantidad'] = cantidad + 1;
            setCart([...newCart]);
        } else {
            product["cantidad"] = 1;
            newCart.push(product);
            setCart([...newCart]);
        }

        setCost(totalAmount);
    }

    const productoDetails = (id) => {
        if (products.length > 0) {
            navigate(`/product/${id}`)
        }
    };

    const sortItems = () => {
        if (sort === "Mayor") {
            filteredProducts.sort((a, b) => parseInt(a.precio) - parseInt(b.precio));
            setSort("Menor");
        } else if (sort === "" || sort === "Menor") {
            filteredProducts.sort((a, b) => parseInt(b.precio) - parseInt(a.precio));
            setSort("Mayor");
        }
    };



    const filterProducts = () => {
        if (location.hasOwnProperty('state') && location.state.hasOwnProperty('id') && location.state.id !== 0) {
            const filters = { id_categoria: [location.state.id] };
            const filtered = (products || []).filter(product => {
                return Object.keys(filters).reduce((acc, filter) => {
                    const filterValues = filters[filter];
                    const productValue = product[filter];
                    //This line defines what is your match
                    const found = filterValues.find(fv => fv === productValue);
                    return acc && found;
                }, true);
            })
            const filterProd = filtered;
            setFilteredProducts(filterProd);
        } else {
            setFilteredProducts(products);
        }

    }

    //<div className="pacman"><PacmanLoader color="#36d7b7" margin={0} ></PacmanLoader>.</div>
    return isLoading ?<div className="doggieDiv mt-5"><iframe title='gif' className='doggie doggie-iframe' src="https://giphy.com/embed/KAdqfMqoM5turRW9xs"></iframe></div>
        :
        <section id="gallery">
            <div className="container">
                {location !== null && location.hasOwnProperty('state') && location.state.hasOwnProperty('categoria') ? <h1 className="titleGallery">{location.state.categoria}</h1> :
                    <h1 className="titleGallery">{"Todos los Productos"}</h1>
                }
                <br />
                <div className="product-list">
                    <div className="product-list-filters">
                        <label htmlFor="sort-by-select">Ordenar por Precio:</label>
                        <select id="sort-by-select" value={sort} onChange={sortItems}>
                            <option value="Menor">Menor a Mayor</option>
                            <option value="Mayor">Mayor a Menor</option>
                        </select>
                    </div>
                </div>
                <br />
                <div className="row">
                    {filteredProducts && filteredProducts.length > 0 ?
                        filteredProducts.map((producto) => (
                            <div key={producto.id_producto} className="col-lg-4 mb-4 p-1">
                                <div className="card bg-light p-1">
                                    <img src={producto.img} alt={producto.nombre} className="card-img-top" />
                                    <div className="card-body bg-light">
                                        <h5 className="card-title">{producto.nombre}</h5>
                                        <p className="card-title">{new Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' }).format(producto.precio)}</p>
                                        <button className="btn btn-outline-success btn-sm" onClick={() => productoDetails(producto.id_producto)}>Ver Más 👀</button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => addToCart(producto)}>Agregar 🛒</button>
                                    </div>
                                </div>
                            </div>
                        )) : <div className="m-5">
                            <h4 className="m-5">No Existen products para mostrar</h4>
                        </div>
                    }
                </div>
            </div>
        </section>
}
