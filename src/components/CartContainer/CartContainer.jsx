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

    const { cart, readCart, deleteOrder ,checkout} = useContext(CartContext);


    useEffect(() => {
        setTotalPrice(cart.reduce((acum, item) => acum + item.quantity * item.product_id.price, 0));
        setCartEmpty(cart.length === 0);
    }, [cart]);

    useEffect(() => {
        readCart()
    }, []);

    return (
        <div className="cartContainer">
            <div className="cartContainer__container">
                <h2>Carrito de compras</h2>

                <hr />
                <div className="cartContainer__products">
                    {cartEmpty ? <div>El carrito de compras está vacio!</div> : <CartItem cart={cart} deleteOrder={deleteOrder} />}
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
                            onClick={() => { console.log("HOLA") }}
                        >
                            Vaciar carrito
                        </button>
                        <Link >
                            <button className="cartContainer__btnForm" onClick={() => checkout()}>Finalizar compra</button>
                        </Link>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>

    )
}

export default CartContainer

