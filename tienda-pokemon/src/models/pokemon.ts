export interface PokemonBase {
    name: string,
    url: string
}

export interface PokemonDetails {
    id: number,
    name: string,
    sprites: {
        front_default: string,
        other: {
            'official-artwork': {
                front_default: string
            }
        },
    },
    types: [
        {
            type: {
                name: string
            }
        }
    ],
    base_experience: number
}

export interface CardPokemon {
    id: number,
    name: string,
    image: string,
    price: number,
    category: string,
    stock: number,
    baseExperience: number,
}