import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  PartyPopper, 
  AlignLeft,
  Search
} from 'lucide-react';
import EventoService from '../services/EventoService';
import { formatters } from '../utils/formatters';

const EventosPage = () => {
  const navigate = useNavigate();
  const nomeInputRef = useRef(null);

  // --- ESTADOS ---
  const [nomeEvento, setNomeEvento] = useState('');
  const [tipoEvento, setTipoEvento] = useState('aniversario');
  const [dataEvento, setDataEvento] = useState('');
  const [localEvento, setLocalEvento] = useState('');
  const [horarioEvento, setHorarioEvento] = useState('');
  const [observacoes, setObservacoes] = useState('');
  
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    carregarEventos();
  }, []);

  const carregarEventos = async () => {
    try {
      const dados = await EventoService.getAll();
      setEventos(dados);
    } catch (err) {
      setError(err.message);
    }
  };

  // --- CALENDÁRIO ---
  const getDaysInMonth = (month, year) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days = [];
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({ day: prevMonthLastDay - i, isCurrentMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }
    return days;
  };

  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const handleDateSelect = (day) => {
    if (day.isCurrentMonth) {
      const selected = new Date(currentYear, currentMonth, day.day);
      setSelectedDate(selected);
      const formatted = `${String(currentMonth + 1).padStart(2, '0')}/${String(day.day).padStart(2, '0')}/${currentYear}`;
      setDataEvento(formatted);
      setShowCalendar(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const novoEvento = {
        nome: nomeEvento,
        tipo: tipoEvento,
        data: dataEvento,
        local: localEvento,
        horario: horarioEvento,
        observacoes: observacoes,
        convidados: 1
      };
      await EventoService.create(novoEvento);
      
      // Limpa formulário
      setNomeEvento('');
      setTipoEvento('aniversario');
      setDataEvento('');
      setLocalEvento('');
      setHorarioEvento('');
      setObservacoes('');
      
      carregarEventos();
      alert('Evento criado com sucesso!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFocusInput = () => {
    if(nomeInputRef.current) {
        nomeInputRef.current.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const days = getDaysInMonth(currentMonth, currentYear);

  return (
    <div className="bg-purple-50 min-h-screen flex flex-col font-sans">
      
      {/* --- HEADER RESPONSIVO --- */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                
                {/* Esquerda: Navegação e Título */}
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => navigate('/meus-eventos')}
                        className="p-2 hover:bg-purple-50 rounded-full transition-colors text-gray-600 lg:hidden"
                        title="Voltar"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    
                    <div className="flex items-center gap-2">
                        <div className="bg-purple-100 p-2 rounded-lg hidden lg:block">
                            <PartyPopper className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">Meus Eventos</h1>
                            <p className="hidden lg:block text-xs text-gray-500">Organize suas festas em um só lugar</p>
                        </div>
                    </div>
                </div>

                {/* Direita: Ação Principal (Desktop) */}
                <div className="flex items-center">
                    <button
                        onClick={handleFocusInput}
                        className="hidden lg:flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Novo Evento
                    </button>
                    <div className="lg:hidden text-2xl">🎉</div>
                </div>
            </div>
        </div>
      </header>
      
      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* COLUNA ESQUERDA: Formulário (Ocupa 5 colunas no desktop) */}
            <div className="lg:col-span-5 space-y-6">
                <div className="hidden lg:block">
                    <h2 className="text-xl font-bold text-gray-800">Criar Novo Evento</h2>
                    <p className="text-sm text-gray-500">Preencha os dados abaixo para começar.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-purple-100 p-5 lg:p-6 space-y-5">
                    
                    {/* Nome */}
                    <div className="space-y-1.5">
                        <label className="text-xs lg:text-sm font-bold text-gray-600 uppercase tracking-wide">Nome do Evento</label>
                        <input 
                            ref={nomeInputRef}
                            type="text" 
                            value={nomeEvento}
                            onChange={(e) => setNomeEvento(e.target.value)}
                            placeholder="Ex: Festinha da Ana"
                            className="w-full p-3 lg:p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-sm lg:text-base outline-none font-medium"
                        />
                    </div>
                    
                    {/* Tipo e Data (Grid) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs lg:text-sm font-bold text-gray-600 uppercase tracking-wide">Tipo</label>
                            <div className="relative">
                                <select 
                                    value={tipoEvento}
                                    onChange={(e) => setTipoEvento(e.target.value)}
                                    className="w-full p-3 lg:p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-purple-500 transition-all text-sm lg:text-base outline-none appearance-none font-medium"
                                >
                                    <option value="aniversario">Aniversário</option>
                                    <option value="casamento">Casamento</option>
                                    <option value="formatura">Formatura</option>
                                    <option value="outro">Outro</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-purple-600">
                                    <ChevronRight className="h-4 w-4 rotate-90" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5 relative">
                            <label className="text-xs lg:text-sm font-bold text-gray-600 uppercase tracking-wide">Data</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={dataEvento}
                                    onChange={(e) => setDataEvento(e.target.value)}
                                    placeholder="DD/MM/AAAA"
                                    className="w-full p-3 lg:p-3.5 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-purple-500 transition-all text-sm lg:text-base outline-none font-medium"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowCalendar(!showCalendar)}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 hover:text-purple-700 transition"
                                >
                                    <Calendar className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Calendário Pop-up */}
                            {showCalendar && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-20 animate-in fade-in zoom-in-95">
                                    <div className="flex justify-between items-center mb-4">
                                        <button type="button" onClick={() => setCurrentMonth(prev => prev === 0 ? 11 : prev - 1)}><ChevronLeft className="h-5 w-5 text-gray-400 hover:text-purple-600" /></button>
                                        <span className="font-bold text-purple-800">{monthNames[currentMonth]} {currentYear}</span>
                                        <button type="button" onClick={() => setCurrentMonth(prev => prev === 11 ? 0 : prev + 1)}><ChevronRight className="h-5 w-5 text-gray-400 hover:text-purple-600" /></button>
                                    </div>
                                    <div className="grid grid-cols-7 text-center text-xs font-bold text-gray-400 mb-2">
                                        <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1">
                                        {days.map((d, i) => (
                                            <button 
                                                key={i} 
                                                type="button"
                                                onClick={() => handleDateSelect(d)}
                                                className={`h-8 w-8 flex items-center justify-center rounded-full text-xs font-medium transition-colors ${
                                                    !d.isCurrentMonth ? 'text-gray-200' :
                                                    d.day === selectedDate.getDate() && currentMonth === selectedDate.getMonth() ? 'bg-purple-600 text-white' : 'hover:bg-purple-50 text-gray-700'
                                                }`}
                                            >
                                                {d.day}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Local e Horário - AQUI FOI APLICADA A CORREÇÃO (pl-12) */}
                    <div className="grid grid-cols-3 gap-4">
                         <div className="col-span-2 space-y-1.5">
                            <label className="text-xs lg:text-sm font-bold text-gray-600 uppercase tracking-wide">Local</label>
                            <div className="relative">
                                <input 
                                    type="text"
                                    value={localEvento}
                                    onChange={(e) => setLocalEvento(e.target.value)}
                                    placeholder="Salão..."
                                    // CORREÇÃO: pl-12 aqui para não encavalar
                                    className="w-full p-3 lg:p-3.5 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-purple-500 transition-all text-sm lg:text-base outline-none font-medium text-gray-700 placeholder-gray-400"
                                />
                                {/* CORREÇÃO: pointer-events-none */}
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 pointer-events-none">
                                    <MapPin className="h-5 w-5" />
                                </div>
                            </div>
                         </div>
                         <div className="space-y-1.5">
                            <label className="text-xs lg:text-sm font-bold text-gray-600 uppercase tracking-wide">Hora</label>
                            <div className="relative">
                                <input 
                                    type="time"
                                    value={horarioEvento}
                                    onChange={(e) => setHorarioEvento(e.target.value)}
                                    className="w-full p-3 lg:p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-purple-500 transition-all text-sm lg:text-base outline-none font-medium text-center text-gray-700"
                                />
                            </div>
                         </div>
                    </div>

                    {/* Observações - AQUI FOI APLICADA A CORREÇÃO (pl-12) */}
                    <div className="space-y-1.5">
                         <label className="text-xs lg:text-sm font-bold text-gray-600 uppercase tracking-wide">Notas</label>
                         <div className="relative">
                            <textarea 
                                value={observacoes}
                                onChange={(e) => setObservacoes(e.target.value)}
                                placeholder="Detalhes adicionais do evento..."
                                // CORREÇÃO: pl-12 aqui também
                                className="w-full p-3 lg:p-3.5 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-purple-500 transition-all text-sm lg:text-base outline-none font-medium min-h-[100px] text-gray-700 placeholder-gray-400 resize-none"
                            />
                            {/* CORREÇÃO: pointer-events-none */}
                            <div className="absolute left-4 top-4 text-purple-500 pointer-events-none">
                                <AlignLeft className="h-5 w-5" />
                            </div>
                         </div>
                    </div>

                    {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-100">{error}</div>}

                    <button 
                        type="submit"
                        className="w-full py-3.5 lg:py-4 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <Plus className="h-5 w-5" />
                        Criar Evento
                    </button>
                </form>
            </div>

            {/* COLUNA DIREITA: Lista (Ocupa 7 colunas no desktop) */}
            <div className="lg:col-span-7">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                    <h2 className="text-lg lg:text-xl font-bold text-gray-800 flex items-center gap-2">
                        Eventos Agendados
                        <span className="bg-purple-100 text-purple-700 py-0.5 px-2.5 rounded-full text-xs lg:text-sm font-extrabold">
                            {eventos.length}
                        </span>
                    </h2>
                    
                    {/* Filtro simples (visual) */}
                    <div className="relative hidden sm:block">
                        <input type="text" placeholder="Buscar..." className="pl-8 pr-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 w-40" />
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    </div>
                </div>

                {eventos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 bg-white border border-dashed border-gray-300 rounded-2xl">
                        <div className="bg-gray-50 p-4 rounded-full mb-3">
                            <PartyPopper className="h-8 w-8 text-gray-300" />
                        </div>
                        <p className="text-gray-500 font-medium">Nenhum evento criado ainda.</p>
                        <p className="text-gray-400 text-sm">Preencha o formulário para começar!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {eventos.map(evento => (
                            <div key={evento.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="bg-purple-50 text-purple-600 p-2.5 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                        <PartyPopper className="h-5 w-5" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                                        {evento.tipo}
                                    </span>
                                </div>
                                
                                <h4 className="font-bold text-gray-800 text-lg mb-1 truncate">{evento.nome}</h4>
                                
                                <div className="space-y-1.5 mb-4">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Calendar className="h-3.5 w-3.5 mr-2 text-purple-400" />
                                        {evento.data}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Clock className="h-3.5 w-3.5 mr-2 text-purple-400" />
                                        {evento.horario || '---'}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <MapPin className="h-3.5 w-3.5 mr-2 text-purple-400" />
                                        <span className="truncate">{evento.local || 'Local não definido'}</span>
                                    </div>
                                </div>
                                
                                <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                                    <span className="text-xs text-gray-400">
                                        Criado em {formatters.formatarData(evento.criacao).split(' ')[0]}
                                    </span>
                                    <button className="text-sm font-semibold text-purple-600 hover:text-purple-800">
                                        Detalhes &rarr;
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default EventosPage;