import { useCart } from "../context/CartContext";

export default function CartPage() {
    const { cartItems } = useCart();

    let totalPrice = 0;

    const today = new Date();

    for (let i = 0; i < cartItems.length; i++) {
        const element = cartItems[i];
        const price = parseFloat(element.price);
        const quantity = parseInt(element.quantity);

        const start = new Date(element.start_discount);
        const end = new Date(element.end_discount);

        let finalPrice = price;

        if (today >= start && today <= end) {
            const discount = parseFloat(element.discount);
            finalPrice = price - (price * discount / 100);
            console.log(`Sconto applicato: ${discount}% su ${element.name}`);
        }

        totalPrice += finalPrice * quantity;
    }

    return (
        <div>
            <h1>Carrello</h1>
            {cartItems.length === 0 ? (
                <p>Il carrello è vuoto.</p>
            ) : (
                cartItems.map((item, index) => {
                    const price = parseFloat(item.price);
                    const quantity = parseInt(item.quantity);
                    const start = new Date(item.start_discount);
                    const end = new Date(item.end_discount);

                    let finalPrice = price;
                    let hasDiscount = false;

                    if (today >= start && today <= end) {
                        const discount = parseFloat(item.discount);
                        finalPrice = price - (price * discount / 100);
                        hasDiscount = true;
                    }

                    return (
                        <div key={index}>
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                            {hasDiscount ? (
                                <>
                                    <p>
                                        Prezzo originale: <s>€{price.toFixed(2)}</s>
                                    </p>
                                    <p>
                                        Prezzo scontato: <strong>€{finalPrice.toFixed(2)}</strong>
                                    </p>
                                    <p>Sconto: {item.discount}%</p>
                                </>
                            ) : (
                                <p>Prezzo: €{price.toFixed(2)}</p>
                            )}
                            <p>Quantità: {quantity}</p>
                            <img className="img-product" src={item.image_url} alt={item.name} />
                        </div>
                    );
                })
            )}
            <div className="text-end mt-4">
                <h3>Totale: €{totalPrice.toFixed(2)}</h3>
            </div>
        </div>
    );
}
