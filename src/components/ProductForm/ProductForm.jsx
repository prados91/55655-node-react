import { Formik } from "formik";
import axios from "axios";
import Swal from 'sweetalert2';

import 'react-toastify/dist/ReactToastify.css';
import './ProductForm.css'


const ProductForm = () => {

    //const API_LINK = "https://coderbasketstore.up.railway.app//api/products"
    const API_LINK = "https://coderbasketstore.up.railway.app//api/products"

    const functionCreate = async (data) => {
        try {
            const res = await axios.post(API_LINK, data, { withCredentials: true });
            if (res.data.statusCode === 201) {
                Swal.fire({
                    title: "PRODUCT CREATED!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                })/*.then((result) => {
                    if (result.isConfirmed) {
                        location.replace("/");
                    }
                };*/
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className="flex-grow-1 d-flex w-100 flex-wrap justify-content-evenly form__container">
            <section className="w-50 mb-4 d-flex flex-column justify-content-start align-items-center" style={{ minWidth: '720px' }}>
                <h2 className="mt-5 mb-2 text-center">CREATE A NEW PRODUCT!</h2>

                <div style={{ maxWidth: '720px' }} className="w-100 d-flex flex-column justify-content-center align-items-center">
                    <Formik
                        initialValues={{ title: "", photo: "", price: 0, category: "", stock: 0 }}

                        validate={(values) => {
                            const errors = {};
                            if (!values.title) {
                                errors.title = "Need product name";
                            }
                            if (!values.category) {
                                errors.category = "Need product category";
                            }
                            if (!values.price) {
                                errors.price = "Need product price";
                            }
                            return errors;
                        }}

                        onSubmit={(values, { setSubmitting }) => {
                            if (values.title != "" && values.price != "" && values.category != "") {
                                functionCreate(values)
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
                                <input className="form__input" type="text" name="title" onChange={handleChange} onBlur={handleBlur} value={values.title} placeholder="Title" />{errors.title && touched.title && errors.title}
                                <input className="form__input" type="category" name="category" onChange={handleChange} onBlur={handleBlur} value={values.category} placeholder="Category" />{errors.category && touched.category && errors.category}
                                <input className="form__input" type="text" name="photo" onChange={handleChange} onBlur={handleBlur} value={values.photo} placeholder="URL Photo" />
                                <input className="form__input" type="number" name="price" onChange={handleChange} onBlur={handleBlur} value={values.price} placeholder="$ Price" />{errors.price && touched.price && errors.price}
                                <input className="form__input" type="number" name="stock" onChange={handleChange} onBlur={handleBlur} value={values.stock} placeholder="Stock" />
                                <button type="submit" disabled={isSubmitting} className="w-100 btn btn-dark mt-3">CREATE!</button>
                            </form>
                        )}
                    </Formik>
                </div>
            </section>
        </main>
    );
};

export default ProductForm