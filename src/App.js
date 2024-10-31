import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import Header from './components/Header/Header';
import PlaceList from './components/PlaceList/PlaceList';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #121212 0%, #1a1a1a 100%)',
      }}>
        <Header />
        <PlaceList />
      </div>
    </ThemeProvider>
  );
}

export default App; 