import { Formik } from "formik";
import axios from 'axios';
import Swal from 'sweetalert2';

const RestoreInfo = ({ uid }) => {
    /*
        const { uid } = useParams()
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');*/
    //const API_LINK = `https://serverapp-atp.up.railway.app/api/users/${uid}`
    const API_LINK = `https://serverapp-atp.up.railway.app/api/users/${uid}`

    //const LINK_TOKEN = `https://serverapp-atp.up.railway.app/api/users/${token}`
    axios.defaults.withCredentials = true;

    const functionRestore = async (data) => {
        try {
            // let cookie = document.cookie.split("; ")
            // cookie = cookie.find(each => each.split("=")[0] === "token")
            // if (cookie) {
            const modify = { password: data.newPassword }
            const res = await axios.put(API_LINK, modify);
            if (res.data.statusCode === 201) {
                Swal.fire({
                    title: `Password updated`,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed || !result.isConfirmed) {
                        location.replace("/login")
                    }
                })
            } else {
                Swal.fire({
                    title: res.data.message,
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                })
            }
            // } else {
            //     Swal.fire({
            //         title: "Link expired",
            //         icon: "error",
            //         confirmButtonColor: "#3085d6",
            //         confirmButtonText: "OK",
            //     }).then((result) => {
            //         if (result.isConfirmed || !result.isConfirmed) {
            //             //location.replace("/")
            //         }
            //     })
            // }
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <main className="flex-grow-1 d-flex w-100 flex-wrap justify-content-evenly form__container">
            <section className="w-50 mb-4 d-flex flex-column justify-content-start align-items-center" style={{ minWidth: '720px' }}>
                <h2 className="mt-5 mb-2 text-center">RESTORE YOUR PASSWORD</h2>

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
                </div>
            </section>
        </main>
    )
}

export default RestoreInfo