import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import { Box, Container } from '@mui/material';
import  Calculator  from './components/Calculator';

function App() {
	return (
		<ThemeProvider>
      		<Router>
				<Box sx={{ 
				display: 'flex', 
				flexDirection: 'column', 
				minHeight: '100vh',
				transition: 'background-color 0.3s ease, color 0.3s ease'
				}}>
				<Header />
				<Container maxWidth="lg" sx={{ flex: 1 }}>
					<Routes>
					<Route path="/" element={<Calculator />} />
					
					</Routes>
				</Container>
				</Box>
      		</Router>
    	</ThemeProvider>
	);
}

export default App;
