export const formatters = {
  formatarMoeda: (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  },

  formatarData: (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  },

  formatarDataHora: (data) => {
    return new Date(data).toLocaleString('pt-BR');
  },

  formatarTelefone: (telefone) => {
    const cleaned = ('' + telefone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return telefone;
  },

  formatarCPF: (cpf) => {
    const cleaned = ('' + cpf).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return match[1] + '.' + match[2] + '.' + match[3] + '-' + match[4];
    }
    return cpf;
  },

  formatarCNPJ: (cnpj) => {
    const cleaned = ('' + cnpj).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);
    if (match) {
      return match[1] + '.' + match[2] + '.' + match[3] + '/' + match[4] + '-' + match[5];
    }
    return cnpj;
  },

  truncarTexto: (texto, tamanho = 100) => {
    if (texto.length <= tamanho) return texto;
    return texto.substring(0, tamanho) + '...';
  },

  capitalizarPrimeiraLetra: (texto) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  },

  formatarNomeCompleto: (nome) => {
    return nome
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },

  formatarPercentual: (valor) => {
    return `${valor.toFixed(1)}%`;
  },

  formatarNumero: (numero, casasDecimais = 2) => {
    return Number(numero).toFixed(casasDecimais);
  }
};
