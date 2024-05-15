import { React, useState, useEffect, useContext } from 'react'
import ItemList from '../ItemList/ItemList'
import Loading from '../Loading/Loading'
import axios from 'axios'
import PageCount from '../PageCount/PageCount'

import Filter from '../Filter/Filter'

import { ProductContext } from '../../context/ProductContext'


import './ItemListContainer.css'
const ItemListContainer = ({ greeting }) => {

    axios.defaults.withCredentials = true;

    const [products, setProducts] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [load, setLoad] = useState(true)
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState("")

    const { home, setHome } = useContext(ProductContext)

    //const API_LINK = `https://serverapp-atp.up.railway.app/api/products/?title=${title}&page=${page}`
    const API_LINK = `https://serverapp-atp.up.railway.app/api/products/?title=${title}&page=${page}`


    useEffect(() => {
        setLoad(true)
        axios.get(API_LINK)
            .then((res) => {
                setProducts(() => [...res.data.response.docs]);
                setTotalPages(res.data.response.totalPages)
                setLoad(false)
            })
            .catch((err) => console.log(err));
    }, [page]);

    useEffect(() => {
        setLoad(true)
        setPage(1)
        setTitle("")
        axios.get(API_LINK)
            .then((res) => {
                setProducts(() => [...res.data.response.docs]);
                setTotalPages(res.data.response.totalPages)
                setHome(false)
                setLoad(false)
            })
            .catch((err) => console.log(err));
    }, [home]);

    useEffect(() => {
        setLoad(true)
        setPage(1)
        axios.get(API_LINK)
            .then((res) => {
                setProducts(() => [...res.data.response.docs]);
                setTotalPages(res.data.response.totalPages)
                setLoad(false)
            })
            .catch((err) => console.log(err));
    }, [title]);


    return (
        <div >
            {load ? (<Loading />) :
                (
                    <div className="container itemListContainer__container d-flex flex-column justify-content-center align-items-center">
                        <h1>{greeting}</h1>
                        <Filter setTitle={setTitle} />
                        <div>
                            <ItemList products={products} />
                        </div>
                        <div className="mt-auto">
                            <PageCount page={page} totalPages={totalPages} setPage={setPage} />
                        </div>
                    </div>
                )}
        </div>
    )
}

export default ItemListContainer
