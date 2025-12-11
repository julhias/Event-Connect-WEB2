// src/pages/GeolocationPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GeolocationService from '../services/GeolocationService';

function GeolocationPage() {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      setPosition(null);
      
      const pos = await GeolocationService.getCurrentPosition();
      setPosition(pos);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
      
      {/* Mobile Header */}
      <header className="flex lg:hidden justify-between items-center mb-6">
        <Link to="/">
          <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </Link>
        <h1 className="text-xl font-bold text-gray-800">Geolocalização</h1>
        <div className="w-10"></div>
      </header>

      {/* Desktop Header */}
      <div className="hidden lg:block mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Teste de Geolocalização</h1>
        <p className="text-gray-600">Use a API de Geolocalização do navegador para obter sua localização atual</p>
      </div>

      {/* Card Principal */}
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-green-100">
        
        {/* Ícone e Descrição */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📍</div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Obter Localização Atual
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Clique no botão abaixo para permitir o acesso à sua localização
          </p>
        </div>

        {/* Botão */}
        <button
          onClick={handleGetLocation}
          disabled={loading}
          className={`
            w-full py-4 rounded-xl font-bold text-lg transition-all duration-200
            ${loading 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
            }
          `}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Buscando localização...
            </span>
          ) : (
            '📍 Obter Minha Localização'
          )}
        </button>

        {/* Erro */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start">
              <div className="text-2xl mr-3">⚠️</div>
              <div>
                <p className="font-bold text-red-700 mb-1">Erro ao obter localização</p>
                <p className="text-red-600 text-sm">{error}</p>
                <p className="text-red-500 text-xs mt-2">
                  Certifique-se de que você permitiu o acesso à localização no navegador
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Resultado */}
        {position && (
          <div className="mt-6 space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">✅</div>
                <h3 className="text-lg font-bold text-green-800">Localização Obtida com Sucesso!</h3>
              </div>

              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border border-green-100">
                  <p className="text-xs text-gray-500 mb-1">LATITUDE</p>
                  <p className="text-lg font-mono font-bold text-gray-800">{position.lat}</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-green-100">
                  <p className="text-xs text-gray-500 mb-1">LONGITUDE</p>
                  <p className="text-lg font-mono font-bold text-gray-800">{position.lng}</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-green-100">
                  <p className="text-xs text-gray-500 mb-1">PRECISÃO</p>
                  <p className="text-lg font-bold text-gray-800">
                    ±{Math.round(position.accuracy)} metros
                  </p>
                </div>
              </div>

              {/* Mapa (Link para Google Maps) */}
              <a
                href={`https://www.google.com/maps?q=${position.lat},${position.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full text-center bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                🗺️ Ver no Google Maps
              </a>
            </div>
          </div>
        )}

        {/* Info adicional */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start">
            <div className="text-2xl mr-3">ℹ️</div>
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-2">Como funciona:</p>
              <ul className="space-y-1 text-blue-700">
                <li>• Esta página usa a API de Geolocalização do navegador</li>
                <li>• É necessário conceder permissão de localização</li>
                <li>• A precisão pode variar dependendo do dispositivo</li>
                <li>• Em desktop, a localização é baseada no IP</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeolocationPage;