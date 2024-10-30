import React from 'react';
import { Link } from 'react-router-dom';
import placesData from '../data/places.json';

const PlacesList = () => {
    return (
        <div className="places-list">
            <h1>Restaurantes en Cusco</h1>
            <div className="card-grid">
                {placesData.places.map(place => (
                    <Link 
                        to={`/restaurante/${place.slug}`} 
                        key={place.id} 
                        className="card"
                    >
                        <img src={place.image} alt={place.name} />
                        <div className="card-content">
                            <h3>{place.name}</h3>
                            <p>{place.description}</p>
                            <div className="card-footer">
                                <span className="category">{place.category}</span>
                                <span className="price">{place.priceRange}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PlacesList; 