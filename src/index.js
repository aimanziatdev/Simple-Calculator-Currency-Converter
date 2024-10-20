
import React from 'react';           // React library import
import ReactDOM from 'react-dom/client';  // Importing ReactDOM to render components
import App from './App';             // Main App component import

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
