// src/pages/PerfilUsuarioPage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  User, 
  Star, 
  Settings, 
  Eye, 
  CreditCard, 
  FileText, 
  Heart,
  Clipboard,
  LogOut
} from 'lucide-react';

function PerfilUsuarioPage() {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <User className="menu-icon" />,
      title: 'Perfil',
      description: 'Detalhes do meu perfil',
      link: '/meu-perfil'
    },
    {
      icon: <Star className="menu-icon" />,
      title: 'Avaliações',
      description: 'Visualizar todas as avaliações recebidas',
      link: '/avaliacoes'
    },
    {
      icon: <Settings className="menu-icon" />,
      title: 'Configurações',
      description: 'Ajustar configurações do aplicativo',
      link: '/configuracoes'
    },
    {
      icon: <Eye className="menu-icon" />,
      title: 'Acessibilidade',
      description: 'Ajustar configurações de acessibilidade',
      link: '/acessibilidade'
    },
    {
      icon: <CreditCard className="menu-icon" />,
      title: 'Pagamentos',
      description: 'Meus saldos e cartões',
      link: '/pagamento'
    },
    {
      icon: <FileText className="menu-icon" />,
      title: 'Termos e Condições',
      description: 'Visualizar termos e condições',
      link: '/termos'
    },
    {
      icon: <Heart className="menu-icon" />,
      title: 'Favoritos',
      description: 'Visualizar meus serviços favoritos',
      link: '/favoritos'
    },
    {
      icon: <Clipboard className="menu-icon" />,
      title: 'Meus Contratos',
      description: 'Visualizar meu histórico de contratos',
      link: '/contratos'
    }
  ];

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      // Aqui você implementaria a lógica de logout
      navigate('/');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
      
      {/* Mobile Header */}
      <header className="flex lg:hidden justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition">
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Configurações</h1>
        <div className="text-2xl">🎉</div>
      </header>

      {/* Desktop Header */}
      <div className="hidden lg:block mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Meu Perfil e Configurações</h1>
        <p className="text-gray-600">Gerencie suas informações e preferências</p>
      </div>

      <div className="space-y-6">
        
        {/* Card de Perfil */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <img 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-purple-100 shadow-lg" 
              src="https://images.unsplash.com/photo-1507003211169-0a6dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
              alt="Joaquim da Silva"
            />
            
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-2">Joaquim da Silva</h2>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                <div className="flex items-center bg-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
                  <Star className="h-4 w-4 fill-white mr-1" />
                  <span>4.6</span>
                </div>
                <span className="text-sm text-gray-600">42 avaliações</span>
              </div>
              <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm hover:underline">
                Editar Perfil
              </button>
            </div>

            {/* Desktop: Botão de Sair */}
            <button 
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition"
            >
              <LogOut className="h-5 w-5" />
              Sair
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-xl shadow-sm border border-purple-100 divide-y divide-purple-100">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex items-center p-4 sm:p-5 hover:bg-purple-50 transition-colors group"
            >
              <div className="text-purple-800 group-hover:text-purple-900 mr-4 flex-shrink-0">
                {React.cloneElement(item.icon, { 
                  className: 'h-7 w-7 sm:h-8 sm:w-8' 
                })}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-base sm:text-lg font-bold text-purple-900 group-hover:text-purple-700">
                  {item.title}
                </p>
                <p className="text-sm text-purple-600 font-medium mt-0.5">
                  {item.description}
                </p>
              </div>

              <svg 
                className="h-5 w-5 text-gray-400 group-hover:text-purple-600 flex-shrink-0 ml-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Botão de Sair - Mobile */}
        <button 
          onClick={handleLogout}
          className="sm:hidden w-full py-4 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transition duration-150 flex items-center justify-center gap-2"
        >
          <LogOut className="h-5 w-5" />
          Sair
        </button>

        {/* Desktop: Info adicional */}
        <div className="hidden lg:block bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">ℹ️</div>
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Sobre sua conta</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Membro desde Janeiro de 2024</li>
                <li>• 5 eventos organizados</li>
                <li>• 12 contratos realizados</li>
                <li>• Conta verificada ✓</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Versão do App */}
        <div className="text-center text-sm text-gray-500 py-4">
          <p>EventConnect v2.0.0</p>
          <p className="text-xs mt-1">© 2025 - Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
}

export default PerfilUsuarioPage;