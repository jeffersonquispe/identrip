import React, { useState } from 'react';
import usersData from '../data/users.json';

const Auth = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        name: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isLogin) {
            // Login
            const user = usersData.users.find(
                u => u.username === formData.username && u.password === formData.password
            );
            
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                onLogin(user);
            } else {
                alert('Credenciales inválidas');
            }
        } else {
            // Register
            const newUser = {
                id: String(Date.now()),
                ...formData,
                avatar: `https://ui-avatars.com/api/?name=${formData.name.replace(' ', '+')}`
            };
            
            const updatedUsers = [...usersData.users, newUser];
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            onLogin(newUser);
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label>Usuario:</label>
                    <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                    />
                </div>
                {!isLogin && (
                    <>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required
                            />
                        </div>
                    </>
                )}
                <button type="submit" className="btn">
                    {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                </button>
            </form>
            <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="btn-link"
            >
                {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
        </div>
    );
};

export default Auth; 