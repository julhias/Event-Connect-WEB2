// src/pages/PagamentoPage.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  CreditCard, 
  QrCode, 
  FileText, 
  CheckCircle, 
  ShieldCheck, 
  Lock 
} from 'lucide-react';

const PagamentoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Dados recebidos da navegação (ou mock para teste direto)
  const eventoData = location.state?.eventoData || {
    servico: 'Garçom Profissional',
    evento: 'Casamento Silva & Souza',
    data: '15/12/2024',
    total: '200,00'
  };

  // Estado para método de pagamento
  const [metodoPagamento, setMetodoPagamento] = useState('cartao');
  const [loading, setLoading] = useState(false);
  
  // Estado para dados do cartão
  const [dadosCartao, setDadosCartao] = useState({
    numero: '',
    validade: '',
    cvv: '',
    nome: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDadosCartao(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMetodoChange = (metodo) => {
    setMetodoPagamento(metodo);
  };

  const confirmarPagamento = async () => {
    // Validação para o cartão
    if (metodoPagamento === 'cartao' && (!dadosCartao.numero || !dadosCartao.validade || !dadosCartao.cvv || !dadosCartao.nome)) {
      alert('Preencha todos os dados do cartão!');
      return;
    }
    
    // Simulação de chamada HTTP (Requisito R5)
    try {
      setLoading(true);
      console.log('Simulando pagamento...');
      
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', { // API pública fake
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          servico: 'pagamento_simulacao',
          metodo: metodoPagamento,
          valor: eventoData.total,
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) throw new Error('Erro na simulação!');

      const resultado = await response.json();
      console.log('Resposta da API fake:', resultado);
      
      // Delay visual para parecer processamento real
      setTimeout(() => {
          setLoading(false);
          alert(`✅ Pagamento de R$ ${eventoData.total} confirmado!\nMétodo: ${metodoPagamento.toUpperCase()}`);
          navigate('/contratos');
      }, 1500);
      
    } catch (error) {
      console.error('Erro na simulação:', error);
      setLoading(false);
      alert('Pagamento simulado com sucesso! (modo offline)');
      navigate('/contratos');
    }
  };

  // Formatadores visuais
  const formatarNumeroCartao = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatarValidade = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    return v.length >= 2 ? `${v.substring(0, 2)}/${v.substring(2, 4)}` : v;
  };

  return (
    <div className="min-h-screen bg-purple-50 p-4 font-sans pb-12">
      
      {/* CABEÇALHO FIXO */}
      <header className="bg-white rounded-2xl shadow-sm p-4 mb-6 sticky top-4 z-20 flex items-center justify-between border border-purple-100">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors text-gray-600"
          aria-label="Voltar"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <div className="text-center">
          <h1 className="text-lg lg:text-xl font-bold text-gray-800">Finalizar Pagamento</h1>
          <p className="text-xs text-purple-600 font-semibold">Ambiente Seguro</p>
        </div>
        
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
          <Lock className="h-5 w-5" />
        </div>
      </header>

      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* RESUMO DO PEDIDO */}
        <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3 text-green-600">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h2 className="text-lg lg:text-xl font-bold text-gray-800">Resumo do Pedido</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start py-3 border-b border-gray-100">
              <div>
                <p className="font-bold text-gray-800 text-lg">{eventoData.servico}</p>
                <p className="text-sm text-gray-500">{eventoData.evento}</p>
              </div>
              <span className="text-gray-500 text-sm font-medium bg-gray-100 px-2 py-1 rounded-md">{eventoData.data}</span>
            </div>
            
            <div className="flex justify-between items-end pt-2">
              <span className="text-base text-gray-600 font-medium">Total a pagar</span>
              <div className="text-right">
                <span className="text-3xl font-bold text-green-600">R$ {eventoData.total}</span>
                <p className="text-xs text-gray-400 mt-1">Taxas inclusas</p>
              </div>
            </div>
          </div>
        </div>

        {/* FORMAS DE PAGAMENTO */}
        <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-6">Escolha como pagar</h2>
          
          <div className="space-y-4">
            
            {/* OPÇÃO: CARTÃO DE CRÉDITO */}
            <div 
                onClick={() => handleMetodoChange('cartao')}
                className={`border-2 rounded-xl p-4 transition-all cursor-pointer ${metodoPagamento === 'cartao' ? 'border-purple-600 bg-purple-50/50' : 'border-gray-200 hover:border-purple-300'}`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${metodoPagamento === 'cartao' ? 'border-purple-600' : 'border-gray-300'}`}>
                    {metodoPagamento === 'cartao' && <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 text-blue-600">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-bold text-gray-800 block">Cartão de Crédito</span>
                  <p className="text-xs text-gray-500">Pague em até 12x sem juros</p>
                </div>
              </div>
              
              {/* Formulário do Cartão (Expandido) */}
              {metodoPagamento === 'cartao' && (
                <div className="mt-5 pt-4 border-t border-purple-200 space-y-4 animate-in fade-in slide-in-from-top-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Número do Cartão</label>
                    <div className="relative">
                        <input 
                        type="text" 
                        placeholder="0000 0000 0000 0000"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all font-mono"
                        value={formatarNumeroCartao(dadosCartao.numero)}
                        onChange={(e) => setDadosCartao({...dadosCartao, numero: e.target.value})}
                        maxLength="19"
                        />
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Validade</label>
                      <input 
                        type="text" 
                        placeholder="MM/AA"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-center"
                        value={formatarValidade(dadosCartao.validade)}
                        onChange={(e) => setDadosCartao({...dadosCartao, validade: e.target.value})}
                        maxLength="5"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">CVV</label>
                      <input 
                        type="password" 
                        placeholder="123"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-center"
                        value={dadosCartao.cvv}
                        onChange={handleInputChange}
                        maxLength="4"
                        name="cvv"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Nome no Cartão</label>
                    <input 
                      type="text" 
                      placeholder="COMO ESTÁ NO CARTÃO"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all uppercase"
                      value={dadosCartao.nome}
                      onChange={handleInputChange}
                      name="nome"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* OPÇÃO: PIX */}
            <div 
                onClick={() => handleMetodoChange('pix')}
                className={`border-2 rounded-xl p-4 transition-all cursor-pointer ${metodoPagamento === 'pix' ? 'border-purple-600 bg-purple-50/50' : 'border-gray-200 hover:border-purple-300'}`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${metodoPagamento === 'pix' ? 'border-purple-600' : 'border-gray-300'}`}>
                    {metodoPagamento === 'pix' && <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3 text-green-600">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-bold text-gray-800 block">PIX</span>
                  <p className="text-xs text-gray-500">Pagamento instantâneo (Aprovação imediata)</p>
                </div>
              </div>
              
              {metodoPagamento === 'pix' && (
                <div className="mt-4 p-6 bg-white border border-gray-200 rounded-xl flex flex-col items-center text-center animate-in fade-in slide-in-from-top-2">
                    <div className="p-2 bg-white shadow-sm border border-gray-100 rounded-lg mb-3">
                        <QrCode className="w-32 h-32 text-gray-800" />
                    </div>
                    <p className="text-sm font-bold text-gray-700">QR Code Simulado</p>
                    <p className="text-xs text-gray-500 mt-1">Valor: R$ {eventoData.total}</p>
                </div>
              )}
            </div>

            {/* OPÇÃO: BOLETO */}
            <div 
                onClick={() => handleMetodoChange('boleto')}
                className={`border-2 rounded-xl p-4 transition-all cursor-pointer ${metodoPagamento === 'boleto' ? 'border-purple-600 bg-purple-50/50' : 'border-gray-200 hover:border-purple-300'}`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${metodoPagamento === 'boleto' ? 'border-purple-600' : 'border-gray-300'}`}>
                    {metodoPagamento === 'boleto' && <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3 text-yellow-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-bold text-gray-800 block">Boleto Bancário</span>
                  <p className="text-xs text-gray-500">Vencimento em 3 dias úteis</p>
                </div>
              </div>
              
              {metodoPagamento === 'boleto' && (
                <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-xl text-sm animate-in fade-in slide-in-from-top-2 flex items-start gap-3">
                    <FileText className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="font-bold mb-1">Atenção ao vencimento</p>
                        <p className="opacity-90">O boleto será enviado para seu e-mail cadastrado. A compensação pode levar até 72 horas.</p>
                    </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BOTÃO CONFIRMAR */}
        <button 
          onClick={confirmarPagamento} 
          disabled={loading || (metodoPagamento === 'cartao' && (!dadosCartao.numero || !dadosCartao.validade || !dadosCartao.cvv || !dadosCartao.nome))}
          className={`
            w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2
            ${loading || (metodoPagamento === 'cartao' && (!dadosCartao.numero || !dadosCartao.validade || !dadosCartao.cvv || !dadosCartao.nome))
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-xl hover:-translate-y-0.5'
            }
          `}
        >
          {loading ? (
             <>
               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
               Processando...
             </>
          ) : (
             <>
               {metodoPagamento === 'cartao' ? 'Pagar com Cartão' : metodoPagamento === 'pix' ? 'Gerar PIX' : 'Gerar Boleto'}
             </>
          )}
        </button>

        {/* FOOTER SEGURANÇA */}
        <div className="flex justify-center items-center gap-6 text-gray-400 text-xs font-medium uppercase tracking-wide">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-500" /> Ambiente Seguro</span>
            <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-green-500" /> Dados Criptografados</span>
        </div>

      </div>
    </div>
  );
};

export default PagamentoPage;