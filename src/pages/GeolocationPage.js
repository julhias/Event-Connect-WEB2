// src/pages/GeolocationPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GeolocationService from '../services/GeolocationService';
import { MapPin, Star, User, ChevronLeft, Navigation, AlertCircle } from 'lucide-react';

function GeolocationPage() {
  const navigate = useNavigate();
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Novo estado para os prestadores "encontrados"
  const [nearbyProviders, setNearbyProviders] = useState([]);

  // Função para gerar prestadores fictícios
  const generateMockProviders = () => {
    return [
      {
        id: 1,
        nome: "Buffet Sabor Real",
        categoria: "Buffet",
        distancia: "0.8 km",
        avaliacao: 4.8,
        imagem: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 2,
        nome: "DJ TechnoHouse",
        categoria: "Música e DJ",
        distancia: "1.2 km",
        avaliacao: 4.9,
        imagem: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 3,
        nome: "Clara Fotografia",
        categoria: "Fotografia",
        distancia: "2.5 km",
        avaliacao: 5.0,
        imagem: "https://images.pexels.com/photos/3497125/pexels-photo-3497125.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 4,
        nome: "Segurança Total",
        categoria: "Segurança",
        distancia: "3.1 km",
        avaliacao: 4.7,
        imagem: "https://images.pexels.com/photos/3568521/pexels-photo-3568521.jpeg?auto=compress&cs=tinysrgb&w=400"
      }
    ];
  };

  const handleGetLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      setPosition(null);
      setNearbyProviders([]); // Limpa prestadores antigos
      
      const pos = await GeolocationService.getCurrentPosition();
      setPosition(pos);

      // Simula delay de rede para parecer uma busca real
      setTimeout(() => {
        const fakeProviders = generateMockProviders();
        setNearbyProviders(fakeProviders);
      }, 800); 

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-purple-50 min-h-screen font-sans pb-12">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        
        {/* --- HEADER --- */}
        <header className="flex items-center justify-between mb-6 lg:mb-10">
          {/* Mobile: Botão Voltar / Desktop: Título Grande */}
          <div className="flex items-center gap-4">
             <button 
                onClick={() => navigate('/')} 
                className="lg:hidden w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition text-gray-600"
             >
                <ChevronLeft className="h-6 w-6" />
             </button>
             
             <div>
                <h1 className="text-xl lg:text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <Navigation className="h-5 w-5 lg:h-8 lg:w-8 text-purple-600 hidden lg:block" />
                    Geolocalização
                </h1>
                <p className="hidden lg:block text-gray-500 mt-1 text-lg">Encontre profissionais próximos a você agora mesmo.</p>
             </div>
          </div>
          <div className="lg:hidden w-10"></div> {/* Spacer mobile */}
        </header>

        {/* --- CARD PRINCIPAL --- */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 lg:p-12 border border-purple-100 text-center transition-all">
          
          {/* Estado Inicial ou Carregando */}
          <div className="mb-8 lg:mb-10">
            <div className="text-6xl lg:text-7xl mb-4 lg:mb-6 animate-bounce inline-block">
                📍
            </div>
            <h2 className="text-xl lg:text-3xl font-bold text-gray-800 mb-2 lg:mb-3">
              Onde você está agora?
            </h2>
            <p className="text-gray-500 text-sm lg:text-lg max-w-lg mx-auto leading-relaxed">
              Ative sua localização para que possamos encontrar os melhores buffets, DJs e fotógrafos na sua região.
            </p>
          </div>

          {/* Botão de Ação */}
          <button
            onClick={handleGetLocation}
            disabled={loading}
            className={`
              w-full max-w-md mx-auto py-4 lg:py-5 rounded-xl font-bold text-lg lg:text-xl transition-all duration-200 flex items-center justify-center gap-3
              ${loading 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-purple-200 hover:-translate-y-1'
              }
            `}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-6 w-6 text-purple-500 lg:text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-purple-500 lg:text-white">Buscando...</span>
              </>
            ) : (
              <>
                <MapPin className="h-6 w-6" />
                Obter Minha Localização
              </>
            )}
          </button>

          {/* Mensagem de Erro */}
          {error && (
            <div className="mt-6 max-w-md mx-auto bg-red-50 border border-red-200 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 text-left">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                <div>
                  <p className="font-bold text-red-700 text-sm lg:text-base">Ops! Não conseguimos te achar.</p>
                  <p className="text-red-600 text-xs lg:text-sm mt-1">{error}</p>
                  <p className="text-red-500 text-xs mt-2">
                    Verifique se a permissão de localização está ativada no seu navegador.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- RESULTADOS --- */}
        {position && (
          <div className="mt-8 lg:mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Badge de Localização Detectada */}
            <div className="flex justify-center">
                <div className="bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded-full text-sm lg:text-base font-semibold flex items-center gap-2 shadow-sm">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                   Localização detectada: <span className="font-mono">{position.lat.toFixed(4)}, {position.lng.toFixed(4)}</span>
                </div>
            </div>

            <div className="border-t border-purple-200/50 pt-8">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <User className="text-purple-600 h-6 w-6" />
                Prestadores encontrados na região
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {nearbyProviders.map((provider) => (
                  <div key={provider.id} className="bg-white border border-gray-100 rounded-2xl p-4 lg:p-5 shadow-sm hover:shadow-md hover:border-purple-200 transition-all flex gap-4 lg:gap-5 items-center group cursor-pointer">
                    
                    {/* Imagem */}
                    <img 
                      src={provider.imagem} 
                      alt={provider.nome}
                      className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl object-cover border-2 border-gray-100 group-hover:border-purple-200 transition-colors"
                    />
                    
                    {/* Infos */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-lg lg:text-xl truncate">{provider.nome}</h4>
                      <p className="text-xs lg:text-sm text-purple-600 font-bold uppercase tracking-wide mb-2">{provider.categoria}</p>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-gray-100 text-gray-700 text-xs lg:text-sm px-2.5 py-1 rounded-md font-medium">
                           <MapPin className="w-3.5 h-3.5 mr-1 text-gray-500" />
                           {provider.distancia}
                        </div>
                        <div className="flex items-center text-yellow-500 text-xs lg:text-sm font-bold">
                           <Star className="w-4 h-4 fill-current mr-1" />
                           {provider.avaliacao}
                        </div>
                      </div>
                    </div>
                    
                    {/* Seta (Desktop) */}
                    <div className="hidden lg:block text-gray-300 group-hover:text-purple-600 transition-colors">
                        <ChevronLeft className="h-6 w-6 rotate-180" />
                    </div>

                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-4">
                 <Link to="/prestadores" className="inline-flex items-center text-purple-600 font-bold hover:text-purple-800 hover:underline text-sm lg:text-base transition-all">
                    Ver todos os prestadores disponíveis <ChevronLeft className="h-4 w-4 rotate-180 ml-1" />
                 </Link>
            </div>
            
          </div>
        )}

        {/* Rodapé Informativo */}
        {!position && (
            <div className="mt-12 text-center text-xs lg:text-sm text-gray-400 max-w-2xl mx-auto">
                <p>Usamos a API de Geolocalização do seu navegador para calcular distâncias reais e sugerir os melhores parceiros EventConnect.</p>
            </div>
        )}
      </div>
    </div>
  );
}

export default GeolocationPage;