// src/pages/GeolocationPage.js
import React, { useState } from 'react';
import GeolocationService from '../services/GeolocationService'; // Importa seu serviço

function GeolocationPage() {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      setPosition(null);
      
      // 1. CHAMA O SERVIÇO QUE CHAMA A API DO NAVEGADOR
      const pos = await GeolocationService.getCurrentPosition();
      setPosition(pos);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Teste da API (Geolocation)</h2>
      <button
        onClick={handleGetLocation}
        className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Buscando...' : 'Obter Localização'}
      </button>

      {/* 2. RENDERIZA O RESULTADO */}
      {error && (
        <p className="text-red-500 mt-4">Erro: {error}</p>
      )}
      
      {position && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p><strong>Latitude:</strong> {position.lat}</p>
          <p><strong>Longitude:</strong> {position.lng}</p>
          <p><strong>Precisão:</strong> {position.accuracy} metros</p>
        </div>
      )}
    </div>
  );
}

export default GeolocationPage;