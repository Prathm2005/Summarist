import React from 'react';
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store } from './services/store.js'
import { ClerkProvider } from '@clerk/clerk-react'

const Publishablekey=import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={Publishablekey} afterSignOutUrl="/">
    <Provider store={store}>
    <App />
    </Provider>
    </ClerkProvider>
  </React.StrictMode>
)
