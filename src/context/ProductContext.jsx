import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext([]);

export const ProductProvider = ({ children }) => {

    const [home, setHome] = useState(false)


    return (
        <ProductContext.Provider value={{ home, setHome }}>
            {children}
        </ProductContext.Provider>
    );

}

export default ProductProvider;