import { useState } from "react";
import axios from "axios";

export const useInventory = () => {
  const [loading, setLoading] = useState(false);

  const checkCartAvailability = async (cartItems) => {
    try {
      setLoading(true);

      const items = cartItems.map((item) => ({
        productId: item.id,
        size: item.selectedSize,
        quantity: item.quantity,
      }));

      const response = await axios.post(
        "http://localhost:3000/availability/check-cart",
        { items }
      );

      return response.data;
    } catch (error) {
      console.error("Errore controllo disponibilità carrello:", error);
      return {
        success: false,
        allAvailable: false,
        message:
          error.response?.data?.message || "Errore controllo disponibilità",
      };
    } finally {
      setLoading(false);
    }
  };

  const processOrder = async (cartItems, orderInfo) => {
    try {
      setLoading(true);

      const items = cartItems.map((item) => ({
        productId: item.id,
        size: item.selectedSize,
        quantity: item.quantity,
      }));

      const response = await axios.post(
        "http://localhost:3000/api/availability/process-order",
        { items, orderInfo }
      );

      return response.data;
    } catch (error) {
      console.error("Errore processamento ordine:", error);
      throw new Error(
        error.response?.data?.message || "Errore processamento ordine"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    checkCartAvailability,
    processOrder,
    loading,
  };
};
