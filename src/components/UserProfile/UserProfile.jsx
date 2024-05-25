import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import './UserProfile.css'
import Swal from 'sweetalert2';

const UserProfile = () => {

    axios.defaults.withCredentials = true;
    const { uid } = useParams()
    const [user, setUser] = useState({})

    const readUser = async (uid) => {
        const API_LINK = `http://localhost:8080/api/users/${uid}`

        const res = await axios.get(API_LINK, document.cookie)
        if (res.data.statusCode === 200) {
            setUser(res.data.response)
        } else {
            Swal.fire({
                title: res.data.message,
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                    setUser({})
                    location.replace("/");
                }
            });
        }
    }

    useEffect(() => {
        readUser(uid)
    }, [uid])
    return (
        <div className='container wrapper_container'>
            <div className="col-10 col-sm-6 col-md-4 col-xl-3 p-4 d-flex align-items-stretch">
                <div className="item__card">
                    <img src={user.photo} className="img-fluid" />
                    <div className="item__card--data">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.role}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default UserProfile;
