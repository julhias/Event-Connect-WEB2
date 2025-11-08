class ContratoRepository {
  constructor() {
    this.storageKey = 'eventconnect_contratos';
    this.initializeData();
  }

  initializeData() {
    const contratos = this.findAll();
    if (contratos.length === 0) {
      // Dados iniciais
      const contratosIniciais = [
        {
          id: 1,
          servico: "Decoração com Balões Premium",
          prestadorId: 1,
          prestador: "Decorações Mágicas Ltda",
          eventoId: 1,
          evento: "Festinha da Ana",
          data: "2025-12-12",
          valor: 450,
          status: "ativo",
          descricao: "Incluso 1 arco de balões desconstruído, 2 colunas de balões e 5 toalhas de mesa personalizadas.",
          pagamento: "Pagamento Efetuado",
          imagem: "https://picsum.photos/seed/1/400/300",
          criacao: new Date().toISOString(),
          dataConfirmacao: new Date().toISOString()
        },
        {
          id: 2,
          servico: "DJ Profissional + Equipamento",
          prestadorId: 2,
          prestador: "Sound Masters Entertainment",
          eventoId: 1,
          evento: "Festinha da Ana",
          data: "2025-12-13",
          valor: 800,
          status: "negociando",
          descricao: "Equipamento profissional completo, luzes, efeitos especiais e playlist personalizada.",
          pagamento: "Aguardando",
          imagem: "https://picsum.photos/seed/2/400/300",
          criacao: new Date().toISOString()
        },
        {
          id: 3,
          servico: "Fotografia Profissional",
          prestadorId: 3,
          prestador: "Momentos Fotografia",
          eventoId: 2,
          evento: "Casamento Olívia e Daniel",
          data: "2025-12-20",
          valor: 1500,
          status: "ativo",
          descricao: "Cobertura completa do evento, álbum digital e impresso com 100 fotos.",
          pagamento: "Sinal Pago",
          imagem: "https://picsum.photos/seed/3/400/300",
          criacao: new Date().toISOString(),
          dataConfirmacao: new Date().toISOString()
        }
      ];
      this.saveAll(contratosIniciais);
    }
  }

  findAll() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erro ao buscar contratos:', error);
      return [];
    }
  }

  findById(id) {
    const contratos = this.findAll();
    return contratos.find(c => c.id === parseInt(id));
  }

  findByEventoId(eventoId) {
    const contratos = this.findAll();
    return contratos.filter(c => c.eventoId === parseInt(eventoId));
  }

  findByPrestadorId(prestadorId) {
    const contratos = this.findAll();
    return contratos.filter(c => c.prestadorId === parseInt(prestadorId));
  }

  findByStatus(status) {
    const contratos = this.findAll();
    return contratos.filter(c => c.status === status);
  }

  save(contrato) {
    try {
      const contratos = this.findAll();
      contratos.push(contrato);
      this.saveAll(contratos);
      return contrato;
    } catch (error) {
      console.error('Erro ao salvar contrato:', error);
      throw error;
    }
  }

  update(id, contratoAtualizado) {
    try {
      const contratos = this.findAll();
      const index = contratos.findIndex(c => c.id === parseInt(id));
      
      if (index === -1) {
        throw new Error('Contrato não encontrado');
      }
      
      contratos[index] = { ...contratos[index], ...contratoAtualizado };
      this.saveAll(contratos);
      return contratos[index];
    } catch (error) {
      console.error('Erro ao atualizar contrato:', error);
      throw error;
    }
  }

  delete(id) {
    try {
      const contratos = this.findAll();
      const contratosFiltrados = contratos.filter(c => c.id !== parseInt(id));
      this.saveAll(contratosFiltrados);
      return true;
    } catch (error) {
      console.error('Erro ao excluir contrato:', error);
      throw error;
    }
  }

  saveAll(contratos) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(contratos));
    } catch (error) {
      console.error('Erro ao salvar contratos:', error);
      throw error;
    }
  }

  clear() {
    localStorage.removeItem(this.storageKey);
  }
}

export default new ContratoRepository();
