# Invoice Management App

This is a simple Single Page Application (SPA) for managing invoices and daily closings. The application allows users to launch invoices and close the day by recording various types of receipts.

## Features

- Centralized logo display
- Dynamic SALDO display that changes color based on its value (green for positive, red for negative)
- Modal for launching invoices with fields for client name and invoice value
- Modal for closing the day with fields for different types of receipts
- Lists displaying launched invoices and daily closings

## Project Structure

```
invoice-management-app
├── public
│   ├── index.html          # Main HTML file
├── src
│   ├── components          # React components
│   │   ├── Header.tsx      # Header component
│   │   ├── InvoiceModal.tsx # Modal for launching invoices
│   │   ├── CloseDayModal.tsx # Modal for closing the day
│   │   ├── InvoiceList.tsx  # List of launched invoices
│   │   └── CloseDayList.tsx # List of daily closings
│   ├── App.tsx             # Main application component
│   ├── index.tsx           # Entry point for the React application
│   └── styles
│       └── App.css         # CSS styles for the application
├── package.json             # npm configuration file
├── tsconfig.json            # TypeScript configuration file
└── README.md                # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd invoice-management-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the application:
   ```
   npm start
   ```

## Usage

- Click on "Lançar Nota Fiscal" to open the invoice modal and enter the client's name and invoice value.
- Click on "Fechar o Dia" to open the closing modal and enter the various receipts.
- View the lists of launched invoices and daily closings below the buttons.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes. 

## License

This project is licensed under the MIT License.