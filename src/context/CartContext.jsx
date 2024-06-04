import { createContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const verifyUser = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/sessions/me")
            if (res.data.statusCode === 200) {
                return res.data.response
            } else {
                Swal.fire({
                    title: "Please log in!",
                    iconHtml:
                        '<img src="data:image/png;base64,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"/>',
                    iconColor: "white",
                    confirmButtonColor: "#ff3b3c",
                    timer: 3000,
                    timerProgressBar: true,
                }).then(() => {
                    location.replace('/');
                    return null
                });
            }
        } catch (error) {
            Swal.fire({
                title: `${error.message}`,
                icon: "error",
                text: "Please, try again in a while.",
            }).then(() => {
                location.replace('/');
            });
        }
    }

    const addItem = async (product, quantity) => {
        try {
            const read = await readCart()
            const { _id } = product
            if (read) {
                if (quantity > 0) {
                    const existingItem = cart.find(item => item.product_id._id === _id);
                    if (existingItem) {
                        const oid = existingItem._id
                        await updateOrder(oid, quantity)
                    } else {
                        await createOrder(_id, quantity)
                    }
                }
            } else {
                await createOrder(_id, quantity)
            }
        } catch (error) {
            Swal.fire({
                title: `${error.message}`,
                icon: "error",
                text: "Please, try again in a while.",
            }).then(() => {
                location.replace('/');
            });
        }

    }

    const createOrder = async (product_id, quantity) => {
        try {
            const user = await verifyUser()
            if (user !== null) {
                const data = {
                    user_id: user._id,
                    product_id: product_id,
                    quantity: quantity,
                };
                const response = await axios.post("http://localhost:8080/api/orders", data)
                if (response.data.statusCode === 201) {
                    Swal.fire({
                        title: "Done!",
                        icon: "success",
                        timer: 3000,
                        timerProgressBar: true,
                        confirmButtonColor: "#ff3b3c",
                    })
                } else {
                    Swal.fire({
                        title: "Please, try again!",
                        icon: "error",
                        timer: 5000,
                        timerProgressBar: true,
                        confirmButtonColor: "#ff3b3c",
                    })
                }
            } else {
                Swal.fire({
                    title: "Please log in!",
                    iconHtml:
                        '<img src="data:image/png;base64,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"/>',
                    iconColor: "white",
                    confirmButtonColor: "#ff3b3c",
                    timer: 5000,
                    timerProgressBar: true,
                }).then(() => {
                    location.replace('/login');
                });
            }
        } catch (error) {
            Swal.fire({
                title: `${error.message}`,
                icon: "error",
                text: "Please, try again in a while.",
            }).then(() => {
                location.replace('/');
            });
        }
    }

    const readCart = async () => {
        try {
            const user = await verifyUser()
            if (user !== null) {
                const res = await axios.get("http://localhost:8080/api/orders")
                if (res.data.statusCode === 200) {
                    const cart = res.data.response.docs
                    setCart(cart)
                } else {
                    setCart([])
                }
                return true
            }
            Swal.fire({
                title: "Please log in!",
                iconHtml:
                    '<img src="data:image/png;base64,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"/>',
                iconColor: "white",
                confirmButtonColor: "#ff3b3c",
                timer: 3000,
                timerProgressBar: true,
            }).then(() => {
                location.replace('/');
                return false
            });
        } catch (error) {
            Swal.fire({
                title: `${error.message}`,
                icon: "error",
                text: "Please, try again in a while.",
            }).then(() => {
                location.replace('/');
            });
        }
    };

    const updateOrder = async (oid, quantity) => {
        try {
            const user = await verifyUser()
            if (user !== null) {
                const data = {
                    quantity: quantity
                }
                const res = await axios.put(`http://localhost:8080/api/orders/${oid}`, data)
                if (res.data.statusCode === 200) {
                    Swal.fire({
                        title: `Order updated`,
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK",
                    }).then(() => {
                        readCart()
                        return true
                    });
                } else {
                    Swal.fire({
                        title: `Sorry, we can't update the order`,
                        icon: "error",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK",
                    }).then(() => {
                        readCart()
                    });
                    return false
                }
            }
        } catch (error) {
            Swal.fire({
                title: `${error.message}`,
                icon: "error",
                text: "Please, try again in a while.",
            }).then(() => {
                location.replace('/');
            });
        }

    }

    const deleteOrder = async (oid) => {
        try {
            const user = await verifyUser()
            if (user !== null) {
                let cookie = document.cookie.split("; ")
                cookie = cookie.find(each => each.split("=")[0] === "token")
                const res = await axios.delete(`http://localhost:8080/api/orders/${oid}`, cookie)
                if (res.data.statusCode === 200) {
                    Swal.fire({
                        title: `Order eliminated`,
                        icon: "warning",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK",
                    }).then(() => {
                        readCart()
                    });
                    return true
                } else {
                    Swal.fire({
                        title: `Sorry, we can't delete the order`,
                        icon: "error",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK",
                    }).then(() => {
                        readCart()
                    });
                    return false
                }
            } else {
                Swal.fire({
                    title: "Please log in!",
                    iconHtml:
                        '<img src="data:image/png;base64,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"/>',
                    iconColor: "white",
                    confirmButtonColor: "#ff3b3c",
                    timer: 5000,
                    timerProgressBar: true,
                });
            }

        } catch (error) {
            Swal.fire({
                title: `${error.message}`,
                icon: "error",
                text: "Please, try again in a while.",
            }).then(() => {
                location.replace('/');
            });
        }

    }

    const checkout = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/payments/checkout")
            Swal.fire({
                title: `Checkout!`,
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            }).then(() => {
                location.replace(res.data.url)
            });
            return

        } catch (error) {
            Swal.fire({
                title: `${error.message}`,
                icon: "error",
                text: "Please, try again in a while.",
            }).then(() => {
                location.replace('/');
            });
        }
    }

    const report = async () => {
        try {
            const user = await verifyUser()
            if (user !== null) {
                const { _id } = user
                //const res = await axios.get(`http://localhost:8080/api/orders/total/${_id}`)
                const res = await axios.get(`http://localhost:8080/api/orders/tickets`)

                if (res.data.statusCode === 200) {
                    const report = res.data.response[0]
                    return report
                } else {
                    return false
                }
            } else {
                Swal.fire({
                    title: "Please log in!",
                    iconHtml:
                        '<img src="data:image/png;base64,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"/>',
                    iconColor: "white",
                    confirmButtonColor: "#ff3b3c",
                    timer: 5000,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            Swal.fire({
                title: `${error.message}`,
                icon: "error",
                text: "Please, try again in a while.",
            }).then(() => {
                location.replace('/');
            });
        }
    }
    return (
        <CartContext.Provider value={{ cart, readCart, createOrder, deleteOrder, updateOrder, addItem, checkout, report }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;