import { useState, useEffect } from "react";
import { getPokemonList, getPokemonDetails, getCardPokemon } from "../services/PokemonService";
import type { CardPokemon } from "../models/pokemon";

export const usePokemons = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [pokemons, setPokemons] = useState<CardPokemon[]>([]);
    const [error, setError] = useState<string | null>('');

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                setLoading(true);
                const list = await getPokemonList(20);
                const detailsPromise = list.map((p: { url: string }) => getPokemonDetails(p.url));
                const details = await Promise.all(detailsPromise);

                const cardPokemons = await Promise.all(details.map(getCardPokemon));

                setPokemons(cardPokemons);
            } catch (err) {
                setError('Error al cargar los pokemons' + err);
            } finally {
                setLoading(false);
            }
        };
        fetchPokemons();
    }, []);

    return { pokemons, loading, error }
}