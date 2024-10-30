import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Box
} from '@mui/material';

const PlaceCard = ({ place }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={place.image}
        alt={place.name}
        sx={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {place.name}
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <Rating value={place.rating} precision={0.5} readOnly />
          <Typography variant="body2" color="text.secondary" ml={1}>
            ({place.reviews} reseñas)
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {place.category}
        </Typography>
        <Typography variant="body2">
          {place.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          {place.address}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlaceCard; 