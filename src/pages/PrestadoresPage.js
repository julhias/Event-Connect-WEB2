// src/pages/PrestadoresPage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PrestadorService from '../services/PrestadorService';
import { 
  Search, 
  ChevronLeft, 
  MapPin, 
  Star, 
  CheckCircle, 
  Filter, 
  Briefcase,
  Users
} from 'lucide-react';

function PrestadoresPage() {
  const navigate = useNavigate();
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
    <div className="bg-purple-50 min-h-screen font-sans pb-20 lg:pb-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 space-y-6">
        
        {/* --- HEADER --- */}
        <header className="flex items-center justify-between mb-4 lg:mb-8">
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/')} 
                  className="w-10 h-10 flex lg:hidden items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition text-gray-600"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <div>
                    <h1 className="text-xl lg:text-3xl font-bold text-gray-800 flex items-center gap-2">
                        Prestadores
                        <span className="hidden lg:flex bg-purple-100 text-purple-600 p-1.5 rounded-lg">
                            <Users className="h-5 w-5" />
                        </span>
                    </h1>
                    <p className="hidden lg:block text-gray-500 text-sm">Encontre os melhores profissionais para o seu evento</p>
                </div>
            </div>
        </header>

        {/* --- BARRA DE BUSCA --- */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-purple-100 flex items-center gap-2 max-w-3xl mx-auto">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar fotógrafo, buffet, DJ..."
                    className="w-full pl-10 pr-4 py-3 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm lg:text-base"
                />
            </div>
            <button className="hidden sm:flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2.5 rounded-xl hover:bg-gray-200 transition font-medium text-sm">
                <Filter className="h-4 w-4" /> Filtros
            </button>
        </div>

        {/* --- CONTEÚDO --- */}
        {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
                <p className="mt-4 text-purple-600 font-medium animate-pulse">Buscando profissionais...</p>
            </div>
        ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-center max-w-lg mx-auto">
                <div className="text-4xl mb-3">⚠️</div>
                <p className="font-bold">Não foi possível carregar</p>
                <p className="text-sm mt-1">{error}</p>
            </div>
        ) : filteredPrestadores.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-700">Nenhum prestador encontrado</h3>
                <p className="text-gray-500 text-sm">Tente buscar por outro termo ou categoria.</p>
            </div>
        ) : (
            <>
                <p className="text-sm text-gray-500 font-medium ml-1">
                    {filteredPrestadores.length} {filteredPrestadores.length === 1 ? 'profissional encontrado' : 'profissionais encontrados'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPrestadores.map((p) => (
                        <div
                            key={p.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-purple-200 transition-all duration-300 flex flex-col overflow-hidden group"
                        >
                            {/* Header do Card (Foto + Avaliação) */}
                            <div className="p-5 flex items-start gap-4 border-b border-gray-50">
                                <div className="relative">
                                    <img
                                        className="w-16 h-16 rounded-full object-cover border-2 border-purple-100 group-hover:border-purple-300 transition-colors"
                                        src={`https://images.unsplash.com/photo-${1500000000000 + p.id}?auto=format&fit=crop&w=200&q=80`} // Imagem aleatória baseada no ID
                                        onError={(e) => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${p.nome}&background=f3e8ff&color=6b21a8`;
                                        }}
                                        alt={p.nome}
                                    />
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-white"></div>
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 truncate leading-tight mb-1">{p.nome}</h3>
                                    <div className="flex items-center text-xs text-gray-500 mb-1">
                                        <Briefcase className="h-3 w-3 mr-1" />
                                        <span className="truncate">{p.categoria || p.company?.bs || 'Serviços Gerais'}</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-yellow-50 w-fit px-1.5 py-0.5 rounded text-xs font-bold text-yellow-700 border border-yellow-100">
                                        <Star className="h-3 w-3 fill-current" /> 4.8
                                    </div>
                                </div>
                            </div>

                            {/* Corpo do Card */}
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center text-xs text-purple-600 font-bold mb-3 bg-purple-50 w-fit px-2 py-1 rounded-md">
                                        <CheckCircle className="h-3 w-3 mr-1" /> Verificado
                                    </div>
                                    
                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                        <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
                                        <span className="truncate">{p.address?.city || 'São Paulo'}, SP</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-50">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 font-medium uppercase">A partir de</span>
                                        <span className="text-base font-bold text-gray-900">
                                            R$ {100 + (p.id * 5)},00 <span className="text-xs font-normal text-gray-500">/h</span>
                                        </span>
                                    </div>
                                    
                                    <Link 
                                        to={`/prestador/${p.id}`}
                                        className="bg-purple-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-purple-700 transition shadow-sm hover:shadow-purple-200"
                                    >
                                        Ver Perfil
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )}
      </div>
    </div>
  );
}

export default PrestadoresPage;