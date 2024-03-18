import React from 'react'
import { useContext } from "react"
import { CartContext } from '../../context/CartContext'

import './CartItem.css'

const CartItem = () => {
    const { cart, deleteItemFromCart } = useContext(CartContext);
    return (
        <div>
            {cart.map((p) => (
                <div className="cartItem__producto" key={p.id}>
                    <div className="cartItem__producto--detail">
                        <button className="cartItem__producto--btnDelete" onClick={() => deleteItemFromCart(p.id)}>
                            X
                        </button>
                        <img src={p.photo} alt={p.title} />
                        <div>
                            {p.title} (x {p.quantity}u.)
                        </div>
                    </div>
                    <div className="cartItem__producto--price">${p.quantity * p.price}</div>
                </div>
            ))}

        </div>
    );
};

export default CartItem

