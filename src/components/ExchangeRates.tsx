import React, { useState } from "react";
import {
	Box,
	Typography,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	SelectChangeEvent,
	CircularProgress,
	Alert,
	GridLegacy as Grid,
	useTheme,
} from "@mui/material";
import useCurrencyConverter from "../hooks/useCurrencyConverter";
import { useEMI } from "../context/EMIContext.tsx";

const ExchangeRates: React.FC = () => {
	const theme = useTheme();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [baseCurrency, setBaseCurrency] = useState("USD");
	const [searchQuery, setSearchQuery] = useState("");
	const { monthlyEMI } = useEMI();
	const [emiValue, setEmiValue] = useState(monthlyEMI || 0);

	const { exchangeRates, loading, error, changeBaseCurrency, convertAmount } =
		useCurrencyConverter(baseCurrency);

	// Handle page change
	const handleChangePage = (_: unknown, newPage: number) => {
		setPage(newPage);
	};

	// Handle rows per page change
	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// Handle base currency change
	const handleBaseCurrencyChange = (event: SelectChangeEvent) => {
		const newBaseCurrency = event.target.value;
		setBaseCurrency(newBaseCurrency);
		changeBaseCurrency(newBaseCurrency);
	};

	// Handle search
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
		setPage(0);
	};

	// Handle emi value change
	const handleEmiValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		// Only update the state if the value is a valid number (or empty string)
		if (/^\d*$/.test(value)) {
			setEmiValue(Number(value));
		}
	};

	// Common currencies
	const currencies = [
		{ code: "USD", name: "US Dollar" },
		{ code: "EUR", name: "Euro" },
		{ code: "GBP", name: "British Pound" },
		{ code: "JPY", name: "Japanese Yen" },
		{ code: "CAD", name: "Canadian Dollar" },
		{ code: "AUD", name: "Australian Dollar" },
		{ code: "INR", name: "Indian Rupee" },
	];

	// Format exchange rates for table
	const ratesArray = Object.entries(exchangeRates || {})
		.map(([currency, rate]) => ({
			currency,
			rate,
			emiExchange: convertAmount(emiValue, currency),
		}))
		.filter((item) =>
			item.currency.toLowerCase().includes(searchQuery.toLowerCase())
		);

	// Get visible rows
	const visibleRows = ratesArray.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage
	);

	return (
		<Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
			<Typography
				variant="h2"
				component="h1"
				gutterBottom
				sx={{
					mb: 4,
					color:
						theme.palette.mode === "dark" ? "primary.light" : "primary.dark",
					fontWeight: "bold",
				}}
			>
				Live Exchange Rates
			</Typography>

			<Grid container spacing={3} sx={{ mb: 4 }}>
				<Grid item xs={12} md={4}>
					<FormControl fullWidth>
						<InputLabel id="base-currency-label">Base Currency</InputLabel>
						<Select
							labelId="base-currency-label"
							value={baseCurrency}
							label="Base Currency"
							onChange={handleBaseCurrencyChange}
						>
							{currencies.map((currency) => (
								<MenuItem key={currency.code} value={currency.code}>
									{currency.code} - {currency.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={4}>
					<TextField
						label="Enter EMI"
						fullWidth
						value={emiValue}
						onChange={handleEmiValueChange}
						placeholder="Enter EMI"
					/>
				</Grid>
				<Grid item xs={12} md={4}>
					<TextField
						label="Search Currency"
						fullWidth
						value={searchQuery}
						onChange={handleSearchChange}
						placeholder="Enter currency code"
					/>
				</Grid>
			</Grid>

			{loading && (
				<Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
					<CircularProgress />
				</Box>
			)}

			{error && (
				<Alert severity="warning" sx={{ mb: 4 }}>
					{error} Using sample data instead.
				</Alert>
			)}

			{!loading && (
				<Paper
					sx={{
						width: "100%",
						overflow: "hidden",
						borderRadius: 2,
						boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
					}}
				>
					<TableContainer sx={{ maxHeight: 440 }}>
						<Table stickyHeader aria-label="exchange rates table">
							<TableHead>
								<TableRow>
									<TableCell
										sx={{
											fontWeight: "bold",
											bgcolor:
												theme.palette.mode === "dark"
													? "primary.dark"
													: "primary.light",
											color: theme.palette.mode === "dark" ? "white" : "white",
										}}
									>
										Currency
									</TableCell>
									<TableCell
										align="right"
										sx={{
											fontWeight: "bold",
											bgcolor:
												theme.palette.mode === "dark"
													? "primary.dark"
													: "primary.light",
											color: theme.palette.mode === "dark" ? "white" : "white",
										}}
									>
										Exchange Rate (1 {baseCurrency} equals)
									</TableCell>
									<TableCell
										align="right"
										sx={{
											fontWeight: "bold",
											bgcolor:
												theme.palette.mode === "dark"
													? "primary.dark"
													: "primary.light",
											color: theme.palette.mode === "dark" ? "white" : "white",
										}}
									>
										Exchange Rate for EMI ({emiValue} {baseCurrency} equals)
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{visibleRows.map((row) => (
									<TableRow
										key={row.currency}
										sx={{
											"&:nth-of-type(odd)": {
												bgcolor:
													theme.palette.mode === "dark"
														? "rgba(255, 255, 255, 0.05)"
														: "rgba(0, 0, 0, 0.02)",
											},
											"&:hover": {
												bgcolor:
													theme.palette.mode === "dark"
														? "rgba(255, 255, 255, 0.1)"
														: "rgba(0, 0, 0, 0.04)",
											},
										}}
									>
										<TableCell component="th" scope="row">
											{row.currency}
										</TableCell>
										<TableCell align="right">
											{row.rate.toFixed(4)} {row.currency}
										</TableCell>
										<TableCell align="right">
											{row.emiExchange.toFixed(4)} {row.currency}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25, 50, 100]}
						component="div"
						count={ratesArray.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			)}
		</Box>
	);
};

export default ExchangeRates;