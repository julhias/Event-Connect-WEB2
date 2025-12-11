// src/pages/PrestadoresPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PrestadorService from '../services/PrestadorService';

function PrestadoresPage() {
  const [prestadores, setPrestadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function carregarPrestadores() {
      try {
        setLoading(true);
        const dados = await PrestadorService.getAll();
        setPrestadores(dados);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    carregarPrestadores();
  }, []);

  const filteredPrestadores = prestadores.filter(p =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.categoria && p.categoria.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
      
      {/* Mobile Header */}
      <header className="flex lg:hidden justify-between items-center mb-6">
        <Link to="/">
          <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </Link>
        <h1 className="text-xl font-bold text-gray-800">Prestadores</h1>
        <div className="w-10"></div>
      </header>

      {/* Desktop Header */}
      <div className="hidden lg:block mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Prestadores de Serviço</h1>
        <p className="text-gray-600">Encontre os melhores profissionais para o seu evento</p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-xl shadow-sm p-3 sm:p-4 border border-purple-100 mb-6 hover:shadow-md transition">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar fotógrafo, buffet, DJ..."
          className="flex-1 focus:outline-none text-gray-700 bg-transparent text-sm sm:text-base"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
          <p className="mt-4 text-purple-600 font-semibold">Buscando profissionais...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-6 rounded-xl text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="font-semibold">Ops! {error}</p>
        </div>
      ) : filteredPrestadores.length === 0 ? (
        <div className="text-center py-20 opacity-50">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600">Nenhum prestador encontrado</p>
        </div>
      ) : (
        <>
          {/* Results Count */}
          <div className="mb-4 text-sm text-gray-600">
            {filteredPrestadores.length} {filteredPrestadores.length === 1 ? 'prestador encontrado' : 'prestadores encontrados'}
          </div>

          {/* Grid de Prestadores */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredPrestadores.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-sm p-4 sm:p-5 border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  {/* Imagem */}
                  <img
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0 border-2 border-purple-100"
                    src={`https://source.unsplash.com/random/200x200/?portrait&sig=${p.id}`}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                    alt={p.nome}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 text-sm sm:text-base truncate">
                          {p.nome}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">
                          {p.categoria || p.company?.bs || 'Profissional'}
                        </p>
                      </div>
                      <div className="flex items-center ml-2 flex-shrink-0">
                        <span className="text-yellow-400 text-lg">★</span>
                        <span className="text-sm font-semibold text-gray-700 ml-1">4.8</span>
                      </div>
                    </div>

                    <div className="flex items-center text-xs sm:text-sm text-purple-600 font-medium mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Verificado</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm sm:text-base font-bold text-purple-800">
                        R$ {100 + p.id * 10},00 /h
                      </span>
                      <Link 
                        to={`/prestador/${p.id}`}
                        className="bg-purple-100 text-purple-700 font-semibold px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-purple-200 transition-colors"
                      >
                        Ver Perfil
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PrestadoresPage;