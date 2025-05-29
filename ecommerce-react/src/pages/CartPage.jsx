import { useCart } from "../context/CartContext";

export default function CartPage() {
    const { cartItems } = useCart();

    let totalPrice = 0

    for (let i = 0; i < cartItems.length; i++) {
        const element = cartItems[i];
        totalPrice += element.price * (element.quantity || 1);
        // console.log(totalPrice)
    }
    // console.log(totalPrice)

    return (
        <div>
            <h1>Carrello</h1>
            {cartItems.length === 0 ? (
                <p>Il carrello è vuoto.</p>
            ) : (
                cartItems.map((item, index) => (
                    <div key={index}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>Prezzo: €{item.price}</p>
                        <img className="img-product" src={item.image_url} alt={item.name} />
                    </div>
                ))
            )}
            <div className="text-end mt-4">
                <h3>Totale: €{totalPrice.toFixed(2)}</h3>
            </div>
        </div>
    );
}