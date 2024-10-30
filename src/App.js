import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlacesList from './components/PlacesList';
import PlaceDetail from './components/PlaceDetail';
import Auth from './components/Auth';

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    return (
        <Router>
            <div className="app">
                <header className="app-header">
                    <h1>Restaurantes Cusco</h1>
                    <div className="auth-section">
                        {currentUser ? (
                            <div className="user-info">
                                <img 
                                    src={currentUser.avatar} 
                                    alt={currentUser.name} 
                                    className="user-avatar"
                                />
                                <span>Bienvenido, {currentUser.name}</span>
                                <button onClick={handleLogout} className="btn-logout">
                                    Cerrar Sesión
                                </button>
                            </div>
                        ) : (
                            <Auth onLogin={setCurrentUser} />
                        )}
                    </div>
                </header>

                <Routes>
                    <Route path="/" element={<PlacesList />} />
                    <Route 
                        path="/restaurante/:slug" 
                        element={<PlaceDetail currentUser={currentUser} />} 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App; 