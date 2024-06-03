import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom";
import { CartContext } from '../../context/CartContext'
import CartItem from '../CartItem/CartItem'
import Loading from "../Loading/Loading";

import './CartCards.css'
const CartCards = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartEmpty, setCartEmpty] = useState(true);
    const { cart, deleteOrder, checkout, report } = useContext(CartContext);

    useEffect(() => {
        if (cart.length > 0) {
            setCartEmpty(false)
        } else {
            setCartEmpty(true)
        }
    }, [cart])
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
                            onClick={() => { }}
                        >
                            Vaciar carrito
                        </button>
                        <Link >
                            <button className="cartContainer__btnForm" onClick={() => checkout()}>Finalizar compra</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartCards