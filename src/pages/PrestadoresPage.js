// src/pages/PrestadoresPage.js
import React, { useState, useEffect } from 'react';
import PrestadorService from '../services/PrestadorService';
import BottomNavigation from '../components/layout/BottomNavigation';
import { Link } from 'react-router-dom';

function PrestadoresPage() {
  const [prestadores, setPrestadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="bg-purple-50 text-gray-800 flex flex-col min-h-screen font-sans">
        
      {/* Conteúdo */}
      <div className="flex-1 p-4 pb-24">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
            <Link to="/">
                <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Prestadores</h1>
            <div className="w-8"></div> {/* Espaço vazio para balancear */}
        </header>

        {/* Barra de Pesquisa Visual */}
        <div className="flex items-center bg-white rounded-xl shadow-sm p-3 border border-purple-100 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Buscar fotógrafo, buffet..." className="flex-1 focus:outline-none text-gray-600 bg-transparent text-sm" />
        </div>

        {loading ? (
            <div className="flex flex-col items-center justify-center mt-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-700"></div>
                <p className="mt-3 text-purple-600 font-semibold">Buscando profissionais...</p>
            </div>
        ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
                <p>Ops! {error}</p>
            </div>
        ) : (
            /* Grid de Prestadores */
            <div className="grid grid-cols-1 gap-4">
                {prestadores.map((p) => (
                    <div key={p.id} className="bg-white rounded-xl shadow-sm p-3 flex items-center space-x-3 border border-gray-100 hover:shadow-md transition-shadow">
                        {/* Imagem (usando Unsplash com hash aleatório baseado no ID) */}
                        <img 
                            className="w-20 h-20 rounded-lg object-cover" 
                            src={`https://source.unsplash.com/random/200x200/?portrait&sig=${p.id}`} 
                            onError={(e) => {e.target.src = 'https://via.placeholder.com/150'}} // Fallback se unsplash falhar
                            alt={p.nome} 
                        />
                        
                        <div className="flex-1 space-y-1">
                            <p className="font-bold text-gray-800 text-sm line-clamp-1">{p.nome}</p>
                            <p className="text-xs text-gray-500 line-clamp-1">{p.categoria || p.company?.bs || 'Profissional'}</p>
                            
                            <div className="flex items-center text-xs text-purple-600 font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>Verificado</span>
                            </div>
                            
                            <div className="flex items-center text-sm font-bold text-purple-800">
                                <span>R$ {100 + (p.id * 10)},00 /h</span>
                            </div>
                        </div>

                        <div className="text-right flex flex-col justify-between h-20 py-1">
                            <div className="flex items-center justify-end text-purple-700 font-semibold text-xs">
                                <span className="text-yellow-400 mr-1 text-base">★</span>
                                <span>4.8</span>
                            </div>
                            <button className="bg-purple-100 text-purple-700 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-purple-200 transition-colors">
                                Perfil
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}

export default PrestadoresPage;