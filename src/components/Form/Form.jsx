import React from 'react'
import { Formik } from "formik";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Loading from '../Loading/Loading';
import { collection, addDoc, getFirestore } from 'firebase/firestore'
import './Form.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Form = () => {
    const [load, setLoad] = useState(false);
    const [order, setOrder] = useState(false);
    const [OC_Cliente, setOC_Cliente] = useState({});
    const [orderID, setOrderID] = useState("");
    const [precioTotal, setPrecioTotal] = useState(0);

    const { cart, clearItemsFromCart } = useContext(CartContext);

    const toasty = () => {
        toast.error('No puede comprar sin tener items seleccionados.', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    }

    const OC_Create = (values) => {
        const order = {
            OC_Cliente: {
                name: values.name,
                lastname: values.lastname,
                email: values.email,
            },
            items: cart,
            total: precioTotal,
        };
        const db = getFirestore();
        const orderCollection = collection(db, "OC_Orders");
        addDoc(orderCollection, order).then(({ id }) => {
            setOrder(true);
            setLoad(false);
            setOrderID(id);
            clearItemsFromCart();
        })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        setPrecioTotal(cart.reduce((acum, item) => acum + item.quantity * item.price, 0));
    }, [cart]);

    return (
        <div className="form__container">
            {!load && !order && (
                <>
                    <h2>Ingresa tus datos para confirmar la compra:</h2>
                    <Formik
                        initialValues={{ name: "", lastname: "", email: "" }}

                        validate={(values) => {
                            const errors = {};
                            if (!values.name) {
                                errors.name = "Ingrese su nombre";
                            }
                            if (!values.lastname) {
                                errors.lastname = "Ingrese su apellido";
                            }

                            if (!values.email) {
                                errors.email = "Ingrese un correo válido";
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = "Ingrese un correo válido";
                            }
                            return errors;
                        }}

                        onSubmit={(values, { setSubmitting }) => {
                            if (cart.length > 0) {
                                setLoad(true);
                                OC_Create(values);
                                setOC_Cliente(values);
                                setSubmitting(false);
                            } else {
                                toasty();
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
                                <input className="form__input" type="name" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} placeholder="Nombre" />{errors.name && touched.name && errors.name}
                                <input className="form__input" type="lastname" name="lastname" onChange={handleChange} onBlur={handleBlur} value={values.lastname} placeholder="Apellido" />{errors.lastname && touched.lastname && errors.lastname}
                                <input className="form__input" type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder="Correo electrónico" />{errors.email && touched.email && errors.email}
                                <button type="submit" disabled={isSubmitting} className='form__container--button'>Confirmar compra</button>
                            </form>
                        )}
                    </Formik>
                </>
            )}
            {load && !order && <Loading />}
            {!load && order && (
                <div className='form__order--container'>
                    <div className="form__order--greeting">
                        <p>Muchas gracias {OC_Cliente.name} por comprar en Basketball | Store <hr />
                            Nos contactaremos a {OC_Cliente.email} para finalizar los detalles de la compra y envío. <hr />
                            Tu número de compra es : {orderID}</p>
                    </div>
                    <Link to="/" className="form__order--link">Rebotar a la tienda</Link>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};
export default Form