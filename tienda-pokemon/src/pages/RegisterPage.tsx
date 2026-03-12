import { useState } from "react";
import { registerUser } from "../services/authService";
import RegisterUser from "../assets/RegisterUser.png";
import "../styles/registerPage.css"

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: ''});
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            setSuccess(true);
            setTimeout(() => (window.location.href = '/login'), 2000);
        } catch (err: unknown) {
            alert('Error al registrar' + err)
        }
    }

    return (
        <div className="register">
            <form onSubmit={handleSubmit} className="register-form">
                <img src={RegisterUser} alt="RegisterUser" className="register-form-image"/>
                <h2 className="register-form-title">Registro</h2>
                {success && <p className="register-form-success">Registro exitoso, redirigiendo al login...</p>}
                <div className="register-form-data">
                    <label className="register-form-label">Nombre:</label>
                    <input 
                        type="text"
                        placeholder="Nombre"
                        onChange={(e) => setFormData({...formData, name: e.target.value })}
                        className="register-form-input"
                        required
                    />
                </div>
                <div className="register-form-data">
                    <label className="register-form-label">Correo Electronico:</label>
                    <input 
                        type="email"
                        placeholder="Correo electronico"
                        onChange={(e) => setFormData({...formData, email: e.target.value })}
                        className="register-form-input"
                        required
                    />
                </div>
                <div className="register-form-data">
                    <label className="register-form-label">Contraseña:</label>
                    <input 
                        type="password"
                        placeholder="Contraseña"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="register-form-input"
                        required
                    />
                </div>
                <button type="submit" className="register-form-button">
                    Iniciar sesión
                </button>
            </form>
        </div>
    )
    
}

export default RegisterPage;