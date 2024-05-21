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
    //const LINK_TOKEN = `https://serverapp-atp.up.railway.app/api/users/${token}`
    const LINK_TOKEN = `https://serverapp-atp.up.railway.app/api/users/${token}`

    axios.defaults.withCredentials = true;


    const functionVerifiy = async () => {
        try {
            const res = await axios.post(LINK_TOKEN);
            console.log(res)
            if (res.data.statusCode === 200) {
                setUid(res.data.user_id)
                console.log("OK")
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
            console.log(error);
        }
    };

    useEffect(() => {
        if (token) {
            setExist(false)
            functionVerifiy()
        }
    }, [])

    console.log(exist)

    return (
        <>
            {!exist ?
                (<Loading />) :
                (<RestoreInfo uid={uid} />)}
        </>
    )
}

export default RestoreContainer