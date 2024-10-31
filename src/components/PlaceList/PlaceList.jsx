import React, { useState } from 'react';
import { Grid, Container } from '@mui/material';
import PlaceCard from '../PlaceCard/PlaceCard';
import placesData from '../../data/places.json';
import usersData from '../../data/users.json';

const PlaceList = () => {
  const [places, setPlaces] = useState(placesData.places);
  const [currentUser] = useState(usersData.users[0]); // Simulamos un usuario logueado

  const handleAddReview = (placeId, newReview) => {
    setPlaces(places.map(place => {
      if (place.id === placeId) {
        // Añadir información del usuario a la review
        const reviewWithUser = {
          ...newReview,
          id: place.reviews.length + 1,
          userId: currentUser.id,
          user: currentUser,
        };

        // Calcular nuevo rating promedio
        const totalRatings = place.reviews.reduce((sum, review) => sum + review.rating, 0) + newReview.rating;
        const newAverageRating = totalRatings / (place.reviews.length + 1);
        
        return {
          ...place,
          rating: Number(newAverageRating.toFixed(1)),
          reviews: [...place.reviews, reviewWithUser]
        };
      }
      return place;
    }));
  };

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {places.map((place) => (
          <Grid item key={place.id} xs={12} sm={6} md={4}>
            <PlaceCard 
              place={place} 
              onAddReview={(review) => handleAddReview(place.id, review)}
              currentUser={currentUser}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PlaceList; 