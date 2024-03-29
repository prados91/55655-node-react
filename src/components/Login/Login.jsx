import { React, useState, useEffect, useContext } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import Loading from '../Loading/Loading';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

import Swal from 'sweetalert2';

const Login = () => {

    const [loading, setLoading] = useState(false);
    const [log, setLog] = useState(false)

    const { user, admin, setRole, setAdmin, setUser} = useContext(UserContext);

    const API_LINK = "http://localhost:8080/api/sessions/login"
    const API_USER = "http://localhost:8080/api/users"
    axios.defaults.withCredentials = true;

    const functionLogIn = async (data) => {
        try {
            const res = await axios.post(API_LINK, data);
            //console.log(res);
            if (res.data.statusCode === 200) {
                let cookie = document.cookie.split("; ")
                cookie = cookie.find(each => each.split("=")[0] === "token")
                //console.log(cookie);
                const res2 = await axios.get(API_USER + `/?email=${data.email}`, cookie)
                console.log(res2.data.response.docs[0].role)

                if (res2.data.response.docs[0].role === "ADMIN") {
                    setAdmin(true)
                    setUser(false)
                    setRole("ADMIN")
                } else {
                    if (res2.data.response.docs[0].role === "USER") {
                        setUser(true)
                        setAdmin(false)
                        setRole("USER")
                    } else {
                        setUser(true)
                        setAdmin(false)
                        setRole("")
                    }
                }
                Swal.fire({
                    title: `${res2.data.response.docs[0].name} WELCOME TO THE STORE!`,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                })
                /*.then((result) => {
                    if (result.isConfirmed) {

                        location.replace("/");
                    }
                });*/
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="flex-grow-1 d-flex w-100 flex-wrap justify-content-evenly register_container">
            <section className="w-50 mb-4 d-flex flex-column justify-content-start align-items-center" style={{ minWidth: '720px' }}>
                {(!admin && !user) ? <h2 className="mt-5 mb-2 text-center">LOG IN!</h2> : <h2 className="mt-5 mb-2 text-center">ALREADY LOGED</h2>}

                <div style={{ maxWidth: '720px' }} className="w-100 d-flex flex-column justify-content-center align-items-center">
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
                                functionLogIn(values)
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
                            <form onSubmit={handleSubmit} className='form__container--form'>
                                <input className="form__input" type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder="Correo electrónico" />{errors.email && touched.email && errors.email}
                                <input className="form__input" type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} placeholder="Password" />{errors.password && touched.password && errors.password}

                                {(!admin && !user) &&
                                    <button type="submit" disabled={isSubmitting} className="w-100 btn btn-dark mt-3">Log In</button>
                                }
                            </form>
                        )}
                    </Formik>
                </div>
            </section>
        </main>
    )
}

export default Login