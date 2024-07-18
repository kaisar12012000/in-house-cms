import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppContextProvider from './context/AppContextProvider';
import ArticleComp from './Components/ArticleComp';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/", element: <App />
  },
  {
    path: "/article", element: <ArticleComp />
  }
])

root.render(
  <React.StrictMode>
    <AppContextProvider>
    <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
