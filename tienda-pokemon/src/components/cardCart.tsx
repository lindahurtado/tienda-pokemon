import { useCart } from "../context/CartContext";
import type { CartItem } from "../models/cart";
import "../styles/cardCart.css"

export interface CardCartProps {
    pokemon: CartItem,
}

const CardCart: React.FC<CardCartProps> = ({ pokemon }) => {
    const { removeFromCart, updateQuantity } = useCart();

    return(
        <div className="card-cart">
            <img src={pokemon.image} alt={pokemon.name} className="card-cart-image"/>
            <div className="card-cart-data">
                <label className="card-cart-name">{pokemon.name}</label>
                <div className="card-cart-bquantity">
                    <button 
                        onClick={() => updateQuantity(pokemon.id, -1)}
                        disabled={pokemon.quantity <= 1}
                        className="card-cart-less"
                    >
                        -
                    </button>
                    <p className="card-cart-quantity">{pokemon.quantity}</p>
                    <button
                        onClick={() => updateQuantity(pokemon.id, +1)}
                        disabled={pokemon.quantity >=10}
                        className="card-cart-more"
                    >
                        +
                    </button>
                </div>
                <p className="card-cart-price">${pokemon.price}</p>
            </div>
            <div className="card-cart-container">
                <p className="card-cart-total">${pokemon.price * pokemon.quantity}</p>
                <button className="card-cart-button" onClick={() => removeFromCart(pokemon.id)}>
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default CardCart;