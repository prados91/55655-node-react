import React from 'react'
import ItemPremModify from './ItemPremModify';
import './ItemPrem.css'


const ItemPrem = ({ products }) => {
    return (
        < div className="container-fluid" >
            <div className="row justify-content-center">
                {
                    products.map((p) => {
                        return (
                            <ItemPremModify
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
        </div >
    );
};

export default ItemPrem;
