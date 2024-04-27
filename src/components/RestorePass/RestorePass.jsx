import { useContext, useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import Swal from 'sweetalert2';

import { UserContext } from "../../context/UserContext";
import './RestorePass.css'

const RestorePass = () => {

    const { id, setId } = useContext(UserContext)
    const [recovery, setRecovery] = useState(false)

    axios.defaults.withCredentials = true;
    const API_LINK = "http://localhost:8080/api/sessions/recovery"
    const API_LINK2 = `http://localhost:8080/api/users/${id}`

    const functionRecovery = async (data) => {
        try {

            const res = await axios.post(API_LINK, data);

            if (res.data.message === "Not Found") {
                Swal.fire({
                    title: `${res.data.message} \n Please, check your information`,
                    icon: "error",
                    confirmButtonColor: "#343330",
                    confirmButtonText: "OK",
                })
            } else {
                Swal.fire({
                    title: `${res.data.message} \n Please, check your email \n ${data.email}`,
                    icon: "info",
                    confirmButtonColor: "#343330",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed || !result.isConfirmed) {
                        setId(res.data.userId)
                        setRecovery(true)
                        //location.replace("/")
                    }
                });

            }
        } catch (error) {
            console.log(error)
        }
    }

    const functionRestore = async (data) => {
        try {
            const modify = { password: data.newPassword }
            const res = await axios.put(API_LINK2, modify);
            if (res.data.statusCode === 200) {
                Swal.fire({
                    title: `${res.data.message} Password updated`,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                })
            } else {
                Swal.fire({
                    title: res.data.message,
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="flex-grow-1 d-flex w-100 flex-wrap justify-content-evenly form__container">
            <section className="w-50 mb-4 d-flex flex-column justify-content-start align-items-center" style={{ minWidth: '720px' }}>
                {recovery == false ? (<h2 className="mt-5 mb-2 text-center">RESTORE YOUR PASSWORD</h2>) : (<h2 className="mt-5 mb-2 text-center">INSERT NEW PASSWORD</h2>)}

                {!recovery &&
                    <div style={{ maxWidth: '720px' }} className="w-100 d-flex flex-column justify-content-center align-items-center">
                        <Formik
                            initialValues={{ email: "" }}

                            validate={(values) => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = "Ingrese un correo válido";
                                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                    errors.email = "Ingrese un correo válido";
                                }
                                return errors;
                            }}

                            onSubmit={(values, { setSubmitting }) => {
                                if (values.email != "") {
                                    functionRecovery(values)
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
                                    <input className="register__input" type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder="Email" />{errors.email && touched.email && errors.email}
                                    <button type="submit" disabled={isSubmitting} className="w-100 btn btn-dark mt-3">Restore</button>
                                </form>
                            )}
                        </Formik>
                    </div>}

                {recovery &&
                    <div style={{ maxWidth: '720px' }} className="w-100 d-flex flex-column justify-content-center align-items-center">
                        <Formik
                            initialValues={{ newPassword: "", confirmPassword: "" }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.newPassword) {
                                    errors.newPassword = "Ingrese nueva contraseña";
                                }
                                if (!values.confirmPassword) {
                                    errors.confirmPassword = "Confirme nueva contraseña";
                                }
                                if (values.newPassword != values.confirmPassword) {
                                    errors.confirmPassword = "Las contraseñas deben coincidir"
                                }
                                return errors;
                            }}

                            onSubmit={(values, { setSubmitting }) => {
                                if (values.confirmPassword != "" && values.newPassword != "" && (values.newPassword === values.confirmPassword)) {
                                    functionRestore(values)
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
                                    <input
                                        className="register__input"
                                        type="password"
                                        name="newPassword"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.newPassword}
                                        placeholder="New password"
                                    />{errors.newPassword && touched.newPassword && errors.newPassword}
                                    <input
                                        className="register__input"
                                        type="password"
                                        name="confirmPassword"
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.confirmPassword}
                                        placeholder="Confirm new password"
                                    />{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}

                                    <button type="submit" disabled={isSubmitting} className="w-100 btn btn-dark mt-3">Restore Password</button>

                                </form>
                            )}
                        </Formik>
                    </div>}
            </section>
        </main>
    )
}

export default RestorePass