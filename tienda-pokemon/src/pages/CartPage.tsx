import CardCart from "../components/cardCart";
import { useCart } from "../context/CartContext";
import "../styles/cartPage.css"
import Pokemon from "../assets/pokemones.png"
import thankyou from "../assets/thankyou.png"
import { useState } from "react";

const CartPage = () => {
    const { cart, totalItems, totalPrice } = useCart();
    const [finish, setFinish] = useState(false);
    
    if(cart.length === 0) {
        return (
            <div className="cart">
                <img src={Pokemon} alt="Pokémones" className="cart-empty-image"/>
                <h2 className="cart-title">Tu carrito se encuentra vacio</h2>
                <p className="cart-subtitle">¡Ve y atrapa un pokémon!</p>
                <a className="cart-button-homepage" href="/">
                    Volver a la tienda
                </a>
            </div>
        )
    }

    if (finish) {
        return (
            <div className="cart-thankyou">
                <img src={thankyou} alt="Gracias por tu compra" className="cart-thankyou-image"/>
                <h2 className="cart-thankyou-title">¡Gracias por tu compra, esperamos verte pronto!</h2>
                <a className="cart-button-homepage" href="/">
                    Volver a la tienda
                </a>
            </div>
        )
    }

    return (
        <div className="cart">
            <h2 className="cart-title">Resumen de compra</h2>
            <div className="cart-cards">
                {cart.map((pokemon) => (
                    <CardCart pokemon={pokemon}/>
                ))}
            </div>
            <div className="cart-data">
                <label className="cart-data-title">Total</label>
                <div className="cart-data-container">
                    <label className="cart-data-label">Productos:</label>
                    <span className="cart-data-value">{totalItems}</span>
                </div>
                <div className="cart-data-container">
                    <label className="cart-data-label">Total:</label>
                    <span className="cart-data-value">$ {totalPrice}</span>
                </div>
            </div>    
            <button className="cart-button" onClick={() => setFinish(true)}>
                    Finalizar compra
            </button>   
        </div>
    )
}

export default CartPage;