import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CoinContextProvider } from './context/CoinContext.jsx'


createRoot(document.getElementById('root')).render(
    <CoinContextProvider >
        <App />
    </CoinContextProvider>
)
