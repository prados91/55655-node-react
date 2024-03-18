import React from 'react'
import { useState, useEffect } from 'react'
import ItemList from '../ItemList/ItemList'
import Loading from '../Loading/Loading'
import axios from 'axios'

import { NavLink, useParams } from 'react-router-dom'

import './ItemListContainer.css'

const ItemListContainer = ({ greeting }) => {

    const [products, setProducts] = useState([])
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);
    const [load, setLoad] = useState(true)
    const [filter, setFilter] = useState([])
    const { category } = useParams()
    const API_LINK = "http://localhost:8080/api/products"

    useEffect(() => {
        setLoad(true)
        axios(API_LINK)
            .then((res) => {
                console.log(res.data.response);
                setProducts(res.data.response.docs);
                setPrev(res.data.response.prevPage);
                setNext(res.data.response.nextPage);
                if (category != undefined) {
                    const result = products.filter(p => p.category == category)
                    console.log(result)
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
                    <ItemList products={filter} />
                </>
                )}
        </div>
    )
}

export default ItemListContainer
