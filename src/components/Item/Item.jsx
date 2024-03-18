import React from 'react'
import { Link } from "react-router-dom"

import "./Item.css"

const Item = ({ id, title, price, photo }) => {

    return (
        <div className="col-10 col-sm-6 col-md-4 col-xl-3 p-4 d-flex align-items-stretch">
            <div className="item__card">
                <img src={photo} className="img-fluid" />
                <div className="item__card--data">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">${price}</p>
                    <Link to={`/products/${id}`} className='item__card--link'>Ver mas</Link>
                </div>
            </div>
        </div>
    );
};

export default Item
