// src/pages/MeusEventosPage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, MapPin, FileText, Clock, Plus } from 'lucide-react';
import EventoService from '../services/EventoService';
import { formatters } from '../utils/formatters';

function MeusEventosPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ativos'); // 'ativos' ou 'finalizados'
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarEventos();
  }, []);

  const carregarEventos = async () => {
    try {
      setLoading(true);
      const dados = await EventoService.getAll();
      setEventos(dados);
    } catch (err) {
      console.error('Erro ao carregar eventos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filtra eventos por status
  const eventosAtivos = eventos.filter(e => {
    const dataEvento = new Date(e.data);
    return dataEvento >= new Date();
  });

  const eventosFinalizados = eventos.filter(e => {
    const dataEvento = new Date(e.data);
    return dataEvento < new Date();
  });

  const eventosFiltrados = activeTab === 'ativos' ? eventosAtivos : eventosFinalizados;

  const getTabClass = (tab) => {
    return activeTab === tab
      ? 'w-full py-2 sm:py-3 text-sm font-semibold rounded-lg bg-purple-700 text-white transition-all'
      : 'w-full py-2 sm:py-3 text-sm font-semibold rounded-lg text-gray-500 hover:bg-purple-50 transition-all';
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
      
      {/* Mobile Header */}
      <header className="flex lg:hidden justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition">
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Meus Eventos</h1>
        <div className="text-2xl">🎉</div>
      </header>

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Meus Eventos</h1>
          <p className="text-gray-600">Gerencie todos os seus eventos</p>
        </div>
        <Link 
          to="/eventos"
          className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Criar Novo Evento
        </Link>
      </div>

      <div className="space-y-6">
        
        {/* Tabs */}
        <div className="flex bg-white p-1 sm:p-1.5 rounded-xl border border-purple-200 shadow-sm">
          <button 
            onClick={() => setActiveTab('ativos')}
            className={getTabClass('ativos')}
          >
            ✓ ATIVOS ({eventosAtivos.length})
          </button>
          <button 
            onClick={() => setActiveTab('finalizados')}
            className={getTabClass('finalizados')}
          >
            FINALIZADOS ({eventosFinalizados.length})
          </button>
        </div>

        {/* Botão Criar Evento - Mobile */}
        <Link 
          to="/eventos"
          className="lg:hidden flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Criar Novo Evento
        </Link>

        {/* Lista de Eventos */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
            <p className="mt-4 text-purple-600 font-semibold">Carregando eventos...</p>
          </div>
        ) : eventosFiltrados.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <div className="text-6xl mb-4">
              {activeTab === 'ativos' ? '📅' : '✓'}
            </div>
            <p className="text-gray-600 text-lg mb-6">
              {activeTab === 'ativos' 
                ? 'Você ainda não possui eventos ativos.' 
                : 'Você ainda não possui eventos finalizados.'}
            </p>
            {activeTab === 'ativos' && (
              <Link 
                to="/eventos"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                <Plus className="h-5 w-5" />
                Criar Primeiro Evento
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {eventosFiltrados.map((evento) => (
              <div 
                key={evento.id}
                className="bg-white rounded-2xl border border-purple-200 shadow-sm hover:shadow-md transition-all p-4 sm:p-6 space-y-4"
              >
                {/* Imagem do Evento */}
                <img 
                  src={`https://images.pexels.com/photos/${3802773 + evento.id}/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=800`}
                  alt={evento.nome}
                  className="rounded-lg w-full h-40 sm:h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.pexels.com/photos/3802773/pexels-photo-3802773.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />

                {/* Nome e Tipo */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-purple-900 mb-1">
                    {evento.nome}
                  </h3>
                  <p className="text-sm font-semibold text-purple-500">
                    {evento.tipo || 'Evento'}
                  </p>
                </div>

                {/* Informações */}
                <div className="flex justify-between text-sm border-t border-gray-100 pt-4">
                  <div>
                    <p className="font-bold text-gray-500 text-xs mb-1">DATA DO EVENTO</p>
                    <p className="font-semibold text-gray-800">
                      {formatters.formatarData ? formatters.formatarData(evento.data) : evento.data}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-500 text-xs mb-1">LOCAL</p>
                    <p className="font-semibold text-gray-800 truncate max-w-[150px]">
                      {evento.local || 'Não definido'}
                    </p>
                  </div>
                </div>

                {/* Descrição */}
                {evento.observacoes && (
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-bold text-gray-500 text-xs mb-2">Descrição:</p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {evento.observacoes}
                    </p>
                  </div>
                )}

                {/* Botões */}
                <div className="flex gap-2 pt-2">
                  <Link
                    to={`/evento/${evento.id}`}
                    className="flex-1 text-center py-3 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-800 transition"
                  >
                    Ver Detalhes
                  </Link>
                  <button
                    onClick={() => {
                      if (window.confirm('Deseja realmente excluir este evento?')) {
                        EventoService.delete(evento.id);
                        carregarEventos();
                      }
                    }}
                    className="px-4 py-3 bg-red-100 text-red-700 font-bold rounded-lg hover:bg-red-200 transition"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats - Desktop */}
        <div className="hidden lg:grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl p-6 border border-purple-100 text-center">
            <div className="text-3xl font-bold text-purple-700 mb-2">{eventos.length}</div>
            <div className="text-sm text-gray-600">Total de Eventos</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-green-100 text-center">
            <div className="text-3xl font-bold text-green-700 mb-2">{eventosAtivos.length}</div>
            <div className="text-sm text-gray-600">Eventos Ativos</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
            <div className="text-3xl font-bold text-gray-700 mb-2">{eventosFinalizados.length}</div>
            <div className="text-sm text-gray-600">Finalizados</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeusEventosPage;