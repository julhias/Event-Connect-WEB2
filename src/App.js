// src/App.js

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PrestadoresPage from './pages/PrestadoresPage';
import GeolocationPage from './pages/GeolocationPage';
import EventosPage from './pages/EventosPage';
import ContratosPage from './pages/ContratosPage'; // <-- 1. IMPORTE A NOVA PÁGINA

function HomePage() {
  // ... (código da home)
}

function App() {
  return (
    <div className="p-8">
      <nav className="mb-8 p-4 bg-gray-100 rounded flex flex-wrap gap-4"> {/* Melhorado com flex-wrap */}
        <Link to="/" className="font-bold text-blue-600 hover:underline">
          Home
        </Link>
        <Link to="/prestadores" className="font-bold text-blue-600 hover:underline">
          Testar API Prestadores
        </Link>
        <Link to="/geolocation" className="font-bold text-blue-600 hover:underline">
          Testar API Geolocation
        </Link>
        <Link to="/eventos" className="font-bold text-green-600 hover:underline">
          Testar CRUD Eventos
        </Link>
        {/* 2. ADICIONE O NOVO LINK */}
        <Link to="/contratos" className="font-bold text-orange-600 hover:underline">
          Testar CRUD Contratos
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/prestadores" element={<PrestadoresPage />} />
        <Route path="/geolocation" element={<GeolocationPage />} />
        <Route path="/eventos" element={<EventosPage />} />
        <Route path="/contratos" element={<ContratosPage />} /> {/* <-- 3. ADICIONE A NOVA ROTA */}
      </Routes>
    </div>
  );
}

export default App;