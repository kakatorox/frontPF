import React from 'react';
import MyProductContext from "./producto_context";
import MyTotalAmountContext from "./total_amount_context";
import CategoriaContext from "./categoria_context";
import CartContext from "./cart_context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./views/Home.jsx";
import Gallery from "./views/gallery.jsx";
import Product from "./views/Product.jsx";
import Carrito from "./views/Carrito.jsx";
import Boleta from "./views/Boleta.jsx";
import Login from "./views/Login.jsx";
import UserRegistration from "./views/UserRegistration.jsx";
import UserVsSeller from "./views/UserVsSeller.jsx";
import SellerRegistration from "./views/SellerRegistration";
import LoginSeller from "./views/LoginSeller"
import './App.css';
import 'alertifyjs/build/css/alertify.css';
import Publicaciones from './views/Publicaciones';
import Profile from './views/Profile';
import CrearPublicacion from './views/CrearPublicacion';
import UserVsSellerLogin from './views/UserVsSellerLogin'


function App() {

  const [categorias, setCategorias] = useState([]);
  const [cart, setCart] = useState([]);
  // const endpoint = '/front-dog-shp/product.json';
  const [cost, setCost] = useState(0);
  const [products, setProducts] = useState([]);

  return (
    <div className="App">
      <MyProductContext.Provider value={{products, setProducts}}>
        <MyTotalAmountContext.Provider value={{ cost, setCost }}>
        <CartContext.Provider value={{ cart, setCart }}>
        <CategoriaContext.Provider value = {{ categorias, setCategorias }}>
          <BrowserRouter >
            <Routes>
              <Route path="/" element={<Home /> }/>
              <Route path="/product/:id" element={<Product />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/boleta" element={<Boleta />} />
              <Route path="/loginUsuario" element={<Login/>} />
              <Route path="/loginSeller" element={<LoginSeller/>} />
              <Route path="/userRegistration" element={<UserRegistration/>} />
              <Route path="/SellerRegistration" element={<SellerRegistration/>} />
              <Route path="/UserVsSeller" element={<UserVsSeller/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/publicaciones" element={<Publicaciones />} />
              <Route path="/publicationForm" element={<CrearPublicacion/>} />
              <Route path="/UserVsSellerLogin" element={<UserVsSellerLogin />} />
            </Routes>
          </BrowserRouter>
          </CategoriaContext.Provider>
          </CartContext.Provider>
        </MyTotalAmountContext.Provider>
      </MyProductContext.Provider>
    </div>
  );
}

export default App;
