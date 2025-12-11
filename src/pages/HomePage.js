// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const cards = [
    {
      title: 'Pagamento',
      icon: '💳',
      description: 'Simulação completa de pagamento com múltiplos métodos (cartão, PIX, boleto)',
      color: 'purple',
      link: '/pagamento'
    },
    {
      title: 'Prestadores',
      icon: '👥',
      description: 'Encontre os melhores profissionais para o seu evento',
      color: 'blue',
      link: '/prestadores'
    },
    {
      title: 'Geolocalização',
      icon: '📍',
      description: 'Encontre prestadores próximos a você usando geolocalização',
      color: 'green',
      link: '/geolocation'
    },
    {
      title: 'Eventos',
      icon: '📅',
      description: 'Gerencie todos os seus eventos em um só lugar',
      color: 'yellow',
      link: '/eventos'
    },
    {
      title: 'Contratos',
      icon: '📝',
      description: 'Acompanhe e gerencie seus contratos de serviços',
      color: 'orange',
      link: '/contratos'
    },
    {
      title: 'Sobre o Projeto',
      icon: '🚀',
      description: 'Aplicativo web para conexão entre clientes e prestadores de serviços para eventos',
      color: 'gray',
      link: '#',
      isInfo: true
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      purple: 'border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700',
      blue: 'border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700',
      green: 'border-green-200 bg-green-50 hover:bg-green-100 text-green-700',
      yellow: 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100 text-yellow-700',
      orange: 'border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-700',
      gray: 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700'
    };
    return colors[color] || colors.gray;
  };

  const getButtonClasses = (color) => {
    const colors = {
      purple: 'bg-purple-600 hover:bg-purple-700',
      blue: 'bg-blue-600 hover:bg-blue-700',
      green: 'bg-green-600 hover:bg-green-700',
      yellow: 'bg-yellow-600 hover:bg-yellow-700',
      orange: 'bg-orange-600 hover:bg-orange-700',
      gray: 'bg-gray-600 hover:bg-gray-700'
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
      
      {/* Hero Section - Mobile only */}
      <div className="lg:hidden mb-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-purple-700 mb-2">EventConnect</h1>
        <p className="text-gray-600">Sistema completo para gestão de eventos e serviços</p>
      </div>

      {/* Hero Section - Desktop */}
      <div className="hidden lg:block mb-12">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-12 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Bem-vindo ao EventConnect</h1>
              <p className="text-lg text-purple-100 mb-6 max-w-2xl">
                Sistema completo para gestão de eventos e serviços. Conecte-se com os melhores profissionais e organize eventos incríveis.
              </p>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>React + Tailwind CSS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>APIs integradas</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>Layout responsivo</span>
                </div>
              </div>
            </div>
            <div className="text-8xl hidden xl:block">🎉</div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`
              border rounded-xl p-6 transition-all duration-200 hover:shadow-lg
              ${getColorClasses(card.color)}
            `}
          >
            <div className="text-4xl mb-4">{card.icon}</div>
            <h2 className="text-xl font-bold mb-3">{card.title}</h2>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed min-h-[60px]">
              {card.description}
            </p>
            
            {card.isInfo ? (
              <div className="text-xs text-gray-500 space-y-1">
                <p>• React com Tailwind CSS</p>
                <p>• Múltiplas APIs integradas</p>
                <p>• Layout totalmente responsivo</p>
              </div>
            ) : (
              <Link
                to={card.link}
                className={`
                  inline-block w-full text-center text-white px-4 py-3 rounded-lg
                  font-semibold transition-colors duration-200 shadow-sm
                  ${getButtonClasses(card.color)}
                `}
              >
                Acessar
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Stats Section - Desktop only */}
      <div className="hidden lg:grid grid-cols-3 gap-6 mt-12">
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
          <div className="text-3xl font-bold text-purple-700 mb-2">500+</div>
          <div className="text-gray-600">Prestadores Cadastrados</div>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
          <div className="text-3xl font-bold text-purple-700 mb-2">1,200+</div>
          <div className="text-gray-600">Eventos Realizados</div>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
          <div className="text-3xl font-bold text-purple-700 mb-2">98%</div>
          <div className="text-gray-600">Satisfação dos Clientes</div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;