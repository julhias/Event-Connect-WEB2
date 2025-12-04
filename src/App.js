import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PrestadoresPage from './pages/PrestadoresPage';
import GeolocationPage from './pages/GeolocationPage';
import EventosPage from './pages/EventosPage';
import ContratosPage from './pages/ContratosPage';
import PagamentoPage from './pages/PagamentoPage';

function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">EventConnect Web App</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* card para pagamento!!! */}
        <div className="border border-purple-200 rounded-xl p-6 bg-purple-50 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold text-purple-700 mb-3">💳 Pagamento</h2>
          <p className="text-gray-600 mb-4">
            Simulação completa de pagamento com múltiplos métodos (cartão, PIX, boleto)
          </p>
          <Link 
            to="/pagamento" 
            className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Acessar Tela de Pagamento
          </Link>
        </div>
        
        {/* card para prestadores!!! */}
        <div className="border border-blue-200 rounded-xl p-6 bg-blue-50 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold text-blue-700 mb-3">👥 Prestadores</h2>
          <p className="text-gray-600 mb-4">Testar API de prestadores de serviço</p>
          <Link 
            to="/prestadores" 
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Acessar
          </Link>
        </div>
        
        {/* card para geolocation!!! */}
        <div className="border border-green-200 rounded-xl p-6 bg-green-50 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold text-green-700 mb-3">📍 Geolocalização</h2>
          <p className="text-gray-600 mb-4">Testar API de geolocalização do navegador</p>
          <Link 
            to="/geolocation" 
            className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Acessar
          </Link>
        </div>
        
        {/* card para eventos!!! */}
        <div className="border border-yellow-200 rounded-xl p-6 bg-yellow-50 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold text-yellow-700 mb-3">📅 Eventos</h2>
          <p className="text-gray-600 mb-4">Testar CRUD completo de eventos</p>
          <Link 
            to="/eventos" 
            className="inline-block bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
          >
            Acessar
          </Link>
        </div>
        
        {/* card para contratos!!! */}
        <div className="border border-orange-200 rounded-xl p-6 bg-orange-50 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold text-orange-700 mb-3">📝 Contratos</h2>
          <p className="text-gray-600 mb-4">Testar CRUD completo de contratos</p>
          <Link 
            to="/contratos" 
            className="inline-block bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
          >
            Acessar
          </Link>
        </div>
        
        {/* card extra para demonstração!!! */}
        <div className="border border-gray-200 rounded-xl p-6 bg-gray-50 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold text-gray-700 mb-3">🚀 Sobre o Projeto</h2>
          <p className="text-gray-600 mb-4">
            Aplicativo web para conexão entre clientes e prestadores de serviços para eventos.
          </p>
          <div className="text-sm text-gray-500">
            <p>• React com Tailwind CSS</p>
            <p>• Múltiplas APIs integradas</p>
            <p>• Layout totalmente responsivo</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-purple-700 mb-2">EventConnect</h1>
        <p className="text-gray-600">Sistema completo para gestão de eventos e serviços</p>
      </header>

      <nav className="mb-8 p-4 bg-gray-100 rounded-lg flex flex-wrap gap-4 shadow-sm">
        <Link 
          to="/" 
          className="font-bold text-blue-600 hover:underline px-3 py-2 hover:bg-blue-50 rounded"
        >
          🏠 Home
        </Link>
        <Link 
          to="/prestadores" 
          className="font-bold text-blue-600 hover:underline px-3 py-2 hover:bg-blue-50 rounded"
        >
          👥 Testar API Prestadores
        </Link>
        <Link 
          to="/geolocation" 
          className="font-bold text-blue-600 hover:underline px-3 py-2 hover:bg-blue-50 rounded"
        >
          📍 Testar API Geolocation
        </Link>
        <Link 
          to="/eventos" 
          className="font-bold text-green-600 hover:underline px-3 py-2 hover:bg-green-50 rounded"
        >
          📅 Testar CRUD Eventos
        </Link>
        <Link 
          to="/contratos" 
          className="font-bold text-orange-600 hover:underline px-3 py-2 hover:bg-orange-50 rounded"
        >
          📝 Testar CRUD Contratos
        </Link>
        
        {/* link para pagamento!!! */}
        <Link 
          to="/pagamento" 
          className="font-bold text-purple-600 hover:underline px-3 py-2 hover:bg-purple-50 rounded bg-purple-100"
        >
          💳 Tela de Pagamento
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/prestadores" element={<PrestadoresPage />} />
        <Route path="/geolocation" element={<GeolocationPage />} />
        <Route path="/eventos" element={<EventosPage />} />
        <Route path="/contratos" element={<ContratosPage />} />
        <Route path="/pagamento" element={<PagamentoPage />} />
      </Routes>

      <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>Desenvolvimento de Software para Web 2 - UFSCar - 2025</p>
        <p className="mt-2">Entrega 2: React com funcionalidades completas e integração</p>
      </footer>
    </div>
  );
}

export default App;