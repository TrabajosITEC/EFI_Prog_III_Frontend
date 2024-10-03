import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../components/App';

import { PrimeReactProvider} from 'primereact/api';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'; 
import "primereact/resources/themes/tailwind-light/theme.css";

import 'bootswatch/dist/cosmo/bootstrap.min.css';

const primeConfig = {
  ripple: true
};

createRoot(document.getElementById('root')).render(
  <PrimeReactProvider value={primeConfig}>
    <StrictMode>
      <App/>
    </StrictMode>
  </PrimeReactProvider>
)
