import { useState } from "react";
import { loginUser } from "../services/authService";
import PokemonUser from "../assets/PokemonUser.png";
import "../styles/loginPage.css";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: ''});
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await loginUser(formData);
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = '/';
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit} className="login-form">
                <img src={PokemonUser} alt="PokemonUser" className="login-form-image"/>
                <h2 className="login-form-title">Iniciar sesión</h2>
                {error && <p className="login-form-error">{error}</p>}
                <div className="login-form-data">
                    <label className="login-form-label">Correo Electronico:</label>
                    <input 
                        type="email"
                        placeholder="Correo electronico"
                        onChange={(e) => setFormData({...formData, email: e.target.value })}
                        className="login-form-input"
                        required
                    />
                </div>
                <div className="login-form-data">
                    <label className="login-form-label">Contraseña:</label>
                    <input 
                        type="password"
                        placeholder="Contraseña"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="login-form-input"
                        required
                    />
                </div>
                <button type="submit" className="login-form-button">
                    Iniciar sesión
                </button>
            </form>
        </div>
    )
}

export default LoginPage;