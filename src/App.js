import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import ReviewSystem from './components/ReviewSystem';
import placesData from './data/places.json';

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);

    useEffect(() => {
        // Verificar si hay un usuario en localStorage
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
        <div className="app">
            <header>
                {currentUser ? (
                    <div className="user-info">
                        <span>Welcome, {currentUser.name}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <Auth onLogin={setCurrentUser} />
                )}
            </header>

            <main>
                <div className="places-list">
                    {placesData.places.map(place => (
                        <div 
                            key={place.id} 
                            className="place-card"
                            onClick={() => setSelectedPlace(place)}
                        >
                            <h3>{place.name}</h3>
                            <p>{place.description}</p>
                            <img src={place.image} alt={place.name} />
                        </div>
                    ))}
                </div>

                {selectedPlace && (
                    <ReviewSystem 
                        placeId={selectedPlace.id} 
                        currentUser={currentUser}
                    />
                )}
            </main>
        </div>
    );
}

export default App; 