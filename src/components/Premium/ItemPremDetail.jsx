import { useEffect, useState } from "react";
import ItemDetailModify from "./ItemPremDetailModify";
import axios from 'axios';
import Loading from '../Loading/Loading'
import Swal from "sweetalert2";

import './ItemPremDetail.css'
import { useParams } from 'react-router-dom';

const ItemPremDetail = () => {

    const [product, setProduct] = useState({})
    const [load, setLoad] = useState(true)
    const { pid } = useParams()

    const API_LINK = `http://localhost:8080/api/products/${pid}`

    const getProduct = async () => {
        try {
            const res = await axios.get(API_LINK)
            if (res.data.statusCode === 200) {
                setProduct(res.data.response)
                setLoad(false)
                return res.data.response
            } else {
                Swal.fire({
                    title: `${res.data.message}`,
                    icon: "error",
                    text: "Please, try again in a while.",
                }).then(() => {
                    location.replace('/')
                });
                return {}
            }
        } catch (error) {
            Swal.fire({
                title: `${error.message}`,
                icon: "error",
                text: "Please, try again in a while.",
            }).then(() => {
                location.replace('/')
            });
        }
    }

    useEffect(() => {
        setLoad(true)
        getProduct()
    }, [pid]);

    return (
        <div className='ItemPremDetail__container'>
            {load ? (<Loading />) : <ItemDetailModify product={product} />}
        </div>
    )
}

export default ItemPremDetail