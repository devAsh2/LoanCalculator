# Loan Calculator App (loan-calApp)

## Overview
The Loan Calculator App is a modern, single-page web application built using React JS and Material UI. It allows users to calculate loan EMIs (Equated Monthly Installments), view a detailed amortization schedule, and see real-time currency conversions of their EMI using live exchange rates.

## Features
- **Loan EMI Calculation**: Calculate monthly EMI using standard financial formulas.
- **Dynamic Amortization Schedule**: View a detailed amortization schedule with a monthly breakdown.
- **Real-time Currency Conversion**: Convert EMI amounts using live exchange rates from an external API.
- **Paginated Exchange Rate Table**: Access exchange rates for 160+ currencies.
- **Dark/Light Mode Toggle**: Customize the app's appearance based on user preference.

## Technologies Used
- **React**: For building the user interface with hooks and context API.
- **Material UI**: For styling and responsive components.
- **Axios**: For making API calls to fetch exchange rates.
- **Exchange Rate API**: For real-time currency conversion.

## Installation
To run the Loan Calculator App locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/loan-calApp.git
   cd loan-calApp
2. **Install the dependencies**
   ```bash
   npm install  
3. **Add the environment variables in .env file**
   Sign in Exchange API and generate your API key
   ```bash
   VITE_REACT_APP_API_KEY='Your_API_Key'
   VITE_EXCHANGE_API_URI = 'https://v6.exchangerate-api.com/v6'
4. **Run the repository**
   ```bash
   npm run dev

## Usage
1. **Enter Loan Details**: Input the loan amount, interest rate, and term in years.
2. **Calculate EMI**: Click the "Calculate" button to compute the monthly EMI.
3. **View Amortization Schedule**: Check the detailed amortization schedule displayed below the calculator.
4. **Currency Conversion**: Use the currency converter to see how your EMI translates into different currencies based on live exchange rates.

## Acknowledgments
- Thanks to the contributors and the open-source community for their support and resources.
- Special thanks to the developers of the libraries and APIs used in this project, including React, Material UI, and Axios.