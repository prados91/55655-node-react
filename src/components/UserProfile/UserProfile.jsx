import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import './UserProfile.css'
const UserProfile = () => {

    axios.defaults.withCredentials = true;
    const { uid } = useParams()
    const [user, setUser] = useState({})

    const readUser = async (uid) => {
        try {
            const API_LINK = `https://coderbasketstore.up.railway.app//api/users/${uid}`;
            const res = await axios.get(API_LINK, document.cookie);
            if (res.data.statusCode === 200) {
                setUser(res.data.response);
            } else {
                Swal.fire({
                    name: res.data.message,
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setUser({});
                        location.replace('/');
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                name: error,
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    setUser({});
                    location.replace('/');
                }
            });
        }
    };

    useEffect(() => {
        readUser(uid)
    }, [uid])

    return (

        <div className='container'>
            <div className="userProfile__container container" >
                <div className="row userProfile__columns">
                    <div className=" col-md-4 col-sm-4 userProfile__column--photo m-0 p-0">
                        <div className='profile-img'>
                            <img src={user.photo} alt={user.name} className="img-fluid " />
                        </div>
                        <div>
                            <p className='card-text p-2'>{user.name}</p>
                        </div>
                        <div>
                            <p className='card-text p-2'><strong>Role:</strong> {user.role}</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6 userProfile__column--info p-0">
                        <p className='card-text'><strong>Id:</strong> {user._id}</p>
                        <p className='card-text'><strong>Name:</strong> {user.name}</p>
                        <p className='card-text'><strong>Last name:</strong> {user.lastName || 'No se ha ingresado apellido'}</p>
                        <p className='card-text'><strong>Email:</strong> {user.email}</p>
                        <p className='card-text'><strong>User created:</strong> {user.createdAt}</p>
                        <p className='card-text'><strong>Last modification:</strong> {user.updatedAt}</p>
                        <div className='userProfile_button'>
                            <Link to={`/edit-user/${uid}`} className='btn btn-dark  '>Edit Profile</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default UserProfile;
