
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import { Box, Container } from '@mui/material';
import  Calculator  from './components/Calculator';
import ExchangeRates from './components/ExchangeRates';
import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/ErrorPage';
import NotFoundPage from './pages/NotFoundPage';
import { EMIProvider } from "./context/EMIContext";
import ErrorBoundary from './components/ErrorBoundary';

function App() {
	return (
		<ErrorBoundary>
			<ThemeProvider>
				<EMIProvider>
					<Router>
						<Box sx={{ 
						display: 'flex', 
						flexDirection: 'column', 
						minHeight: '100vh',
						transition: 'background-color 0.3s ease, color 0.3s ease'
						}}>
						<Header />
						<Container maxWidth="lg" sx={{ flex: 1 }}>
							<ErrorBoundary>
							<Routes>
							<Route path="/" element={<Calculator />} />
							<Route path="/exchange-rates" element={<ExchangeRates/>}/>
							<Route path="/about" element={<AboutPage />} />
							<Route path="/error" element={<ErrorPage />} />
							<Route path="*" element={<NotFoundPage />} />
							</Routes>
							</ErrorBoundary>
						</Container>
						</Box>
					</Router>
				</EMIProvider>
			</ThemeProvider>
		</ErrorBoundary>
	);
}

export default App;
