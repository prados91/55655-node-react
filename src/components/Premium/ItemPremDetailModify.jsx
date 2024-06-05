import React from 'react'
import { useState, useContext } from "react"
import { CartContext } from '../../context/CartContext'
import ItemCount from '../ItemCount/ItemCount'
import './ItemDetailModify.css'

import 'react-toastify/dist/ReactToastify.css';

const ItemDetailModify = ({ product }) => {
    const { title, price, photo, stock } = product

    const { addItem } = useContext(CartContext);
    const [count, setCount] = useState(1);

    return (
        <div className="ItemDetailModify__container">
            <h1>{title}</h1>

            <div className="ItemDetailModify__columns">
                <div className="ItemDetailModify__column--image">
                    <img src={photo} alt={title} className='img-fluid'/>
                </div>
                <div className="ItemDetailModify__column--description">
                    <p>{title}</p>
                    <h2>USD {price}.</h2>
                    <p>Stock: {stock}</p>
                    <ItemCount count={count} setCount={setCount} stock={stock} />
                    <button
                        className="ItemDetailModify__btn--AddItemToCart"
                        onClick={() => {
                            addItem(product, count)
                        }}
                    >
                        EDIT
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ItemDetailModify