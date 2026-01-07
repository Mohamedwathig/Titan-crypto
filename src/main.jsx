import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import store from './app/store.js';
import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
    <Provider store={store}>
            <App />
    </Provider>
    </HashRouter>
  </StrictMode>
);
