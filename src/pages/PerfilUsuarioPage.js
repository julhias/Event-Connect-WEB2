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
  LogOut,
  ChevronRight,
  Shield
} from 'lucide-react';

function PerfilUsuarioPage() {
  const navigate = useNavigate();

  const menuItems = [
    {
      section: "Conta",
      items: [
        {
          icon: <User className="w-5 h-5" />,
          title: 'Meu Perfil',
          description: 'Dados pessoais e contato',
          link: '/meu-perfil',
          color: 'text-purple-600 bg-purple-50'
        },
        {
          icon: <CreditCard className="w-5 h-5" />,
          title: 'Pagamentos',
          description: 'Cartões e histórico',
          link: '/pagamento',
          color: 'text-blue-600 bg-blue-50'
        },
        {
          icon: <Clipboard className="w-5 h-5" />,
          title: 'Meus Contratos',
          description: 'Histórico de serviços',
          link: '/contratos',
          color: 'text-orange-600 bg-orange-50'
        }
      ]
    },
    {
      section: "Preferências",
      items: [
        {
          icon: <Settings className="w-5 h-5" />,
          title: 'Configurações',
          description: 'Notificações e privacidade',
          link: '/configuracoes',
          color: 'text-gray-600 bg-gray-100'
        },
        {
          icon: <Eye className="w-5 h-5" />,
          title: 'Acessibilidade',
          description: 'Ajustes de visualização',
          link: '/acessibilidade',
          color: 'text-green-600 bg-green-50'
        },
        {
          icon: <Heart className="w-5 h-5" />,
          title: 'Favoritos',
          description: 'Serviços salvos',
          link: '/favoritos',
          color: 'text-red-600 bg-red-50'
        }
      ]
    },
    {
      section: "Suporte",
      items: [
        {
          icon: <Star className="w-5 h-5" />,
          title: 'Minhas Avaliações',
          description: 'Comentários enviados',
          link: '/avaliacoes',
          color: 'text-yellow-600 bg-yellow-50'
        },
        {
          icon: <FileText className="w-5 h-5" />,
          title: 'Termos e Condições',
          description: 'Regras de uso',
          link: '/termos',
          color: 'text-gray-600 bg-gray-100'
        }
      ]
    }
  ];

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      // Lógica de logout aqui
      navigate('/');
    }
  };

  return (
    <div className="bg-purple-50 min-h-screen font-sans pb-12">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 space-y-6">
        
        {/* --- HEADER --- */}
        <header className="flex items-center justify-between mb-4 lg:mb-8">
          <div className="flex items-center gap-3">
             <button 
                onClick={() => navigate(-1)} 
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition lg:hidden text-gray-600"
             >
                <ChevronLeft className="h-5 w-5" />
             </button>
             <div>
                <h1 className="text-xl lg:text-3xl font-bold text-gray-800">Minha Conta</h1>
                <p className="hidden lg:block text-gray-500 text-sm">Gerencie suas preferências e dados</p>
             </div>
          </div>
          <div className="lg:hidden text-2xl">⚙️</div>
        </header>

        {/* --- LAYOUT GRID (Desktop) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            
            {/* COLUNA ESQUERDA: Card de Perfil */}
            <div className="lg:col-span-1 space-y-6">
                
                <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden relative group">
                    <div className="h-20 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
                    <div className="px-6 pb-6 relative">
                        <div className="relative -mt-10 mb-3 flex justify-center lg:justify-start">
                            <img 
                                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-white shadow-md" 
                                src="https://images.unsplash.com/photo-1507003211169-0a6dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                                alt="Perfil"
                            />
                        </div>
                        
                        <div className="text-center lg:text-left">
                            <h2 className="text-xl font-bold text-gray-900">Joaquim da Silva</h2>
                            <p className="text-gray-500 text-sm mb-3">joaquim.silva@email.com</p>
                            
                            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                                <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2.5 py-0.5 rounded-lg text-xs font-bold border border-yellow-100">
                                    <Star className="w-3 h-3 fill-current" /> 4.6
                                </span>
                                <span className="flex items-center gap-1 bg-green-50 text-green-700 px-2.5 py-0.5 rounded-lg text-xs font-bold border border-green-100">
                                    <Shield className="w-3 h-3" /> Verificado
                                </span>
                            </div>

                            <button 
                                onClick={() => navigate('/meu-perfil')}
                                className="w-full py-2.5 bg-purple-50 text-purple-700 font-semibold rounded-xl hover:bg-purple-100 transition-colors text-sm"
                            >
                                Editar Perfil
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info Box (Desktop Only) */}
                <div className="hidden lg:block bg-blue-50 border border-blue-100 rounded-2xl p-5">
                    <div className="flex items-start gap-3">
                        <div className="text-2xl">ℹ️</div>
                        <div>
                            <h3 className="font-bold text-blue-900 mb-1 text-sm">Resumo da Conta</h3>
                            <ul className="text-xs text-blue-800 space-y-1">
                                <li>• Membro desde Jan/2024</li>
                                <li>• 12 contratos realizados</li>
                                <li>• Plano Gratuito</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            {/* COLUNA DIREITA: Menu */}
            <div className="lg:col-span-2 space-y-6">
                
                {menuItems.map((section, idx) => (
                    <div key={idx}>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">
                            {section.section}
                        </h3>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50 overflow-hidden">
                            {section.items.map((item, i) => (
                                <Link
                                    key={i}
                                    to={item.link}
                                    className="flex items-center p-4 hover:bg-gray-50 transition-colors group"
                                >
                                    <div className={`p-2.5 rounded-xl mr-4 ${item.color} group-hover:scale-110 transition-transform`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-800 text-sm lg:text-base group-hover:text-purple-700 transition-colors">
                                            {item.title}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {item.description}
                                        </p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-purple-400 transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Botão Sair */}
                <button 
                    onClick={handleLogout}
                    className="w-full bg-white border border-red-100 text-red-600 font-bold p-4 rounded-2xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                    <LogOut className="w-5 h-5" />
                    Sair da Conta
                </button>

                <div className="text-center pt-4 pb-8">
                    <p className="text-xs text-gray-400 font-medium">EventConnect v2.0.0</p>
                    <p className="text-[10px] text-gray-300 mt-1">© 2025 Todos os direitos reservados</p>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
}

export default PerfilUsuarioPage;