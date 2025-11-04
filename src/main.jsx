
import { createRoot } from 'react-dom/client'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'

const domain = import.meta.env.VITE_AUTH0_DOMAIN; 
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;


createRoot(document.getElementById('root')).render(
<Auth0Provider domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: "http://localhost:5173/"
    }}
  >


    <App />

    </Auth0Provider>
  
)
