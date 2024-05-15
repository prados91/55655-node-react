import { useEffect, useState } from "react";
import ItemDetail from '../ItemDetail/ItemDetail'
import axios from 'axios';
import Loading from '../Loading/Loading'

import './ItemDetailContainer.css'
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () => {

    const [products, setProduct] = useState([])
    const [load, setLoad] = useState(true)
    const { pid } = useParams()

    const API_LINK = "https://serverapp-atp.up.railway.app/api/products"

    useEffect(() => {
        setLoad(true)
        axios(API_LINK)
            .then((res) => {
                setProduct(res.data.response.docs);
                setLoad(false)
            })
            .catch((err) => console.log(err));
    }, [pid]);

    const result = products.find(p => p._id === pid)

    return (
        <div className='itemDetailContainer__container'>
            {load ? (<Loading />) : <ItemDetail products={result} />}
        </div>
    )
}

export default ItemDetailContainer