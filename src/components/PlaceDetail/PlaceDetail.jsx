import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Rating,
  Button,
  styled,
  Grid,
  Divider,
  Avatar
} from '@mui/material';
import ReviewForm from '../ReviewForm/ReviewForm';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)',
    borderRadius: '16px',
    maxWidth: '900px',
    width: '100%'
  }
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '300px',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '12px',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  '&:hover img': {
    transform: 'scale(1.05)',
  }
}));

const ReviewCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  background: 'linear-gradient(145deg, #252525 0%, #2a2a2a 100%)',
  borderRadius: '12px',
  marginBottom: theme.spacing(2),
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateX(5px)',
  }
}));

const PlaceDetail = ({ place, open, onClose, onAddReview, currentUser }) => {
  const [openReviewForm, setOpenReviewForm] = useState(false);
  const hasUserReviewed = place.reviews.some(review => review.userId === currentUser?.id);

  const handleAddReview = (reviewData) => {
    onAddReview(reviewData);
    setOpenReviewForm(false);
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogContent sx={{ p: 0 }}>
        <ImageContainer>
          <img src={place.image} alt={place.name} />
        </ImageContainer>
        
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom sx={{
                background: 'linear-gradient(45deg, #00a0ff, #ff4081)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {place.name}
              </Typography>
              
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Rating value={place.rating} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary">
                  ({place.reviews.length} reseñas)
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <CategoryIcon sx={{ color: '#00a0ff' }} />
                <Typography variant="body1" color="text.secondary">
                  {place.category}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1} mb={3}>
                <LocationOnIcon sx={{ color: '#ff4081' }} />
                <Typography variant="body1" color="text.secondary">
                  {place.address}
                </Typography>
              </Box>

              <Typography variant="body1" paragraph>
                {place.description}
              </Typography>

              {!hasUserReviewed && (
                <Button
                  variant="contained"
                  onClick={() => setOpenReviewForm(true)}
                  sx={{
                    background: 'linear-gradient(45deg, #00a0ff 30%, #33b4ff 90%)',
                    mb: 3
                  }}
                >
                  Escribir reseña
                </Button>
              )}

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Reseñas recientes
              </Typography>

              {place.reviews.map((review) => (
                <ReviewCard key={review.id}>
                  <Box display="flex" gap={2}>
                    <Avatar src={review.user.avatar} alt={review.user.name} />
                    <Box flex={1}>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <Typography variant="subtitle1">
                          {review.user.name}
                        </Typography>
                        <Rating value={review.rating} size="small" readOnly />
                      </Box>
                      <Typography variant="body2" paragraph>
                        {review.comment}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(review.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </ReviewCard>
              ))}
            </Grid>

            <Grid item xs={12} md={4}>
              {/* Aquí podrías añadir información adicional, mapa, horarios, etc. */}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <ReviewForm
        placeId={place.id}
        open={openReviewForm}
        onClose={() => setOpenReviewForm(false)}
        onSubmit={handleAddReview}
        currentUser={currentUser}
      />
    </StyledDialog>
  );
};

export default PlaceDetail; 