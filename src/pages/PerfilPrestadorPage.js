// src/pages/PerfilPrestadorPage.js
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit, Star, MapPin, Phone, Mail } from 'lucide-react';

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
    foto: `https://i.pravatar.cc/300?u=${id || 1}`,
    servico: 'Garçom Profissional',
    categoria: 'Buffet & Serviços',
    valorMinimo: 150.00,
    experiencia: 3,
    descricao: 'Profissional experiente em eventos sociais e corporativos. Atendimento diferenciado e pontualidade garantida.',
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
      return 'bg-orange-100 text-orange-800 border-orange-200';
    }
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    // Aqui você salvaria as mudanças na API
    alert('Alterações salvas com sucesso!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
      
      {/* Mobile Header */}
      <header className="flex lg:hidden justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition">
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Perfil</h1>
        <div className="w-10"></div>
      </header>

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Perfil do Prestador</h1>
          <p className="text-gray-600">Informações profissionais e disponibilidade</p>
        </div>
        <button onClick={() => navigate(-1)} className="text-purple-600 hover:text-purple-700 font-semibold flex items-center">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Voltar
        </button>
      </div>

      <div className="space-y-6">
        
        {/* Card Principal com Foto e Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-purple-100">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Foto */}
            <div className="flex-shrink-0">
              <img 
                src={perfil.foto}
                alt={perfil.nome}
                className="w-32 h-32 rounded-full object-cover border-4 border-purple-100 shadow-lg"
              />
            </div>

            {/* Info Principal */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{perfil.nome}</h2>
              <p className="text-lg text-purple-600 font-semibold mb-3">{perfil.servico}</p>
              
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {perfil.localizacao}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="h-4 w-4 mr-1 text-yellow-400 fill-yellow-400" />
                  {perfil.avaliacoes.media} ({perfil.avaliacoes.total} avaliações)
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                  ✓ Verificado
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  {perfil.experiencia} anos de experiência
                </span>
              </div>
            </div>

            {/* Valor */}
            <div className="flex-shrink-0 text-center sm:text-right">
              <p className="text-sm text-gray-600 mb-1">A partir de</p>
              <p className="text-3xl font-bold text-purple-700">R$ {perfil.valorMinimo.toFixed(2)}</p>
              <p className="text-sm text-gray-500">por evento</p>
              <button className="mt-4 w-full sm:w-auto bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition shadow-lg">
                Contratar
              </button>
            </div>
          </div>
        </div>

        {/* Sobre */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Sobre</h3>
          <p className="text-gray-700 leading-relaxed">{perfil.descricao}</p>
        </div>

        {/* Informações de Contato */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Informações de Contato</h3>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="text-purple-600 hover:text-purple-700 p-2 hover:bg-purple-50 rounded-lg transition"
            >
              <Edit className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-3" />
              {isEditing ? (
                <input 
                  type="email" 
                  value={perfil.email}
                  onChange={(e) => setPerfil({...perfil, email: e.target.value})}
                  className="flex-1 py-2 px-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              ) : (
                <span className="text-gray-700">{perfil.email}</span>
              )}
            </div>
            
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-3" />
              {isEditing ? (
                <input 
                  type="tel" 
                  value={perfil.telefone}
                  onChange={(e) => setPerfil({...perfil, telefone: e.target.value})}
                  className="flex-1 py-2 px-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              ) : (
                <span className="text-gray-700">{perfil.telefone}</span>
              )}
            </div>

            {isEditing && (
              <button 
                onClick={handleSaveChanges}
                className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Salvar Alterações
              </button>
            )}
          </div>
        </div>

        {/* Disponibilidade */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Disponibilidade</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {diasDaSemana.map(dia => (
              <div 
                key={dia}
                className={`text-center py-3 px-2 rounded-lg font-semibold border ${getDiaClass(dia)} transition hover:shadow-md`}
              >
                <p className="text-xs sm:text-sm font-bold mb-1">{dia}</p>
                <p className="text-xs">{perfil.disponibilidade[dia]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Avaliações */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Avaliações</h3>
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-4xl font-bold text-gray-800">{perfil.avaliacoes.media}</span>
                <div>
                  <div className="flex text-yellow-400 text-xl">
                    {'★'.repeat(5)}
                  </div>
                  <p className="text-sm text-gray-600">{perfil.avaliacoes.total} avaliações</p>
                </div>
              </div>
            </div>
            <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-purple-200 transition text-sm sm:text-base">
              Ver Todas
            </button>
          </div>

          {/* Exemplo de Avaliações */}
          <div className="space-y-4">
            <div className="border-t pt-4">
              <div className="flex items-start gap-3">
                <img src="https://i.pravatar.cc/50?img=1" alt="Cliente" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-800">Maria Santos</p>
                    <span className="text-yellow-400">★★★★★</span>
                  </div>
                  <p className="text-sm text-gray-600">Excelente profissional! Muito atencioso e pontual.</p>
                  <p className="text-xs text-gray-400 mt-1">há 2 semanas</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-start gap-3">
                <img src="https://i.pravatar.cc/50?img=2" alt="Cliente" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-800">João Silva</p>
                    <span className="text-yellow-400">★★★★★</span>
                  </div>
                  <p className="text-sm text-gray-600">Superou as expectativas! Recomendo muito.</p>
                  <p className="text-xs text-gray-400 mt-1">há 1 mês</p>
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