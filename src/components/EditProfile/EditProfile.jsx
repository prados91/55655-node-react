import { Link } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa"
import { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import Swal from 'sweetalert2';
import Loading from '../Loading/Loading';

import './EditProfile.css'

const EditProfile = () => {
    const [isLoading, setIsLoading] = useState(false)


    return (
        <>
            {!isLoading ? (<div className='container-fluid wrapper_container'>
                <div style={{ maxWidth: '420px' }} className='container wrapper'>
                    <h1>Edit Profile</h1>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.password) {
                                errors.password = "Ingrese contraseña";
                            }
                            if (!values.email) {
                                errors.email = "Ingrese un correo válido";
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = "Ingrese un correo válido";
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.email != "" && values.password != "") {

                                setSubmitting(false);
                            } else {
                                console.log("error")
                            }
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
                            <form onSubmit={handleSubmit} className='form-container'>
                                <div className='input-box'>
                                    <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder="Email" required />{errors.email && touched.email && errors.email}
                                    <FaUser className='icon' />
                                </div>
                                <button type="submit" disabled={isSubmitting} className="w-100 btn btn-dark">Confirm new data</button>
                                <Link className="w-100 btn btn-danger">Return</Link>
                            </form>
                        )}
                    </Formik>
                </div>
            </div >) : (<Loading />)}
        </>
    )
};
export default EditProfile;