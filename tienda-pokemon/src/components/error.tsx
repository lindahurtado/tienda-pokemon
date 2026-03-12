import "../styles/error.css"

export interface ErrorProps {
    error: string
}

const Error: React.FC<ErrorProps> = ({ error }) => {
    return (
        <div className="error-contain">
            <p className="error-contain-text">No se pudo cargar correctamente los pokemons, debido al error: {error}</p>
        </div>
    )
}

export default Error;