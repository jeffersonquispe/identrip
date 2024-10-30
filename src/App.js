import React from 'react';
import { CssBaseline } from '@mui/material';
import Header from './components/Header/Header';
import PlaceList from './components/PlaceList/PlaceList';

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <PlaceList />
    </>
  );
}

export default App; 