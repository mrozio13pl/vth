import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './global.css';

const app = createRoot(document.querySelector('#root')!);

app.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
