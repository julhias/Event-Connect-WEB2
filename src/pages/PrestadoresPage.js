// src/pages/PrestadoresPage.js
import React, { useState, useEffect } from 'react';
import PrestadorService from '../services/PrestadorService'; // Importa seu serviço

function PrestadoresPage() {
  const [prestadores, setPrestadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function carregarPrestadores() {
      try {
        setLoading(true);
        // 1. CHAMA O SERVIÇO QUE CHAMA A API
        const dados = await PrestadorService.getAll();
        setPrestadores(dados);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    carregarPrestadores();
  }, []); // O [] faz o useEffect rodar só uma vez

  // 2. RENDERIZA O RESULTADO
  if (loading) {
    return <p className="text-blue-500">Carregando prestadores da API...</p>;
  }

  if (error) {
    return <p className="text-red-500">Erro ao buscar dados: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Teste da API (JSONPlaceholder)</h2>
      <ul className="list-disc pl-5">
        {prestadores.map(p => (
          <li key={p.id} className="mb-2">
            <strong className="text-purple-700">{p.nome}</strong> ({p.categoria})
            <br />
            <small>{p.email}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PrestadoresPage;