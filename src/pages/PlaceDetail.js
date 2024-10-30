import React from 'react';
import ReviewSystem from '../components/ReviewSystem';

const PlaceDetail = ({ placeId }) => {
    return (
        <div className="place-detail">
            {/* Otros detalles del restaurante */}
            <ReviewSystem placeId={placeId} />
        </div>
    );
};

export default PlaceDetail; 