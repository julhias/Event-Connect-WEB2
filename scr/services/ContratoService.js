import ContratoRepository from '../repositories/ContratoRepository';
import { ContratoSchema } from '../schemas/ContratoSchema';

class ContratoService {
  async getAll() {
    try {
      const contratos = await ContratoRepository.findAll();
      return contratos.sort((a, b) => new Date(b.criacao) - new Date(a.criacao));
    } catch (error) {
      console.error('Erro ao buscar contratos:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const contrato = await ContratoRepository.findById(id);
      if (!contrato) {
        throw new Error('Contrato não encontrado');
      }
      return contrato;
    } catch (error) {
      console.error('Erro ao buscar contrato:', error);
      throw error;
    }
  }

  async create(contratoData) {
    try {
      // Validar dados usando schema
      const validatedData = ContratoSchema.validate(contratoData);
      
      const novoContrato = {
        ...validatedData,
        id: Date.now(),
        status: 'negociando',
        criacao: new Date().toISOString(),
        pagamento: 'Aguardando'
      };

      return await ContratoRepository.save(novoContrato);
    } catch (error) {
      console.error('Erro ao criar contrato:', error);
      throw error;
    }
  }

  async update(id, contratoData) {
    try {
      const contratoExistente = await this.getById(id);
      const contratoAtualizado = {
        ...contratoExistente,
        ...contratoData,
        atualizacao: new Date().toISOString()
      };

      return await ContratoRepository.update(id, contratoAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar contrato:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      return await ContratoRepository.delete(id);
    } catch (error) {
      console.error('Erro ao excluir contrato:', error);
      throw error;
    }
  }

  async getContratosPorEvento(eventoId) {
    try {
      const contratos = await this.getAll();
      return contratos.filter(c => c.eventoId === eventoId);
    } catch (error) {
      console.error('Erro ao buscar contratos do evento:', error);
      throw error;
    }
  }

  async getContratosPorStatus(status) {
    try {
      const contratos = await this.getAll();
      return contratos.filter(c => c.status === status);
    } catch (error) {
      console.error('Erro ao buscar contratos por status:', error);
      throw error;
    }
  }

  async cancelarContrato(id) {
    try {
      return await this.update(id, { 
        status: 'cancelado',
        dataCancelamento: new Date().toISOString()
      });
    } catch (error) {
      console.error('Erro ao cancelar contrato:', error);
      throw error;
    }
  }

  async confirmarContrato(id) {
    try {
      return await this.update(id, { 
        status: 'ativo',
        dataConfirmacao: new Date().toISOString()
      });
    } catch (error) {
      console.error('Erro ao confirmar contrato:', error);
      throw error;
    }
  }

  async concluirContrato(id) {
    try {
      return await this.update(id, { 
        status: 'concluido',
        dataConclusao: new Date().toISOString()
      });
    } catch (error) {
      console.error('Erro ao concluir contrato:', error);
      throw error;
    }
  }
}

export default new ContratoService();

