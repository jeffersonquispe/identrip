import React from 'react';
import { Grid, Container } from '@mui/material';
import PlaceCard from '../PlaceCard/PlaceCard';

const places = [
  {
    "id": 1,
    "name": "Cicciolina",
    "image": "https://media-cdn.tripadvisor.com/media/photo-s/16/41/ce/c7/cicciolina.jpg",
    "rating": 4.8,
    "reviews": 6051,
    "category": "Mediterráneo y Andino",
    "description": "Tapas y platos principales con un toque bohemio.",
    "address": "C. Palacio 110, Cusco 08002"
  },
  {
    "id": 2,
    "name": "Morena Peruvian Kitchen",
    "image": "https://media-cdn.tripadvisor.com/media/photo-s/1a/b8/46/6d/cusco-gastronomy.jpg",
    "rating": 4.7,
    "reviews": 2349,
    "category": "Peruano Contemporáneo",
    "description": "Ceviches, tiraditos y cócteles de autor.",
    "address": "Procuradores 320, Cusco 08002"
  },
  {
    "id": 3,
    "name": "Inka Grill",
    "image": "https://media-cdn.tripadvisor.com/media/photo-s/16/df/98/6c/inka-grill.jpg",
    "rating": 4.5,
    "reviews": 3178,
    "category": "Criollo",
    "description": "Platos clásicos con vista a la Plaza de Armas.",
    "address": "Portal de Panes 115, Cusco 08002"
  },
  {
    "id": 4,
    "name": "Limbus Restobar",
    "image": "https://media-cdn.tripadvisor.com/media/photo-s/11/13/83/88/limbus-restobar.jpg",
    "rating": 4.6,
    "reviews": 4580,
    "category": "Bar",
    "description": "Bebidas creativas con una vista increíble de Cusco.",
    "address": "San Blas, Cusco"
  },
  {
    "id": 5,
    "name": "Kusykay Peruvian Craft Food",
    "image": "https://media-cdn.tripadvisor.com/media/photo-s/23/32/9c/5e/kusykay-peruvian-craft.jpg",
    "rating": 5.0,
    "reviews": 4338,
    "category": "Peruano",
    "description": "Experiencia artesanal en cada plato.",
    "address": "Plaza de Armas, Cusco"
  },
  {
    "id": 6,
    "name": "MAP Café",
    "image": "https://media-cdn.tripadvisor.com/media/photo-s/03/eb/cf/c0/map-cafe.jpg",
    "rating": 4.9,
    "reviews": 2111,
    "category": "Gourmet",
    "description": "Ubicado dentro del Museo de Arte Precolombino.",
    "address": "Plazoleta Nazarenas 231, Cusco"
  },
  {
    "id": 7,
    "name": "El Jardin - Healthy Food & Coffee",
    "image": "https://media-cdn.tripadvisor.com/media/photo-s/1c/cc/d9/e0/el-jardin.jpg",
    "rating": 4.7,
    "reviews": 508,
    "category": "Café",
    "description": "Opciones saludables y ambiente acogedor.",
    "address": "Calle Nueva Alta, Cusco"
  }
];

const PlaceList = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {places.map((place) => (
          <Grid item key={place.id} xs={12} sm={6} md={4}>
            <PlaceCard place={place} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PlaceList; 