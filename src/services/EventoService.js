import EventoRepository from '../repositories/EventoRepository';
import { EventoSchema } from '../schemas/EventoSchema';

class EventoService {
  async getAll() {
    try {
      const eventos = await EventoRepository.findAll();
      return eventos.sort((a, b) => new Date(b.criacao) - new Date(a.criacao));
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const evento = await EventoRepository.findById(id);
      if (!evento) {
        throw new Error('Evento não encontrado');
      }
      return evento;
    } catch (error) {
      console.error('Erro ao buscar evento:', error);
      throw error;
    }
  }

  async create(eventoData) {
    try {
      // Validar dados usando schema
      const validatedData = EventoSchema.validate(eventoData);
      
      const novoEvento = {
        ...validatedData,
        id: Date.now(),
        status: 'ativo',
        criacao: new Date().toISOString(),
        valor: 0,
        imagem: eventoData.imagem || `https://picsum.photos/seed/${Date.now()}/600/400`
      };

      return await EventoRepository.save(novoEvento);
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      throw error;
    }
  }

  async update(id, eventoData) {
    try {
      const eventoExistente = await this.getById(id);
      const eventoAtualizado = {
        ...eventoExistente,
        ...eventoData,
        atualizacao: new Date().toISOString()
      };

      return await EventoRepository.update(id, eventoAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      return await EventoRepository.delete(id);
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      throw error;
    }
  }

  async getEventosAtivos() {
    try {
      const eventos = await this.getAll();
      return eventos.filter(e => e.status === 'ativo');
    } catch (error) {
      console.error('Erro ao buscar eventos ativos:', error);
      throw error;
    }
  }

  async getEventosFinalizados() {
    try {
      const eventos = await this.getAll();
      return eventos.filter(e => e.status === 'finalizado');
    } catch (error) {
      console.error('Erro ao buscar eventos finalizados:', error);
      throw error;
    }
  }

  async finalizarEvento(id) {
    try {
      return await this.update(id, { status: 'finalizado' });
    } catch (error) {
      console.error('Erro ao finalizar evento:', error);
      throw error;
    }
  }
}

export default new EventoService();
