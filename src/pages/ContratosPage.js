// src/pages/ContratosPage.js
import React, { useState, useEffect } from 'react';
import ContratoService from '../services/ContratoService'; // Importa seu serviço de Contrato
import { formatters } from '../utils/formatters'; // Para formatar moeda e data

function ContratosPage() {
  const [contratos, setContratos] = useState([]);
  const [servico, setServico] = useState('');
  const [valor, setValor] = useState(0);
  const [error, setError] = useState(null);

  // 1. FUNÇÃO PARA CARREGAR OS CONTRATOS SALVOS
  async function carregarContratos() {
    try {
      const dados = await ContratoService.getAll();
      setContratos(dados);
    } catch (err) {
      setError(err.message);
    }
  }

  // 2. CARREGA OS CONTRATOS QUANDO A PÁGINA ABRE
  useEffect(() => {
    carregarContratos();
  }, []);

  // 3. FUNÇÃO PARA CRIAR UM NOVO CONTRATO
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const novoContrato = {
        servico: servico,
        valor: parseFloat(valor),
        
        // Adiciona dados mínimos para o Schema passar na validação
        prestadorId: 1, // IDs de teste
        prestador: "Prestador Teste",
        eventoId: 1,
        evento: "Evento Teste",
        data: '2030-01-01',
        descricao: "Descrição longa o suficiente para passar no schema de teste."
      };
      
      await ContratoService.create(novoContrato);
      
      // Limpa os campos e recarrega a lista
      setServico('');
      setValor(0);
      carregarContratos(); // Atualiza a lista
      
    } catch (err) {
      // Se o Schema falhar (ex: descrição curta, valor < 0), o erro aparece aqui
      setError(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Teste do CRUD de Contratos (LocalStorage)</h2>
      
      {/* 4. FORMULÁRIO DE CRIAÇÃO */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-100 rounded">
        <h3 className="text-lg font-semibold">Criar Novo Contrato</h3>
        <div className="my-2">
          <label className="block">Nome do Serviço:</label>
          <input 
            type="text" 
            value={servico}
            onChange={(e) => setServico(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block">Valor (R$):</label>
          <input 
            type="number" 
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button 
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded font-bold hover:bg-orange-700"
        >
          Salvar Contrato no LocalStorage
        </button>
        {error && <p className="text-red-500 mt-2">Erro: {error}</p>}
      </form>
      
      {/* 5. LISTA DE CONTRATOS SALVOS */}
      <h3 className="text-lg font-semibold">Contratos Salvos</h3>
      {contratos.length === 0 ? (
        <p>Nenhum contrato encontrado no LocalStorage.</p>
      ) : (
        <ul className="list-disc pl-5">
          {contratos.map(contrato => (
            <li key={contrato.id} className="mb-2">
              <strong className="text-orange-700">{contrato.servico}</strong>
              <span className={`ml-2 px-2 py-0.5 rounded text-xs ${contrato.status === 'negociando' ? 'bg-yellow-200' : 'bg-green-200'}`}>
                {contrato.status}
              </span>
              <br />
              <small>Valor: {formatters.formatarMoeda(contrato.valor)}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContratosPage;