import "../styles/card.css"
import { useCart } from "../context/CartContext"
import type { CardPokemon } from "../models/pokemon";

export interface CardProps {
    pokemon: CardPokemon,
    setLogin: (value: boolean) => void
}

const Card:  React.FC<CardProps> = ({ pokemon, setLogin }) => {
    const { addToCart } = useCart();
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    const addPokemon = (pokemon: CardPokemon) => {
        if (user) addToCart(pokemon)
            else setLogin(true);
    }

    return (
        <div className="card">
            <div className="card-image-contain">
                <img src={pokemon.image} alt={pokemon.name} className="card-image"/>
            </div>
            <a href={`/pokemon/${pokemon.id}/`} className="card-title">{pokemon.name}</a>
            <div className="card-details">
                <p className="card-details-category">{pokemon.category}</p>
                <p className="card-details-price">$ {pokemon.price}</p>
            </div>
            <button className="card-button" onClick={() => addPokemon(pokemon)}>Agregar al carrito</button>
        </div>
    )
}

export default Card;