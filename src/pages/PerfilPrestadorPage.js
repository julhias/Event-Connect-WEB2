// src/pages/PerfilPrestadorPage.js
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Edit2, 
  Save, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  Briefcase, 
  Clock,
  Share2
} from 'lucide-react';

function PerfilPrestadorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Dados mockados - em produção viria de uma API
  const [perfil, setPerfil] = useState({
    id: id || 1,
    nome: 'Carlos Silva',
    email: 'carlos.silva@email.com',
    telefone: '(11) 99999-9999',
    foto: `https://images.unsplash.com/photo-1507003211169-0a6dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`,
    servico: 'Garçom Profissional',
    categoria: 'Buffet & Serviços',
    valorMinimo: 150.00,
    experiencia: 3,
    descricao: 'Profissional experiente em eventos sociais e corporativos. Especialista em coquetéis e serviço à francesa. Atendimento diferenciado, uniforme impecável e pontualidade garantida para o sucesso do seu evento.',
    avaliacoes: {
      media: 4.8,
      total: 42
    },
    disponibilidade: {
      'Segunda': '08:00-18:00',
      'Terça': '08:00-18:00',
      'Quarta': '08:00-18:00',
      'Quinta': '08:00-18:00',
      'Sexta': '08:00-18:00',
      'Sábado': '10:00-22:00',
      'Domingo': '10:00-22:00'
    },
    localizacao: 'São Paulo, SP'
  });

  const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  const getDiaClass = (dia) => {
    if (dia === 'Sábado' || dia === 'Domingo') {
      return 'bg-orange-50 text-orange-700 border-orange-200';
    }
    return 'bg-green-50 text-green-700 border-green-200';
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    alert('Alterações salvas com sucesso!');
  };

  return (
    <div className="bg-purple-50 min-h-screen pb-20 font-sans">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 space-y-6">
        
        {/* --- HEADER --- */}
        <header className="flex items-center justify-between mb-4 lg:mb-8">
          <div className="flex items-center gap-3">
             <button 
                onClick={() => navigate(-1)} 
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition text-gray-600"
             >
                <ChevronLeft className="h-5 w-5" />
             </button>
             <div>
                <h1 className="text-xl lg:text-3xl font-bold text-gray-800">Perfil do Prestador</h1>
                <p className="hidden lg:block text-gray-500 text-sm">Detalhes profissionais e contratação</p>
             </div>
          </div>
          
          <button className="p-2.5 bg-white text-purple-600 rounded-full shadow-sm hover:bg-purple-50 transition">
             <Share2 className="h-5 w-5" />
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            
            {/* --- COLUNA ESQUERDA (Card Principal) --- */}
            <div className="lg:col-span-1 space-y-6">
                
                <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden relative">
                    {/* Background Decorativo */}
                    <div className="h-24 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
                    
                    <div className="px-6 pb-6 text-center relative">
                        {/* Foto */}
                        <div className="relative -mt-12 mb-4 inline-block">
                            <img 
                                src={perfil.foto}
                                alt={perfil.nome}
                                className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-white shadow-md mx-auto"
                            />
                            <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 border-white" title="Online"></div>
                        </div>

                        <h2 className="text-xl lg:text-2xl font-bold text-gray-900">{perfil.nome}</h2>
                        <p className="text-purple-600 font-semibold mb-3 flex items-center justify-center gap-1">
                            <Briefcase className="h-4 w-4" /> {perfil.servico}
                        </p>

                        {/* Badges */}
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <CheckCircle className="h-3 w-3 mr-1" /> Verificado
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                <Star className="h-3 w-3 mr-1 fill-current" /> {perfil.avaliacoes.media}
                            </span>
                        </div>

                        {/* Preço e Ação */}
                        <div className="border-t border-gray-100 pt-4">
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">A partir de</p>
                            <div className="flex items-end justify-center gap-1 mb-4">
                                <span className="text-3xl font-bold text-gray-900">R$ {perfil.valorMinimo}</span>
                                <span className="text-sm text-gray-500 mb-1">/ evento</span>
                            </div>
                            <button className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 shadow-lg hover:shadow-purple-200 transition-all transform hover:-translate-y-0.5">
                                Contratar Agora
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card de Contato (Editável) */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-purple-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-800">Contatos</h3>
                        <button 
                            onClick={() => setIsEditing(!isEditing)}
                            className="text-purple-600 hover:bg-purple-50 p-1.5 rounded-lg transition"
                        >
                            {isEditing ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                        </button>
                    </div>
                    
                    <div className="space-y-4 text-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-50 p-2 rounded-lg text-purple-600"><Mail className="h-4 w-4" /></div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500">Email</p>
                                {isEditing ? (
                                    <input 
                                        type="email" 
                                        value={perfil.email} 
                                        onChange={(e) => setPerfil({...perfil, email: e.target.value})}
                                        className="w-full p-1 border rounded bg-gray-50"
                                    />
                                ) : (
                                    <p className="font-medium text-gray-800 truncate">{perfil.email}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="bg-purple-50 p-2 rounded-lg text-purple-600"><Phone className="h-4 w-4" /></div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500">Telefone</p>
                                {isEditing ? (
                                    <input 
                                        type="tel" 
                                        value={perfil.telefone} 
                                        onChange={(e) => setPerfil({...perfil, telefone: e.target.value})}
                                        className="w-full p-1 border rounded bg-gray-50"
                                    />
                                ) : (
                                    <p className="font-medium text-gray-800">{perfil.telefone}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="bg-purple-50 p-2 rounded-lg text-purple-600"><MapPin className="h-4 w-4" /></div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500">Localização</p>
                                <p className="font-medium text-gray-800">{perfil.localizacao}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* --- COLUNA DIREITA (Conteúdo) --- */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Sobre */}
                <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-purple-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        Sobre o Profissional
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                        {perfil.descricao}
                    </p>
                    <div className="mt-4 flex gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold">Pontual</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold">Uniformizado</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold">Bilíngue</span>
                    </div>
                </div>

                {/* Disponibilidade */}
                <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-purple-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-purple-600" /> Disponibilidade
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {diasDaSemana.map(dia => (
                            <div key={dia} className={`p-3 rounded-xl border text-center transition-all hover:scale-105 ${getDiaClass(dia)}`}>
                                <p className="font-bold text-xs uppercase mb-1 opacity-80">{dia}</p>
                                <p className="text-xs lg:text-sm font-semibold">{perfil.disponibilidade[dia]}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Avaliações */}
                <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-purple-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500 fill-current" /> Avaliações
                        </h3>
                        <Link to="#" className="text-sm font-semibold text-purple-600 hover:underline">Ver todas</Link>
                    </div>

                    <div className="space-y-6">
                        {/* Review 1 */}
                        <div className="flex gap-4 pb-6 border-b border-gray-100">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="User" className="w-10 h-10 rounded-full bg-gray-200" />
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-gray-900 text-sm">Maria Santos</span>
                                    <span className="flex text-yellow-400 text-xs">{'★'.repeat(5)}</span>
                                </div>
                                <p className="text-gray-600 text-sm">Excelente profissional! Chegou no horário e serviu todos os convidados com muita educação. Recomendo demais!</p>
                                <p className="text-xs text-gray-400 mt-2">Há 2 semanas</p>
                            </div>
                        </div>

                        {/* Review 2 */}
                        <div className="flex gap-4">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" className="w-10 h-10 rounded-full bg-gray-200" />
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-gray-900 text-sm">João Pedro</span>
                                    <span className="flex text-yellow-400 text-xs">{'★'.repeat(5)}</span>
                                </div>
                                <p className="text-gray-600 text-sm">Superou minhas expectativas. Muito proativo.</p>
                                <p className="text-xs text-gray-400 mt-2">Há 1 mês</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilPrestadorPage;