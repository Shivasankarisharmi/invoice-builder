# 🧾 Invoice Builder

A responsive invoice generation application built with React JS that allows users to create and manage invoices dynamically.

## 🔗 Live Demo
[View Live App](#) 

## 📌 Features

- 📋 Enter client and business details (name, email, address)
- 🔢 Editable invoice number and date
- ➕ Add multiple line items with description, quantity, and rate
- 🧮 Auto-calculate subtotal, tax (18%), and grand total in real-time
- ✏️ Edit or delete any line item before exporting
- 📥 Export invoice as a downloadable PDF using jsPDF
- 🖨️ Print invoice directly from the browser
- 💾 Auto-save data using localStorage (persists on page refresh)
- 🔄 Reset button to clear and start a new invoice
- 📱 Fully responsive for mobile, tablet, and desktop

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React JS | Frontend UI |
| Tailwind CSS v4 | Styling |
| React Hooks (useState, useEffect) | State management |
| jsPDF | PDF generation and export |
| localStorage | Data persistence |
| Vite | Build tool |

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or above)
- npm

### Installation

1. Clone the repository
   git clone https://github.com/your-username/invoice-builder.git

2. Navigate to the project folder
   cd invoice-builder

3. Install dependencies
   npm install

4. Start the development server
   npm run dev

5. Open your browser and visit
   http://localhost:5173

## 📦 Build for Production
   npm run build

## 📁 Project Structure

src/
├── components/
│   ├── ClientDetails.jsx      # Client and business info form
│   ├── LineItems.jsx          # Add, edit, delete line items
│   ├── InvoicePreview.jsx     # Printable invoice layout
│   └── ExportButton.jsx      # PDF download and print
├── App.jsx                    # Main app with state management
└── index.css                  # Tailwind CSS imports

## 🌐 Deployment

- Frontend deployed on: [Netlify](#)
- Repository: [GitHub](#)

