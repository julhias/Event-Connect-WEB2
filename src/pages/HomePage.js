import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Gift, 
  Heart, 
  Music, 
  GraduationCap, 
  Beer, 
  MoreHorizontal,
  Star,
  CheckCircle,
  Users,
  MapPin,
  Calendar,
  FileText,
  Rocket
} from 'lucide-react';

function HomePage() {
  // --- DADOS DO MENU ---
  const cards = [
    {
      title: 'Prestadores',
      icon: <Users className="h-6 w-6 lg:h-8 lg:w-8"/>, // Ajustado
      description: 'Encontre os melhores profissionais.',
      color: 'blue',
      link: '/prestadores'
    },
    {
      title: 'Geolocalização',
      icon: <MapPin className="h-6 w-6 lg:h-8 lg:w-8"/>,
      description: 'Prestadores próximos a você.',
      color: 'green',
      link: '/geolocation'
    },
    {
      title: 'Meus Eventos',
      icon: <Calendar className="h-6 w-6 lg:h-8 lg:w-8"/>,
      description: 'Gerencie seus eventos.',
      color: 'yellow',
      link: '/meus-eventos'
    },
    {
      title: 'Contratos',
      icon: <FileText className="h-6 w-6 lg:h-8 lg:w-8"/>,
      description: 'Gerencie seus contratos.',
      color: 'orange',
      link: '/contratos'
    },
    {
      title: 'Sobre',
      icon: <Rocket className="h-6 w-6 lg:h-8 lg:w-8"/>,
      description: 'Sobre o projeto EventConnect.',
      color: 'gray',
      link: '#',
      isInfo: true
    }
  ];

  // --- FUNÇÕES DE ESTILO ---
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

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 space-y-8">
      
      {/* 1. HEADER MOBILE E BUSCA */}
      <div className="space-y-4">
        {/* Título Mobile */}
        <div className="lg:hidden flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold text-purple-800">Olá, Contratante! 👋</h1>
                <p className="text-gray-600 text-sm">Vamos organizar sua festa?</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
                 <span className="text-2xl">🎉</span>
            </div>
        </div>

        {/* Barra de Busca */}
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-3 border border-purple-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm lg:text-base shadow-sm transition-all" 
                placeholder="Pesquisar serviços (ex: Buffet, DJ, Garçom...)" 
            />
        </div>
      </div>

      {/* Hero Section - Desktop (Tamanho Reduzido) */}
      <div className="hidden lg:block">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 lg:p-10 text-white shadow-xl flex justify-between items-center">
          <div>
            {/* Reduzi de text-6xl para text-3xl/4xl - Mais equilibrado */}
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">Bem-vindo ao EventConnect</h1>
            <p className="text-base lg:text-lg text-purple-100 max-w-2xl leading-relaxed">
              Sistema completo para gestão de eventos. Conecte-se com os melhores profissionais e faça sua festa acontecer.
            </p>
          </div>
          <div className="text-5xl lg:text-6xl animate-bounce">🎉</div>
        </div>
      </div>

      {/* 2. SEÇÃO: CRIAR NOVO EVENTO */}
      <div>
        <div className="flex items-center justify-between mb-3 lg:mb-4">
             {/* Reduzi para text-xl no desktop */}
             <h2 className="text-lg lg:text-xl font-extrabold text-purple-900 tracking-tight">CRIAR NOVO EVENTO</h2>
             <span className="text-xs lg:text-sm font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">Comece aqui</span>
        </div>
        
        {/* Cards Grandes (Aniversário/Casamento) */}
        <div className="grid grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
            <Link to="/meus-eventos" className="bg-purple-100 border border-purple-300 rounded-xl p-6 lg:p-8 text-center hover:bg-purple-200 transition-colors group flex flex-col items-center justify-center gap-2 lg:gap-3">
                <div className="bg-white p-3 lg:p-4 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                    {/* Ícone levemente maior que mobile, mas não gigante */}
                    <Gift className="h-8 w-8 lg:h-10 lg:w-10 text-purple-600" />
                </div>
                {/* Fonte ajustada para lg */}
                <span className="font-bold text-purple-900 text-sm lg:text-lg">ANIVERSÁRIO</span>
            </Link>

            <Link to="/meus-eventos" className="bg-purple-100 border border-purple-300 rounded-xl p-6 lg:p-8 text-center hover:bg-purple-200 transition-colors group flex flex-col items-center justify-center gap-2 lg:gap-3">
                <div className="bg-white p-3 lg:p-4 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                    <Heart className="h-8 w-8 lg:h-10 lg:w-10 text-purple-600" />
                </div>
                <span className="font-bold text-purple-900 text-sm lg:text-lg">CASAMENTO</span>
            </Link>
        </div>

        {/* Pills (Categorias menores) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:gap-3">
            {[
                { label: 'BALADA', icon: <Music className="h-4 w-4 lg:h-5 lg:w-5"/> },
                { label: 'FORMATURA', icon: <GraduationCap className="h-4 w-4 lg:h-5 lg:w-5"/> },
                { label: 'HAPPY HOUR', icon: <Beer className="h-4 w-4 lg:h-5 lg:w-5"/> },
                { label: 'OUTRO', icon: <MoreHorizontal className="h-4 w-4 lg:h-5 lg:w-5"/> }
            ].map((cat, idx) => (
                <button key={idx} className="flex items-center justify-center gap-2 bg-gray-50 border border-purple-200 text-purple-700 font-semibold py-3 lg:py-3.5 rounded-xl hover:bg-purple-50 transition-colors text-xs sm:text-sm">
                    {cat.icon}
                    {cat.label}
                </button>
            ))}
        </div>
      </div>

      {/* 3. SEÇÃO: DESTAQUES / CONTRATAÇÕES SINGULARES */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Coluna 1: Profissionais em Destaque */}
          <div>
            <h2 className="text-base lg:text-lg font-extrabold text-purple-900 mb-4 uppercase">Profissionais em Destaque</h2>
            <div className="space-y-3">
                {/* Card 1 */}
                <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-3 lg:p-4 flex items-center gap-3 lg:gap-4 hover:shadow-md transition-shadow cursor-pointer">
                    <img className="w-20 h-20 lg:w-24 lg:h-24 rounded-lg object-cover" src="https://images.pexels.com/photos/1031958/pexels-photo-1031958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Buffet" />
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 lg:text-lg truncate">Buffet de Doces Finos</p>
                        <div className="flex items-center text-xs lg:text-sm text-purple-600 mb-1">
                            <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4 mr-1" /> Confiável
                        </div>
                        <p className="text-sm lg:text-base font-semibold text-purple-800">A partir de R$ 100,00</p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center justify-end text-yellow-500 font-bold mb-2 text-sm lg:text-base">
                            <Star className="h-4 w-4 fill-current mr-1" /> 4.8
                        </div>
                        <button className="bg-purple-100 text-purple-700 font-bold px-3 py-1 lg:px-4 lg:py-2 rounded-lg text-xs hover:bg-purple-200">
                            Ver
                        </button>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-3 lg:p-4 flex items-center gap-3 lg:gap-4 hover:shadow-md transition-shadow cursor-pointer">
                    <img className="w-20 h-20 lg:w-24 lg:h-24 rounded-lg object-cover" src="https://images.pexels.com/photos/16843641/pexels-photo-16843641/free-photo-of-palhaco-em-perfil-sorrindo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Animador" />
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 lg:text-lg truncate">Animador de Festas</p>
                        <div className="flex items-center text-xs lg:text-sm text-purple-600 mb-1">
                            <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4 mr-1" /> Verificado
                        </div>
                        <p className="text-sm lg:text-base font-semibold text-purple-800">R$ 200,00 /hora</p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center justify-end text-yellow-500 font-bold mb-2 text-sm lg:text-base">
                            <Star className="h-4 w-4 fill-current mr-1" /> 4.9
                        </div>
                        <button className="bg-purple-100 text-purple-700 font-bold px-3 py-1 lg:px-4 lg:py-2 rounded-lg text-xs hover:bg-purple-200">
                            Ver
                        </button>
                    </div>
                </div>
            </div>
          </div>

          {/* Coluna 2: Scroll Horizontal (Comidas) */}
          <div>
            <h2 className="text-base lg:text-lg font-extrabold text-purple-900 mb-4 uppercase">Populares: Comidas</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                {[
                    { name: 'Maria Doces', img: 'https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', rating: '4.8' },
                    { name: 'Bar Garagem', img: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', rating: '4.9' },
                    { name: 'Zé Salgados', img: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', rating: '4.8' }
                ].map((item, idx) => (
                    <div key={idx} className="flex-shrink-0 w-36 lg:w-48 bg-white rounded-xl shadow-sm border border-gray-100 p-2 lg:p-3 hover:shadow-md transition-all cursor-pointer">
                        <img className="w-full h-24 lg:h-32 object-cover rounded-lg mb-2" src={item.img} alt={item.name} />
                        <p className="font-bold text-gray-800 text-sm lg:text-base truncate">{item.name}</p>
                        <div className="flex items-center text-xs lg:text-sm text-purple-600 font-bold mt-1">
                            <Star className="h-3 w-3 fill-current mr-1" /> {item.rating}
                        </div>
                    </div>
                ))}
            </div>
          </div>

      </div>

      {/* 4. GRID ORIGINAL (Menu Rápido) */}
      <div>
        <h2 className="text-base lg:text-lg font-extrabold text-gray-400 mb-4 uppercase tracking-wider">Menu do Sistema</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {cards.map((card, index) => (
            <Link
                to={card.link}
                key={index}
                className={`
                border rounded-xl p-4 lg:p-5 transition-all duration-200 hover:shadow-md flex items-start gap-4
                ${getColorClasses(card.color)}
                `}
            >
                <div className="p-2 lg:p-3 bg-white/50 rounded-lg">
                    {card.icon}
                </div>
                <div>
                    <h2 className="text-lg lg:text-xl font-bold">{card.title}</h2>
                    <p className="text-sm lg:text-base opacity-80 mt-1 leading-snug">
                        {card.description}
                    </p>
                </div>
            </Link>
            ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="hidden lg:grid grid-cols-3 gap-6 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-2xl lg:text-3xl font-bold text-purple-700">500+</div>
          <div className="text-gray-500 text-sm lg:text-base">Prestadores Cadastrados</div>
        </div>
        <div className="text-center">
          <div className="text-2xl lg:text-3xl font-bold text-purple-700">1.2k</div>
          <div className="text-gray-500 text-sm lg:text-base">Eventos Realizados</div>
        </div>
        <div className="text-center">
          <div className="text-2xl lg:text-3xl font-bold text-purple-700">98%</div>
          <div className="text-gray-500 text-sm lg:text-base">Satisfação dos Clientes</div>
        </div>
      </div>

    </div>
  );
}

export default HomePage;