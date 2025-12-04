import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/PagamentoPage.css';

const PagamentoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  //dados recebidos da navegação (se tiver!!!)
  const eventoData = location.state?.eventoData || {
    servico: 'Garçom Profissional',
    evento: 'Casamento Silva & Souza',
    data: '15/12/2024',
    total: '200,00'
  };

  //estado para método de pagamento
  const [metodoPagamento, setMetodoPagamento] = useState('cartao');
  
  //estado para dados do cartão
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
    //validação para o cartão
    if (metodoPagamento === 'cartao' && (!dadosCartao.numero || !dadosCartao.validade || !dadosCartao.cvv || !dadosCartao.nome)) {
      alert('Preencha todos os dados do cartão!');
      return;
    }
    
    //simulação de chamada http (requisito 5!!!)
    try {
      console.log('Simulando pagamento...');
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', { //api pública fake
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

      if (!response.ok) throw new Error('Erro na simulação!!!');

      const resultado = await response.json();
      console.log('Resposta da api fake:', resultado);
      
      alert(`✅ Pagamento de R$ ${eventoData.total} confirmado!\nMétodo: ${metodoPagamento.toUpperCase()}`);
      navigate('/contratos');
      
    } catch (error) {
      console.error('Erro na simulação:', error);
      alert('Pagamento simulado com sucesso! (modo offline)');
      navigate('/contratos');
    }
  };

  //formatar o número do cartão!!!
  const formatarNumeroCartao = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  //formatar a validade do cartão!!!
  const formatarValidade = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      {/* cabeçalho fixo */}
      <header className="bg-white rounded-2xl shadow-lg p-4 mb-6 sticky top-4 z-10">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Voltar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Finalizar Pagamento</h1>
            <p className="text-sm text-gray-500">EventConnect</p>
          </div>
          
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-xl">💳</span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* resumo do Pedido */}
        <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-transform hover:scale-[1.01]">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Resumo do Pedido</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-700">{eventoData.servico}</p>
                <p className="text-sm text-gray-500">{eventoData.evento}</p>
              </div>
              <span className="text-gray-600">{eventoData.data}</span>
            </div>
            
            <div className="flex justify-between items-center pt-4">
              <span className="text-lg font-semibold text-gray-800">Total</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-green-600">R$ {eventoData.total}</span>
                <p className="text-sm text-gray-500">Valor já com taxas incluídas</p>
              </div>
            </div>
          </div>
        </div>

        {/* formas de pagamento */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Escolha sua forma de pagamento</h2>
          
          <div className="space-y-4">
            {/* cartão de crédito */}
            <div className={`border-2 rounded-xl p-4 transition-all ${metodoPagamento === 'cartao' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="pagamento" 
                  checked={metodoPagamento === 'cartao'}
                  onChange={() => handleMetodoChange('cartao')}
                  className="h-5 w-5 text-purple-600"
                />
                <div className="ml-3 flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-lg">💳</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Cartão de Crédito</span>
                    <p className="text-sm text-gray-500">Pague em até 12x</p>
                  </div>
                </div>
              </label>
              
              {metodoPagamento === 'cartao' && (
                <div className="mt-4 space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Número do Cartão</label>
                    <input 
                      type="text" 
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={formatarNumeroCartao(dadosCartao.numero)}
                      onChange={(e) => setDadosCartao({...dadosCartao, numero: e.target.value})}
                      maxLength="19"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Validade</label>
                      <input 
                        type="text" 
                        placeholder="MM/AA"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={formatarValidade(dadosCartao.validade)}
                        onChange={(e) => setDadosCartao({...dadosCartao, validade: e.target.value})}
                        maxLength="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input 
                        type="password" 
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={dadosCartao.cvv}
                        onChange={handleInputChange}
                        maxLength="4"
                        name="cvv"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome no Cartão</label>
                    <input 
                      type="text" 
                      placeholder="JOÃO DA SILVA"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent uppercase"
                      value={dadosCartao.nome}
                      onChange={handleInputChange}
                      name="nome"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* pix */}
            <div className={`border-2 rounded-xl p-4 transition-all ${metodoPagamento === 'pix' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="pagamento" 
                  checked={metodoPagamento === 'pix'}
                  onChange={() => handleMetodoChange('pix')}
                  className="h-5 w-5 text-purple-600"
                />
                <div className="ml-3 flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-lg">🧾</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">PIX</span>
                    <p className="text-sm text-gray-500">Pagamento instantâneo</p>
                  </div>
                </div>
              </label>
              
              {metodoPagamento === 'pix' && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg animate-fadeIn">
                  <div className="text-center">
                    <div className="inline-block p-4 bg-white rounded-xl shadow-md">
                      <div className="w-48 h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex flex-col items-center justify-center">
                        <div className="text-4xl mb-2">🧾</div>
                        <p className="text-sm font-medium text-gray-700">QR Code PIX</p>
                        <p className="text-xs text-gray-500 mt-1">Valor: R$ {eventoData.total}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      Escaneie o código com seu app de pagamento
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* boleto */}
            <div className={`border-2 rounded-xl p-4 transition-all ${metodoPagamento === 'boleto' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="pagamento" 
                  checked={metodoPagamento === 'boleto'}
                  onChange={() => handleMetodoChange('boleto')}
                  className="h-5 w-5 text-purple-600"
                />
                <div className="ml-3 flex items-center">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-lg">📄</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Boleto Bancário</span>
                    <p className="text-sm text-gray-500">Vencimento em 3 dias</p>
                  </div>
                </div>
              </label>
              
              {metodoPagamento === 'boleto' && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg animate-fadeIn">
                  <p className="text-sm text-gray-600">
                    📧 O boleto será enviado para seu e-mail e poderá ser pago em qualquer banco.
                  </p>
                  <div className="mt-3 flex items-center text-yellow-700">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Vencimento: 72 horas</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* botão de confirmação de pagamento */}
        <button 
          onClick={confirmarPagamento} 
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={metodoPagamento === 'cartao' && 
            (!dadosCartao.numero || !dadosCartao.validade || !dadosCartao.cvv || !dadosCartao.nome)}
        >
          {metodoPagamento === 'cartao' ? '💳 Pagar com Cartão' : 
           metodoPagamento === 'pix' ? '🧾 Gerar QR Code PIX' : 
           '📄 Gerar Boleto'}
        </button>

        {/* segurança */}
        <div className="text-center text-gray-500 text-sm">
          <div className="flex items-center justify-center space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Ambiente seguro
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Dados criptografados
            </span>
          </div>
        </div>
      </div>

      {/* navegação inferior simplificada (é apenas demostrativo!!!) */}
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Problemas com o pagamento? <a href="#" className="text-purple-600 hover:underline">Entre em contato</a>
        </p>
      </div>
    </div>
  );
};

export default PagamentoPage;