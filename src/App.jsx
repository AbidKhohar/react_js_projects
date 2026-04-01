import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import CreatePage from './Components/CreatePage';
import Departments from './Components/Departments';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors closeButton />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/departments" element={<Departments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;