export const PrestadorSchema = {
  validate(data) {
    const errors = [];

    if (!data.nome || data.nome.trim().length < 3) {
      errors.push('Nome deve ter no mínimo 3 caracteres');
    }

    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push('Email inválido');
    }

    if (!data.telefone) {
      errors.push('Telefone é obrigatório');
    }

    if (!data.categoria) {
      errors.push('Categoria é obrigatória');
    }

    if (data.preco !== undefined && data.preco < 0) {
      errors.push('Preço não pode ser negativo');
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    return data;
  },

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
};
