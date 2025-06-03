import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve essere usato dentro CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Carica carrello da localStorage all'avvio
  useEffect(() => {
    const savedCart = localStorage.getItem("eshop_cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Errore parsing carrello salvato:", error);
        localStorage.removeItem("eshop_cart");
      }
    }
  }, []);

  // Salva carrello in localStorage quando cambia
  useEffect(() => {
    localStorage.setItem("eshop_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Aggiungi prodotto al carrello con taglia
  const addToCart = (product, selectedSize, quantity = 1) => {
    if (!selectedSize) {
      throw new Error("Taglia richiesta");
    }

    setCartItems((prevItems) => {
      // Cerca se esiste già questo prodotto con questa taglia
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );

      if (existingItemIndex >= 0) {
        // Se esiste, aggiorna la quantità
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        // Se non esiste, aggiungi nuovo item
        const newItem = {
          ...product,
          selectedSize: selectedSize,
          quantity: quantity,
          cartItemId: `${product.id}_${selectedSize}`, // ID univoco per combinazione prodotto+taglia
        };
        return [...prevItems, newItem];
      }
    });
  };

  // Rimuovi prodotto specifico (prodotto + taglia)
  const removeFromCart = (productId, selectedSize) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  // Aggiorna quantità per prodotto + taglia specifici
  const updateQuantity = (productId, selectedSize, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId && item.selectedSize === selectedSize) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Svuota carrello
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("eshop_cart");
  };

  // Calcola totale quantità nel carrello
  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Calcola totale prezzo del carrello
  const getTotalPrice = () => {
    const today = new Date();

    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity);
      const start = new Date(item.start_discount);
      const end = new Date(item.end_discount);

      let finalPrice = price;
      if (
        item.is_visible_prod === 1 &&
        today >= start &&
        today <= end &&
        item.discount
      ) {
        const discount = parseFloat(item.discount);
        finalPrice = price - (price * discount) / 100;
      }

      return total + finalPrice * quantity;
    }, 0);
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalQuantity,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
