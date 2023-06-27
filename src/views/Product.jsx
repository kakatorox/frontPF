import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Products from "../components/Products";
import context from "../producto_context.jsx";
import Navbar from "../components/Navbar.jsx";

const Product = ({id}) => {
    const productId = useParams(id);
    const { products } = useContext(context);
    const [ product, setProduct ] = useState({});

    const searchProduct = ({ id }) => {
        // eslint-disable-next-line array-callback-return
        products.forEach(producto => {
            if (parseInt(producto.id_producto) === parseInt(id)) {
                setProduct(producto);
            }
        });
    };

    useEffect (() => {
        searchProduct(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div>
            <Navbar></Navbar>
            <Products product={product}></Products>
        </div>

    )
}
export default Product;