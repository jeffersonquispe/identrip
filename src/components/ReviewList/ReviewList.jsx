import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Rating,
  Divider,
  Box,
  styled
} from '@mui/material';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  background: 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)',
  borderRadius: '8px',
  marginBottom: theme.spacing(1),
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateX(5px)',
  },
}));

const ReviewList = ({ reviews = [] }) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'transparent' }}>
      {reviews.map((review) => (
        <React.Fragment key={review.id}>
          <StyledListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar 
                alt={review.user?.name || 'Usuario'} 
                src={review.user?.avatar}
                sx={{ 
                  border: '2px solid #00a0ff',
                  boxShadow: '0 0 10px rgba(0,160,255,0.3)'
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography 
                    component="span" 
                    variant="subtitle1"
                    sx={{
                      background: 'linear-gradient(45deg, #00a0ff, #ff4081)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {review.user?.name || 'Usuario Anónimo'}
                  </Typography>
                  <Rating value={review.rating} readOnly size="small" />
                </Box>
              }
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                    sx={{ display: 'block', my: 1 }}
                  >
                    {review.comment}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                  >
                    {new Date(review.date).toLocaleDateString()}
                  </Typography>
                </>
              }
            />
          </StyledListItem>
          <Divider variant="inset" component="li" sx={{ opacity: 0.1 }} />
        </React.Fragment>
      ))}
    </List>
  );
};

export default ReviewList; 