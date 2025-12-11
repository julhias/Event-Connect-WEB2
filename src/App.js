// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrestadoresPage from './pages/PrestadoresPage';
import GeolocationPage from './pages/GeolocationPage';
import EventosPage from './pages/EventosPage';
import ContratosPage from './pages/ContratosPage';
import PagamentoPage from './pages/PagamentoPage';
import HomePage from './pages/HomePage';
import DesktopNavbar from './components/layout/DesktopNavbar';
import BottomNavigation from './components/layout/BottomNavigation';

function App() {
  return (
    <div className="min-h-screen bg-purple-50">
      {/* Navbar Desktop - Aparece só em telas grandes */}
      <DesktopNavbar />

      {/* Conteúdo Principal */}
      <main className="min-h-screen pb-20 lg:pb-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/prestadores" element={<PrestadoresPage />} />
          <Route path="/geolocation" element={<GeolocationPage />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/contratos" element={<ContratosPage />} />
          <Route path="/pagamento" element={<PagamentoPage />} />
        </Routes>
      </main>

      {/* Bottom Navigation - Aparece só em mobile */}
      <BottomNavigation />

      {/* Footer - Desktop only */}
      <footer className="hidden lg:block mt-12 py-6 border-t border-gray-200 text-center text-gray-500 text-sm bg-white">
        <p>Desenvolvimento de Software para Web 2 - UFSCar - 2025</p>
        <p className="mt-2">EventConnect - Sistema completo para gestão de eventos</p>
      </footer>
    </div>
  );
}

export default App;