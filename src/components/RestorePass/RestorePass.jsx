import { Formik } from "formik";
import axios from "axios";
import Swal from 'sweetalert2';

import './RestorePass.css'

const RestorePass = () => {

    axios.defaults.withCredentials = true;
    //const API_LINK = "https://coderbasketstore.up.railway.app/api/sessions/recovery"
    const API_LINK = "https://coderbasketstore.up.railway.app/api/sessions/recovery"


    const functionRecovery = async (data) => {
        try {
            const res = await axios.post(API_LINK, data);
            console.log(res)
            // if (res.data.message === "Not Found") {
            if (res.data.statusCode !== 200) {
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
                        location.replace("/")
                    }
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className="flex-grow-1 d-flex w-100 flex-wrap justify-content-evenly form__container">
            <section className="w-50 mb-4 d-flex flex-column justify-content-start align-items-center" style={{ minWidth: '720px' }}>
                <h2 className="mt-5 mb-2 text-center">RESTORE YOUR PASSWORD</h2>
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
                        }} >
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
                </div>
            </section>
        </main>
    )
}

export default RestorePass