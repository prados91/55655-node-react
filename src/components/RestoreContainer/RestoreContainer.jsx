import Loading from "../Loading/Loading"
import RestoreInfo from "../RestoreInfo/RestoreInfo"
import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"

const RestoreContainer = () => {


    const [exist, setExist] = useState(false)
    const [uid, setUid] = useState("")
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    //const LINK_TOKEN = `http://localhost:8080/api/users/${token}`
    const LINK_TOKEN = `http://localhost:8080/api/users/${token}`

    axios.defaults.withCredentials = true;


    const functionVerifiy = async () => {
        try {
            const res = await axios.post(LINK_TOKEN);
            if (res.data.statusCode === 200) {
                setUid(res.data.user_id)
                setExist(true)
            }
            else {
                Swal.fire({
                    title: "LINK EXPIRED",//res.data.message,
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed || !result.isConfirmed) {
                        location.replace("/")
                    }
                })
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
    };

    useEffect(() => {
        if (token) {
            setExist(false)
            functionVerifiy()
        }
    }, [])

    return (
        <>
            {!exist ?
                (<Loading />) :
                (<RestoreInfo uid={uid} />)}
        </>
    )
}

export default RestoreContainer