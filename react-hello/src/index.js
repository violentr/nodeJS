import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./context";

import "./index.css";
import App from "./App";


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextProvider>
);