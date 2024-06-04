import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom";
import { CartContext } from '../../context/CartContext'
import CartItem from '../CartItem/CartItem'
import Loading from "../Loading/Loading";

import './CartCards.css'
const CartCards = () => {
    const [userReport, setUserReport] = useState({});
    const [cartEmpty, setCartEmpty] = useState(true);
    const { cart, deleteOrder, checkout, report } = useContext(CartContext);

    const readReport = async () => {
        setUserReport({})
        const res = await report()
        if (res) {
            setUserReport(res)
        }
    }

    useEffect(() => {
        if (cart.length > 0) {
            readReport()
            setCartEmpty(false)
        } else {
            setUserReport({})
            setCartEmpty(true)
        }
    }, [cart])
    return (
        <div className="cartContainer">
            <div className="cartContainer__container">
                <h2>Shopping Cart!</h2>
                <hr />
                <div className="cartContainer__products">
                    {cartEmpty ? <div>Your Cart is empty</div> : <CartItem cart={cart} deleteOrder={deleteOrder} />}
                </div>
                <hr />
                {!cartEmpty && (<p className="cartContainer__totalPrice">
                    <b>TOTAL PRICE: {userReport.currency} {userReport.total}</b>
                </p>)}
                <hr />
                {!cartEmpty && (
                    <div className="cartContainer__buttons">
                        <button
                            className="cartContainer__btnclearItemsFromCart"
                            onClick={() => { }}
                        >
                            Delete cart
                        </button>
                        <Link >
                            <button className="cartContainer__btnForm" onClick={() => checkout()}>Proceed to checkout</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartCards