import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import App from './components/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import 'react-tooltip/dist/react-tooltip.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);


