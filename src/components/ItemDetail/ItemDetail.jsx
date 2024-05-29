import React from 'react'
import { useState, useContext, useEffect } from "react"
import { CartContext } from '../../context/CartContext'
import ItemCount from '../ItemCount/ItemCount'
import './ItemDetail.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemDetail = ({ product }) => {
    const { title, price, photo, stock } = product

    const { createOrder, addItem } = useContext(CartContext);
    const [count, setCount] = useState(1);

    const [imageNumber, setImageAux] = useState(0);

    const toastyNew = (count) => {
        toast.success(count == 1 ? 'productos agregado al carrito' : 'Se agregaron ' + `${count}` + ' productos al carrito', {
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

    const toastyDuplicated = (count) => {
        toast.warn(count == 1 ? 'Se agregó un elemento adicional' : 'Se agregaron  ' + `${count}` + ' elementos adicionales', {
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

        // createOrder(products, count);
        addItem(product, count)

    }

    const [mobileResponsive, setmobileResponsive] = useState(window.innerWidth < 768);

    const handleResize = () => {
        setmobileResponsive(window.innerWidth < 768);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="itemDetail__container">
            <h1>{title}</h1>

            <div className="itemDetail__columns">

                {/*}
                <div className="itemDetail__column--imageAux">
                    <div
                        onClick={() => {
                            setImageAux(0);
                        }}
                        className="itemDetail__column--imageAux">
                        <img src={imageAux[0]} alt={title} />
                    </div>
                    <div
                        onClick={() => {
                            setImageAux(1);
                        }}
                    >
                        <img src={imageAux[1]} alt={title} />
                    </div>
                    <div
                        onClick={() => {
                            setImageAux(2);
                        }}
                    >
                        <img src={imageAux[2]} alt={title} />
                    </div>
                </div>
                    */}

                <div className="itemDetail__column--image">

                    {!mobileResponsive ? <img src={photo} alt={title} /> : <img src={photo} alt={title} />}

                </div>
                <div className="itemDetail__column--description">
                    <p>{title}</p>
                    <h2>${price}.</h2>
                    <p>Disponibles: {stock}</p>
                    <ItemCount count={count} setCount={setCount} stock={stock} />
                    <button
                        className="itemDetail__btn--AddItemToCart"
                        onClick={() => { callFunction(); }}
                    >
                        Add to Cart
                    </button>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};
export default ItemDetail