import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProviderWrapper } from './context/AuthContext';
import './index.css';
import App from './App';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import * as serviceWorker from './services/serviceWorker';

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <AuthProviderWrapper>
        <App />
      </AuthProviderWrapper>
  </Router>
);
if (process.env.REACT_APP_NODE_ENV === 'production') {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}
