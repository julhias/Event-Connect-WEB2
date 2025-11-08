// src/App.js

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PrestadoresPage from './pages/PrestadoresPage';
import GeolocationPage from './pages/GeolocationPage';
import EventosPage from './pages/EventosPage'; // <-- 1. IMPORTE A NOVA PÁGINA

function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-purple-600">
        Bem-vindo ao EventConnect!
      </h1>
      <p className="mt-4">Selecione um teste abaixo para verificar as APIs.</p>
    </div>
  );
}

function App() {
  return (
    <div className="p-8">
      <nav className="mb-8 p-4 bg-gray-100 rounded">
        <Link to="/" className="font-bold text-blue-600 mr-4 hover:underline">
          Home
        </Link>
        <Link to="/prestadores" className="font-bold text-blue-600 mr-4 hover:underline">
          Testar API Prestadores (JSONPlaceholder)
        </Link>
        <Link to="/geolocation" className="font-bold text-blue-600 mr-4 hover:underline">
          Testar API Geolocation (Navegador)
        </Link>
        {/* 2. ADICIONE O NOVO LINK */}
        <Link to="/eventos" className="font-bold text-green-600 hover:underline">
          Testar CRUD Eventos (LocalStorage)
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/prestadores" element={<PrestadoresPage />} />
        <Route path="/geolocation" element={<GeolocationPage />} />
        <Route path="/eventos" element={<EventosPage />} /> {/* <-- 3. ADICIONE A NOVA ROTA */}
      </Routes>
    </div>
  );
}

export default App;