import React, { useState, useEffect } from 'react';
import placesData from '../data/places.json';

const ReviewSystem = ({ placeId, currentUser }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        rating: 5,
        comment: ''
    });

    useEffect(() => {
        // Cargar reviews del localStorage
        const storedReviews = localStorage.getItem(`reviews_${placeId}`);
        if (storedReviews) {
            setReviews(JSON.parse(storedReviews));
        } else {
            const place = placesData.places.find(p => p.id === placeId);
            setReviews(place?.reviews || []);
        }
    }, [placeId]);

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
            date: new Date().toISOString().split('T')[0]
        };

        const updatedReviews = [...reviews, review];
        setReviews(updatedReviews);
        localStorage.setItem(`reviews_${placeId}`, JSON.stringify(updatedReviews));
        setNewReview({ rating: 5, comment: '' });
    };

    return (
        <div className="review-system">
            <h3>Reviews</h3>
            
            {currentUser ? (
                <form onSubmit={handleSubmitReview}>
                    <div>
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
                    <div>
                        <label>Comment:</label>
                        <textarea
                            value={newReview.comment}
                            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                            required
                        />
                    </div>
                    <button type="submit">Submit Review</button>
                </form>
            ) : (
                <p>Please login to submit a review</p>
            )}

            <div className="reviews-list">
                {reviews.map(review => (
                    <div key={review.id} className="review-item">
                        <div className="review-header">
                            <span className="username">{review.username}</span>
                            <div className="rating">{'⭐'.repeat(review.rating)}</div>
                        </div>
                        <p>{review.comment}</p>
                        <small>Posted on: {review.date}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSystem; 