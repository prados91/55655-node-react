import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../Loading/Loading';

import { UserContext } from '../../context/UserContext';

import './EditProfile.css'

const EditProfile = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [actualUser, setActualUser] = useState({})

    const { verifyUser } = useContext(UserContext)

    const { uid } = useParams()

    const readUser = async () => {
        const res = await verifyUser()
        if (res) {
            setActualUser(res)
            setIsLoading(true)
            return true
        } else {
            setActualUser({})
        }
        return false
    }


    const updateUser = async (values) => {
        try {
            const res = await axios.put(`http://localhost:8080/api/users/${uid}`, values)
            if (res.data.statusCode === 201) {
                Swal.fire({
                    title: `Information updated!`,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                }).then(() => {
                    setIsLoading(false)
                    location.replace(`/user/${uid}`)
                });
            } else {
                Swal.fire({
                    title: `Invalid Credentials`,
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                }).then(() => {
                    setIsLoading(false)
                    location.replace('/')
                });
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
        // setActualUser({})
        setIsLoading(false)
        readUser()
    }, [uid])

    return (
        <>
            {isLoading ? (<div className='container-fluid editProfile-container'>
                <div style={{ maxWidth: '420px' }} className='container editProfile'>
                    <h1>Edit: {actualUser.name ? actualUser.name : "ERROR"} Profile</h1>
                    <Formik
                        initialValues={{ name: actualUser.name, lastName: actualUser.lastName, email: actualUser.email, photo: actualUser.photo }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.name) {
                                errors.name = "Ingrese su nombre";
                            }
                            if (!values.lastName) {
                                errors.lastName = "Ingrese su apellido";
                            }
                            if (!values.email) {
                                errors.email = "Ingrese un correo válido";
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = "Ingrese un correo válido";
                            }
                            if (!values.photo) {
                                errors.photo = "Ingrese una URL válida";
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            const updatedValues = {
                                name: values.name || actualUser.name,
                                lastName: values.lastName || actualUser.lastName,
                                email: values.email || actualUser.email,
                                photo: values.photo || actualUser.photo
                            };
                            updateUser(updatedValues)
                            setSubmitting(false);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form onSubmit={handleSubmit} className='editForm-container'>
                                <div className='formInput-box'>
                                    <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} placeholder="Name" />{errors.name && touched.name && errors.name}
                                </div>
                                <div className='formInput-box'>
                                    <input type="text" name="lastName" onChange={handleChange} onBlur={handleBlur} value={values.lastName} placeholder="Last name" />{errors.lastName && touched.lastName && errors.lastName}
                                </div>
                                <div className='formInput-box'>
                                    <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder="Email" required />{errors.email && touched.email && errors.email}
                                </div>
                                <div className='formInput-box'>
                                    <input type="text" name="photo" onChange={handleChange} onBlur={handleBlur} value={values.photo} placeholder="URL Photo" />{errors.photo && touched.photo && errors.photo}
                                </div>
                                <div className='editForm-buttons'>
                                    <button type="submit" disabled={isSubmitting} className="w-20 btn btn-dark" >Confirm new data</button>
                                    <Link to={`/user/${actualUser._id}`} className="w-20 btn btn-danger">Return</Link>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div >) : (<Loading />)}
        </>
    )
};
export default EditProfile;