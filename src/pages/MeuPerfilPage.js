// src/pages/MeuPerfilPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Clock, 
  Star,
  Edit2,
  Save,
  CheckCircle,
  MapPin
} from 'lucide-react';

const MeuPerfilPage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Estado simulando dados do usuário
  const [formData, setFormData] = useState({
    nome: 'Carlos Silva',
    email: 'carlos.silva@email.com',
    telefone: '(11) 99999-9999',
    localizacao: 'São Paulo, SP',
    bio: 'Garçom com experiência em eventos de grande porte e casamentos.'
  });

  // Disponibilidade Mockada
  const disponibilidade = [
    { dia: 'Seg', horas: '08:00-18:00', cor: 'green' },
    { dia: 'Ter', horas: '08:00-18:00', cor: 'green' },
    { dia: 'Qua', horas: '08:00-18:00', cor: 'green' },
    { dia: 'Qui', horas: '08:00-18:00', cor: 'green' },
    { dia: 'Sex', horas: '08:00-18:00', cor: 'green' },
    { dia: 'Sab', horas: '10:00-22:00', cor: 'orange' },
    { dia: 'Dom', horas: '10:00-22:00', cor: 'orange' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aqui você chamaria a API para salvar
    alert('Dados salvos com sucesso!');
  };

  return (
    <div className="bg-purple-50 min-h-screen pb-20 font-sans">
      
      {/* Container Principal */}
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* --- HEADER --- */}
        <header className="flex items-center justify-between mb-2 lg:mb-6">
          <div className="flex items-center gap-3">
             <button 
               onClick={() => navigate(-1)} 
               className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-purple-50 transition-colors lg:hidden"
             >
               <ChevronLeft className="h-6 w-6 text-gray-700" />
             </button>
             
             <div>
               <h1 className="text-xl lg:text-3xl font-bold text-gray-800">Meu Perfil</h1>
               <p className="hidden lg:block text-gray-500 text-sm">Gerencie suas informações pessoais e profissionais</p>
             </div>
          </div>
          
          <div className="hidden lg:flex bg-purple-100 p-2.5 rounded-full">
             <User className="h-6 w-6 text-purple-600" />
          </div>
          <div className="lg:hidden text-2xl">👤</div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* COLUNA ESQUERDA (Dados Pessoais) - Ocupa 5 colunas no desktop */}
            <div className="lg:col-span-5 space-y-6">
                
                {/* Card de Informações Pessoais */}
                <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-purple-100 relative overflow-hidden">
                  
                  {/* Avatar + Nome (Header do Card) */}
                  <div className="flex flex-col items-center text-center mb-6 relative z-10">
                      <div className="relative mb-3">
                        <img 
                            className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-purple-50 shadow-md"
                            src="https://images.unsplash.com/photo-1507003211169-0a6dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                            alt="Foto de Perfil"
                        />
                        <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition">
                            <Edit2 className="h-4 w-4" />
                        </button>
                      </div>
                      <h2 className="text-xl lg:text-2xl font-bold text-gray-900">{formData.nome}</h2>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" /> {formData.localizacao}
                      </p>
                  </div>

                  {/* Formulário de Edição */}
                  <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Dados de Contato</h3>
                        <button 
                          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                          className="text-sm font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-colors"
                        >
                          {isEditing ? (
                            <><Save className="h-4 w-4" /> Salvar</>
                          ) : (
                            <><Edit2 className="h-4 w-4" /> Editar</>
                          )}
                        </button>
                    </div>

                    <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-500 flex items-center gap-1.5 ml-1">
                             Nome Completo
                          </label>
                          <input 
                            type="text" 
                            name="nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                            className={`w-full p-3 rounded-xl border text-sm lg:text-base transition-all outline-none ${
                              isEditing 
                                ? 'bg-white border-purple-400 focus:ring-4 focus:ring-purple-100' 
                                : 'bg-gray-50 border-transparent text-gray-700 font-medium'
                            }`} 
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-500 flex items-center gap-1.5 ml-1">
                            <Mail className="h-3.5 w-3.5" /> E-mail
                          </label>
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                            className={`w-full p-3 rounded-xl border text-sm lg:text-base transition-all outline-none ${
                              isEditing 
                                ? 'bg-white border-purple-400 focus:ring-4 focus:ring-purple-100' 
                                : 'bg-gray-50 border-transparent text-gray-700 font-medium'
                            }`} 
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-500 flex items-center gap-1.5 ml-1">
                            <Phone className="h-3.5 w-3.5" /> Telefone
                          </label>
                          <input 
                            type="tel" 
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                            className={`w-full p-3 rounded-xl border text-sm lg:text-base transition-all outline-none ${
                              isEditing 
                                ? 'bg-white border-purple-400 focus:ring-4 focus:ring-purple-100' 
                                : 'bg-gray-50 border-transparent text-gray-700 font-medium'
                            }`} 
                          />
                        </div>
                    </div>
                  </div>

                  {/* Decoração de Fundo */}
                  <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-purple-100 to-transparent opacity-50 z-0"></div>
                </div>

                {/* Bloco de Avaliações (Resumo) */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-purple-100">
                  <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    Reputação
                  </h2>
                  
                  <div className="flex items-center justify-between mb-4 bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                    <div className="flex items-center gap-3">
                       <span className="text-4xl font-bold text-gray-800">4.8</span>
                       <div>
                           <div className="flex text-yellow-400">
                             {[1,2,3,4,5].map(star => <Star key={star} className="h-4 w-4 fill-current" />)}
                           </div>
                           <p className="text-xs text-gray-500 mt-0.5">Baseado em 42 avaliações</p>
                       </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigate('/avaliacoes')}
                    className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:text-purple-600 transition-colors text-sm"
                  >
                    Ver Todas as Avaliações
                  </button>
                </div>
            </div>

            {/* COLUNA DIREITA (Serviços e Agenda) - Ocupa 7 colunas no desktop */}
            <div className="lg:col-span-7 space-y-6">

                {/* Serviços Prestados */}
                <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-purple-100">
                  <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg lg:text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 lg:h-6 lg:w-6 text-purple-600" />
                        Serviços Oferecidos
                      </h2>
                      <button className="text-sm font-semibold text-purple-600 hover:underline">
                          + Adicionar
                      </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-gray-800 text-lg group-hover:text-purple-700 transition-colors">Garçom Profissional</h3>
                              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3" /> Ativo
                              </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">Serviço completo de atendimento para festas e eventos corporativos.</p>
                          
                          <div className="flex items-center gap-4 text-sm">
                              <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg font-semibold">
                                  R$ 150,00 <span className="text-xs font-normal">/ evento</span>
                              </div>
                              <div className="text-gray-500 flex items-center gap-1">
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" /> 3 anos exp.
                              </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-full group-hover:bg-purple-100 transition-colors">
                          <Briefcase className="h-6 w-6 text-gray-400 group-hover:text-purple-600" />
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full py-4 border-2 border-dashed border-gray-200 text-gray-400 rounded-xl font-semibold hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-all flex items-center justify-center gap-2 text-sm">
                      <Edit2 className="h-4 w-4" /> Gerenciar Meus Serviços
                    </button>
                  </div>
                </div>

                {/* Disponibilidade */}
                <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-purple-100">
                  <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Clock className="h-5 w-5 lg:h-6 lg:w-6 text-purple-600" />
                    Disponibilidade Semanal
                  </h2>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {disponibilidade.map((item, index) => (
                      <div 
                        key={index}
                        className={`
                          text-center py-3 px-2 rounded-xl border transition-transform hover:scale-105
                          ${item.cor === 'green' 
                             ? 'bg-green-50 text-green-800 border-green-200' 
                             : 'bg-orange-50 text-orange-800 border-orange-200'
                          }
                        `}
                      >
                        <span className="block font-bold text-sm lg:text-base mb-1">{item.dia}</span>
                        <span className="text-xs lg:text-sm font-medium opacity-90">{item.horas}</span>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-xs text-gray-400 mt-4 text-center lg:text-left">
                      * Horários sujeitos a alteração conforme agendamento prévio.
                  </p>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
};

export default MeuPerfilPage;