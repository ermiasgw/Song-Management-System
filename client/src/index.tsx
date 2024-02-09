import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import SongPage from './pages/song/SongPage';
import AlbumPage from './pages/album/AlbumPage';
import StatisticsPage from './pages/statistics/StatisticsPage';
import { ThemeProvider } from '@emotion/react';




const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    text: '#212529',
    background: '#fff',
  },
  fonts: {
    body: 'Arial, sans-serif',
    heading: 'Arial, sans-serif',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },
  lineHeights: {
    normal: 1,
    body: 1.5,
    heading: 1.2,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  sizes: [0, 4, 8, 16, 32, 64, 128, 256],
  breakpoints: ['40em', '52em', '64em'],
  borders: [0, '1px solid', '2px solid'],
  radii: [0, 4, 8, 16],
  shadows: [
    'none',
    '0 1px 2px rgba(0, 0, 0, 0.1)',
    '0 2px 4px rgba(0, 0, 0, 0.1)',
    '0 4px 8px rgba(0, 0, 0, 0.1)',
    '0 8px 16px rgba(0, 0, 0, 0.1)',
  ],
};


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <SongPage />
      },
      {
        path: '/albums',
        element: <AlbumPage />
      },
      {
        path: '/statistics',
        element: <StatisticsPage />
      }
    ]
  },
  {
    path: '/signin',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <RegisterPage />
  }
])
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);


