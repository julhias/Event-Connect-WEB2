// src/pages/ContratosPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContratoService from '../services/ContratoService';
import BottomNavigation from '../components/layout/BottomNavigation';
import { formatters } from '../utils/formatters';

function ContratosPage() {
  // --- LÓGICA ORIGINAL (MANTIDA) ---
  const [contratos, setContratos] = useState([]);
  const [servico, setServico] = useState('');
  const [valor, setValor] = useState(0);
  const [error, setError] = useState(null);

  // Estado novo para controlar as abas do visual
  const [activeTab, setActiveTab] = useState('ativos'); // 'ativos', 'negociando', 'concluidos'

  async function carregarContratos() {
    try {
      const dados = await ContratoService.getAll();
      setContratos(dados);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    carregarContratos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const novoContrato = {
        servico: servico,
        valor: parseFloat(valor),
        // Dados mockados para passar no schema (mantidos)
        prestadorId: 1,
        prestador: "Prestador Teste",
        eventoId: 1,
        evento: "Evento Teste",
        data: '2030-01-01',
        descricao: "Descrição automática criada via React",
        status: 'negociando' // Forçando status para cair na aba certa
      };
      
      await ContratoService.create(novoContrato);
      setServico('');
      setValor(0);
      carregarContratos();
      setActiveTab('negociando'); // Muda para a aba onde o contrato novo aparece
    } catch (err) {
      setError(err.message);
    }
  };

  // --- LÓGICA VISUAL (FILTROS) ---
  const contratosFiltrados = contratos.filter(c => {
    // Se o backend não tiver status, assumimos 'ativos' para mostrar algo
    const status = c.status || 'ativos'; 
    return status.toLowerCase() === activeTab;
  });

  // Estilos dinâmicos para os botões (Pills)
  const getTabClass = (tabName) => {
    const baseClass = "text-xs font-semibold px-4 py-1 rounded-full transition-colors border ";
    if (activeTab === tabName) {
      return baseClass + "bg-purple-100 text-purple-700 border-purple-300";
    }
    return baseClass + "bg-white text-gray-500 border-transparent hover:bg-gray-50";
  };

  return (
    <div className="bg-purple-50 text-gray-800 flex flex-col min-h-screen font-sans">
      
      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 p-4 space-y-4 pb-24">
        
        {/* Header da Página */}
        <div className="flex justify-center items-center relative py-2 px-4">
           <h2 className="text-lg font-semibold text-gray-700">Contratações</h2>
           <button className="absolute right-0 text-purple-600">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8v-2m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0-4v-2m0 2a2 2 0 100 4m0-4a2 2 0 110 4m6-14v6m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0 0v6" />
             </svg>
           </button>
        </div>

        {/* Card de Resumo (Topo) */}
        <div className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center border border-purple-100">
           <h2 className="text-xl font-bold text-purple-800">Meus contratos</h2>
           <div className="text-2xl">📝</div>
        </div>

        {/* Formulário "Disfarçado" (Mantendo sua funcionalidade de Criar) */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-4 border border-orange-100">
            <h3 className="text-sm font-bold text-orange-600 mb-2 uppercase">⚡ Adicionar Novo Contrato (Teste)</h3>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    placeholder="Serviço (ex: DJ)" 
                    value={servico}
                    onChange={(e) => setServico(e.target.value)}
                    className="flex-1 p-2 bg-gray-50 rounded border border-gray-200 text-sm focus:outline-purple-500"
                    required
                />
                <input 
                    type="number" 
                    placeholder="Valor" 
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    className="w-20 p-2 bg-gray-50 rounded border border-gray-200 text-sm focus:outline-purple-500"
                    required
                />
                <button type="submit" className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </form>

        {/* Abas de Filtro */}
        <div className="flex justify-around items-center space-x-2 bg-gray-100 p-1 rounded-full">
           <button onClick={() => setActiveTab('ativos')} className={getTabClass('ativos')}>Ativos</button>
           <button onClick={() => setActiveTab('negociando')} className={getTabClass('negociando')}>Negociando</button>
           <button onClick={() => setActiveTab('concluidos')} className={getTabClass('concluidos')}>Concluídos</button>
        </div>

        {/* Lista de Cards */}
        <div className="space-y-3 pt-2">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide pl-1">
              Lista: {activeTab}
          </h2>

          {contratosFiltrados.length === 0 ? (
             <div className="text-center py-10 opacity-50">
                 <p>Nenhum contrato {activeTab} encontrado.</p>
             </div>
          ) : (
            contratosFiltrados.map(contrato => (
              <div key={contrato.id} className="bg-white rounded-xl shadow-sm p-4 space-y-4 border border-gray-100">
                <div className="flex items-center space-x-4">
                    {/* Imagem Placeholder Randomica */}
                    <img 
                        className="w-14 h-14 rounded-full object-cover border-2 border-purple-100" 
                        src={`https://i.pravatar.cc/150?u=${contrato.id}`} 
                        alt="Prestador" 
                    />
                    <div className="flex-1">
                        <p className="font-bold text-gray-800">{contrato.servico}</p>
                        <p className="text-sm text-gray-500">por {contrato.prestador || 'Prestador'}</p>
                        <div className="flex justify-between items-center mt-1">
                            <p className="text-sm text-gray-600">Data: {formatters.formatarData ? formatters.formatarData(contrato.data) : contrato.data}</p>
                            <p className="text-sm text-purple-700 font-bold">{formatters.formatarMoeda ? formatters.formatarMoeda(contrato.valor) : `R$ ${contrato.valor}`}</p>
                        </div>
                    </div>
                </div>
                
                {/* Botões de Ação */}
                <div className="grid grid-cols-2 gap-2">
                    <button className="text-center py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg font-semibold text-xs col-span-1 transition-colors">
                        Chat
                    </button>
                    {/* Link para pagamento passando dados via state */}
                    <Link 
                        to="/pagamento" 
                        state={{ 
                            eventoData: { 
                                servico: contrato.servico, 
                                evento: contrato.evento, 
                                data: contrato.data, 
                                total: contrato.valor 
                            } 
                        }}
                        className="text-center py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg font-semibold text-xs col-span-1 transition-colors shadow-sm shadow-purple-200"
                    >
                        Pagar / Detalhes
                    </Link>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      <BottomNavigation />
    </div>
  );
}

export default ContratosPage;