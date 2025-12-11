// src/pages/ContratosPage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ContratoService from '../services/ContratoService';
import BottomNavigation from '../components/layout/BottomNavigation';
import { formatters } from '../utils/formatters';
import { 
  FileText, 
  Plus, 
  MessageCircle, 
  CreditCard, 
  ChevronLeft, 
  Filter,
  Search,
  MoreVertical
} from 'lucide-react';

function ContratosPage() {
  const navigate = useNavigate();

  // --- LÓGICA DE ESTADO ---
  const [contratos, setContratos] = useState([]);
  const [servico, setServico] = useState('');
  const [valor, setValor] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estado das abas
  const [activeTab, setActiveTab] = useState('ativos'); // 'ativos', 'negociando', 'concluidos'

  async function carregarContratos() {
    try {
      setLoading(true);
      const dados = await ContratoService.getAll();
      setContratos(dados);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarContratos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!servico || !valor) return;

    setError(null);
    try {
      const novoContrato = {
        servico: servico,
        valor: parseFloat(valor),
        // Mock data
        prestadorId: Math.floor(Math.random() * 100),
        prestador: "Prestador Teste",
        eventoId: 1,
        evento: "Festa de Aniversário",
        data: new Date().toISOString().split('T')[0],
        descricao: "Contrato gerado automaticamente.",
        status: 'negociando' 
      };
      
      await ContratoService.create(novoContrato);
      
      // Limpa form e recarrega
      setServico('');
      setValor('');
      await carregarContratos();
      setActiveTab('negociando'); // Vai para a aba do novo item
      alert('Contrato criado com sucesso!');

    } catch (err) {
      setError(err.message);
    }
  };

  // --- FILTROS ---
  const contratosFiltrados = contratos.filter(c => {
    const status = c.status || 'ativos'; 
    return status.toLowerCase() === activeTab;
  });

  // Estilos das abas (Pills)
  const getTabClass = (tabName) => {
    const baseClass = "flex-1 sm:flex-none text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all border text-center ";
    if (activeTab === tabName) {
      return baseClass + "bg-purple-600 text-white border-purple-600 shadow-md transform scale-105";
    }
    return baseClass + "bg-white text-gray-500 border-gray-200 hover:bg-purple-50 hover:text-purple-600";
  };

  return (
    <div className="bg-purple-50 text-gray-800 flex flex-col min-h-screen font-sans">
      
      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-6 pb-24 lg:pb-8">
        
        {/* Header Responsivo */}
        <header className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate(-1)} 
                  className="lg:hidden w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-600"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Contratos</h1>
                    <p className="text-xs lg:text-sm text-gray-500">Gerencie suas negociações e pagamentos</p>
                </div>
            </div>
            <div className="hidden lg:block bg-purple-100 p-2 rounded-full">
                <FileText className="h-6 w-6 text-purple-600" />
            </div>
        </header>

        {/* Card de Criação Rápida (Estilo Dashboard) */}
        <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden">
            <div className="bg-purple-50 px-6 py-3 border-b border-purple-100 flex justify-between items-center">
                <h3 className="text-sm font-bold text-purple-800 flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Novo Contrato Rápido
                </h3>
            </div>
            <div className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="w-full flex-1 space-y-1">
                        <label className="text-xs font-semibold text-gray-500 ml-1">Nome do Serviço</label>
                        <input 
                            type="text" 
                            placeholder="Ex: Fotógrafo, DJ..." 
                            value={servico}
                            onChange={(e) => setServico(e.target.value)}
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                    </div>
                    <div className="w-full sm:w-40 space-y-1">
                        <label className="text-xs font-semibold text-gray-500 ml-1">Valor (R$)</label>
                        <input 
                            type="number" 
                            placeholder="0,00" 
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Plus className="h-5 w-5" />
                        <span className="sm:inline">Criar</span>
                    </button>
                </form>
            </div>
        </div>

        {/* Abas de Filtro */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex w-full sm:w-auto gap-2 p-1 bg-gray-100/80 rounded-full backdrop-blur-sm">
                <button onClick={() => setActiveTab('ativos')} className={getTabClass('ativos')}>Ativos</button>
                <button onClick={() => setActiveTab('negociando')} className={getTabClass('negociando')}>Negociando</button>
                <button onClick={() => setActiveTab('concluidos')} className={getTabClass('concluidos')}>Concluídos</button>
            </div>
            
            {/* Contador (Desktop Only) */}
            <span className="hidden sm:block text-sm text-gray-500 font-medium">
                Mostrando {contratosFiltrados.length} contratos
            </span>
        </div>

        {/* Lista de Cards */}
        <div className="space-y-4">
          {loading ? (
             <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
             </div>
          ) : contratosFiltrados.length === 0 ? (
             <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                 <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                 </div>
                 <h3 className="text-lg font-bold text-gray-700">Nenhum contrato encontrado</h3>
                 <p className="text-gray-500 text-sm">Não há contratos na aba "{activeTab}".</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contratosFiltrados.map(contrato => (
                <div key={contrato.id} className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                  
                  {/* Cabeçalho do Card */}
                  <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                          <img 
                              className="w-12 h-12 rounded-full object-cover border-2 border-purple-100 group-hover:border-purple-300 transition-colors" 
                              src={`https://i.pravatar.cc/150?u=${contrato.id + 50}`} // Seed diferente para variar
                              alt="Prestador" 
                          />
                          <div>
                              <h4 className="font-bold text-gray-900 leading-tight">{contrato.servico}</h4>
                              <p className="text-xs text-gray-500 mt-0.5">com {contrato.prestador}</p>
                          </div>
                      </div>
                      <button className="text-gray-400 hover:text-purple-600">
                          <MoreVertical className="h-5 w-5" />
                      </button>
                  </div>

                  {/* Detalhes do Contrato */}
                  <div className="bg-gray-50 rounded-xl p-3 mb-4 space-y-2">
                      <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Data</span>
                          <span className="font-medium text-gray-700">
                            {formatters.formatarData ? formatters.formatarData(contrato.data) : contrato.data}
                          </span>
                      </div>
                      <div className="flex justify-between text-sm items-center">
                          <span className="text-gray-500">Valor Total</span>
                          <span className="font-bold text-purple-700 text-base">
                            {formatters.formatarMoeda ? formatters.formatarMoeda(contrato.valor) : `R$ ${contrato.valor}`}
                          </span>
                      </div>
                  </div>
                  
                  {/* Botões de Ação */}
                  <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-purple-600 rounded-xl font-semibold text-sm transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          Chat
                      </button>

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
                          className="flex items-center justify-center gap-2 py-2.5 bg-purple-600 text-white hover:bg-purple-700 rounded-xl font-semibold text-sm transition-colors shadow-sm shadow-purple-200"
                      >
                          <CreditCard className="h-4 w-4" />
                          Pagar
                      </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Navegação Inferior - Só aparece no Mobile */}
      <div className="lg:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
}

export default ContratosPage;