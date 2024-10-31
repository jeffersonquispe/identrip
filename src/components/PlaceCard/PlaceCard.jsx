import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  styled,
} from '@mui/material';
import ReviewList from '../ReviewList/ReviewList';
import ReviewForm from '../ReviewForm/ReviewForm';
import PlaceDetail from '../PlaceDetail/PlaceDetail';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #00a0ff, #ff4081)',
    transform: 'scaleX(0)',
    transition: 'transform 0.3s ease',
  },
  '&:hover::before': {
    transform: 'scaleX(1)',
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.3)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::after': {
    opacity: 1,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #00a0ff 30%, #33b4ff 90%)',
  borderRadius: '8px',
  border: 0,
  color: 'white',
  padding: '8px 16px',
  boxShadow: '0 3px 5px 2px rgba(0, 160, 255, .3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #007acc 30%, #00a0ff 90%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 10px 2px rgba(0, 160, 255, .3)',
  },
}));

const PlaceCard = ({ place, onAddReview, currentUser }) => {
  const [openDetail, setOpenDetail] = useState(false);

  return (
    <>
      <StyledCard onClick={() => setOpenDetail(true)} sx={{ cursor: 'pointer' }}>
        <StyledCardMedia
          component="img"
          image={place.image}
          alt={place.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" 
            sx={{ 
              background: 'linear-gradient(45deg, #00a0ff, #ff4081)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            {place.name}
          </Typography>
          <Box display="flex" alignItems="center" mb={1}>
            <Rating value={place.rating} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary" ml={1}>
              ({place.reviews.length} reseñas)
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
          <Box mt={2} display="flex" gap={1}>
            <StyledButton 
              size="small" 
              onClick={() => setOpenDetail(true)}
            >
              Ver reseñas ({place.reviews.length})
            </StyledButton>
          </Box>
        </CardContent>
      </StyledCard>

      <PlaceDetail
        place={place}
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        onAddReview={(review) => {
          onAddReview(review);
          setOpenDetail(false);
        }}
        currentUser={currentUser}
      />
    </>
  );
};

export default PlaceCard; 