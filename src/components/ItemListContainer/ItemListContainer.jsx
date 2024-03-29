import React from 'react'
import { useState, useEffect } from 'react'
import ItemList from '../ItemList/ItemList'
import Loading from '../Loading/Loading'
import axios from 'axios'

import { NavLink, useParams } from 'react-router-dom'

import './ItemListContainer.css'

const ItemListContainer = ({ greeting }) => {

    const [products, setProducts] = useState([])
    const [hasPrev, setHasPrev] = useState(false);
    const [hasNext, setHasNext] = useState(false);
    //ver como usar next y prev para paginar
    const [load, setLoad] = useState(true)
    const [filter, setFilter] = useState([])
    const { category } = useParams()
    const API_LINK = "http://localhost:8080/api/products"

    useEffect(() => {
        setLoad(true)
        axios(API_LINK, { withCredentials: true })
            .then((res) => {
                setProducts(res.data.response.docs);
                setHasPrev(res.data.response.hasPrevPage);
                setHasNext(res.data.response.hasNextPage);
                if (category != undefined) {
                    const result = products.filter(p => p.category == category)
                    setFilter(result)
                }
                else {
                    setFilter(res.data.response.docs)
                }
                setLoad(false)
            })
            .catch((err) => console.log(err));
    }, [category]);

    return (
        <div className="itemListContainer__container">
            {load ? (<Loading />) :
                (<>
                    <h1>{greeting}</h1>
                    <ItemList products={products} />
                </>
                )}
        </div>
    )
}

export default ItemListContainer
