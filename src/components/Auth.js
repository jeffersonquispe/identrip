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
                alert('Invalid credentials');
            }
        } else {
            // Register
            const newUser = {
                id: String(Date.now()),
                ...formData
            };
            
            // En un caso real, esto se haría en el backend
            const updatedUsers = [...usersData.users, newUser];
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            onLogin(newUser);
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                    />
                </div>
                {!isLogin && (
                    <>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required
                            />
                        </div>
                    </>
                )}
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </button>
        </div>
    );
};

export default Auth; 