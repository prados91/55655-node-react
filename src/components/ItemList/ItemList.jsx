import React from 'react'
import Item from '../Item/Item'
import './ItemList.css'


const ItemList = ({ products }) => {
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                {
                    products.map((p) => {
                        return (
                            <Item
                                key={p._id}
                                id={p._id}
                                title={p.title}
                                price={p.price}
                                photo={p.photo}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ItemList;
