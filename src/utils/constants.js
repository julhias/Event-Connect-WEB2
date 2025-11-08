export const CONSTANTS = {
  STORAGE_KEYS: {
    EVENTOS: 'eventconnect_eventos',
    CONTRATOS: 'eventconnect_contratos',
    TOKEN: 'eventconnect_token',
    USER: 'eventconnect_user'
  },

  STATUS_EVENTO: {
    ATIVO: 'ativo',
    FINALIZADO: 'finalizado',
    CANCELADO: 'cancelado'
  },

  STATUS_CONTRATO: {
    NEGOCIANDO: 'negociando',
    ATIVO: 'ativo',
    CONCLUIDO: 'concluido',
    CANCELADO: 'cancelado'
  },

  TIPOS_EVENTO: [
    'Festa de Aniversário',
    'Casamento',
    'Formatura',
    'Evento Corporativo',
    'Confraternização',
    'Aniversário Infantil',
    'Chá de Bebê',
    'Festa de 15 Anos',
    'Bodas',
    'Outro'
  ],

  CATEGORIAS_PRESTADOR: [
    'Buffet',
    'DJ',
    'Fotografia',
    'Decoração',
    'Segurança',
    'Animação',
    'Barmans',
    'Garçons',
    'Florista',
    'Confeitaria'
  ],

  CORES_STATUS: {
    ativo: 'bg-green-100 text-green-800',
    negociando: 'bg-yellow-100 text-yellow-800',
    concluido: 'bg-blue-100 text-blue-800',
    cancelado: 'bg-red-100 text-red-800',
    finalizado: 'bg-gray-100 text-gray-800'
  },

  MENSAGENS: {
    SUCESSO: {
      EVENTO_CRIADO: 'Evento criado com sucesso!',
      EVENTO_ATUALIZADO: 'Evento atualizado com sucesso!',
      EVENTO_EXCLUIDO: 'Evento excluído com sucesso!',
      CONTRATO_CRIADO: 'Contrato criado com sucesso!',
      CONTRATO_CANCELADO: 'Contrato cancelado com sucesso!'
    },
    ERRO: {
      GENERICO: 'Ocorreu um erro. Tente novamente.',
      CAMPOS_OBRIGATORIOS: 'Preencha todos os campos obrigatórios',
      SEM_CONEXAO: 'Sem conexão com a internet',
      PERMISSAO_NEGADA: 'Permissão negada'
    }
  },

  API: {
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3
  }
};
