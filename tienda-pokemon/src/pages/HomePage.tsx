import Card from "../components/card";
import Error from "../components/error";
import Spinner from "../components/spinner";
import { usePokemons } from "../hooks/usePokemons";
import "../styles/homePage.css"

export interface HomepageProps {
    login: boolean,
    setLogin: (value: boolean) => void
}

const HomePage: React.FC<HomepageProps> = ({login, setLogin}) => {
    const { loading, pokemons, error } = usePokemons()

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

    return (
        <div className="home-contains">
            {login && <p className="home-login">Inicia sesión para poder agregar artículos al carrito</p>}
            <div className="home-contains-cards">
                {pokemons.map((pokemon) => (
                    <Card 
                        pokemon={pokemon}
                        setLogin={setLogin}
                    />
                ))}
            </div>
        </div>
    )
}

export default HomePage;