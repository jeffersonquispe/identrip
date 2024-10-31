import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Rating,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  styled
} from '@mui/material';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
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

const ReviewForm = ({ placeId, onSubmit, open, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      placeId,
      rating,
      comment,
      date: new Date().toISOString(),
    });
    setRating(0);
    setComment('');
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{
        background: 'linear-gradient(45deg, #00a0ff, #ff4081)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        Escribir una reseña
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              <Typography component="legend" color="text.secondary">
                Calificación
              </Typography>
              <Rating
                name="rating"
                value={rating}
                onChange={(_, newValue) => setRating(newValue)}
                precision={0.5}
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: '#00a0ff',
                  },
                }}
              />
            </Box>
            <TextField
              label="Tu reseña"
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: '#00a0ff',
                  },
                },
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: 'text.secondary' }}>
          Cancelar
        </Button>
        <StyledButton onClick={handleSubmit}>
          Publicar reseña
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default ReviewForm; 