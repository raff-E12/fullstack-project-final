import { createContext, useContext, useState, useEffect } from "react"; // Aggiungi useEffect

const CartContext = createContext();

function CartProvider({ children }) {
    // 1. Inizializza lo stato leggendo da localStorage o con un array vuoto se non c'è nulla
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCart = localStorage.getItem('ecom_cart_items'); // Usa una chiave unica per il tuo carrello
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Errore nel parsing del carrello da localStorage:", error);
            // In caso di errore nel parsing (es. JSON non valido), ritorna un carrello vuoto per evitare crash
            return [];
        }
    });

    // 2. Utilizza useEffect per salvare il carrello in localStorage ogni volta che cartItems cambia
    useEffect(() => {
        try {
            localStorage.setItem('ecom_cart_items', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Errore nel salvataggio del carrello in localStorage:", error);
        }
    }, [cartItems]); // Questa dipendenza fa sì che l'effetto si attivi solo quando cartItems cambia

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existingProduct = prev.find(item => item.id === product.id);

            if (existingProduct) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    // **IMPORTANTE:** Aggiungi qui anche le altre funzioni per manipolare il carrello
    // (es. removeFromCart, updateQuantity), altrimenti il carrello potrà solo aggiungere.
    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        setCartItems(prev => prev.map(item =>
            item.id === productId
                ? { ...item, quantity: newQuantity }
                : item
        ).filter(item => item.quantity > 0)); // Rimuovi se la quantità scende a 0
    };

    // Aggiungi una funzione per svuotare il carrello dopo il checkout
    const clearCart = () => {
        setCartItems([]);
    };


    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

function useCart() {
    return useContext(CartContext);
}

export { CartProvider, useCart };