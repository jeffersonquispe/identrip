import React, { useState, useEffect } from 'react';
import placesData from '../data/places.json';
import '../styles/common.css';

const ReviewSystem = ({ placeId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        rating: 5,
        comment: '',
        image: ''
    });
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Cargar usuario actual
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }

        // Cargar reviews
        loadReviews();
    }, [placeId]);

    const loadReviews = () => {
        const storedPlaces = JSON.parse(localStorage.getItem('places')) || placesData.places;
        const place = storedPlaces.find(p => p.id === placeId);
        setReviews(place?.reviews || []);
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert('Por favor, inicia sesión para dejar una reseña');
            return;
        }

        const review = {
            id: Date.now(),
            userId: currentUser.id,
            username: currentUser.username,
            userAvatar: currentUser.avatar,
            rating: newReview.rating,
            comment: newReview.comment,
            image: newReview.image,
            date: new Date().toISOString().split('T')[0]
        };

        // Actualizar reviews en localStorage
        const storedPlaces = JSON.parse(localStorage.getItem('places')) || placesData.places;
        const updatedPlaces = storedPlaces.map(place => {
            if (place.id === placeId) {
                return {
                    ...place,
                    reviews: [...(place.reviews || []), review]
                };
            }
            return place;
        });

        localStorage.setItem('places', JSON.stringify(updatedPlaces));
        loadReviews();
        setNewReview({ rating: 5, comment: '', image: '' });
    };

    return (
        <div className="review-system">
            {currentUser ? (
                <form onSubmit={handleSubmitReview} className="review-form">
                    <h3>Escribe una reseña</h3>
                    <div className="form-group">
                        <label>Calificación:</label>
                        <select 
                            value={newReview.rating}
                            onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                        >
                            {[1,2,3,4,5].map(num => (
                                <option key={num} value={num}>{num} estrellas</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Comentario:</label>
                        <textarea
                            value={newReview.comment}
                            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                            required
                            rows="4"
                        />
                    </div>
                    <div className="form-group">
                        <label>URL de imagen (opcional):</label>
                        <input
                            type="text"
                            value={newReview.image}
                            onChange={(e) => setNewReview({...newReview, image: e.target.value})}
                            placeholder="https://ejemplo.com/imagen.jpg"
                        />
                    </div>
                    <button type="submit" className="btn">Publicar Reseña</button>
                </form>
            ) : (
                <div className="login-prompt">
                    <p>Por favor, inicia sesión para dejar una reseña</p>
                </div>
            )}

            <div className="reviews-list">
                {reviews.map(review => (
                    <div key={review.id} className="review-card">
                        <div className="review-header">
                            <img 
                                src={review.userAvatar} 
                                alt={review.username} 
                                className="user-avatar"
                            />
                            <div className="review-info">
                                <h4>{review.username}</h4>
                                <div className="rating">{'⭐'.repeat(review.rating)}</div>
                            </div>
                        </div>
                        {review.image && (
                            <img 
                                src={review.image} 
                                alt="Review" 
                                className="review-image"
                            />
                        )}
                        <p className="review-comment">{review.comment}</p>
                        <small className="review-date">Publicado el: {review.date}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSystem; 