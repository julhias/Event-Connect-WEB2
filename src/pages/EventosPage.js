// src/pages/EventosPage.js
import React, { useState, useEffect } from 'react';
import EventoService from '../services/EventoService'; // Importa seu serviço de Evento
import { formatters } from '../utils/formatters'; // Importa seus formatadores

function EventosPage() {
  const [eventos, setEventos] = useState([]);
  const [nomeEvento, setNomeEvento] = useState('');
  const [localEvento, setLocalEvento] = useState('');
  const [error, setError] = useState(null);

  // 1. FUNÇÃO PARA CARREGAR OS EVENTOS SALVOS
  async function carregarEventos() {
    try {
      // Chama o service, que chama o repo, que lê o localStorage
      const dados = await EventoService.getAll();
      setEventos(dados);
    } catch (err) {
      setError(err.message);
    }
  }

  // 2. CARREGA OS EVENTOS QUANDO A PÁGINA ABRE
  useEffect(() => {
    carregarEventos();
  }, []);

  // 3. FUNÇÃO PARA CRIAR UM NOVO EVENTO
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const novoEvento = {
        nome: nomeEvento,
        local: localEvento,
        // Adiciona dados mínimos para o Schema passar
        tipo: 'Teste',
        data: '2030-01-01', // Data futura
        horario: '18:00',
        convidados: 1
      };
      
      // Chama o service, que valida, que chama o repo, que salva no localStorage
      await EventoService.create(novoEvento);
      
      // Limpa os campos e recarrega a lista
      setNomeEvento('');
      setLocalEvento('');
      carregarEventos(); // Atualiza a lista
      
    } catch (err) {
      // Se o Schema falhar (ex: nome curto), o erro aparece aqui
      setError(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Teste do CRUD (LocalStorage)</h2>
      
      {/* 4. FORMULÁRIO DE CRIAÇÃO */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-100 rounded">
        <h3 className="text-lg font-semibold">Criar Novo Evento</h3>
        <div className="my-2">
          <label className="block">Nome do Evento:</label>
          <input 
            type="text" 
            value={nomeEvento}
            onChange={(e) => setNomeEvento(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block">Local:</label>
          <input 
            type="text" 
            value={localEvento}
            onChange={(e) => setLocalEvento(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button 
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded font-bold hover:bg-green-700"
        >
          Salvar no LocalStorage
        </button>
        {error && <p className="text-red-500 mt-2">Erro: {error}</p>}
      </form>
      
      {/* 5. LISTA DE EVENTOS SALVOS */}
      <h3 className="text-lg font-semibold">Eventos Salvos</h3>
      {eventos.length === 0 ? (
        <p>Nenhum evento encontrado no LocalStorage.</p>
      ) : (
        <ul className="list-disc pl-5">
          {eventos.map(evento => (
            <li key={evento.id} className="mb-2">
              <strong className="text-green-700">{evento.nome}</strong> ({evento.local})
              <br />
              <small>Salvo em: {formatters.formatarData(evento.criacao)}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventosPage;