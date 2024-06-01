
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Formik } from "formik";
import axios from 'axios';
import Loading from '../Loading/Loading';
import Swal from 'sweetalert2';

import './Register.css'

const Register = () => {

    const [load, setLoad] = useState(false);
    const [register, setRegister] = useState(false)
    const API_LINK = "https://coderbasketstore.up.railway.app//api/sessions"


    const functionRegister = async (data) => {
        try {
            setRegister(false)
            setLoad(true)
            const res = await axios.post(API_LINK + "/register", data, { withCredentials: true });
            console.log(res)
            if (res.data.statusCode === 201) {
                setLoad(false)
                setRegister(true)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const functionVerify = async (data) => {
        try {
            const res = await axios.post(API_LINK + "/verify", data, { withCredentials: true });
            if (res.data.statusCode === 200) {

                Swal.fire({
                    title: "Verified USER",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        setRegister(false)
                        location.replace("/login");
                    }
                });

            }
        } catch (error) {
            console.log(error)
        }
    }
    return (

        <>
            {!load && !register && (
                <div className='container-fluid register-container'>
                    <div style={{ maxWidth: '420px' }} className='container register'>
                        <h1>Register!</h1>
                        <Formik
                            initialValues={{ email: "", password: "", name: "", lastname: "", photo: "" }}
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
                                if (!values.name) {
                                    errors.name = "Ingrese su nombre";
                                }
                                if (!values.lastname) {
                                    errors.lastname = "Ingrese su apellido";
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                if (values.email != "" && values.password != "") {
                                    functionRegister(values)
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
                                <form onSubmit={handleSubmit} className='registerForm-container'>
                                    <div className='registerInput-box'>
                                        <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} placeholder="Name" required />{errors.name && touched.name && errors.name}
                                    </div>
                                    <div className='registerInput-box'>
                                        <input type="text" name="lastname" onChange={handleChange} onBlur={handleBlur} value={values.lastname} placeholder="Last name" required />{errors.lastname && touched.lastname && errors.lastname}
                                    </div>
                                    <div className='registerInput-box'>
                                        <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder="Email" required />{errors.email && touched.email && errors.email}
                                    </div>
                                    <div className='registerInput-box'>
                                        <input type="text" name="photo" onChange={handleChange} onBlur={handleBlur} value={values.photo} placeholder="URL Photo" required />{errors.photo && touched.photo && errors.photo}
                                    </div>
                                    <div className='registerForm-buttons'>
                                        <button type="submit" disabled={isSubmitting} className="w-100 btn btn-dark">Register!</button>
                                        <div className="register-link">
                                            <p>Do you have an account? <Link to="/login" className='btn_restore'>Log in!</Link></p>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div >
            )}
            {load && !register && <Loading />}
            {!load && register && (
                <div className='container-fluid register-container'>
                    <div style={{ maxWidth: '420px' }} className='container register'>
                        <h1>VERIFY USER!!</h1>
                        <Formik
                            initialValues={{ email: "", verifiedCode: "" }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.verifiedCode) {
                                    errors.verifiedCode = "Ingrese el código de verificación";
                                }
                                if (!values.email) {
                                    errors.email = "Ingrese un correo válido";
                                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                    errors.email = "Ingrese un correo válido";
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                if (values.email != "" && values.verifiedCode != "") {
                                    functionVerify(values)
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
                                <form onSubmit={handleSubmit} className='registerForm-container'>
                                    <div className='registerInput-box'>
                                        <input type="text" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder="Email" />{errors.email && touched.email}
                                    </div>
                                    <div className='registerInput-box'>
                                        <input type="text" name="verifiedCode" onChange={handleChange} onBlur={handleBlur} value={values.verifiedCode} placeholder="Verify Code" />{errors.verifiedCode && touched.verifiedCode}
                                    </div>
                                    <div className='registerForm-buttons'>
                                        <button type="submit" disabled={isSubmitting} className="w-100 btn btn-dark">Verify!</button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </>
    );
};

export default Register