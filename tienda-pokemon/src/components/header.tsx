import "../styles/header.css";
import Pokebola from "../assets/Pokebola.png";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { totalItems } = useCart();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <div className="header">
            <img src={Pokebola} alt="PokeBola" className="header-image"/>
            <a href="/" className="header-title">TIENDA POKÉMON</a>
            {user ? (
                <div className="header-container-cart">
                    <label className="header-user">{user.name}</label>
                    <a href="/cart" className="header-button-cart">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        {totalItems > 0 && (
                            <span className="header-button-totalItems">{totalItems}</span>
                        )}
                    </a>
                    <button onClick={handleLogout} className="header-button-logout">Cerrar sesión</button>
                </div>
            ) : (
                <div className="header-buttons">
                    <a href="/register" className="header-buttons-register">Registrarse</a>
                    <a href="/login" className="header-buttons-login">Iniciar sesión</a>
                </div>
            )}
        </div>
    )
}

export default Header;