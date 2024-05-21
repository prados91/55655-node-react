
import { React, useState } from 'react'
import { Formik } from "formik";
import axios from 'axios';
import Loading from '../Loading/Loading';
import Swal from 'sweetalert2';

import './Register.css'

const Register = () => {

    const [load, setLoad] = useState(false);
    const [register, setRegister] = useState(false)

    //const API_LINK = "https://serverapp-atp.up.railway.app/api/sessions"
    const API_LINK = "https://serverapp-atp.up.railway.app/api/sessions"


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

        <main className="flex-grow-1 d-flex w-100 flex-wrap justify-content-evenly register__container">
            <section className="w-50 mb-4 d-flex flex-column justify-content-start align-items-center" style={{ minWidth: '720px' }}>
                {!load && !register && (
                    <>
                        <h2 className="mt-5 text-center">REGISTER!</h2>
                        <div style={{ maxWidth: '720px' }} className="w-100 d-flex flex-column justify-content-center align-items-center">
                            <Formik
                                initialValues={{ email: "", password: "", name: "", lastname: "", photo: "", age: "" }}

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
                                        errors.name = "Ingrese nombre";
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
                                    <form onSubmit={handleSubmit} className='register__container--form'>
                                        <input className="register__input" type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder="Email" />{errors.email && touched.email}
                                        <input className="register__input" type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} placeholder="Password" />{errors.password && touched.password}
                                        <input className="register__input" type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} placeholder="Name" />{errors.name && touched.name}
                                        <input className="register__input" type="text" name="lastname" onChange={handleChange} onBlur={handleBlur} value={values.lastname} placeholder="LastName" />
                                        <input className="register__input" type="number" name="age" onChange={handleChange} onBlur={handleBlur} value={values.age} placeholder="Age" />
                                        <input className="register__input" type="text" name="photo" onChange={handleChange} onBlur={handleBlur} value={values.photo} placeholder="URL Photo" />
                                        <button type="submit" disabled={isSubmitting} className="w-100 btn btn-dark mt-3">Register!</button>
                                        <button id="google" type="button" className="w-100 btn btn-dark mt-3">Google!</button>
                                        <button id="github" type="button" className="w-100 btn btn-dark mt-3">Github!</button>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </>
                )}
                {load && !register && <Loading />}
                {!load && register && (
                    <>
                        <h2 className="mt-5 text-center">VERIFY USER!</h2>
                        <div style={{ maxWidth: '500px' }} className="w-100 d-flex flex-column justify-content-center align-items-center">
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
                                    <form onSubmit={handleSubmit} className='register__container--form'>
                                        <input className="register__input" type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder="Email" />{errors.email && touched.email}
                                        <input className="register__input" type="text" name="verifiedCode" onChange={handleChange} onBlur={handleBlur} value={values.verifiedCode} placeholder="Verify Code" />{errors.verifiedCode && touched.verifiedCode}
                                        <button type="submit" disabled={isSubmitting} className="w-100 btn btn-dark mt-3">Verify!</button>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </>
                )}
            </section>
        </main >
    );
};

export default Register