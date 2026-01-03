import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
        
        domain='dev-xgi1ni6k23x87bgd.us.auth0.com'
        clientId='mtjU18gBi79muG2Q9OlkIWyuu9R7R0rZ'
        authorizationParams={{
            redirect_uri: window.location.origin,
            // audience: 'https://dev-xgi1ni6k23x87bgd.us.auth0.com/api/v2/',
        }}
    >
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Auth0Provider>
);

reportWebVitals();
