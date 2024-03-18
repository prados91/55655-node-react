import React from 'react'
import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom";
import { CartContext } from '../../context/CartContext'

import CartItem from '../CartItem/CartItem'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './CartContainer.css'

const CartContainer = () => {

    const [totalPrice, setTotalPrice] = useState(0);
    const [cartEmpty, setCartEmpty] = useState(true);

    const { cart, clearItemsFromCart } = useContext(CartContext);


    const toasty = () => {
        toast.error('Se eliminaron todos los productos del carrito', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    }

    const callFunction = () => {
        clearItemsFromCart();
        toasty();
    }

    useEffect(() => {
        setTotalPrice(cart.reduce((acum, item) => acum + item.quantity * item.price, 0));
        setCartEmpty(cart.length === 0);
    }, [cart]);

    return (
        <div className="cartContainer">
            <div className="cartContainer__container">
                <h2>Carrito de compras</h2>

                <hr />
                <div className="cartContainer__products">
                    {cartEmpty ? <div>El carrito de compras está vacio!</div> : <CartItem />}
                </div>
                <hr />
                <p className="cartContainer__totalPrice">
                    <b>TOTAL: ${totalPrice}</b>
                </p>
                <hr />
                {!cartEmpty && (
                    <div className="cartContainer__buttons">
                        <button
                            className="cartContainer__btnclearItemsFromCart"
                            onClick={() => { callFunction() }}
                        >
                            Vaciar carrito
                        </button>
                        <Link to="/form" >
                            <button className="cartContainer__btnForm">Finalizar compra</button>
                        </Link>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>

    )
}

export default CartContainer

