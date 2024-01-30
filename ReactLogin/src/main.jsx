import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Dash from './Dashboard.jsx';
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { ContextSource } from "./context/ContextSource.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextSource>
      <div className='row'>
        <p><a href='https://github.com/GrassHopper12345'>by https://github.com/GrassHopper12345</a></p>
        <RouterProvider router={router} />
      </div>
    </ContextSource>
  </React.StrictMode>,
);
