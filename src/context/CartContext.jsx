import { createContext, useState, useEffect } from "react";

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const getCartFromLS = () => {
        const cartLSGet = JSON.parse(localStorage.getItem("cartLS"));
        cartLSGet && setCart(cartLSGet);
    };

    const setCartLS = () => localStorage.setItem("cartLS", JSON.stringify(cart));

    const itemInCart = (id) => cart.some((item) => item.id === id);

    const addItemToCart = (product, quantity) => {
        const { id, title, price, photo } = product;

        if (quantity > 0) {
            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                const updateCart = cart.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + quantity};
                    }
                    return item;
                });

                setCart(updateCart);
            } else {
                const newItem = { id, title, price, photo, quantity };
                const newCart = [...cart, newItem];
                setCart(newCart);
            }
        }
    };

    const deleteItemFromCart = (id) => {
        if (itemInCart(id)) {
            const updateCart = cart.filter((item) => item.id !== id);
            setCart(updateCart);
        }
    };

    const clearItemsFromCart = () => {
        setCart([]);
    };

    useEffect(() => {
        getCartFromLS();
    }, []);

    useEffect(() => {
        setCartLS();
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, addItemToCart, deleteItemFromCart, itemInCart, clearItemsFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;