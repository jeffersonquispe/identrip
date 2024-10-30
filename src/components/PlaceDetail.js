import React from 'react';
import { useParams } from 'react-router-dom';
import ReviewSystem from './ReviewSystem';
import placesData from '../data/places.json';

const PlaceDetail = () => {
    const { slug } = useParams();
    const place = placesData.places.find(p => p.slug === slug);

    if (!place) {
        return <div>Restaurante no encontrado</div>;
    }

    return (
        <div className="place-detail">
            <div className="place-header">
                <h1>{place.name}</h1>
                <div className="price-category">
                    <span>{place.category}</span>
                    <span>{place.priceRange}</span>
                </div>
            </div>

            <div className="place-gallery">
                <img src={place.image} alt={place.name} className="main-image" />
                <div className="gallery-grid">
                    {place.gallery.map((img, index) => (
                        <img key={index} src={img} alt={`${place.name} ${index + 1}`} />
                    ))}
                </div>
            </div>

            <div className="place-info">
                <div className="info-section">
                    <h2>Descripción</h2>
                    <p>{place.longDescription}</p>
                </div>

                <div className="info-section">
                    <h2>Detalles</h2>
                    <p><strong>Dirección:</strong> {place.address}</p>
                    <p><strong>Horario:</strong> {place.schedule}</p>
                    <p><strong>Categoría:</strong> {place.category}</p>
                    <p><strong>Rango de precios:</strong> {place.priceRange}</p>
                </div>

                <div className="info-section">
                    <h2>Especialidades</h2>
                    <ul>
                        {place.specialties.map((specialty, index) => (
                            <li key={index}>{specialty}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="reviews-section">
                <h2>Reseñas</h2>
                <ReviewSystem placeId={place.id} />
            </div>
        </div>
    );
};

export default PlaceDetail; 