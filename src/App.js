import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import ReviewSystem from './components/ReviewSystem';
import placesData from './data/places.json';
import './styles/common.css';

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        // Cargar lugares del localStorage o del JSON inicial
        const storedPlaces = localStorage.getItem('places');
        if (storedPlaces) {
            setPlaces(JSON.parse(storedPlaces));
        } else {
            setPlaces(placesData.places);
            localStorage.setItem('places', JSON.stringify(placesData.places));
        }

        // Verificar usuario actual
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    const handleReviewAdded = (updatedPlaces) => {
        setPlaces(updatedPlaces);
    };

    return (
        <div className="app">
            <header>
                {currentUser ? (
                    <div className="user-info">
                        <span>Welcome, {currentUser.name}</span>
                        <button onClick={handleLogout} className="btn">Logout</button>
                    </div>
                ) : (
                    <Auth onLogin={setCurrentUser} />
                )}
            </header>

            <main>
                <div className="card-grid">
                    {places.map(place => (
                        <div 
                            key={place.id} 
                            className="card"
                            onClick={() => setSelectedPlace(place)}
                        >
                            <img src={place.image} alt={place.name} />
                            <div className="card-content">
                                <h3>{place.name}</h3>
                                <p>{place.description}</p>
                                <div className="rating-stars">
                                    {'⭐'.repeat(
                                        Math.round(
                                            place.reviews?.reduce((acc, rev) => acc + rev.rating, 0) / 
                                            (place.reviews?.length || 1)
                                        ) || 0
                                    )}
                                </div>
                                <small>{place.reviews?.length || 0} reviews</small>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedPlace && (
                    <>
                        <h2>Reviews for {selectedPlace.name}</h2>
                        <ReviewSystem 
                            placeId={selectedPlace.id} 
                            currentUser={currentUser}
                            onReviewAdded={handleReviewAdded}
                        />
                    </>
                )}
            </main>
        </div>
    );
}

export default App; 