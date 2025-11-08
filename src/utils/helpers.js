export const helpers = {
  gerarId: () => {
    return Date.now() + Math.random().toString(36).substr(2, 9);
  },

  ordenarPorData: (array, campo = 'data', ordem = 'desc') => {
    return [...array].sort((a, b) => {
      const dataA = new Date(a[campo]);
      const dataB = new Date(b[campo]);
      return ordem === 'desc' ? dataB - dataA : dataA - dataB;
    });
  },

  filtrarPorTermo: (array, termo, campos) => {
    const termoLower = termo.toLowerCase();
    return array.filter(item => 
      campos.some(campo => 
        item[campo]?.toString().toLowerCase().includes(termoLower)
      )
    );
  },

  agruparPor: (array, propriedade) => {
    return array.reduce((acc, item) => {
      const chave = item[propriedade];
      if (!acc[chave]) {
        acc[chave] = [];
      }
      acc[chave].push(item);
      return acc;
    }, {});
  },

  calcularDiasEntreDatas: (data1, data2) => {
    const d1 = new Date(data1);
    const d2 = new Date(data2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },

  calcularIdade: (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    return idade;
  },

  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  throttle: (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  removerAcentos: (texto) => {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  },

  gerarSlug: (texto) => {
    return helpers.removerAcentos(texto)
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  },

  calcularPercentual: (parte, total) => {
    if (total === 0) return 0;
    return (parte / total) * 100;
  },

  embaralharArray: (array) => {
    const novoArray = [...array];
    for (let i = novoArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }
    return novoArray;
  }
};
