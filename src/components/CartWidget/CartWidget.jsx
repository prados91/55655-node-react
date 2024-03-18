import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import { CartContext } from '../../context/CartContext';
import cartIcon from '/cartWidget2.png'
import './CartWidget.css'

const CartWidget = () => {
    const [totalItems, setTotalItems] = useState(0);

    const { cart } = useContext(CartContext);

    useEffect(() => {
        setTotalItems(cart.reduce((acum, item) => acum + item.quantity, 0));
      }, [cart]);

    return (
        <Link to="/cart" className="cartWidget__container">
            <img src={cartIcon} alt="Icono de carrito" className='cartWidget__logo' />
            <p >{totalItems > 0 && <span className="cartWidget__number">{totalItems}</span>}</p>
        </Link>
    )
}

export default CartWidget