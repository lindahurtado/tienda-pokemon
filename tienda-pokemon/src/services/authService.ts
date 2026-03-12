const API_URL = 'http://localhost:4000/auth';

export const registerUser = async (userData: unknown) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData),
    });

    if ( !response.ok ) throw new Error('Error en el registro');
    return response.json();
};

export const loginUser = async (credentials: unknown) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    });

    if( !response.ok ) throw new Error('Error en el ingreso');
    return response.json();
}