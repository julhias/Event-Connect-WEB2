import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Plus, 
  Trash2, 
  Eye, 
  PartyPopper
} from 'lucide-react';
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

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
        try {
            // Simulação local para atualizar a UI instantaneamente
            const novaLista = eventos.filter(e => e.id !== id);
            setEventos(novaLista);
            localStorage.setItem('meus_eventos', JSON.stringify(novaLista));
        } catch (error) {
            alert('Erro ao excluir evento');
        }
    }
  };

  // Filtra eventos por status
  const eventosAtivos = eventos.filter(e => {
    if (!e.data) return true;
    let dataEvento;
    if (e.data.includes('/')) {
        const [dia, mes, ano] = e.data.split('/');
        dataEvento = new Date(`${ano}-${mes}-${dia}`);
    } else {
        dataEvento = new Date(e.data);
    }
    return dataEvento >= new Date().setHours(0,0,0,0);
  });

  const eventosFinalizados = eventos.filter(e => {
    if (!e.data) return false;
    let dataEvento;
    if (e.data.includes('/')) {
        const [dia, mes, ano] = e.data.split('/');
        dataEvento = new Date(`${ano}-${mes}-${dia}`);
    } else {
        dataEvento = new Date(e.data);
    }
    return dataEvento < new Date().setHours(0,0,0,0);
  });

  const eventosFiltrados = activeTab === 'ativos' ? eventosAtivos : eventosFinalizados;

  // CORREÇÃO: Função de estilo melhorada para alinhar texto e contador
  const getTabClass = (tab) => {
    const baseClass = "flex-1 py-2.5 sm:py-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 border ";
    
    return activeTab === tab
      ? baseClass + 'bg-purple-600 text-white border-purple-600 shadow-md transform scale-105' 
      : baseClass + 'bg-transparent text-gray-500 border-transparent hover:bg-purple-50 hover:text-purple-600';
  };

  return (
    <div className="bg-purple-50 min-h-screen font-sans pb-20 lg:pb-12">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 space-y-6">
        
        {/* --- HEADER --- */}
        <header className="flex items-center justify-between mb-4 lg:mb-8">
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate(-1)} 
                  className="w-10 h-10 flex lg:hidden items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition text-gray-600"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <div>
                    <h1 className="text-xl lg:text-3xl font-bold text-gray-800 flex items-center gap-2">
                        Meus Eventos 
                        <span className="lg:hidden text-2xl">🎉</span>
                    </h1>
                    <p className="hidden lg:block text-gray-500">Gerencie e acompanhe todos os seus eventos planejados</p>
                </div>
            </div>

            <Link 
                to="/eventos" 
                className="hidden lg:flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-purple-700 transition shadow-lg hover:-translate-y-0.5"
            >
                <Plus className="h-5 w-5" />
                Criar Novo Evento
            </Link>
        </header>

        {/* --- TABS DE FILTRO (CORRIGIDO) --- */}
        {/* Container cinza claro para destacar os botões "pill" */}
        <div className="bg-gray-100 p-1.5 rounded-xl border border-gray-200 shadow-inner max-w-md mx-auto lg:mx-0 flex">
            <button onClick={() => setActiveTab('ativos')} className={getTabClass('ativos')}>
                <Calendar className="h-4 w-4" />
                ATIVOS 
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ml-1 ${activeTab === 'ativos' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {eventosAtivos.length}
                </span>
            </button>
            <button onClick={() => setActiveTab('finalizados')} className={getTabClass('finalizados')}>
                <Clock className="h-4 w-4" />
                FINALIZADOS 
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ml-1 ${activeTab === 'finalizados' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {eventosFinalizados.length}
                </span>
            </button>
        </div>

        {/* --- LISTA DE EVENTOS --- */}
        {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
                <p className="mt-4 text-gray-500 text-sm font-medium">Carregando seus eventos...</p>
            </div>
        ) : eventosFiltrados.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-dashed border-gray-300 lg:p-16">
                <div className="bg-purple-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {activeTab === 'ativos' ? <Calendar className="h-10 w-10 text-purple-300" /> : <Clock className="h-10 w-10 text-gray-300" />}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {activeTab === 'ativos' ? 'Nenhum evento ativo' : 'Nenhum evento finalizado'}
                </h3>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                    {activeTab === 'ativos' 
                        ? 'Que tal começar a planejar sua próxima festa agora mesmo?' 
                        : 'Seus eventos passados aparecerão aqui.'}
                </p>
                
                {activeTab === 'ativos' && (
                    <Link 
                        to="/eventos"
                        className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition shadow-lg hover:shadow-purple-200"
                    >
                        <Plus className="h-5 w-5" />
                        Criar Primeiro Evento
                    </Link>
                )}
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {eventosFiltrados.map((evento) => (
                    <div 
                        key={evento.id}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-purple-200 transition-all duration-300 group flex flex-col overflow-hidden"
                    >
                        {/* Imagem (Capa) */}
                        <div className="h-40 sm:h-48 overflow-hidden relative">
                             <img 
                                src={`https://images.pexels.com/photos/${3802773 + (evento.id * 10)}/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=800`}
                                alt={evento.nome}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                    e.target.src = 'https://images.pexels.com/photos/3802773/pexels-photo-3802773.jpeg?auto=compress&cs=tinysrgb&w=800';
                                }}
                             />
                             <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-purple-700 uppercase tracking-wide shadow-sm">
                                {evento.tipo || 'Evento'}
                             </div>
                        </div>

                        {/* Conteúdo */}
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-purple-700 transition-colors">
                                {evento.nome}
                            </h3>
                            
                            <div className="space-y-2 mt-3 mb-4 flex-1">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Calendar className="h-4 w-4 mr-2.5 text-purple-500" />
                                    <span className="font-medium">{formatters.formatarData(evento.data)}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="h-4 w-4 mr-2.5 text-purple-500" />
                                    <span className="truncate">{evento.local || 'Local a definir'}</span>
                                </div>
                            </div>

                            {/* Botões de Ação */}
                            <div className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-50">
                                <button 
                                    className="col-span-3 py-2.5 bg-purple-50 text-purple-700 font-bold rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-center gap-2 text-sm"
                                    onClick={() => navigate(`/eventos`)}
                                >
                                    <Eye className="h-4 w-4" /> Ver Detalhes
                                </button>
                                <button 
                                    onClick={() => handleDelete(evento.id)}
                                    className="col-span-1 py-2.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center"
                                    title="Excluir Evento"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* --- STATS (Desktop Only) --- */}
        <div className="hidden lg:grid grid-cols-3 gap-6 pt-6 border-t border-gray-100">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                    <PartyPopper className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-gray-800">{eventos.length}</p>
                    <p className="text-xs text-gray-500 font-bold uppercase">Total de Eventos</p>
                </div>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <Calendar className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-gray-800">{eventosAtivos.length}</p>
                    <p className="text-xs text-gray-500 font-bold uppercase">Eventos Ativos</p>
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-full text-gray-500">
                    <Clock className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-gray-800">{eventosFinalizados.length}</p>
                    <p className="text-xs text-gray-500 font-bold uppercase">Finalizados</p>
                </div>
            </div>
        </div>

        {/* Botão Flutuante Mobile (FAB) */}
        <Link 
            to="/eventos"
            className="lg:hidden fixed bottom-24 right-4 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition z-40 animate-in zoom-in"
        >
            <Plus className="h-6 w-6" />
        </Link>

      </div>
    </div>
  );
}

export default MeusEventosPage;