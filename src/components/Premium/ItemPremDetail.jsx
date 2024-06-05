import { useEffect, useState, useContext } from "react";
import ItemPremDetailModify from "./ItemPremDetailModify";
import axios from 'axios';
import Loading from '../Loading/Loading'
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";

import './ItemPremDetail.css'
const ItemPremDetail = () => {

    const [product, setProduct] = useState({})
    const [load, setLoad] = useState(true)
    const { pid } = useParams()
    const { verifyUser } = useContext(UserContext)
    const API_LINK = `http://localhost:8080/api/products/${pid}`

    const getProduct = async () => {
        try {
            const user = await verifyUser()
            if (user.role === "PREM") {
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
                        timer: 50000,
                        timerProgressBar: true,
                    }).then(() => {
                        location.replace('/')
                    });
                    return {}
                }
            } else {
                Swal.fire({
                    title: "Forbidden",
                    icon: "error",
                    timer: 5000,
                    timerProgressBar: true,
                }).then(() => {
                    location.replace('/');
                });
            }
        } catch (error) {
            Swal.fire({
                title: `${error.message}`,
                icon: "error",
                text: "Please, try again in a while.",
                timer: 50000,
                timerProgressBar: true,
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
            {load ? (<Loading />) : <ItemPremDetailModify product={product} />}
        </div>
    )
}

export default ItemPremDetail