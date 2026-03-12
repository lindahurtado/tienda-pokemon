import type { PokemonDetails } from "../models/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemonList = async (limit = 20, offset = 0) => {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    return data.results;
}

export const getPokemonDetails = async ( url: string ): Promise<PokemonDetails> => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const getCardPokemon = async (pokemon: PokemonDetails) => {
    return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other['official-artwork'].front_default,
        price: pokemon.base_experience * 1000,
        category: pokemon.types[0].type.name,
        stock: 10,
        baseExperience: pokemon.base_experience,
    }
}

export const getPokemonId = async (id: string): Promise<PokemonDetails> => {
    const response = await fetch(`${BASE_URL}/pokemon/${id}/`);
    if(!response.ok) throw new Error('Pokémon no encontrado');
    return await response.json();
}