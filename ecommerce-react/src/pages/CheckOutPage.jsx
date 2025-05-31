import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import CheckOutForm from "../components/CheckoutForm";

export default function CheckOutPage() {
    const { cartItems } = useCart();
    const today = new Date();

    const calculateFinalPrice = (item) => {
        const price = parseFloat(item.price);
        const quantity = parseInt(item.quantity);
        const start = new Date(item.start_discount);
        const end = new Date(item.end_discount);

        let finalPrice = price;
        if (today >= start && today <= end) {
            const discount = parseFloat(item.discount);
            finalPrice = price - (price * discount / 100);
        }

        return { finalPrice, total: finalPrice * quantity };
    };

    // Calcolo totale prodotti
    const totalProducts = cartItems.reduce((acc, item) => {
        return acc + calculateFinalPrice(item).total;
    }, 0);

    // Calcolo spedizione globale
    const shippingCost = totalProducts < 100 ? 10 : 0;

    // Totale finale
    const totalOrder = totalProducts + shippingCost;

    return (
        <div className="container mt-4">
            <h1>Carrello</h1>
            {cartItems.length === 0 ? (
                <p>Il carrello è vuoto.</p>
            ) : (
                <>
                    <div className="row fw-bold text-center border-bottom pb-2 mb-2">
                        <div className="col">Prodotto</div>
                        <div className="col">Prezzo</div>
                        <div className="col">Quantità</div>
                        <div className="col">Totale unità</div>
                    </div>

                    {cartItems.map((item, index) => {
                        const price = parseFloat(item.price);
                        const quantity = parseInt(item.quantity);
                        const { finalPrice, total } = calculateFinalPrice(item);
                        const start = new Date(item.start_discount);
                        const end = new Date(item.end_discount);
                        const hasDiscount = today >= start && today <= end;

                        return (
                            <div className="row text-center align-items-center mb-3" key={index}>
                                <div className="col">
                                    <img src={item.image_url} alt={item.name} width={50} className="me-2" />
                                    {item.name}
                                </div>
                                <div className="col">
                                    {hasDiscount ? (
                                        <>
                                            <p>€{price.toFixed(2)}</p><br />
                                            <strong>€{finalPrice.toFixed(2)}</strong>
                                        </>
                                    ) : (
                                        <>€{price.toFixed(2)}</>
                                    )}
                                </div>
                                <div className="col">{quantity}</div>
                                <div className="col">€{total.toFixed(2)}</div>
                            </div>
                        );
                    })}

                    <div className="text-end mt-4">
                        <p>Totale prodotti: €{totalProducts.toFixed(2)}</p>
                        <p>Costo spedizione: €{shippingCost.toFixed(2)}</p>
                        <h3>Totale ordine: €{totalOrder.toFixed(2)}</h3>
                    </div>

                    <div className="mt-3">

                        {/* <h4>Scegli metodo di pagamento</h4> // METODO DI PAGAMENTO, BOZZA IN CASO DECISIAMO DI IMPLEMENTARLO(NON PRESENTE NEI BONUS SCELTI);
                        <form>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1"></input>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
                                <label class="form-check-label" for="exampleCheck1">Check me out</label>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form> */}
                        {/* FORM */}
                        <div>
                            <CheckOutForm amount={totalOrder} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}



