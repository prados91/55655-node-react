import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Footer from './components/Footer/Footer';
import CartContainer from './components/CartContainer/CartContainer';
import Form from './components/Form/Form'
import Register from './components/Register/Register';
import { CartProvider } from './context/CartContext';
import Login from './components/Login/Login';
import ProductForm from './components/ProductForm/ProductForm';


import './App.css'
import ProductProvider from './context/ProductContext';
function App() {

    return (
        <CartProvider>
            <ProductProvider>
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        <Route exact path='/' element={<ItemListContainer greeting={'Wellcome to Basketball | Store'} />} />
                        <Route exact path='/products/:pid' element={<ItemDetailContainer />} />
                        <Route path="/cart" element={<CartContainer />} />
                        <Route path="/form" element={<ProductForm />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route exact path='*' element={<h1> 404 NOT FOUND </h1>} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </ProductProvider>
        </CartProvider>

    )
}

export default App;