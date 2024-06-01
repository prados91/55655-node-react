import { useContext } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

import Swal from 'sweetalert2';

const Login = () => {

    const { user, admin, setRole, setAdmin, setUser, prem, setPrem, setUserName } = useContext(UserContext);

    const API_LINK = "https://coderbasketstore.up.railway.app//api/sessions/login"
    const API_USER = "https://coderbasketstore.up.railway.app//api/sessions/me"
    // const API_LINK = "https://coderbasketstore.up.railway.app//api/sessions/login"
    //const API_USER = "https://coderbasketstore.up.railway.app//api/sessions/me"


    axios.defaults.withCredentials = true;

    const functionLogIn = async (data) => {
        try {
            const res = await axios.post(API_LINK, data);
            console.log(res)
            if (res.data.statusCode === 200) {
                let cookie = document.cookie.split("; ")
                cookie = cookie.find(each => each.split("=")[0] === "token")
                const response = await axios.post(API_USER, cookie)
                console.log(response)
                const userRole = response.data.response.role
                const userName = response.data.response.name
                setUserName(userName)
                switch (userRole) {
                    case "ADMIN":
                        setAdmin(true);
                        setUser(false);
                        setPrem(false);
                        setRole("ADMIN");
                        break;
                    case "USER":
                        setAdmin(false);
                        setUser(true);
                        setPrem(false);
                        setRole("USER");
                        break;
                    case "PREM":
                        setAdmin(false);
                        setUser(false);
                        setPrem(true);
                        setRole("PREM");
                        break;
                    default:
                        setUser(false);
                        setAdmin(false);
                        setPrem(false);
                        setRole("");
                }
                Swal.fire({
                    title: `${userName} WELCOME TO THE STORE!`,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                })
            } else {
                Swal.fire({
                    title: `Invalid Credentials`,
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
        <main className=" flex-grow-1 d-flex w-100 flex-wrap justify-content-evenly form__container">
            <section className="w-50 mb-4 d-flex flex-column justify-content-start align-items-center" style={{ minWidth: '720px' }}>
                {(!admin && !user && !prem) ? <h2 className="mt-5 mb-2 text-center">LOG IN!</h2> : <h2 className="mt-5 mb-2 text-center">ALREADY LOGED</h2>}
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
                            <form onSubmit={handleSubmit} className='register__container--form'>
                                <input className="register__input" type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder="Correo electrónico" />{errors.email && touched.email && errors.email}
                                <input className="register__input" type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} placeholder="Password" />{errors.password && touched.password && errors.password}
                                {(!admin && !user && !prem) &&
                                    <button type="submit" disabled={isSubmitting} className="w-100 btn btn-dark mt-3">Log In</button>
                                }
                                {(!admin && !user && !prem) &&
                                    // <Link to="/restore" className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Forgot your password?</Link>
                                    <Link
                                        className="btn_restore"
                                        to="/restore"
                                    >
                                        Forgot your password?
                                    </Link>
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


/*.then((result) => {
                    if (result.isConfirmed) {

                        location.replace("/");
                    }
                });*/