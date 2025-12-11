import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import EventoService from '../services/EventoService';
import { formatters } from '../utils/formatters';

const EventosPage = () => {
  // Estados do formulário
  const [nomeEvento, setNomeEvento] = useState('');
  const [tipoEvento, setTipoEvento] = useState('aniversario');
  const [dataEvento, setDataEvento] = useState('');
  const [localEvento, setLocalEvento] = useState('');
  const [horarioEvento, setHorarioEvento] = useState('');
  const [observacoes, setObservacoes] = useState('');
  
  // Estados para gerenciamento
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Carrega eventos salvos
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

  // Gera os dias do calendário
  const getDaysInMonth = (month, year) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Dias do mês anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({ day: prevMonthLastDay - i, isCurrentMonth: false });
    }
    
    // Dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }
    
    // Dias do próximo mês
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }
    
    return days;
  };

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
      
      // Limpa o formulário
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

  const days = getDaysInMonth(currentMonth, currentYear);

  return (
    <div className="bg-purple-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl flex-1 p-4 space-y-6 pb-20">
        
        {/* Header */}
        <header className="flex justify-between items-center pt-2 mb-4">
          <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-purple-100 rounded-full transition">
            <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7 text-gray-700" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Novo Evento</h1>
          <div className="text-2xl sm:text-3xl">🎉</div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Nome do Evento */}
          <div className="space-y-1">
            <label className="text-sm sm:text-base font-semibold text-gray-600">Nome do Evento</label>
            <input 
              type="text" 
              value={nomeEvento}
              onChange={(e) => setNomeEvento(e.target.value)}
              placeholder="Festinha da Ana"
              className="w-full py-3 px-4 sm:py-4 sm:px-5 border border-purple-300 rounded-xl bg-purple-100 text-purple-800 font-semibold focus:ring-2 focus:ring-purple-500 focus:bg-white text-sm sm:text-base"
            />
          </div>
          
          {/* Tipo do Evento */}
          <div className="space-y-1">
            <label className="text-sm sm:text-base font-semibold text-gray-600">Tipo do Evento</label>
            <div className="relative">
              <select 
                value={tipoEvento}
                onChange={(e) => setTipoEvento(e.target.value)}
                className="w-full py-3 px-4 sm:py-4 sm:px-5 border border-purple-300 rounded-xl bg-purple-100 text-purple-800 font-semibold appearance-none focus:ring-2 focus:ring-purple-500 focus:bg-white text-sm sm:text-base"
              >
                <option value="aniversario">Festa de Aniversário</option>
                <option value="casamento">Casamento</option>
                <option value="formatura">Formatura</option>
                <option value="outro">Outro</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-purple-700">
                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Data */}
          <div className="space-y-1">
            <label className="text-sm sm:text-base font-semibold text-gray-600">Data</label>
            <div className="relative">
              <input 
                type="text" 
                value={dataEvento}
                onChange={(e) => setDataEvento(e.target.value)}
                placeholder="MM/DD/YYYY"
                className="w-full py-3 px-4 pr-10 sm:py-4 sm:px-5 sm:pr-12 border border-purple-300 rounded-xl bg-purple-100 text-purple-800 font-semibold focus:ring-2 focus:ring-purple-500 focus:bg-white text-sm sm:text-base"
              />
              <button 
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-700"
              >
                <Calendar className="h-6 w-6" />
              </button>
            </div>
            <p className="text-xs font-medium text-gray-400 pl-4">MM/DD/YYYY</p>

            {/* Calendário */}
            {showCalendar && (
              <div className="bg-white rounded-xl shadow-lg mt-4 p-4 border border-purple-200">
                <div className="flex justify-between items-center text-lg font-semibold text-gray-800 mb-4">
                  <button 
                    type="button"
                    onClick={() => setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1)}
                    className="text-gray-500 hover:text-purple-700"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="text-purple-700">{monthNames[currentMonth]}</span>
                  <button 
                    type="button"
                    onClick={() => setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1)}
                    className="text-gray-500 hover:text-purple-700"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  <button 
                    type="button"
                    onClick={() => setCurrentYear(currentYear - 1)}
                    className="text-gray-500 hover:text-purple-700"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="text-purple-700">{currentYear}</span>
                  <button 
                    type="button"
                    onClick={() => setCurrentYear(currentYear + 1)}
                    className="text-gray-500 hover:text-purple-700"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 text-center font-bold text-sm text-gray-500 mb-2">
                  <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                </div>

                <div className="grid grid-cols-7 text-center text-sm gap-y-2">
                  {days.map((dayObj, idx) => {
                    const isSelected = dayObj.isCurrentMonth && 
                                      dayObj.day === selectedDate.getDate() &&
                                      currentMonth === selectedDate.getMonth() &&
                                      currentYear === selectedDate.getFullYear();
                    
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleDateSelect(dayObj)}
                        className={`py-2 ${
                          !dayObj.isCurrentMonth ? 'text-gray-300' : 
                          isSelected ? 'bg-purple-700 text-white font-bold rounded-full w-10 h-10 mx-auto flex items-center justify-center' : 
                          'hover:bg-purple-100 rounded-full'
                        }`}
                      >
                        {dayObj.day}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center text-sm font-semibold mt-4">
                  <button type="button" onClick={() => setDataEvento('')} className="text-gray-500">Clear</button>
                  <div className="space-x-4">
                    <button type="button" onClick={() => setShowCalendar(false)} className="text-gray-500">Cancel</button>
                    <button type="button" onClick={() => setShowCalendar(false)} className="text-purple-700">OK</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Local */}
          <div className="space-y-1">
            <label className="text-sm sm:text-base font-semibold text-gray-600">Local</label>
            <div className="relative">
              <input 
                type="text"
                value={localEvento}
                onChange={(e) => setLocalEvento(e.target.value)}
                placeholder="Salão Pinheiros"
                className="w-full py-3 px-4 pr-10 sm:py-4 sm:px-5 sm:pr-12 border border-purple-300 rounded-xl bg-purple-100 text-purple-800 font-semibold focus:ring-2 focus:ring-purple-500 focus:bg-white text-sm sm:text-base"
              />
              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-purple-700">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          {/* Horário */}
          <div className="space-y-1">
            <label className="text-sm sm:text-base font-semibold text-gray-600">Horário</label>
            <div className="relative">
              <input 
                type="time"
                value={horarioEvento}
                onChange={(e) => setHorarioEvento(e.target.value)}
                placeholder="20:00"
                className="w-full py-3 px-4 pr-10 sm:py-4 sm:px-5 sm:pr-12 border border-purple-300 rounded-xl bg-purple-100 text-purple-800 font-semibold focus:ring-2 focus:ring-purple-500 focus:bg-white text-sm sm:text-base"
              />
              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-purple-700">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          {/* Observações */}
          <div className="space-y-1">
            <label className="text-sm sm:text-base font-semibold text-gray-600">Observações Adicionais</label>
            <textarea 
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              className="w-full p-4 sm:p-5 border border-purple-300 rounded-xl bg-purple-100 text-purple-800 min-h-40 focus:ring-2 focus:ring-purple-500 focus:bg-white text-sm sm:text-base"
            />
          </div>

          {error && <p className="text-red-500 text-sm sm:text-base">{error}</p>}

          {/* Botão Criar */}
          <button 
            type="submit"
            className="w-full py-3 sm:py-4 bg-purple-700 text-white font-bold rounded-xl shadow-lg hover:bg-purple-800 transition duration-150 text-base sm:text-lg"
          >
            Criar Evento
          </button>
        </form>

        {/* Lista de Eventos Salvos */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Eventos Salvos</h3>
          {eventos.length === 0 ? (
            <p className="text-gray-500">Nenhum evento encontrado.</p>
          ) : (
            <div className="space-y-3">
              {eventos.map(evento => (
                <div key={evento.id} className="bg-white p-4 rounded-xl shadow border border-purple-200">
                  <h4 className="font-bold text-purple-700">{evento.nome}</h4>
                  <p className="text-sm text-gray-600">{evento.local}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Criado em: {formatters.formatarData(evento.criacao)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white shadow-md flex justify-around py-2 border-t fixed bottom-0 w-full max-w-2xl left-1/2 transform -translate-x-1/2">
        <button className="flex flex-col items-center justify-center text-purple-700 w-1/4">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1V10a1 1 0 00-1-1H7a1 1 0 00-1 1v10a1 1 0 001 1h2z" />
          </svg>
          <span className="text-xs font-semibold">Início</span>
        </button>
        <button className="flex flex-col items-center justify-center text-gray-500 w-1/4">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-xs font-semibold">Buscar</span>
        </button>
        <button className="flex flex-col items-center justify-center text-gray-500 w-1/4">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-xs font-semibold">Contratos</span>
        </button>
        <button className="flex flex-col items-center justify-center text-gray-500 w-1/4">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs font-semibold">Perfil</span>
        </button>
      </nav>
    </div>
  );
};

export default EventosPage;