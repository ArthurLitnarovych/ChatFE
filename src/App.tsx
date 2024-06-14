import React from 'react';
import './App.css';
import { AppRoutes } from './routes';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './services/authContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <ToastContainer></ToastContainer>
        <AppRoutes></AppRoutes>
      </AuthProvider>
      
    </div>
  );
}

export default App;
