import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from "react-redux"
import { SnackbarProvider } from 'notistack';
import store from "./store/index.js"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <SnackbarProvider
      maxSnack={4}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={2500}
    >
      <Provider store={store}>
        <App />
      </Provider>
      </SnackbarProvider>
    </Router>
  </StrictMode>,
)
