import { Link } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa"
import { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import Swal from 'sweetalert2';

import './LoginForm.css'
import Loading from '../Loading/Loading';

const LoginForm = () => {

    const { verifyUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [prem, setPrem] = useState(false)
    const [role, setRole] = useState("")
    const API_LINK = "http://localhost:8080/api/sessions/login"
    axios.defaults.withCredentials = true;

    const functionLogIn = async (data) => {
        setRole("")
        try {
            setIsLoading(true)
            const res = await axios.post(API_LINK, data);
            if (res.data.statusCode === 200) {
                const { role, name } = await verifyUser()
                setRole(role)
                Swal.fire({
                    title: `${name} WELCOME TO THE STORE!`,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                }).then(() => {
                    setIsLoading(false)
                    location.replace("/")
                });
            } else {
                Swal.fire({
                    title: `Invalid Credentials`,
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                }).then(() => {
                    setIsLoading(false)
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
    };

    useEffect(() => {
        switch (role) {
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
    }, [role])

    return (
        <>
            {!isLoading ? (<div className='container-fluid wrapper_container'>
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
                                Swal.fire({
                                    title: `ERROR`,
                                    icon: "error",
                                    text: "Please, try again in a while.",
                                })
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
                                {(!admin && !user && !prem) &&
                                    <div className='input-box'>
                                        <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder="Email" required />{errors.email && touched.email && errors.email}
                                        <FaUser className='icon' />
                                    </div>}
                                {(!admin && !user && !prem) &&
                                    <div className='input-box'>
                                        <input type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} placeholder="Password" required />{errors.password && touched.password && errors.password}
                                        <FaLock className='icon' />
                                    </div>}
                                {(!admin && !user && !prem) &&
                                    <button type="submit" disabled={isSubmitting} className="w-100 btn btn-dark">Login</button>
                                }
                                {(!admin && !user && !prem) &&
                                    <div className="register-link">
                                        <p>{"Don't have an account? "}<Link to="/register" className='btn_restore'>Register</Link></p>
                                    </div>
                                }
                                {(!admin && !user && !prem) &&
                                    <div className="remember-forgot">
                                        <Link className="btn_restore" to="/restore"> Forgot your password?</Link>
                                    </div>
                                }
                                {(admin || user || prem) && <Link to="/" className="w-100 btn btn-dark"> Go Back to the Store! </Link>}
                            </form>
                        )}
                    </Formik>
                </div>
            </div >) : (<Loading />)}
        </>
    )
};
export default LoginForm;