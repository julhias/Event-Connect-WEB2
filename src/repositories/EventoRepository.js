class EventoRepository {
  constructor() {
    this.storageKey = 'eventconnect_eventos';
    this.initializeData();
  }

  initializeData() {
    const eventos = this.findAll();
    if (eventos.length === 0) {
      // Dados iniciais
      const eventosIniciais = [
        {
          id: 1,
          nome: "Festinha da Ana",
          tipo: "Festa de Aniversário",
          data: "2025-12-13",
          valor: 2000,
          descricao: "Festa de Aniversário de 12 anos da Ana, com os amiguinhos do colégio dela. Tema BTS.",
          local: "São Paulo - SP, Rua Tiradentes, Bairro Sete, Salão Festeiros, Número 19",
          horario: "17:00",
          convidados: 50,
          observacoes: "Decoração tema BTS, bolo personalizado",
          imagem: "https://images.pexels.com/photos/3802773/pexels-photo-3802773.jpeg?auto=compress&cs=tinysrgb&w=600",
          status: "ativo",
          criacao: new Date().toISOString()
        },
        {
          id: 2,
          nome: "Casamento Olívia e Daniel",
          tipo: "Casamento",
          data: "2025-12-20",
          valor: 4000,
          descricao: "Casamento da Olívia e Daniel na igreja.",
          local: "São Paulo - SP, Igreja Nossa Senhora",
          horario: "15:00",
          convidados: 150,
          observacoes: "Cerimônia religiosa seguida de recepção",
          imagem: "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=600",
          status: "ativo",
          criacao: new Date().toISOString()
        }
      ];
      this.saveAll(eventosIniciais);
    }
  }

  findAll() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      return [];
    }
  }

  findById(id) {
    const eventos = this.findAll();
    return eventos.find(e => e.id === parseInt(id));
  }

  save(evento) {
    try {
      const eventos = this.findAll();
      eventos.push(evento);
      this.saveAll(eventos);
      return evento;
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      throw error;
    }
  }

  update(id, eventoAtualizado) {
    try {
      const eventos = this.findAll();
      const index = eventos.findIndex(e => e.id === parseInt(id));
      
      if (index === -1) {
        throw new Error('Evento não encontrado');
      }
      
      eventos[index] = { ...eventos[index], ...eventoAtualizado };
      this.saveAll(eventos);
      return eventos[index];
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      throw error;
    }
  }

  delete(id) {
    try {
      const eventos = this.findAll();
      const eventosFiltrados = eventos.filter(e => e.id !== parseInt(id));
      this.saveAll(eventosFiltrados);
      return true;
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      throw error;
    }
  }

  saveAll(eventos) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(eventos));
    } catch (error) {
      console.error('Erro ao salvar eventos:', error);
      throw error;
    }
  }

  clear() {
    localStorage.removeItem(this.storageKey);
  }
}

export default new EventoRepository();
