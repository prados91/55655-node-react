/*
import { Link } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa"
import { useContext } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import Swal from 'sweetalert2';

import './LoginForm.css'

const LoginForm = () => {

    const { user, admin, setRole, setAdmin, setUser, prem, setPrem, setUserName } = useContext(UserContext);

    const API_LINK = "https://serverapp-atp.up.railway.app/api/sessions/login"
    const API_USER = "https://serverapp-atp.up.railway.app/api/sessions/me"
    // const API_LINK = "https://serverapp-atp.up.railway.app/api/sessions/login"
    //const API_USER = "https://serverapp-atp.up.railway.app/api/sessions/me"


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
            Swal.fire({
                title: `SERVER ERROR`,
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            })
        }
    };

    return (
        <div className='container wrapper_container'>
            <div className='wrapper'>
                <form action="" className='form-container'>
                    <h1>Login</h1>
                    <div className='input-box'>
                        <input type="email" placeholder='Email' required />
                        <FaUser className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="password" placeholder='Password' required />
                        <FaLock className='icon' />
                    </div>
                    <div className="remember-forgot">
                        <Link className="btn_restore" to="/restore"> Forgot your password?</Link>
                    </div>
                    <button type="submit" className="w-100 btn btn-dark">Login</button>
                    <div className="register-link">
                        <p>{"Don't have an account? "}<Link to="/register" className='btn_restore'>Register</Link></p>
                    </div>
                </form>
            </div>
        </div >
    )
};

export default LoginForm;
*/

import { Link } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa"
import { useContext } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import Swal from 'sweetalert2';

import './LoginForm.css'

const LoginForm = () => {

    const { user, admin, setRole, setAdmin, setUser, prem, setPrem, setUserName } = useContext(UserContext);

    const API_LINK = "https://serverapp-atp.up.railway.app/api/sessions/login"
    const API_USER = "https://serverapp-atp.up.railway.app/api/sessions/me"

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
            Swal.fire({
                title: `SERVER ERROR`,
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            })
        }
    };

    return (
        <div className='container-fluid wrapper_container'>
            <div style={{ maxWidth: '420px' }} className='container wrapper'>
                {(!admin && !user && !prem) ? <h1>Login</h1> : <h1>Already Loged</h1>}
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
                        <form onSubmit={handleSubmit} className='form-container'>
                            <div className='input-box'>
                                <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder="Email" required />{errors.email && touched.email && errors.email}
                                <FaUser className='icon' />
                            </div>
                            <div className='input-box'>
                                <input type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} placeholder="Password" required />{errors.password && touched.password && errors.password}
                                <FaLock className='icon' />
                            </div>
                            {(!admin && !user && !prem) &&
                                <button type="submit" disabled={isSubmitting} className="w-100 btn btn-dark">Login</button>
                            }
                            <div className="register-link">
                                <p>{"Don't have an account? "}<Link to="/register" className='btn_restore'>Register</Link></p>
                            </div>
                            <div className="remember-forgot">
                                <Link className="btn_restore" to="/restore"> Forgot your password?</Link>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div >
    )
};

export default LoginForm;