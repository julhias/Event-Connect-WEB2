export const EventoSchema = {
  validate(data) {
    const errors = [];

    if (!data.nome || data.nome.trim().length < 3) {
      errors.push('Nome do evento deve ter no mínimo 3 caracteres');
    }

    if (!data.tipo) {
      errors.push('Tipo do evento é obrigatório');
    }

    if (!data.data) {
      errors.push('Data do evento é obrigatória');
    } else {
      const dataEvento = new Date(data.data);
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      
      if (dataEvento < hoje) {
        errors.push('Data do evento não pode ser no passado');
      }
    }

    if (!data.local || data.local.trim().length < 5) {
      errors.push('Local deve ter no mínimo 5 caracteres');
    }

    if (!data.horario) {
      errors.push('Horário é obrigatório');
    }

    if (!data.convidados || data.convidados < 1) {
      errors.push('Número de convidados deve ser maior que zero');
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    return data;
  }
};
