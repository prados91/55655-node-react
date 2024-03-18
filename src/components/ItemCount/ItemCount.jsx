import React from 'react'
import './ItemCount.css'

const ItemCount = ({ count, setCount, stock }) => {

    const subItem = () => {
        setCount((currentCount) => (currentCount > 1 ? currentCount - 1 : currentCount));
    };

    const addItem = () => {
        setCount((currentCount) => (currentCount < stock ? currentCount + 1 : currentCount));
    };

    return (
        <div className="itemCount__container">
            <div className="itemCount__quantity">
                <button className="itemCount__quantity--btnSubItem" onClick={subItem}>
                    -
                </button>
                <p className="itemCount__quantity--totalItem">{count}</p>
                <button className="itemCount__quantity--btnAddItem" onClick={addItem}>
                    +
                </button>
            </div>
        </div>
    );
};

export default ItemCount