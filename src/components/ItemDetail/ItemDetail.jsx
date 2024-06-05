import React from 'react'
import { useState, useContext } from "react"
import { CartContext } from '../../context/CartContext'
import ItemCount from '../ItemCount/ItemCount'
import './ItemDetail.css'

import 'react-toastify/dist/ReactToastify.css';

const ItemDetail = ({ product }) => {
    const { title, price, photo, stock } = product

    const { addItem } = useContext(CartContext);
    const [count, setCount] = useState(1);

    return (
        <div className="itemDetail__container">
            <h1>{title}</h1>

            <div className="itemDetail__columns">
                <div className="itemDetail__column--image">
                    <img src={photo} alt={title} className='img-fluid'/>
                </div>
                <div className="itemDetail__column--description">
                    <p>{title}</p>
                    <h2>USD {price}.</h2>
                    <p>Stock: {stock}</p>
                    <ItemCount count={count} setCount={setCount} stock={stock} />
                    <button
                        className="itemDetail__btn--AddItemToCart"
                        onClick={() => {
                            addItem(product, count)
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ItemDetail