export const ContratoSchema = {
  validate(data) {
    const errors = [];

    if (!data.servico || data.servico.trim().length < 3) {
      errors.push('Nome do serviço deve ter no mínimo 3 caracteres');
    }

    if (!data.prestadorId) {
      errors.push('Prestador é obrigatório');
    }

    if (!data.prestador) {
      errors.push('Nome do prestador é obrigatório');
    }

    if (!data.eventoId) {
      errors.push('Evento é obrigatório');
    }

    if (!data.evento) {
      errors.push('Nome do evento é obrigatório');
    }

    if (!data.data) {
      errors.push('Data do serviço é obrigatória');
    }

    if (!data.valor || data.valor < 0) {
      errors.push('Valor deve ser maior ou igual a zero');
    }

    if (!data.descricao || data.descricao.trim().length < 10) {
      errors.push('Descrição deve ter no mínimo 10 caracteres');
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    return data;
  }
};
