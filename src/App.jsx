import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Footer from './components/Footer/Footer';
import CartContainer from './components/CartContainer/CartContainer';
import Register from './components/Register/Register';
import ProductForm from './components/ProductForm/ProductForm';
import LoginForm from "./components/LoginForm/LoginForm";
import RestorePass from './components/RestorePass/RestorePass';
import RestoreContainer from "./components/RestoreContainer/RestoreContainer";
import NotFound from "./components/NotFound/NotFound";
import UserProfile from "./components/UserProfile/UserProfile";
import EditProfile from "./components/EditProfile/EditProfile";

import './App.css'
function App() {

    return (
        <CartProvider>
            <ProductProvider>
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        <Route exact path='/' element={<ItemListContainer />} />
                        <Route exact path='/products/:pid' element={<ItemDetailContainer />} />
                        <Route exact path="/cart" element={<CartContainer />} />
                        <Route exact path="/form" element={<ProductForm />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/login" element={<LoginForm />} />
                        <Route exact path="/restore" element={<RestorePass />} />
                        <Route exact path="/restoreInfo" element={<RestoreContainer />} />
                        <Route exact path="/user/:uid" element={<UserProfile />} />
                        <Route exact path="/edit-user/:uid" element={<EditProfile />} />
                        <Route exact path='*' element={<NotFound />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </ProductProvider>
        </CartProvider>
    )
}

export default App;