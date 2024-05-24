import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Footer from './components/Footer/Footer';
import CartContainer from './components/CartContainer/CartContainer';
import Register from './components/Register/Register';
import { CartProvider } from './context/CartContext';
import Login from './components/Login/Login';
import ProductForm from './components/ProductForm/ProductForm';
import LoginForm from "./components/Login/LoginForm";

import './App.css'
import ProductProvider from './context/ProductContext';
import RestorePass from './components/RestorePass/RestorePass';
// import RestoreInfo from "./components/RestoreInfo/RestoreInfo";
import RestoreContainer from "./components/RestoreContainer/RestoreContainer";
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
                        {/* <Route path="/login" element={<Login />} /> */}
                        <Route path="/login" element={<LoginForm />} />

                        <Route path="/restore" element={<RestorePass />} />
                        {/* <Route path="/restoreInfo/:uid" element={<RestoreInfo />} /> */}
                        <Route path="/restoreInfo" element={<RestoreContainer />} />

                        <Route exact path='*' element={<h1> 404 NOT FOUND </h1>} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </ProductProvider>
        </CartProvider>

    )
}

export default App;