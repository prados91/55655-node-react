

import './CartItem.css'

const CartItem = ({ cart, deleteOrder }) => {
    return (
        <div>
            {cart.map((p) => (
                <div className="cartItem__producto" key={p.id}>
                    <div className="cartItem__producto--detail">
                        <button className="cartItem__producto--btnDelete" onClick={() => deleteOrder(p._id)}>
                            X
                        </button>
                        <img src={p.product_id.photo} alt={p.title} />
                        <div>
                            {p.product_id.title} (x {p.quantity}u.)
                        </div>
                    </div>
                    <div className="cartItem__producto--price">USD {p.quantity * p.product_id.price}</div>
                </div>
            ))}

        </div>
    );
};

export default CartItem

