import React, { useState, useEffect } from 'react';
import placesData from '../data/places.json';
import '../styles/common.css';

const ReviewSystem = ({ placeId, currentUser, onReviewAdded }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        rating: 5,
        comment: '',
        image: ''
    });

    useEffect(() => {
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
            alert('Please login to submit a review');
            return;
        }

        const review = {
            id: Date.now(),
            userId: currentUser.id,
            username: currentUser.username,
            rating: newReview.rating,
            comment: newReview.comment,
            image: newReview.image || 'default-review.jpg',
            date: new Date().toISOString().split('T')[0]
        };

        // Actualizar el JSON en localStorage
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
        
        if (onReviewAdded) {
            onReviewAdded(updatedPlaces);
        }

        setNewReview({ rating: 5, comment: '', image: '' });
    };

    return (
        <div className="review-section">
            {currentUser && (
                <form onSubmit={handleSubmitReview} className="review-form">
                    <h3>Add Your Review</h3>
                    <div className="form-group">
                        <label>Rating:</label>
                        <select 
                            value={newReview.rating}
                            onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                        >
                            {[1,2,3,4,5].map(num => (
                                <option key={num} value={num}>{num} stars</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Comment:</label>
                        <textarea
                            value={newReview.comment}
                            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                            required
                            rows="4"
                        />
                    </div>
                    <div className="form-group">
                        <label>Image URL (optional):</label>
                        <input
                            type="text"
                            value={newReview.image}
                            onChange={(e) => setNewReview({...newReview, image: e.target.value})}
                            placeholder="Enter image URL"
                        />
                    </div>
                    <button type="submit" className="btn">Submit Review</button>
                </form>
            )}

            <div className="card-grid">
                {reviews.map(review => (
                    <div key={review.id} className="card">
                        {review.image && (
                            <img src={review.image} alt="Review" onError={(e) => {
                                e.target.src = 'default-review.jpg';
                            }} />
                        )}
                        <div className="card-content">
                            <h4>{review.username}</h4>
                            <div className="rating-stars">{'⭐'.repeat(review.rating)}</div>
                            <p>{review.comment}</p>
                            <small>Posted on: {review.date}</small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSystem; 