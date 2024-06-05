import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom";
import { CartContext } from '../../context/CartContext'
import CartItem from '../CartItem/CartItem'
import Loading from "../Loading/Loading";

import './CartContainer.css'
import CartCards from "../CartCards/CartCards";

const CartContainer = () => {


    const [isLoading, setIsLoading] = useState(false)

    const { readCart } = useContext(CartContext);

    const render = async () => {
        setIsLoading(false)
        try {
            await readCart()
            setIsLoading(true)
        } catch (error) {
            Swal.fire({
                title: `${error.message}`,
                icon: "error",
                text: "Please, try again in a while.",
                timer: 50000,
                timerProgressBar: true,
            }).then(() => {
                setIsLoading(false)
                location.replace('/')
            });
        }
    }
    useEffect(() => {
        render()
    }, []);

    return (
        <>
            {!isLoading ? <Loading /> : <CartCards />}
        </>

    )
}

export default CartContainer

