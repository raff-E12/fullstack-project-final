import { createContext, useContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems(prev => [...prev, product]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}

function useCart() {
    return useContext(CartContext);
}

export { CartProvider, useCart };