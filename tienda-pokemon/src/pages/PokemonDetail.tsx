import { usePokemons } from "../hooks/usePokemons";
import Error from "../components/error";
import Spinner from "../components/spinner";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { getCardPokemon, getPokemonId } from "../services/PokemonService";
import "../styles/pokemonDetail.css"
import type { CardPokemon } from "../models/pokemon";

export interface PokemonDetailProps {
    login: boolean,
    setLogin: (value: boolean) => void
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ login, setLogin }) => {
    const { loading, error } = usePokemons();
    const { id } = useParams<{ id: string }>();
    const { cart, addToCart } = useCart();

    const quantityCart = cart.find(item => item.id === Number(id))?.quantity || 0;
    const [pokemon, setPokemon] = useState<CardPokemon>();
    const stockAvailable = (pokemon?.stock || 10)- quantityCart;

    const user = JSON.parse(localStorage.getItem('user') || 'null');

    useEffect(() => {
        if (id) {
            getPokemonId(id).then(async data => setPokemon(await getCardPokemon(data)))
            .catch(err => console.error("Error cargando el Pokémon", err));;
        }
    }, [id])

    const addPokemon = (pokemon: CardPokemon) => {
        if (user) addToCart(pokemon)
            else setLogin(true);
    }

    if(loading) {
        return (
            <div className="spinner-container">
                <Spinner size="medium" message="Cargando Pokemones..." />
            </div>
        )
    }

    if(error) {
        return <Error error={error} />
    }

    if(!pokemon) {
        return (
            <div>
                <p>Pokémon no encontrado...</p>
            </div>
        )
    }

    return (
        <div className="pokemon-detail">
            {login && <p className="pokemon-detail-login">Inicia sesión para poder agregar artículos al carrito</p>}
            <div className="pokemon-detail-info">
                <div className="pokemon-detail-visual">
                    <img src={pokemon.image} alt={pokemon.name} className="pokemon-detail-image"/>
                </div>
                <div className="pokemon-detail-data">
                    <label className="pokemon-detail-name">{pokemon.name}</label>
                    <p className="pokemon-detail-price">${pokemon.price}</p>
                    <span className="pokemon-detail-subtitle">Descripción:</span>
                    <p className="pokemon-detail-description">Este pokémon es una excelente adquisición. <br /> Posee habilidades de tipo <b>{pokemon.category}</b> y un nivel de experiencia base de <b>{pokemon.baseExperience}</b> muy competitivo</p>
                    <p className={stockAvailable > 0 ? "pokemon-detail-stock" : "pokemon-detail-disable"}>
                        {stockAvailable > 0 
                        ? `Stock disponible: ${stockAvailable} unidades`
                        : '¡Agotado!'
                        }
                    </p>
                </div>
            </div>
            <div className="pokemon-detail-buttons">
                <a href="/" className="pokemon-detail-button">
                    Volver a la tienda
                </a>
                <button 
                    onClick={() => addPokemon(pokemon)}
                    className={stockAvailable ? "pokemon-detail-button" : "pokemon-detail-NoButton"}
                >
                    {stockAvailable ? 'Añadir al carrito' : 'Sin stock'}
                </button>
            </div>
        </div>
    )
}

export default PokemonDetail;